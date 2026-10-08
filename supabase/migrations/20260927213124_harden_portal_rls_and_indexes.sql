-- Aaland Client Portal: security hardening and supporting indexes
-- Remote migration version: 20260927213124
-- Project: aaland-client-portal (lfqxfnncuygstugjpzbo)

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

alter function public.is_portal_admin() set schema private;
alter function public.current_client_id() set schema private;

revoke all on function private.is_portal_admin() from public, anon;
revoke all on function private.current_client_id() from public, anon;
grant execute on function private.is_portal_admin() to authenticated;
grant execute on function private.current_client_id() to authenticated;

revoke all on function public.rls_auto_enable() from public, anon, authenticated;

drop policy if exists "portal admins manage clients" on public.clients;
create policy "portal admins insert clients"
on public.clients for insert to authenticated
with check ((select private.is_portal_admin()));
create policy "portal admins update clients"
on public.clients for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create policy "portal admins delete clients"
on public.clients for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "portal admins manage websites" on public.client_websites;
create policy "portal admins insert websites"
on public.client_websites for insert to authenticated
with check ((select private.is_portal_admin()));
create policy "portal admins update websites"
on public.client_websites for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create policy "portal admins delete websites"
on public.client_websites for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "portal admins manage services" on public.client_services;
create policy "portal admins insert services"
on public.client_services for insert to authenticated
with check ((select private.is_portal_admin()));
create policy "portal admins update services"
on public.client_services for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create policy "portal admins delete services"
on public.client_services for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "portal admins manage attachment metadata" on public.request_attachments;
create policy "portal admins update attachment metadata"
on public.request_attachments for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create policy "portal admins delete attachment metadata"
on public.request_attachments for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "portal admins manage status history" on public.request_status_history;
create policy "portal admins insert status history"
on public.request_status_history for insert to authenticated
with check ((select private.is_portal_admin()));
create policy "portal admins update status history"
on public.request_status_history for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));
create policy "portal admins delete status history"
on public.request_status_history for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "clients read own websites" on public.client_websites;
create policy "clients read own websites"
on public.client_websites for select to authenticated
using (
  client_id = (select private.current_client_id())
  or (select private.is_portal_admin())
);

drop policy if exists "clients read own services" on public.client_services;
create policy "clients read own services"
on public.client_services for select to authenticated
using (
  client_id = (select private.current_client_id())
  or (select private.is_portal_admin())
);

drop policy if exists "clients read own requests" on public.service_requests;
create policy "clients read own requests"
on public.service_requests for select to authenticated
using (
  client_id = (select private.current_client_id())
  or (select private.is_portal_admin())
);

drop policy if exists "clients submit own received requests" on public.service_requests;
create policy "clients submit own received requests"
on public.service_requests for insert to authenticated
with check (
  (
    client_id = (select private.current_client_id())
    and created_by = (select auth.uid())
    and status = 'received'
    and completed_at is null
    and client_visible_completion_note is null
  )
  or (select private.is_portal_admin())
);

drop policy if exists "portal admins update requests" on public.service_requests;
create policy "portal admins update requests"
on public.service_requests for update to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));

drop policy if exists "portal admins delete requests" on public.service_requests;
create policy "portal admins delete requests"
on public.service_requests for delete to authenticated
using ((select private.is_portal_admin()));

drop policy if exists "clients read own attachment metadata" on public.request_attachments;
create policy "clients read own attachment metadata"
on public.request_attachments for select to authenticated
using (
  client_id = (select private.current_client_id())
  or (select private.is_portal_admin())
);

drop policy if exists "clients add own attachment metadata" on public.request_attachments;
create policy "clients add own attachment metadata"
on public.request_attachments for insert to authenticated
with check (
  (
    client_id = (select private.current_client_id())
    and uploaded_by = (select auth.uid())
    and exists (
      select 1
      from public.service_requests r
      where r.id = request_id
        and r.client_id = (select private.current_client_id())
    )
  )
  or (select private.is_portal_admin())
);

drop policy if exists "clients read own status history" on public.request_status_history;
create policy "clients read own status history"
on public.request_status_history for select to authenticated
using (
  client_id = (select private.current_client_id())
  or (select private.is_portal_admin())
);

drop policy if exists "portal admins manage internal notes" on public.request_admin_notes;
create policy "portal admins manage internal notes"
on public.request_admin_notes for all to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));

drop policy if exists "portal admins manage portal admins" on public.portal_admins;
create policy "portal admins manage portal admins"
on public.portal_admins for all to authenticated
using ((select private.is_portal_admin()))
with check ((select private.is_portal_admin()));

drop policy if exists "clients read own client record" on public.clients;
create policy "clients read own client record"
on public.clients for select to authenticated
using (
  auth_user_id = (select auth.uid())
  or (select private.is_portal_admin())
);

drop policy if exists "clients read own request files" on storage.objects;
create policy "clients read own request files"
on storage.objects for select to authenticated
using (
  bucket_id = 'client-request-files'
  and (
    (
      (storage.foldername(name))[1] = (select private.current_client_id())::text
      and exists (
        select 1 from public.service_requests r
        where r.client_id = (select private.current_client_id())
          and r.id::text = (storage.foldername(name))[2]
      )
    )
    or (select private.is_portal_admin())
  )
);

drop policy if exists "clients upload own request files" on storage.objects;
create policy "clients upload own request files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'client-request-files'
  and (
    (
      (storage.foldername(name))[1] = (select private.current_client_id())::text
      and exists (
        select 1 from public.service_requests r
        where r.client_id = (select private.current_client_id())
          and r.id::text = (storage.foldername(name))[2]
      )
    )
    or (select private.is_portal_admin())
  )
);

drop policy if exists "portal admins update request files" on storage.objects;
create policy "portal admins update request files"
on storage.objects for update to authenticated
using (
  bucket_id = 'client-request-files'
  and (select private.is_portal_admin())
)
with check (
  bucket_id = 'client-request-files'
  and (select private.is_portal_admin())
);

drop policy if exists "portal admins delete request files" on storage.objects;
create policy "portal admins delete request files"
on storage.objects for delete to authenticated
using (
  bucket_id = 'client-request-files'
  and (select private.is_portal_admin())
);

create index if not exists request_admin_notes_created_by_idx
  on public.request_admin_notes (created_by);
create index if not exists request_attachments_request_client_idx
  on public.request_attachments (request_id, client_id);
create index if not exists request_attachments_uploaded_by_idx
  on public.request_attachments (uploaded_by);
create index if not exists request_status_history_changed_by_idx
  on public.request_status_history (changed_by);
create index if not exists request_status_history_request_client_idx
  on public.request_status_history (request_id, client_id);
create index if not exists service_requests_created_by_idx
  on public.service_requests (created_by);
create index if not exists service_requests_service_client_idx
  on public.service_requests (service_id, client_id);
create index if not exists service_requests_website_client_idx
  on public.service_requests (website_id, client_id);
