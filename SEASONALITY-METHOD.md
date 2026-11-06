# Within-base tourist-season rankings

Version 4 — 6 November 2026. Portugal (5 bases), Colombia (10 bases), Italy (13 bases), Spain (14 bases).

Compare each base only with its own 12 calendar months. Rank 1–4 BEST, 5–8 AVERAGE, 9–12 WORST, for each climate component, the combined climate score, and the final tourist score. Equal values use January–December order; forcing equal-sized bands can separate identical or near-identical months. BEST is relative, not an absolute weather or safety guarantee.

Temperature: smallest absolute distance from the base’s primary-type target: standard 19°C, beach 25°C, winter −5°C. Rain: smallest absolute distance from 5 mm/calendar day, including dry days. Humidity: smallest distance from editable 55% RH target (comfort, not health). Each rank becomes 100 × (12 − rank) / 11. This replaces clipped absolute scores so very wet bases still distinguish wetter and drier months.

Climate = 50% temperature + 30% rain + 20% humidity rank scores. Tourist score = 60% climate + 20% festivals + 10% crowds + 10% prices. Rank the resulting scores within the base and year, descending, to label four/four/four months. Preserve full precision until display.

Crowd and price low-to-high orders are provisional editorial accommodation-demand proxies, not measured percentiles, prices or occupancy. Easter month and listed flagship-event months add two demand-rank positions before re-ranking. Convert these ranks to the same continuous 0–100 scale. Prices and crowds are correlated.

Festival scores remain evidence-based: flagship or two regional events 100, one regional event 50, no listed event 0. Do not assign artificial BEST festival months where no event is listed. Calendar coverage is incomplete. Carnival is Easter minus 47 days; Santo Cristo is Easter plus 35 days. 2026–2032 dates are planning approximations requiring confirmation.

Climate baseline: 2016–2025 daily mean temperature, rain_sum, daily mean RH, ERA5 via Open-Meteo. Grid model estimates, not station observations or forecasts; mountainous/coastal microclimates may differ. Salento and Bucaramanga rainfall totals are unusually high and remain pending local observational validation. Relative ranking does not resolve source bias.

Sources: https://open-meteo.com/en/docs/historical-weather-api ; per-base API queries and provisional crowd/price/event sources in data/seasonality-inputs.json. Open-Meteo CC BY 4.0 / Copernicus ERA5.

Data flow: data/seasonality-inputs.json → scripts/build-seasonality.cjs → dist/seasonality-ratings.js → country tables and Designing matcher. Run scripts/check-seasonality.cjs after rebuild. Workbook edits do not automatically update the site.

Italy: climate retrieved 6 November 2026 at each named destination’s coordinates. Existing six planner indices retained, seven added. Only selected sourced events are included. Crowd/price month orders are provisional urban, coastal/island and mountain seasonal proxies, not measured values. Ortisei uses the winter target, but this is not a snow-cover or ski-suitability model; airport-to-town transfers are required and are not part of flight samples.

Targets: standard 19°C; beach 25°C; winter −5°C. Rain remains 5 mm/calendar day. Distance from the relevant target is symmetric; calendar order breaks equal deviations to enforce 4/4/4 quotas.

Spain: 14 approved destinations and 168 ERA5 climate records, retrieved 6 November 2026. First six planner indices retained. Mainland/Mallorca use the equivalent Central European local day; Puerto de la Cruz explicitly uses Atlantic/Canary local days. Holy Week events use the month of Easter Sunday as a monthly approximation. Selected festivals, crowds and price proxies remain provisional. Jaca’s winter target does not measure snow cover; Tenerife’s north/south and altitude differences are not represented by one city-point rating.

## Destination climate types

Each of the 42 climate-scored bases has one primary type. Default standard is 19°C, beach is 25°C and winter is −5°C. Values live centrally in method.temperatureTargetsC; profile.climateType selects the target. Exactly one type is active, so incompatible targets are not averaged.

Initial beach assignments: Faro, Santa Marta, San Andrés, Cagliari, Málaga, Palma, Puerto de la Cruz. Winter: Ortisei and Jaca. Remaining 33 bases use standard. Assignments are editorial and sources/reasons are stored per profile. Faro and several city/island gateways represent the wider beach-oriented stay, not necessarily a beach next to every hotel. A Christmas market alone does not classify every city as winter; review purpose and visitor appeal.

Temperature rank is based on ABS(monthly daily mean − type target), independently for each base’s 12 months. Other climate components, the 60/20/10/10 tourist weights, and final 4/4/4 bands are unchanged. These types do not model sea temperature, snowfall or activity availability. The other countries still using legacy seasonal strings are not silently converted without monthly climate data.

Cartagena classification approved by owner as standard (19°C): its exceptional historic architecture and cultural city appeal take priority over the coastal setting. Current totals: 7 beach, 2 winter, 33 standard.
