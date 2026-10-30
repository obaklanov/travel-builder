# Travel Easy

Working copy for the simpler trip-planning direction.

Local source: C:/Users/OBakl/OneDrive/Desktop/project 2026/sites/travel-easy
Repository: https://github.com/obaklanov/travel-easy
Website: https://obaklanov.github.io/travel-easy/
Static files: dist/. GitHub Pages workflow: .github/workflows/pages.yml.

Travel Atlas remains unchanged at https://obaklanov.github.io/canadian-travel-atlas/.

Travel Easy now uses an independent Supabase project: ytevjyzzqnapbawmenzz.
Its public browser configuration is dist/profile-config.js.
User confirmed running supabase-travel-easy-setup.sql and configuring the profile URL plus reset redirect.
Tables: private traveller_profiles and travel_easy_trips, protected by row-level security.
Account session key: travel-easy-auth.

Generated-trip country pages show ADD THIS TRIP and place collectibles at the bottom.
The browser preserves a pending draft through sign-in; saving to an account requires authentication.
A generated trip uses the same sample cost formula as Budget and costs. These are not live fares.