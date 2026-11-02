'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'data/worldometer-countries.json'),'utf8'));
const countries=source.countries;
const populationTotal=countries.reduce((sum,c)=>sum+c.population,0),areaTotal=countries.reduce((sum,c)=>sum+c.area,0);
const profileFacts=Object.fromEntries(countries.map(c=>[c.code,{population:c.population,populationRank:c.populationRank,populationCount:countries.length,area:c.area,areaRank:c.areaRank,areaCount:countries.length}]));
if(countries.some(c=>!(Number.isFinite(c.area)&&c.area>=0)||!(c.areaRank>0)))throw Error('Missing area facts');
fs.writeFileSync(path.join(root,'dist/profile-country-info.json'),JSON.stringify(profileFacts,null,2)+'\n');
if(countries.length!==234||new Set(countries.map(c=>c.code)).size!==234||new Set(countries.map(c=>c.populationRank)).size!==234)throw Error('Expected 234 unique Worldometer countries and ranks.');
const classification=JSON.parse(fs.readFileSync(path.join(root,'data/country-classification.json'),'utf8'));
const countryCodes=new Set(classification.countryCodes);
if(countryCodes.size!==195)throw Error('Expected 195 countries');
const catalogue=countries.map(c=>({...c,classification:countryCodes.has(c.code)?'country':['TWN','COK','NIU','ESH'].includes(c.code)?'other':'territory'})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
fs.writeFileSync(path.join(root,'dist/country-catalog.json'),JSON.stringify(catalogue,null,2)+'\n');
const factPath=path.join(root,'dist/country-facts.js');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(factPath,'utf8')+'\nthis.facts=countryFacts;',context);
const keys={"spain":"ESP","greece":"GRC","costa-rica":"CRI","indonesia":"IDN","united-states":"USA","vietnam":"VNM","colombia":"COL","morocco":"MAR",egypt:'EGY','new-zealand':'NZL',argentina:'ARG',italy:'ITA',japan:'JPN',portugal:'PRT',mexico:'MEX',thailand:'THA'};
for(const [key,code] of Object.entries(keys)){
 const row=countries.find(c=>c.code===code);if(!row)throw Error('Missing country '+key);context.facts[key] ||= {};
 Object.assign(context.facts[key],{population:row.population,populationRank:row.populationRank,populationCount:countries.length,populationShare:(row.population/populationTotal*100).toFixed(2),area:row.area,areaRank:row.areaRank,areaShare:(row.area/areaTotal*100).toFixed(2),areaCount:countries.length});
}
fs.writeFileSync(factPath,'// Population and catalogue: data/worldometer-countries.json; '+source.populationYear+' estimates.\n// Total area and rankings: the same Worldometer source snapshot used by profiles.\nconst countryFacts = '+JSON.stringify(context.facts,null,2)+';\n');
console.log('Built profile catalogue, population and total-area rankings from the same '+countries.length+'-entry Worldometer source.');
