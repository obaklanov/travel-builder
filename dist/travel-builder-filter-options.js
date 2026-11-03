'use strict';
// pending fields have no verified destination evidence; must-have pending fields block generation.
window.TRAVEL_BUILDER_FILTERS = [
  {
    "id": "party",
    "label": "Travel party",
    "group": "party",
    "options": [
      "Any",
      "Solo",
      "Couple",
      "Friends",
      "Family",
      "Multigenerational"
    ],
    "pending": false,
    "primary": true,
    "help": "Solo fixes the count at one, Couple at two. Friends, Family and Multigenerational start at two."
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
      ],
      [
        "3",
        "3 people"
      ],
      [
        "4",
        "4 people"
      ],
      [
        "5",
        "5 people"
      ],
      [
        "6",
        "6 people"
      ],
      [
        "7",
        "7 people"
      ],
      [
        "8",
        "8 people"
      ],
      [
        "9",
        "9 people"
      ],
      [
        "10",
        "10 people"
      ]
    ],
    "primary": true,
    "help": "Includes adults and children. Current estimates support 1–10 travellers and use equal per-person allowances; child discounts are not verified."
  },
  {
    "id": "childAges",
    "label": "Children’s ages",
    "group": "party",
    "options": [
      "Under 2",
      "2–5",
      "6–11",
      "12–17"
    ],
    "pending": true,
    "primary": false,
    "multiple": true,
    "help": "Optional age bands. Child suitability and child-specific prices are not verified yet."
  },
  {
    "id": "occasion",
    "label": "Purpose / occasion",
    "group": "party",
    "options": [
      "Any",
      "General holiday",
      "Romantic getaway",
      "Honeymoon",
      "Family time",
      "Visit friends / family",
      "Festival or event",
      "Sports event",
      "Celebration"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
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
    "help": "Choose a country, continent, or let us choose.",
    "primary": true
  },
  {
    "id": "newPlaces",
    "label": "Prefer somewhere new",
    "group": "where",
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer",
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
    "help": "Uses countries recorded as visited in your signed-in Travel Builder profile. City and regional history will follow later."
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
        "",
        "Any length"
      ],
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
        "About 2 weeks · 13–15 days"
      ],
      [
        "16-19",
        "16–19 days"
      ],
      [
        "20-23",
        "About 3 weeks · 20–23 days"
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
    ]
  },
  {
    "id": "earliest",
    "label": "Earliest departure",
    "group": "where",
    "type": "date",
    "help": "Trip must start on or after this date. Combined with your month and duration, if specified."
  },
  {
    "id": "latest",
    "label": "Latest return",
    "group": "where",
    "type": "date",
    "help": "The whole trip must finish on or before this date."
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
    "primary": false
  },
  {
    "id": "dateFlex",
    "label": "Month flexibility",
    "group": "where",
    "options": [
      [
        "0",
        "Selected month"
      ],
      [
        "1",
        "±1 month"
      ],
      [
        "2",
        "±2 months"
      ]
    ],
    "help": "We may suggest a future date in any month inside this window.",
    "primary": false
  },
  {
    "id": "season",
    "label": "Season suitability",
    "group": "where",
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
    "group": "where",
    "pending": true,
    "options": [
      "Any",
      "Cool · under 15°C",
      "Mild · 15–24°C",
      "Warm · 25–30°C",
      "Hot · over 30°C"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "rain",
    "label": "Rain tolerance",
    "group": "where",
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
    "label": "Must-do experiences",
    "group": "experience",
    "pending": true,
    "multiple": true,
    "options": [
      "Food experiences",
      "History and heritage",
      "Hiking",
      "Beaches and swimming",
      "Wildlife",
      "Diving / snorkelling",
      "Skiing / snow sports",
      "Art and museums",
      "Architecture",
      "Wellness",
      "Festivals / events",
      "Theme parks",
      "Shopping",
      "Nightlife"
    ],
    "help": "Select several interests. These preferences are not matched yet.",
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer"
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
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer"
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
    "defaultPriority": "prefer"
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
    "id": "urban",
    "label": "City or countryside",
    "group": "experience",
    "pending": true,
    "options": [
      "Any",
      "Mostly city",
      "Balanced",
      "Mostly countryside"
    ],
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "metroSize",
    "label": "Metro area size",
    "group": "experience",
    "pending": true,
    "primary": false,
    "help": "Population of the wider metropolitan area, not the country or city proper. Ranges include the lower bound and exclude the upper bound. Matching will use future travel-hub data.",
    "options": [
      [
        "",
        "Any size"
      ],
      [
        "under-100k",
        "Under 100,000"
      ],
      [
        "100k-500k",
        "100,000–500,000"
      ],
      [
        "500k-1m",
        "500,000–1 million"
      ],
      [
        "1m-3m",
        "1–3 million"
      ],
      [
        "3m-5m",
        "3–5 million"
      ],
      [
        "5m-plus",
        "5 million or more"
      ]
    ],
    "ranges": {
      "under-100k": {
        "min": 0,
        "max": 100000
      },
      "100k-500k": {
        "min": 100000,
        "max": 500000
      },
      "500k-1m": {
        "min": 500000,
        "max": 1000000
      },
      "1m-3m": {
        "min": 1000000,
        "max": 3000000
      },
      "3m-5m": {
        "min": 3000000,
        "max": 5000000
      },
      "5m-plus": {
        "min": 5000000,
        "max": null
      }
    },
    "priority": true,
    "defaultPriority": "prefer"
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
    "priority": true,
    "defaultPriority": "must"
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
    "defaultPriority": "prefer"
  },
  {
    "id": "budgetFlex",
    "label": "Budget flexibility",
    "group": "budget",
    "options": [
      [
        "0",
        "Strict ceiling"
      ],
      [
        "0.1",
        "Up to 10% extra"
      ],
      [
        "0.2",
        "Up to 20% extra"
      ]
    ],
    "primary": false
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
    "defaultPriority": "must"
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
      "Any",
      "Up to 30 minutes",
      "Up to 1 hour",
      "Up to 2 hours"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
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
    "defaultPriority": "prefer"
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
        "CA",
        "Canadian"
      ],
      [
        "US",
        "United States"
      ],
      [
        "GB",
        "United Kingdom"
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
    "id": "entry",
    "label": "Entry process",
    "group": "needs",
    "pending": true,
    "options": [
      "Any",
      "Visa-free preferred",
      "Online application acceptable",
      "Any visa process"
    ],
    "help": "Preference only. Existing Canadian entry summaries still need structured verification before matching.",
    "primary": true,
    "priority": true,
    "defaultPriority": "prefer"
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
    "defaultPriority": "prefer"
  },
  {
    "id": "language",
    "label": "Language / navigation",
    "group": "needs",
    "options": [
      "Any",
      "English widely useful",
      "Comfortable with language differences",
      "Easy independent navigation preferred"
    ],
    "pending": true,
    "primary": false,
    "priority": true,
    "defaultPriority": "prefer"
  },
  {
    "id": "work",
    "label": "Work & connectivity",
    "group": "needs",
    "options": [
      "Reliable internet",
      "Dedicated workspace",
      "Work-friendly cafés",
      "Time-zone compatibility"
    ],
    "pending": true,
    "primary": false,
    "multiple": true,
    "priority": true,
    "defaultPriority": "prefer"
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
    "help": "Relative daily-cost band within the sample catalogue, using country-level allowances and excluding flights. Independent of your total budget."
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
    "multiple": true
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
    "label": "Alcohol norms",
    "group": "safety",
    "options": [
      "Any",
      "Prefer legal alcohol availability",
      "Prefer alcohol-free settings",
      "Show local restrictions"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Preference only. Reviewed destination evidence is not available yet."
  },
  {
    "id": "drugLaws",
    "label": "Drug & medication laws",
    "group": "safety",
    "options": [
      "Any",
      "Flag strict drug-possession penalties",
      "Flag prescription-medication restrictions",
      "Show local rules before booking"
    ],
    "primary": false,
    "pending": true,
    "priority": true,
    "defaultPriority": "prefer",
    "help": "Legal-information preference only. Current suggestions do not verify local laws or medication import rules."
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
