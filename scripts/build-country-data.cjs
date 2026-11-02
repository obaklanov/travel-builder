'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'data/worldometer-countries.json'),'utf8'));
const countries=source.countries;
const populationTotal=countries.reduce((sum,c)=>sum+c.population,0),areaTotal=countries.reduce((sum,c)=>sum+c.area,0);
if(countries.some(c=>!(Number.isFinite(c.area)&&c.area>=0)))throw Error('Missing area facts');
if(countries.length!==234||new Set(countries.map(c=>c.code)).size!==234)throw Error('Expected 234 source places');
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
if(countryCodes.size!==195||rankedCountries.length!==195)throw Error('Expected 195 countries');
const rankBy=field=>new Map([...rankedCountries].sort((a,b)=>b[field]-a[field]||a.name.localeCompare(b.name,'en')).map((c,i)=>[c.code,i+1]));
const populationRanks=rankBy('population'),areaRanks=rankBy('area');
// World shares retain the full source denominator, including territories.
const profileFacts=Object.fromEntries(countries.map(c=>[c.code,{
 population:aggregated.get(c.code).population,populationRank:populationRanks.get(c.code)||null,populationCount:countryCodes.has(c.code)?195:null,
 populationShare:(aggregated.get(c.code).population/populationTotal*100).toFixed(2),
 area:aggregated.get(c.code).area,areaRank:areaRanks.get(c.code)||null,areaCount:countryCodes.has(c.code)?195:null,
 areaShare:(aggregated.get(c.code).area/areaTotal*100).toFixed(2)
}]));
fs.writeFileSync(path.join(root,'dist/profile-country-info.json'),JSON.stringify(profileFacts,null,2)+'\n');
const catalogue=countries.map(c=>({...c,...profileFacts[c.code],parentCountry:territoryParents[c.code]||null,classification:countryCodes.has(c.code)?'country':['TWN','COK','NIU','ESH'].includes(c.code)?'other':'territory'})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
fs.writeFileSync(path.join(root,'dist/country-catalog.json'),JSON.stringify(catalogue,null,2)+'\n');
const factPath=path.join(root,'dist/country-facts.js');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(factPath,'utf8')+'\nthis.facts=countryFacts;',context);
const keys={"spain":"ESP","greece":"GRC","costa-rica":"CRI","indonesia":"IDN","united-states":"USA","vietnam":"VNM","colombia":"COL","morocco":"MAR",egypt:'EGY','new-zealand':'NZL',argentina:'ARG',italy:'ITA',japan:'JPN',portugal:'PRT',mexico:'MEX',thailand:'THA'};
for(const [key,code] of Object.entries(keys)){
 const row=countries.find(c=>c.code===code);if(!row)throw Error('Missing country '+key);context.facts[key] ||= {};
 Object.assign(context.facts[key],profileFacts[code]);
}
fs.writeFileSync(factPath,'// Population and catalogue: data/worldometer-countries.json; '+source.populationYear+' estimates.\n// Rankings: 195 UN member/observer states. World shares: full 234-place source denominator.\nconst countryFacts = '+JSON.stringify(context.facts,null,2)+';\n');
console.log('Built shared 195-country rankings; retained full-world percentage denominators.');
