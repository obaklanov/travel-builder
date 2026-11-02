const mexicoTreasureData=[{"name":"Chichén Itzá","subtitle":"Ancient wonder","description":"An ancient Maya city celebrated for the stepped Temple of Kukulcán and its remarkable ceremonial monuments.","region":"Yucatán, Mexico","lat":20.6843,"lon":-88.5678},{"name":"El Arco","subtitle":"Sea & stone","description":"A natural granite arch rising from the sea at Land’s End, the dramatic southern tip of the Baja California peninsula.","region":"Baja California Sur, Mexico","lat":22.876,"lon":-109.8947},{"name":"Zócalo","subtitle":"Historic Mexico City","description":"Mexico City’s grand central plaza, framed by the Metropolitan Cathedral and National Palace in the historic centre.","region":"Mexico City, Mexico","lat":19.4326,"lon":-99.1332}];
const mexicoTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 73h62L70 65H30zM27 64h46l-7-9H34zM34 54h32l-5-9H39zM40 44h20V33H40zM44 33V23h12v10M47 73V43h6v30M43 23h14\"/><path d=\"M49 48h2m-2 5h2m-2 5h2m-2 5h2m-2 5h2\"/><path d=\"M13 79h74M18 21l3 4m-6 4h5m57-8-3 4m8 4h-5\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 70l5-27 12-15 11 4 9 10 11-3 9-17 13 9 4 39H66l-4-17-7-7-8 1-8 10-3 13z\"/><path d=\"M20 62l6-18 9-8m38-3 6 8 3 20M14 77q8-5 16 0t16 0 16 0 16 0 10 0M19 85q8-5 16 0t16 0 16 0 14 0\"/><circle cx=\"51\" cy=\"21\" r=\"7\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 70V37h14v33m42 0V37h14v33M13 37h18l-4-9h-10zM69 37h18l-4-9H73zM20 28V18m58 10V18M17 21h6m52 0h6M31 70V48l19-15 19 15v22M44 70V56a6 6 0 0 1 12 0v14M29 72h42M36 48h28\"/><circle cx=\"50\" cy=\"45\" r=\"3\"/><path d=\"M21 43v6m0 6v6m57-18v6m0 6v6M11 78h78M17 86l16-8m50 8-16-8M50 78v10\"/></svg>"];
function mexicoTreasures(key){if(key!=='mexico')return '';return '<section class="mexico-treasures" aria-label="Mexico treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF MEXICO — Collect all 3. Earn your profile sombrero.</span><svg class="sombrero-outline" viewBox="0 0 100 78" role="img" aria-label="Golden sombrero profile reward"><defs><linearGradient id="reward-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0b6"/><stop offset=".4" stop-color="#d9a643"/><stop offset=".7" stop-color="#f6d77d"/><stop offset="1" stop-color="#a66d24"/></linearGradient><linearGradient id="reward-crown"><stop stop-color="#b77b2e"/><stop offset=".5" stop-color="#ffe8a0"/><stop offset="1" stop-color="#be8431"/></linearGradient></defs><ellipse cx="50" cy="61" rx="43" ry="11" fill="#67451b" opacity=".15"/><path d="M7 49Q6 39 28 42L72 42Q94 38 94 49Q91 65 50 67Q10 65 7 49Z" fill="url(#reward-gold)" stroke="#87602b" stroke-width="1.5"/><path d="M28 44Q32 34 35 22Q40 6 50 9Q61 7 66 23L73 44Q52 57 28 44Z" fill="url(#reward-crown)" stroke="#87602b" stroke-width="1.5"/><path d="M31 36Q50 47 70 36L73 44Q51 57 28 44Z" fill="#8c4c31" stroke="#70452b"/><path d="M34 41l5 4 5-1 5 4 5-2 5 1 5-5 5-1" fill="none" stroke="#f8d783" stroke-width="2"/><path d="M11 49Q50 72 90 48M15 54Q50 73 86 54" fill="none" stroke="#fff0b0" stroke-width="1.4"/><path d="M39 22Q43 12 48 13" fill="none" stroke="#fff1be" stroke-width="2" stroke-linecap="round"/><path d="M14 19v10m-5-5h10M83 17v8m-4-4h8" stroke="#c2984c" stroke-width="1.3" stroke-linecap="round"/></svg></p><div class="treasure-badges">'+mexicoTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+mexicoTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

function clearTreasureDetails(){const panel=document.querySelector('.treasure-inline-details');if(panel){panel.hidden=true;panel.replaceChildren();}document.querySelectorAll('[data-treasure]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});}
function setupTreasureDetails(){document.querySelectorAll('[data-treasure]').forEach(button=>button.onclick=()=>{
 if(button.getAttribute('aria-pressed')==='true'){clearTreasureDetails();return;}
 document.querySelectorAll('[data-treasure]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
 const newKey=button.closest('[data-treasure-country]')?.dataset.treasureCountry;
 const treasureData=newKey?newCountryTreasures[newKey].treasures:button.closest('.argentina-treasures')?argentinaTreasureData:button.closest('.italy-treasures')?italyTreasureData:button.closest('.japan-treasures')?japanTreasureData:button.closest('.portugal-treasures')?portugalTreasureData:button.closest('.thailand-treasures')?thailandTreasureData:mexicoTreasureData;
 const t=treasureData[Number(button.dataset.treasure)],panel=document.querySelector('.treasure-inline-details');
 panel.innerHTML='<h3>'+t.name+'</h3><p>'+t.description+'</p><p class="treasure-region">'+t.region+'</p><a class="treasure-map-link" href="https://www.google.com/maps/search/?api=1&amp;query='+t.lat+','+t.lon+'" target="_blank" rel="noopener noreferrer">Latitude '+t.lat.toFixed(4)+'° · Longitude '+t.lon.toFixed(4)+'° ↗ Google Maps</a>';appendTreasurePhoto(t,panel);panel.hidden=false;
});}
document.addEventListener('click',event=>{if(event.target.closest('[data-treasure]'))return;const link=event.target.closest('.treasure-map-link');if(link){setTimeout(clearTreasureDetails,0);return;}clearTreasureDetails();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')clearTreasureDetails();});

const thailandTreasureData=[{"name":"Grand Palace","subtitle":"Royal heritage","description":"Bangkok’s ornate royal palace complex, home to the Temple of the Emerald Buddha and a defining symbol of Thai craftsmanship.","region":"Bangkok, Thailand","lat":13.7501,"lon":100.492},{"name":"Maya Bay","subtitle":"Island paradise","description":"A turquoise bay enclosed by limestone cliffs on Ko Phi Phi Leh, made internationally famous by The Beach.","region":"Krabi, Thailand","lat":7.6782,"lon":98.765},{"name":"Doi Inthanon","subtitle":"Above the clouds","description":"Thailand’s highest mountain, surrounded by cool forests and misty northern landscapes. Its twin royal pagodas stand near the summit.","region":"Chiang Mai, Thailand","lat":18.5875,"lon":98.4867}];
const thailandTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 77h74M19 72V48h62v24M15 48l12-12h46l12 12zM24 36l12-12h28l12 12M35 24l15-9 15 9M50 15V6M30 72V54h12v18m16 0V54h12v18M47 72V50h6v22M22 43h56M36 31h28\"/><path d=\"M19 34l-5-7m67 7 5-7M40 20l-4-7m24 7 4-7\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 65l2-29 12-12 10 5 3 20M90 65l-3-35-14-13-9 13-3 20M13 58q37-21 74 0M13 66q37-15 74 0M18 75q8-4 16 0t16 0 16 0 16 0M24 34l-4 16m53-20 6 20\"/><circle cx=\"48\" cy=\"25\" r=\"8\"/><path d=\"M32 60h28l-6 6H38zM43 60V43m0 2 11 10H43\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 73l23-29 14 15 18-28 29 42M14 79h72M19 38V26h18v12M16 26l12-9 12 9M28 17V8M17 38h22M64 56V43h17v13M61 43l11-10 12 10M72 33v-8M62 56h21M24 67l7-8M51 70l12-20\"/><path d=\"M8 85q20-7 41 0t42 0\"/></svg>"];
const thailandReward="<svg class=\"elephant-reward\" viewBox=\"0 0 100 85\" role=\"img\" aria-label=\"Decorative golden elephant profile reward\"><defs><linearGradient id=\"elephant-gold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#fff0ba\"/><stop offset=\".5\" stop-color=\"#d4a04a\"/><stop offset=\"1\" stop-color=\"#a66d2c\"/></linearGradient></defs><ellipse cx=\"48\" cy=\"76\" rx=\"36\" ry=\"5\" fill=\"#765127\" opacity=\".16\"/><path d=\"M17 33Q20 17 42 21L57 24Q63 13 74 19Q85 24 84 36L85 53Q91 61 94 49Q100 65 88 68Q76 67 75 50L68 47L66 73H55L54 56H38L35 73H23V48Q14 47 17 33Z\" fill=\"url(#elephant-gold)\" stroke=\"#87602b\" stroke-width=\"1.6\"/><path d=\"M18 35Q9 39 12 48\" fill=\"none\" stroke=\"#87602b\" stroke-width=\"2\"/><path d=\"M55 27Q73 16 75 34Q73 49 61 43Z\" fill=\"#e7ba65\" stroke=\"#99703b\"/><path d=\"M29 22v25q13 10 26 0V25\" fill=\"#a45c3d\" stroke=\"#82502c\"/><path d=\"M33 26v17l9 5 9-5V28M35 35l7-6 7 7-7 7Z\" fill=\"none\" stroke=\"#f8dc8c\" stroke-width=\"1.5\"/><circle cx=\"79\" cy=\"30\" r=\"1.5\" fill=\"#49351e\"/><path d=\"M76 41l-5 10 10-6\" fill=\"#fff0c4\" stroke=\"#99703b\"/><path d=\"M28 69h7m22 0h8M22 15v-8m-4 4h8M87 13v-6m-3 3h6\" fill=\"none\" stroke=\"#c2984c\" stroke-linecap=\"round\"/></svg>";
function countryTreasures(key){if(newCountryTreasures[key])return renderNewCountryTreasures(key);if(key==='argentina')return argentinaTreasures();if(key==='italy')return italyTreasures();if(key==='japan')return japanTreasures();if(key==='mexico')return mexicoTreasures(key);if(key==='portugal')return portugalTreasures();if(key!=='thailand')return '';return '<section class="thailand-treasures" aria-label="Thailand treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF THAILAND — Collect all 3. Earn your profile elephant.</span>'+thailandReward+'</p><div class="treasure-badges">'+thailandTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+thailandTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

const portugalTreasureData=[{"name":"Belém Tower","subtitle":"Maritime heritage","description":"A richly decorated sixteenth-century tower on the Tagus waterfront, an enduring symbol of Lisbon and Portugal’s seafaring history.","region":"Lisbon, Portugal","lat":38.6917,"lon":-9.2161},{"name":"Dom Luís I Bridge","subtitle":"Across the Douro","description":"Porto’s landmark double-deck iron bridge spans the Douro River, linking its historic riverside with Vila Nova de Gaia.","region":"Porto, Portugal","lat":41.1399,"lon":-8.6093},{"name":"Benagil Cave","subtitle":"Coastal wonder","description":"A golden sea cave on the Algarve coast, known for its circular skylight opening above the beach and Atlantic water.","region":"Faro, Portugal","lat":37.0872,"lon":-8.4237}];
const portugalTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 76h64M28 64V27h36v37M25 27h42V18h-7v5h-8v-5h-8v5h-8v-5h-7v9M27 38h38M27 52h38M38 64V52h13v12M36 33v5m10-5v5m10-5v5M35 44v5m13-5v5m10-5v5M17 66h66v10H17zM18 66l11-7m53 7-18-7M12 83q9-5 18 0t18 0 18 0 18 0\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 33h82M9 61h82M13 61q37-55 74 0M17 34v26m11-26v12m11-12v5m11-5v3m11-3v5m11-5v12m11-12v26M9 30h82M14 65v9m72-9v9M11 81q9-5 18 0t18 0 18 0 18 0M11 21h9v9m8-15h10v15m33-9h11v9\"/></svg>","<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 75V48Q15 18 50 16Q85 18 88 48v27M20 70V50q2-18 17-22M80 70V50q-2-18-17-22M13 65q37-20 74 0M15 73q35-17 70 0\"/><ellipse cx=\"50\" cy=\"29\" rx=\"13\" ry=\"7\"/><path d=\"M38 31l-6 24m30-24 6 24M20 82q8-4 16 0t16 0 16 0 16 0\"/></svg>"];
const portugalReward="<svg class=\"rooster-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Playful Portuguese Barcelos rooster profile reward\"><ellipse cx=\"49\" cy=\"82\" rx=\"29\" ry=\"4\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M35 53Q13 53 10 31q14 4 21 14Q13 21 26 12q2 18 15 27Q30 14 43 10q-3 18 5 30Z\" fill=\"#3e514a\" stroke=\"#6c6743\" stroke-width=\"1.5\"/><path d=\"M29 49q7-17 26-8l9-16 11 1 2 18Q91 57 71 70 43 83 29 49Z\" fill=\"#34463f\" stroke=\"#686444\" stroke-width=\"1.5\"/><path d=\"M64 28q-8-4-5-10 3-4 7 1-3-12 4-12 6 0 4 11 7-6 10-1 3 6-9 12Z\" fill=\"#b2533e\" stroke=\"#87432e\"/><path d=\"M76 29l12 5-11 5Z\" fill=\"#deb961\" stroke=\"#977538\"/><path d=\"M76 39q8 9 1 13-8-1-6-10Z\" fill=\"#bc6147\"/><circle cx=\"71\" cy=\"30\" r=\"2.2\" fill=\"#f9edc9\"/><circle cx=\"71\" cy=\"30\" r=\".9\" fill=\"#30372e\"/><path d=\"M42 50q11-11 22 0-2 14-15 14Z\" fill=\"#a8553f\" stroke=\"#dfbd74\"/><path d=\"M47 50q2-5 5 0 4-5 6 0 0 4-6 8-5-4-5-8Z\" fill=\"#f5d28c\"/><path d=\"M48 72l-1 9m13-10 2 10M40 83h13m3 0h13\" fill=\"none\" stroke=\"#a67b3c\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M38 43l-3-6m6 4-1-8M33 56l-5-4\" stroke=\"#e2b65e\" stroke-width=\"2\"/><circle cx=\"39\" cy=\"63\" r=\"2\" fill=\"#e6c978\"/><circle cx=\"68\" cy=\"59\" r=\"2\" fill=\"#e6c978\"/><path d=\"M57 36l5 3-5 4-5-4Z\" fill=\"#e7c872\"/></svg>";
function portugalTreasures(){return '<section class="thailand-treasures portugal-treasures" aria-label="Portugal treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF PORTUGAL — Collect all 3. Earn your profile rooster.</span>'+portugalReward+'</p><div class="treasure-badges">'+portugalTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+portugalTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

const japanTreasureData=[{"name": "Mount Fuji", "subtitle": "Sacred mountain", "description": "Japan’s iconic snow-capped volcano, celebrated in art and pilgrimage. Admire it from the Fuji Five Lakes or explore its surrounding landscapes.", "region": "Shizuoka / Yamanashi, Japan", "lat": 35.3606, "lon": 138.7274}, {"name": "Fushimi Inari", "subtitle": "A thousand gates", "description": "Kyoto’s celebrated shrine, where vermilion torii gates form winding corridors through the wooded slopes of Mount Inari.", "region": "Kyoto, Japan", "lat": 34.9671, "lon": 135.7727}, {"name": "Shibuya Crossing", "subtitle": "Tokyo in motion", "description": "Tokyo’s famous scramble crossing, surrounded by giant screens and the energy of one of Japan’s busiest urban districts.", "region": "Tokyo, Japan", "lat": 35.6595, "lon": 139.7005}];
const japanTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"72\" cy=\"25\" r=\"10\"/><path d=\"M9 75L47 21 88 75ZM34 40l9 5 5-9 7 9 8-4M12 82q9-4 18 0t18 0 18 0 18 0\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 23q37 9 74 0l-3 8q-34 8-68 0ZM19 43h62M26 33l-3 48m51-48 3 48M20 81h12m36 0h12M37 46l-2 31m28-31 2 31M32 52h36M40 59h20M44 59v17m12-17v17M35 86l15-9 15 9\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 46V17h19v34m4-7V9h21v34m8 3V22h26v29M14 24h10m-10 7h10m14-14h11m-11 8h11m-11 8h11m18-4h15m-15 8h15M10 58l31 21m-24-25 32 22m41-18L59 79m24-25L51 76M31 88l19-12 19 12\"/></svg>"];
const japanReward="<svg class=\"sashimi-reward\" viewBox=\"0 0 100 85\" role=\"img\" aria-label=\"Playful sashimi platter profile reward\"><defs><linearGradient id=\"sashimi-salmon\" x2=\"0\" y2=\"1\"><stop stop-color=\"#f6b38b\"/><stop offset=\"1\" stop-color=\"#d87958\"/></linearGradient><linearGradient id=\"sashimi-tuna\" x2=\"0\" y2=\"1\"><stop stop-color=\"#db8c7e\"/><stop offset=\"1\" stop-color=\"#ac5d59\"/></linearGradient></defs><ellipse cx=\"50\" cy=\"73\" rx=\"42\" ry=\"6\" fill=\"#70502b\" opacity=\".14\"/><path d=\"M8 51q42-20 84 0l-5 15q-37 17-74 0Z\" fill=\"#b3c2b2\" stroke=\"#687e70\" stroke-width=\"1.4\"/><ellipse cx=\"50\" cy=\"51\" rx=\"42\" ry=\"17\" fill=\"#e4e5ce\" stroke=\"#7e927e\" stroke-width=\"1.4\"/><ellipse cx=\"50\" cy=\"51\" rx=\"34\" ry=\"12\" fill=\"#cdd4b9\" stroke=\"#a2ae91\"/><path d=\"M22 50Q11 29 25 23l5 9 6-14 6 15 9-9 1 26Z\" fill=\"#7e9b6e\" stroke=\"#657b54\"/><path d=\"M24 42l6-14m1 18 6-21m-1 23 11-19\" stroke=\"#b2bd88\" fill=\"none\"/><path d=\"M25 44l11-13 15 5-4 19-18 3Z\" fill=\"url(#sashimi-tuna)\" stroke=\"#965951\" stroke-width=\"1.2\"/><path d=\"M38 45l11-14 16 6-4 20-19 3Z\" fill=\"url(#sashimi-salmon)\" stroke=\"#b47b59\" stroke-width=\"1.2\"/><path d=\"M53 48l10-14 16 6-3 18-18 4Z\" fill=\"url(#sashimi-salmon)\" stroke=\"#b47b59\" stroke-width=\"1.2\"/><path d=\"M44 40l16 5m-17 1 16 5m1-8 15 5m-17 1 16 5M31 40l13 4\" fill=\"none\" stroke=\"#ffe3bb\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M75 59q-2-8 4-10 8 1 8 9-6 5-12 1Z\" fill=\"#9aaf71\" stroke=\"#7d925d\"/><path d=\"M18 59q-5-8 3-8 7-3 9 3-2 7-12 5Z\" fill=\"#e6b4a0\" stroke=\"#bc9078\"/><path d=\"M64 14l29 25M60 18l29 25\" stroke=\"#8d613c\" stroke-width=\"2.6\" stroke-linecap=\"round\"/></svg>";
function japanTreasures(){return '<section class="thailand-treasures japan-treasures" aria-label="Japan treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF JAPAN — Collect all 3. Earn your profile sashimi platter.</span>'+japanReward+'</p><div class="treasure-badges">'+japanTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+japanTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

const italyTreasureData=[{"name": "Colosseum", "subtitle": "Ancient Rome", "description": "Rome’s monumental ancient amphitheatre, where tiers of arches preserve the scale and ingenuity of the Roman world.", "region": "Lazio, Italy", "lat": 41.8902, "lon": 12.4922}, {"name": "Grand Canal", "subtitle": "Venice by water", "description": "Venice’s great waterway winds past historic palaces and beneath the Rialto Bridge. This map point marks the canal at Rialto.", "region": "Veneto, Italy", "lat": 45.438, "lon": 12.3358}, {"name": "Leaning Tower of Pisa", "subtitle": "A playful tilt", "description": "The famously leaning bell tower of Pisa Cathedral, standing beside the cathedral and baptistery in Piazza dei Miracoli.", "region": "Tuscany, Italy", "lat": 43.723, "lon": 10.3966}];
const italyTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 42q37-18 74 0v32q-37 16-74 0ZM13 42q37 17 74 0M13 55q37 17 74 0M13 67q37 17 74 0M21 49v6m10-3v6m12-4v6m14-6v6m12-8v6m10-9v6M21 62v7m10-4v7m12-5v8m14-8v8m12-10v7m10-10v7M18 35l13-8h34l17 8\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 57V28h18v29m-14-35h10l4 6M73 57V21h17v36M70 21l12-9 11 9M16 35v7m5 4v7m58-24v7m6 6v8M29 48q21-26 42 0M29 53q21-25 42 0M35 43v6m8-11v6m8-7v6m8-5v6m7-1v6M28 67q19 11 39-1l-7 10H38ZM47 66V54m0 2 12 9M10 84q10-5 20 0t20 0 20 0 20 0\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g transform=\"rotate(10 50 50)\"><path d=\"M34 78V27q16-10 32 0v51M31 78q19 8 38 0M34 27q16 8 32 0M34 36q16 8 32 0M34 45q16 8 32 0M34 54q16 8 32 0M34 63q16 8 32 0M34 72q16 8 32 0M40 25V15q10-6 20 0v10M40 15q10 6 20 0M41 30v5m9-3v5m9-7v5M41 40v4m9-3v5m9-6v4M41 49v4m9-3v5m9-6v4M41 58v4m9-3v5m9-6v4M41 67v4m9-3v5m9-6v4\"/></g><path d=\"M24 87h52\"/></svg>"];
const italyReward="<svg class=\"pizza-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Pizza slice with a cheese pull profile reward\"><defs><linearGradient id=\"pizza-cheese\" x2=\"0\" y2=\"1\"><stop stop-color=\"#ffdf87\"/><stop offset=\"1\" stop-color=\"#e7b651\"/></linearGradient><linearGradient id=\"pizza-crust\" x2=\"0\" y2=\"1\"><stop stop-color=\"#e3ad68\"/><stop offset=\"1\" stop-color=\"#b67b3d\"/></linearGradient></defs><ellipse cx=\"50\" cy=\"81\" rx=\"32\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M19 29L52 70 84 28Q51 11 19 29Z\" fill=\"#b95e3e\" stroke=\"#99612e\" stroke-width=\"1.5\"/><path d=\"M24 31L52 65 79 30Q52 17 24 31Z\" fill=\"url(#pizza-cheese)\" stroke=\"#d59b40\"/><path d=\"M18 26q33-19 66-1l-3 9q-30-16-60 1Z\" fill=\"url(#pizza-crust)\" stroke=\"#9d6934\" stroke-width=\"1.5\"/><path d=\"M24 27q27-12 54-1\" fill=\"none\" stroke=\"#f4cc8b\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"39\" cy=\"37\" r=\"6\" fill=\"#b75b40\" stroke=\"#9f5038\"/><circle cx=\"64\" cy=\"38\" r=\"6\" fill=\"#b75b40\" stroke=\"#9f5038\"/><circle cx=\"51\" cy=\"52\" r=\"5\" fill=\"#c26b48\" stroke=\"#9f5038\"/><path d=\"M32 45q6-7 10 1-6 6-10-1m27 4q6-6 9-1-3 6-9 1\" fill=\"#7c9862\"/><path d=\"M46 64v9q0 9 4 3l2-7v10q1 7 4 0l2-17\" fill=\"#f4d584\" stroke=\"#c89443\" stroke-width=\"1.2\"/><path d=\"M38 37h2m23 0h2m-15 15h2\" stroke=\"#e4a382\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>";
function italyTreasures(){return '<section class="thailand-treasures italy-treasures" aria-label="Italy treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF ITALY — Collect all 3. Earn your profile pizza slice.</span>'+italyReward+'</p><div class="treasure-badges">'+italyTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+italyTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

const argentinaTreasureData=[{"name": "Iguazú Falls", "subtitle": "Water & rainforest", "description": "A vast system of waterfalls surrounded by subtropical forest on the Argentina–Brazil border. Explore the Argentine side from Iguazú National Park.", "region": "Misiones, Argentina", "lat": -25.6953, "lon": -54.4367}, {"name": "Perito Moreno Glacier", "subtitle": "A world of blue ice", "description": "A towering, jagged glacier in Los Glaciares National Park near El Calafate, where ice meets the waters of Lago Argentino.", "region": "Santa Cruz, Argentina", "lat": -50.4967, "lon": -73.1377}, {"name": "Plaza de Mayo", "subtitle": "Heart of Buenos Aires", "description": "Buenos Aires’s historic central square, framed by the Casa Rosada, the Cabildo and the Metropolitan Cathedral. The May Pyramid stands at its centre.", "region": "Buenos Aires City, Argentina", "lat": -34.6083, "lon": -58.3712}];
const argentinaTreasureIcons=["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 29l14-7 15 6 15-9 16 6 19-5M10 36l14-7v29m5-26v29m8-27v20m6-24v31m8-33v24m7-26v35m8-31v27m8-26v32m8-34v24M8 70q8-7 16 0t16 0 16 0 16 0 16 0M12 80q8-5 16 0t16 0 16 0 16 0M14 16l3-7 4 7m56-2 4-8 4 8\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 66V40l13-18 9 13 10-22 13 20 10-13 12 19 12-9v36M10 66l13-5 13 8 15-9 14 7 12-8 12 7M23 22v39m9-26v19m10-41v38m13-18v27m10-40v31m12-12v20M11 78q8-5 16 0t16 0 16 0 16 0 16 0M29 87l9-4 10 4-10 3Z\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 65V40h18v25m40 0V40h18v25M10 40l11-8 11 8m36 0 11-8 11 8M17 48h7m-7 7h7m52-7h7m-7 7h7M39 66l5-24h12l5 24M44 42l6-20 6 20M47 22v-7h6v7M36 67h28M10 74h80M20 87l19-13m41 13L61 74M50 75v14\"/></svg>"];
const argentinaReward="<svg class=\"mate-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Playful mate gourd profile reward\"><defs><linearGradient id=\"mate-wood\" x2=\"1\" y2=\"1\"><stop stop-color=\"#d4a267\"/><stop offset=\".55\" stop-color=\"#a96d40\"/><stop offset=\"1\" stop-color=\"#80512e\"/></linearGradient><linearGradient id=\"mate-metal\"><stop stop-color=\"#e8e6cb\"/><stop offset=\".5\" stop-color=\"#a5b8aa\"/><stop offset=\"1\" stop-color=\"#728f81\"/></linearGradient></defs><ellipse cx=\"49\" cy=\"81\" rx=\"28\" ry=\"5\" fill=\"#70502b\" opacity=\".16\"/><path d=\"M28 33q-12 18-5 34 7 15 27 15t27-15q7-16-5-34Z\" fill=\"url(#mate-wood)\" stroke=\"#80552f\" stroke-width=\"1.5\"/><path d=\"M27 41q22 10 46 0M25 48q24 10 50 0M28 66q22 11 44 0\" fill=\"none\" stroke=\"#e4b87b\" stroke-width=\"1.1\"/><ellipse cx=\"50\" cy=\"34\" rx=\"24\" ry=\"10\" fill=\"url(#mate-metal)\" stroke=\"#718b7b\" stroke-width=\"1.4\"/><ellipse cx=\"50\" cy=\"34\" rx=\"18\" ry=\"6\" fill=\"#758455\"/><path d=\"M39 32l5 3m4-5 4 4m4-2 6 3m-17 2 5-2\" stroke=\"#b5bc7c\" stroke-width=\"1.3\"/><path d=\"M55 51l7-26q2-7 9-9l8-2\" fill=\"none\" stroke=\"#657e71\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M55 51l7-26q2-7 9-9l8-2\" fill=\"none\" stroke=\"#dbe1c7\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M34 54q16 11 32 0v9q-16 10-32 0Z\" fill=\"#8caea7\" stroke=\"#688b80\"/><path d=\"M36 58h28m-28 3h28\" stroke=\"#eee4bd\"/><circle cx=\"50\" cy=\"60\" r=\"3\" fill=\"#e0bf72\"/><path d=\"M30 23q-5-5-1-10m11 9q-5-6-1-12\" fill=\"none\" stroke=\"#b2a487\" stroke-width=\"1.3\" stroke-linecap=\"round\"/></svg>";
function argentinaTreasures(){return '<section class="thailand-treasures argentina-treasures" aria-label="Argentina treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF ARGENTINA — Collect all 3. Earn your profile mate gourd.</span>'+argentinaReward+'</p><div class="treasure-badges">'+argentinaTreasureData.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+argentinaTreasureIcons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

const newCountryTreasures={"egypt": {"name": "Egypt", "rewardName": "scarab", "reward": "<svg class=\"scarab-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Playful golden scarab profile reward\"><defs><linearGradient id=\"scarab-gold\" x2=\"1\" y2=\"1\"><stop stop-color=\"#ffecab\"/><stop offset=\".5\" stop-color=\"#d8ab51\"/><stop offset=\"1\" stop-color=\"#9c7130\"/></linearGradient></defs><ellipse cx=\"50\" cy=\"80\" rx=\"29\" ry=\"5\" fill=\"#70502b\" opacity=\".14\"/><path d=\"M34 40L17 29l-6 9 14 12m11 5L16 55l-7 10 18-2m11 5L26 80m40-40 17-11 6 9-14 12m-11 5 20 0 7 10-18-2m-11 5 12 12\" fill=\"none\" stroke=\"#a28243\" stroke-width=\"3\" stroke-linecap=\"round\"/><ellipse cx=\"50\" cy=\"53\" rx=\"24\" ry=\"26\" fill=\"url(#scarab-gold)\" stroke=\"#977135\" stroke-width=\"1.5\"/><path d=\"M29 43q21-12 42 0M50 41v36M31 48l15 20m23-20L54 68\" fill=\"none\" stroke=\"#b78a3d\" stroke-width=\"1.6\"/><path d=\"M39 32q-6-14 11-17 17 3 11 17Z\" fill=\"#86aaa0\" stroke=\"#627f72\"/><circle cx=\"44\" cy=\"24\" r=\"2\" fill=\"#f8edc8\"/><circle cx=\"56\" cy=\"24\" r=\"2\" fill=\"#f8edc8\"/><circle cx=\"44\" cy=\"24\" r=\".8\" fill=\"#46584b\"/><circle cx=\"56\" cy=\"24\" r=\".8\" fill=\"#46584b\"/><path d=\"M45 15l-5-7m15 7 5-7M41 34q9 5 18 0\" fill=\"none\" stroke=\"#9f7e42\" stroke-width=\"1.7\" stroke-linecap=\"round\"/><circle cx=\"50\" cy=\"10\" r=\"7\" fill=\"#d8ad57\" stroke=\"#ad8741\"/><path d=\"M34 45q-5 11 1 20\" fill=\"none\" stroke=\"#ffedb1\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>", "treasures": [{"name": "Pyramids of Giza", "subtitle": "Wonders in the sand", "description": "The monumental pyramids of Khufu, Khafre and Menkaure rise from the Giza plateau, an enduring symbol of ancient Egypt.", "region": "Giza, Egypt", "lat": 29.9792, "lon": 31.1342}, {"name": "Abu Simbel", "subtitle": "Carved into history", "description": "Rock-cut temples beside Lake Nasser, celebrated for the colossal seated statues of Ramesses II guarding the Great Temple.", "region": "Aswan, Egypt", "lat": 22.3372, "lon": 31.6258}, {"name": "White Desert", "subtitle": "A chalk-white dream", "description": "Wind-sculpted chalk formations create a surreal landscape near Farafra. The map marks a point within the White Desert protected area.", "region": "New Valley, Egypt", "lat": 27.3573, "lon": 28.1873}], "icons": ["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 73l29-49 29 49ZM37 24l9 49M59 64l19-31 16 40H66M6 81h88M22 49l15 4m-20 5 25 4M64 57l14 4\"/><circle cx=\"74\" cy=\"18\" r=\"7\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 76V28l15-11h50l15 11v48M17 30h66M20 76V53m19 23V53m22 23V53m19 23V53M22 45v-9q7-8 14 0v9l-3 8H25ZM64 45v-9q7-8 14 0v9l-3 8H67ZM24 57h11v19H22Zm40 0h11l3 19H64M44 76V49h12v27M17 82h66\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 77h82M22 76l4-22q-16-1-18-11 2-12 22-13 23 1 25 13-1 10-20 11l5 22M60 76l4-16q-10-2-10-8 0-8 17-9 17 1 18 9-1 7-15 9l6 15M18 41q11-6 25 0M12 85q11-4 22 0t22 0 22 0M61 28l8-11 10 11\"/></svg>"]}, "new-zealand": {"name": "New Zealand", "rewardName": "kiwi", "reward": "<svg class=\"kiwi-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Round fluffy kiwi bird profile reward\"><defs><radialGradient id=\"kiwi-brown\" cx=\".35\" cy=\".3\"><stop stop-color=\"#b49b72\"/><stop offset=\"1\" stop-color=\"#786447\"/></radialGradient></defs><ellipse cx=\"47\" cy=\"81\" rx=\"30\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M35 67l-2 13m24-13 3 13M27 82h13m13 0h14\" stroke=\"#a3834e\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M17 45l-3-3 5-3-3-4 6-2-1-5 6 1 2-5 6 1 3-4 5 3 6-3 4 4 6-1 3 5 6 1 1 5 5 3-2 6 3 4-4 5 1 5-5 3-1 5-6 1-4 4-5-1-5 3-5-3-6 1-4-5-5-1-2-6-5-3 2-5-3-5Z\" fill=\"url(#kiwi-brown)\" stroke=\"#7a684b\" stroke-width=\"1.3\"/><circle cx=\"63\" cy=\"35\" r=\"13\" fill=\"#a48d64\" stroke=\"#806d4d\"/><path d=\"M74 35l21 13-23-7Z\" fill=\"#d5b879\" stroke=\"#a48b57\" stroke-width=\"1.1\"/><circle cx=\"66\" cy=\"32\" r=\"3\" fill=\"#302c22\"/><circle cx=\"67\" cy=\"31\" r=\"1\" fill=\"#f9edce\"/><path d=\"M25 37l4 5m5-11 2 6m9-8v6M24 49l5 3m7-10 3 5m8-6 1 6M30 59l5 2m9-6 1 6m10-11 2 5\" fill=\"none\" stroke=\"#c7b18a\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>", "treasures": [{"name": "Milford Sound", "subtitle": "Fiords & waterfalls", "description": "Piopiotahi / Milford Sound is a dramatic fiord surrounded by sheer cliffs, rainforest and waterfalls. The map marks its visitor waterfront.", "region": "Southland, New Zealand", "lat": -44.6718, "lon": 167.925}, {"name": "Hobbiton", "subtitle": "A little movie magic", "description": "The movie set near Matamata brings the Shire’s grassy hills and round-doored homes to life, explored on guided tours.", "region": "Waikato, New Zealand", "lat": -37.8721, "lon": 175.6829}, {"name": "Sky Tower", "subtitle": "Auckland from above", "description": "Auckland’s landmark observation tower rises above the city, offering sweeping views over its skyline and harbours.", "region": "Auckland, New Zealand", "lat": -36.8484, "lon": 174.7622}], "icons": ["<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 72l21-47 15 24 18-33 32 56M19 57l9-22 11 20m12-13 10-17 15 28M8 75q12-5 24 0t24 0 24 0M17 84q10-4 20 0t20 0 20 0M78 51v15m5-8v10\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 73V51q2-28 41-29 39 1 41 29v22M6 75h88M16 49q34-18 68 0M36 74V53a14 14 0 0 1 28 0v21M43 74V54a7 7 0 0 1 14 0v20\"/><circle cx=\"53\" cy=\"59\" r=\"1.5\"/><circle cx=\"24\" cy=\"56\" r=\"6\"/><circle cx=\"77\" cy=\"56\" r=\"6\"/><path d=\"M12 83h20m36 0h20M66 29V15h8v18M62 15h16M11 42q39-42 78 0\"/></svg>", "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M50 7v21m-3-9h6M43 73l4-31h6l4 31M40 42h20l3-9H37ZM37 33l5-6h16l5 6M35 73h30M30 80h40M48 47h4M14 80V61h9v19m54 0V55h9v25M11 61h15m48-6h15M8 87h84\"/></svg>"]}};
function renderNewCountryTreasures(key){const c=newCountryTreasures[key];return '<section class="thailand-treasures '+key+'-treasures" data-treasure-country="'+key+'" aria-label="'+c.name+' treasures"><p class="treasures-label treasure-reward-line"><span>TREASURES OF '+c.name.toUpperCase()+' — Collect all 3. Earn your profile '+c.rewardName+'.</span>'+c.reward+'</p><div class="treasure-badges">'+c.treasures.map((t,i)=>'<button type="button" class="treasure-badge" data-treasure="'+i+'" aria-label="Discover '+t.name+'" aria-pressed="false">'+c.icons[i]+'<span class="treasure-caption"><strong>'+t.name+'</strong><span>'+t.subtitle+'</span></span></button>').join('')+'</div><div class="treasure-inline-details" hidden role="region" aria-label="Selected treasure details" aria-live="polite"></div></section>';}

// Shared treasure cards for the latest destinations.
Object.assign(newCountryTreasures, {
  "united-states": {
    "name": "United States",
    "rewardName": "road-trip convertible",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Playful turquoise road-trip convertible with a little suitcase profile reward\"><ellipse cx=\"50\" cy=\"78\" rx=\"42\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M7 56q2-11 17-12l12-14h22l13 15 17 5q5 2 5 10v9H7Z\" fill=\"#70a9a2\" stroke=\"#547b72\" stroke-width=\"1.6\"/><path d=\"m29 44 10-11h15l10 12Z\" fill=\"#dce8d7\" stroke=\"#71988e\" stroke-width=\"1.3\"/><path d=\"M52 33v12m-26 1 43 1\" fill=\"none\" stroke=\"#f3dfb6\" stroke-width=\"2\"/><path d=\"M57 36h13v10H57Z\" fill=\"#86684b\"/><path d=\"M57 38q5-7 10-3l3 11H57Z\" fill=\"#c48b60\"/><path d=\"M72 32h16v15H72Z\" fill=\"#c89258\" stroke=\"#906b40\" stroke-width=\"1.4\"/><path d=\"M77 32v-4h7v4m-8 1v13m9-13v14\" fill=\"none\" stroke=\"#795d3d\" stroke-width=\"1.5\"/><path d=\"M8 58q36 8 84-1v12H8Z\" fill=\"#5d978f\"/><path d=\"M18 49q6-2 12-1m8 7h12m-34 9h68\" fill=\"none\" stroke=\"#b4d0b7\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M36 48v14h25V49\" fill=\"none\" stroke=\"#4e7e73\" stroke-width=\"1.2\"/><path d=\"M42 51h6\" stroke=\"#ecddb8\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M8 55h10v6H8m75-7h9v6h-9\" fill=\"#f2d98c\" stroke=\"#8f8659\"/><path d=\"M5 68h15m62 0h13\" stroke=\"#c5c8af\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"26\" cy=\"69\" r=\"10\" fill=\"#47574e\" stroke=\"#39493f\" stroke-width=\"1.5\"/><circle cx=\"76\" cy=\"69\" r=\"10\" fill=\"#47574e\" stroke=\"#39493f\" stroke-width=\"1.5\"/><circle cx=\"26\" cy=\"69\" r=\"5\" fill=\"#d7cfac\" stroke=\"#8e937c\"/><circle cx=\"76\" cy=\"69\" r=\"5\" fill=\"#d7cfac\" stroke=\"#8e937c\"/><circle cx=\"26\" cy=\"69\" r=\"2\" fill=\"#8ea294\"/><circle cx=\"76\" cy=\"69\" r=\"2\" fill=\"#8ea294\"/><path d=\"M13 24h10m-5-5v10m69-11 3 4m-12 2h5\" stroke=\"#c3a262\" stroke-width=\"1.4\" stroke-linecap=\"round\"/></svg>",
    "treasures": [
      {
        "name": "Statue of Liberty",
        "subtitle": "A harbour welcome",
        "description": "The copper statue on Liberty Island has welcomed generations arriving in New York Harbour.",
        "region": "New York, United States",
        "lat": 40.6892,
        "lon": -74.0445
      },
      {
        "name": "Grand Canyon",
        "subtitle": "Layers of deep time",
        "description": "A vast canyon carved by the Colorado River. This map point marks the South Rim visitor area.",
        "region": "Arizona, United States",
        "lat": 36.0591,
        "lon": -112.1093
      },
      {
        "name": "Golden Gate Bridge",
        "subtitle": "Across the bay",
        "description": "San Francisco’s orange suspension bridge spans the Golden Gate strait.",
        "region": "California, United States",
        "lat": 37.8199,
        "lon": -122.4783
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M34 83h32l-5-10H39ZM40 73l5-35h11l5 35M44 39l-9-16-8-3m20 13 12-9 7 8M29 23V9m-4 2h8M45 25l2-8h8l3 8ZM44 15l-4-5m10 4V6m6 9 5-5M65 32v22h9V32Z\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 25h24l12 18 16-6 15-16h18M8 34l17 7 9 25 15 11 16-23 17-12 10-3M19 38l7 20m6-8 8 18m24-24-9 18M10 85q20-11 40-2t40-3M49 77l-4 10\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 78V23h8v55m40 0V23h8v55M18 29h16m32 0h16M8 62h84M26 27Q50 70 74 27M8 43l18-16m48 0 18 16M14 48v14m8-27v27m14-20v20m10-13v13m10-13v13m10-20v20m17-16v16M8 84q10-5 20 0t20 0 20 0 20 0\"/></svg>"
    ]
  },
  "vietnam": {
    "name": "Vietnam",
    "rewardName": "lantern",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Glowing silk lantern profile reward\"><ellipse cx=\"50\" cy=\"80\" rx=\"30\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M50 6v10m0 54v12\" stroke=\"#967440\" stroke-width=\"2\"/><path d=\"M36 17h28l15 26-15 27H36L21 43Z\" fill=\"#c87550\" stroke=\"#8e593c\" stroke-width=\"2\"/><path d=\"M44 17 35 43l9 27m12-53 9 26-9 27M21 43h58M50 18v51\" fill=\"none\" stroke=\"#f1c777\" stroke-width=\"2\"/><path d=\"M43 77v8m7-9v11m7-10v8\" stroke=\"#bd914b\" stroke-width=\"2\"/></svg>",
    "treasures": [
      {
        "name": "Ha Long Bay",
        "subtitle": "Limestone & water",
        "description": "Limestone towers rise from sheltered waters in this iconic bay. The map marks a point among its islands.",
        "region": "Quảng Ninh, Vietnam",
        "lat": 20.9101,
        "lon": 107.1839
      },
      {
        "name": "Hoi An Ancient Town",
        "subtitle": "Lantern-lit lanes",
        "description": "Historic merchant houses, riverside lanes and glowing lanterns give Hoi An its distinctive atmosphere.",
        "region": "Da Nang, Vietnam",
        "lat": 15.8801,
        "lon": 108.338
      },
      {
        "name": "Trang An",
        "subtitle": "Through emerald valleys",
        "description": "Boat routes weave through caves and limestone valleys. The map marks the main boat departure area.",
        "region": "Ninh Binh, Vietnam",
        "lat": 20.2506,
        "lon": 105.9185
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 70l7-27 10-9 9 36m5 0 8-42 9-10 11 52m4 0 8-27 10 27M18 43l5 10m27-21 7 12M8 78q10-5 20 0t20 0 20 0 20 0M18 87q10-4 20 0t20 0 20 0\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 72V42h28v30m20 0V42h28v30M8 42l18-14 18 14m12 0 18-14 18 14M20 72V56h12v16m36 0V56h12v16M8 20q42 17 84 0M48 27v7m-7 0h14l5 10-5 10H41l-5-10ZM48 54v9M8 82h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 70l15-40 13 27 15-40 13 36 14-22 16 39M29 68q21-27 42 0M40 66q10-14 20 0M25 76h43l-10 9H36ZM49 75V59m0 3 16 13M8 90h84\"/></svg>"
    ]
  },
  "colombia": {
    "name": "Colombia",
    "rewardName": "toucan",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Cheerful toucan profile reward\"><ellipse cx=\"50\" cy=\"80\" rx=\"30\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M38 40q-14 17-9 31l-9 9 22-4q25-2 24-31Z\" fill=\"#394f4b\" stroke=\"#34443b\" stroke-width=\"2\"/><circle cx=\"53\" cy=\"32\" r=\"20\" fill=\"#405950\"/><path d=\"M59 17q31-4 34 22H62Z\" fill=\"#e9b84e\" stroke=\"#95713a\" stroke-width=\"2\"/><path d=\"M81 22q12 6 12 17H80Z\" fill=\"#c36b42\"/><path d=\"M42 40q20 4 17 25-20 2-17-25\" fill=\"#f1dfb4\"/><circle cx=\"51\" cy=\"28\" r=\"5\" fill=\"#e4d6ae\"/><circle cx=\"52\" cy=\"28\" r=\"2\" fill=\"#26362d\"/><path d=\"M39 74v7m11-7v7M31 82h29\" stroke=\"#9e7d43\" stroke-width=\"2\"/></svg>",
    "treasures": [
      {
        "name": "Cartagena Walled City",
        "subtitle": "Caribbean history",
        "description": "Colourful streets, plazas and fortifications frame Cartagena’s historic Caribbean heart. The map marks Plaza de los Coches.",
        "region": "Bolívar, Colombia",
        "lat": 10.423,
        "lon": -75.5508
      },
      {
        "name": "Cocora Valley",
        "subtitle": "Palms in the clouds",
        "description": "Towering wax palms rise above green Andean slopes near Salento. The map marks the valley’s visitor area.",
        "region": "Quindío, Colombia",
        "lat": 4.637,
        "lon": -75.488
      },
      {
        "name": "El Peñol Rock",
        "subtitle": "Steps to the sky",
        "description": "A huge granite rock near Guatapé rewards its steep staircase climb with views across a reservoir.",
        "region": "Antioquia, Colombia",
        "lat": 6.2208,
        "lon": -75.1798
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 77V45h80v32M10 45V31h10v8h10v-8h10v14m20 0V31h10v8h10v-8h10v14M42 77V58q8-12 16 0v19M17 55h12m42 0h12M8 84h84M48 44V22h9v22M45 22l8-9 8 9\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 78l19-23 18 15 22-20 25 28M48 72V27m0 0Q30 9 20 25q19-3 28 2m0 0Q65 8 79 24q-20-3-31 3m0 0Q29 24 27 40q13-12 21-13m0 0q21-2 23 13Q57 29 48 27M17 84h66\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 78q-2-45 23-57 24-10 37 22l7 35ZM37 77l4-11 7-3-3-10 7-5-1-12 8-7M32 82h57M8 90q10-4 20 0t20 0 20 0 20 0\"/></svg>"
    ]
  },
  "morocco": {
    "name": "Morocco",
    "rewardName": "tea pot",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Ornate mint tea pot profile reward\"><ellipse cx=\"50\" cy=\"80\" rx=\"30\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M32 37q-15 27 3 36h33q18-12 0-36Z\" fill=\"#b8b8a3\" stroke=\"#747a68\" stroke-width=\"2\"/><path d=\"M36 37h28l-4-8H40ZM50 29v-9m-6 0h12M29 43 10 32l9 25 10 4M71 40q26-7 20 15-4 14-16 6\" fill=\"none\" stroke=\"#858d79\" stroke-width=\"5\"/><path d=\"M35 52q16-11 32 0m-32 8q16 11 32 0M42 43v24m17-24v24\" fill=\"none\" stroke=\"#e9d8a5\" stroke-width=\"2\"/><path d=\"M31 76h43\" stroke=\"#8b815f\" stroke-width=\"3\"/></svg>",
    "treasures": [
      {
        "name": "Jemaa el-Fnaa",
        "subtitle": "Marrakech comes alive",
        "description": "Marrakech’s great public square fills with performers, market stalls and food sellers, especially toward evening.",
        "region": "Marrakech-Safi, Morocco",
        "lat": 31.6258,
        "lon": -7.9889
      },
      {
        "name": "Aït Ben Haddou",
        "subtitle": "An earthen citadel",
        "description": "A fortified village of earthen buildings stands beside an old caravan route near Ouarzazate.",
        "region": "Drâa-Tafilalet, Morocco",
        "lat": 31.047,
        "lon": -7.131
      },
      {
        "name": "Erg Chebbi",
        "subtitle": "A sea of dunes",
        "description": "Sweeping Saharan sand dunes rise near Merzouga. This map point marks a spot within the dune field.",
        "region": "Drâa-Tafilalet, Morocco",
        "lat": 31.15,
        "lon": -4.0
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 78V49h21v29m-25-29 14-10 15 10M66 78V43h26v35M62 43l17-12 17 12M42 78V24h13v54M39 24h19l-3-8h-13ZM48 16V8M8 84h84M13 57h10m-10 8h10m49-13h12m-12 9h12M35 78V61h27v17\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 79V43h18V27h15v13h17V24h17v20h15v35M23 79V53h16v26m24 0V52h15v27M29 27v-8h11v8m21-3v-8h13v8M10 44l8-8 9 7M46 79V61h10v18M8 86h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 77q30-44 61-22 15 10 27 5M6 77q47-12 61-22-5 24 27 25M9 87h83M14 58q20-25 39-19\"/><circle cx=\"77\" cy=\"23\" r=\"10\"/></svg>"
    ]
  }
});

Object.assign(newCountryTreasures, {
  "spain": {
    "name": "Spain",
    "rewardName": "Spanish fan",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Colourful Spanish fan profile reward\"><path d=\"M50 75 8 30Q50-6 92 30Z\" fill=\"#c57351\" stroke=\"#866039\" stroke-width=\"2\"/><path d=\"M50 75 18 25m32 50L32 17m18 58V13m0 62 18-58M50 75l32-50\" stroke=\"#edd29b\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"75\" r=\"5\" fill=\"#b99552\"/></svg>",
    "treasures": [
      {
        "name": "Sagrada Família",
        "subtitle": "Gaudí’s soaring vision",
        "description": "Barcelona’s extraordinary basilica blends sculptural façades with branching, forest-like columns.",
        "region": "Catalonia, Spain",
        "lat": 41.4036,
        "lon": 2.1744
      },
      {
        "name": "Alhambra",
        "subtitle": "Palaces & courtyards",
        "description": "Granada’s hilltop palace and fortress complex is known for intricate decoration and tranquil courtyards.",
        "region": "Andalusia, Spain",
        "lat": 37.1761,
        "lon": -3.5881
      },
      {
        "name": "Mount Teide",
        "subtitle": "Above the clouds",
        "description": "Tenerife’s great volcanic landmark rises within Teide National Park. This map point marks the summit.",
        "region": "Canary Islands, Spain",
        "lat": 28.2723,
        "lon": -16.6425
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 79h80M20 79V43h15V25h10V12h10v13h10v18h15v36M16 43l12-20 11 20m22 0 11-20 12 20M44 79V60q6-9 12 0v19M48 35h4m-4 8h4M26 51v12m47-12v12\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 78V42h20V25h14v17h14V25h14v17h18v36M27 25v-8h20v8m8 0v-8h20v8M42 78V61q8-13 16 0v17M17 51h7m9-17h7m20 0h7m9 17h7M8 85h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 80 39 30h22l32 50M39 30l10 9 12-9M20 80h60M46 23q-7-6-2-12m12 12q7-8 2-14M26 63l15-23m18 11 12 17\"/></svg>"
    ]
  },
  "greece": {
    "name": "Greece",
    "rewardName": "blue-domed miniature house",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Blue-domed miniature Greek house profile reward\"><ellipse cx=\"50\" cy=\"81\" rx=\"38\" ry=\"5\" fill=\"#70502b\" opacity=\".15\"/><path d=\"M19 75V46l30-8 30 8v29L49 83Z\" fill=\"#fff7dc\" stroke=\"#b5a784\" stroke-width=\"1.5\"/><path d=\"M49 47 79 46v29L49 83Z\" fill=\"#e7e4d3\"/><path d=\"M24 43V32q0-24 25-24t25 24v11Z\" fill=\"#377da4\" stroke=\"#426c83\" stroke-width=\"1.5\"/><path d=\"M28 32q2-19 21-20\" fill=\"none\" stroke=\"#83bacb\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M22 40q27 9 54 0v7q-27 9-54 0Z\" fill=\"#fff8df\" stroke=\"#b7b29b\" stroke-width=\"1.3\"/><path d=\"M34 77V61q0-12 11-12t11 12v18\" fill=\"#387fa6\" stroke=\"#527b8a\" stroke-width=\"1.5\"/><path d=\"M42 53v25\" stroke=\"#9fc7d3\"/><circle cx=\"49\" cy=\"66\" r=\"1.4\" fill=\"#e3c16e\"/><path d=\"M64 58h9v11h-9Z\" fill=\"#508baa\" stroke=\"#728f98\"/><path d=\"M68 59v9m-4-5h9\" stroke=\"#d7e5dc\"/><path d=\"M13 79h15m49-1h10\" stroke=\"#b8a17b\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M83 71v-9m-4 3q4-7 8 0\" fill=\"none\" stroke=\"#789178\" stroke-width=\"2\"/></svg>",
    "treasures": [
      {
        "name": "Acropolis",
        "subtitle": "Athens above the city",
        "description": "The ancient hilltop sanctuary is home to the Parthenon and sweeping views over Athens.",
        "region": "Attica, Greece",
        "lat": 37.9715,
        "lon": 23.7267
      },
      {
        "name": "Meteora",
        "subtitle": "Monasteries in the sky",
        "description": "Historic monasteries perch on dramatic sandstone pillars. The map marks Great Meteoron Monastery.",
        "region": "Thessaly, Greece",
        "lat": 39.7262,
        "lon": 21.6268
      },
      {
        "name": "Santorini",
        "subtitle": "Blue domes & caldera",
        "description": "Whitewashed villages overlook a volcanic caldera. This map point marks the blue-domed churches in Oia.",
        "region": "South Aegean, Greece",
        "lat": 36.4612,
        "lon": 25.3753
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 78h80M16 72h68M22 72V39h56v33M18 39l32-20 32 20ZM29 43v25m14-25v25m14-25v25m14-25v25M8 84h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 79l5-45 15-13 14 9 12-17 23 18 5 48M20 44l12-12 8 9m18-15 15 12M29 79V62h25V48h26v31M25 62l16-12 16 12M57 48l11-10 14 10M8 85h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 78V49h58v29M16 49h68M29 49V38q21-33 42 0v11M48 22v-9m-4 4h8M45 78V61h11v17M8 85h84M30 57v10m39-10v10\"/></svg>"
    ]
  },
  "costa-rica": {
    "name": "Costa Rica",
    "rewardName": "sloth",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Friendly round sloth hugging a leafy branch profile reward\"><ellipse cx=\"51\" cy=\"82\" rx=\"27\" ry=\"4\" fill=\"#70502b\" opacity=\".12\"/><path d=\"M12 19q36-4 76 1\" fill=\"none\" stroke=\"#8c6d43\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M76 19q4-14 16-10-2 11-16 10\" fill=\"#8fa16a\" stroke=\"#738454\" stroke-width=\"1.2\"/><ellipse cx=\"52\" cy=\"58\" rx=\"24\" ry=\"23\" fill=\"#b6a07b\" stroke=\"#8f7959\" stroke-width=\"1.4\"/><ellipse cx=\"54\" cy=\"64\" rx=\"14\" ry=\"13\" fill=\"#d7c6a0\"/><path d=\"M34 47q-13-15-5-27 3-5 7-2 3 2 0 7-3 7 7 16M65 42q13-9 7-21-2-6-7-4-4 2-1 7 3 6-6 12\" fill=\"#b6a07b\" stroke=\"#8f7959\" stroke-width=\"8\" stroke-linecap=\"round\"/><path d=\"M32 21l-2-5m5 4-1-5m35 5 1-5m3 6 2-4\" stroke=\"#e9dfbd\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><ellipse cx=\"49\" cy=\"43\" rx=\"22\" ry=\"20\" fill=\"#c0aa83\" stroke=\"#8f7959\" stroke-width=\"1.3\"/><path d=\"M31 42q0-14 18-14t18 14q0 17-18 18T31 42\" fill=\"#eee1bd\"/><path d=\"M34 36q8-3 12 5l-5 6q-8-1-9-6m32-5q-8-3-12 5l5 6q8-1 9-6\" fill=\"#9d8b6d\"/><ellipse cx=\"40\" cy=\"40\" rx=\"2.3\" ry=\"2.8\" fill=\"#454737\"/><ellipse cx=\"58\" cy=\"40\" rx=\"2.3\" ry=\"2.8\" fill=\"#454737\"/><circle cx=\"40.7\" cy=\"39.1\" r=\".8\" fill=\"#fff8df\"/><circle cx=\"58.7\" cy=\"39.1\" r=\".8\" fill=\"#fff8df\"/><ellipse cx=\"49\" cy=\"46\" rx=\"3.5\" ry=\"2.4\" fill=\"#75644d\"/><path d=\"M44 51q5 4 10 0\" fill=\"none\" stroke=\"#847052\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><ellipse cx=\"35\" cy=\"47\" rx=\"3\" ry=\"1.6\" fill=\"#d9ac8a\" opacity=\".55\"/><ellipse cx=\"63\" cy=\"47\" rx=\"3\" ry=\"1.6\" fill=\"#d9ac8a\" opacity=\".55\"/><path d=\"M34 72q-1 9 8 7m18-3q7 8 13 0\" fill=\"none\" stroke=\"#967f5d\" stroke-width=\"7\" stroke-linecap=\"round\"/></svg>",
    "treasures": [
      {
        "name": "Arenal Volcano",
        "subtitle": "Rainforest & volcano",
        "description": "A near-perfect volcanic cone rises above forest near La Fortuna. The map marks the volcano itself.",
        "region": "Alajuela, Costa Rica",
        "lat": 10.463,
        "lon": -84.703
      },
      {
        "name": "Manuel Antonio",
        "subtitle": "Forest meets the Pacific",
        "description": "A coastal national park combines tropical forest, wildlife and sheltered beaches. The map marks Playa Manuel Antonio.",
        "region": "Puntarenas, Costa Rica",
        "lat": 9.3766,
        "lon": -84.4356
      },
      {
        "name": "Río Celeste",
        "subtitle": "A ribbon of turquoise",
        "description": "A striking blue waterfall lies within Tenorio Volcano National Park. The map marks the waterfall.",
        "region": "Alajuela, Costa Rica",
        "lat": 10.6951,
        "lon": -84.9954
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 80 39 30h22l32 50M39 30l10 9 12-9M20 80h60M46 23q-7-6-2-12m12 12q7-8 2-14M26 63l15-23m18 11 12 17\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 76q22-14 45-3t35-1M13 85q10-5 20 0t20 0 20 0 20 0M31 70l7-39m0 0q-17-19-28-4 16-4 28 4m0 0q20-20 34-3-19-4-34 3m0 0q-14 1-19 15m19-15q19 1 22 15\"/><circle cx=\"77\" cy=\"21\" r=\"9\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 25h30v31q0 16-17 25m17-56h21v34q0 14 15 22M46 26v40m7-40v34M8 81q10-5 20 0t20 0 20 0 20 0M8 19l13-6 18 6m22 0 16-6 15 6\"/></svg>"
    ]
  },
  "indonesia": {
    "name": "Indonesia",
    "rewardName": "little orangutan",
    "reward": "<svg class=\"country-reward\" viewBox=\"0 0 100 90\" role=\"img\" aria-label=\"Friendly little orangutan hanging from a leafy branch profile reward\"><ellipse cx=\"51\" cy=\"83\" rx=\"27\" ry=\"4\" fill=\"#70502b\" opacity=\".12\"/><path d=\"M11 14q37-5 76 1\" fill=\"none\" stroke=\"#82633f\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M79 14q3-12 15-8-3 10-15 8\" fill=\"#89995e\" stroke=\"#6e7f4c\" stroke-width=\"1.2\"/><path d=\"M34 44Q16 32 23 14m39 30q22-11 14-29\" fill=\"none\" stroke=\"#a96036\" stroke-width=\"11\" stroke-linecap=\"round\"/><path d=\"M21 15l2-5m3 6 1-5m48 5 1-5m3 5 1-4\" fill=\"none\" stroke=\"#dfb383\" stroke-width=\"2\" stroke-linecap=\"round\"/><ellipse cx=\"49\" cy=\"58\" rx=\"20\" ry=\"23\" fill=\"#bd7543\" stroke=\"#975732\" stroke-width=\"1.3\"/><ellipse cx=\"49\" cy=\"62\" rx=\"11\" ry=\"13\" fill=\"#d28f57\"/><path d=\"M35 73q-8 8 3 10m22-10q9 8-2 10\" fill=\"none\" stroke=\"#a96036\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M32 81h9m15 0h8\" stroke=\"#d5a779\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"29\" cy=\"35\" r=\"7\" fill=\"#b4693d\"/><circle cx=\"69\" cy=\"35\" r=\"7\" fill=\"#b4693d\"/><circle cx=\"29\" cy=\"35\" r=\"3.5\" fill=\"#dda87c\"/><circle cx=\"69\" cy=\"35\" r=\"3.5\" fill=\"#dda87c\"/><path d=\"M29 32q-1-21 20-21t20 21q4 23-20 24Q25 55 29 32Z\" fill=\"#bd7543\" stroke=\"#975732\" stroke-width=\"1.2\"/><path d=\"M35 30q2-12 14-7 13-5 15 7l-1 12q-2 11-14 10-13 1-15-10Z\" fill=\"#e4bb8c\"/><ellipse cx=\"40\" cy=\"33\" rx=\"2.6\" ry=\"3\" fill=\"#433c2b\"/><ellipse cx=\"58\" cy=\"33\" rx=\"2.6\" ry=\"3\" fill=\"#433c2b\"/><circle cx=\"40.7\" cy=\"32\" r=\".9\" fill=\"#fff1d5\"/><circle cx=\"58.7\" cy=\"32\" r=\".9\" fill=\"#fff1d5\"/><ellipse cx=\"49\" cy=\"40\" rx=\"5\" ry=\"3.2\" fill=\"#c58c60\"/><circle cx=\"47\" cy=\"40\" r=\".8\" fill=\"#8e5e43\"/><circle cx=\"51\" cy=\"40\" r=\".8\" fill=\"#8e5e43\"/><path d=\"M43 46q6 5 12 0\" fill=\"none\" stroke=\"#956543\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><path d=\"M39 16l3-5m3 4 3-7m2 7 5-5\" stroke=\"#bf7844\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg>",
    "treasures": [
      {
        "name": "Borobudur",
        "subtitle": "Stone stories at dawn",
        "description": "A monumental Buddhist temple in central Java, famed for its terraces, reliefs and bell-shaped stupas.",
        "region": "Central Java, Indonesia",
        "lat": -7.6079,
        "lon": 110.2038
      },
      {
        "name": "Ulun Danu Beratan",
        "subtitle": "Temple on the lake",
        "description": "A tiered temple stands beside Lake Beratan in Bali’s cool highlands.",
        "region": "Bali, Indonesia",
        "lat": -8.2751,
        "lon": 115.1668
      },
      {
        "name": "Komodo National Park",
        "subtitle": "Dragons & island horizons",
        "description": "A protected island landscape shelters Komodo dragons and rich marine life. The map marks Loh Liang on Komodo Island.",
        "region": "East Nusa Tenggara, Indonesia",
        "lat": -8.5716,
        "lon": 119.4893
      }
    ],
    "icons": [
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 78h80M16 72h68M22 72V39h56v33M18 39l32-20 32 20ZM29 43v25m14-25v25m14-25v25m14-25v25M8 84h84\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 78V49h58v29M16 49h68M29 49V38q21-33 42 0v11M48 22v-9m-4 4h8M45 78V61h11v17M8 85h84M30 57v10m39-10v10\"/></svg>",
      "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 76q22-14 45-3t35-1M13 85q10-5 20 0t20 0 20 0 20 0M31 70l7-39m0 0q-17-19-28-4 16-4 28 4m0 0q20-20 34-3-19-4-34 3m0 0q-14 1-19 15m19-15q19 1 22 15\"/><circle cx=\"77\" cy=\"21\" r=\"9\"/></svg>"
    ]
  }
});

const treasurePhotos = {
  "Chichén Itzá": {
    "author": "Daniel Schwen",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chichen_Itza_3.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Chichen_Itza_3.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/mexico-1.webp",
    "alt": "Chichén Itzá — Mexico",
    "width": 640,
    "height": 341,
    "bytes": 38260
  },
  "El Arco": {
    "author": "User:Stan Shebs",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cabo_San_Lucas_Los_Arcos_3.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Cabo_San_Lucas_Los_Arcos_3.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/0/06/Cabo_San_Lucas_Los_Arcos_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/mexico-2.webp",
    "alt": "El Arco — Mexico",
    "width": 640,
    "height": 427,
    "bytes": 57710
  },
  "Zócalo": {
    "author": "Comisión Mexicana de Filmaciones from México D. F., México",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Z%C3%B3calo,_Ciudad_de_M%C3%A9xico_(32846556446)_(cropped).jpg",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "originalTitle": "File:Zócalo,_Ciudad_de_México_(32846556446)_(cropped).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Z%C3%B3calo%2C_Ciudad_de_M%C3%A9xico_%2832846556446%29_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/mexico-3.webp",
    "alt": "Zócalo — Mexico",
    "width": 640,
    "height": 454,
    "bytes": 121496
  },
  "Grand Palace": {
    "author": "Preecha.MJ",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:0005574_-_Wat_Phra_Kaew_006.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:0005574_-_Wat_Phra_Kaew_006.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c7/0005574_-_Wat_Phra_Kaew_006.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/thailand-1.webp",
    "alt": "Grand Palace — Thailand",
    "width": 640,
    "height": 426,
    "bytes": 36904
  },
  "Maya Bay": {
    "author": "Nnthurber",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Wide_panoramic_view_of_empty_Maya_Bay_beach_and_cliffs.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Wide panoramic view of empty Maya Bay beach and cliffs.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/6/67/Wide_panoramic_view_of_empty_Maya_Bay_beach_and_cliffs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/thailand-2.webp",
    "alt": "Maya Bay — Thailand",
    "width": 640,
    "height": 480,
    "bytes": 53248
  },
  "Doi Inthanon": {
    "author": "Lester Mathias Andersson",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Naphamethinidon,_Naphaphonphumisiri_near_summit_of_Doi_Inthanon.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Naphamethinidon,_Naphaphonphumisiri_near_summit_of_Doi_Inthanon.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/1/17/Naphamethinidon%2C_Naphaphonphumisiri_near_summit_of_Doi_Inthanon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/thailand-3.webp",
    "alt": "Doi Inthanon — Thailand",
    "width": 640,
    "height": 427,
    "bytes": 44514
  },
  "Belém Tower": {
    "author": "Alvesgaspar",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Torre_Bel%C3%A9m_April_2009-4a.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Torre_Belém_April_2009-4a.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/portugal-1.webp",
    "alt": "Belém Tower — Portugal",
    "width": 503,
    "height": 480,
    "bytes": 39180
  },
  "Dom Luís I Bridge": {
    "author": "Deensel",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dom_Lu%C3%ADs_I_Bridge_(36961760686).jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "originalTitle": "File:Dom_Luís_I_Bridge_(36961760686).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dom_Lu%C3%ADs_I_Bridge_%2836961760686%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/portugal-2.webp",
    "alt": "Dom Luís I Bridge — Portugal",
    "width": 630,
    "height": 480,
    "bytes": 87392
  },
  "Benagil Cave": {
    "author": "Evarusso",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:A_Catedral_de_Benagil.JPG",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:A Catedral de Benagil.JPG",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ac/A_Catedral_de_Benagil.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/portugal-3.webp",
    "alt": "Benagil Cave — Portugal",
    "width": 640,
    "height": 480,
    "bytes": 41900
  },
  "Mount Fuji": {
    "author": "Suicasmo",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:View_of_Mount_Fuji_from_Ōwakudani_20211202.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f8/View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/japan-1.webp",
    "alt": "Mount Fuji — Japan",
    "width": 640,
    "height": 313,
    "bytes": 11536
  },
  "Fushimi Inari": {
    "author": "Basile Morin",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/japan-2.webp",
    "alt": "Fushimi Inari — Japan",
    "width": 640,
    "height": 427,
    "bytes": 59694
  },
  "Shibuya Crossing": {
    "author": "David Kernan",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shibuya_Crossing,_Aerial.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "originalTitle": "File:Shibuya_Crossing,_Aerial.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/japan-3.webp",
    "alt": "Shibuya Crossing — Japan",
    "width": 640,
    "height": 360,
    "bytes": 85442
  },
  "Colosseum": {
    "author": "FeaturedPics",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Colosseo_2020.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/italy-1.webp",
    "alt": "Colosseum — Italy",
    "width": 640,
    "height": 449,
    "bytes": 52368
  },
  "Grand Canal": {
    "author": "Didier Descouens",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:View_of_the_Grand_Canal_from_Rialto_to_Ca%27Foscari.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:View_of_the_Grand_Canal_from_Rialto_to_Ca'Foscari.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/5/51/View_of_the_Grand_Canal_from_Rialto_to_Ca%27Foscari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/italy-2.webp",
    "alt": "Grand Canal — Italy",
    "width": 640,
    "height": 350,
    "bytes": 74992
  },
  "Leaning Tower of Pisa": {
    "author": "John Samuel",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cathedral_and_Leaning_Tower,_Pisa_09.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Cathedral and Leaning Tower, Pisa 09.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Cathedral_and_Leaning_Tower%2C_Pisa_09.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/italy-pisa-landscape.webp",
    "alt": "Leaning Tower of Pisa in a wider landscape view",
    "width": 640,
    "height": 427,
    "bytes": 40318
  },
  "Iguazú Falls": {
    "author": "Mariordo (Mario Roberto Durán Ortiz)",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Aerial_Foz_de_Igua%C3%A7u_26_Nov_2005.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Aerial_Foz_de_Iguaçu_26_Nov_2005.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/9/91/Aerial_Foz_de_Igua%C3%A7u_26_Nov_2005.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/argentina-1.webp",
    "alt": "Iguazú Falls — Argentina",
    "width": 640,
    "height": 395,
    "bytes": 80252
  },
  "Perito Moreno Glacier": {
    "author": "Fernando",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Perito_Moreno_Glacier_2023.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Perito_Moreno_Glacier_2023.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Perito_Moreno_Glacier_2023.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/argentina-2.webp",
    "alt": "Perito Moreno Glacier — Argentina",
    "width": 640,
    "height": 274,
    "bytes": 34938
  },
  "Plaza de Mayo": {
    "author": "ProtoplasmaKid",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_de_Plaza_de_Mayo_03.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Vista_aérea_de_Plaza_de_Mayo_03.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Vista_a%C3%A9rea_de_Plaza_de_Mayo_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/argentina-3.webp",
    "alt": "Plaza de Mayo — Argentina",
    "width": 640,
    "height": 360,
    "bytes": 83270
  },
  "Pyramids of Giza": {
    "author": "KennyOMG",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pyramids_of_the_Giza_Necropolis.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Pyramids_of_the_Giza_Necropolis.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/9/96/Pyramids_of_the_Giza_Necropolis.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/egypt-1.webp",
    "alt": "Pyramids of Giza — Egypt",
    "width": 640,
    "height": 267,
    "bytes": 25952
  },
  "Abu Simbel": {
    "author": "youssef_alam",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ramsis,_Aswan_Governorate,_Egypt_-_panoramio.jpg",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "originalTitle": "File:Ramsis,_Aswan_Governorate,_Egypt_-_panoramio.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/egypt-2.webp",
    "alt": "Abu Simbel — Egypt",
    "width": 640,
    "height": 480,
    "bytes": 76370
  },
  "White Desert": {
    "author": "L-BBE",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Al_Farafrah,_New_Valley_Governorate,_Egypt_-_panoramio_(21).jpg",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "originalTitle": "File:Al_Farafrah,_New_Valley_Governorate,_Egypt_-_panoramio_(21).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Al_Farafrah%2C_New_Valley_Governorate%2C_Egypt_-_panoramio_%2821%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/egypt-3.webp",
    "alt": "White Desert — Egypt",
    "width": 640,
    "height": 427,
    "bytes": 22666
  },
  "Milford Sound": {
    "author": "Maros M r a z ( Maros )",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Milford_Sound_(New_Zealand).JPG",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "originalTitle": "File:Milford_Sound_(New_Zealand).JPG",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Milford_Sound_%28New_Zealand%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/new-zealand-1.webp",
    "alt": "Milford Sound — New Zealand",
    "width": 640,
    "height": 232,
    "bytes": 16410
  },
  "Hobbiton": {
    "author": "Harsh.gavhane",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Waterhouse_Lake_Front.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Waterhouse_Lake_Front.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Waterhouse_Lake_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/new-zealand-2.webp",
    "alt": "Hobbiton — New Zealand",
    "width": 640,
    "height": 480,
    "bytes": 98798
  },
  "Sky Tower": {
    "author": "Ziqi CHAI",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Viaduct_Basin_in_Auckland_3.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Viaduct Basin in Auckland 3.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Viaduct_Basin_in_Auckland_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/new-zealand-sky-tower-landscape.webp",
    "alt": "Sky Tower in a wider landscape view",
    "width": 640,
    "height": 245,
    "bytes": 26652
  },
  "Statue of Liberty": {
    "author": "Christian David",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Statue_of_Liberty_and_a_sightseeing_boat,_Liberty_Island,_New_York.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Statue of Liberty and a sightseeing boat, Liberty Island, New York.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/9/93/Statue_of_Liberty_and_a_sightseeing_boat%2C_Liberty_Island%2C_New_York.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/usa-liberty-landscape.webp",
    "alt": "Statue of Liberty in a wider landscape view",
    "width": 640,
    "height": 427,
    "bytes": 39706
  },
  "Grand Canyon": {
    "author": "Lennart Sikkema",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Canyon_River_Tree_(165872763).jpeg",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "originalTitle": "File:Canyon_River_Tree_(165872763).jpeg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/3/31/Canyon_River_Tree_%28165872763%29.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/united-states-2.webp",
    "alt": "Grand Canyon — United States",
    "width": 640,
    "height": 411,
    "bytes": 84002
  },
  "Golden Gate Bridge": {
    "author": "Frank Schulenburg",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/united-states-3.webp",
    "alt": "Golden Gate Bridge — United States",
    "width": 640,
    "height": 400,
    "bytes": 40384
  },
  "Ha Long Bay": {
    "author": "Disdero",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ha_Long_Bay_on_a_sunny_day.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Ha Long Bay on a sunny day.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ha_Long_Bay_on_a_sunny_day.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/vietnam-1.webp",
    "alt": "Ha Long Bay — Vietnam",
    "width": 640,
    "height": 359,
    "bytes": 34882
  },
  "Hoi An Ancient Town": {
    "author": "David McKelvey from Brisbane, Australia",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hoi_An_Ancient_town,_Vietnam_(6944149036).jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "originalTitle": "File:Hoi An Ancient town, Vietnam (6944149036).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Hoi_An_Ancient_town%2C_Vietnam_%286944149036%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/vietnam-2.webp",
    "alt": "Hoi An Ancient Town — Vietnam",
    "width": 640,
    "height": 360,
    "bytes": 36596
  },
  "Trang An": {
    "author": "Kien1980v ( thảo luận )",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Muaxuantamcoc.jpg",
    "license": "Public domain",
    "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Licensing",
    "originalTitle": "File:Muaxuantamcoc.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/vietnam-3.webp",
    "alt": "Trang An — Vietnam",
    "width": 640,
    "height": 418,
    "bytes": 50070
  },
  "Cartagena Walled City": {
    "author": "Jimmy Hu",
    "sourceUrl": "https://unsplash.com/photos/a-row-of-colorful-buildings-with-flowers-growing-on-the-balconies-u1KDpj425VM",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license",
    "alt": "Colourful colonial balconies and flowering bougainvillea in Cartagena’s walled city",
    "src": "images/treasures/colombia-cartagena-wide-balconies.webp",
    "width": 700,
    "height": 467,
    "bytes": 92106
  },
  "Cocora Valley": {
    "author": "Nicole Arango Lang",
    "sourceUrl": "https://unsplash.com/photos/a-lush-green-hillside-covered-in-palm-trees-FYIPrgZqBBA",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license",
    "alt": "Tall wax palms rising over lush green hills in Cocora Valley, Colombia",
    "src": "images/treasures/colombia-cocora-palms.webp",
    "width": 700,
    "height": 467,
    "bytes": 40646
  },
  "El Peñol Rock": {
    "author": "Tzeitel Topel",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sight_of_the_Guatap%C3%A9_Rock.JPG",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Sight of the Guatapé Rock.JPG",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Sight_of_the_Guatap%C3%A9_Rock.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/colombia-penol-landscape.webp",
    "alt": "El Peñol Rock in a wider landscape view",
    "width": 640,
    "height": 480,
    "bytes": 30904
  },
  "Jemaa el-Fnaa": {
    "author": "Boris Macek",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Djemaa_el_Fna.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Djemaa_el_Fna.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/7/79/Djemaa_el_Fna.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/morocco-1.webp",
    "alt": "Jemaa el-Fnaa — Morocco",
    "width": 640,
    "height": 427,
    "bytes": 52996
  },
  "Aït Ben Haddou": {
    "author": "Petar Milošević",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ksar_A%C3%AFt_Benhaddou,_Marocco_(%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8,_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93).jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Ksar_Aït_Benhaddou,_Marocco_(أيت_بن_حدو،_المغرب,_ⴰⵢⵜ_ⵃⴰⴷⴷⵓ).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/morocco-2.webp",
    "alt": "Aït Ben Haddou — Morocco",
    "width": 640,
    "height": 396,
    "bytes": 67928
  },
  "Erg Chebbi": {
    "author": "Bjørn Christian Tørrissen",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Merzouga_Dunes_2011.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Merzouga_Dunes_2011.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/8/84/Merzouga_Dunes_2011.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/morocco-3.webp",
    "alt": "Erg Chebbi — Morocco",
    "width": 640,
    "height": 402,
    "bytes": 10610
  },
  "Sagrada Família": {
    "author": "Bernard Gagnon",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sagrada_Familia_01.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Sagrada Familia 01.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sagrada_Familia_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/spain-sagrada-landscape.webp",
    "alt": "Sagrada Família in a wider landscape view",
    "width": 640,
    "height": 430,
    "bytes": 42308
  },
  "Alhambra": {
    "author": "Jebulon",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "originalTitle": "File:Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/spain-2.webp",
    "alt": "Alhambra — Spain",
    "width": 640,
    "height": 426,
    "bytes": 56164
  },
  "Mount Teide": {
    "author": "Thomas Wolf , www.foto-tw.de",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Roque_Cinchado_und_Teide.jpg",
    "license": "CC BY-SA 3.0 de",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    "originalTitle": "File:Roque_Cinchado_und_Teide.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roque_Cinchado_und_Teide.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/spain-3.webp",
    "alt": "Mount Teide — Spain",
    "width": 640,
    "height": 381,
    "bytes": 51674
  },
  "Acropolis": {
    "author": "Giles Laurent",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2c/1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/greece-1.webp",
    "alt": "Acropolis — Greece",
    "width": 640,
    "height": 427,
    "bytes": 44450
  },
  "Meteora": {
    "author": "Stathis floros",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Meteora%27s_monastery_2.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Meteora's_monastery_2.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Meteora%27s_monastery_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/greece-2.webp",
    "alt": "Meteora — Greece",
    "width": 640,
    "height": 427,
    "bytes": 48176
  },
  "Santorini": {
    "author": "Alberto Lora",
    "sourceUrl": "https://unsplash.com/photos/white-and-blue-dome-building-near-body-of-water-during-daytime-xEG9zTZ8kog",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license",
    "src": "images/treasures/greece-3.webp",
    "alt": "Santorini — Greece",
    "width": 480,
    "height": 480,
    "bytes": 17318
  },
  "Arenal Volcano": {
    "author": "Rhododendrites",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Arenal_volcano_(70785p)_(cropped).jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalTitle": "File:Arenal_volcano_(70785p)_(cropped).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Arenal_volcano_%2870785p%29_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/costa-rica-1.webp",
    "alt": "Arenal Volcano — Costa Rica",
    "width": 640,
    "height": 353,
    "bytes": 46478
  },
  "Manuel Antonio": {
    "author": "No machine-readable author provided. Jakes19 assumed (based on copyright claims).",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Manuel_antonio_06_april_2005.jpeg",
    "license": "Public domain",
    "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Licensing",
    "originalTitle": "File:Manuel_antonio_06_april_2005.jpeg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/Manuel_antonio_06_april_2005.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/costa-rica-2.webp",
    "alt": "Manuel Antonio — Costa Rica",
    "width": 640,
    "height": 480,
    "bytes": 47456
  },
  "Río Celeste": {
    "author": "Imatges, algunes lle…",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rio_Celeste._Parc_natural_Volcan_Tenorio._Bijagua_de_Upala_-_panoramio_(1).jpg",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "originalTitle": "File:Rio Celeste. Parc natural Volcan Tenorio. Bijagua de Upala - panoramio (1).jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Rio_Celeste._Parc_natural_Volcan_Tenorio._Bijagua_de_Upala_-_panoramio_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/costa-rica-rio-celeste-landscape.webp",
    "alt": "Río Celeste in a wider landscape view",
    "width": 640,
    "height": 427,
    "bytes": 104766
  },
  "Borobudur": {
    "author": "CEphoto, Uwe Aranas",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Borobudur-Temple-Park_Indonesia_Stupas-of-Borobudur-04.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalTitle": "File:Borobudur-Temple-Park Indonesia Stupas-of-Borobudur-04.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Borobudur-Temple-Park_Indonesia_Stupas-of-Borobudur-04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/indonesia-1.webp",
    "alt": "Borobudur — Indonesia",
    "width": 640,
    "height": 457,
    "bytes": 46646
  },
  "Ulun Danu Beratan": {
    "author": "Mahmud Ahsan",
    "sourceUrl": "https://unsplash.com/photos/brown-and-green-temple-near-lake-and-green-mountain-under-blue-sky-during-daytime-QqPcxfFKqfU",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license",
    "src": "images/treasures/indonesia-2.webp",
    "alt": "Ulun Danu Beratan — Indonesia",
    "width": 480,
    "height": 480,
    "bytes": 45454
  },
  "Komodo National Park": {
    "author": "Adhi Rachdian from Indonesia",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Komodo_dragon_at_Komodo_National_Park.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "originalTitle": "File:Komodo_dragon_at_Komodo_National_Park.jpg",
    "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
    "src": "images/treasures/indonesia-3.webp",
    "alt": "Komodo National Park — Indonesia",
    "width": 640,
    "height": 426,
    "bytes": 51114
  }
};
function appendTreasurePhoto(treasure,panel){
 const photo=treasurePhotos[treasure.name];if(!photo)return;
 const figure=document.createElement('figure');figure.className='treasure-photo';
 const image=document.createElement('img');image.alt=photo.alt;image.width=photo.width;image.height=photo.height;image.decoding='async';image.src=photo.src;
 image.onerror=()=>figure.remove();
 const caption=document.createElement('figcaption'),source=document.createElement('a'),license=document.createElement('a');
 source.href=photo.sourceUrl;source.textContent='Photo: '+photo.author;source.target='_blank';source.rel='noopener noreferrer';
 license.href=photo.licenseUrl;license.textContent=photo.license;license.target='_blank';license.rel='noopener noreferrer';
 caption.append(source,document.createTextNode(' · '),license);figure.append(image,caption);panel.append(figure);
}
