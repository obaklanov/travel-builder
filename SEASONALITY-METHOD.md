# Within-base tourist-season rankings

Current targets, effective 6 November 2026: Warm living 21°C / 1 mm per calendar day / 65% RH. All season remains +5 to +25°C neutral / 2 mm per calendar day / 55% RH. Beach and Winter retain their separate rules. Later dated sections supersede historical settings.

Version 5 — 6 November 2026. Portugal (5 bases), Colombia (10 bases), Italy (13 bases), Spain (14 bases).

Compare each base only with its own 12 calendar months. Rank 1–4 BEST, 5–8 AVERAGE, 9–12 WORST, for each climate component, the combined climate score, and the final tourist score. Equal values use January–December order; forcing equal-sized bands can separate identical or near-identical months. BEST is relative, not an absolute weather or safety guarantee.

Temperature: smallest absolute distance from the base’s primary-type target: standard 19°C, beach 25°C, winter −5°C. Rain: smallest absolute distance from 2 mm/calendar day, including dry days. Humidity: smallest distance from editable 55% RH target (comfort, not health). Each rank becomes 100 × (12 − rank) / 11. This replaces clipped absolute scores so very wet bases still distinguish wetter and drier months.

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

Beach temperature weighting updated 6 November 2026: double temperature weight before normalization, giving 66.6667% temperature, 20% rain, 13.3333% humidity within climate. The 25°C target and overall 60/20/10/10 weights remain unchanged. Scaling absolute deviations alone would leave their rank order unchanged.

Peru rollout, 6 November 2026: Lima, Cusco, Iquitos, Arequipa, Puno, Nazca, Trujillo, Máncora, Puerto Maldonado. Máncora is Beach (25°C, double relative temperature weight); others Standard (19°C). 2016–2025 NASA POWER/MERRA-2 aggregates use local solar days; the rain component is corrected total precipitation, including snow. Source: https://power.larc.nasa.gov/docs/services/api/temporal/daily/. ERA5 quota prevented a complete consistent Peru import, so all nine use NASA rather than mixing sources. Puno and the Andes use town-point estimates, not high mountain conditions. Nazca uses Lima as a flight gateway with a long onward ground journey; flight samples exclude that transfer. Crowds/prices are editorial proxies and selected official event sources are partial, not confirmed future schedules. Total 80 scored destinations.

## Beach suitability — 6 November 2026
Beach-only rain target 0 mm/day; climate component weights remain 2/3 temperature, 1/5 rain, 2/15 humidity. Deduct 5 climate points per degree below 22°C, floored at zero. Below 16°C daily mean: UNSUITABLE, zero displayed overall score, rawScore retained for audit, and no recommendations for trips touching such a month even with soft/no seasonal preference. Overall weights 80% climate, 10% festivals, 5% crowds, 5% prices. No forced 4/4/4 final bands for Beach; operational thresholds BEST >=60, AVERAGE >=40, WORST <40, UNSUITABLE below 16°C. These thresholds are product settings, not medical or meteorological standards. No new hard rainfall cutoff introduced. Non-Beach model unchanged.

## Winter suitability — 6 November 2026
Overall 80% climate, 10% festivals, 5% crowds, 5% prices. Climate: 50% absolute temperature (MAX(0,100−5×ABS(T+5))), 30% snow-cover reliability (full at 80% of days with daily mean natural depth >=20 cm), 20% fresh snowfall (full at 60 cm/month, capped). Subtract 10 climate points per °C above 0°C; floor climate at zero. Daily mean above 5°C is UNSUITABLE. Final labels absolute 60/40; BEST additionally needs >=80% snow-cover days. No quota or humidity/rain rewards. Mountain reference metadata is separate from accommodation climate. Missing complete reviewed mountain data is PENDING, score null, excluded from recommendations. Ortisei uses Seceda area, Jaca uses Astún area; actual model grid elevation must be reviewed. Open-Meteo daily limit blocked snow-history collection; no snow values invented or inferred. Thresholds are product settings, not ski or safety guarantees.

## Reviewed rain exclusions — 6 November 2026
All 170 existing bases screened; 53 rain-sensitive entries each receive two explicit unsuitable months. Numeric screen: any month >=8 mm/day, or >=6 mm/day with >=60% wet days where wet-day records exist. Historical 2016–2025 monthly means; supplement 90 legacy bases and cross-check Salento/Bucaramanga with NASA POWER total precipitation. Model estimates, not anomalous weather or flood forecasts. Official seasonal/station evidence overrides known grid mismatches (Manila, Costa Rica regions, Milford Sound) and supports a Salento exception. Full audit with 170 rows, all monthly values, representative coordinates and sources: data/rain-suitability-review.json. Override takes precedence over any score or climate type; two excluded months per vulnerable entry, not two for every destination. Retain preRainScore/preRainRating for audit; score zero, rating U, hard exclusion for recommendations across all touched months. Existing underlying climate inputs and other score formulas remain unchanged. Broad legacy groups may contain multiple local climates.

## All season revision — 6 November 2026
Supersedes earlier All season settings: inclusive −5°C to +25°C has zero temperature impact. Outside, deduct 5 climate points per °C; floor at zero. Climate = 80% within-base rain rank score (target 0 mm/day) + 20% humidity rank score (target 55%) minus that penalty. No temperature ranking. Overall 60% climate / 20% festivals / 10% crowds / 10% prices unchanged. Reviewed rain exclusions still override numeric ratings and recommendations.

## Category naming — 6 November 2026
The former Standard display category is now Warm living (19°C target). Stable internal key standard retained for compatibility. Human-readable labels are centralized in method.climateTypeLabels and generated for profiles; Warm living badges now appear alongside other climate-type badges. No score or classification changes. Rain target remains the existing 5 mm/day for Warm living; this rename does not change it to the 0 mm/day target used by Beach and All season.

Argentina deployed with ten destinations on 6 November 2026. Seven Warm living, El Calafate and Ushuaia All season, Mar del Plata Beach. Removed Bariloche; El Chaltén and Colonia Carlos Pellegrini omitted from the proposal. NASA POWER/MERRA-2 2016–2025 daily local-solar climate, not ERA5; total precipitation includes snow. Seasonal crowd/price orders are provisional, and selected official event months require future-date confirmation. Rain screening re-run for all ten; audit now covers 174 destinations. Latin America guidance: around ten bases for larger countries and fewer for smaller countries such as Uruguay and Paraguay, with distinct experiences prioritized over a fixed quota.


## All season autumn comfort update — 2026-11-06

This supersedes the earlier All season settings. Daily mean temperatures from +5°C through +25°C inclusive have no effect. Outside that interval, subtract 5 climate points per degree, flooring the climate score at zero. Climate combines 60% within-base rain rank and 40% within-base humidity rank. Rain targets 5 mm/calendar day, matching Warm living; humidity targets 55%. Overall weights remain 60% climate, 20% festivals, 10% crowds and 10% prices. Existing reviewed rain exclusions remain unchanged. Applies to all nine current All season bases.


## Brazil rollout — 6 November 2026

Ten approved destinations: Rio, Salvador, Recife & Olinda and Bonito Warm living; São Paulo, Manaus, Foz do Iguaçu, Barreirinhas and Poconé All season; Florianópolis Beach. Current +5–25°C All season rules apply. Historical climate uses NASA POWER/MERRA-2 2016–2025 local solar daily values, including total precipitation. Crowd/price orders are provisional editorial estimates, not measured arrivals or room rates. Selected Carnival events use the Easter-relative rule; absent events mean incomplete evidence coverage, not no events. Barreirinhas lagoon fullness and Manaus/Pantanal flood/access conditions require separate review and are not modeled as numeric climate inputs. Airports SLZ, CGR and CGB can require substantial onward ground transfers; route costs and hours remain illustrative. Rain screening updated for all ten Brazil bases; audit now covers 179 destinations. Existing first-five indices preserved.


## Warm living daylight preference — 6 November 2026

Warm living only: calculate average astronomical sunrise-to-sunset daylight for each calendar month, using daily NOAA fractional-year solar declination and a 90.833° sunrise zenith at the named base latitude. Recalculate for each scoring year, including leap years. Select the three shortest months (ties use calendar order). Subtract 5 points from the overall tourist score, floor zero, before ranking. These months cannot be BEST: a BEST label is capped to AVERAGE. No replacement BEST months are promoted; the earlier exact final 4/4/4 quota is superseded for affected Warm living bases. Rain UNSUITABLE overrides remain last and authoritative. Component ranks and all weights remain unchanged. All season, Beach and Winter have no daylight adjustment. Approximate daylight excludes twilight, terrain, clouds and actual sunshine. Near-equator differences may be small, but the same fixed product preference applies.

Formula source: https://gml.noaa.gov/grad/solcalc/solareqns.PDF


## Greece rollout — 6 November 2026

Nine approved bases: Athens, Fira (Santorini), Chania (Western Crete), Corfu Town, Nafplio and Rhodes Town Warm living; Thessaloniki and Kalambaka All season; Naxos Town Beach. Ioannina excluded by owner. Existing first-five region indices retained. NASA POWER/MERRA-2 2016–2025 daily local-solar climate; total precipitation, not ERA5 rain-only. Crowd/price orders remain editorial proxies; selected Athens/Epidaurus and Thessaloniki events use typical months and require future-date confirmation. Orthodox Easter is not scored with the Western Easter formula. Kalambaka requires substantial onward ground travel from SKG/ATH; Nafplio from ATH. Chania represents western Crete rather than the whole island. Existing Warm living daylight penalty and all other scoring rules apply. Rain review now covers 183 destinations.


## Brunei and Indonesia rollout — 6 November 2026

Brunei: Bandar Seri Begawan Warm living; Bangar (Temburong) All season. Indonesia: Ubud and Yogyakarta Warm living; Jakarta, Labuan Bajo and Malang All season; Senggigi and Sanur Beach. Original region slots retained; Malang and Sanur appended. NASA POWER/MERRA-2 2016–2025 local-solar daily climate, total precipitation. Town values cannot describe mountain excursions or boat conditions. Crowd/price inputs are provisional editorial seasonal orders. Bali Arts Festival uses typical June/July evidence; event coverage is partial and future dates require confirmation. Ubud and Sanur share DPS but represent different inland and coastal stays. Bangar uses BWN plus onward travel; Malang uses MLG/SUB plus ground transfers. Rainforest, volcanic and boat excursion access require separate current checks. All current scoring rules including Warm living daylight adjustment apply. Rain audit now covers 185 destinations.


## Japan and Laos rollout — 6 November 2026

Japan: Tokyo, Sapporo, Kyoto, Fujikawaguchiko, Kanazawa and Hiroshima All season; Fukuoka Warm living; Onna Beach. Laos: Luang Prabang, Vientiane and Pakse Warm living; Vang Vieng All season. Original geographic slots retained; split combined regions into named bases, with Vang Vieng separate from Vientiane. NASA POWER/MERRA-2 2016–2025 local solar daily climate, total precipitation including snow. Sapporo is an All season city, not a ski base; Fuji summit conditions/visibility and climbing access are not inferred from Fujikawaguchiko town values. Gateway airports can require substantial ground transfers (Kyoto, Fujikawaguchiko, Onna, Vang Vieng). Crowd/price orders are provisional editorial proxies. Selected fixed-month festivals have source evidence but future dates need confirmation; event coverage remains partial. Existing Warm living daylight, All season, Beach and rain rules unchanged. Rain audit now covers 191 destinations.


## Malaysia and Philippines rollout — 6 November 2026

User authorized autonomous selection/deployment of the next two countries. Malaysia six bases: Kuala Lumpur, George Town and Kuala Terengganu Warm living; Kota Kinabalu and Kuching All season; Pantai Cenang (Langkawi) Beach. Philippines six bases: Manila and Cebu City Warm living; El Nido, Boracay and Panglao (Bohol) Beach; Banaue All season. Existing region slots narrowed to named bases, with separate Langkawi, Bohol and Ifugao stays appended. All six existing Treasures covered. NASA POWER/MERRA-2 2016–2025 local-solar daily climate; total precipitation. Crowd/price inputs remain editorial proxies; selected Sinulog/Rainforest World Music Festival typical months are partial event evidence, not confirmed future calendars. Preserve official Manila August/July rain exclusions over coastal grid results. Kinabalu mountain access, Batad crop cycles/local walking and island boat/weather operations need separate checks; town climate is not mountain/sea suitability. Banaue uses MNL with a substantial overland transfer. Current scoring/daylight rules unchanged. Rain review now covers 194 destinations.


## South Korea and Thailand rollout — 6 November 2026

Autonomously selected/deployed under continuing user authorization. South Korea: Seoul, Busan, Seogwipo (Jeju), Gyeongju and Sokcho All season, emphasizing cultural/nature experiences and autumn appeal rather than beach or ski-only stays. Thailand: Bangkok, Chiang Mai and Sukhothai Warm living; Kata (Phuket), Chaweng (Ko Samui) and Ao Nang (Krabi) Beach. Original region positions preserved; two bases appended to each country. All existing Treasures covered; Ayutthaya retained as a Bangkok excursion. NASA POWER/MERRA-2 2016–2025 local-solar daily climate, total precipitation including snow. Crowd/price orders are provisional editorial proxies; BIFF/Songkran typical-month events require future date checks. Sokcho and Gyeongju require substantial onward ground travel from gateway airports. Mountain, marine/park access and northern Thai smoke/haze are separate from monthly climate scoring. Current scoring/daylight rules unchanged. Rain audit now covers 198 destinations.


## Türkiye and Vietnam rollout — 6 November 2026

Continuing authorized autonomous selection/deployment. Türkiye seven: Istanbul, Göreme and Trabzon All season; Antalya, İzmir and Pamukkale Warm living; Ölüdeniz Beach. Antalya represents heritage-city living; Ephesus is an İzmir excursion. Vietnam seven: Hanoi, Ha Long, Ninh Binh and Da Lat All season; Hoi An and Ho Chi Minh City Warm living; Dương Đông (Phú Quốc) Beach. All existing Treasures covered; original five Türkiye and four Vietnam region positions preserved. NASA POWER/MERRA-2 2016–2025 local-solar daily climate, total precipitation including snow. Crowd/price ranks remain editorial proxies; Istanbul Music Festival and monthly Hoi An lantern nights are partial event evidence, not guaranteed trip-date availability. Tet is not assigned an invented fixed Gregorian month. Balloon operations, mountain conditions, cruises and local flooding need separate current checks. DLI closure notice covered March–August 2026, before this deployment; route estimates remain illustrative. Current scoring/daylight rules unchanged. Rain audit now covers 203 destinations.


## Egypt and Morocco rollout — 6 November 2026

Continuing authorized autonomous selection/deployment. Egypt six: Cairo, Luxor, Abu Simbel and Aswan Warm living; Hurghada Beach; Farafra All season. Separate Abu Simbel and Farafra stays cover remote Treasures rather than imply easy day trips from distant towns. Morocco six: Marrakech, Fes and Ouarzazate Warm living; Essaouira, Merzouga and Chefchaouen All season. Essaouira represents heritage/coastal living, not swimming-only resort demand. Original four slots per country retained; two appended. All existing Treasures covered. NASA POWER/MERRA-2 2016–2025 local-solar daily climate, total precipitation. Crowd/price inputs remain editorial proxies; Abu Simbel solar alignment and Gnaoua typical-month events are partial evidence, not trip-date guarantees. Gateway corrections: ESU/RAK for Essaouira, ERH for Merzouga, OZZ for Ouarzazate, TNG for Chefchaouen and ABS for Abu Simbel. Ground transfers and current desert excursion arrangements/access require separate planning; flight times/costs remain illustrative. Current scoring/daylight rules unchanged. Rain audit now covers 207 destinations.


## Australia and New Zealand — 6 November 2026

Australia eight: Sydney and Perth Warm living; Surfers Paradise Beach; Melbourne, Cairns, Yulara, Darwin and Hobart All season. New Zealand seven, all All season: Auckland, Rotorua, Wellington, Queenstown, Te Anau, Christchurch and Franz Josef. Original slots retained and new stays appended. Every existing Treasure has an access base. NASA POWER/MERRA-2 daily 2016–2025 local-solar climate, total precipitation including snow. Southern-hemisphere crowd and price orders are provisional editorial proxies, not measured occupancy/prices. Dark Mofo and CubaDupa event coverage is partial and typical-month only. Reviewed Milford Sound December/January exclusions retained for the Te Anau/Fiordland excursion; these are not Te Anau town rainfall measurements. HKK to Franz Josef, ZQN to Te Anau and AKL to Rotorua require ground transfers; Hobbiton is an excursion near Matamata. Town weather does not represent reef, glacier, trail or mountain safety. Scoring rules unchanged. Rain audit now covers 211 destinations.


### Country coverage calibration — 6 November 2026

Owner correction: Australia retains eight, New Zealand reduced to six (Franz Josef removed; Christchurch retained). Six New Zealand stays are Auckland, Rotorua, Wellington, Queenstown, Te Anau and Christchurch; all All season. Future country lists balance land area/population, climate diversity, historical/architectural richness and distinct stays, with deeper Europe/South America coverage. Counts are not paired-country quotas. Treasure coverage and Milford excursion rain review retained. Current total 193 scored destinations and 210 rain reviews.


## Mexico and Costa Rica — 6 November 2026

Country-scale selection: Mexico ten (large population/area, high historical/architectural diversity and distinct coasts/highlands/canyon); Costa Rica five (selective volcano/cloud-forest/Pacific/Caribbean coverage). Mexico: Cancún, Puerto Vallarta and Cabo San Lucas Beach; Oaxaca, Mérida and Guadalajara Warm living; Mexico City, Guanajuato, San Cristóbal de las Casas and Creel All season. Costa Rica: Puerto Viejo Beach; La Fortuna, Manuel Antonio, Santa Elena/Monteverde and Tortuguero All season. Every current Treasure has a stay or separately identified excursion: Chichén Itzá from Mérida, El Arco from Cabo San Lucas, Zócalo in Mexico City; Arenal and Río Celeste from La Fortuna, Manuel Antonio locally. Río Celeste requires a substantial separate road excursion. Original slots retained; additional destinations appended. NASA POWER/MERRA-2 2016–2025 local-solar daily data, total precipitation. Town climate does not represent all elevations, marine conditions or park/canyon access. SJO/LIR, TGZ, CUU and other gateways require onward transfers; TTQ/XQP/LIO domestic services require separate current confirmation. Crowd/price ranks are editorial proxies, not observed occupancy or prices. Guelaguetza July and Cervantino October have official partial typical-month evidence; no event listing does not establish absence of festivals. Existing Pacific and Caribbean Costa Rica regional rain exceptions retained for Manuel Antonio and Puerto Viejo; newly split locations screened at their own point. Scoring/daylight methodology unchanged. Total 208 scored destinations, 217 rain reviews.


## United States and South Africa — 6 November 2026

US twelve: New York, Flagstaff, Seattle, San Francisco, Chicago, Washington DC, Anchorage and Jackson All season; Los Angeles and New Orleans Warm living; Miami Beach and Honolulu Beach. Breadth reflects continental size/population, architecture/cultural centers, desert/highland, Alaska and Hawaii; not an exhaustive state inventory. South Africa six: Cape Town Warm living; Umhlanga Beach; Hazyview, Knysna, Johannesburg and Underberg All season. Covers Cape heritage, safari, coast, Garden Route, Gauteng history and Drakensberg without extra nearby-city entries. Existing slots retained; new places appended. All Treasures covered through named stay or identified excursion. Grand Canyon from Flagstaff is a substantial South Rim road excursion; town climate differs from canyon floor. Jackson represents Grand Teton with longer seasonal Yellowstone excursions; road closures require separate checking. Hazyview uses MQP, not distant JNB; Knysna uses GRJ; Underberg requires road transfer. NASA POWER/MERRA-2 2016–2025 local-solar daily climate with total precipitation. Crowd/price orders remain editorial proxies; Cherry Blossom, Jazz Fest and Cape Town Jazz Festival typical-month coverage is partial. Climate and daylight formulas unchanged. Rain screen applied to named points; monthly climate does not establish park access or safety. Total 226 scored destinations and 226 rain reviews.


## Rain target reduced to 2 mm/day — 6 November 2026

Owner-approved change after external season-guide comparison. Warm living method.rainTargetMmPerDay and All season method.allSeason.rainTargetMmPerDay now both equal 2 mm per calendar day, including dry days (roughly 56–62 mm/month). Rank absolute distance from this target symmetrically within each destination. Beach remains 0 mm/day; Winter snow parameters, temperatures, humidity target, weights, within-base labels, daylight rules, source climate observations and reviewed rain exclusions remain unchanged. Rebuilt all 226 destination profiles for 2026–2032. Older sections recording 5 mm/day are historical.


## Warm living targets: 21°C, 1 mm/day, 65% RH — 6 November 2026

User explicitly changed Warm living targets. Temperature target now 21°C; rain target 1 mm per calendar day including dry days; humidity target 65%. A scoped method.warmLiving.humidityTargetPct override leaves All season and Beach at the existing global 55% humidity target. All season rain stays 2 mm/day and its temperature interval remains +5 to +25°C. Beach rain stays 0 mm/day and temperature 25°C; Winter snow rules unchanged. Weights, relative ranks/quotas, daylight penalties, destination classifications, climate observations and rain exclusions unchanged. All 226 profiles rebuilt for 2026–2032. Older target descriptions in historical sections are superseded by this section.

## Current rules — 7 November 2026
Supersedes earlier overall weighting and daylight sections. All destination types now use 70% climate, 10% festivals, 10% crowds, 10% prices. Warm living daylight uses the day-weighted annual average: no penalty for a monthly shortfall up to 1.5 hours, then 3.2 overall points per additional hour, capped at 8 points (four-hour shortfall). No automatic rating cap. Other climate types retain no daylight penalty. Climate targets, component weights, suitability exclusions and type-specific rating bands are unchanged.
