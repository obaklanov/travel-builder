const travelData={
"spain":{"airports": [["MAD", "Madrid"], ["BCN", "Barcelona"], ["AGP", "M\u00e1laga"], ["BIO", "Bilbao"], ["PMI", "Palma de Mallorca"], ["TFS", "Tenerife South"]], "base": 1000, "hours": 9, "costs": [120, 40, 20, 20], "regions": [["Madrid / Center", "WWABBBWWBBAW"], ["Barcelona / East", "AAABBBABBBAA"], ["Andalusia / South", "AABBBWWWBBAA"], ["Bilbao & Basque Country / North", "WWAABBBBBAAW"], ["Balearic Islands / Islands", "WWAABBBBBBAW"], ["Canary Islands / Islands", "AABBBBBBBBAA"]]},
"greece":{"airports": [["ATH", "Athens"], ["SKG", "Thessaloniki"], ["JTR", "Santorini"], ["HER", "Heraklion"], ["CFU", "Corfu"]], "base": 1200, "hours": 10, "costs": [115, 40, 20, 20], "regions": [["Athens & Peloponnese / South", "WWABBBWWBBAW"], ["Thessaloniki & mainland / North", "WWABBBBBBBAW"], ["Santorini & Cyclades / Islands", "WWAABBBBBBAW"], ["Crete / Islands", "AAABBBBBBBAA"], ["Corfu & Ionian Islands / Islands", "WWAABBBBBBAW"]]},
"costa-rica":{"airports": [["SJO", "San Jos\u00e9"], ["LIR", "Liberia"]], "base": 750, "hours": 5.5, "costs": [100, 35, 25, 20], "regions": [["San Jos\u00e9 & Central Valley / Center", "BBBBAAAWWWWB"], ["Arenal & Monteverde / North", "BBBBAAAWWWWB"], ["Guanacaste / West", "BBBBAAAWWWWB"], ["Manuel Antonio & Pacific coast / West", "BBBBAAAWWWWB"], ["Puerto Viejo & Caribbean coast / East", "AABAAAABBBAA"]]},
"indonesia":{"airports": [["DPS", "Bali Denpasar"], ["CGK", "Jakarta"], ["YIA", "Yogyakarta"], ["LOP", "Lombok"], ["LBJ", "Labuan Bajo"]], "base": 1700, "hours": 24, "costs": [65, 25, 15, 20], "regions": [["Bali / Islands", "WWAABBBBBAWW"], ["Jakarta & western Java / West", "WWAABBBBBAWW"], ["Yogyakarta & central Java / Center", "WWAABBBBBAWW"], ["Lombok / Islands", "WWAABBBBBAWW"], ["Komodo & Flores / East", "WWAABBBBBAWW"]]},

"united-states":{"airports": [["JFK", "New York JFK"], ["MIA", "Miami"], ["LAX", "Los Angeles"], ["SFO", "San Francisco"]], "base": 350, "hours": 2, "costs": [170, 60, 30, 25], "regions": [["New York / Northeast", "WWAABBBBBBAW"], ["Miami / South Florida", "BBBBAAWWWWAB"], ["Los Angeles / Southern California", "AABBBBBBBBAA"], ["Grand Canyon / Southwest", "WWABBAWWBBAW"], ["Pacific Northwest", "WWWAABBBBAWW"]]},
"vietnam":{"airports": [["HAN", "Hanoi"], ["SGN", "Ho Chi Minh City"], ["DAD", "Da Nang"]], "base": 1500, "hours": 22, "costs": [55, 22, 12, 18], "regions": [["Hanoi / Ha Long Bay", "AABBAWWWWBBB"], ["Da Nang / Hoi An", "ABBBBBAWWWWA"], ["Ho Chi Minh City / Mekong Delta", "BBBBAWWWWWAB"], ["Phu Quoc", "BBBBAWWWWWBB"]]},
"colombia":{"airports": [["BOG", "Bogot\u00e1"], ["MDE", "Medell\u00edn"], ["CTG", "Cartagena"], ["CLO", "Cali"]], "base": 800, "hours": 6, "costs": [85, 30, 18, 22], "regions": [["Cartagena / Caribbean coast", "BBBAAWWWWWAB"], ["Medell\u00edn / Antioquia", "BBAWWABBAWWB"], ["Bogot\u00e1 / highlands", "BBWWAABBAWWB"], ["Coffee region", "BBAWWABBAWWB"]]},
"morocco":{"airports": [["CMN", "Casablanca"], ["RAK", "Marrakech"], ["FEZ", "Fes"], ["AGA", "Agadir"]], "base": 950, "hours": 8, "costs": [80, 28, 18, 22], "regions": [["Marrakech / inland cities", "AABBBWWWBBAA"], ["Fes / northern interior", "AABBBWWBBBAA"], ["Essaouira / Atlantic coast", "AABBBBBBBBAA"], ["Merzouga / Sahara edge", "AABBWWWWBBAA"]]},

"egypt":{"airports": [["CAI", "Cairo"], ["HRG", "Hurghada"], ["LXR", "Luxor"], ["SSH", "Sharm el-Sheikh"]], "base": 1300, "hours": 13, "costs": [75, 25, 15, 20], "regions": [["Cairo / Giza", "BBBBAWWWAABB"], ["Luxor / Aswan / Abu Simbel", "BBBAWWWWWABB"], ["Hurghada / Red Sea coast", "AABBBWWBBAAA"], ["White Desert / Farafra", "BBBBAWWWAABB"]]},
"new-zealand":{"airports": [["AKL", "Auckland"], ["CHC", "Christchurch"], ["WLG", "Wellington"], ["ZQN", "Queenstown"]], "base": 1900, "hours": 18, "costs": [150, 50, 35, 25], "regions": [["Auckland / Northland", "BBBAAWWWAABB"], ["Waikato / Hobbiton / Rotorua", "BBBAAWWWAABB"], ["Wellington / lower North Island", "BBBAAWWWAABB"], ["Queenstown / Southern Lakes", "BBBAAWWWAABB"], ["Milford Sound / Fiordland", "BBBAAWWWAABB"]]},

 argentina:{airports:[['EZE','Buenos Aires Ezeiza'],['COR','Córdoba'],['MDZ','Mendoza'],['BRC','Bariloche']],base:1700,hours:14,costs:[100,35,20,25],regions:[['Buenos Aires / central plains','AABBAAAABBBA'],['Iguazú / northeast','AABBBBBBBAAA'],['Mendoza / wine country','AABBAAAABBBA'],['El Calafate / glacier country','BBBAAWWWAABB'],['Bariloche / lake district','BBBAAWWWAABB'],['Salta / northwest','WWAABBBBBAAW']]},
 italy:{airports:[['FCO','Rome Fiumicino'],['MXP','Milan Malpensa'],['VCE','Venice Marco Polo'],['NAP','Naples']],base:1100,hours:9,costs:[150,50,25,25],regions:[['Rome / central Italy','AAABBBWWBBAA'],['Venice / northeast','WWABBBWWBBAW'],['Florence / Tuscany','AAABBBWWBBAA'],['Naples / Amalfi Coast','WAABBBWWBBAW'],['Sicily / southern coast','AAABBBWWBBAA'],['Dolomites / mountain sightseeing','WWWAAABBBAWW']]},
 mexico:{airports:[['MEX','Mexico City'],['CUN','Cancún'],['GDL','Guadalajara'],['SJD','Los Cabos']],base:650,hours:5,costs:[100,35,18,20],regions:[['Cancún / Yucatán','BBBAAAWWWWAB'],['Mexico City / central highlands','BBBBAAAAWABB'],['Oaxaca','BBBBAAWWAABB'],['Puerto Vallarta / Pacific coast','BBBBAWWWWWAB'],['Los Cabos','BBBAAWWAAABB']]},
 japan:{airports:[['HND','Tokyo Haneda'],['NRT','Tokyo Narita'],['KIX','Osaka Kansai'],['FUK','Fukuoka']],base:1400,hours:13,costs:[130,45,25,25],regions:[['Tokyo / Kyoto / Osaka','AABBBWWWBBBA'],['Hokkaido','AAAWABBBBAAA'],['Okinawa','AABBBAWWWAAB']]},
 portugal:{airports:[['LIS','Lisbon'],['OPO','Porto'],['FAO','Faro'],['PDL','Ponta Delgada']],base:950,hours:8,costs:[110,40,18,20],regions:[['Lisbon / central coast','AAABBBBABBAA'],['Porto / north','WWAABBBBBAAW'],['Algarve','AAABBBBABBAA'],['Madeira','AABBBBBBBBAA'],['Azores','WAAABBBBBAAW']]},
 thailand:{airports:[['BKK','Bangkok Suvarnabhumi'],['HKT','Phuket'],['CNX','Chiang Mai'],['USM','Koh Samui']],base:1600,hours:22,costs:[65,25,15,18],regions:[['Bangkok / central Thailand','BBAAWWWWWWBB'],['Chiang Mai / north','BAWWAAWWWABB'],['Phuket / Andaman coast','BBBAWWWWWWAB'],['Koh Samui / Gulf coast','ABBBBAAAAAWW']]}
};
// Consistent geographic labels shared by selection, climate rows and flight summaries.
const regionGeographyLabels={
  "united-states": [
    "New York / East",
    "Miami / South",
    "Los Angeles / West",
    "Grand Canyon / West",
    "Pacific Northwest / West"
  ],
  "vietnam": [
    "Hanoi & Ha Long Bay / North",
    "Da Nang & Hoi An / Center",
    "Ho Chi Minh City & Mekong Delta / South",
    "Phu Quoc / Islands"
  ],
  "colombia": [
    "Cartagena / North",
    "Medellín / West",
    "Bogotá / Center",
    "Coffee region / Center"
  ],
  "morocco": [
    "Marrakech / Center",
    "Fes / North",
    "Essaouira / West",
    "Merzouga / East"
  ],
  "egypt": [
    "Cairo & Giza / North",
    "Luxor, Aswan & Abu Simbel / South",
    "Hurghada / East",
    "White Desert & Farafra / West"
  ],
  "new-zealand": [
    "Auckland & Northland / North",
    "Waikato, Hobbiton & Rotorua / North",
    "Wellington / Center",
    "Queenstown & Southern Lakes / South",
    "Milford Sound & Fiordland / South"
  ],
  "argentina": [
    "Buenos Aires / East",
    "Iguazú / North",
    "Mendoza / West",
    "El Calafate / South",
    "Bariloche / South",
    "Salta / North"
  ],
  "italy": [
    "Rome / Center",
    "Venice / East",
    "Florence & Tuscany / Center",
    "Naples & Amalfi Coast / South",
    "Sicily / Islands",
    "Dolomites / North"
  ],
  "mexico": [
    "Cancún & Yucatán / East",
    "Mexico City / Center",
    "Oaxaca / South",
    "Puerto Vallarta / West",
    "Los Cabos / West"
  ],
  "japan": [
    "Tokyo, Kyoto & Osaka / Center",
    "Hokkaido / North",
    "Okinawa / Islands"
  ],
  "portugal": [
    "Lisbon / Center",
    "Porto / North",
    "Algarve / South",
    "Madeira / Islands",
    "Azores / Islands"
  ],
  "thailand": [
    "Bangkok / Center",
    "Chiang Mai / North",
    "Phuket & Andaman coast / South",
    "Koh Samui / Islands"
  ]
};
for(const [key,labels] of Object.entries(regionGeographyLabels))travelData[key].regions.forEach((region,index)=>{region[0]=labels[index];});
// Display geographic qualifiers consistently in brackets.
for(const data of Object.values(travelData))data.regions.forEach(region=>{region[0]=region[0].replace(/ \/ (North|South|Center|West|East|Islands)$/, ' ($1)');});
const departureCities=[['YYZ','Toronto'],['YVR','Vancouver'],['YUL','Montréal'],['YYC','Calgary'],['YEG','Edmonton']];
let guideDeparture=departureCities.some(([code])=>code===new URLSearchParams(location.search).get('origin'))?new URLSearchParams(location.search).get('origin'):'YYZ';
function renderTravelDetail(key,kind){
 const panel=document.querySelector('.detail-panel'),d=travelData[key],name=countries[key].name;
 const trigger=document.querySelector('[data-detail="'+kind+'"]');
 const closing=!panel.hidden&&panel.dataset.kind===kind;
 document.querySelectorAll('[data-detail]').forEach(button=>button.setAttribute('aria-expanded','false'));
 if(closing){panel.hidden=true;panel.dataset.kind='';trigger?.focus({preventScroll:true});return;}
 if(trigger){trigger.after(panel);trigger.setAttribute('aria-expanded','true');panel.setAttribute('aria-labelledby',trigger.id);}
 panel.dataset.kind=kind;panel.hidden=false;
 const official='https://travel.gc.ca/destinations/'+key;
 if(kind==='entry'){
  window.TRAVEL_ENTRY_DETAILS.render(panel,key);
 }else if(kind==='health'){
  panel.innerHTML=`<h3>Health and vaccines</h3><p><a href="${official}#health" target="_blank" rel="noopener noreferrer">Read official health notices and vaccine guidance for ${name} ↗</a></p><p>Discuss your itinerary and health needs with a travel health professional.</p>`;
 }else if(kind==='advice'){
  panel.innerHTML=`<h3>GOVERNMENT. What does the Canadian government advise?</h3><p><a href="${official}" target="_blank" rel="noopener noreferrer">Check the latest Government of Canada advice for ${name} ↗</a></p><p>Review the risk level and any regional advisories for your route.</p>`;
 }else if(kind==='flights'&&!getBudgetState(key).regionChoice){
 panel.innerHTML='<h3>FLIGHTS</h3><p>First choose your region and travel month.</p><button type="button" id="choose-travel-season">Choose region and month →</button>';
 panel.querySelector('#choose-travel-season').onclick=()=>renderTravelDetail(key,'season');
 }else if(kind==='flights'){
 panel.innerHTML=`<h3>FLIGHTS</h3><p class="trip-region-summary">${getBudgetState(key).regionChoice.region} · ${travelMonthLabel(getBudgetState(key).departureDate.slice(0,7))}</p><p class="estimate-note">Illustrative CAD round-trip economy allowances and one-way journey times, to be confirmed. These are not current fares, schedules or ranked live results. Search opens your chosen airport and trip dates in Google Flights.</p><div class="departure-controls"><label>Departure city <select id="departure-city">${departureCities.map(([code,n])=>`<option value="${code}" ${code===guideDeparture?'selected':''}>${n} (${code})</option>`).join('')}</select></label>${departureDateField(key)}</div><div id="route-results"></div>`;
 const update=()=>{guideDeparture=panel.querySelector('select').value;
 const request=flightRequest(key,getBudgetState(key).days),routes=getFlightRoutes(key,request);
 panel.querySelector('.trip-region-summary').textContent=getBudgetState(key).regionChoice.region+' · '+travelMonthLabel(request.departureDate.slice(0,7));
 panel.querySelector('#route-results').innerHTML=`<div class="table-scroll"><table><thead><tr><th>Arrival hub</th><th>Return CAD</th><th>Journey out</th><th>Dates & fares</th></tr></thead><tbody>${routes.map(r=>`<tr><td>${r.city} (${r.code})</td><td>${r.verified?'':'Sample '}$${r.price}</td><td>${r.verified?'':'~'}${r.time} h</td><td><a class="flight-search-button" target="_blank" rel="noopener noreferrer" aria-label="Search flights from ${request.origin} to ${r.code}" href="${flightSearchUrl(request,r.code)}">Search flights ↗</a></td></tr>`).join('')}</tbody></table></div><p>Check stops, layovers and baggage in Google Flights.</p>`;};panel.querySelector('select').onchange=update;bindDepartureDate(key,panel,update);update();
 }else if(kind==='season'){
 panel.innerHTML=`<h3>WHEN. What month best to go?</h3><div class="table-scroll"><table class="season-table"><colgroup><col class="season-region-col">${Array.from({length:12},()=>'<col class="season-month-col">').join('')}</colgroup><thead><tr><th>Region</th>${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m=>`<th>${m}</th>`).join('')}</tr></thead><tbody>${d.regions.map(([region,months])=>`<tr><th>${region}</th>${[...months].map(c=>{const text={B:'BEST',A:'AVERAGE',W:'WORST'}[c];return `<td class="${text.toLowerCase()}">${text}</td>`}).join('')}</tr>`).join('')}</tbody></table></div><p><a href="https://climateknowledgeportal.worldbank.org/" target="_blank" rel="noopener noreferrer">Explore World Bank climate data ↗</a></p>`;

 setupSeasonChoice(key,panel);
 }else if(kind==='insurance'){
 panel.innerHTML=`<h3>Travel insurance</h3><p>Start with emergency medical cover, then assess trip cancellation, interruption and baggage cover against your bookings and existing benefits.</p><ul><li>Check medical evacuation and repatriation.</li><li>Confirm pre-existing condition and stability clauses in writing.</li><li>Check deductibles, activity exclusions, destination advisories and coverage for the full trip.</li><li>Check whether the insurer pays hospitals directly and offers 24-hour assistance.</li></ul><p class="estimate-note">Price requires a personal quote: age, health, destination, duration, deductible and coverage all matter. For this prototype only, allow CAD $5/day as a planning placeholder, not an insurer quote or coverage recommendation.</p><p><a href="https://travel.gc.ca/travelling/documents/travel-insurance" target="_blank" rel="noopener noreferrer">Government of Canada: choosing coverage ↗</a></p>`;
 }else{
 const state=getBudgetState(key);
 state.nights=Math.max(0,state.days-1);state.nightsManual=false;
 const flight=getFlightRoutes(key,flightRequest(key,state.days))[0];
 if(!state.flightManual)state.rates[0]=roundBudgetRate(flight.price,0);
 state.rates=state.rates.map(roundBudgetRate);
 panel.innerHTML=`<h3>MONEY. How much do you need?</h3><p class="estimate-note">Sample CAD allowances, to be confirmed. Accommodation is for the whole group; other amounts start per person. Airfare matches FLIGHTS for your departure city; live fares are not connected. Edit amounts to suit your trip. Excludes insurance, visas and major paid activities.</p><div class="departure-controls budget-trip-controls"><div class="budget-route-info"><p class="budget-route-summary">${departureCities.find(([code])=>code===guideDeparture)?.[1]||guideDeparture} (${guideDeparture}) → ${flight.city} (${flight.code})</p></div>${departureDateField(key)}<label>Days <input id="trip-days" type="number" min="1" max="365" value="${state.days}"></label><label>Nights <input id="trip-nights" type="number" value="${state.nights}" readonly aria-readonly="true"><small>Days − 1</small></label></div><label class="budget-group-label">How many people are travelling in your group? <select id="budget-group-size">${[1,2,3,4].map(n=>`<option value="${n}" ${n===state.people?'selected':''}>${n}</option>`).join('')}</select></label><table class="group-budget-table"><thead><tr><th>Category</th><th>Basis</th><th>Budget per person</th><th># of people</th><th>Total budget</th></tr></thead><tbody>${[[`Flights (round trip, ${guideDeparture} ↔ ${flight.code})`,'one-time'],['Accommodation','per night'],['Food','per day'],['Internal transport','per day'],['Miscellaneous','per day']].map(([n,b],i)=>{const control=budgetAllowanceControl(n,i,state.rates[i]);return `<tr><td>${n}</td><td>${b}</td><td>${i===1?'':control}</td><td class="budget-people">${i===1?'—':state.people}</td><td>${i===1?control:'<span class="budget-line-total"></span>'}</td></tr>`;}).join('')}</tbody></table><output id="budget-total" aria-live="polite"></output>`;
 const daysInput=panel.querySelector('#trip-days'),nightsInput=panel.querySelector('#trip-nights'),rateInputs=[...panel.querySelectorAll('.budget-rate')];
 const update=()=>{
  const route=getFlightRoutes(key,flightRequest(key,state.days))[0];
  let dates=panel.querySelector('.budget-date-summary');if(!dates){dates=document.createElement('p');dates.className='budget-date-summary';panel.querySelector('.budget-route-info').append(dates);}const datesRequest=flightRequest(key,state.days);dates.textContent='Trip: '+datesRequest.departureDate+' – '+datesRequest.returnDate;
  const money=value=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value);
  panel.querySelectorAll('.group-budget-table tbody tr').forEach((row,i)=>{if(i===1)return;row.querySelector('.budget-people').textContent=state.people;row.querySelector('.budget-line-total').textContent=money(state.rates[i]*state.people);});
  const total=tripTotalFromRates(state.rates,state.days,state.nights,state.people),average=document.createElement('small');average.className='budget-per-person-average';average.textContent=' ('+money(total/state.people)+' per person)';panel.querySelector('#budget-total').replaceChildren(document.createTextNode('Estimated total: '+money(total)),average);
 };
 const syncFlight=()=>{if(!state.flightManual){state.rates[0]=roundBudgetRate(getFlightRoutes(key,flightRequest(key,state.days))[0].price,0);rateInputs[0].value=state.rates[0];}};
 daysInput.oninput=()=>{if(daysInput.value==='')return;state.days=Math.min(365,Math.max(1,Math.floor(Number(daysInput.value)||1)));if(!state.nightsManual){state.nights=Math.max(0,state.days-1);nightsInput.value=state.nights;}syncFlight();update();};
 panel.querySelector('#budget-group-size').onchange=event=>{state.people=Math.max(1,Math.min(4,Number(event.target.value)||1));update();};
 setupBudgetAllowances(panel,state,rateInputs,update);
 bindDepartureDate(key,panel,()=>{syncFlight();update();});
 update();
 }
 panel.focus({preventScroll:true});panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
}

// Public, verified offer snapshots may be supplied here; never invent fares.
// No live airfare provider is connected. Empty snapshots use labelled samples.
const verifiedFlightOffers = [];
const flightSearchPolicy = Object.freeze({monthsAhead:3,maxStopsPerDirection:2,maxLayoverMinutes:240,maxQuoteAgeHours:24,currency:'CAD',cabin:'economy'});
const budgetStates={};
function getBudgetState(key){return budgetStates[key]??=( {days:initialTripDays(key),nights:initialTripDays(key)-1,nightsManual:false,flightManual:false,people:Math.max(1,Math.min(4,Math.floor(Number(new URLSearchParams(location.search).get('people')))||1)),rates:[travelData[key].base,...travelData[key].costs]} );}
function flightRequest(key,days=30,now=new Date()){
 const start=new Date(now.getFullYear(),now.getMonth()+flightSearchPolicy.monthsAhead,1);
 const lastDay=new Date(start.getFullYear(),start.getMonth()+1,0).getDate();
 start.setDate(Math.min(now.getDate(),lastDay));
 const end=new Date(start);end.setDate(end.getDate()+Math.max(0,days-1));
 const date=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 const params=new URLSearchParams(location.search);
 const requestedStart=budgetStates[key]?.departureDate || params.get('start');
 if((budgetStates[key]?.departureDate || (params.get('country')===key && params.get('returnTo')==='home')) && validTripDate(requestedStart)) {
  const tripStart=new Date(requestedStart+'T12:00:00');
  const tripEnd=new Date(tripStart);tripEnd.setDate(tripEnd.getDate()+Math.max(0,days-1));
  return {origin:guideDeparture,key,regionIndex:budgetStates[key]?.regionChoice?.index,departureDate:requestedStart,returnDate:date(tripEnd)};
 }
 return {origin:guideDeparture,key,regionIndex:budgetStates[key]?.regionChoice?.index,departureDate:date(start),returnDate:date(end)};
}
function isEligibleFlightOffer(offer,request,now=Date.now()){
 if(offer.origin!==request.origin||offer.country!==request.key||offer.departureDate!==request.departureDate||offer.returnDate!==request.returnDate||offer.currency!=='CAD'||offer.cabin!=='economy'||!Number.isFinite(offer.totalCAD)||offer.totalCAD<=0||offer.selfTransfer!==false||!/^https:\/\//.test(offer.sourceUrl||''))return false;
 if(!travelData[request.key].airports.some(([code])=>code===offer.destination))return false;
 const age=now-Date.parse(offer.checkedAt);
 if(!Number.isFinite(age)||age<0||age>flightSearchPolicy.maxQuoteAgeHours*3600000)return false;
 if(!Array.isArray(offer.legs)||offer.legs.length!==2)return false;
 return offer.legs.every((leg,index)=>{
  if(!Array.isArray(leg.segments)||leg.segments.length<1||leg.segments.length>flightSearchPolicy.maxStopsPerDirection+1)return false;
  const segments=leg.segments;
  if(segments[0].origin!==(index===0?offer.origin:offer.destination)||segments.at(-1).destination!==(index===0?offer.destination:offer.origin))return false;
  if(!segments[0].departure.startsWith(index===0?request.departureDate:request.returnDate))return false;
  return segments.every((segment,i)=>{
   const departure=Date.parse(segment.departure),arrival=Date.parse(segment.arrival);
   if(!Number.isFinite(departure)||!Number.isFinite(arrival)||arrival<=departure)return false;
   if(i===0)return true;
   const previous=segments[i-1],layover=(departure-Date.parse(previous.arrival))/60000;
   return previous.destination===segment.origin&&layover>=0&&layover<=flightSearchPolicy.maxLayoverMinutes;
  });
 });
}
function getFlightRoutes(key,request=flightRequest(key),offers=verifiedFlightOffers){
 const eligible=offers.filter(o=>isEligibleFlightOffer(o,request));
 if(eligible.length){
  return regionalAirports(key,request).flatMap(([code,city])=>{
   const offer=eligible.filter(o=>o.destination===code).sort((a,b)=>a.totalCAD-b.totalCAD)[0];
   if(!offer)return [];
   const outbound=offer.legs[0].segments;
   return [{code,city,price:offer.totalCAD,time:Math.round((Date.parse(outbound.at(-1).arrival)-Date.parse(outbound[0].departure))/360000)/10,verified:true}];
  }).sort((a,b)=>a.price-b.price);
 }
 const d=travelData[key],i=Math.max(0,departureCities.findIndex(r=>r[0]===request.origin)),asia=['japan','thailand','vietnam','indonesia'].includes(key);
 const delta=asia?[0,-200,100,120,180][i]:[0,180,30,130,200][i],dt=asia?[0,-3,1,1,2][i]:[0,3,0,2,3][i];
 return d.airports.map(([code,city],j)=>({code,city,price:d.base+delta+j*110,time:d.hours+dt+j*1.5,verified:false})).filter(route=>regionalAirports(key,request).some(([code])=>code===route.code)).sort((a,b)=>a.price-b.price);
}
function flightSearchUrl(request,destination){
 const query=`Flights from ${request.origin} to ${destination} on ${request.departureDate} through ${request.returnDate} round trip economy`;
 return 'https://www.google.com/travel/flights?hl=en&curr=CAD&q='+encodeURIComponent(query);
}

// Shared by the budget editor and the quick trip preview.
function initialTripDays(key) {
 const params=new URLSearchParams(location.search),days=Number(params.get('days'));
 return params.get('country')===key && Number.isInteger(days) && days>=1 && days<=365 ? days : 30;
}
function tripTotalFromRates(rates,days,nights=Math.max(0,days-1),people=1) {
 return rates[0]*people+rates[1]*nights+(rates[2]+rates[3]+rates[4])*days*people;
}
function departureForLocation(label,latitude,longitude) {
 const text=label.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const direct=departureCities.find(([,city])=>text.includes(city.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()));
 if(direct)return {code:direct[0],city:direct[1],matched:true};
 const hubs=[['YYZ','Toronto',43.68,-79.63],['YVR','Vancouver',49.19,-123.18],['YUL','Montréal',45.47,-73.74],['YYC','Calgary',51.13,-114.01],['YEG','Edmonton',53.31,-113.58]];
 if(Number.isFinite(latitude)&&Number.isFinite(longitude)) {
  const radians=value=>value*Math.PI/180;
  const distance=hub=>{const dlat=radians(hub[2]-latitude),dlon=radians(hub[3]-longitude);return Math.sin(dlat/2)**2+Math.cos(radians(latitude))*Math.cos(radians(hub[2]))*Math.sin(dlon/2)**2;};
  hubs.sort((a,b)=>distance(a)-distance(b));
 }
 return {code:hubs[0][0],city:hubs[0][1],matched:false};
}
function quickTripEstimate(key,days,origin,start,end) {
 const request={...flightRequest(key,days),origin};
 delete request.regionIndex; // Entry-level suggestions remain independent of mid-level choices.
 if(start&&end){request.departureDate=start;request.returnDate=end;}
 const flight=getFlightRoutes(key,request)[0];
 return {total:tripTotalFromRates([flight.price,...travelData[key].costs],days),verified:flight.verified};
}

function validTripDate(value) {
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return false;
 const date=new Date(value+'T12:00:00Z');
 return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===value;
}
function departureDateField(key) {
 const request=flightRequest(key,getBudgetState(key).days);
 return '<label class="trip-departure-date">Departure date <input id="departure-date" type="date" value="'+request.departureDate+'" required></label>';
}

function bindDepartureDate(key,panel,onChange) {
 const input=panel.querySelector('#departure-date');
 input.addEventListener('change',()=>{
  if(!validTripDate(input.value)){input.value=flightRequest(key,getBudgetState(key).days).departureDate;return;}
  getBudgetState(key).departureDate=input.value;
  if(getBudgetState(key).regionChoice)getBudgetState(key).regionChoice.month=input.value.slice(0,7);
  const params=new URLSearchParams(location.search);
  if(params.get('country')===key){
   const request=flightRequest(key,getBudgetState(key).days);
   params.set('start',request.departureDate);params.set('end',request.returnDate);
   history.replaceState(null,'',location.pathname+'?'+params.toString()+location.hash);
  }
  onChange();
 });
}

// Each seasonal region has explicit arrival gateways; some require onward travel.
const regionGateways = {"spain":[["MAD"], ["BCN"], ["AGP"], ["BIO"], ["PMI"], ["TFS"]],"greece":[["ATH"], ["SKG"], ["JTR"], ["HER"], ["CFU"]],"costa-rica":[["SJO"], ["SJO"], ["LIR"], ["SJO"], ["SJO"]],"indonesia":[["DPS"], ["CGK"], ["YIA"], ["LOP"], ["LBJ"]],"united-states": [["JFK"], ["MIA"], ["LAX"], ["LAX"], ["SEA"]], "vietnam": [["HAN"], ["DAD"], ["SGN"], ["PQC"]], "colombia": [["CTG"], ["MDE"], ["BOG"], ["PEI"]], "morocco": [["RAK"], ["FEZ"], ["AGA"], ["CMN"]], "egypt": [["CAI"], ["LXR"], ["HRG"], ["CAI"]], "new-zealand": [["AKL"], ["AKL"], ["WLG"], ["ZQN"], ["ZQN"]], "argentina": [["EZE"], ["IGR"], ["MDZ"], ["FTE"], ["BRC"], ["SLA"]], "italy": [["FCO"], ["VCE"], ["FLR"], ["NAP"], ["CTA"], ["VCE"]], "mexico": [["CUN"], ["MEX"], ["OAX"], ["PVR"], ["SJD"]], "japan": [["HND", "NRT", "KIX"], ["CTS"], ["OKA"]], "portugal": [["LIS"], ["OPO"], ["FAO"], ["FNC"], ["PDL"]], "thailand": [["BKK"], ["CNX"], ["HKT"], ["USM"]]};
function regionalAirports(key,request){
 const codes=regionGateways[key]?.[request.regionIndex];
 return codes?travelData[key].airports.filter(([code])=>codes.includes(code)):travelData[key].airports;
}
function travelMonthLabel(value){return new Date(value+'-01T12:00:00').toLocaleDateString('en-CA',{month:'long',year:'numeric'});}
function setupSeasonChoice(key,panel){
 const state=getBudgetState(key),d=travelData[key],current=flightRequest(key,state.days).departureDate;
 const box=document.createElement('form');box.className='season-choice';
 box.innerHTML='<div class="departure-controls"><label>Travel region <select id="travel-region" required><option value="">Choose a region</option>'+d.regions.map(([region],i)=>'<option value="'+i+'" '+(state.regionChoice?.index===i?'selected':'')+'>'+region+'</option>').join('')+'</select></label><label>Travel month <input type="month" id="travel-month" max="2028-12" min="'+new Date().toISOString().slice(0,7)+'" value="'+(state.regionChoice?.month||current.slice(0,7))+'" required></label></div><button type="submit" class="season-confirm">Use this region and month →</button><p class="season-choice-status" role="status"></p>';
 panel.querySelector('h3').after(box);
 panel.querySelectorAll('.season-table tbody tr').forEach((row,index)=>{
  [...row.querySelectorAll('td')].forEach((cell,month)=>{
   const text=cell.textContent;const button=document.createElement('button');button.type='button';button.className='season-cell-choice';button.textContent=text;
   button.setAttribute('aria-label',d.regions[index][0]+', '+['January','February','March','April','May','June','July','August','September','October','November','December'][month]+': '+text);
   button.onclick=()=>{box.querySelector('#travel-region').value=String(index);const now=new Date(),year=now.getFullYear()+(month<now.getMonth()?1:0);box.querySelector('#travel-month').value=year+'-'+String(month+1).padStart(2,'0');box.querySelector('.season-choice-status').textContent='Selected '+d.regions[index][0]+'. Confirm below the selectors to continue.';};cell.replaceChildren(button);
  });
 });
 box.onsubmit=event=>{
  event.preventDefault();const region=box.querySelector('#travel-region'),month=box.querySelector('#travel-month');
  if(!region.value||!/^\d{4}-\d{2}$/.test(month.value)||month.value<new Date().toISOString().slice(0,7)||month.value>'2028-12'){box.querySelector('.season-choice-status').textContent='Choose a region and a travel month between now and December 2028.';return;}
  const index=Number(region.value),oldDay=Number(current.slice(8)),[year,m]=month.value.split('-').map(Number);
  const now=new Date(),minimum=month.value===now.toISOString().slice(0,7)?now.getDate():1;
  const day=Math.max(minimum,Math.min(oldDay,new Date(year,m,0).getDate()));
  state.departureDate=month.value+'-'+String(day).padStart(2,'0');state.regionChoice={index,region:d.regions[index][0],month:month.value};
  renderTravelDetail(key,'flights');
 };
}

for(const [key,airports] of Object.entries({"united-states": [["SEA", "Seattle"]], "vietnam": [["PQC", "Phu Quoc"]], "colombia": [["PEI", "Pereira"]], "argentina": [["IGR", "Puerto Iguazú"], ["FTE", "El Calafate"], ["SLA", "Salta"]], "italy": [["FLR", "Florence"], ["CTA", "Catania"]], "mexico": [["OAX", "Oaxaca"], ["PVR", "Puerto Vallarta"]], "japan": [["CTS", "Sapporo New Chitose"], ["OKA", "Okinawa Naha"]], "portugal": [["FNC", "Funchal"]]}))travelData[key].airports.push(...airports);

function roundBudgetRate(value,index){const step=index===0?10:5;return Math.max(0,Math.min(100000,Math.round((Number(value)||0)/step)*step));}
function budgetSuggestedAmounts(value,index){
 const current=roundBudgetRate(value,index);
 if(index===0){
  const offsets=[10,20,30,40,50,70,90,110,130,150];
  return [...offsets.map(offset=>current-offset).reverse(),current,...offsets.map(offset=>current+offset)].filter(value=>value>=0&&value<=100000);
 }
 return Array.from({length:26},(_,i)=>current+(i-10)*5).filter(value=>value>=0&&value<=100000);
}
function setupBudgetAllowances(panel,state,inputs,update){
 const closeAll=()=>panel.querySelectorAll('.budget-suggestions').forEach(list=>{list.hidden=true;list.previousElementSibling.setAttribute('aria-expanded','false');});
 inputs.forEach((input,index)=>{
  const toggle=input.nextElementSibling,list=toggle.nextElementSibling;
  const commit=()=>{state.rates[index]=roundBudgetRate(input.value,index);input.value=state.rates[index];if(index===0)state.flightManual=true;update();};
  input.oninput=()=>{if(input.value==='')return;state.rates[index]=Math.max(0,Math.min(100000,Number(input.value)||0));if(index===0)state.flightManual=true;update();};
  input.onchange=commit;
  input.onkeydown=event=>{if(event.key==='Escape')closeAll();};
  toggle.onclick=()=>{
   const opening=list.hidden;closeAll();if(!opening)return;
   list.replaceChildren();
   budgetSuggestedAmounts(input.value,index).forEach(value=>{
    const option=document.createElement('button');option.type='button';option.textContent='$'+value.toLocaleString('en-CA');option.className=value===roundBudgetRate(input.value,index)?'current':'';
    option.onclick=event=>{input.value=value;commit();closeAll();if(event.detail===0)input.focus();else input.blur();};list.append(option);
   });list.hidden=false;toggle.setAttribute('aria-expanded','true');
   // Center within the actual options; native scroll limits stop at either data boundary.
   const selected=list.querySelector('.current');
   if(selected)list.scrollTop=Math.max(0,selected.offsetTop-(list.clientHeight-selected.offsetHeight)/2);
  };
 });
 panel.onclick=event=>{if(!event.target.closest('.budget-allowance'))closeAll();};
 panel.onkeydown=event=>{if(event.key==='Escape'){const open=panel.querySelector('.budget-suggestions:not([hidden])');if(open){event.stopPropagation();closeAll();open.previousElementSibling.focus();}}};
}
// Shared rounded daily allowances keep entry-level estimates and the editor aligned.
for(const data of Object.values(travelData))data.costs=data.costs.map(value=>roundBudgetRate(value,1));

function budgetAllowanceControl(name,index,value){
 return `<div class="budget-allowance"><input aria-label="${name} CAD ${index===1?'for the group':'per person'}" class="budget-rate" type="number" min="0" max="100000" step="${index===0?10:5}" value="${value}"><button type="button" class="budget-suggestions-toggle" aria-label="Suggested ${index===0?'flight':name.toLowerCase()} amounts" aria-expanded="false" aria-controls="budget-suggestions-${index}"></button><div id="budget-suggestions-${index}" class="budget-suggestions" hidden></div></div>`;
}
