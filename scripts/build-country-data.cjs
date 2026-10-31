'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'data/worldometer-countries.json'),'utf8'));
const countries=source.countries;
if(countries.length!==234||new Set(countries.map(c=>c.code)).size!==234||new Set(countries.map(c=>c.populationRank)).size!==234)throw Error('Expected 234 unique Worldometer countries and ranks.');
const catalogue=[...countries].sort((a,b)=>a.name.localeCompare(b.name,'en'));
fs.writeFileSync(path.join(root,'dist/country-catalog.json'),JSON.stringify(catalogue,null,2)+'\n');
const factPath=path.join(root,'dist/country-facts.js');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(factPath,'utf8')+'\nthis.facts=countryFacts;',context);
const keys={egypt:'EGY','new-zealand':'NZL',argentina:'ARG',italy:'ITA',japan:'JPN',portugal:'PRT',mexico:'MEX',thailand:'THA'};
for(const [key,code] of Object.entries(keys)){
 const row=countries.find(c=>c.code===code);if(!row||!context.facts[key])throw Error('Missing country '+key);
 Object.assign(context.facts[key],{population:row.population,populationRank:row.populationRank,populationCount:countries.length,areaCount:countries.length});
}
fs.writeFileSync(factPath,'// Population and catalogue: data/worldometer-countries.json; '+source.populationYear+' estimates.\n// Area figures retain the existing Worldometer area snapshot.\nconst countryFacts = '+JSON.stringify(context.facts,null,2)+';\n');
console.log('Built profile catalogue and population rankings from the same '+countries.length+'-entry Worldometer source.');
