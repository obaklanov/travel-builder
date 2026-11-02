# Week 6 — understand, inspect and simplify Travel Easy

Prepared: 2 November 2026. Read PROJECT.md first. This is a learning week with limited time around work; aim for 20–40 minute sessions rather than a large feature build.

## Outcome

Be able to explain how a visitor action becomes a visible result, find the code responsible, make a small change confidently, and identify which code is active, retained for the future or genuinely obsolete. Promotion can follow once there is a clear first audience and a way to measure visits.

## How the pieces connect

| Area | Start reading | What to understand |
| --- | --- | --- |
| Pages | `dist/index.html`, `destinations.html`, `profile.html`, `about.html` | Structure, script order, shared navigation and page-specific behavior. |
| Trip generation | `dist/trip-start.js`, `user-location.js` | Departure detection, presets, filtering, random selection and trip preview state. |
| Country dialog | `dist/app.js`, `map-transition.js` | Shared country-page rendering, five step buttons, opening/closing and the map-to-page transition. |
| Timing and budgets | `dist/travel-details.js` | Region/airport mapping, dates, nights, sample flights, group cost formula and custom dropdowns. |
| Accounts | `dist/profile-config.js`, `landing-account.js`, `profile.js`, `profile-editor.js` | Sign-in state, public versus secret keys, requests, name/password changes and error handling. |
| Saved trips | `dist/saved-trips.js`, SQL setup files | Drafts, account saves, retrieval, removal, validation and database permissions. |
| Profile map | `dist/profile.js`, `profile-map-zoom.js`, `scratch-celebration.js`, `scratch-country-phrases.js` | Geography, territory grouping, selection, SVG masks, animation timing, dust, flag and audio. |
| Treasures and mood | `dist/treasures.js`, `community-picks.js` | Data versus rendering, inline SVG rewards, lazy photos, selection toggling and credits. |
| Styling | `dist/style.css`, `atlas-theme.css`, `map-transition.css`, `clarity.css`, `travel-easy.css`, `profile.css` | Cascade, overrides, responsive rules, fonts and why file loading order matters. |
| Country facts | `data/worldometer-countries.json`, `country-supplements.json`, `country-classification.json`, `territory-parents.json`, `scripts/build-country-data.cjs` | Raw versus derived data, aggregation, ranks, shares and the outputs to regenerate. |
| Entry guidance | `dist/entry-requirements.js`, reviewed/public JSON, `scripts/refresh-entry-requirements.py` | Source checking versus editorial approval; timestamps, hashes and failure handling. |
| Publication | `.github/workflows/pages.yml`, `entry-requirements.yml` | Local preview versus public hosting, commits, deployment and browser cache versions. |

## Suggested sessions

1. **A page from start to finish.** Run the site locally, identify what the browser loads, and draw a small map of the files. Explain why `dist/` must not simply be deleted here.
2. **Follow the data.** Trace one country's facts from raw files through the generator to the page. Then compare this with manually repeated planning data. Practice one small data edit locally.
3. **Follow one trip.** Trace the Home filters into a preview, the region/month into an airport, and the budget into a total. Calculate an example manually, including two people and shared accommodation.
4. **Follow an account save.** Trace UI state, browser draft, authenticated request, database row and profile display. Explain row-level security and what belongs in public configuration. Use test accounts without exposing credentials.
5. **Understand the maps and presentation.** Follow a country click through territory grouping and an SVG reveal. Inspect the CSS cascade and a simple visual change before attempting to reorganize animation code.
6. **Make a small cleanup.** Choose one proven issue, explain it, make a focused change, verify related behavior, commit it and demonstrate how to revert it.
7. **Optional promotion session.** Define the first audience and useful entry page, inspect page titles/share previews, choose one traffic experiment and decide what result to measure. Do not buy ads or install tracking automatically.

Each session should explain a concept using this codebase, offer one practical exercise and finish with a short note of what was learned. Do not replace learning with a large automatic refactor.

## Initial inspection candidates

These are candidates to investigate, not declarations that files can be deleted:

- Country names, codes and planning data repeated across HTML, `app.js`, `travel-details.js`, `saved-trips.js` and map code.
- Photo metadata duplicated between JSON manifests and `treasures.js`.
- Shared CSS spread over several layers, including appended overrides and compressed sections.
- Country-specific treasure renderers alongside the newer shared renderer.
- Checklist, health and insurance code retained for advanced planning, plus any legacy routes still reachable directly.
- Historical SQL migrations, source notes, original image-download helpers and `.openai/` metadata from earlier hosting. Some are useful history, attribution or setup material even when not loaded by the browser.
- Old brand names and script-cache labels. A label such as `sixteen-countries-1` is not itself proof that runtime logic still supports only 16 countries.
- Verification scripts currently split between the repository and the separate ChatGPT working directory. Identify the useful checks and make them reproducible before relying on them during larger cleanup.
- Documentation drift: older notes often describe previous product states. Prefer PROJECT.md and the running code; reconcile contradictions explicitly.

## Cleanup procedure

1. Record the current commit and create a checkpoint branch or tag before a structural change.
2. Classify the candidate: active runtime code, generated output, authoritative source, historical migration, attribution, future feature or unknown.
3. Search references across pages, scripts, workflows and data. Include dynamic event handlers and text-based selectors; an absent direct import does not prove a global function is unused.
4. Explain the proposed change and expected benefit. Prefer removing one obsolete path or consolidating one repeated dataset over a whole-site rewrite.
5. Verify the affected flow, including relevant empty/error/mobile states. Preserve accounts, saved trips, country totals and license attribution.
6. Commit one coherent change and keep a clear recovery path.

Do not edit synced `sources/` reference material. Do not delete Supabase data or remove row-level security as part of cleanup. Do not confuse a locally successful change with a deployed public change.

## Starting request for the next chat

“Read PROJECT.md and WEEK-6-HANDOFF.md in the Travel Easy repository. Week 6 is about teaching me the technical mechanics of the existing website and assessing cleanup. Begin with a plain-language architecture map and trace one action through the real files. Let me practice small changes. Do not start a rewrite or delete code before checking its purpose and references.”
