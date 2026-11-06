# Within-base tourist-season rankings

Version 3 — 6 November 2026. Portugal (5 bases), Colombia (10 bases), Italy (13 bases).

Compare each base only with its own 12 calendar months. Rank 1–4 BEST, 5–8 AVERAGE, 9–12 WORST, for each climate component, the combined climate score, and the final tourist score. Equal values use January–December order; forcing equal-sized bands can separate identical or near-identical months. BEST is relative, not an absolute weather or safety guarantee.

Temperature: smallest absolute distance from editable target 20°C. Rain: smallest absolute distance from 5 mm/calendar day, including dry days. Humidity: smallest distance from editable 55% RH target (comfort, not health). Each rank becomes 100 × (12 − rank) / 11. This replaces clipped absolute scores so very wet bases still distinguish wetter and drier months.

Climate = 50% temperature + 30% rain + 20% humidity rank scores. Tourist score = 60% climate + 13⅓% crowds + 13⅓% festivals + 13⅓% prices. Rank the resulting scores within the base and year, descending, to label four/four/four months. Preserve full precision until display.

Crowd and price low-to-high orders are provisional editorial accommodation-demand proxies, not measured percentiles, prices or occupancy. Easter month and listed flagship-event months add two demand-rank positions before re-ranking. Convert these ranks to the same continuous 0–100 scale. Prices and crowds are correlated.

Festival scores remain evidence-based: flagship or two regional events 100, one regional event 50, no listed event 0. Do not assign artificial BEST festival months where no event is listed. Calendar coverage is incomplete. Carnival is Easter minus 47 days; Santo Cristo is Easter plus 35 days. 2026–2032 dates are planning approximations requiring confirmation.

Climate baseline: 2016–2025 daily mean temperature, rain_sum, daily mean RH, ERA5 via Open-Meteo. Grid model estimates, not station observations or forecasts; mountainous/coastal microclimates may differ. Salento and Bucaramanga rainfall totals are unusually high and remain pending local observational validation. Relative ranking does not resolve source bias.

Sources: https://open-meteo.com/en/docs/historical-weather-api ; per-base API queries and provisional crowd/price/event sources in data/seasonality-inputs.json. Open-Meteo CC BY 4.0 / Copernicus ERA5.

Data flow: data/seasonality-inputs.json → scripts/build-seasonality.cjs → dist/seasonality-ratings.js → country tables and Designing matcher. Run scripts/check-seasonality.cjs after rebuild. Workbook edits do not automatically update the site.

Italy: climate retrieved 6 November 2026 at each named destination’s coordinates. Existing six planner indices retained, seven added. Only selected sourced events are included. Crowd/price month orders are provisional urban, coastal/island and mountain seasonal proxies, not measured values. Ortisei uses the agreed general comfort model, not a ski-suitability model; airport-to-town transfers are required and are not part of flight samples.

Targets updated: 20°C daily mean and 5 mm/calendar day rain. Absolute deviations are symmetric: 13°C and 27°C each differ by 7°C; 0 and 10 mm/day each differ by 5 mm/day. Equal deviations remain tied in preference, then calendar order breaks ties to preserve the four/four/four quota. These are owner-selected preferences, not universal ideal-weather standards.
