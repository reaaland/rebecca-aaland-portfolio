-- Keep inactive client records for history while removing portal access.
-- This migration was applied to the hosted aaland-client-portal project during
-- the October 6 audit recovery and is committed here to keep Git history in sync.

create or replace function private.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select c.id
  from public.clients c
  where c.auth_user_id = (select auth.uid())
    and c.status = 'active'
  limit 1;
$$;

create or replace function private.hook_allow_approved_portal_user(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  candidate_email text;
begin
  candidate_email := lower(trim(coalesce(event->'user'->>'email', '')));

  if candidate_email = '' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'message', 'An email address is required for portal access.',
        'http_code', 403
      )
    );
  end if;

  if exists (
    select 1
    from public.clients c
    where lower(c.email) = candidate_email
      and c.status = 'active'
  ) or exists (
    select 1
    from private.portal_admin_invites a
    where a.email = candidate_email
  ) then
    return '{}'::jsonb;
  end if;

  return jsonb_build_object(
    'error', jsonb_build_object(
      'message', 'Portal access is by invitation only. Please contact Aaland Web Design if you need access.',
      'http_code', 403
    )
  );
end;
$$;

drop policy if exists "clients read own client record" on public.clients;
create policy "clients read own client record"
on public.clients
for select
to authenticated
using (
  (auth_user_id = (select auth.uid()) and status = 'active')
  or (select private.is_portal_admin())
);
