# Within-base tourist-season rankings

Version 5 — 6 November 2026. Portugal (5 bases), Colombia (10 bases), Italy (13 bases), Spain (14 bases).

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

Each climate-scored base has one primary type. Default standard is 19°C, beach is 25°C and winter is −5°C. Values live centrally in method.temperatureTargetsC; profile.climateType selects the target. Exactly one type is active, so incompatible targets are not averaged.

Initial beach assignments: Faro, Santa Marta, San Andrés, Cagliari, Málaga, Palma, Puerto de la Cruz. Winter: Ortisei and Jaca. The remaining bases in that initial rollout used standard. Assignments are editorial and sources/reasons are stored per profile. Faro and several city/island gateways represent the wider beach-oriented stay, not necessarily a beach next to every hotel. A Christmas market alone does not classify every city as winter; review purpose and visitor appeal.

Temperature rank is based on ABS(monthly daily mean − type target), independently for each base’s 12 months. Other climate components, the 60/20/10/10 tourist weights, and final 4/4/4 bands are unchanged. These types do not model sea temperature, snowfall or activity availability. The other countries still using legacy seasonal strings are not silently converted without monthly climate data.

Cartagena classification approved by owner as standard (19°C): its exceptional historic architecture and cultural city appeal take priority over the coastal setting. Pre-UK/France totals: 7 beach, 2 winter, 33 standard.

## All season — approved rule

No single temperature target. Monthly daily mean within the inclusive interval −5°C to 19°C has zero temperature penalty. Climate score = MAX(0, rain rank score × 60% + humidity rank score × 40% − 2 × MAX(−5 − temperature, 0, temperature − 19)). The 60/40 rain/humidity split preserves their existing 30:20 ratio after removing temperature. Penalty is in climate-score points, before climate’s 60% contribution to the overall tourist score; there is no second climate re-scaling. User explicitly selected 2 climate points per °C on 6 November 2026.

Temperature component is not ranked or forced into 4/4/4 for All season. Rain, humidity, climate and final tourist ranks retain the 4/4/4 policy. Examples: −5°C and 19°C → 0 penalty; −6°C and 20°C → 2 points; 25°C → 12 points. Temperature means do not capture daily extremes.

Integrated owner-approved assignments: Strasbourg, Edinburgh, Inverness, Fort William and Portree. Stored in destinationTypeAssignments and climateTypeAssignments. All five now have imported historical monthly climate. Existing scored-base classifications remain as previously approved until additional All season selections are accepted. Current totals: 11 beach, 2 winter, 5 All season, 53 standard.

## UK and France rollout — 6 November 2026

13 UK and 16 French destinations added (71 scored bases overall). 2016–2025 ERA5 daily data use Europe/London and Europe/Paris local days respectively. All season: Edinburgh, Inverness, Fort William, Portree and Strasbourg. Beach: St Ives, Nice, Biarritz and Ajaccio. Annecy and Marseille remain standard mixed-purpose destinations. Earlier country classifications are unchanged. Climate is a model estimate; crowd and price monthly orderings are editorial proxies, not measured values. Festival records link selected official sources and use typical months rather than confirmed future schedules. Gateways can be outside the town or country (Annecy via Geneva); ground transfers and live flight service are not yet modelled.

Porto and Venice reclassified as All season by owner approval on 6 November 2026. Same inclusive −5°C to 19°C interval and 2 climate points/°C outside it. Recalculated monthly scores retain 4/4/4 final bands. Current totals: 11 beach, 2 winter, 7 All season, 51 standard.
