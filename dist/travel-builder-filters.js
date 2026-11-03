'use strict';
(() => {
  const definitions=window.TRAVEL_BUILDER_FILTERS,engine=window.TRAVEL_BUILDER_ENGINE;
  const form=document.querySelector('#destination-search'),idea=document.querySelector('#trip-idea');
  const field=id=>document.querySelector('#builder-'+id),storageKey='travel-builder-filter-preferences-v1';
  const data=Object.fromEntries(Object.entries(travelData).map(([key,value])=>[key,{...value,name:countries[key].name,continent:/Asia$/.test(countries[key].region)?'Asia':countries[key].region}]));
  const money=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n);
  let previousCountry=null;
  function option(value,label){const node=document.createElement('option');node.value=value;node.textContent=label;return node;}
  const destination=field('destination');
  for(const continent of [...new Set(Object.values(data).map(c=>c.continent))].sort())destination.append(option('continent:'+continent,continent));
  const countriesGroup=document.createElement('optgroup');countriesGroup.label='Countries';
  for(const [key,country] of Object.entries(data).sort((a,b)=>a[1].name.localeCompare(b[1].name)))countriesGroup.append(option(key,country.name));
  destination.append(countriesGroup);
  const today=new Date();field('month').min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
  function dependentOptions(){
    const country=data[destination.value],region=field('region'),arrival=field('arrival');
    const oldRegion=region.value,oldArrival=arrival.value;
    region.replaceChildren(option('','Any region'));arrival.replaceChildren(option('','Any airport'));
    if(country){country.regions.forEach(([name],i)=>region.append(option(String(i),name)));country.airports.forEach(([code,city])=>arrival.append(option(code,city+' · '+code)));}
    region.disabled=!country;arrival.disabled=!country;
    region.title=arrival.title=country?'':'Choose a country first';
    if([...region.options].some(o=>o.value===oldRegion))region.value=oldRegion;
    if([...arrival.options].some(o=>o.value===oldArrival))arrival.value=oldArrival;
  }
  function collect(){return Object.fromEntries(definitions.map(def=>[def.id,def.multiple?[...document.querySelectorAll('[name="'+def.id+'"]:checked')].map(n=>n.value):field(def.id).value]));}
  function interestLabel(){const selected=collect().interests;document.querySelector('#builder-interests summary').textContent=selected.length?selected.length+' selected':'Any interests';}
  try{
    const saved=JSON.parse(localStorage.getItem(storageKey)||'null');
    if(saved){
      for(const def of definitions.filter(d=>!['region','arrival'].includes(d.id))){const value=saved[def.id];if(def.multiple){for(const checkbox of document.querySelectorAll('[name="'+def.id+'"]'))checkbox.checked=Array.isArray(value)&&value.includes(checkbox.value);}else if(typeof value==='string'){const node=field(def.id);if(node.tagName!=='SELECT'||[...node.options].some(o=>o.value===value))node.value=value;}}
      dependentOptions();
      for(const id of ['region','arrival'])if([...field(id).options].some(o=>o.value===saved[id]))field(id).value=saved[id];
    }else dependentOptions();
  }catch{dependentOptions();}
  interestLabel();
  function pendingPreferences(values){return definitions.filter(def=>def.pending&&(Array.isArray(values[def.id])?values[def.id].length:values[def.id]&&values[def.id]!=='Any')).map(def=>({label:def.label,value:Array.isArray(values[def.id])?values[def.id].join(', '):field(def.id).selectedOptions?.[0]?.textContent||values[def.id]}));}
  function markPending(){const pending=pendingPreferences(collect());const note=document.querySelector('#builder-preference-status');note.hidden=!pending.length;note.textContent=pending.length?'Some selected preferences are not checked against destinations yet: '+pending.map(p=>p.label).join(', ')+'.':'';}
  markPending();
  form.addEventListener('change',event=>{
    if(event.target===destination){field('region').value='';field('arrival').value='';dependentOptions();}
    interestLabel();markPending();
    try{localStorage.setItem(storageKey,JSON.stringify(collect()));}catch{/* Controls still work if browser storage is unavailable. */}
    // A changed filter must not leave an old preview looking like a new match.
    idea.hidden=true;idea.dataset.trip='';document.querySelector('#search-message').textContent='';
  });
  form.addEventListener('input',()=>{idea.hidden=true;idea.dataset.trip='';});
  document.addEventListener('click',event=>{const interests=field('interests');if(!interests.contains(event.target))interests.open=false;});
  field('interests').addEventListener('keydown',event=>{if(event.key==='Escape'){field('interests').open=false;field('interests').querySelector('summary').focus();}});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const values=collect(),locationNode=document.querySelector('#location-label');
    const auto=departureForLocation(locationNode.textContent,Number(locationNode.dataset.latitude)||NaN,Number(locationNode.dataset.longitude)||NaN);
    const origin=values.departure||auto.code,originCity=departureCities.find(([code])=>code===origin)?.[1]||origin;
    const matches=engine.match({...values,origin},data,(key,request)=>getFlightRoutes(key,request));
    if(!matches.length){idea.hidden=true;idea.dataset.trip='';document.querySelector('#search-message').textContent='No trip matches these settings using our current estimates. Try a larger budget, longer trip, wider month range, another region or airport, or a less restrictive season or flight limit.';return;}
    let keys=[...new Set(matches.map(m=>m.key))];if(keys.length>1)keys=keys.filter(k=>k!==previousCountry);
    const key=keys[Math.floor(Math.random()*keys.length)],pool=matches.filter(m=>m.key===key),trip=pool[Math.floor(Math.random()*pool.length)];previousCountry=key;
    const tripId=crypto.randomUUID(),params=new URLSearchParams({country:key,returnTo:'home',origin,days:String(trip.days),start:trip.start,end:trip.end,tripId,from:originCity,people:String(trip.people),builderRegion:String(trip.regionIndex)});
    trip.rates.forEach((rate,index)=>params.set('builderRate'+index,String(rate)));
    if(trip.budget!==null){params.set('budget',String(trip.budget));params.set('currency','CAD');}
    document.querySelector('#trip-guide').href='destinations.html?'+params.toString();
    const payload={id:tripId,country:key,origin,origin_label:originCity,departure_date:trip.start,return_date:trip.end,days:trip.days,estimated_total:trip.total,group_size:trip.people,budget:trip.budget,currency:'CAD'};
    idea.dataset.trip=JSON.stringify(payload);
    document.querySelector('#trip-idea-title').textContent=data[key].name+' · '+trip.region;
    document.querySelector('#trip-origin').textContent='From '+originCity+' ('+origin+') to '+trip.route.city+' ('+trip.route.code+') · approx. '+trip.route.time+' hours one way';
    const date=new Intl.DateTimeFormat('en-CA',{month:'short',day:'numeric',year:'numeric'});
    document.querySelector('#trip-dates').textContent=date.format(new Date(trip.start+'T12:00:00'))+' – '+date.format(new Date(trip.end+'T12:00:00'))+' · '+trip.days+' days · '+trip.people+(trip.people===1?' traveller':' travellers');
    const summary=document.querySelector('#trip-budget-summary');summary.hidden=false;
    summary.textContent='Estimated group total: '+money(trip.total)+' CAD · '+money(trip.total/trip.people)+' per person'+(trip.budget!==null?' · Budget: '+money(trip.budget)+(trip.total>trip.budget?' (within your '+Number(values.budgetFlex)*100+'% flexibility)':''):'');
    const details=document.querySelector('#builder-trip-details');details.replaceChildren();
    const line=text=>{const p=document.createElement('p');p.textContent=text;details.append(p);};
    line('Season rating: '+({B:'Best',A:'Average',W:'Worst'}[trip.rating]||'Unknown')+' for the selected region and departure month.');
    line('Allowances in CAD: return flight '+money(trip.rates[0])+' per person; accommodation '+money(trip.rates[1])+' per night for the group; food '+money(trip.rates[2])+', local transport '+money(trip.rates[3])+', extras '+money(trip.rates[4])+' per person per day.');
    line('Illustrative planning estimates, not live availability. Regional costs use country-level allowances. Insurance, visas and major paid activities are not included.');
    const pending=pendingPreferences(values);
    if(pending.length){line('Preferences not checked: '+pending.map(p=>p.label+' — '+p.value).join('; ')+'.');line('These preferences are kept in this browser. Saved trips currently keep the country, dates, group size and budget.');}
    line('Entry eligibility and government advisories have not been checked. Review the official guidance before booking.');
    const source=document.createElement('a');source.textContent='Official entry requirements and travel advice ↗';source.href='https://travel.gc.ca/destinations/'+(key==='turkey'?'turkiye':key);source.target='_blank';source.rel='noopener noreferrer';details.append(source);
    const add=document.querySelector('#quick-add-trip');add.textContent='Add Now';if(add.dataset.saving!=='true')add.disabled=false;document.querySelector('#quick-add-status').textContent='';document.querySelector('#search-message').textContent='';idea.hidden=false;
    try{localStorage.setItem(storageKey,JSON.stringify(values));localStorage.setItem('travel-builder-last-trip-preferences',JSON.stringify({tripId,filters:values,region:trip.region,matchedAt:new Date().toISOString()}));}catch{}
    field('interests').open=false;
    idea.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
})();
