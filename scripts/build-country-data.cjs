'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'data/worldometer-countries.json'),'utf8'));
const supplement=JSON.parse(fs.readFileSync(path.join(root,'data/country-supplements.json'),'utf8'));
const countries=[...source.countries,...supplement.countries].map(c=>{
 const adjustment=supplement.adjustments[c.code]||{};
 return {...c,area:c.area-(adjustment.areaSubtract||0)};
});
const populationTotal=countries.reduce((sum,c)=>sum+c.population,0),areaTotal=countries.reduce((sum,c)=>sum+c.area,0);
if(countries.some(c=>!(Number.isFinite(c.area)&&c.area>=0)))throw Error('Missing area facts');
if(new Set(countries.map(c=>c.code)).size!==countries.length)throw Error('Duplicate source place');
const classification=JSON.parse(fs.readFileSync(path.join(root,'data/country-classification.json'),'utf8'));
const countryCodes=new Set(classification.countryCodes);
const territoryParents=JSON.parse(fs.readFileSync(path.join(root,'data/territory-parents.json'),'utf8')).parents;
const byCode=new Map(countries.map(c=>[c.code,c]));
for(const [child,parent] of Object.entries(territoryParents))if(!byCode.has(child)||!countryCodes.has(parent))throw Error('Invalid territory relationship '+child);
const aggregated=new Map(countries.map(c=>[c.code,{...c}]));
for(const [child,parent] of Object.entries(territoryParents)){
 for(const field of ['population','area'])aggregated.get(parent)[field]+=byCode.get(child)[field];
}
const rankedCountries=[...aggregated.values()].filter(c=>countryCodes.has(c.code));
if(countryCodes.size!==classification.expectedCountryCount||rankedCountries.length!==countryCodes.size)throw Error('Country count does not match reviewed policy');
const rankBy=field=>new Map([...rankedCountries].sort((a,b)=>b[field]-a[field]||a.name.localeCompare(b.name,'en')).map((c,i)=>[c.code,i+1]));
const populationRanks=rankBy('population'),areaRanks=rankBy('area');
// World shares retain the full source denominator, including territories.
const profileFacts=Object.fromEntries(countries.map(c=>[c.code,{
 population:aggregated.get(c.code).population,populationYear:c.populationYear||source.populationYear,populationRank:populationRanks.get(c.code)||null,populationCount:countryCodes.has(c.code)?countryCodes.size:null,
 populationShare:(aggregated.get(c.code).population/populationTotal*100).toFixed(2),
 area:aggregated.get(c.code).area,areaRank:areaRanks.get(c.code)||null,areaCount:countryCodes.has(c.code)?countryCodes.size:null,
 areaShare:(aggregated.get(c.code).area/areaTotal*100).toFixed(2)
}]));
fs.writeFileSync(path.join(root,'dist/profile-country-info.json'),JSON.stringify(profileFacts,null,2)+'\n');
const catalogue=countries.map(c=>({...c,...profileFacts[c.code],parentCountry:territoryParents[c.code]||null,stateType:classification.selfGoverningStateCodes.includes(c.code)?'self-governing-state':countryCodes.has(c.code)?'country':null,classification:countryCodes.has(c.code)?'country':['TWN','COK','NIU','ESH'].includes(c.code)?'other':'territory'})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
fs.writeFileSync(path.join(root,'dist/country-catalog.json'),JSON.stringify(catalogue,null,2)+'\n');
const factPath=path.join(root,'dist/country-facts.js');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(factPath,'utf8')+'\nthis.facts=countryFacts;',context);
const keys={"france":"FRA","united-kingdom":"GBR","turkey":"TUR","peru":"PER","brazil":"BRA","south-africa":"ZAF","south-korea":"KOR","australia":"AUS","spain":"ESP","greece":"GRC","costa-rica":"CRI","indonesia":"IDN","united-states":"USA","vietnam":"VNM","colombia":"COL","morocco":"MAR",egypt:'EGY','new-zealand':'NZL',argentina:'ARG',italy:'ITA',japan:'JPN',portugal:'PRT',mexico:'MEX',thailand:'THA'};
for(const [key,code] of Object.entries(keys)){
 const row=countries.find(c=>c.code===code);if(!row)throw Error('Missing country '+key);context.facts[key] ||= {};
 Object.assign(context.facts[key],profileFacts[code]);
}
fs.writeFileSync(factPath,'// Population and catalogue: data/worldometer-countries.json; '+source.populationYear+' estimates.\n// Rankings: Canadian-guided travel-country policy. World shares include territories once; Kosovo is a separately sourced supplement.\nconst countryFacts = '+JSON.stringify(context.facts,null,2)+';\n');
console.log('Built '+countryCodes.size+' ranked travel countries/states from '+countries.length+' non-overlapping source places.');
