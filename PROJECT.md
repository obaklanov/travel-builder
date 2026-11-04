# Travel Builder — current project map

> Current direction: build Travel Builder from this copy. Original Week 6 learning notes are historical context.
> Run ONLY supabase-travel-builder-setup.sql in the Travel Atlas project. Older SQL files are reference material.
> Database setup, authentication redirects, GitHub push, Pages deployment, and live verification are pending.
> Application tables and browser storage are separate; Auth users and settings are shared with Travel Atlas.

Updated: 2 November 2026. Start a new development or learning chat with this file and WEEK-6-HANDOFF.md. Historical notes may describe superseded versions.

## Active project

- Local working copy: `C:/Users/OBakl/OneDrive/Desktop/project 2026/sites/travel-builder`
- Repository: https://github.com/obaklanov/travel-builder
- Public site: https://obaklanov.github.io/travel-builder/
- Branch: `main`. Publishing workflow: `.github/workflows/pages.yml` uploads `dist/`.
- Original Travel Atlas is a separate project. Do not edit it when working on Travel Easy.

## Architecture

The public frontend uses plain HTML, CSS and JavaScript. There is no frontend framework or mandatory compilation step. In this project, `dist/` contains authored code as well as generated data; it is not a disposable build folder.

Supabase project: `hmecyiinaotnjaxgzkow` (dashboard name: Travel Atlas; shared authentication). Browser configuration is `dist/profile-config.js`; its publishable key is public by design. Secrets and database passwords do not belong in published files. Tables `travel_builder_profiles` and `travel_builder_trips` use authenticated account access and row-level security. Session key: `travel-builder-auth`.

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


## Travel Builder filters

32 filters are defined in dist/travel-builder-filter-options.js, grouped as Where & When, Budget & Group, Experience & Vibe, and Travel & Entry. Each side has three inner controls and five outer controls. Matching is in travel-builder-engine.js and UI/persistence in travel-builder-filters.js. Home no longer loads trip-start.js; it remains reference code.

Active matching uses the 24 existing destinations, country/continent, region/month ratings, dates, duration, group budget, allowance overrides, five departure hubs, route time/price estimates and available arrival gateways. Month flexibility widens the month window; budget flexibility widens the group ceiling. Seasonal filtering checks every month touched by the suggested trip. Costs remain illustrative country-level allowances, including when a region is selected.

Fields marked pending are selectable preferences only: vibe, interests, pace, climate, entry process, nationality, stops, advisories and mobility. Selected pending preferences are explicitly listed as not checked before creation and in the preview. No visa or advisory eligibility is inferred from prose. Preferences persist locally; only supported trip fields and group_size are saved to Supabase. Destination links carry region, dates, group and allowance values into the planner. No database migration is needed for this release.

Next session: build a reviewed country → region → hub database, source/review metadata, explicit unknowns, structured entry/advisory records and reliable route coverage. Unknown regional airport metadata is not invented: regions lacking a priced arrival gateway cannot match yet.

## Shared appearance

travel-builder-clean-theme.css loads last on all six HTML pages. It sets white page and panel backgrounds and replaces the old brass dropdown icon with images/select-chevron.svg. Home filter colours are sky blue (where/when), light gold (budget/group), sage (experience/vibe), and lavender (travel/entry). Map geography, photos, and scratch artwork retain their visual content.

## Designing and Planning

Designing finds suitable trips from broad traveller preferences; Planning adjusts individual items. The Designing catalogue now has 38 controls in six uneven groups: party (4), where/when (10), experience (8), budget/comfort (3), travel convenience (5), practical needs (8). There is no fixed eight-controls-per-group requirement. Main choices show first; More options exposes the complete list. Individual lodging/food/local transport/extras/flight allowances and arrival airport have been removed from Designing. The country planner retains its budget editor.

New preferences include travel party, child age bands, occasion, must-do activities, crowds, comfort, access, food requirements, language/navigation, work/connectivity, transfer tolerance and booking flexibility. They are unverified preferences pending destination data. Earliest departure and latest return actively constrain the whole suggested trip; a month, if set, intersects the allowed date window. Traveller count still supports 1–4 total people; children are included, with no assumed child discounts. Preferences migrate from v1 to travel-builder-design-preferences-v2; removed allowance values are not reused.

Architecture work remains: agree place structure; dataset boundaries; raw/draft/published lifecycle; website contract; history/recovery. Do not populate a large destination database before agreeing those five steps.

## Groups up to ten

Designing, Planning and saved-trip validation support 1–10 total travellers. Existing equal per-person allowances and one shared group accommodation allowance remain estimates; larger groups are prompted to review room capacity in Planning. Existing Supabase project must run supabase-travel-builder-group-size-10.sql to widen its trip constraint; frontend publication alone cannot update the database. The initial setup file also reflects the 1–10 limit.

## Destination exclusions

Where & When now includes Destinations to exclude, with search and multi-select for continents, countries, and existing planning regions. Exclusions always override inclusion and survive destination changes and reloads. City choices are intentionally unavailable until travel hubs exist. Values are typed: continent:Asia, country:south-korea, region:<country>:<region-name-slug>. Region name slugs are provisional catalogue IDs; database migration must preserve aliases when replacing or renaming them. Supabase does not yet store these preference records, which remain in browser storage.

User confirmed on 3 November 2026 that supabase-travel-builder-group-size-10.sql ran successfully. The database now supports saving groups up to ten (user-confirmed; not independently queried).

Travel month is limited dynamically to the current month through the same month three years ahead, inclusive. Browser validation and the matching engine enforce this rolling window, including month flexibility. Out-of-range saved month selections are cleared on load.

Trip length, days is a dropdown using stepped values 1–10, 12, 14, 16, 18, 20, 21, 25–50 in steps of five, then 60–90 in steps of ten. Values 14 and 21 are labelled 2 weeks and 3 weeks, including in the Planning suggestions; stored values and calculations remain in days. Previously saved valid custom day counts are retained on load.

Earliest departure uses a rolling day-specific limit from today through three years ahead (leap-day clamped). Latest return ends 90 days beyond that maximum departure date; its minimum follows the selected earliest departure or today. The browser picker and matching engine both enforce these bounds.

Experience & atmosphere includes Metro area size: <100k, 100k–500k, 500k–1m, 1m–3m, 3m–5m, and >=5m. Ranges are lower-inclusive and upper-exclusive. This is a locally retained preference, not an active match until hub-level metropolitan population is sourced with boundary definition, reference year and review evidence. Do not substitute country population or city-proper counts. Catalogue now contains 40 controls.

## Prioritized Designing (3 November 2026)

Eight groups surround Create my trip: party, where/when, experience, budget/value, travel, practical, safety/inclusivity, and health/access. Primary choices are visible and secondary controls collapse under More options. Booking flexibility is removed. Travel party automatically locks Solo to one and Couple to two; Friends, Family and Multigenerational have a minimum of two, maximum ten. Duration is a broad range but generated/saved trips still have one concrete day count. Old exact day preferences migrate to containing ranges.

Per-field Must have / Nice to have switches apply where meaningful. Supported soft preferences (budget, price band, flight time, season and new-country preference) rank candidates. Exclusions and date windows remain hard constraints. Any selected unsupported preference marked Must have blocks creation with an explicit unverified-requirement message; it is never silently relaxed. Health and safety suggestions are never certified from missing data.

Prefer somewhere new reads only visited_countries from the signed-in user's travel_builder_profiles row on generation, when enabled. No sign-in/history: soft mode gives provisional suggestions with a warning; Must have blocks. ISO3 mapping currently covers the 24 planning countries. No account history is written or shared; filters and importance settings remain local.

Destination price bands are terciles of unique country daily-cost sums in the sample catalogue (excluding flights), not verified city prices or purchasing-power claims. Events/festivals, jet lag, safety/cultural/legal requirements, vaccines, malaria, healthcare and water are unverified preferences awaiting reviewed country/region/hub data. Never infer inclusivity, medical suitability, legal status or safety from country names or vague scores. Database work must separate legal rules, social conditions and regional/seasonal health observations, with source and review dates.

## Filter reset actions

Every category has Reset category, and Reset all filters sits above the grid outside the cards. Resets restore catalogue defaults and importance modes, clear affected multi-selects/exclusions, update dependent region/date/party controls, close affected More options, invalidate the preview and any pending profile-based generation through the normal revision path, and write current defaults to the local preferences key. Category resets preserve other categories. They do not sign out, clear profile history, delete saved trips or call Supabase. Reset all writes defaults rather than deleting the storage key so legacy preferences cannot reappear on reload.

## Balanced filter overview

Each of the eight category cards shows three controls across two rows (one full-width control and one pair). Other controls remain under More options; all selections, importance switches and category resets retain their original behavior. The central Create action completes the nine-position desktop grid. Cards grow naturally when expanded rather than clipping their contents.

Reset category and Reset all filters now set every affected importance switch to Nice to have, including budget and journey time. The normal change path persists these choices after reload; category resets preserve importance settings in other categories.

## Four Southeast Asian additions (4 November 2026)

The planner now covers 28 countries: Laos, Philippines, Malaysia and Brunei join the previous 24. They appear in Home destination/exclusion/region filters and Destinations, with country facts/maps, regional arrival gateways, editorial seasonal ratings, illustrative CAD estimates, Canadian entry summaries and official advice links. Population, area and visited-country history reuse existing ISO3 catalogue entries; this does not add countries to the profile catalogue. Sources and prototype assumptions: data/destination-expansion-28.json; licensed cover attribution: data/destination-expansion-28-photos.json and About. New treasures and mood recommendations are not invented.

Existing Supabase installations must run supabase-travel-builder-destinations-28.sql to widen only the Builder trip country constraint. Frontend and initial setup support the four keys; this file does not alter Auth, RLS, grants or saved trips. Deployment cannot apply this SQL automatically.

Philippines cover updated on 4 November 2026 to the beach photograph supplied by the site owner. The original Commons photo credit no longer applies to the displayed cover. User confirmed running supabase-travel-builder-destinations-28.sql.

## New-country treasures (4 November 2026)

Laos, Philippines, Malaysia and Brunei now each have three treasure badges, lazy-loaded licensed photos, descriptions, approximate landmark coordinates and Google Maps links. Sources, image licenses and decorative SVG artwork are retained in data/destination-treasures-28.json. New sections describe places to discover; they do not claim profile reward collection is implemented. Malaysia and Brunei front covers were replaced with photographs supplied by the site owner, matching the earlier Philippines cover replacement. Licensed originals are retained as separate treasure photos with their own attribution.

Australia front cover and Uluru treasure photo replaced on 4 November 2026 with images supplied by the site owner. Supplied treasure images show a source caption without attributing the previous photographer or license.

South Africa front cover replaced on 4 November 2026 with the Cape Town/Table Mountain image supplied by the site owner.

Brazil front cover replaced on 4 November 2026 with the image supplied by the site owner.

South Korea front cover replaced on 4 November 2026 with the image supplied by the site owner.
