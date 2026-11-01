'use strict';
(() => {
  let snapshot;
  const load=()=>snapshot ||= fetch('entry-requirements.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error('Entry data unavailable');return response.json();}).catch(error=>{snapshot=null;throw error;});
  async function render(panel,key){
    panel.dataset.entryKey=key;
    const heading=document.createElement('h3');heading.textContent='VISA. Do you need it?';
    const scope=document.createElement('p');scope.className='entry-scope';scope.textContent='Regular Canadian passport · Tourism';
    const summary=document.createElement('p');summary.className='entry-summary';summary.textContent='Checking saved guidance…';
    const source=document.createElement('a');source.href='https://travel.gc.ca/destinations/'+key+'#entryexit';source.target='_blank';source.rel='noopener noreferrer';source.textContent='Latest requirements and other visa types ↗';
    panel.replaceChildren(heading,scope,summary,source);
    try{
      const row=(await load())[key];
      if(!panel.isConnected||panel.dataset.kind!=='entry'||panel.dataset.entryKey!==key)return;
      if(!row)throw Error('No reviewed summary');
      summary.textContent=row.summary;
      for(const text of row.notes){const note=document.createElement('p');note.className='entry-note';note.textContent=text;panel.insertBefore(note,source);}
      const passport=document.createElement('p');passport.className='entry-note';passport.textContent='Passport: '+row.passport;panel.insertBefore(passport,source);
      const checked=document.createElement('p');checked.className='entry-checked';
      const date=new Date(row.checkedAt+'T12:00:00Z');
      checked.textContent='Last checked: '+new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(date)+'.';panel.insertBefore(checked,source);
      if(row.needsReview||row.checkFailed||Date.now()-date.getTime()>9*86400000){const note=document.createElement('p');note.className='entry-refresh-note';note.textContent=row.needsReview?'The official guidance has changed. Check the latest requirements below.':'A fresh source check is pending. Check the latest requirements below.';panel.insertBefore(note,source);}
    }catch{
      if(panel.isConnected&&panel.dataset.kind==='entry'&&panel.dataset.entryKey===key)summary.textContent='Check the official guidance for current entry requirements.';
    }
  }
  window.TRAVEL_ENTRY_DETAILS={render};
})();
