'use strict';
(() => {
  const definitions=window.TRAVEL_BUILDER_FILTERS,engine=window.TRAVEL_BUILDER_ENGINE;
  const form=document.querySelector('#destination-search'),idea=document.querySelector('#trip-idea');
  const field=id=>document.querySelector('#builder-'+id),storageKey='travel-builder-design-preferences-v2';
  const data=Object.fromEntries(Object.entries(travelData).map(([key,value])=>[key,{...value,name:countries[key].name,continent:/Asia$/.test(countries[key].region)?'Asia':countries[key].region}]));
  const money=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n);
  let previousCountry=null,revision=0,placeSizeReviewRequired=false;
  function option(value,label){const node=document.createElement('option');node.value=value;node.textContent=label;return node;}
  function closeMultiple(node){if(node.dataset.inline!=='true')node.open=false;}
  const destination=field('destination');
  const destinationLabels=new Map(),destinationList=document.querySelector('#builder-destination-list');
  function destinationGroup(title,options){const section=document.createElement('section'),heading=document.createElement('h3');heading.textContent=title;section.append(heading);for(const [value,text] of options){const label=document.createElement('label'),checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.name='destination';checkbox.value=value;label.append(checkbox,document.createTextNode(text));label.dataset.search=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();section.append(label);destinationLabels.set(value,text);}destinationList.append(section);}
  destinationGroup('Continents',[...new Set(Object.values(data).map(c=>c.continent))].sort().map(c=>['continent:'+c,c]));
  destinationGroup('Countries',Object.entries(data).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([key,c])=>[key,c.name]));
  const destinationSearch=document.querySelector('#builder-destination-search');
  destinationSearch.addEventListener('input',()=>{const term=destinationSearch.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();for(const section of destinationList.children){for(const label of section.querySelectorAll('label'))label.hidden=!label.dataset.search.includes(term);section.hidden=![...section.querySelectorAll('label')].some(l=>!l.hidden);}});
  destinationSearch.addEventListener('keydown',event=>{if(event.key==='Enter')event.preventDefault();});
  document.querySelector('#builder-clear-destinations').addEventListener('click',()=>{for(const checkbox of destinationList.querySelectorAll('input'))checkbox.checked=false;field('region').value='';dependentOptions();form.dispatchEvent(new Event('change',{bubbles:true}));});
  const today=new Date(),lastMonth=new Date(today.getFullYear()+3,today.getMonth(),1);
  const monthValue=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
  field('month').min=monthValue(today);field('month').max=monthValue(lastMonth);
  field('month').title='Choose a month from '+field('month').min+' through '+field('month').max+'.';
  const limits=engine.dateLimits(today);
  function updateDateBounds(){field('earliest').min=limits.min;field('earliest').max=limits.departureMax;field('latest').min=field('earliest').value||limits.min;field('latest').max=limits.returnMax;field('earliest').title='Choose a departure from '+limits.min+' through '+limits.departureMax+'.';field('latest').title='Return no later than '+limits.returnMax+' (three years ahead plus 90 days).';}
  updateDateBounds();
  function dependentOptions(){
    const selected=[...destinationList.querySelectorAll('input:checked')].map(n=>n.value),country=selected.length===1?data[selected[0]]:null,region=field('region');
    const oldRegion=region.value;
    region.replaceChildren(option('','Any region'));
    if(country){country.regions.forEach(([name],i)=>region.append(option(String(i),name)));}
    region.disabled=!country;
    region.title=country?'':'Select one country to choose a planning region';
    if([...region.options].some(o=>o.value===oldRegion))region.value=oldRegion;
  }
  const exclusionLabels=new Map();
  const exclusionList=document.querySelector('#builder-exclusion-list');
  function exclusionGroup(title,options){
    const section=document.createElement('section'),heading=document.createElement('h3');heading.textContent=title;section.append(heading);
    for(const [value,text] of options){const label=document.createElement('label'),checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.name='exclude';checkbox.value=value;label.append(checkbox,document.createTextNode(text));label.dataset.search=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();section.append(label);exclusionLabels.set(value,text);}
    exclusionList.append(section);
  }
  exclusionGroup('Continents',[...new Set(Object.values(data).map(c=>c.continent))].sort().map(c=>['continent:'+c,c]));
  const sortedCountries=Object.entries(data).sort((a,b)=>a[1].name.localeCompare(b[1].name));
  exclusionGroup('Countries',sortedCountries.map(([key,c])=>['country:'+key,c.name]));
  exclusionGroup('Planning regions',sortedCountries.flatMap(([key,c])=>c.regions.map(([name])=>[engine.regionExclusionId(key,name),c.name+' · '+name])));
  const exclusionSearch=document.querySelector('#builder-exclusion-search');
  exclusionSearch.addEventListener('input',()=>{const term=exclusionSearch.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();for(const section of exclusionList.children){for(const label of section.querySelectorAll('label'))label.hidden=!label.dataset.search.includes(term);section.hidden=![...section.querySelectorAll('label')].some(l=>!l.hidden);}});
  exclusionSearch.addEventListener('keydown',event=>{if(event.key==='Enter')event.preventDefault();});
  document.querySelector('#builder-clear-exclusions').addEventListener('click',()=>{for(const node of document.querySelectorAll('[name="exclude"]'))node.checked=false;form.dispatchEvent(new Event('change',{bubbles:true}));});

  function collect(){const values=Object.fromEntries(definitions.map(def=>[def.id,def.multiple?[...document.querySelectorAll('[name="'+def.id+'"]:checked')].map(n=>n.value):field(def.id).value]));values.placeSizeReviewRequired=placeSizeReviewRequired;values.priorities=Object.fromEntries([...document.querySelectorAll('[data-priority-for]')].map(button=>[button.dataset.priorityFor,button.getAttribute('aria-checked')==='true'?'must':'prefer']));return values;}
  function interestLabel(){const values=collect();for(const def of definitions.filter(d=>d.multiple)){const selected=values[def.id];field(def.id).querySelector('summary').textContent=field(def.id).getAttribute('aria-disabled')==='true'?'Not applicable':def.id==='destination'?(selected.length===1?destinationLabels.get(selected[0]):selected.length?selected.length+' selected':'Anywhere'):def.id==='exclude'?(selected.length?selected.length+' excluded':'No exclusions'):(selected.length?selected.length+' selected':'No preference');
      if(def.id==='exclude'){const summary=document.querySelector('#builder-exclusion-summary');summary.hidden=!selected.length;summary.textContent=selected.map(v=>exclusionLabels.get(v)||v).join('; ');}}}
  try{
    const saved=JSON.parse(localStorage.getItem(storageKey)||localStorage.getItem('travel-builder-filter-preferences-v1')||'null');
    if(saved){
      if(typeof saved.destination==='string')saved.destination=saved.destination?[saved.destination]:[];
      if(!['Solo','Couple'].includes(saved.party))saved.party=Number(saved.people)>1?'Couple':'Solo';
      placeSizeReviewRequired=Boolean(['village','town','city','large-city','metropolis'].includes(saved.placeSize)||saved.placeSizeReviewRequired||(!Object.hasOwn(saved,'placeSize')&&(saved.urban||saved.metroSize)));
      if(/^\d+$/.test(saved.days||'')){const day=Number(saved.days),choice=definitions.find(d=>d.id==='days').options.find(([value])=>{const span=engine.durationValues(value);return value&&span.includes(day);});saved.days=choice?choice[0]:'';}
      if(saved.priorities)for(const button of document.querySelectorAll('[data-priority-for]')){const mode=saved.priorities[button.dataset.priorityFor];if(['must','prefer'].includes(mode)){button.setAttribute('aria-checked',String(mode==='must'));button.textContent=mode==='must'?'Must have':'Nice to have';}}
      if(saved.entry==='Visa-free preferred')saved.entry='visa-free';
      if(saved.entry==='Online application acceptable')saved.entry='evisa-arrival';
      if(saved.language==='English widely useful')saved.language='widely-spoken';
      if(saved.alcohol==='Prefer legal alcohol availability')saved.alcohol='yes';
      if(typeof saved.transferLimit==='string')saved.transferLimit=['Up to 30 minutes','Up to 1 hour','Up to 2 hours'].includes(saved.transferLimit)?['Under 2 hours']:[];
      if(Array.isArray(saved.interests)){const renamed={Food:'Food experiences',History:'History and heritage',Art:'Art and museums',Beaches:'Beaches and swimming'};saved.interests=saved.interests.map(v=>renamed[v]||v);}
      for(const def of definitions.filter(d=>!['region'].includes(d.id))){const value=saved[def.id];if(def.multiple){for(const checkbox of document.querySelectorAll('[name="'+def.id+'"]'))checkbox.checked=Array.isArray(value)&&value.includes(checkbox.value);}else if(typeof value==='string'){const node=field(def.id);if(node.tagName!=='SELECT'||[...node.options].some(o=>o.value===value))node.value=value;}}
      dependentOptions();
      for(const id of ['region'])if([...field(id).options].some(o=>o.value===saved[id]))field(id).value=saved[id];
    }else dependentOptions();
  }catch{dependentOptions();}
  if(!field('days').value)field('days').value='7-9';
  if(field('earliest').value&&(field('earliest').value<limits.min||field('earliest').value>limits.departureMax))field('earliest').value='';
  updateDateBounds();
  if(field('latest').value&&(field('latest').value<field('latest').min||field('latest').value>limits.returnMax))field('latest').value='';
  if(field('month').value&&(field('month').value<field('month').min||field('month').value>field('month').max))field('month').value='';
  function syncPassports(){const count=Number(field('people').value);for(const n of [2,3]){const node=field('passport'+n),visible=count>=n;node.closest('.builder-slot').hidden=!visible;node.disabled=!visible;if(!visible)node.value='';}}
  function syncParty(){const people=field('people');people.value=field('party').value==='Couple'?'2':'1';people.disabled=true;people.title='Automatically set by Solo or Couple.';syncPassports();}
  syncParty();
  form.addEventListener('click',event=>{const button=event.target.closest('[data-priority-for]');if(!button)return;const must=button.getAttribute('aria-checked')!=='true';button.setAttribute('aria-checked',String(must));button.textContent=must?'Must have':'Nice to have';form.dispatchEvent(new Event('change',{bubbles:true}));});
  interestLabel();
  function showPlaceSizeReview(){document.querySelector('#builder-placeSize-review').hidden=!placeSizeReviewRequired;}
  showPlaceSizeReview();
  function pendingPreferences(values){return definitions.filter(def=>def.pending&&(Array.isArray(values[def.id])?values[def.id].length:values[def.id]&&values[def.id]!=='Any')).map(def=>({label:def.label,value:Array.isArray(values[def.id])?values[def.id].join(', '):field(def.id).selectedOptions?.[0]?.textContent||values[def.id]}));}
  function markPending(){const pending=pendingPreferences(collect());const note=document.querySelector('#builder-preference-status');note.hidden=!pending.length;note.textContent=pending.length?'Unverified preferences: '+pending.map(p=>p.label).join(', ')+'. Any marked Must have must be verified before a trip can be created.':'';}
  markPending();
  form.addEventListener('change',event=>{
    if(event.target===exclusionSearch)return;
    document.querySelector('#builder-reset-status').textContent='';
    revision++;if(event.target===field('placeSize'))placeSizeReviewRequired=false;showPlaceSizeReview();if(event.target===field('party')||event.target===field('people'))syncParty();
    if(event.target===field('earliest'))updateDateBounds();
    if(event.target===destination||event.target.name==='destination'){field('region').value='';dependentOptions();}
    interestLabel();markPending();
    try{localStorage.setItem(storageKey,JSON.stringify(collect()));}catch{/* Controls still work if browser storage is unavailable. */}
    // A changed filter must not leave an old preview looking like a new match.
    idea.hidden=true;idea.dataset.trip='';document.querySelector('#search-message').textContent='';
  });
  form.addEventListener('input',event=>{if(event.target!==exclusionSearch){revision++;idea.hidden=true;idea.dataset.trip='';}});
  document.addEventListener('click',event=>{for(const def of definitions.filter(d=>d.multiple)){const node=field(def.id);if(!node.contains(event.target))closeMultiple(node);}});
  for(const def of definitions.filter(d=>d.multiple))field(def.id).addEventListener('keydown',event=>{if(event.key==='Escape'&&field(def.id).dataset.inline!=='true'){closeMultiple(field(def.id));field(def.id).querySelector('summary').focus();}});
  function resetFilters(group){
    const affected=definitions.filter(def=>!group||def.group===group);
    for(const def of affected){
      if(def.multiple){for(const node of document.querySelectorAll('[name="'+def.id+'"]'))node.checked=false;closeMultiple(field(def.id));}
      else field(def.id).value=def.defaultValue??(def.type?'':(Array.isArray(def.options[0])?String(def.options[0][0]):def.options[0]==='Any'?'':String(def.options[0])));
      const priority=document.querySelector('[data-priority-for="'+def.id+'"]');
      if(priority){priority.setAttribute('aria-checked','false');priority.textContent='Nice to have';}
    }
    if(!group||group==='where'){dependentOptions();updateDateBounds();destinationSearch.value='';destinationSearch.dispatchEvent(new Event('input',{bubbles:true}));exclusionSearch.value='';exclusionSearch.dispatchEvent(new Event('input',{bubbles:true}));}
    if(!group||group==='party')syncParty();
    for(const card of document.querySelectorAll('.design-group'))if(!group||card.classList.contains('design-group-'+group))for(const more of card.querySelectorAll('.design-more'))more.open=false;
    if(!group)previousCountry=null;
    if(!group||group==='experience')placeSizeReviewRequired=false;
    // Use the normal change path to cancel pending generation, clear the preview, refresh labels and save defaults.
    form.dispatchEvent(new Event('change',{bubbles:true}));
    const card=group?document.querySelector('.design-group-'+group):null;
    document.querySelector('#builder-reset-status').textContent=card?'Reset '+card.querySelector('legend').textContent+' filters.':'All filters reset to their defaults.';
  }
  form.addEventListener('click',event=>{const category=event.target.closest('[data-reset-category]');if(category)resetFilters(category.dataset.resetCategory);else if(event.target.closest('#builder-reset-all'))resetFilters();});

  async function recordedCountries(){
    const client=window.TRAVEL_EASY_CLIENT;if(!client)return {known:false,keys:[],reason:'Sign in and save visited countries in your Travel Builder profile.'};
    try{const session=await client.auth.getSession();if(session.error||!session.data.session)return {known:false,keys:[],reason:'Sign in to use visited countries from your profile.'};
      const result=await client.from('travel_builder_profiles').select('visited_countries').eq('id',session.data.session.user.id).maybeSingle();
      if(result.error||!Array.isArray(result.data?.visited_countries))return {known:false,keys:[],reason:'Save your visited countries in your profile first.'};
      const codes=new Set(result.data.visited_countries);return {known:true,keys:Object.entries(window.TRAVEL_BUILDER_COUNTRY_CODES).filter(([,code])=>codes.has(code)).map(([key])=>key)};
    }catch{return {known:false,keys:[],reason:'Visited-country history could not be loaded. Try again or open your profile.'};}
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    if(placeSizeReviewRequired){document.querySelector('#search-message').textContent='Choose a Place size or No preference under Experience & atmosphere → More options to replace your previous location-size setting.';return;}
    const values=collect(),locationNode=document.querySelector('#location-label');
    if(values.earliest&&values.latest&&values.earliest>values.latest){document.querySelector('#search-message').textContent='Latest return must be on or after earliest departure.';return;}
    if(values.party==='Solo'&&values.people!=='1'){document.querySelector('#search-message').textContent='A solo trip needs one traveller. Change the traveller count or travel party.';return;}
    if(values.childAges.length&&values.party==='Solo'){document.querySelector('#search-message').textContent='Choose a family or other travel party when including children.';return;}
    const unverified=engine.unverifiedRequirements(values,definitions);
    if(unverified.length){document.querySelector('#search-message').textContent='Cannot verify these must-have requirements yet: '+unverified.join(', ')+'. Use Nice to have for provisional suggestions, or keep the requirements and wait for verified data.';return;}
    const current=++revision,create=document.querySelector('#create-filtered-trip');let history={known:false,keys:[]};
    if(values.newPlaces==='yes'){create.disabled=true;try{history=await recordedCountries();}finally{create.disabled=false;}if(current!==revision)return;}
    if(values.newPlaces==='yes'&&!history.known){document.querySelector('#search-message').textContent=history.reason+' Sign in and record your visited countries to use Unvisited countries only.';return;}
    const auto=departureForLocation(locationNode.textContent,Number(locationNode.dataset.latitude)||NaN,Number(locationNode.dataset.longitude)||NaN);
    const origin=values.departure||auto.code,originCity=departureCities.find(([code])=>code===origin)?.[1]||origin;
    const matches=engine.match({...values,origin,profileKnown:history.known,visitedCountryKeys:history.keys},data,(key,request)=>getFlightRoutes(key,request),new Date(),definitions);
    if(!matches.length){idea.hidden=true;idea.dataset.trip='';document.querySelector('#search-message').textContent='No trip matches these settings using our current estimates. Try fewer exclusions, a larger budget, longer trip, wider date range, another region, or a less restrictive season or flight limit.';return;}
    const bestScore=Math.max(...matches.map(m=>m.score));const ranked=matches.filter(m=>m.score===bestScore);
    let keys=[...new Set(ranked.map(m=>m.key))];if(keys.length>1)keys=keys.filter(k=>k!==previousCountry);
    const key=keys[Math.floor(Math.random()*keys.length)],pool=ranked.filter(m=>m.key===key),trip=pool[Math.floor(Math.random()*pool.length)];previousCountry=key;
    const tripId=crypto.randomUUID(),params=new URLSearchParams({country:key,returnTo:'home',origin,days:String(trip.days),start:trip.start,end:trip.end,tripId,from:originCity,people:String(trip.people),builderRegion:String(trip.regionIndex)});
    trip.rates.forEach((rate,index)=>params.set('builderRate'+index,String(rate)));
    if(trip.budget!==null){params.set('budget',String(trip.budget));params.set('currency','CAD');}
    document.querySelector('#trip-guide').href='destinations.html?'+params.toString();
    const payload={id:tripId,country:key,origin,origin_label:originCity,departure_date:trip.start,return_date:trip.end,days:trip.days,estimated_total:trip.total,group_size:trip.people,budget:trip.budget,currency:'CAD'};
    idea.dataset.trip=JSON.stringify(payload);
    const photo=document.querySelector('#trip-idea-photo'),cover=window.TRAVEL_DESTINATION_PHOTOS?.[key];
    photo.hidden=!cover;photo.onerror=()=>{photo.hidden=true;};if(cover){photo.alt=cover.alt;photo.src=cover.src;}else photo.removeAttribute('src');
    document.querySelector('#trip-idea-title').textContent=data[key].name+' · '+trip.region;
    document.querySelector('#trip-origin').textContent='From '+originCity+' ('+origin+') to '+trip.route.city+' ('+trip.route.code+') · approx. '+trip.route.time+' hours one way';
    const date=new Intl.DateTimeFormat('en-CA',{month:'short',day:'numeric',year:'numeric'});
    document.querySelector('#trip-dates').textContent=date.format(new Date(trip.start+'T12:00:00'))+' – '+date.format(new Date(trip.end+'T12:00:00'))+' · '+trip.days+' days · '+trip.people+(trip.people===1?' traveller':' travellers');
    const summary=document.querySelector('#trip-budget-summary');summary.hidden=false;
    summary.textContent='Estimated group total: '+money(trip.total)+' CAD · '+money(trip.total/trip.people)+' per person'+(trip.budget!==null?' · Budget: '+money(trip.budget)+(trip.total>trip.budget?(trip.total<=trip.ceiling?' (within your '+Number(values.budgetFlex)*100+'% flexibility)':' (nice-to-have budget exceeded)'):''):'');
    const add=document.querySelector('#quick-add-trip');add.textContent='Add Now';if(add.dataset.saving!=='true')add.disabled=false;document.querySelector('#quick-add-status').textContent='';document.querySelector('#search-message').textContent='';idea.hidden=false;
    try{localStorage.setItem(storageKey,JSON.stringify(values));localStorage.setItem('travel-builder-last-trip-preferences',JSON.stringify({tripId,filters:values,region:trip.region,matchedAt:new Date().toISOString()}));}catch{}
    for(const def of definitions.filter(d=>d.multiple))closeMultiple(field(def.id));
    idea.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
})();
