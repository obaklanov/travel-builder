'use strict';
// pending fields have no verified destination evidence; must-have pending fields block generation.
window.TRAVEL_BUILDER_FILTERS = [
  {
    "id": "party",
    "label": "Travel party",
    "group": "party",
    "options": [
      "Solo",
      "Couple"
    ],
    "pending": false,
    "primary": true,
    "help": "Solo travels with one person; Couple travels with two.",
    "presentation": "tiles",
    "shortLabels": {
      "Multigenerational": "Multi-gen"
    }
  },
  {
    "id": "people",
    "label": "Total travellers",
    "group": "party",
    "options": [
      [
        "1",
        "1 person"
      ],
      [
        "2",
        "2 people"
      ]
    ],
    "primary": true,
    "help": "Automatically set by Solo or Couple.",
    "presentation": "travellers"
  },
  {
    "id": "destination",
    "label": "Destination",
    "group": "where",
    "options": [
      [
        "",
        "Anywhere"
      ]
    ],
    "help": "Choose one or more countries or continents. No selections means anywhere. Exclusions take precedence.",
    "primary": true,
    "multiple": true
  },
  {
    "id": "newPlaces",
    "label": "Unvisited countries only",
    "group": "where",
    "primary": false,
    "priority": false,
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Prefer unvisited countries"
      ]
    ],
    "help": "When on, exclude countries recorded as visited in your signed-in profile. Requires available profile history.",
    "presentation": "switch"
  },
  {
    "id": "exclude",
    "label": "Destinations to exclude",
    "group": "where",
    "primary": false,
    "multiple": true,
    "options": [],
    "help": "Exclude continents, countries or planning regions. Exclusions override your destination selection. City exclusions will follow when travel hubs are available."
  },
  {
    "id": "month",
    "label": "Travel month",
    "group": "where",
    "type": "month",
    "help": "Leave empty for a suggestion in the next three months.",
    "primary": true
  },
  {
    "id": "days",
    "label": "Trip length, days",
    "group": "where",
    "primary": true,
    "options": [
      [
        "1-3",
        "1–3 days"
      ],
      [
        "4-6",
        "4–6 days"
      ],
      [
        "7-9",
        "7–9 days"
      ],
      [
        "10-12",
        "10–12 days"
      ],
      [
        "13-15",
        "About 2 weeks"
      ],
      [
        "16-19",
        "16–19 days"
      ],
      [
        "20-23",
        "About 3 weeks"
      ],
      [
        "24-30",
        "24–30 days"
      ],
      [
        "31-45",
        "31–45 days"
      ],
      [
        "46-60",
        "46–60 days"
      ],
      [
        "61-90",
        "61–90 days"
      ]
    ],
    "presentation": "duration",
    "defaultValue": "7-9"
  },
  {
    "id": "earliest",
    "label": "Specific departure days",
    "group": "where",
    "type": "date",
    "help": "Trip must start on or after this date. Combined with your month and duration, if specified.",
    "primary": false
  },
  {
    "id": "latest",
    "label": "Specific return days",
    "group": "where",
    "type": "date",
    "help": "The whole trip must finish on or before this date.",
    "primary": false
  },
  {
    "id": "region",
    "label": "Planning region",
    "group": "where",
    "options": [
      [
        "",
        "Any region"
      ]
    ],
    "help": "Regions depend on the selected country. Country-level cost estimates still apply.",
    "primary": true
  },
  {
    "id": "season",
    "label": "Best time to visit",
    "group": "weather",
    "options": [
      [
        "",
        "Any season"
      ],
      [
        "B",
        "Best months only"
      ],
      [
        "BA",
        "Best or average"
      ]
    ],
    "help": "Editorial regional sightseeing ratings, not a weather forecast.",
    "primary": false,
    "priority": true,
    "defaultPriority": "must"
  },
  {
    "id": "temperature",
    "label": "Temperature",
    "group": "weather",
    "pending": true,
    "options": [
      "Any",
      "Cool · under 15°C",
      "Mild · 15–24°C",
      "Warm · 25–30°C",
      "Hot · over 30°C"
    ],
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "rain",
    "label": "Rain tolerance",
    "group": "weather",
    "pending": true,
    "options": [
      "Any",
      "Dry preferred",
      "Some rain is fine",
      "Rain is fine"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "interests",
    "label": "Activities & interests",
    "group": "experience",
    "pending": true,
    "multiple": true,
    "options": [
      "Architecture",
      "Art and museums",
      "Beaches and swimming",
      "City walks & neighbourhoods",
      "Diving / snorkelling",
      "Festivals / events",
      "Food experiences",
      "Hiking",
      "History and heritage",
      "Nightlife",
      "Skiing / snow sports",
      "Theme parks",
      "Wildlife"
    ],
    "help": "Select several interests. These preferences are not matched yet.",
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "tags"
  },
  {
    "id": "style",
    "label": "Trip style",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "Relaxing",
      "Exploring"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "segments",
    "shortLabels": {
      "": "Any",
      "Relaxing": "Relax",
      "Exploring": "Explore"
    }
  },
  {
    "id": "lastStop",
    "label": "Last stop?",
    "group": "where",
    "pending": false,
    "options": [
      [
        "yes",
        "Yes"
      ],
      [
        "no",
        "No"
      ]
    ],
    "primary": true,
    "priority": false,
    "presentation": "segments",
    "help": "Yes ends this trip here. No carries its arrival point and end date into the next-base design.",
    "defaultValue": "yes"
  },
  {
    "id": "landscape",
    "label": "Landscape",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "Coast",
      "Mountains",
      "Forest",
      "Desert",
      "Islands",
      "Lakes"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "placeSize",
    "label": "City size",
    "group": "experience",
    "pending": true,
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "under-500k",
        "Under 500,000"
      ],
      [
        "500k-1m",
        "500,000–1,000,000"
      ],
      [
        "1m-3m",
        "1,000,000–3,000,000"
      ],
      [
        "3m-5m",
        "3,000,000–5,000,000"
      ],
      [
        "over-5m",
        "Over 5,000,000"
      ]
    ],
    "help": "Metropolitan-area population bands. Population data for destination hubs is not yet verified."
  },
  {
    "id": "fitnessBudget",
    "label": "Fitness budget · CAD/week total",
    "group": "budget",
    "pending": false,
    "options": [
      [
        "0",
        "No fitness allowance"
      ],
      [
        "25",
        "$25 total / week"
      ],
      [
        "50",
        "$50 total / week"
      ],
      [
        "75",
        "$75 total / week"
      ],
      [
        "100",
        "$100 total / week"
      ],
      [
        "150",
        "$150 total / week"
      ],
      [
        "200",
        "$200 total / week"
      ]
    ],
    "primary": false,
    "priority": false,
    "help": "Weekly fitness allowance for the whole group. Prorated by trip days and included once in the group total."
  },
  {
    "id": "evening",
    "label": "Evening atmosphere",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "Quiet",
      "Restaurants and cafés",
      "Nightlife"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "budget",
    "label": "Trip budget · CAD",
    "group": "budget",
    "options": [
      [
        "",
        "Any budget"
      ],
      [
        "total:500",
        "$500 total"
      ],
      [
        "total:1000",
        "$1,000 total"
      ],
      [
        "total:1500",
        "$1,500 total"
      ],
      [
        "total:2000",
        "$2,000 total"
      ],
      [
        "total:3000",
        "$3,000 total"
      ],
      [
        "total:4000",
        "$4,000 total"
      ],
      [
        "total:5000",
        "$5,000 total"
      ],
      [
        "total:7500",
        "$7,500 total"
      ],
      [
        "total:10000",
        "$10,000 total"
      ],
      [
        "total:15000",
        "$15,000 total"
      ],
      [
        "total:20000",
        "$20,000 total"
      ],
      [
        "total:30000",
        "$30,000 total"
      ],
      [
        "total:50000",
        "$50,000 total"
      ],
      [
        "person:500",
        "$500 / person"
      ],
      [
        "person:1000",
        "$1,000 / person"
      ],
      [
        "person:1500",
        "$1,500 / person"
      ],
      [
        "person:2000",
        "$2,000 / person"
      ],
      [
        "person:3000",
        "$3,000 / person"
      ],
      [
        "person:4000",
        "$4,000 / person"
      ],
      [
        "person:5000",
        "$5,000 / person"
      ],
      [
        "person:7500",
        "$7,500 / person"
      ],
      [
        "person:10000",
        "$10,000 / person"
      ],
      [
        "person:15000",
        "$15,000 / person"
      ],
      [
        "person:20000",
        "$20,000 / person"
      ],
      [
        "person:30000",
        "$30,000 / person"
      ],
      [
        "person:50000",
        "$50,000 / person"
      ]
    ],
    "primary": true,
    "priority": false,
    "defaultPriority": "must",
    "presentation": "dropdown"
  },
  {
    "id": "comfort",
    "label": "Comfort level",
    "group": "budget",
    "options": [
      "Any",
      "Basic / simple",
      "Comfortable",
      "Premium"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "comfort",
    "shortLabels": {
      "": "Any",
      "Basic / simple": "Simple",
      "Comfortable": "Comfort",
      "Premium": "Premium"
    }
  },
  {
    "id": "departure",
    "label": "Departure airport",
    "group": "travel",
    "options": [
      [
        "",
        "Use my city"
      ],
      [
        "YYZ",
        "Toronto · YYZ"
      ],
      [
        "YVR",
        "Vancouver · YVR"
      ],
      [
        "YUL",
        "Montréal · YUL"
      ],
      [
        "YYC",
        "Calgary · YYC"
      ],
      [
        "YEG",
        "Edmonton · YEG"
      ]
    ],
    "primary": true,
    "type": "text",
    "defaultValue": "YYZ",
    "help": "Enter any three-letter IATA airport code. Defaults to Toronto (YYZ). Route estimates depend on available data."
  },
  {
    "id": "flightHours",
    "label": "Max journey · hours",
    "group": "travel",
    "type": "number",
    "min": 1,
    "max": 60,
    "placeholder": "Any · approximate",
    "help": "Maximum estimated one-way journey time, not a live flight schedule.",
    "primary": true,
    "priority": true,
    "defaultPriority": "must",
    "presentation": "journey"
  },
  {
    "id": "stops",
    "label": "Flight connections",
    "group": "travel",
    "pending": true,
    "options": [
      "Any",
      "Nonstop only",
      "Up to 1 connection",
      "Up to 2 connections"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "transferLimit",
    "label": "Airport transfer",
    "group": "travel",
    "options": [
      "Under 2 hours",
      "2–4 hours",
      "4–6 hours",
      "6–12 hours",
      "12–24 hours",
      "Over 24 hours"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "multiple": true,
    "presentation": "tags",
    "help": "Select one or more airport-to-destination transfer time ranges. Transfer times are not verified yet."
  },
  {
    "id": "mobility",
    "label": "Metro / subway",
    "group": "travel",
    "pending": true,
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Yes"
      ],
      [
        "no",
        "No"
      ]
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "yesNo",
    "help": "Whether the destination city has a metro or subway system. City-level data is not verified yet."
  },
  {
    "id": "access",
    "label": "Access needs",
    "group": "health",
    "options": [
      "Step-free routes",
      "Limited walking",
      "Avoid many stairs",
      "Wheelchair access",
      "Quiet / low-sensory spaces"
    ],
    "pending": true,
    "primary": true,
    "multiple": true,
    "help": "Optional requirements. Accessibility is not verified: a suggested trip must not be treated as confirmed suitable.",
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "tags"
  },
  {
    "id": "passport",
    "label": "Passport",
    "group": "party",
    "pending": true,
    "options": [
      [
        "",
        "Not specified"
      ],
      [
        "AR",
        "Argentina"
      ],
      [
        "AU",
        "Australia"
      ],
      [
        "BR",
        "Brazil"
      ],
      [
        "BN",
        "Brunei"
      ],
      [
        "CA",
        "Canada"
      ],
      [
        "CO",
        "Colombia"
      ],
      [
        "CR",
        "Costa Rica"
      ],
      [
        "EG",
        "Egypt"
      ],
      [
        "FR",
        "France"
      ],
      [
        "GR",
        "Greece"
      ],
      [
        "ID",
        "Indonesia"
      ],
      [
        "IT",
        "Italy"
      ],
      [
        "JP",
        "Japan"
      ],
      [
        "LA",
        "Laos"
      ],
      [
        "MY",
        "Malaysia"
      ],
      [
        "MX",
        "Mexico"
      ],
      [
        "MA",
        "Morocco"
      ],
      [
        "NZ",
        "New Zealand"
      ],
      [
        "PE",
        "Peru"
      ],
      [
        "PH",
        "Philippines"
      ],
      [
        "PT",
        "Portugal"
      ],
      [
        "ZA",
        "South Africa"
      ],
      [
        "KR",
        "South Korea"
      ],
      [
        "ES",
        "Spain"
      ],
      [
        "TH",
        "Thailand"
      ],
      [
        "TR",
        "Türkiye"
      ],
      [
        "GB",
        "United Kingdom"
      ],
      [
        "US",
        "United States"
      ],
      [
        "VN",
        "Vietnam"
      ],
      [
        "OTHER",
        "Other passport"
      ]
    ],
    "help": "Nationality is recorded as a preference. Entry eligibility is not checked yet.",
    "primary": true,
    "defaultValue": "CA"
  },
  {
    "id": "passport2",
    "label": "Passport 2 · optional",
    "group": "party",
    "pending": true,
    "options": [
      [
        "",
        "Not specified"
      ],
      [
        "AR",
        "Argentina"
      ],
      [
        "AU",
        "Australia"
      ],
      [
        "BR",
        "Brazil"
      ],
      [
        "BN",
        "Brunei"
      ],
      [
        "CA",
        "Canada"
      ],
      [
        "CO",
        "Colombia"
      ],
      [
        "CR",
        "Costa Rica"
      ],
      [
        "EG",
        "Egypt"
      ],
      [
        "FR",
        "France"
      ],
      [
        "GR",
        "Greece"
      ],
      [
        "ID",
        "Indonesia"
      ],
      [
        "IT",
        "Italy"
      ],
      [
        "JP",
        "Japan"
      ],
      [
        "LA",
        "Laos"
      ],
      [
        "MY",
        "Malaysia"
      ],
      [
        "MX",
        "Mexico"
      ],
      [
        "MA",
        "Morocco"
      ],
      [
        "NZ",
        "New Zealand"
      ],
      [
        "PE",
        "Peru"
      ],
      [
        "PH",
        "Philippines"
      ],
      [
        "PT",
        "Portugal"
      ],
      [
        "ZA",
        "South Africa"
      ],
      [
        "KR",
        "South Korea"
      ],
      [
        "ES",
        "Spain"
      ],
      [
        "TH",
        "Thailand"
      ],
      [
        "TR",
        "Türkiye"
      ],
      [
        "GB",
        "United Kingdom"
      ],
      [
        "US",
        "United States"
      ],
      [
        "VN",
        "Vietnam"
      ],
      [
        "OTHER",
        "Other passport"
      ]
    ],
    "help": "Add another passport nationality used by your group. Entry eligibility is not checked yet.",
    "primary": true
  },
  {
    "id": "passport3",
    "label": "Passport 3 · optional",
    "group": "party",
    "pending": true,
    "options": [
      [
        "",
        "Not specified"
      ],
      [
        "AR",
        "Argentina"
      ],
      [
        "AU",
        "Australia"
      ],
      [
        "BR",
        "Brazil"
      ],
      [
        "BN",
        "Brunei"
      ],
      [
        "CA",
        "Canada"
      ],
      [
        "CO",
        "Colombia"
      ],
      [
        "CR",
        "Costa Rica"
      ],
      [
        "EG",
        "Egypt"
      ],
      [
        "FR",
        "France"
      ],
      [
        "GR",
        "Greece"
      ],
      [
        "ID",
        "Indonesia"
      ],
      [
        "IT",
        "Italy"
      ],
      [
        "JP",
        "Japan"
      ],
      [
        "LA",
        "Laos"
      ],
      [
        "MY",
        "Malaysia"
      ],
      [
        "MX",
        "Mexico"
      ],
      [
        "MA",
        "Morocco"
      ],
      [
        "NZ",
        "New Zealand"
      ],
      [
        "PE",
        "Peru"
      ],
      [
        "PH",
        "Philippines"
      ],
      [
        "PT",
        "Portugal"
      ],
      [
        "ZA",
        "South Africa"
      ],
      [
        "KR",
        "South Korea"
      ],
      [
        "ES",
        "Spain"
      ],
      [
        "TH",
        "Thailand"
      ],
      [
        "TR",
        "Türkiye"
      ],
      [
        "GB",
        "United Kingdom"
      ],
      [
        "US",
        "United States"
      ],
      [
        "VN",
        "Vietnam"
      ],
      [
        "OTHER",
        "Other passport"
      ]
    ],
    "help": "Add another passport nationality used by your group. Entry eligibility is not checked yet.",
    "primary": true
  },
  {
    "id": "entry",
    "label": "Entry process",
    "group": "needs",
    "pending": true,
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "visa-free",
        "Visa-free"
      ],
      [
        "evisa-arrival",
        "E-visa / on arrival"
      ],
      [
        "visa-required",
        "Visa required"
      ]
    ],
    "help": "Preference only. Existing Canadian entry summaries still need structured verification before matching.",
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "threePosition"
  },
  {
    "id": "advisory",
    "label": "Safety level",
    "group": "safety",
    "pending": true,
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "1",
        "1 · Very low risk"
      ],
      [
        "2",
        "2 · Low risk"
      ],
      [
        "3",
        "3 · Moderate risk"
      ],
      [
        "4",
        "4 · High risk"
      ],
      [
        "5",
        "5 · Very high risk"
      ]
    ],
    "help": "Preferred maximum travel-risk level. This five-step preference is unverified and is not an official government advisory scale.",
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "diet",
    "label": "Food requirements",
    "group": "health",
    "options": [
      "Vegetarian",
      "Vegan",
      "Halal options",
      "Kosher options",
      "Gluten-free options",
      "Food-allergy information"
    ],
    "pending": true,
    "primary": false,
    "multiple": true,
    "help": "Food and allergy suitability is unverified. These preferences do not confirm safe food availability.",
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "tags"
  },
  {
    "id": "language",
    "label": "English use",
    "group": "needs",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "official",
        "Official language"
      ],
      [
        "widely-spoken",
        "Widely spoken"
      ],
      [
        "limited",
        "Limited use"
      ]
    ],
    "pending": true,
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "threePosition",
    "help": "English-language preference. Official status and everyday use are separate facts; destination evidence is not verified yet."
  },
  {
    "id": "work",
    "label": "Internet speed",
    "group": "needs",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "slow",
        "Slow"
      ],
      [
        "moderate",
        "Moderate"
      ],
      [
        "fast",
        "Fast"
      ]
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "threePosition",
    "help": "Preferred destination internet speed. Hub-level evidence is not yet verified; this does not guarantee accommodation Wi-Fi."
  },
  {
    "id": "priceLevel",
    "label": "Destination price level",
    "group": "budget",
    "options": [
      [
        "",
        "Any price level"
      ],
      [
        "lower",
        "Lower-cost destinations"
      ],
      [
        "middle",
        "Mid-range destinations"
      ],
      [
        "higher",
        "Higher-cost destinations"
      ]
    ],
    "primary": true,
    "pending": false,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Relative daily-cost band within the sample catalogue, using country-level allowances and excluding flights. Independent of your total budget.",
    "presentation": "segments",
    "shortLabels": {
      "": "Any",
      "lower": "$ Lower",
      "middle": "$$ Mid",
      "higher": "$$$ Higher"
    }
  },
  {
    "id": "events",
    "label": "Events & festivals",
    "group": "experience",
    "options": [
      "Art festivals",
      "Bastille Day",
      "Carnival",
      "Cherry blossom",
      "Christmas markets",
      "Día de los Muertos",
      "Diwali",
      "Dragon Boat Festival",
      "Eid al-Adha",
      "Eid al-Fitr",
      "Film festivals",
      "Food festivals",
      "Gion Matsuri",
      "Holi",
      "Inti Raymi",
      "Lantern festivals",
      "Local cultural festivals",
      "Loi Krathong",
      "Lunar New Year",
      "Mid-Autumn Festival",
      "Music festivals",
      "New Year celebrations",
      "Notting Hill Carnival",
      "Oktoberfest",
      "Pride celebrations",
      "Rio Carnival",
      "Running of the Bulls",
      "Semana Santa",
      "Songkran",
      "Sports events",
      "St Patrick’s Day",
      "Stargazing festivals",
      "Tanabata",
      "Thaipusam",
      "Tulip festivals",
      "Vesak",
      "Winter light festivals"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Select events or festival types. Exact dates, places and access are not yet verified.",
    "multiple": true
  },
  {
    "id": "jetLag",
    "label": "Time-zone shift tolerance",
    "group": "travel",
    "options": [
      [
        "",
        "Any"
      ],
      [
        "under-4",
        "Under 4 hours"
      ],
      [
        "under-8",
        "Under 8 hours"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Difference between departure and destination local time on your travel dates. This is separate from flight duration; time-zone matching is not available yet."
  },
  {
    "id": "dress",
    "label": "Women’s dress requirements",
    "group": "safety",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "none",
        "No specific requirements"
      ],
      [
        "modest",
        "Modest clothing acceptable"
      ],
      [
        "head-covering",
        "Head covering acceptable"
      ],
      [
        "full-covering",
        "Full-body covering acceptable"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Preference about mandatory clothing for women. Legal rules, local customs and religious-site rules must be reviewed separately. Destination evidence is not yet verified."
  },
  {
    "id": "vaccineYellowFever",
    "label": "Yellow fever requirement",
    "group": "health",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Yes"
      ],
      [
        "no",
        "No"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Accept this vaccination requirement? Yes means acceptable; No means avoid a requirement. This is a preference, not vaccination history. Route- and purpose-specific requirements are not yet verified.",
    "presentation": "yesNo"
  },
  {
    "id": "vaccinePolio",
    "label": "Polio requirement",
    "group": "health",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Yes"
      ],
      [
        "no",
        "No"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Accept this vaccination requirement? Yes means acceptable; No means avoid a requirement. This is a preference, not vaccination history. Route- and purpose-specific requirements are not yet verified.",
    "presentation": "yesNo"
  },
  {
    "id": "vaccineMeningococcal",
    "label": "Meningococcal requirement",
    "group": "health",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Yes"
      ],
      [
        "no",
        "No"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Accept this vaccination requirement? Yes means acceptable; No means avoid a requirement. This is a preference, not vaccination history. Route- and purpose-specific requirements are not yet verified.",
    "presentation": "yesNo"
  },
  {
    "id": "malaria",
    "label": "Malaria risk",
    "group": "health",
    "options": [
      "Any",
      "Prefer areas without malaria transmission",
      "Show regional risk information"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Requires reviewed regional and seasonal health data. Country-level assumptions are not sufficient."
  },
  {
    "id": "healthcare",
    "label": "Healthcare access",
    "group": "health",
    "options": [
      "Any",
      "Reliable emergency care nearby",
      "Advanced hospital access nearby"
    ],
    "primary": true,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Healthcare access must be assessed for the hub and journey time, not assumed from a national ranking."
  },
  {
    "id": "water",
    "label": "Drinking water",
    "group": "health",
    "options": [
      "Any",
      "Tap water drinkable preferred",
      "Treated / bottled water acceptable"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Local, current evidence is required. No drinking-water safety claim is made by the current designer."
  },
  {
    "id": "walkability",
    "label": "Public-space walkability",
    "group": "experience",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "1",
        "1 · Car-dominated"
      ],
      [
        "2",
        "2 · Mixed"
      ],
      [
        "3",
        "3 · Walkable"
      ]
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "threePosition",
    "help": "City-level preference for pedestrian access and public-space design. Verified local evidence is not yet available."
  }
];
window.TRAVEL_BUILDER_COUNTRY_CODES = {
"laos":"LAO",
"philippines":"PHL",
"malaysia":"MYS",
"brunei":"BRN",

  "france": "FRA",
  "united-kingdom": "GBR",
  "turkey": "TUR",
  "peru": "PER",
  "brazil": "BRA",
  "south-africa": "ZAF",
  "south-korea": "KOR",
  "australia": "AUS",
  "spain": "ESP",
  "greece": "GRC",
  "costa-rica": "CRI",
  "indonesia": "IDN",
  "united-states": "USA",
  "vietnam": "VNM",
  "colombia": "COL",
  "morocco": "MAR",
  "egypt": "EGY",
  "new-zealand": "NZL",
  "argentina": "ARG",
  "italy": "ITA",
  "mexico": "MEX",
  "japan": "JPN",
  "portugal": "PRT",
  "thailand": "THA"
};
