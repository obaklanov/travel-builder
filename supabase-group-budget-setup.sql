-- Preserve existing trips and record the group size for future saved trips.
begin;
alter table public.travel_easy_trips add column if not exists group_size integer not null default 1;
alter table public.travel_easy_trips drop constraint if exists travel_easy_trips_group_size_check;
alter table public.travel_easy_trips add constraint travel_easy_trips_group_size_check check (group_size between 1 and 4);
commit;
