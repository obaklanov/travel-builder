-- Extend the allowed country list without changing saved trips.
begin;
alter table public.travel_easy_trips drop constraint if exists travel_easy_trips_country_check;
alter table public.travel_easy_trips add constraint travel_easy_trips_country_check check (country in ('mexico','thailand','portugal','japan','italy','argentina','egypt','new-zealand','united-states','vietnam','colombia','morocco'));
commit;
