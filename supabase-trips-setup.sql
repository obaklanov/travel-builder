-- Run in the existing Supabase project's SQL Editor. Preserves existing profiles.
begin;
create table if not exists public.travel_easy_trips (
 id uuid primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 country text not null check (country in ('mexico','japan','portugal','italy','argentina','thailand','egypt','new-zealand','united-states','vietnam','colombia','morocco','spain','greece','costa-rica','indonesia')),
 origin text not null check (origin in ('YYZ','YVR','YUL','YYC','YEG')),
 origin_label text not null check (length(origin_label) between 1 and 160),
 departure_date date not null,
 return_date date not null,
 days integer not null check (days between 1 and 365),
 estimated_total numeric(12,2) not null check (estimated_total >= 0),
 budget numeric(12,2) check (budget > 0),
 currency text not null default 'CAD' check (currency = 'CAD'),
 created_at timestamptz not null default now(),
 check (return_date = departure_date + days - 1)
);
alter table public.travel_easy_trips enable row level security;
revoke all on public.travel_easy_trips from public, anon, authenticated;
grant select, insert, update on public.travel_easy_trips to authenticated;
drop policy if exists trips_read_own on public.travel_easy_trips;
create policy trips_read_own on public.travel_easy_trips for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists trips_insert_own on public.travel_easy_trips;
create policy trips_insert_own on public.travel_easy_trips for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists trips_update_own on public.travel_easy_trips;
create policy trips_update_own on public.travel_easy_trips for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create index if not exists travel_easy_trips_user_date on public.travel_easy_trips(user_id, departure_date);
commit;

-- Trip removal permissions.
begin;
grant delete on table public.travel_easy_trips to authenticated;
drop policy if exists trips_delete_own on public.travel_easy_trips;
create policy trips_delete_own on public.travel_easy_trips
  for delete to authenticated using ((select auth.uid()) = user_id);
commit;
