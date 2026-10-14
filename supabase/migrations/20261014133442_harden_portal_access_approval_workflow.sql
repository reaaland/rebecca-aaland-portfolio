-- Harden the portal access-request workflow to use RLS for public inserts
-- and SECURITY INVOKER for administrator decisions.
-- Remote migration version: 20261014133442

drop function public.request_portal_access(text, text, text, text);

alter table public.portal_access_requests
  add constraint portal_access_requests_contact_name_length_check
    check (length(trim(contact_name)) between 2 and 100),
  add constraint portal_access_requests_business_name_length_check
    check (business_name is null or length(trim(business_name)) between 1 and 150),
  add constraint portal_access_requests_email_format_check
    check (
      length(email) <= 254
      and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    ),
  add constraint portal_access_requests_reason_length_check
    check (reason is null or length(reason) <= 1000),
  add constraint portal_access_requests_decision_reason_length_check
    check (decision_reason is null or length(decision_reason) <= 1000);

grant insert on public.portal_access_requests to anon;

create policy "visitors submit pending access requests"
on public.portal_access_requests
for insert
to anon
with check (
  status = 'pending'
  and decision_reason is null
  and decided_at is null
  and decided_by is null
  and approved_client_id is null
);

grant update on public.portal_access_requests to authenticated;

create policy "portal admins update access requests"
on public.portal_access_requests
for update
to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));

create or replace function public.decide_portal_access_request(
  p_request_id uuid,
  p_approve boolean,
  p_decision_reason text default null
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  access_request public.portal_access_requests%rowtype;
  normalized_reason text := nullif(trim(coalesce(p_decision_reason, '')), '');
  client_id uuid;
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
