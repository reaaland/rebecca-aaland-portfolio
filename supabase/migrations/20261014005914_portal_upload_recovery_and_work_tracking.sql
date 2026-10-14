-- Additive: old clients and existing requests keep working.
alter table public.service_requests
  add column expected_attachment_count integer not null default 0
    check (expected_attachment_count between 0 and 10),
  add column upload_complete boolean not null default true;

create function private.prepare_request_upload()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    new.upload_complete := new.expected_attachment_count = 0;
  end if;
  if new.status = 'complete' and not new.upload_complete then
    raise exception 'Files are still missing. Finish the upload before marking this request complete.';
  end if;
  return new;
end;
$$;
revoke all on function private.prepare_request_upload() from public, anon, authenticated;
create trigger service_requests_prepare_upload
before insert or update on public.service_requests
for each row execute function private.prepare_request_upload();

-- Privileged work is confined to a private function with explicit current-user
-- ownership checks. Clients receive no general UPDATE policy on requests.
create function private.complete_request_upload(request_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  request public.service_requests;
  uploaded integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into request from public.service_requests r
  where r.id = request_id and r.client_id = private.current_client_id()
    and r.created_by = auth.uid()
  for update;
  if not found then raise exception 'Request unavailable'; end if;
  if request.upload_complete then return; end if;
  select count(*) into uploaded from public.request_attachments a
  join storage.objects o on o.bucket_id = 'client-request-files' and o.name = a.storage_path
  where a.request_id = request.id and a.client_id = request.client_id;
  if uploaded <> request.expected_attachment_count then
    raise exception 'Expected % files, received %', request.expected_attachment_count, uploaded;
  end if;
  update public.service_requests set upload_complete = true where id = request.id;
end;
$$;
revoke all on function private.complete_request_upload(uuid) from public, anon;
grant execute on function private.complete_request_upload(uuid) to authenticated;

create function public.complete_request_upload(request_id uuid)
returns void language sql security invoker set search_path = '' as $$
  select private.complete_request_upload(request_id);
$$;
revoke all on function public.complete_request_upload(uuid) from public, anon;
grant execute on function public.complete_request_upload(uuid) to authenticated;

-- Time is internal business information; clients cannot read or write it.
create table public.request_work_logs (
  id bigint generated always as identity primary key,
  request_id uuid not null references public.service_requests(id) on delete cascade,
  minutes integer not null check (minutes between 1 and 1440),
  note text,
  created_by uuid not null default auth.uid() references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);
alter table public.request_work_logs enable row level security;
revoke all on public.request_work_logs from anon;
grant select, insert, update, delete on public.request_work_logs to authenticated;
grant usage, select on sequence public.request_work_logs_id_seq to authenticated;
create policy "portal admins manage work logs" on public.request_work_logs
for all to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create index request_work_logs_request_id_idx on public.request_work_logs(request_id);
create index request_work_logs_created_by_idx on public.request_work_logs(created_by);
