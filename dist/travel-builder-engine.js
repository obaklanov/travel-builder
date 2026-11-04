'use strict';
(() => {
  const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const regionExclusionId=(country,name)=>'region:'+country+':'+name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function dateLimits(now=new Date()){
    const first=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12),year=first.getFullYear()+3,month=first.getMonth();
    const departure=new Date(year,month,Math.min(first.getDate(),new Date(year,month+1,0).getDate()),12),last=new Date(departure);last.setDate(last.getDate()+90);
    return {min:iso(first),departureMax:iso(departure),returnMax:iso(last)};
  }
  function candidateMonths(f,now){
    const current=now.getFullYear()*12+now.getMonth(),last=current+36;
    const base=f.month?new Date(f.month+'-01T12:00:00'):(f.earliest?new Date(f.earliest.slice(0,7)+'-01T12:00:00'):new Date(now.getFullYear(),now.getMonth(),1,12));
    const serial=base.getFullYear()*12+base.getMonth();if(!Number.isFinite(serial)||(f.month&&(serial<current||serial>last)))return [];
    const upper=f.latest?new Date(f.latest+'T12:00:00'):null,range=upper?Math.max(0,(upper.getFullYear()-base.getFullYear())*12+upper.getMonth()-base.getMonth()):2;
    const spread=f.month?Number(f.dateFlex||0):Math.min(36,range),out=[];
    for(let i=f.month?-spread:0;i<=spread;i++){const d=new Date(base.getFullYear(),base.getMonth()+i,1,12),s=d.getFullYear()*12+d.getMonth();if(s>=current&&s<=last)out.push(d);}
    return out;
  }
  function durationValues(value){
    if(!value)return [7,10,14,21];
    const parts=String(value).split('-').map(Number),low=parts[0],high=parts[1]??low;
    if(parts.length>2||!Number.isInteger(low)||!Number.isInteger(high)||low<1||high>90||low>high)return [];
    return Array.from({length:high-low+1},(_,i)=>low+i);
  }
  function partyRules(party){return party==='Solo'?{min:1,max:1,locked:true}:party==='Couple'?{min:2,max:2,locked:true}:{min:['Friends','Family','Multigenerational'].includes(party)?2:1,max:10,locked:false};}
  const selected=value=>Array.isArray(value)?value.length>0:value!==undefined&&value!==null&&value!==''&&value!=='Any';
  function unverifiedRequirements(f,defs){return defs.filter(d=>d.pending&&selected(f[d.id])&&f.priorities?.[d.id]==='must').map(d=>d.label);}
  function total(rates,days,people){return rates[0]*people+rates[1]*Math.max(0,days-1)+(rates[2]+rates[3]+rates[4])*days*people;}
  function priceBands(data){
    const amount=c=>c.costs.reduce((sum,n)=>sum+n,0),unique=[...new Set(Object.values(data).map(amount))].sort((a,b)=>a-b);
    return Object.fromEntries(Object.entries(data).map(([key,c])=>[key,['lower','middle','higher'][Math.min(2,Math.floor(unique.indexOf(amount(c))*3/Math.max(1,unique.length)))]]));
  }
  function match(f,data,routes,now=new Date(),defs=[]){
    const limits=dateLimits(now),lengths=durationValues(f.days),people=Number(f.people||1),rules=partyRules(f.party);
    if(!lengths.length||!Number.isInteger(people)||people<rules.min||people>rules.max||unverifiedRequirements(f,defs).length)return [];
    if(f.earliest&&(f.earliest<limits.min||f.earliest>limits.departureMax))return [];
    if(f.latest&&(f.latest<limits.min||f.latest>limits.returnMax))return [];
    if(f.earliest&&f.latest&&f.earliest>f.latest)return [];
    const hard=id=>f.priorities?.[id]!=='prefer';
    if(f.newPlaces==='yes'&&hard('newPlaces')&&!f.profileKnown)return [];
    const visited=new Set(f.visitedCountryKeys||[]),excluded=new Set(Array.isArray(f.exclude)?f.exclude:[]),bands=priceBands(data);
    const budget=f.budget?Number(f.budget.split(':')[1])*(f.budget.startsWith('person:')?people:1):null,ceiling=budget===null?Infinity:budget*(1+Number(f.budgetFlex||0));
    const fitnessWeekly=Number(f.fitnessBudget||0);if(!Number.isFinite(fitnessWeekly)||fitnessWeekly<0||fitnessWeekly>100000)return [];
    const out=new Map(),center=f.days?(lengths[0]+lengths.at(-1))/2:14;
    for(const [key,country] of Object.entries(data)){
      if(excluded.has('country:'+key)||excluded.has('continent:'+country.continent))continue;
      const destinations=Array.isArray(f.destination)?f.destination:(f.destination?[f.destination]:[]);
      if(destinations.length&&!destinations.some(value=>value===key||value==='continent:'+country.continent))continue;
      if(f.newPlaces==='yes'&&f.profileKnown&&hard('newPlaces')&&visited.has(key))continue;
      if(f.priceLevel&&hard('priceLevel')&&bands[key]!==f.priceLevel)continue;
      for(let regionIndex=0;regionIndex<country.regions.length;regionIndex++){
        if(excluded.has(regionExclusionId(key,country.regions[regionIndex][0])))continue;
        if(f.region!==''&&f.region!==undefined&&Number(f.region)!==regionIndex)continue;
        for(const month of candidateMonths(f,now)){
          const start=new Date(month);if(start.getMonth()===now.getMonth()&&start.getFullYear()===now.getFullYear())start.setDate(now.getDate());
          if(f.earliest&&iso(start)<f.earliest)start.setTime(new Date(f.earliest+'T12:00:00').getTime());
          if(start.getMonth()!==month.getMonth()||start.getFullYear()!==month.getFullYear()||iso(start)>limits.departureMax)continue;
          for(const days of lengths){
            const end=new Date(start);end.setDate(end.getDate()+days-1);
            if(iso(end)>limits.returnMax||(f.latest&&iso(end)>f.latest))continue;
            let seasonFits=true;if(f.season){const cursor=new Date(start.getFullYear(),start.getMonth(),1,12);while(cursor<=end){if(!f.season.includes(country.regions[regionIndex][1][cursor.getMonth()]))seasonFits=false;cursor.setMonth(cursor.getMonth()+1);}}
            if(f.season&&hard('season')&&!seasonFits)continue;
            for(const route of routes(key,{origin:f.origin,regionIndex,departureDate:iso(start),returnDate:iso(end)})){
              if(f.arrival&&route.code!==f.arrival)continue;
              if(days<Math.ceil((route.time*2+24)/24))continue;
              const flightFits=!f.flightHours||route.time<=Number(f.flightHours);
              if(f.flightHours&&hard('flightHours')&&!flightFits)continue;
              if(f.flightBudget&&route.price>Number(f.flightBudget))continue;
              const rates=[route.price,...country.costs];for(const [id,i] of [['lodging',1],['food',2],['transport',3],['extras',4]])if(f[id]!==''&&f[id]!==undefined)rates[i]=Number(f[id]);
              rates[4]+=fitnessWeekly/(7*people);const amount=Math.round(total(rates,days,people)*100)/100;if(budget!==null&&hard('budget')&&amount>ceiling)continue;
              let score=0;const relaxed=[];
              for(const [id,active,fits] of [['budget',budget!==null,amount<=ceiling],['flightHours',!!f.flightHours,flightFits],['season',!!f.season,seasonFits],['priceLevel',!!f.priceLevel,bands[key]===f.priceLevel],['newPlaces',f.newPlaces==='yes'&&f.profileKnown,!visited.has(key)]])if(active&&!hard(id)){if(fits)score++;else relaxed.push(id);}
              const candidate={key,regionIndex,region:country.regions[regionIndex][0],rating:country.regions[regionIndex][1][month.getMonth()],route,days,start:iso(start),end:iso(end),people,rates,fitnessWeekly,fitnessTotal:Math.round(fitnessWeekly*days/7*100)/100,total:amount,budget,ceiling,score,relaxed,priceBand:bands[key],recordedVisited:visited.has(key)};
              // Keep one representative duration per region/month/arrival to bound memory for broad ranges.
              const id=[key,regionIndex,iso(start).slice(0,7),route.code].join('|'),previous=out.get(id);
              if(!previous||candidate.score>previous.score||(candidate.score===previous.score&&Math.abs(days-center)<Math.abs(previous.days-center)))out.set(id,candidate);
            }
          }
        }
      }
    }
    return [...out.values()];
  }
  const engine={match,total,candidateMonths,regionExclusionId,dateLimits,durationValues,partyRules,unverifiedRequirements,priceBands};
  if(typeof module!=='undefined'&&module.exports)module.exports=engine;else window.TRAVEL_BUILDER_ENGINE=engine;
})();
