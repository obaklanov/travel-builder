# Planning depth — current state

Updated: 2 November 2026. See PROJECT.md for the current application map.

1. Surprise me: generate a trip on Home, optionally using duration, budget and destination filters, and save it.
2. Shape the essentials: use five country-page steps — visa, region/month, flights, money and Canadian government advice — then ADD THIS TRIP.
3. Advanced planning (future): edit a saved trip in depth from the profile.

## Visible now

- Five-step planner for 24 destinations.
- Treasure badges, on-click photos and illustrative collection rewards.
- Getting into the mood: song, book and film suggestions, temporarily restored on all 24 country pages at the user's request.
- Account profiles, saved-trip removal and travelled-country scratch maps.

## Retained for future work

- Departure checklist: country-popup entry point removed; existing `dist/planning.html` route and checklist functions in `dist/app.js` remain for assessment and possible advanced-planner reuse.
- Health/vaccines and travel insurance: renderers/artwork retained, absent from the five mid-level steps.
- Full editing of saved trips, real treasure collection on profiles, community voting and sharing features are future work.

## Week 6

Focus on understanding this implementation and identifying safe cleanup opportunities. Temporary or dormant code is not automatically obsolete; inspect references and the planned feature before removing it.
