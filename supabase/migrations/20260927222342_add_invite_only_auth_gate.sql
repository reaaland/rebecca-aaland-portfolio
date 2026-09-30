-- Aaland Client Portal: invite-only auth gate and first-login account linking.
-- Remote migration version: 20260927222342

create table public.portal_admin_invites (
  email text primary key,
  created_at timestamptz not null default now(),
  constraint portal_admin_invites_email_lowercase_check
    check (email = lower(email))
);

alter table public.portal_admin_invites enable row level security;

revoke all on public.portal_admin_invites from anon, authenticated;

insert into public.portal_admin_invites (email)
values ('rebecca@pawcirclellc.com');

grant usage on schema private to supabase_auth_admin;

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
    from public.portal_admin_invites a
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

revoke all on function private.hook_allow_approved_portal_user(jsonb)
  from public, anon, authenticated;
grant execute on function private.hook_allow_approved_portal_user(jsonb)
  to supabase_auth_admin;

create or replace function private.link_new_portal_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text;
begin
  normalized_email := lower(trim(coalesce(new.email, '')));

  if normalized_email = '' then
    return new;
  end if;

  if exists (
    select 1
    from public.portal_admin_invites a
    where a.email = normalized_email
  ) then
    insert into public.portal_admins (user_id)
    values (new.id)
    on conflict (user_id) do nothing;

    return new;
  end if;

  update public.clients
  set auth_user_id = new.id
  where lower(email) = normalized_email
    and status = 'active'
    and auth_user_id is null;

  return new;
end;
$$;

revoke all on function private.link_new_portal_auth_user()
  from public, anon, authenticated;

drop trigger if exists on_auth_user_created_link_portal_account on auth.users;

create trigger on_auth_user_created_link_portal_account
after insert on auth.users
for each row
execute function private.link_new_portal_auth_user();
