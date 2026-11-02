# Travel Easy

A travel-planning website for Canadians with 24 destination guides, trip suggestions, group budgets, saved trips and a personal scratch map.

## Run locally

Open this folder in VS Code and run:

```powershell
npx.cmd http-server dist -p 8090
```

Then open http://localhost:8090.

## Main files

- `dist/index.html`: quick trip generation and filters.
- `dist/destinations.html`: country cards and planning dialogs.
- `dist/travel-details.js`: seasonal regions, airport routing and shared budget calculations.
- `dist/treasures.js`: treasure badges, profile-reward artwork and on-click photos.
- `dist/community-picks.js`: song, book and film recommendations.
- `dist/profile.html` and `dist/profile.js`: personal atlas and account flow.
- `dist/saved-trips.js`: saved-trip actions, backed by Supabase.
- `data/`: source snapshots, country classification, territory relationships and photo credits.
- `scripts/build-country-data.cjs`: regenerate country facts and rankings from shared sources.

The public frontend is static HTML, CSS and JavaScript. Accounts and private saved trips use Supabase; public configuration is in `dist/profile-config.js`. Flight and budget figures are illustrative estimates, not live fares. Entry guidance is reviewed against Government of Canada sources and includes its checked date.

## Destinations

France, United Kingdom, Türkiye, Peru, Brazil, South Africa, South Korea and Australia join the existing 16 destinations. The expansion is recorded in `data/destination-expansion-24.json`. Cover photos use the existing brightness treatment; treasure photos load only when their badge is opened.

The profile map uses a separate Canadian-guided list of 198 countries and self-governing states. This count is independent of the 24 destinations with detailed planning pages.

## Hosting and updates

Public website: https://obaklanov.github.io/travel-easy/

Pushing to `main` deploys `dist/` through the GitHub Pages workflow. The original Travel Atlas project remains separate.

For an existing database, `supabase-twenty-four-destinations-setup.sql` expands the allowed saved-trip destinations without deleting existing trips. It was applied for this expansion.

Photo attribution is available in the About photo-credit section and below individual treasure photos. Detailed source metadata is retained in `data/treasure-photo-sources.json` and `data/eight-country-photo-sources.json`.

## Week 6 learning and cleanup

Start with `PROJECT.md` and `WEEK-6-HANDOFF.md` for the current architecture, learning sessions and safe cleanup procedure.
