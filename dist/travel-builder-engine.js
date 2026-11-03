'use strict';
(() => {
  const iso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const regionExclusionId=(country,name)=>'region:'+country+':'+name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  function candidateMonths(filters,now) {
    const currentMonth=now.getFullYear()*12+now.getMonth(),lastMonth=currentMonth+36;
    const base=filters.month?new Date(filters.month+'-01T12:00:00'):(filters.earliest?new Date(filters.earliest.slice(0,7)+'-01T12:00:00'):new Date(now.getFullYear(),now.getMonth(),1,12));
    const upper=filters.latest?new Date(filters.latest+'T12:00:00'):null;
    const range=upper?Math.max(0,(upper.getFullYear()-base.getFullYear())*12+upper.getMonth()-base.getMonth()):2;
    const spread=filters.month?Number(filters.dateFlex||0):Math.min(36,range), start=filters.month?-spread:0, results=[];
    for(let offset=start;offset<=spread;offset++){
      const date=new Date(base.getFullYear(),base.getMonth()+offset,1,12);
      const serial=date.getFullYear()*12+date.getMonth();
      if(serial>=currentMonth&&serial<=lastMonth)results.push(date);
    }
    return results;
  }
  function total(rates,days,people){return rates[0]*people+rates[1]*Math.max(0,days-1)+(rates[2]+rates[3]+rates[4])*days*people;}
  function match(filters,data,routes,now=new Date()) {
    const results=[],people=Number(filters.people||1),budget=filters.budget?Number(filters.budget.split(':')[1])*(filters.budget.startsWith('person:')?people:1):null;
    if(!Number.isInteger(people)||people<1||people>10)return [];
    const excluded=new Set(Array.isArray(filters.exclude)?filters.exclude:[]);
    const ceiling=budget===null?Infinity:budget*(1+Number(filters.budgetFlex||0));
    for(const [key,country] of Object.entries(data)){
      if(excluded.has('country:'+key)||excluded.has('continent:'+country.continent))continue;
      if(filters.destination&&!filters.destination.startsWith('continent:')&&filters.destination!==key)continue;
      if(filters.destination?.startsWith('continent:')&&country.continent!==filters.destination.slice(10))continue;
      for(let regionIndex=0;regionIndex<country.regions.length;regionIndex++){
        if(excluded.has(regionExclusionId(key,country.regions[regionIndex][0])))continue;
        if(filters.region!==''&&filters.region!==undefined&&Number(filters.region)!==regionIndex)continue;
        for(const month of candidateMonths(filters,now)){
          const rating=country.regions[regionIndex][1][month.getMonth()];
          if(filters.season&&!filters.season.includes(rating))continue;
          const start=new Date(month);if(start.getMonth()===now.getMonth()&&start.getFullYear()===now.getFullYear())start.setDate(now.getDate());
          if(filters.earliest&&iso(start)<filters.earliest)start.setTime(new Date(filters.earliest+'T12:00:00').getTime());
          if(start.getMonth()!==month.getMonth()||start.getFullYear()!==month.getFullYear())continue;
          const lengths=filters.days?[Number(filters.days)]:[7,10,14,21];
          for(const days of lengths){
            const end=new Date(start);end.setDate(end.getDate()+days-1);
            if(filters.latest&&iso(end)>filters.latest)continue;
            // A trip crossing a month boundary must satisfy every touched month's rating.
            if(filters.season){let cursor=new Date(start.getFullYear(),start.getMonth(),1,12),suitable=true;while(cursor<=end){if(!filters.season.includes(country.regions[regionIndex][1][cursor.getMonth()])){suitable=false;break;}cursor.setMonth(cursor.getMonth()+1);}if(!suitable)continue;}
            for(const route of routes(key,{origin:filters.origin,regionIndex,departureDate:iso(start),returnDate:iso(end)})){
              if(filters.arrival&&filters.arrival!==route.code)continue;
              if(filters.flightHours&&route.time>Number(filters.flightHours))continue;
              if(days<Math.ceil((route.time*2+24)/24))continue;
              if(filters.flightBudget&&route.price>Number(filters.flightBudget))continue;
              const rates=[route.price,...country.costs];
              for(const [id,index] of [['lodging',1],['food',2],['transport',3],['extras',4]])if(filters[id]!==''&&filters[id]!==undefined)rates[index]=Number(filters[id]);
              const estimatedTotal=total(rates,days,people);
              if(estimatedTotal>ceiling)continue;
              results.push({key,regionIndex,region:country.regions[regionIndex][0],rating,route,days,start:iso(start),end:iso(end),people,rates,total:estimatedTotal,budget,ceiling});
            }
          }
        }
      }
    }
    return results;
  }
  const engine={match,total,candidateMonths,regionExclusionId};
  if(typeof module!=='undefined'&&module.exports)module.exports=engine;
  else window.TRAVEL_BUILDER_ENGINE=engine;
})();
