-- Run in the Travel Atlas Supabase project used by Travel Builder.
-- Expands only the Builder trip country constraint; keeps all trips, grants and row-level security policies.
begin;
alter table public.travel_builder_trips drop constraint if exists travel_builder_trips_country_check;
alter table public.travel_builder_trips add constraint travel_builder_trips_country_check check (country in ('mexico','japan','portugal','italy','argentina','thailand','egypt','new-zealand','united-states','vietnam','colombia','morocco','spain','greece','costa-rica','indonesia','france','united-kingdom','turkey','peru','brazil','south-africa','south-korea','australia','laos','philippines','malaysia','brunei'));
commit;
