begin;
-- Existing unique index remains the final guard against simultaneous name claims.
create unique index if not exists traveller_profiles_nickname_unique
  on public.traveller_profiles (lower(nickname));
create or replace function public.travel_easy_name_available(candidate text)
returns boolean language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null
    and btrim(candidate) ~ '^[A-Za-z0-9_]{3,24}$'
    and not exists (
      select 1 from public.traveller_profiles p
      where lower(p.nickname) = lower(btrim(candidate))
        and p.id <> (select auth.uid())
    );
$$;
revoke all on function public.travel_easy_name_available(text) from public, anon;
grant execute on function public.travel_easy_name_available(text) to authenticated;
commit;
