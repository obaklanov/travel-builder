const travelData={
"laos":{"airports":[["VTE","Vientiane Wattay"],["LPQ","Luang Prabang"],["PKZ","Pakse"]],"base":1700,"hours":24,"costs":[55,22,15,18],"regions":[["Luang Prabang & northern Laos / North","BBAAWWWWWWBB"],["Vientiane & Vang Vieng / Center","BBAAWWWWWWBB"],["Pakse & Bolaven Plateau / South","BBAAWWWWWWBB"]],"seasonSources":[{"label":"Luang Prabang Tourism: climate","url":"https://tourismluangprabang.org/travel-guide/basic-information/"},{"label":"Lao Ministry of Public Works: seasonal climate","url":"https://mpwt.gov.la/download_project?id=129"}],"seasonNote":"Editorial sightseeing ratings: cooler dry months are favoured; heat, seasonal haze and monsoon conditions can change suitability. Southern regions use the broad national wet/dry pattern."},
"philippines":{"airports":[["MNL","Manila Ninoy Aquino"],["CEB","Mactan–Cebu"],["PPS","Puerto Princesa"],["MPH","Caticlan / Boracay"]],"base":1550,"hours":21,"costs":[75,28,18,22],"regions":[["Manila & western Luzon / North","BBBBAWWWWWAB"],["Cebu & Bohol / Visayas","BBBAAWWWWAAB"],["Palawan / West","BBBBAWWWWWAB"],["Boracay & Panay / Visayas","BBBBAWWWWWAB"]],"seasonSources":[{"label":"PAGASA: Philippine climate","url":"https://www.pagasa.dost.gov.ph/information/climate-philippines"},{"label":"Philippine Department of Tourism: regional weather","url":"https://www.tourismphilippines.com.au/facts/weatherandclimate"}],"seasonNote":"Editorial ratings favour the cooler dry-season months for general sightseeing and island visits. Rainfall varies within each region; typhoons and sea conditions can disrupt travel outside these broad averages."},
"malaysia":{"airports":[["KUL","Kuala Lumpur"],["PEN","Penang"],["LGK","Langkawi"],["TGG","Kuala Terengganu"],["BKI","Kota Kinabalu"],["KCH","Kuching"]],"base":1650,"hours":23,"costs":[80,28,18,22],"regions":[["Kuala Lumpur & Malacca / West","ABBAABBAAAAA"],["Penang & Langkawi / Northwest","BBBAAAAAWWAB"],["Terengganu & east-coast islands / East","WWABBBBBAAWW"],["Kota Kinabalu & western Sabah / Borneo","AABBBAAAAAWW"],["Kuching & western Sarawak / Borneo","WWAAABBBBAWW"]],"seasonSources":[{"label":"METMalaysia: regional climate","url":"https://www.met.gov.my/en/pendidikan/iklim-malaysia/"},{"label":"METMalaysia: monsoon seasons","url":"https://www.met.gov.my/en/pendidikan/fenomena-cuaca/"}],"seasonNote":"Editorial regional sightseeing ratings reflect differing monsoon exposure, not a weather forecast. East-coast island access can be seasonal; confirm local boat and accommodation operations."},
"brunei":{"airports":[["BWN","Bandar Seri Begawan / Brunei International"]],"base":1900,"hours":26,"costs":[100,32,25,25],"regions":[["Bandar Seri Begawan & Kampong Ayer / Brunei-Muara","WBBAABBBAAWW"],["Temburong rainforest / East","WBBAABBBAAWW"]],"seasonSources":[{"label":"Brunei Meteorological Department: climate","url":"https://met.gov.bn/SitePages/climate.aspx"}],"seasonNote":"Editorial outdoor sightseeing ratings favour the relatively drier February–March period and June–August. Rain is possible year-round. Temburong requires onward ground travel and local arrangements from Brunei International Airport."},

"france":{"airports": [["CDG", "Paris"], ["NCE", "Nice"], ["LYS", "Lyon"], ["MRS", "Marseille"], ["AJA", "Ajaccio"]], "base": 900, "hours": 8, "costs": [140, 50, 20, 25], "regions": [["Paris & Loire Valley (Center)", "WWABBBBBBAWW"], ["Normandy & Brittany (North)", "WWAABBBBBAWW"], ["Provence (South)", "AABBBBAABBAA"], ["French Riviera (South)", "AABBBBAABBAA"], ["Alps (East)", "WWAABBBBAAWW"], ["Corsica (Islands)", "WWABBBBBBAWW"]]},
"united-kingdom":{"airports": [["LHR", "London Heathrow"], ["EDI", "Edinburgh"], ["MAN", "Manchester"], ["BFS", "Belfast"]], "base": 950, "hours": 7, "costs": [160, 55, 25, 30], "regions": [["London & southern England (South)", "WWABBBBBBAWW"], ["Edinburgh & Highlands (North)", "WWAABBBBBAWW"], ["Wales & western England (West)", "WWAABBBBBAWW"], ["Northern Ireland (West)", "WWAABBBBBAWW"]]},
"turkey":{"airports": [["IST", "Istanbul"], ["ASR", "Kayseri"], ["AYT", "Antalya"], ["ADB", "İzmir"], ["TZX", "Trabzon"]], "base": 1200, "hours": 12, "costs": [80, 30, 15, 20], "regions": [["Istanbul & Marmara (West)", "WWABBBAABBAW"], ["Cappadocia (Center)", "WWABBAABBBAW"], ["Antalya & Mediterranean coast (South)", "AABBBWAABBAA"], ["İzmir & Aegean coast (West)", "WWBBBBAABBAW"], ["Trabzon & Black Sea coast (North)", "WWAABBBBBAWW"]]},
"peru":{"airports": [["LIM", "Lima"], ["CUZ", "Cusco"], ["IQT", "Iquitos"]], "base": 1050, "hours": 11, "costs": [75, 30, 15, 20], "regions": [["Lima & Pacific coast (West)", "BBBAAAWWAABB"], ["Cusco & Andes (South)", "WWAABBBBBAAW"], ["Iquitos & Amazon (East)", "WWAAABBBBAAW"]]},
"brazil":{"airports": [["GIG", "Rio de Janeiro"], ["SSA", "Salvador"], ["MAO", "Manaus"], ["IGU", "Foz do Iguaçu"], ["SLZ", "São Luís"]], "base": 1350, "hours": 13, "costs": [90, 35, 20, 25], "regions": [["Rio de Janeiro (East)", "AAABBBBBBBAA"], ["Salvador & Bahia (East)", "BBAAWWAABBBB"], ["Manaus & Amazon (North)", "WWAAABBBBAAW"], ["Iguaçu Falls (South)", "AABBBBBBBBAA"], ["Lençóis Maranhenses (North)", "WWAAABBBBAAW"]]},
"south-africa":{"airports": [["CPT", "Cape Town"], ["JNB", "Johannesburg"], ["DUR", "Durban"], ["GRJ", "George"]], "base": 1600, "hours": 21, "costs": [90, 35, 20, 25], "regions": [["Cape Town & Winelands (South)", "BBBBAWWAABBB"], ["Kruger & Lowveld (East)", "AAABBBBBBAAA"], ["Durban & KwaZulu-Natal coast (East)", "AABBBBBBBBAA"], ["Garden Route (South)", "BBBBBAAABBBB"]]},
"south-korea":{"airports": [["ICN", "Seoul Incheon"], ["PUS", "Busan"], ["CJU", "Jeju"]], "base": 1550, "hours": 17, "costs": [110, 35, 20, 25], "regions": [["Seoul & central mainland (North)", "WWBBBAAWBBAW"], ["Busan & southern mainland (South)", "AABBBAAWBBAA"], ["Jeju (Islands)", "AABBBAWWBBAA"]]},
"australia":{"airports": [["SYD", "Sydney"], ["MEL", "Melbourne"], ["CNS", "Cairns"], ["AYQ", "Uluru Ayers Rock"], ["PER", "Perth"], ["DRW", "Darwin"]], "base": 1900, "hours": 24, "costs": [150, 50, 25, 30], "regions": [["Sydney & New South Wales (East)", "BBBBAAAABBBB"], ["Melbourne & Victoria (South)", "BBBBAWWABBBB"], ["Cairns & Great Barrier Reef (East)", "WWAABBBBBAAW"], ["Uluru & Red Centre (Center)", "WWABBBBBBAAW"], ["Perth & southwest (West)", "BBBBAWWABBBB"], ["Darwin & Top End (North)", "WWAABBBBBAWW"]]},
"spain":{"airports": [["MAD", "Madrid"], ["BCN", "Barcelona"], ["AGP", "M\u00e1laga"], ["BIO", "Bilbao"], ["PMI", "Palma de Mallorca"], ["TFS", "Tenerife South"]], "base": 1000, "hours": 9, "costs": [120, 40, 20, 20], "regions": [["Madrid / Center", "WWABBBWWBBAW"], ["Barcelona / East", "AAABBBABBBAA"], ["Andalusia / South", "AABBBWWWBBAA"], ["Bilbao & Basque Country / North", "WWAABBBBBAAW"], ["Balearic Islands / Islands", "WWAABBBBBBAW"], ["Canary Islands / Islands", "AABBBBBBBBAA"]]},
"greece":{"airports": [["ATH", "Athens"], ["SKG", "Thessaloniki"], ["JTR", "Santorini"], ["HER", "Heraklion"], ["CFU", "Corfu"]], "base": 1200, "hours": 10, "costs": [115, 40, 20, 20], "regions": [["Athens & Peloponnese / South", "WWABBBWWBBAW"], ["Thessaloniki & mainland / North", "WWABBBBBBBAW"], ["Santorini & Cyclades / Islands", "WWAABBBBBBAW"], ["Crete / Islands", "AAABBBBBBBAA"], ["Corfu & Ionian Islands / Islands", "WWAABBBBBBAW"]]},
"costa-rica":{"airports": [["SJO", "San José"], ["LIR", "Liberia"]], "base": 750, "hours": 5.5, "costs": [100, 35, 25, 20], "regions": [["San José, Arenal & Monteverde (Center & North)", "BBBBAAAWWWWB"], ["Guanacaste & Manuel Antonio (West)", "BBBBAAAWWWWB"], ["Puerto Viejo & Caribbean coast (East)", "AABAAAABBBAA"]]},
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
    "Salento (Coffee region)"
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
    "Lisbon (Central coast)",
    "Porto (North)",
    "Faro (Algarve)",
    "Funchal (Madeira)",
    "Ponta Delgada (Azores)"
  ],
  "thailand": [
    "Bangkok / Center",
    "Chiang Mai / North",
    "Phuket & Andaman coast / South",
    "Koh Samui / Islands"
  ]
};
for(const [key,labels] of Object.entries(regionGeographyLabels))travelData[key].regions.forEach((region,index)=>{region[0]=labels[index];});
// Approved UK and France destinations; retain earlier region indices for saved links.
travelData["united-kingdom"].regions=[["London (Southeast England)","????????????"],["Edinburgh (Southeast Scotland)","????????????"],["Manchester (Northwest England)","????????????"],["Belfast (Northern Ireland)","????????????"],["Bath (Southwest England)","????????????"],["York (Yorkshire)","????????????"],["Windermere (Lake District)","????????????"],["St Ives (Cornwall)","????????????"],["Cardiff (South Wales)","????????????"],["Conwy (North Wales)","????????????"],["Inverness (Northern Highlands)","????????????"],["Fort William (Western Highlands)","????????????"],["Portree (Isle of Skye)","????????????"]];
travelData["united-kingdom"].airports=[["LHR","London Heathrow"],["LGW","London Gatwick"],["EDI","Edinburgh"],["MAN","Manchester"],["BFS","Belfast International"],["BHD","Belfast City"],["BRS","Bristol"],["LBA","Leeds Bradford"],["NQY","Cornwall Newquay"],["CWL","Cardiff"],["LPL","Liverpool"],["INV","Inverness"],["GLA","Glasgow"]];
travelData["france"].regions=[["Paris (Île-de-France)","????????????"],["Bayeux (Normandy)","????????????"],["Marseille (Mediterranean coast)","????????????"],["Nice (French Riviera)","????????????"],["Lyon (Rhône region)","????????????"],["Ajaccio (Corsica)","????????????"],["Saint-Malo (Brittany)","????????????"],["Tours (Loire Valley)","????????????"],["Strasbourg (Alsace)","????????????"],["Dijon (Burgundy)","????????????"],["Annecy (French Alps)","????????????"],["Avignon (Provence)","????????????"],["Bordeaux (Southwest)","????????????"],["Sarlat-la-Canéda (Dordogne)","????????????"],["Toulouse (Occitanie)","????????????"],["Biarritz (French Basque coast)","????????????"]];
travelData["france"].airports=[["CDG","Paris Charles de Gaulle"],["ORY","Paris Orly"],["CFR","Caen"],["MRS","Marseille"],["NCE","Nice"],["LYS","Lyon"],["AJA","Ajaccio"],["RNS","Rennes"],["SXB","Strasbourg"],["BSL","EuroAirport Basel Mulhouse"],["GVA","Geneva"],["MPL","Montpellier"],["BOD","Bordeaux"],["BVE","Brive Dordogne Valley"],["EGC","Bergerac"],["TLS","Toulouse"],["BIQ","Biarritz"]];
// Approved Spanish destinations; retain the existing first six indices.
travelData.spain.regions=[["Madrid (Center)","????????????"],["Barcelona (Catalonia)","????????????"],["Málaga (Costa del Sol)","????????????"],["Bilbao (Basque Country)","????????????"],["Palma (Mallorca)","????????????"],["Puerto de la Cruz (Tenerife)","????????????"],["Valencia (East coast)","????????????"],["Seville (Western Andalusia)","????????????"],["Granada (Eastern Andalusia)","????????????"],["Oviedo (Asturias)","????????????"],["Santiago de Compostela (Galicia)","????????????"],["Salamanca (Castile and León)","????????????"],["Zaragoza (Aragon)","????????????"],["Jaca (Pyrenees)","????????????"]];
travelData.spain.airports=[["MAD","Madrid"],["BCN","Barcelona"],["AGP","Málaga"],["BIO","Bilbao"],["PMI","Palma de Mallorca"],["TFN","Tenerife North"],["TFS","Tenerife South"],["VLC","Valencia"],["SVQ","Seville"],["GRX","Granada"],["OVD","Asturias"],["SCQ","Santiago de Compostela"],["VLL","Valladolid"],["ZAZ","Zaragoza"]];
// Approved Italian destinations; preserve existing six indices for saved links.
travelData.italy.regions=[["Rome (Lazio)","????????????"],["Venice (Veneto)","????????????"],["Florence (Tuscany)","????????????"],["Naples (Campania)","????????????"],["Catania (Eastern Sicily)","????????????"],["Ortisei (Dolomites)","????????????"],["Milan (Lombardy)","????????????"],["Turin (Piedmont)","????????????"],["Bologna (Emilia-Romagna)","????????????"],["La Spezia (Liguria / Cinque Terre)","????????????"],["Bari (Puglia)","????????????"],["Palermo (Western Sicily)","????????????"],["Cagliari (Sardinia)","????????????"]];
travelData.italy.airports=[["FCO","Rome Fiumicino"],["CIA","Rome Ciampino"],["VCE","Venice Marco Polo"],["TSF","Treviso"],["FLR","Florence"],["PSA","Pisa"],["NAP","Naples"],["CTA","Catania"],["BZO","Bolzano"],["INN","Innsbruck"],["VRN","Verona"],["MXP","Milan Malpensa"],["LIN","Milan Linate"],["BGY","Bergamo"],["TRN","Turin"],["BLQ","Bologna"],["GOA","Genoa"],["BRI","Bari"],["PMO","Palermo"],["CAG","Cagliari"]];
// Approved Colombia destinations. Existing four indices stay stable for saved links.
travelData.colombia.regions.push(...['Santa Marta (Caribbean coast)','Cali (Southwest)','Barranquilla (Caribbean coast)','Bucaramanga (Santander)','San Andrés (Caribbean islands)','Leticia (Amazonas)'].map(name=>[name,'????????????']));
travelData.colombia.regions[0][0]='Cartagena (Caribbean coast)';
travelData.colombia.regions[1][0]='Medellín (Antioquia)';
travelData.colombia.regions[2][0]='Bogotá (Central highlands)';
travelData.colombia.seasonNote='Existing four seasonal patterns are legacy editorial estimates. Season ratings for the newly added destinations are pending review. Country-level cost and flight samples remain estimates; airport-to-town transfers are not yet included.';
travelData.colombia.seasonSources=[{label:'Colombia Travel: destination regions',url:'https://colombia.travel/en/where-to-go'}];
// Display geographic qualifiers consistently in brackets.
for(const data of Object.values(travelData))data.regions.forEach(region=>{region[0]=region[0].replace(/ \/ (North|South|Center|West|East|Islands)$/, ' ($1)');});
// Weighted tourist-season profiles, generated from reviewed inputs.
const scoredSeasonality=typeof window!=='undefined'?window.TRAVEL_SEASONALITY:null;
if(scoredSeasonality)for(const [key,scored] of Object.entries(scoredSeasonality.countries)){
 const d=travelData[key];d.scoredSeasonality=scored;d.seasonByYear=Object.fromEntries(Object.entries(scored.years).map(([year,regions])=>[year,regions.map(months=>months.map(m=>m.rating).join(''))]));
 const year=new Date().getFullYear();d.regions.forEach((region,i)=>{region[1]=d.seasonByYear[year]?.[i]||region[1];});
 d.seasonSources=undefined;
}
function refreshScoredSeasonTable(key,panel,monthValue){
 const d=travelData[key],year=Number(monthValue.slice(0,4)),profiles=d.scoredSeasonality?.years[year];if(!profiles)return;
 panel.querySelector('.season-table').dataset.seasonYear=String(year);
 panel.querySelectorAll('.season-table tbody tr').forEach((row,i)=>row.querySelectorAll('td').forEach((cell,m)=>{
  const profileForType=d.scoredSeasonality.profiles[i],heading=row.querySelector('th');
  if(heading&&profileForType.climateType!=='standard'&&!heading.querySelector('.season-climate-type')){const badge=document.createElement('small');badge.className='season-climate-type';badge.textContent=(profileForType.climateType==='all-season'?'All season · −5 to 19°C':(profileForType.climateType==='beach'?'Beach':'Winter')+' · '+profileForType.temperatureTargetC+'°C target');badge.title=profileForType.climateTypeReason;heading.append(badge);}
  const result=profiles[i][m],text={B:'BEST',A:'AVERAGE',W:'WORST'}[result.rating],button=cell.querySelector('button');cell.className=text.toLowerCase();if(button){button.textContent=text;button.setAttribute('aria-label',d.regions[i][0]+', '+(m+1)+'/'+year+': '+text);}
  const profile=d.scoredSeasonality.profiles[i],climate=profile.months[m];cell.title=year+' relative month rank '+result.rank+'/12; tourist score '+result.score+'/100. '+(profile.climateType==='all-season'?'All season destination; no temperature penalty from −5°C to 19°C; current penalty '+result.temperaturePenalty+' climate points. ':profile.climateType+' destination; temperature target '+profile.temperatureTargetC+'°C. ')+'Climate '+result.factors.climate+', crowds '+result.factors.crowds+', festivals '+result.factors.festivals+', prices '+result.factors.prices+'. Historical daily mean '+climate.meanDailyC+'°C; rainfall '+climate.meanRainMmPerDay+' mm/day; relative humidity '+climate.meanRelativeHumidityPct+'%. '+(result.events.length?'Listed events: '+result.events.join(', ')+'. ':'No major event listed. ')+'Crowds and prices are provisional editorial estimates. Event dates require confirmation.'+(d.scoredSeasonality.profiles[i].climateReviewNote?' '+d.scoredSeasonality.profiles[i].climateReviewNote:'');
 }));
}
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
 const official='https://travel.gc.ca/destinations/'+(key==='turkey'?'turkiye':key);
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
 panel.innerHTML=`<h3>FLIGHTS</h3><p class="trip-region-summary">${getBudgetState(key).regionChoice.region} · ${travelMonthLabel(getBudgetState(key).departureDate.slice(0,7))}</p><p class="estimate-note">Illustrative CAD round-trip economy allowances and one-way journey times, to be confirmed. These are not current fares, schedules or ranked live results. Ground transfers to your destination are not included. Search opens your chosen airport and trip dates in Google Flights.</p><div class="departure-controls"><label>Departure city <select id="departure-city">${departureCities.map(([code,n])=>`<option value="${code}" ${code===guideDeparture?'selected':''}>${n} (${code})</option>`).join('')}</select></label>${departureDateField(key)}</div><div id="route-results"></div>`;
 const update=()=>{guideDeparture=panel.querySelector('select').value;
 const request=flightRequest(key,getBudgetState(key).days),routes=getFlightRoutes(key,request);
 panel.querySelector('.trip-region-summary').textContent=getBudgetState(key).regionChoice.region+' · '+travelMonthLabel(request.departureDate.slice(0,7));
 panel.querySelector('#route-results').innerHTML=`<div class="table-scroll"><table><thead><tr><th>Arrival hub</th><th>Return CAD</th><th>Journey out</th><th>Dates & fares</th></tr></thead><tbody>${routes.map(r=>`<tr><td>${r.city} (${r.code})</td><td>${r.verified?'':'Sample '}$${r.price}</td><td>${r.verified?'':'~'}${r.time} h</td><td><a class="flight-search-button" target="_blank" rel="noopener noreferrer" aria-label="Search flights from ${request.origin} to ${r.code}" href="${flightSearchUrl(request,r.code)}">Search flights ↗</a></td></tr>`).join('')}</tbody></table></div><p>Check stops, layovers and baggage in Google Flights.</p>`;};panel.querySelector('select').onchange=update;bindDepartureDate(key,panel,update);update();
 }else if(kind==='season'){
 panel.innerHTML=`<h3>WHEN. What month best to go?</h3><div class="table-scroll"><table class="season-table"><colgroup><col class="season-region-col">${Array.from({length:12},()=>'<col class="season-month-col">').join('')}</colgroup><thead><tr><th>Region</th>${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m=>`<th>${m}</th>`).join('')}</tr></thead><tbody>${d.regions.map(([region,months])=>`<tr><th>${region}</th>${[...months].map(c=>{const text={B:'BEST',A:'AVERAGE',W:'WORST'}[c]||'PENDING';return `<td class="${text.toLowerCase()}">${text}</td>`}).join('')}</tr>`).join('')}</tbody></table></div><p><a href="https://climateknowledgeportal.worldbank.org/" target="_blank" rel="noopener noreferrer">Explore World Bank climate data ↗</a></p>`;

 if(d.seasonSources){const note=document.createElement('p');note.className='estimate-note';note.textContent=d.seasonNote;panel.append(note);for(const source of d.seasonSources){const p=document.createElement('p'),link=document.createElement('a');link.href=source.url;link.textContent=source.label+' ↗';link.target='_blank';link.rel='noopener noreferrer';p.append(link);panel.append(p);}}

 const scroll=panel.querySelector('.table-scroll');
 const frame=document.createElement('div');frame.className='season-table-frame';
 scroll.before(frame);frame.append(scroll);
 const toolbar=document.createElement('div');toolbar.className='season-table-toolbar';
 const expand=document.createElement('button');expand.type='button';expand.className='season-table-expand';expand.textContent='Expand · all 12 months ↗';expand.setAttribute('aria-expanded','false');
 toolbar.append(expand);frame.prepend(toolbar);
 const backdrop=document.createElement('div');backdrop.className='season-table-backdrop';backdrop.hidden=true;backdrop.setAttribute('aria-hidden','true');frame.before(backdrop);
 const collapse=()=>{backdrop.hidden=true;frame.classList.remove('is-expanded');expand.setAttribute('aria-expanded','false');expand.textContent='Expand · all 12 months ↗';};
 backdrop.onclick=()=>{collapse();expand.focus();};
 expand.onclick=()=>{const open=frame.classList.toggle('is-expanded');backdrop.hidden=!open;expand.setAttribute('aria-expanded',String(open));expand.textContent=open?'Close expanded table ×':'Expand · all 12 months ↗';};
 frame.addEventListener('keydown',event=>{if(event.key==='Escape'&&frame.classList.contains('is-expanded')){event.preventDefault();event.stopPropagation();collapse();expand.focus();}});
 setupSeasonChoice(key,panel,()=>{collapse();panel.querySelector('#travel-region').focus();});
 if(d.scoredSeasonality){
  const explanation=document.createElement('details');explanation.className='season-score-method';const title=document.createElement('summary');title.textContent='How these tourist ratings are calculated';const copy=document.createElement('p');copy.textContent='Each base is compared only with its own 12 months: exactly four BEST, four AVERAGE and four WORST. Temperature ranks by closeness to the base’s target: standard 19°C, beach 25°C, winter −5°C. All season places have no temperature penalty from −5°C to 19°C; climate uses rain 60% and humidity 40%, minus 2 climate points per °C beyond those limits, floored at zero. Rain ranks by closeness to 5 mm/calendar day, humidity by closeness to 55%. Component rank scores run from 100 to 0; other types combine temperature 50%, rain 30%, humidity 20%. Overall: climate 60%, festivals 20%, crowds 10%, prices 10%. Final bands follow within-base weighted-score rank, not absolute thresholds. Ties use calendar-month order. BEST means relatively better for this base, not necessarily ideal weather. Crowd and price rankings are editorial proxies; festivals retain evidence-based 100/50/0 scores, without inventing events for empty months. Climate is 2016–2025 ERA5 model data; Salento and Bucaramanga rainfall remains pending local validation.';explanation.append(title,copy);
  const links=new Map([['https://open-meteo.com/en/docs/historical-weather-api','Climate data: Open-Meteo / Copernicus ERA5 (CC BY 4.0)']]);for(const profile of d.scoredSeasonality.profiles){for(const url of profile.climateTypeSources||[])links.set(url,'Destination climate type reference');for(const url of [...profile.crowds.sourceUrls,...profile.prices.sourceUrls])links.set(url,'Seasonal crowd / price guidance');for(const event of profile.events)links.set(event.sourceUrl,event.name);}
  for(const [url,label] of links){const line=document.createElement('p'),link=document.createElement('a');link.href=url;link.textContent=label+' ↗';link.target='_blank';link.rel='noopener noreferrer';line.append(link);explanation.append(line);}panel.append(explanation);
 }
 }else if(kind==='insurance'){
 panel.innerHTML=`<h3>Travel insurance</h3><p>Start with emergency medical cover, then assess trip cancellation, interruption and baggage cover against your bookings and existing benefits.</p><ul><li>Check medical evacuation and repatriation.</li><li>Confirm pre-existing condition and stability clauses in writing.</li><li>Check deductibles, activity exclusions, destination advisories and coverage for the full trip.</li><li>Check whether the insurer pays hospitals directly and offers 24-hour assistance.</li></ul><p class="estimate-note">Price requires a personal quote: age, health, destination, duration, deductible and coverage all matter. For this prototype only, allow CAD $5/day as a planning placeholder, not an insurer quote or coverage recommendation.</p><p><a href="https://travel.gc.ca/travelling/documents/travel-insurance" target="_blank" rel="noopener noreferrer">Government of Canada: choosing coverage ↗</a></p>`;
 }else{
 const state=getBudgetState(key);
 state.nights=Math.max(0,state.days-1);state.nightsManual=false;
 const flight=getFlightRoutes(key,flightRequest(key,state.days))[0];
 if(!state.flightManual)state.rates[0]=roundBudgetRate(flight.price,0);
 if(!state.builderAllowances)state.rates=state.rates.map(roundBudgetRate);
 panel.innerHTML=`<h3>MONEY. How much do you need?</h3><p class="estimate-note">Sample CAD allowances, to be confirmed. Accommodation is for the whole group; other amounts start per person. Airfare matches FLIGHTS for your departure city; live fares are not connected. Edit amounts to suit your trip. Excludes insurance, visas and major paid activities.</p><div class="departure-controls budget-trip-controls"><div class="budget-route-info"><p class="budget-route-summary">${departureCities.find(([code])=>code===guideDeparture)?.[1]||guideDeparture} (${guideDeparture}) → ${flight.city} (${flight.code})</p></div>${departureDateField(key)}<label>Days <span class="trip-days-control"><input id="trip-days" type="number" min="1" max="90" value="${state.days}"><button type="button" id="trip-days-toggle" aria-label="Suggested trip lengths" aria-expanded="false" aria-controls="trip-days-options"></button><span id="trip-days-options" class="trip-days-options" hidden></span></span></label><label>Nights <input id="trip-nights" type="number" value="${state.nights}" readonly aria-readonly="true"><small>Days − 1</small></label></div><label class="budget-group-label">How many people are travelling in your group? <select id="budget-group-size">${Array.from({length:10},(_,i)=>i+1).map(n=>`<option value="${n}" ${n===state.people?'selected':''}>${n}</option>`).join('')}</select></label><table class="group-budget-table"><thead><tr><th>Category</th><th>Basis</th><th>Budget per person</th><th># of people</th><th>Total budget</th></tr></thead><tbody>${[[`Flights (round trip, ${guideDeparture} ↔ ${flight.code})`,'one-time'],['Accommodation','per night'],['Food','per day'],['Internal transport','per day'],[state.fitnessWeekly?'Miscellaneous + fitness (CAD '+state.fitnessWeekly+(state.fitnessBasis==='group-week'?' total/week)':'/person/week)'):'Miscellaneous','per day']].map(([n,b],i)=>{const control=budgetAllowanceControl(n,i,state.rates[i]);return `<tr><td>${n}</td><td>${b}</td><td>${i===1?'':control}</td><td class="budget-people">${i===1?'—':state.people}</td><td>${i===1?control:'<span class="budget-line-total"></span>'}</td></tr>`;}).join('')}</tbody></table><output id="budget-total" aria-live="polite"></output>`;
 const daysInput=panel.querySelector('#trip-days'),nightsInput=panel.querySelector('#trip-nights'),rateInputs=[...panel.querySelectorAll('.budget-rate')];
 const update=()=>{
  const route=getFlightRoutes(key,flightRequest(key,state.days))[0];
  let dates=panel.querySelector('.budget-date-summary');if(!dates){dates=document.createElement('p');dates.className='budget-date-summary';panel.querySelector('.budget-route-info').append(dates);}const datesRequest=flightRequest(key,state.days);dates.textContent='Trip: '+datesRequest.departureDate+' – '+datesRequest.returnDate;
  const money=value=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value);
  panel.querySelectorAll('.group-budget-table tbody tr').forEach((row,i)=>{if(i===1)return;row.querySelector('.budget-people').textContent=state.people;row.querySelector('.budget-line-total').textContent=money(state.rates[i]*state.people);});
  const total=tripTotalFromRates(state.rates,state.days,state.nights,state.people),average=document.createElement('small');average.className='budget-per-person-average';average.textContent=' ('+money(total/state.people)+' per person)';panel.querySelector('#budget-total').replaceChildren(document.createTextNode('Estimated total: '+money(total)),average);
 };
 const syncFlight=()=>{if(!state.flightManual){state.rates[0]=roundBudgetRate(getFlightRoutes(key,flightRequest(key,state.days))[0].price,0);rateInputs[0].value=state.rates[0];}};
 daysInput.oninput=()=>{if(daysInput.value==='')return;state.days=Math.min(90,Math.max(1,Math.floor(Number(daysInput.value)||1)));if(!state.nightsManual){state.nights=Math.max(0,state.days-1);nightsInput.value=state.nights;}syncFlight();update();};
 panel.querySelector('#budget-group-size').onchange=event=>{state.people=Math.max(1,Math.min(10,Number(event.target.value)||1));update();};
 setupTripDaySuggestions(panel,daysInput);
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
function getBudgetState(key){
 if(budgetStates[key])return budgetStates[key];
 const params=new URLSearchParams(location.search),days=initialTripDays(key);
 const state={fitnessBasis:params.get('fitnessBasis')||'person-week',fitnessWeekly:Math.max(0,Number(params.get('fitnessWeekly'))||0),days,nights:days-1,nightsManual:false,flightManual:false,people:Math.max(1,Math.min(10,Math.floor(Number(params.get('people')))||1)),rates:[travelData[key].base,...travelData[key].costs]};
 if(params.get('country')===key&&params.has('builderRegion')){
  const index=Number(params.get('builderRegion')),date=params.get('start');
  if(Number.isInteger(index)&&travelData[key].regions[index]&&validTripDate(date)){
   state.regionChoice={index,region:travelData[key].regions[index][0],month:date.slice(0,7)};state.departureDate=date;
   state.rates=state.rates.map((fallback,i)=>{const raw=params.get('builderRate'+i),value=Number(raw);return raw!==null&&Number.isFinite(value)&&value>=0&&value<=100000?value:fallback;});
   state.flightManual=true;state.builderAllowances=true;
  }
 }
 return budgetStates[key]=state;
}
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
 if(!departureCities.some(([code])=>code===request.origin))return [];
 const d=travelData[key],i=Math.max(0,departureCities.findIndex(r=>r[0]===request.origin)),asia=['laos','philippines','malaysia','brunei','japan','thailand','vietnam','indonesia','south-korea','australia'].includes(key);
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
const regionGateways = {
"laos":[["LPQ"],["VTE"],["PKZ"]],
"philippines":[["MNL"],["CEB"],["PPS"],["MPH"]],
"malaysia":[["KUL"],["PEN","LGK"],["TGG"],["BKI"],["KCH"]],
"brunei":[["BWN"],["BWN"]],
"france":[["CDG","ORY"],["CFR","CDG"],["MRS"],["NCE"],["LYS"],["AJA"],["RNS"],["CDG","ORY"],["SXB","BSL"],["LYS","CDG"],["GVA","LYS"],["MRS","MPL"],["BOD"],["BVE","EGC"],["TLS"],["BIQ"]],"united-kingdom":[["LHR","LGW"],["EDI"],["MAN"],["BFS","BHD"],["BRS"],["LBA","MAN"],["MAN"],["NQY"],["CWL","BRS"],["MAN","LPL"],["INV"],["INV","GLA"],["INV","GLA"]],"turkey":[["IST"], ["ASR"], ["AYT"], ["ADB"], ["TZX"]],"peru":[["LIM"], ["CUZ"], ["IQT"]],"brazil":[["GIG"], ["SSA"], ["MAO"], ["IGU"], ["SLZ"]],"south-africa":[["CPT"], ["JNB"], ["DUR"], ["GRJ"]],"south-korea":[["ICN"], ["PUS"], ["CJU"]],"australia":[["SYD"], ["MEL"], ["CNS"], ["AYQ"], ["PER"], ["DRW"]],"spain":[["MAD"],["BCN"],["AGP"],["BIO"],["PMI"],["TFN","TFS"],["VLC"],["SVQ"],["GRX","AGP"],["OVD"],["SCQ"],["MAD","VLL"],["ZAZ"],["ZAZ","BCN"]],"greece":[["ATH"], ["SKG"], ["JTR"], ["HER"], ["CFU"]],"costa-rica": [["SJO"],["SJO","LIR"],["SJO"]],"indonesia":[["DPS"], ["CGK"], ["YIA"], ["LOP"], ["LBJ"]],"united-states": [["JFK"], ["MIA"], ["LAX"], ["LAX"], ["SEA"]], "vietnam": [["HAN"], ["DAD"], ["SGN"], ["PQC"]], "colombia": [["CTG"], ["MDE"], ["BOG"], ["PEI","AXM"], ["SMR"], ["CLO"], ["BAQ"], ["BGA"], ["ADZ"], ["LET"]], "morocco": [["RAK"], ["FEZ"], ["AGA"], ["CMN"]], "egypt": [["CAI"], ["LXR"], ["HRG"], ["CAI"]], "new-zealand": [["AKL"], ["AKL"], ["WLG"], ["ZQN"], ["ZQN"]], "argentina": [["EZE"], ["IGR"], ["MDZ"], ["FTE"], ["BRC"], ["SLA"]], "italy": [["FCO","CIA"],["VCE","TSF"],["FLR","PSA"],["NAP"],["CTA"],["BZO","INN","VRN"],["MXP","LIN","BGY"],["TRN"],["BLQ"],["PSA","GOA"],["BRI"],["PMO"],["CAG"]], "mexico": [["CUN"], ["MEX"], ["OAX"], ["PVR"], ["SJD"]], "japan": [["HND", "NRT", "KIX"], ["CTS"], ["OKA"]], "portugal": [["LIS"], ["OPO"], ["FAO"], ["FNC"], ["PDL"]], "thailand": [["BKK"], ["CNX"], ["HKT"], ["USM"]]};
function regionalAirports(key,request){
 const codes=regionGateways[key]?.[request.regionIndex];
 return codes?travelData[key].airports.filter(([code])=>codes.includes(code)):travelData[key].airports;
}
function travelMonthLabel(value){return new Date(value+'-01T12:00:00').toLocaleDateString('en-CA',{month:'long',year:'numeric'});}
function setupSeasonChoice(key,panel,onSelect=()=>{}){
 const state=getBudgetState(key),d=travelData[key],current=flightRequest(key,state.days).departureDate;
 const box=document.createElement('form');box.className='season-choice';
 box.innerHTML='<div class="departure-controls"><label>Travel region <select id="travel-region" required><option value="">Choose a region</option>'+d.regions.map(([region],i)=>'<option value="'+i+'" '+(state.regionChoice?.index===i?'selected':'')+'>'+region+'</option>').join('')+'</select></label><label>Travel month <input type="month" id="travel-month" max="2028-12" min="'+new Date().toISOString().slice(0,7)+'" value="'+(state.regionChoice?.month||current.slice(0,7))+'" required></label></div><button type="submit" class="season-confirm">Use this region and month →</button><p class="season-choice-status" role="status"></p>';
 panel.querySelector('h3').after(box);
 panel.querySelectorAll('.season-table tbody tr').forEach((row,index)=>{
  [...row.querySelectorAll('td')].forEach((cell,month)=>{
   const text=cell.textContent;const button=document.createElement('button');button.type='button';button.className='season-cell-choice';button.textContent=text;
   button.setAttribute('aria-label',d.regions[index][0]+', '+['January','February','March','April','May','June','July','August','September','October','November','December'][month]+': '+text);
   button.onclick=()=>{box.querySelector('#travel-region').value=String(index);const now=new Date(),selectedYear=Number(box.querySelector('#travel-month').value.slice(0,4)),year=Math.max(selectedYear||now.getFullYear(),now.getFullYear()+(month<now.getMonth()?1:0));box.querySelector('#travel-month').value=year+'-'+String(month+1).padStart(2,'0');refreshScoredSeasonTable(key,panel,box.querySelector('#travel-month').value);saveSelection();onSelect();box.querySelector('.season-choice-status').textContent='Selected '+d.regions[index][0]+' · '+travelMonthLabel(box.querySelector('#travel-month').value)+'.';};cell.replaceChildren(button);cell.onclick=event=>{if(event.target===cell)button.onclick();};
  });
 });
 const seasonMonthInput=box.querySelector('#travel-month');refreshScoredSeasonTable(key,panel,seasonMonthInput.value);seasonMonthInput.addEventListener('change',()=>refreshScoredSeasonTable(key,panel,seasonMonthInput.value));
 function saveSelection(){
  const region=box.querySelector('#travel-region'),month=box.querySelector('#travel-month');
  if(!region.value||!/^\d{4}-\d{2}$/.test(month.value)||month.value<new Date().toISOString().slice(0,7)||month.value>'2028-12'){box.querySelector('.season-choice-status').textContent='Choose a region and a travel month between now and December 2028.';return false;}
  const index=Number(region.value),oldDay=Number(current.slice(8)),[year,m]=month.value.split('-').map(Number);
  const now=new Date(),minimum=month.value===now.toISOString().slice(0,7)?now.getDate():1;
  const day=Math.max(minimum,Math.min(oldDay,new Date(year,m,0).getDate()));
  state.departureDate=month.value+'-'+String(day).padStart(2,'0');state.regionChoice={index,region:d.regions[index][0],month:month.value};
  return true;
 }
 box.onsubmit=event=>{event.preventDefault();if(saveSelection())renderTravelDetail(key,'flights');};
}

for(const [key,airports] of Object.entries({"united-states": [["SEA", "Seattle"]], "vietnam": [["PQC", "Phu Quoc"]], "colombia": [["PEI", "Pereira"], ["AXM", "Armenia"], ["SMR", "Santa Marta"], ["BAQ", "Barranquilla"], ["BGA", "Bucaramanga"], ["ADZ", "San Andrés"], ["LET", "Leticia"]], "argentina": [["IGR", "Puerto Iguazú"], ["FTE", "El Calafate"], ["SLA", "Salta"]], "mexico": [["OAX", "Oaxaca"], ["PVR", "Puerto Vallarta"]], "japan": [["CTS", "Sapporo New Chitose"], ["OKA", "Okinawa Naha"]], "portugal": [["FNC", "Funchal"]]}))travelData[key].airports.push(...airports);

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

function setupTripDaySuggestions(panel,input){
 const toggle=panel.querySelector('#trip-days-toggle'),list=panel.querySelector('#trip-days-options');
 const presets=[...Array.from({length:10},(_,i)=>i+1),12,14,16,18,20,21,25,30,35,40,45,50,60,70,80,90];
 const close=()=>{list.hidden=true;toggle.setAttribute('aria-expanded','false');};
 toggle.onclick=()=>{
  if(!list.hidden){close();return;}
  list.replaceChildren();
  presets.forEach(days=>{const option=document.createElement('button');option.type='button';option.textContent=days===14?'2 weeks':days===21?'3 weeks':days+' '+(days===1?'day':'days');if(days===Number(input.value))option.className='current';option.onclick=event=>{input.value=String(days);input.oninput();close();if(event.detail===0)input.focus();};list.append(option);});
  list.hidden=false;toggle.setAttribute('aria-expanded','true');
  const options=[...list.children],selected=list.querySelector('.current')||options.reduce((best,item,i)=>Math.abs(presets[i]-Number(input.value))<Math.abs(presets[options.indexOf(best)]-Number(input.value))?item:best,options[0]);
  list.scrollTop=Math.max(0,selected.offsetTop-(list.clientHeight-selected.offsetHeight)/2);
 };
 panel.addEventListener('click',event=>{if(!event.target.closest('.trip-days-control'))close();});
 panel.addEventListener('keydown',event=>{if(event.key==='Escape'&&!list.hidden){event.preventDefault();event.stopPropagation();close();toggle.focus();}});
 input.onchange=()=>{input.value=String(Math.min(90,Math.max(1,Math.floor(Number(input.value)||1))));input.oninput();};
}
