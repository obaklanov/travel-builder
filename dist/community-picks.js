// Book and film links audited 2026-10-29: exact-title pages only. Availability varies by territory.
const verifiedBookExtras={"egypt":[],"new-zealand":[["The Booker Prizes", "https://thebookerprizes.com/the-booker-library/books/the-luminaries"]],"argentina":[["Penguin UK","https://www.penguin.co.uk/books/358669/in-patagonia-by-bruce-chatwin/9781448105618"]],"italy":[["Author’s website","https://francesmayesbooks.com/"]],"thailand":[["Google Books","https://books.google.com/books/about/The_Beach.html?id=Gq1PEAAAQBAJ"]],"japan":[["Google Books","https://books.google.com/books/about/Shogun.html?id=cWAF8_uH1_sC"]],"portugal":[["Google Books","https://books.google.com/books?id=FMLFDiIeYyoC"]],"mexico":[["Author’s website","https://luisurrea.com/books/the-hummingbirds-daughter/"]]};
const verifiedFilmLinks={"egypt":[["Prime Video", "https://www.primevideo.com/detail/0IPENYB3P0ZOBXDK5UMZI2704B"], ["Trilogy / buy options", "https://www.universalpicturesathome.com/movies/the-mummy-trilogy"]],"new-zealand":[["Prime Video", "https://www.primevideo.com/detail/0LWRW27ARYUWUHN7CXFSXJS1T2"], ["Viewing options", "https://wilderpeople.film/watch"], ["Official film page", "https://www.sonypictures.com/movies/huntforthewilderpeople"]],"argentina":[["Prime Video","https://www.primevideo.com/detail/0SP2V02EJF5P3CRHECR3DZU3FX"],["Buy / rent options","https://www.universalpicturesathome.com/movies/the-motorcycle-diaries"],["Official film page","https://www.focusfeatures.com/motorcycle_diaries"]],"italy":[["Prime Video","https://www.primevideo.com/detail/0HC1PTV8BO25G6GCF85TREEA1I"],["Disney+","https://www.disneyplus.com/browse/entity-f28b825f-c207-406b-923a-67f85e6d90e0"],["Official film page","https://www.pixar.com/luca"]],"thailand":[["Prime Video","https://www.primevideo.com/detail/0JKQMRKSNRQNQMMOMCJO3AVM82"]],"japan":[["Official distributor","https://gkids.com/films/spirited-away/"],["Blu-ray / DVD","https://store.gkids.com/collections/spirited-away/products/spirited-away"]],"portugal":[["Prime Video","https://www.primevideo.com/detail/0KZZUKISA9XJ0ZXJNQNHHGBVCY"],["Viewing options","https://www.roku.com/whats-on/movies/night-train-to-lisbon?id=11388fb266865e1296fba3cf5d7b313f"]],"mexico":[["Prime Video","https://www.primevideo.com/detail/0KAFM79I4O8BYHNF7NM1K9EJRL"]]};
// Initial editorial selections; no community votes have been collected.
const communityPicks={
"egypt":{"song": ["3 Daqat (2017)", "Abu & Yousra", "A sunny Egyptian pop duet with a gently swinging, feel-good rhythm.", "https://www.youtube.com/watch?v=ejvpVhvKesM"], "book": ["Death on the Nile", "Agatha Christie", "A glamorous Nile cruise becomes a twisting mystery for Hercule Poirot.", "https://www.agathachristie.com/en/stories/death-on-the-nile"], "film": ["The Mummy (1999)", "Brendan Fraser & Rachel Weisz · directed by Stephen Sommers", "A playful fantasy adventure through lost tombs, desert sands and ancient curses."], "bookLabel": "Official book page"},
"new-zealand":{"song": ["Supalonely (2019)", "BENEE feat. Gus Dapperton", "Bouncy pop from New Zealand’s BENEE, pairing a bright groove with wistful lyrics.", "https://www.youtube.com/watch?v=SztvQd1eYlI"], "book": ["The Luminaries", "Eleanor Catton", "Gold-rush-era New Zealand unfolds through a richly plotted mystery of fortune, secrets and chance.", "https://granta.com/products/the-luminaries/?binding=paperback&isbn=9781783787265"], "film": ["Hunt for the Wilderpeople (2016)", "Sam Neill & Julian Dennison · directed by Taika Waititi", "An unlikely pair gets lost in the New Zealand bush in a warm, eccentric adventure."], "bookLabel": "Publisher"},

"argentina":{"song": ["Miénteme (2021)", "TINI & María Becerra", "An upbeat, danceable hit from two Argentine pop stars.", "https://www.youtube.com/watch?v=mmRBXjVENDQ"], "book": ["In Patagonia", "Bruce Chatwin", "A literary journey through Patagonia, weaving landscapes, encounters and stories from the far south.", "https://www.penguinrandomhouse.com/books/286569/in-patagonia-by-bruce-chatwin-introduction-by-nicholas-shakespeare/"], "film": ["The Motorcycle Diaries (2004)", "Directed by Walter Salles", "Two young Argentines leave Buenos Aires on a life-changing road trip across South America."]},
"italy":{"song": ["Italodisco (2023)", "The Kolors", "Bright, danceable Italian pop for a sunlit start to your trip.", "https://www.youtube.com/watch?v=cIkXBFACp4s"], "book": ["Under the Tuscan Sun", "Frances Mayes", "An abandoned Tuscan villa becomes a journey into food, local life and starting something new.", "https://www.penguinrandomhouse.com/books/109734/under-the-tuscan-sun-by-frances-mayes/"], "film": ["Luca (2021)", "Disney and Pixar · directed by Enrico Casarosa", "Sea monsters, friendship and a summer adventure on the Italian Riviera."]},
  "thailand": {
    "song": [
      "Phak Kon (2020)",
      "MILLI",
      "A lively Thai rap breakout from the official YUPP! channel.",
      "https://www.youtube.com/watch?v=rUAuEo3t0-o"
    ],
    "book": [
      "The Beach",
      "Alex Garland",
      "A backpacker’s search for paradise becomes a gripping island adventure.",
      "https://www.penguinrandomhouse.com/books/348300/the-beach-by-alex-garland/9781573226523/"
    ],
    "film": [
      "The Beach (2000)",
      "Leonardo DiCaprio · directed by Danny Boyle",
      "A secret beach, a tempting escape and paradise with a darker side."
    ]
  },
  "japan": {
    "song": [
      "Idol (2023)",
      "YOASOBI",
      "High-energy Japanese pop with a globally recognized anime opening.",
      "https://www.youtube.com/watch?v=ZRtdQ81jPUQ"
    ],
    "book": [
      "Shōgun",
      "James Clavell",
      "Shipwreck, rivalry and discovery in a sweeping historical adventure.",
      "https://www.hachette.co.uk/titles/james-clavell/shogun/9780340766163/"
    ],
    "film": [
      "Spirited Away (2001)",
      "Directed by Hayao Miyazaki",
      "A mysterious spirit world and a courageous journey home."
    ]
  },
  "portugal": {
    "song": [
      "Te Amo (2020)",
      "Calema",
      "Warm, rhythmic Portuguese-language pop by the São Toméan duo active in Portugal.",
      "https://www.youtube.com/watch?v=YBMIj1Fj1J4"
    ],
    "book": [
      "Night Train to Lisbon",
      "Pascal Mercier",
      "An impulsive journey to Lisbon unfolds into a search through hidden lives.",
      "https://groveatlantic.com/book/night-train-to-lisbon/"
    ],
    "film": [
      "Night Train to Lisbon (2013)",
      "Jeremy Irons · directed by Bille August",
      "An atmospheric Lisbon mystery about courage, memory and reinvention."
    ]
  },
  "mexico": {
    "song": [
      "1, 2, 3 (2018)",
      "Sofía Reyes feat. Jason Derulo & De La Ghetto",
      "Upbeat bilingual pop led by Mexican singer Sofía Reyes.",
      "https://www.youtube.com/watch?v=p03TIGqEc8o"
    ],
    "book": [
      "The Hummingbird’s Daughter",
      "Luis Alberto Urrea",
      "An epic journey of discovery and upheaval in nineteenth-century Mexico.",
      "https://www.hachette.co.uk/titles/luis-alberto-urrea/the-hummingbirds-daughter/9781529305067/"
    ],
    "film": [
      "Coco (2017)",
      "Disney and Pixar · directed by Lee Unkrich",
      "A colourful musical adventure through family history and the Land of the Dead."
    ]
  }
};

function communitySection(key){
 const p=communityPicks[key];if(!p)return '';
 return '<section class="community-section"><h2>Getting into the mood</h2><div class="community-picks">'+[['song','Song to set the mood'],['book','Book for the journey'],['film','Film to spark adventure']].map(([type,label])=>{
  const [title,creator,description,bookUrl]=p[type];
  const query=encodeURIComponent(title+' '+creator);
  const links=type==='song'?[['Listen on YouTube',p.song[3]],['Spotify','https://open.spotify.com/search/'+query]]:type==='book'?[[p.bookLabel||'Publisher',bookUrl],...(verifiedBookExtras[key]||[])]:(verifiedFilmLinks[key]||[]);
  return '<article><span class="pick-category">'+label.replace(/^(Song|Book|Film)/, '<strong>$1</strong>')+'</span><h3>'+title+'</h3><p class="pick-creator">'+creator+'</p><p>'+description+'</p><div class="resource-links">'+links.map(([text,url])=>'<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+text+' ↗</a>').join('')+'</div></article>';
 }).join('')+'</div></section>';
}

Object.assign(communityPicks, {
  "united-states": {
    "song": [
      "Flowers (2023)",
      "Miley Cyrus",
      "Bright pop for a fresh start.",
      "https://www.youtube.com/watch?v=G7KNmW9a75Y"
    ],
    "book": [
      "Into the Wild",
      "Jon Krakauer",
      "A compelling, cautionary true story of a journey into the American wilderness.",
      "https://www.penguinrandomhouse.com/books/95440/into-the-wild-by-jon-krakauer/"
    ],
    "film": [
      "The Secret Life of Walter Mitty (2013)",
      "Ben Stiller · director",
      "An ordinary dreamer steps into an extraordinary real-world adventure."
    ]
  },
  "vietnam": {
    "song": [
      "See Tình (2022)",
      "Hoàng Thuỳ Linh",
      "Playful Vietnamese dance-pop with an irresistible chorus.",
      "https://www.youtube.com/watch?v=gJHSDZfJrRY"
    ],
    "book": [
      "Catfish and Mandala",
      "Andrew X. Pham",
      "A bicycle journey through Vietnam becomes a moving exploration of family and belonging.",
      "https://us.macmillan.com/books/9781429979924/catfishandmandala/"
    ],
    "film": [
      "The Quiet American (2002)",
      "Phillip Noyce · director",
      "A tense historical drama set in 1950s Vietnam, based on Graham Greene’s novel."
    ]
  },
  "colombia": {
    "song": [
      "Si Antes Te Hubiera Conocido (2024)",
      "KAROL G",
      "Sun-soaked merengue-pop from the Colombian star.",
      "https://www.youtube.com/watch?v=MgsdDfdGdHc"
    ],
    "book": [
      "Love in the Time of Cholera",
      "Gabriel García Márquez",
      "A sweeping love story in a vivid Caribbean setting inspired by Colombia.",
      "https://www.penguinrandomhouseretail.com/book/?isbn=9780307389732"
    ],
    "film": [
      "Encanto (2021)",
      "Disney · Byron Howard and Jared Bush",
      "A colourful Colombian-inspired family adventure filled with music and magic."
    ]
  },
  "morocco": {
    "song": [
      "NIYA (2020)",
      "MANAL",
      "Upbeat Moroccan pop celebrating tradition with a modern pulse.",
      "https://www.youtube.com/watch?v=e1_yflHZ-jI"
    ],
    "book": [
      "The Caliph’s House",
      "Tahir Shah",
      "An adventurous, often funny memoir of restoring a house and starting anew in Casablanca.",
      "https://www.penguinrandomhouse.com/books/164630/the-caliphs-house-by-tahir-shah/"
    ],
    "film": [
      "Hideous Kinky (1999)",
      "Gillies MacKinnon · director",
      "A mother and her daughters seek a different life in 1970s Morocco."
    ]
  }
});
Object.assign(verifiedBookExtras, {"united-states": [], "vietnam": [], "colombia": [], "morocco": []});
Object.assign(verifiedFilmLinks, {
  "united-states": [
    [
      "Official film page",
      "https://www.20thcenturystudios.com/movies/the-secret-life-of-walter-mitty"
    ]
  ],
  "vietnam": [
    [
      "Official film page",
      "https://www.miramax.com/movie/the-quiet-american/"
    ]
  ],
  "colombia": [
    [
      "Disney",
      "https://movies.disney.com/encanto"
    ]
  ],
  "morocco": [
    [
      "Prime Video",
      "https://www.primevideo.com/detail/0QX12YZOYRI808XADWHTTYAP4I"
    ]
  ]
});

// Editorial selections for the four newest destinations; restored temporarily.
Object.assign(communityPicks, {
  "spain": {
    "song": [
      "DESPECHÁ (2022)",
      "ROSALÍA",
      "A carefree Spanish pop soundtrack for sunny streets and late evenings.",
      "https://www.youtube.com/watch?v=5g2hT4GmAGU"
    ],
    "book": [
      "The Shadow of the Wind",
      "Carlos Ruiz Zafón",
      "A mysterious book leads into the secrets and hidden streets of Barcelona.",
      "https://www.carlosruizzafon.com/la-sombra-del-viento/ediciones.php"
    ],
    "bookLabel": "Author’s website",
    "film": [
      "Vicky Cristina Barcelona (2008)",
      "Directed by Woody Allen",
      "Art, romance and a summer of unexpected encounters in Barcelona."
    ]
  },
  "greece": {
    "song": [
      "ZARI (2024)",
      "Marina Satti",
      "Greek rhythms and playful pop energy for a trip with a little spontaneity.",
      "https://www.youtube.com/watch?v=mTSTnLWGUPs"
    ],
    "book": [
      "My Family and Other Animals",
      "Gerald Durrell",
      "An affectionate, funny account of family life and wildlife on Corfu.",
      "https://www.penguinrandomhouse.com/books/289004/my-family-and-other-animals-by-gerald-durrell/"
    ],
    "film": [
      "Mamma Mia! (2008)",
      "Directed by Phyllida Lloyd",
      "Island sunshine, tangled family stories and an exuberant ABBA soundtrack."
    ]
  },
  "costa-rica": {
    "song": [
      "Baño de Luna (2023)",
      "Debi Nova",
      "Warm, rhythmic pop from Costa Rican singer-songwriter Debi Nova.",
      "https://www.youtube.com/watch?v=FFacmzAq_-Y"
    ],
    "book": [
      "Jurassic Park",
      "Michael Crichton",
      "A fictional island off Costa Rica becomes the setting for a gripping dinosaur adventure.",
      "https://michaelcrichton.com/works/jurassic-park/"
    ],
    "bookLabel": "Author’s website",
    "film": [
      "Jurassic Park (1993)",
      "Directed by Steven Spielberg",
      "A fictional Costa Rican island provides the setting for an unforgettable adventure; filming took place elsewhere."
    ]
  },
  "indonesia": {
    "song": [
      "Lathi (2020)",
      "Weird Genius featuring Sara Fajira",
      "Dramatic electronic pop blending Indonesian talent with Javanese musical elements.",
      "https://www.youtube.com/watch?v=8uy7G2JXVSA"
    ],
    "book": [
      "The Rainbow Troops",
      "Andrea Hirata",
      "Friendship, ambition and childhood adventures on Indonesia’s Belitung island.",
      "https://us.macmillan.com/books/9780374534448/therainbowtroops/"
    ],
    "film": [
      "The Rainbow Troops / Laskar Pelangi (2008)",
      "Directed by Riri Riza",
      "A hopeful story of schoolchildren and their teachers on Belitung island."
    ]
  }
});
Object.assign(verifiedBookExtras, {"spain": [["WorldCat", "https://search.worldcat.org/title/The-shadow-of-the-wind/oclc/1195034569"]], "greece": [["Canongate", "https://canongate.co.uk/books/1609-my-family-and-other-animals/"]], "costa-rica": [], "indonesia": [["OverDrive", "https://www.overdrive.com/media/1456345/the-rainbow-troops"]]});
Object.assign(verifiedFilmLinks, {"spain": [["Film details", "https://www.premiosgoya.com/pelicula/vicky-cristina-barcelona"]], "greece": [["Official film page", "https://mamma-mia.com/the-movies/the-movie"]], "costa-rica": [["Official film page", "https://amblin.com/movie/jurassic-park/"]], "indonesia": [["Official film page", "https://milesfilms.net/en/laskar-pelangi/"], ["Viewing options", "https://www.justwatch.com/us/movie/the-rainbow-troops"]]});

// Editorial mood picks for eight additional destinations; links checked 2026-11-01.
Object.assign(communityPicks, {
  "france": {
    "song": [
      "Djadja (2018)",
      "Aya Nakamura",
      "A buoyant French pop hit with an easy dance groove.",
      "https://www.youtube.com/watch?v=iPGgnzc34tY"
    ],
    "book": [
      "The Three Musketeers",
      "Alexandre Dumas",
      "Swordplay, intrigue and friendship in a swashbuckling novel set in seventeenth-century France.",
      "https://penguinrandomhouselibrary.com/book/?isbn=9780307594990"
    ],
    "film": [
      "The Three Musketeers: D’Artagnan (2023)",
      "Directed by Martin Bourboulon",
      "Dumas’s fictional heroes race through royal intrigue and daring duels in France."
    ]
  },
  "united-kingdom": {
    "song": [
      "Dance the Night (2023)",
      "Dua Lipa",
      "Sparkling disco-pop from the London-born singer.",
      "https://www.youtube.com/watch?v=OiC1rgCPmUQ"
    ],
    "book": [
      "The Hound of the Baskervilles",
      "Arthur Conan Doyle",
      "Sherlock Holmes and Watson tackle a chilling fictional mystery on Devon’s wild moors.",
      "https://www.penguin.co.uk/books/34513/the-hound-of-the-baskervilles-by-doyle-arthur-conan/9780141192437"
    ],
    "film": [
      "Paddington 2 (2017)",
      "Directed by Paul King",
      "A stolen book sends Paddington into a warm, wonderfully inventive London adventure."
    ]
  },
  "turkey": {
    "song": [
      "Yolla (2017)",
      "Tarkan",
      "A lively Turkish pop hit with a dance-ready rhythm.",
      "https://www.youtube.com/watch?v=_GOZDXq7I-I"
    ],
    "book": [
      "Birds Without Wings",
      "Louis de Bernières",
      "A sweeping historical novel follows intertwined lives in an Anatolian town as the Ottoman world changes.",
      "https://www.penguinrandomhouse.com/books/38303/birds-without-wings-by-louis-de-bernieres/"
    ],
    "film": [
      "The Water Diviner (2014)",
      "Directed by Russell Crowe",
      "A fictional Australian father journeys from Istanbul into Anatolia searching for his missing sons after the First World War."
    ]
  },
  "peru": {
    "song": [
      "Probablemente (2018)",
      "Daniela Darcourt",
      "An energetic salsa hit from the Peruvian singer.",
      "https://www.youtube.com/watch?v=ME92E6J8ubE"
    ],
    "book": [
      "Turn Right at Machu Picchu",
      "Mark Adams",
      "A funny travel memoir follows an unlikely adventurer through Peru’s Andes and Inca history.",
      "https://www.penguinrandomhouse.com/books/306890/turn-right-at-machu-picchu-by-mark-adams/"
    ],
    "film": [
      "Paddington in Peru (2024)",
      "Directed by Dougal Wilson",
      "Paddington and the Browns follow a mysterious map into a playful, fictional Peruvian jungle adventure."
    ]
  },
  "brazil": {
    "song": [
      "Envolver (2021)",
      "Anitta",
      "A dance-floor favourite from the Brazilian pop star, sung in Spanish.",
      "https://www.youtube.com/watch?v=hFCjGiawJi4"
    ],
    "book": [
      "The Lost City of Z",
      "David Grann",
      "A gripping work of nonfiction investigates Percy Fawcett’s disappearance and the search for a fabled city in the Brazilian Amazon.",
      "https://www.penguinrandomhouse.com/books/70475/the-lost-city-of-z-by-david-grann/"
    ],
    "film": [
      "Rio (2011)",
      "Directed by Carlos Saldanha",
      "A sheltered macaw finds friendship, carnival colour and high-flying adventure in Rio de Janeiro."
    ]
  },
  "south-africa": {
    "song": [
      "Jerusalema (2019)",
      "Master KG feat. Nomcebo",
      "An uplifting South African dance anthem with a joyful gospel-house pulse.",
      "https://www.youtube.com/watch?v=fCZVL_8D048"
    ],
    "book": [
      "Jock of the Bushveld",
      "Percy FitzPatrick",
      "A classic tale of a courageous dog and his owner’s adventures in South Africa’s bushveld.",
      "https://www.penguin.co.uk/books/62503/jock-of-the-bushveld-by-fitzpatrick-percy/9780141930060"
    ],
    "film": [
      "Khumba (2013)",
      "Directed by Anthony Silverston",
      "A half-striped zebra crosses South Africa’s Karoo in a colourful animated quest for belonging."
    ]
  },
  "south-korea": {
    "song": [
      "Dynamite (2020)",
      "BTS",
      "Bright disco-pop from the South Korean group, brimming with feel-good energy.",
      "https://www.youtube.com/watch?v=gdZLi9oWNZg"
    ],
    "book": [
      "The Island of Sea Women",
      "Lisa See",
      "A dramatic historical novel about Jeju’s women divers, friendship and courage through turbulent times.",
      "https://www.simonandschuster.com/books/The-Island-of-Sea-Women/Lisa-See/9781501154867"
    ],
    "film": [
      "Okja (2017)",
      "Directed by Bong Joon Ho",
      "A girl leaves her South Korean mountain home on a daring mission to rescue her extraordinary animal friend."
    ]
  },
  "australia": {
    "song": [
      "Padam Padam (2023)",
      "Kylie Minogue",
      "A pulsing dance-pop hit from the Australian singer.",
      "https://www.youtube.com/watch?v=p6Cnazi_Fi0"
    ],
    "book": [
      "Tracks",
      "Robyn Davidson",
      "A candid memoir of a remarkable journey across the Australian desert with four camels and a dog.",
      "https://www.bloomsbury.com/uk/tracks-9781408834879/"
    ],
    "film": [
      "Tracks (2013)",
      "Directed by John Curran",
      "A dramatisation of Robyn Davidson’s extraordinary trek across the Australian desert."
    ]
  }
});
Object.assign(verifiedBookExtras, {
  "france": [],
  "united-kingdom": [],
  "turkey": [],
  "peru": [],
  "brazil": [],
  "south-africa": [],
  "south-korea": [],
  "australia": []
});
Object.assign(verifiedFilmLinks, {
  "france": [
    [
      "Official film page",
      "https://www.pathefilms.com/fr/films/les-trois-mousquetaires-dartagnan/"
    ]
  ],
  "united-kingdom": [
    [
      "Official film page",
      "https://www.warnerbros.com/movies/paddington-2"
    ]
  ],
  "turkey": [
    [
      "Official film page",
      "https://www.warnerbros.com/movies/water-diviner"
    ],
    [
      "Buy / rent options",
      "https://moviesanywhere.com/movie/the-water-diviner"
    ]
  ],
  "peru": [
    [
      "Official film page",
      "https://www.sonypictures.com/movies/paddingtoninperu"
    ]
  ],
  "brazil": [
    [
      "Disney+",
      "https://www.disneyplus.com/pt-br/browse/entity-8f2b1ae4-13a8-4378-b853-01d928f45297"
    ]
  ],
  "south-africa": [
    [
      "Official film page",
      "https://www.triggerfish.com/khumba/"
    ]
  ],
  "south-korea": [
    [
      "Netflix",
      "https://www.netflix.com/title/80091936"
    ]
  ],
  "australia": [
    [
      "Official distributor",
      "https://www.transmissionfilms.com.au/films/tracks"
    ]
  ]
});
