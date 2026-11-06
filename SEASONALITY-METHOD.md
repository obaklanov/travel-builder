# Tourist-season scoring — Portugal and Colombia

Reviewed: 6 November 2026. Version 1, provisional editorial model.

The live season tables and Designing matcher share the same generated ratings. The scope is five Portuguese and ten Colombian destinations. This is a preference model, not a safety rating or a forecast.

## Formula

Overall = 40% climate + 20% crowds + 20% festivals + 20% prices.

Scores range from 0 to 100. BEST is 65 or more; AVERAGE is 40 to below 65; WORST is below 40. These thresholds are implementation choices and can be tuned. No destination is forced to have any BEST or WORST months.

Climate uses 2016–2025 daily ERA5 reanalysis accessed through Open-Meteo, aggregated by local calendar month. Ten years is a recent historical baseline, not a standard 30-year climatological normal. Grid coordinates and sample-day counts are retained. Coastal islands and mountain towns can differ from the model grid.

Within climate, temperature weighs 50%, rain 30% and humidity 20%:

- Temperature: monthly mean daytime maximum of 18–26°C scores 100. Subtract 8 points per degree outside the interval, floored at zero.
- Rain: historical fraction of days with at least 1 mm precipitation. At or below 20% scores 100; above that, score declines linearly to zero at 100%. This is not the probability that a particular trip day will have rain, and excludes sub-1-mm drizzle.
- Humidity: monthly mean daily relative humidity of 40–70% scores 100. Subtract 3 points per percentage point outside this interval. This is an adjustable outdoor comfort preference, not a healthy/unhealthy threshold. Humidity and heat are not independent; a future model can use apparent temperature or dew point.

## Crowds and prices: important evidence limits

The source guidance establishes broad peak, shoulder and quiet periods. It does not provide verified monthly visitor counts or hotel-price series for all 15 places. The current month orderings are editorial estimates, not measured percentiles or percentages of hotel capacity. Prices are a separate factor in the formula but currently use accommodation-demand seasonality as a proxy; the initial base order matches crowds, so the two factors are correlated. No airfare price history is claimed.

For each destination and year, rank months from quietest/cheapest to busiest/most expensive: first six score 100, next three score 50, last three score zero. Calendar-month order breaks tied editorial ranks deterministically. Easter month and months with a listed flagship event receive a two-rank demand adjustment before re-ranking. This is an explicit modelling assumption, not a measured holiday effect. Narrow holiday peaks are blurred by monthly scoring.

Replace these provisional orders with observed visitor/occupancy and accommodation-price data when available. Do not describe them as audited statistics.

## Events

A listed flagship event scores 100. A listed regional event scores 50; two regional events reach 100. No listed event scores zero, meaning no selected event in this registry, not that the city has no festivals. Prominence classifications are editorial. Event completeness is partial; San Andrés currently has no scored event record.

Fixed months represent typical recurring event windows. Carnival is computed as the month of Shrove Tuesday, 47 days before Easter. Santo Cristo uses Easter plus 35 days. Other programmes can move or be cancelled. The 2026–2032 generated calendar is a planning approximation, not confirmed future dates. Event benefits and their possible crowd/price penalties are both counted intentionally.

## Files and updating

- `data/seasonality-inputs.json`: monthly climate aggregates, sources, event records, assumptions and provisional month orderings.
- `scripts/build-seasonality.cjs`: reproducible formula and calendar rules.
- `dist/seasonality-ratings.js`: generated browser data; do not hand-edit.
- `scripts/check-seasonality.cjs`: weighting, climate bounds, calendar shifts and planner integration checks.

After changing inputs: run `node scripts/build-seasonality.cjs` and `node scripts/check-seasonality.cjs`. Update browser version keys when publishing regenerated data. No scheduled refresh is configured yet.

Hover a table cell to inspect its component scores and historical climate figures. The displayed table changes with the selected travel year; matching uses that year's rating, including trips crossing year boundaries. The collapsed methodology section lists supporting sources.

Weather data attribution: Open-Meteo, CC BY 4.0, based on Copernicus ERA5 reanalysis. Documentation: https://open-meteo.com/en/docs/historical-weather-api
