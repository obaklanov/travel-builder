'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ctx=vm.createContext({document:{addEventListener(){}}});
vm.runInContext(fs.readFileSync(path.join(root,'dist/treasures.js'),'utf8'),ctx);
const groups=vm.runInContext('newCountryTreasures',ctx),photos=vm.runInContext('treasurePhotos',ctx);
const source=JSON.parse(fs.readFileSync(path.join(root,'data/destination-treasures-28.json'),'utf8'));
for(const key of ['laos','philippines','malaysia','brunei']){
 const c=groups[key];assert(c);assert.equal(c.treasures.length,3);assert.equal(c.icons.length,3);assert(c.reward.includes('<svg'));assert(c.rewardLabel.includes('Collect all three. Earn your profile '+c.rewardName+'.'));
 for(let i=0;i<3;i++){const t=c.treasures[i],p=photos[t.name];assert(t.description&&t.region&&t.sourceUrl);assert(Number.isFinite(t.lat)&&Math.abs(t.lat)<=90);assert(Number.isFinite(t.lon)&&Math.abs(t.lon)<=180);assert(c.icons[i].includes('<svg'));assert(p&&p.alt&&p.author&&p.license&&p.sourceUrl&&p.licenseUrl);assert(fs.statSync(path.join(root,'dist',p.src)).size>10000);assert.equal(source.countries[key].treasures[i].name,t.name);}
 const html=vm.runInContext('countryTreasures('+JSON.stringify(key)+')',ctx);assert.equal((html.match(/class="treasure-badge"/g)||[]).length,3);assert(!html.includes('<img'),'Treasure photos stay lazy until selected');
}
console.log('PASS: twelve treasure definitions, distinct SVG badges, source links, map coordinates, local licensed photos and lazy initial rendering.');
