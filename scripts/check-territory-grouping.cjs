'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const supplement=read('data/country-supplements.json');
const raw=[...read('data/worldometer-countries.json').countries,...supplement.countries].map(c=>({...c,area:c.area-(supplement.adjustments[c.code]?.areaSubtract||0)})),cat=read('dist/country-catalog.json'),parents=read('data/territory-parents.json').parents,info=read('dist/profile-country-info.json');
const codes=cat.filter(c=>c.classification==='country');assert.equal(codes.length,read('data/country-classification.json').expectedCountryCount);
const get=(list,code)=>list.find(c=>c.code===code);
for(const parent of new Set(Object.values(parents))){
 const children=Object.keys(parents).filter(c=>parents[c]===parent);
 for(const field of ['population','area']){
  const expected=[parent,...children].reduce((n,c)=>n+get(raw,c)[field],0);
  assert.equal(get(cat,parent)[field],expected,parent+' '+field);
  assert.equal(info[parent][field],expected);
  const world=raw.reduce((n,c)=>n+c[field],0);
  assert.equal(get(cat,parent)[field+'Share'],(expected/world*100).toFixed(2));
 }
}
for(const field of ['population','area']){
 [...codes].sort((a,b)=>b[field]-a[field]||a.name.localeCompare(b.name,'en')).forEach((c,i)=>assert.equal(c[field+'Rank'],i+1));
 // Aggregating each child once must preserve the world denominator.
 const grouped=cat.filter(c=>!c.parentCountry).reduce((n,c)=>n+c[field],0);
 assert.equal(grouped,raw.reduce((n,c)=>n+c[field],0));
}
const profile=fs.readFileSync(path.join(root,'dist/profile.js'),'utf8');
const canonical=new Function('catalogue',profile.match(/const travelCountryCode=[^;]+;/)[0]+'return travelCountryCode;')(cat);
for(const [child,parent] of Object.entries(parents))assert.equal(canonical(child),parent);
assert.equal(canonical('UNK'),'UNK');assert.equal(get(cat,'UNK').classification,'country');assert.equal(get(cat,'COK').classification,'country');assert.equal(get(cat,'NIU').classification,'country');
assert.equal(canonical('TWN'),'TWN');assert.equal(canonical('COK'),'COK');
const script=fs.readFileSync(path.join(root,'dist/scratch-celebration.js'),'utf8').replace(/\}\)\(\);\s*$/,'window.testFacts=()=>facts;window.testShape=countryShape;})();');
const context={window:{}};vm.runInNewContext(script,context);
const outlines=read('dist/profile-country-outlines.json');context.window.TRAVEL_SCRATCH.init(outlines,{},cat);
assert.equal(context.window.testFacts().DNK.populationShare,get(cat,'DNK').populationShare);
const denmark=context.window.testShape(outlines.features.find(f=>f.id==='DNK'));
assert.ok(denmark.x>0&&denmark.x+denmark.w<20,'Denmark animation focuses on European Denmark');
const france=context.window.testShape(outlines.features.find(f=>f.id==='FRA'));
assert.ok(france.x>-10,'France animation focuses on Europe');
console.log('PASS: territory selection, totals, rankings, world shares without double counting, and mainland animation focus.');
console.log('Denmark:',info.DNK.population,'people;',info.DNK.area,'km2; area rank',info.DNK.areaRank+'/'+codes.length);

const kosovo=outlines.features.find(f=>f.id==='UNK');assert.ok(kosovo,'Kosovo outline exists');assert.ok(fs.existsSync(path.join(root,'dist/flags/xk.svg')));
for(const c of cat)if(c.classification==='country'){assert.equal(info[c.code].populationCount,codes.length);assert.equal(info[c.code].areaCount,codes.length);}
console.log('PASS: Canadian-guided count, Kosovo/Cook Islands/Niue, sourced data and flags.');
