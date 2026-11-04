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
      "Exploring",
      "Adventure",
      "Mixed"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "segments",
    "shortLabels": {
      "": "Any",
      "Relaxing": "Relax",
      "Exploring": "Explore",
      "Adventure": "Adventure",
      "Mixed": "Mixed"
    }
  },
  {
    "id": "pace",
    "label": "Travel pace",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "One base",
      "A few stops",
      "Frequent movement"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "segments",
    "shortLabels": {
      "": "Any",
      "One base": "One base",
      "A few stops": "Few stops",
      "Frequent movement": "Frequent"
    }
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
    "id": "crowds",
    "label": "Crowd preference",
    "group": "experience",
    "options": [
      "Any",
      "Quiet / less crowded",
      "Balanced",
      "Lively / popular"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "activity",
    "label": "Activity level",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "Easy-going",
      "Moderate",
      "Active",
      "Challenging"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
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
    "primary": true
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
    "label": "Getting around",
    "group": "travel",
    "pending": true,
    "options": [
      "Any",
      "Public transport",
      "Rental car",
      "Either"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
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
    "group": "needs",
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
    "primary": true
  },
  {
    "id": "passport2",
    "label": "Passport 2 · optional",
    "group": "needs",
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
    "group": "needs",
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
    "label": "Government advisory",
    "group": "safety",
    "pending": true,
    "options": [
      "Any",
      "Normal precautions only",
      "Include increased caution"
    ],
    "help": "Preference only. Regional government advisory levels are not yet available for matching.",
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer",
    "presentation": "radios"
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
      "Cherry blossom",
      "Diwali",
      "Carnival",
      "Lunar New Year",
      "Christmas markets",
      "Music festivals",
      "Food festivals",
      "Sports events",
      "Local cultural festivals"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Dates and locations vary by year. Event timing and availability are not verified yet.",
    "multiple": true,
    "presentation": "tags"
  },
  {
    "id": "jetLag",
    "label": "Time-zone shift tolerance",
    "group": "travel",
    "options": [
      [
        "",
        "Any time-zone shift"
      ],
      [
        "2",
        "Up to 2 hours"
      ],
      [
        "4",
        "Up to 4 hours"
      ],
      [
        "6",
        "Up to 6 hours"
      ],
      [
        "9",
        "Up to 9 hours"
      ],
      [
        "12",
        "Up to 12 hours"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Difference between departure and destination local time on your travel dates. This is separate from flight duration; time-zone matching is not available yet."
  },
  {
    "id": "soloSafety",
    "label": "Solo-travel safety",
    "group": "safety",
    "options": [
      "Any",
      "Prioritize solo-travel safety information",
      "Prefer well-supported solo travel"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Preference only. Reviewed destination evidence is not available yet."
  },
  {
    "id": "inclusivity",
    "label": "LGBTQ+ inclusivity",
    "group": "safety",
    "options": [
      "Any",
      "Prioritize legal protections",
      "Prioritize welcoming social environment",
      "Both protections and social environment"
    ],
    "primary": true,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Legal protections and social acceptance are separate, location-specific questions. Neither is verified by current suggestions."
  },
  {
    "id": "dress",
    "label": "Dress & cultural norms",
    "group": "safety",
    "options": [
      "Any",
      "Prefer relaxed dress norms",
      "Comfortable with modest dress expectations",
      "Show local customs before booking"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Preference only. Reviewed destination evidence is not available yet."
  },
  {
    "id": "alcohol",
    "label": "Alcohol legal",
    "group": "safety",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Legal availability preferred"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "On requests legal availability; off means no preference. Legal status is unverified and can vary by substance and locality.",
    "presentation": "switch"
  },
  {
    "id": "drugLaws",
    "label": "Recreational drugs legal",
    "group": "safety",
    "options": [
      [
        "",
        "No preference"
      ],
      [
        "yes",
        "Legal availability preferred"
      ]
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "On requests legal availability; off means no preference. Legal status is unverified and can vary by substance and locality.",
    "presentation": "switch"
  },
  {
    "id": "vaccines",
    "label": "Vaccination requirements",
    "group": "health",
    "options": [
      "Any",
      "Show entry vaccine requirements",
      "Prefer fewer entry requirements"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Entry requirements and health recommendations are different. Both need current, sourced review; this tool provides no medical clearance."
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
