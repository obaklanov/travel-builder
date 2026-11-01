# Entry requirement summaries

Scope: tourism using a regular Canadian passport. Each summary links to the Government of Canada country page. No entry permission is guaranteed. Departure city does not determine passport nationality.

The first eight summaries were reviewed against official entry sections on November 1, 2026. These are short editorial summaries, not a full reproduction of government guidance. Country-specific conditions such as Schengen cumulative stays and NZeTA remain explicit. Argentina's source does not specify a tourist stay duration, so no duration is invented.

## Weekly check

GitHub Actions runs entry-requirements.yml on Mondays at 11:00 UTC (GitHub may delay scheduled runs). It can also be started manually from Actions. No external package or API key is needed. It fetches only the eight fixed travel.gc.ca URLs, parses the Entry and exit requirements section, and validates expected headings.

If normalized entry text matches the approved source hash, Last checked advances. If text changes, the previous summary/date remain and the website displays a source-change message. data/entry-requirements-review.json contains candidate text and a review flag; the Actions run summary lists affected countries. A failed download does not advance Last checked. The website also flags snapshots over nine days old.

The workflow commits only the three entry data files and deploys dist directly, since a push made with GITHUB_TOKEN does not trigger a second push workflow. Existing Pages settings are retained. If repository rules prohibit the bot commit, the Actions run fails and the prior public snapshot remains.

## Reviewing changes

Read the candidate government text and the official page. Edit the appropriate row in data/entry-requirements-reviewed.json: update summary, notes and passport as needed, then approvedSourceText and approvedSourceHash to the reviewed candidate values. Run python scripts/refresh-entry-requirements.py to verify the reviewed hash matches the current source and rebuild the public file. Do not advance checkedAt or approve a hash without reviewing its source. Commit and push the updated data files.

Government page update dates may refer to unrelated sections and are not used as the website's Last checked date. Only an unchanged, successfully fetched approved entry section advances that date.

Sources: https://travel.gc.ca/destinations/ and https://open.canada.ca/data/en/dataset/bef2ebb3-ca9a-485f-aaff-5dc36eb89426 . The public feed does not contain the full entry text; this importer uses the country pages instead. Reuse is attributed to the Government of Canada; Travel Easy is not affiliated with it.

The catalogue expanded to twelve destinations on November 1, 2026, adding United States, Vietnam, Colombia and Morocco. The US source uses a narrative Visas section rather than a Tourist visa label; parsing validates that format explicitly.
