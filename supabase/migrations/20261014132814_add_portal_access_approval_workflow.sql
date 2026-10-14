-- Portal access request and approval workflow.
-- Remote migration version: 20261014132814

create table public.portal_access_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  business_name text,
  email text not null,
  reason text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  decision_reason text,
  decided_at timestamptz,
  decided_by uuid references auth.users(id) on delete set null,
  approved_client_id uuid references public.clients(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint portal_access_requests_email_lowercase_check
    check (email = lower(email))
);

create unique index portal_access_requests_one_pending_email_idx
  on public.portal_access_requests (email)
  where status = 'pending';

alter table public.portal_access_requests enable row level security;

revoke all on public.portal_access_requests from public, anon, authenticated;
grant select on public.portal_access_requests to authenticated;

create policy "portal admins read access requests"
on public.portal_access_requests
for select
to authenticated
using ((select private.is_portal_admin()));

create or replace function public.request_portal_access(
  p_contact_name text,
  p_email text,
  p_business_name text default null,
  p_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_name text := trim(coalesce(p_contact_name, ''));
  normalized_email text := lower(trim(coalesce(p_email, '')));
  normalized_business text := nullif(trim(coalesce(p_business_name, '')), '');
  normalized_reason text := nullif(trim(coalesce(p_reason, '')), '');
  existing_request_id uuid;
  new_request_id uuid;
begin
  if length(normalized_name) < 2 or length(normalized_name) > 100 then
    raise exception 'Please enter your name.';
  end if;

  if length(normalized_email) > 254
     or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$' then
    raise exception 'Please enter a valid email address.';
  end if;

  if normalized_business is not null and length(normalized_business) > 150 then
    raise exception 'Business name is too long.';
  end if;

  if normalized_reason is not null and length(normalized_reason) > 1000 then
    raise exception 'Reason is too long.';
  end if;

  if exists (
    select 1
    from public.clients c
    where lower(c.email) = normalized_email
      and c.status = 'active'
  ) or exists (
    select 1
    from private.portal_admin_invites a
    where a.email = normalized_email
  ) then
    return jsonb_build_object('status', 'already_approved');
  end if;

  select r.id
    into existing_request_id
  from public.portal_access_requests r
  where r.email = normalized_email
    and r.status = 'pending'
  limit 1;

  if existing_request_id is not null then
    return jsonb_build_object(
      'status', 'pending',
      'request_id', existing_request_id
    );
  end if;

  insert into public.portal_access_requests (
    contact_name,
    business_name,
    email,
    reason
  )
  values (
    normalized_name,
    normalized_business,
    normalized_email,
    normalized_reason
  )
  returning id into new_request_id;

  return jsonb_build_object(
    'status', 'created',
    'request_id', new_request_id
  );
end;
$$;

revoke all on function public.request_portal_access(text, text, text, text)
  from public;
grant execute on function public.request_portal_access(text, text, text, text)
  to anon, authenticated;

create or replace function public.decide_portal_access_request(
  p_request_id uuid,
  p_approve boolean,
  p_decision_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  access_request public.portal_access_requests%rowtype;
  normalized_reason text := nullif(trim(coalesce(p_decision_reason, '')), '');
  client_id uuid;
  existing_auth_user_id uuid;
begin
  if not private.is_portal_admin() then
    raise exception 'Administrator access required.';
  end if;

  if not p_approve and normalized_reason is null then
    raise exception 'A rejection reason is required.';
  end if;

  if normalized_reason is not null and length(normalized_reason) > 1000 then
    raise exception 'Decision reason is too long.';
  end if;

  select *
    into access_request
  from public.portal_access_requests
  where id = p_request_id
    and status = 'pending'
  for update;

  if access_request.id is null then
    raise exception 'This access request is no longer pending.';
  end if;

  if p_approve then
    select c.id
      into client_id
    from public.clients c
    where lower(c.email) = access_request.email
    order by (c.status = 'active') desc, c.created_at
    limit 1;

    if client_id is null then
      insert into public.clients (
        contact_name,
        business_name,
        email,
        status
      )
      values (
        access_request.contact_name,
        access_request.business_name,
        access_request.email,
        'active'
      )
      returning id into client_id;
    else
      update public.clients
      set contact_name = access_request.contact_name,
          business_name = coalesce(access_request.business_name, business_name),
          email = access_request.email,
          status = 'active',
          updated_at = now()
      where id = client_id;
    end if;

    select u.id
      into existing_auth_user_id
    from auth.users u
    where lower(u.email) = access_request.email
    limit 1;

    if existing_auth_user_id is not null then
      update public.clients
      set auth_user_id = existing_auth_user_id,
          updated_at = now()
      where id = client_id
        and auth_user_id is null;
    end if;

    update public.portal_access_requests
    set status = 'approved',
        decision_reason = normalized_reason,
        decided_at = now(),
        decided_by = auth.uid(),
        approved_client_id = client_id
    where id = access_request.id;

    return jsonb_build_object(
      'status', 'approved',
      'request_id', access_request.id,
      'client_id', client_id,
      'contact_name', access_request.contact_name,
      'email', access_request.email
    );
  end if;

  update public.portal_access_requests
  set status = 'rejected',
      decision_reason = normalized_reason,
      decided_at = now(),
      decided_by = auth.uid()
  where id = access_request.id;

  return jsonb_build_object(
    'status', 'rejected',
    'request_id', access_request.id,
    'contact_name', access_request.contact_name,
    'email', access_request.email,
    'decision_reason', normalized_reason
  );
end;
$$;

revoke all on function public.decide_portal_access_request(uuid, boolean, text)
  from public, anon;
grant execute on function public.decide_portal_access_request(uuid, boolean, text)
  to authenticated;

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
      'message', 'Portal access has not been approved for this email yet. Use Request access on the sign-in page.',
      'http_code', 403
    )
  );
end;
$$;
