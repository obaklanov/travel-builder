-- Run in the Travel Atlas Supabase project used by Travel Builder.
-- Changes only the Travel Builder trip table; preserves saved trips and existing access policies.
begin;
alter table public.travel_builder_trips drop constraint if exists travel_builder_trips_group_size_check;
alter table public.travel_builder_trips add constraint travel_builder_trips_group_size_check check (group_size between 1 and 10);
commit;
