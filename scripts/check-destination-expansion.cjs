'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const engine=require(path.join(root,'dist/travel-builder-engine.js'));
const additions=JSON.parse(read('data/destination-expansion-28.json')).countries;
const ctx=vm.createContext({URLSearchParams,location:{search:''},window:{}});
for(const name of ['travel-details.js','country-facts.js','travel-builder-filter-options.js'])vm.runInContext(read('dist/'+name),ctx);
const data=vm.runInContext('travelData',ctx),facts=vm.runInContext('countryFacts',ctx),profile=JSON.parse(read('dist/profile-country-info.json')),geometry=JSON.parse(read('dist/world-countries.json')),entries=JSON.parse(read('dist/entry-requirements.json'));
for(const [key,d] of Object.entries(additions)){
 assert(read('dist/destinations.html').includes('data-country="'+key+'"'));
 assert(fs.statSync(path.join(root,'dist/images/'+key+'-cover.jpg')).size>10000);
 assert.equal(facts[key].population,profile[d.code].population);assert(geometry.features.some(f=>f.id===d.code));assert(entries[key].summary&&entries[key].sourceUrl);
 assert.equal(ctx.window.TRAVEL_BUILDER_COUNTRY_CODES[key],d.code);
 for(let i=0;i<d.regions.length;i++)for(const origin of ['YYZ','YVR','YUL','YYC','YEG']){
  const rows=engine.match({destination:key,region:String(i),month:'2027-02',days:'10-12',people:'2',origin,season:'',budget:''},{[key]:{...data[key],continent:'Asia'}},(k,r)=>ctx.getFlightRoutes(k,r),new Date('2026-11-04T12:00:00Z'));
  assert(rows.length,key+' region '+i+' '+origin+' must match');for(const row of rows){assert(d.gateways[i].includes(row.route.code));assert(row.days>=10&&row.days<=12);assert.equal(row.people,2);assert(Number.isFinite(row.total)&&row.total>0);}
 }
 assert(read('dist/saved-trips.js').includes(JSON.stringify(key)+':'+JSON.stringify(d.name)));
 assert(read('supabase-travel-builder-destinations-28.sql').includes("'"+key+"'"));
}
console.log('PASS: four new countries in destinations, facts, maps, entry guidance, history codes, saved-trip names and SQL; every region matches valid arrival gateways from all five departure hubs.');
