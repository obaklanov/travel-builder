# Travel Easy — current project map

Updated: 2 November 2026. Start a new development or learning chat with this file and WEEK-6-HANDOFF.md. Historical notes may describe superseded versions.

## Active project

- Local working copy: `C:/Users/OBakl/OneDrive/Desktop/project 2026/sites/travel-easy`
- Repository: https://github.com/obaklanov/travel-easy
- Public site: https://obaklanov.github.io/travel-easy/
- Branch: `main`. Publishing workflow: `.github/workflows/pages.yml` uploads `dist/`.
- Original Travel Atlas is a separate project. Do not edit it when working on Travel Easy.

## Architecture

The public frontend uses plain HTML, CSS and JavaScript. There is no frontend framework or mandatory compilation step. In this project, `dist/` contains authored code as well as generated data; it is not a disposable build folder.

Supabase project: `ytevjyzzqnapbawmenzz`. Browser configuration is `dist/profile-config.js`; its publishable key is public by design. Secrets and database passwords do not belong in published files. Tables `traveller_profiles` and `travel_easy_trips` use authenticated account access and row-level security. Session key: `travel-easy-auth`.

## Product state

- 24 detailed planning destinations: original 16 plus France, UK, Türkiye, Peru, Brazil, South Africa, South Korea and Australia.
- Separate profile-map catalogue: 198 countries and self-governing states, guided by Canadian recognition/diplomatic relations; territories can map to parent countries.
- Home: surprise trips and duration, CAD budget and destination filters.
- Mid-level country planner: five steps — visa, region/month, flights, money and Canadian government advice. ADD THIS TRIP saves to the profile.
- Duration presets cover 1–90 days; nights = days minus one. Budget supports 1–4 people, shared accommodation and per-person costs. Flights are round-trip estimates, not live fares.
- Accounts: sign-up/login, profile editing, saved-trip removal and travelled-country recording.
- Scratch map: linked country search, zoom, country details, metallic scratching, nearby countries/water, flag, sounds and a final result that stays until dismissed. Main population areas guide the visual focus; territory-inclusive totals are separate from framing.
- 72 treasure badges/photos with illustrative collection rewards. Profile treasure collecting is not implemented.
- Getting into the mood is temporarily visible on all 24 country pages. Songs link to official YouTube and Spotify; books/films link to legal resources.
- Advanced saved-trip editing, departure checklist, health and insurance remain future planning features. Existing implementations may be retained for reuse.

## Shared sources and exceptions

`data/worldometer-countries.json`, `country-supplements.json`, `country-classification.json` and `territory-parents.json` feed `scripts/build-country-data.cjs`. This generates `dist/country-catalog.json`, `profile-country-info.json` and `country-facts.js`. Rankings use the 198-entry policy; world shares include underlying territories once. Kosovo has supplemental data and a separate outline; Serbia area is adjusted to avoid duplication.

Country planning data is still distributed across HTML and JavaScript. `data/destination-expansion-24.json` records the latest eight additions; editing it alone does not rebuild every destination page. Treasure photo metadata is duplicated between source JSON and `dist/treasures.js`. These are Week 6 consolidation candidates, not existing automatic pipelines.

Government entry summaries are reviewed snapshots, with source hashes and checked dates. `.github/workflows/entry-requirements.yml` checks sources weekly. Changed text needs review; this does not automatically invent a new approved summary.

## Recent decisions to preserve

- Bright, attractive real photos; cover brightness reduced by 8% except Morocco. Treasure photos load on badge selection.
- Photo credits for covers are now on About, not beneath the destination grid. Treasure photo credits remain with each photo.
- France reward: a crescent croissant. UK cover: Big Ben/Westminster. South Korea reward: bungeoppang pastry, replacing the tiger.
- Country dialogs and Edit profile close via the corner X; the scratch celebration has its own dismissal behavior.
- User confirmed the 24-destination and group-budget Supabase updates. No outstanding setup step for the expansion.

## Week 6 direction

Understand the existing website, trace its data and actions, then assess cleanup in small reversible changes. Do not begin a rewrite or delete dormant features just because they are not visible. See WEEK-6-HANDOFF.md for the learning plan and evidence-based cleanup procedure.
