-- Adds four destinations without changing existing saved trips.
begin;
alter table public.travel_easy_trips drop constraint if exists travel_easy_trips_country_check;
alter table public.travel_easy_trips add constraint travel_easy_trips_country_check check (country in ('mexico','japan','portugal','italy','argentina','thailand','egypt','new-zealand','united-states','vietnam','colombia','morocco','spain','greece','costa-rica','indonesia'));
commit;
