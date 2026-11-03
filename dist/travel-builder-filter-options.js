'use strict';
// Designing-stage filter catalogue. pending fields capture preferences without claiming a verified match.
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
    "pending": true,
    "primary": true
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
    "primary": false
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
    "id": "exclude",
    "label": "Destinations to exclude",
    "group": "where",
    "primary": true,
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
    "label": "Trip length (days)",
    "group": "where",
    "primary": true,
    "options": [
      [
        "",
        "Any length"
      ],
      [
        "1",
        "1 day"
      ],
      [
        "2",
        "2 days"
      ],
      [
        "3",
        "3 days"
      ],
      [
        "4",
        "4 days"
      ],
      [
        "5",
        "5 days"
      ],
      [
        "6",
        "6 days"
      ],
      [
        "7",
        "7 days"
      ],
      [
        "8",
        "8 days"
      ],
      [
        "9",
        "9 days"
      ],
      [
        "10",
        "10 days"
      ],
      [
        "12",
        "12 days"
      ],
      [
        "14",
        "2 weeks"
      ],
      [
        "16",
        "16 days"
      ],
      [
        "18",
        "18 days"
      ],
      [
        "20",
        "20 days"
      ],
      [
        "21",
        "3 weeks"
      ],
      [
        "25",
        "25 days"
      ],
      [
        "30",
        "30 days"
      ],
      [
        "35",
        "35 days"
      ],
      [
        "40",
        "40 days"
      ],
      [
        "45",
        "45 days"
      ],
      [
        "50",
        "50 days"
      ],
      [
        "60",
        "60 days"
      ],
      [
        "70",
        "70 days"
      ],
      [
        "80",
        "80 days"
      ],
      [
        "90",
        "90 days"
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
    "primary": false
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
    "primary": false
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
    "primary": false
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
    "primary": true
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
    "primary": true
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
    "primary": false
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
    "primary": false
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
    "primary": false
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
    "primary": false
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
    "primary": false
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
    "primary": false
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
    "primary": true
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
    "primary": true
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
    "primary": true
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
    "primary": true
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
    "primary": false
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
    "primary": false
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
    "primary": false
  },
  {
    "id": "access",
    "label": "Access needs",
    "group": "needs",
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
    "help": "Optional requirements. Accessibility is not verified: a suggested trip must not be treated as confirmed suitable."
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
    "primary": false
  },
  {
    "id": "advisory",
    "label": "Government advisory",
    "group": "needs",
    "pending": true,
    "options": [
      "Any",
      "Normal precautions only",
      "Include increased caution"
    ],
    "help": "Preference only. Regional government advisory levels are not yet available for matching.",
    "primary": false
  },
  {
    "id": "diet",
    "label": "Food requirements",
    "group": "needs",
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
    "help": "Food and allergy suitability is unverified. These preferences do not confirm safe food availability."
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
    "primary": false
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
    "multiple": true
  },
  {
    "id": "bookingFlex",
    "label": "Booking flexibility",
    "group": "needs",
    "options": [
      "Any",
      "Refundable preferred",
      "Changes allowed preferred"
    ],
    "pending": true,
    "primary": false,
    "help": "Preference for future bookable options. Cancellation terms are not checked by this destination designer."
  }
];
