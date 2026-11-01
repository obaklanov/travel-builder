-- Allow each signed-in user to delete only their own trips. Existing trips are preserved.
begin;
grant delete on table public.travel_easy_trips to authenticated;
drop policy if exists trips_delete_own on public.travel_easy_trips;
create policy trips_delete_own on public.travel_easy_trips
  for delete to authenticated using ((select auth.uid()) = user_id);
commit;
