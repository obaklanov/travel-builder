"""Refresh dated entry summaries without silently approving changed government text."""
import concurrent.futures, hashlib, json, os, urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class EntryParser(HTMLParser):
 def __init__(self):super().__init__();self.depth=0;self.active=False;self.parts=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if tag=='section':
   if attrs.get('id')=='entryexit':self.active=True;self.depth=1
   elif self.active:self.depth+=1
  if self.active and tag in ['p','h3','h4','li']:self.parts.append('\n')
 def handle_endtag(self,tag):
  if tag=='section' and self.active:
   self.depth-=1
   if not self.depth:self.active=False
 def handle_data(self,data):
  if self.active:self.parts.append(data)
def normalize(text):return '\n'.join(' '.join(line.split()) for line in text.splitlines() if line.strip())
def digest(text):return hashlib.sha256(normalize(text).encode()).hexdigest()
def retrieve(key):
 request=urllib.request.Request('https://travel.gc.ca/destinations/'+key,headers={'User-Agent':'TravelEasyEntryChecker/1.0'})
 with urllib.request.urlopen(request,timeout=45) as response:
  if response.status!=200:raise ValueError('Unexpected HTTP response')
  html=response.read(2500000).decode('utf-8')
 parser=EntryParser();parser.feed(html);text=normalize(''.join(parser.parts))
 if len(text)<500 or 'passport' not in text.lower() or ('Tourist visa:' not in text and not (key=='united-states' and 'Visas' in text and 'Canadian visitors' in text)):raise ValueError('Entry section structure changed or incomplete response')
 return text
def refresh_entry(row,text,today):
 updated=dict(row)
 if digest(text)==row['approvedSourceHash']:
  updated.update(checkedAt=today,needsReview=False,checkFailed=False)
 else:updated.update(needsReview=True,checkFailed=False)
 return updated
def public_rows(rows):
 return {key:{field:row[field] for field in ['summary','notes','passport','sourceUrl','checkedAt','needsReview','checkFailed']} for key,row in rows.items()}
def main():
 path=ROOT/'data/entry-requirements-reviewed.json';rows=json.loads(path.read_text(encoding='utf-8'))
 today=datetime.now(timezone.utc).date().isoformat();report={};success=0
 def check(key):
  try:return key,retrieve(key),None
  except Exception as error:return key,None,str(error)
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  for key,text,error in pool.map(check,rows):
   if error:
    rows[key]['checkFailed']=True;report[key]={'status':'fetch_failed','error':error};print('::warning::'+key+': source check failed; retaining previous checked date.')
   else:
    success+=1;rows[key]=refresh_entry(rows[key],text,today)
    if rows[key]['needsReview']:
     report[key]={'status':'review_required','sourceUrl':rows[key]['sourceUrl'],'candidateHash':digest(text),'candidateText':text};print('::warning::'+key+': government entry text changed; review before approving a new summary.')
    else:report[key]={'status':'unchanged','checkedAt':today}
 path.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 (ROOT/'data/entry-requirements-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 (ROOT/'dist/entry-requirements.json').write_text(json.dumps(public_rows(rows),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 summary=os.environ.get('GITHUB_STEP_SUMMARY')
 if summary:
  with open(summary,'a',encoding='utf-8') as file:file.write('## Weekly entry requirements check\n\n'+ '\n'.join('- '+key+': '+row['status'] for key,row in report.items())+'\n\nChanged source text is in data/entry-requirements-review.json. Previously reviewed summaries and dates stay in place until reviewed.\n')
 print('Checked',len(rows),'countries;',success,'successful downloads.')
 if not success:raise SystemExit('No sources could be checked.')
if __name__=='__main__':main()
