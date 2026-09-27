-- Aaland Client Portal: initial secure data foundation
-- Remote migration version: 20260927213028
-- Project: aaland-client-portal (lfqxfnncuygstugjpzbo)

create type public.client_status as enum ('active', 'inactive');
create type public.portal_service_type as enum (
  'website_build',
  'website_updates',
  'site_care',
  'technical_writing',
  'grant_research_writing',
  'business_support',
  'other'
);
create type public.portal_service_status as enum ('active', 'paused', 'completed', 'cancelled');
create type public.portal_request_type as enum (
  'website_update',
  'upload_photos',
  'change_business_information',
  'add_something_new',
  'something_else'
);
create type public.portal_request_status as enum ('received', 'working', 'complete');

create table public.portal_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  contact_name text not null,
  business_name text,
  email text not null,
  phone text,
  status public.client_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index clients_email_lower_key on public.clients (lower(email));
create index clients_auth_user_id_idx on public.clients (auth_user_id);

create table public.client_websites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  url text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, client_id)
);

create index client_websites_client_id_idx on public.client_websites (client_id);
create unique index client_websites_one_primary_per_client
  on public.client_websites (client_id)
  where is_primary;

create table public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  service_type public.portal_service_type not null,
  service_name text not null,
  status public.portal_service_status not null default 'active',
  client_visible_summary text,
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, client_id)
);

create index client_services_client_id_idx on public.client_services (client_id);
create index client_services_client_status_idx on public.client_services (client_id, status);

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  website_id uuid,
  service_id uuid,
  request_type public.portal_request_type not null,
  title text,
  description text not null,
  location_on_site text,
  replacement_text text,
  desired_timing text,
  additional_notes text,
  status public.portal_request_status not null default 'received',
  client_visible_completion_note text,
  created_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (id, client_id),
  constraint service_requests_website_client_fk
    foreign key (website_id, client_id)
    references public.client_websites(id, client_id)
    on delete restrict,
  constraint service_requests_service_client_fk
    foreign key (service_id, client_id)
    references public.client_services(id, client_id)
    on delete restrict,
  constraint service_requests_complete_timestamp_check
    check (
      (status = 'complete' and completed_at is not null)
      or
      (status <> 'complete' and completed_at is null)
    )
);

create index service_requests_client_id_idx on public.service_requests (client_id);
create index service_requests_client_status_created_idx
  on public.service_requests (client_id, status, created_at desc);
create index service_requests_status_created_idx
  on public.service_requests (status, created_at desc);

create table public.request_attachments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null,
  client_id uuid not null references public.clients(id) on delete cascade,
  storage_bucket text not null default 'client-request-files',
  storage_path text not null unique,
  original_filename text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  uploaded_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint request_attachments_request_client_fk
    foreign key (request_id, client_id)
    references public.service_requests(id, client_id)
    on delete cascade,
  constraint request_attachments_path_check
    check (storage_path like client_id::text || '/' || request_id::text || '/%')
);

create index request_attachments_request_id_idx on public.request_attachments (request_id);
create index request_attachments_client_id_idx on public.request_attachments (client_id);

create table public.request_status_history (
  id bigint generated always as identity primary key,
  request_id uuid not null,
  client_id uuid not null references public.clients(id) on delete cascade,
  status public.portal_request_status not null,
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now(),
  constraint request_status_history_request_client_fk
    foreign key (request_id, client_id)
    references public.service_requests(id, client_id)
    on delete cascade
);

create index request_status_history_request_changed_idx
  on public.request_status_history (request_id, changed_at desc);
create index request_status_history_client_id_idx
  on public.request_status_history (client_id);

create table public.request_admin_notes (
  id bigint generated always as identity primary key,
  request_id uuid not null references public.service_requests(id) on delete cascade,
  note text not null,
  created_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create index request_admin_notes_request_id_idx on public.request_admin_notes (request_id);

create or replace function public.is_portal_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portal_admins pa
    where pa.user_id = (select auth.uid())
  );
$$;

create or replace function public.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select c.id
  from public.clients c
  where c.auth_user_id = (select auth.uid())
  limit 1;
$$;

revoke all on function public.is_portal_admin() from public;
revoke all on function public.current_client_id() from public;
grant execute on function public.is_portal_admin() to authenticated;
grant execute on function public.current_client_id() to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

create trigger clients_set_updated_at
before update on public.clients
for each row execute function public.set_updated_at();

create trigger client_websites_set_updated_at
before update on public.client_websites
for each row execute function public.set_updated_at();

create trigger client_services_set_updated_at
before update on public.client_services
for each row execute function public.set_updated_at();

create or replace function public.prepare_service_request_status()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.status = 'complete' then
    if tg_op = 'INSERT' then
      new.completed_at = coalesce(new.completed_at, now());
    elsif old.status is distinct from 'complete' then
      new.completed_at = coalesce(new.completed_at, now());
    end if;
  else
    new.completed_at = null;
  end if;

  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.prepare_service_request_status() from public;

create trigger service_requests_prepare_status
before insert or update on public.service_requests
for each row execute function public.prepare_service_request_status();

create or replace function public.log_service_request_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' or old.status is distinct from new.status then
    insert into public.request_status_history (
      request_id,
      client_id,
      status,
      changed_by
    )
    values (
      new.id,
      new.client_id,
      new.status,
      (select auth.uid())
    );
  end if;

  return new;
end;
$$;

revoke all on function public.log_service_request_status() from public;

create trigger service_requests_log_status
after insert or update of status on public.service_requests
for each row execute function public.log_service_request_status();

alter table public.portal_admins enable row level security;
alter table public.clients enable row level security;
alter table public.client_websites enable row level security;
alter table public.client_services enable row level security;
alter table public.service_requests enable row level security;
alter table public.request_attachments enable row level security;
alter table public.request_status_history enable row level security;
alter table public.request_admin_notes enable row level security;

create policy "portal admins manage portal admins"
on public.portal_admins
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "clients read own client record"
on public.clients
for select
to authenticated
using (
  auth_user_id = (select auth.uid())
  or (select public.is_portal_admin())
);

create policy "portal admins manage clients"
on public.clients
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "clients read own websites"
on public.client_websites
for select
to authenticated
using (
  client_id = (select public.current_client_id())
  or (select public.is_portal_admin())
);

create policy "portal admins manage websites"
on public.client_websites
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "clients read own services"
on public.client_services
for select
to authenticated
using (
  client_id = (select public.current_client_id())
  or (select public.is_portal_admin())
);

create policy "portal admins manage services"
on public.client_services
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "clients read own requests"
on public.service_requests
for select
to authenticated
using (
  client_id = (select public.current_client_id())
  or (select public.is_portal_admin())
);

create policy "clients submit own received requests"
on public.service_requests
for insert
to authenticated
with check (
  (
    client_id = (select public.current_client_id())
    and created_by = (select auth.uid())
    and status = 'received'
    and completed_at is null
    and client_visible_completion_note is null
  )
  or (select public.is_portal_admin())
);

create policy "portal admins update requests"
on public.service_requests
for update
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "portal admins delete requests"
on public.service_requests
for delete
to authenticated
using ((select public.is_portal_admin()));

create policy "clients read own attachment metadata"
on public.request_attachments
for select
to authenticated
using (
  client_id = (select public.current_client_id())
  or (select public.is_portal_admin())
);

create policy "clients add own attachment metadata"
on public.request_attachments
for insert
to authenticated
with check (
  (
    client_id = (select public.current_client_id())
    and uploaded_by = (select auth.uid())
    and exists (
      select 1
      from public.service_requests r
      where r.id = request_id
        and r.client_id = (select public.current_client_id())
    )
  )
  or (select public.is_portal_admin())
);

create policy "portal admins manage attachment metadata"
on public.request_attachments
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "clients read own status history"
on public.request_status_history
for select
to authenticated
using (
  client_id = (select public.current_client_id())
  or (select public.is_portal_admin())
);

create policy "portal admins manage status history"
on public.request_status_history
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

create policy "portal admins manage internal notes"
on public.request_admin_notes
for all
to authenticated
using ((select public.is_portal_admin()))
with check ((select public.is_portal_admin()));

grant select, insert, update, delete on public.portal_admins to authenticated;
grant select, insert, update, delete on public.clients to authenticated;
grant select, insert, update, delete on public.client_websites to authenticated;
grant select, insert, update, delete on public.client_services to authenticated;
grant select, insert, update, delete on public.service_requests to authenticated;
grant select, insert, update, delete on public.request_attachments to authenticated;
grant select, insert, update, delete on public.request_status_history to authenticated;
grant select, insert, update, delete on public.request_admin_notes to authenticated;
grant usage, select on sequence public.request_status_history_id_seq to authenticated;
grant usage, select on sequence public.request_admin_notes_id_seq to authenticated;

revoke all on public.portal_admins from anon;
revoke all on public.clients from anon;
revoke all on public.client_websites from anon;
revoke all on public.client_services from anon;
revoke all on public.service_requests from anon;
revoke all on public.request_attachments from anon;
revoke all on public.request_status_history from anon;
revoke all on public.request_admin_notes from anon;

create policy "clients read own request files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'client-request-files'
  and (
    (
      (storage.foldername(name))[1] = (select public.current_client_id())::text
      and exists (
        select 1
        from public.service_requests r
        where r.client_id = (select public.current_client_id())
          and r.id::text = (storage.foldername(name))[2]
      )
    )
    or (select public.is_portal_admin())
  )
);

create policy "clients upload own request files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'client-request-files'
  and (
    (
      (storage.foldername(name))[1] = (select public.current_client_id())::text
      and exists (
        select 1
        from public.service_requests r
        where r.client_id = (select public.current_client_id())
          and r.id::text = (storage.foldername(name))[2]
      )
    )
    or (select public.is_portal_admin())
  )
);

create policy "portal admins update request files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'client-request-files'
  and (select public.is_portal_admin())
)
with check (
  bucket_id = 'client-request-files'
  and (select public.is_portal_admin())
);

create policy "portal admins delete request files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'client-request-files'
  and (select public.is_portal_admin())
);
