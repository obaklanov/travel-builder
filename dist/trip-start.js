'use strict';
const destinationChoice=document.querySelector('#destination'),budgetChoice=document.querySelector('#trip-budget'),daysChoice=document.querySelector('#trip-length');
const tripForm=document.querySelector('#destination-search'),tripIdea=document.querySelector('#trip-idea');
const destinationOptions=[...destinationChoice.options].filter(o=>o.value).map(o=>({value:o.value,textContent:o.textContent}));
const durationPresets=[...Array.from({length:10},(_,i)=>i+1),12,14,16,18,20,25,30,35,40,45,50,60,70,80,90];
const budgetPresets=[...document.querySelectorAll('#budget-options option')].map(o=>o.value);
let previousDestination=null;
const iso=date=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
function originDetails(){
 const node=document.querySelector('#location-label'),origin=node?.textContent||'';
 const known=origin&&!['Finding your city…','Set your city'].includes(origin);
 return {origin,known,departure:departureForLocation(known?origin:'',node?.dataset.latitude?Number(node.dataset.latitude):NaN,node?.dataset.longitude?Number(node.dataset.longitude):NaN)};
}
function criteria(){
 const raw=budgetChoice.value.replace(/[$,\s]/g,''),length=daysChoice.value.trim();
 if(length&&(!/^\d+$/.test(length)||Number(length)<1||Number(length)>90))return {error:'Choose a whole number of days from 1 to 90.'};
 if(raw&&(!/^\d+(?:\.\d{1,2})?$/.test(raw)||Number(raw)<=0||Number(raw)>=1e10))return {error:'Enter a positive budget in CAD.'};
 return {days:length?Number(length):null,budget:raw?Number(raw):null};
}
function matchingTrips(filters,departure,start){
 if(filters.error)return [];
 const options=[];
 for(const destination of destinationOptions){
  const route=getFlightRoutes(destination.value,{...flightRequest(destination.value,filters.days||7),origin:departure.code})[0];
  // Whole-trip duration includes both journeys plus a full day at the destination.
  const minimumDays=Math.ceil((Number(route.time)*2+24)/24);
  const lengths=filters.days?[filters.days]:Array.from({length:90},(_,i)=>i+1);
  const days=lengths.filter(n=>n>=minimumDays&&n<=90&&(!filters.budget||quickTripEstimate(destination.value,n,departure.code).total<=filters.budget));
  if(days.length)options.push({...destination,days});
 }
 return options;
}
function updateFilters(){
 const filters=criteria(),{departure}=originDetails(),matches=matchingTrips(filters,departure);
 const previous=destinationChoice.value;destinationChoice.replaceChildren();
 const any=document.createElement('option');any.value='';any.textContent=matches.length?'Choose for me':'No matching destinations';destinationChoice.append(any);
 for(const match of matches){const option=document.createElement('option');option.value=match.value;option.textContent=match.textContent;destinationChoice.append(option);}
 destinationChoice.value=matches.some(m=>m.value===previous)?previous:'';destinationChoice.disabled=!matches.length;
 document.querySelector('#filter-message').textContent=filters.error||(!matches.length?'No trips match your current criteria. Please change the trip length or budget.':'');
 return {filters,matches};
}
const closers=[];
function suggestions(input,presets,id,label,format=value=>value){
 const wrapper=document.createElement('div');wrapper.className='budget-combobox';input.before(wrapper);wrapper.append(input);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='budget-toggle';toggle.setAttribute('aria-label',label);
 const panel=document.createElement('div');panel.id=id;panel.className='filter-suggestions';panel.hidden=true;panel.setAttribute('role','group');panel.setAttribute('aria-label',label);wrapper.append(toggle,panel);
 input.setAttribute('aria-controls',id);toggle.setAttribute('aria-controls',id);
 const close=()=>{panel.hidden=true;input.setAttribute('aria-expanded','false');toggle.setAttribute('aria-expanded','false');};closers.push(close);
 function open(filter=''){
  closers.forEach(close);panel.replaceChildren();const digits=filter.replace(/[$,\s]/g,'');
  for(const value of presets.filter(value=>!digits||String(value).replace(/[$,\s]/g,'').startsWith(digits))){const button=document.createElement('button');button.type='button';button.className='budget-suggestion';button.textContent=format(value);button.addEventListener('click',()=>{input.value=String(value);updateFilters();input.focus();close();});panel.append(button);}
  panel.hidden=!panel.childElementCount;input.setAttribute('aria-expanded',String(!panel.hidden));toggle.setAttribute('aria-expanded',String(!panel.hidden));
 }
 toggle.addEventListener('click',()=>{if(panel.hidden)open();else close();});input.addEventListener('click',()=>open());input.addEventListener('input',()=>{updateFilters();open(input.value);});input.addEventListener('change',updateFilters);
 input.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();if(panel.hidden)open();panel.querySelector('button')?.focus();}else if(event.key==='Enter'){event.preventDefault();close();tripForm.requestSubmit(document.querySelector('#create-filtered-trip'));}});
 wrapper.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();input.focus();}});
 panel.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;event.preventDefault();const buttons=[...panel.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);buttons[(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus();});
 document.addEventListener('click',event=>{if(!wrapper.contains(event.target))close();});wrapper.addEventListener('focusout',event=>{if(!wrapper.contains(event.relatedTarget))close();});
}
suggestions(daysChoice,durationPresets,'duration-suggestions','Show suggested trip lengths',value=>value+(value===1?' day':' days'));
suggestions(budgetChoice,budgetPresets,'budget-suggestions','Show suggested budgets');
window.addEventListener('pageshow',updateFilters);
const locationNode=document.querySelector('#location-label');
if(window.MutationObserver&&locationNode)new window.MutationObserver(updateFilters).observe(locationNode,{childList:true,subtree:true,attributes:true,attributeFilter:['data-latitude','data-longitude']});
updateFilters();
tripForm.addEventListener('submit',event=>{
 event.preventDefault();closers.forEach(close=>close());
 const filtered=event.submitter?.id==='create-filtered-trip';
 const {origin,known,departure}=originDetails();
 const filters=filtered?criteria():{days:null,budget:null};
 let options=matchingTrips(filters,departure);
 if(filtered&&destinationChoice.value)options=options.filter(o=>o.value===destinationChoice.value);
 if(!options.length){document.querySelector('#search-message').textContent=filters.error||'No trips match your current criteria. Please change the trip length or budget.';tripIdea.hidden=true;tripIdea.dataset.trip='';return;}
 if(!filtered||!destinationChoice.value){const abroad=options.filter(o=>!known||!origin.toLowerCase().endsWith(', '+o.textContent.toLowerCase()));if(abroad.length)options=abroad;const different=options.filter(o=>o.value!==previousDestination);if(different.length)options=different;}
 const destination=options[Math.floor(Math.random()*options.length)];previousDestination=destination.value;
 const preferred=destination.days.filter(day=>[7,10,14,21].includes(day)),lengths=preferred.length?preferred:destination.days;
 const days=filters.days||lengths[Math.floor(Math.random()*lengths.length)];
 const start=new Date();start.setHours(12,0,0,0);start.setDate(start.getDate()+14+Math.floor(Math.random()*77));const end=new Date(start);end.setDate(end.getDate()+days-1);
 const estimate=quickTripEstimate(destination.value,days,departure.code,iso(start),iso(end));
 if(filters.budget&&estimate.total>filters.budget){document.querySelector('#search-message').textContent='No trip fits this budget for the suggested dates. Please adjust your criteria.';tripIdea.hidden=true;return;}
 const formatter=new Intl.DateTimeFormat('en-CA',{month:'short',day:'numeric',year:'numeric'}),cost=new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(estimate.total);
 document.querySelector('#trip-idea-title').textContent=destination.textContent;
 document.querySelector('#trip-origin').textContent=(known?'From '+origin:'Departure city: choose your city above')+(!departure.matched?' · estimate via '+departure.city:'');
 document.querySelector('#trip-dates').textContent=formatter.format(start)+' – '+formatter.format(end)+' · '+days+' days · Approx. '+cost+' CAD';
 document.querySelector('#trip-dates').title='Sample per-person total including return flights, accommodation, food, local transport and miscellaneous. Not live availability.';
 const budgetSummary=document.querySelector('#trip-budget-summary');budgetSummary.hidden=!filters.budget;budgetSummary.textContent=filters.budget?'Your budget: '+new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(filters.budget)+' CAD':'';
 const tripId=crypto.randomUUID();document.querySelector('#trip-guide').href='destinations.html?'+new URLSearchParams({country:destination.value,returnTo:'home',origin:departure.code,days:String(days),start:iso(start),end:iso(end),tripId,from:known?origin:departure.city,...(filters.budget?{budget:String(filters.budget),currency:'CAD'}:{})});
 tripIdea.dataset.trip=JSON.stringify({id:tripId,country:destination.value,origin:departure.code,origin_label:(known?origin:departure.city).slice(0,160),departure_date:iso(start),return_date:iso(end),days,estimated_total:estimate.total,budget:filters.budget,currency:'CAD'});
 document.querySelector('#quick-add-status').textContent='';const add=document.querySelector('#quick-add-trip');add.textContent='Add Now';if(add.dataset.saving!=='true')add.disabled=false;
 tripIdea.hidden=false;document.querySelector('#search-message').textContent='';
});
