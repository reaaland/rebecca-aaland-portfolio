-- Run against the dedicated portal database. Everything, including the test
-- auth users and synthetic Storage metadata, is rolled back. No emails sent.
begin;
create temporary table portal_test_results (check_name text, passed boolean);
grant all on portal_test_results to authenticated, anon;
create function pg_temp.assert_portal(condition boolean, name text)
returns void language plpgsql security invoker as $$
begin
 if condition is distinct from true then raise exception 'FAIL: %',name; end if;
 insert into portal_test_results values(name,true);
end; $$;

insert into public.clients(id,email,contact_name) values
 ('aa100000-0000-4000-8000-000000000001','portal-qa-a@example.invalid','QA A'),
 ('aa100000-0000-4000-8000-000000000002','portal-qa-b@example.invalid','QA B');
insert into auth.users(id,email,role,aud) values
 ('aa200000-0000-4000-8000-000000000001','portal-qa-a@example.invalid','authenticated','authenticated'),
 ('aa200000-0000-4000-8000-000000000002','portal-qa-b@example.invalid','authenticated','authenticated'),
 ('aa200000-0000-4000-8000-000000000003','portal-qa-admin@example.invalid','authenticated','authenticated');
insert into public.portal_admins(user_id) values ('aa200000-0000-4000-8000-000000000003');
insert into public.client_websites(id,client_id,name,url) values
 ('aa300000-0000-4000-8000-000000000001','aa100000-0000-4000-8000-000000000001','QA A site','https://example.invalid'),
 ('aa300000-0000-4000-8000-000000000002','aa100000-0000-4000-8000-000000000002','QA B site','https://example.invalid');

set local role authenticated;
select set_config('request.jwt.claims','{"sub":"aa200000-0000-4000-8000-000000000001","role":"authenticated"}',true);
insert into public.service_requests(id,client_id,request_type,description,expected_attachment_count) values
 ('aa400000-0000-4000-8000-000000000001','aa100000-0000-4000-8000-000000000001','upload_photos','QA A upload',1);
select pg_temp.assert_portal((select not upload_complete from public.service_requests where id='aa400000-0000-4000-8000-000000000001'),'upload starts incomplete');
do $$ begin
 begin
  perform public.complete_request_upload('aa400000-0000-4000-8000-000000000001');
  raise exception 'unexpected completion';
 exception when others then
  if sqlerrm not like 'Expected % files, received %' then raise; end if;
 end;
 perform pg_temp.assert_portal(true,'cannot finalize missing files');
end $$;
insert into storage.objects(bucket_id,name,owner_id) values
 ('client-request-files','aa100000-0000-4000-8000-000000000001/aa400000-0000-4000-8000-000000000001/01-qa.png','aa200000-0000-4000-8000-000000000001');
insert into public.request_attachments(request_id,client_id,storage_path,original_filename) values
 ('aa400000-0000-4000-8000-000000000001','aa100000-0000-4000-8000-000000000001','aa100000-0000-4000-8000-000000000001/aa400000-0000-4000-8000-000000000001/01-qa.png','qa.png');
select public.complete_request_upload('aa400000-0000-4000-8000-000000000001');
select pg_temp.assert_portal((select upload_complete from public.service_requests where id='aa400000-0000-4000-8000-000000000001'),'finalizes own uploaded files');

select set_config('request.jwt.claims','{"sub":"aa200000-0000-4000-8000-000000000002","role":"authenticated"}',true);
insert into public.service_requests(id,client_id,request_type,description) values
 ('aa400000-0000-4000-8000-000000000002','aa100000-0000-4000-8000-000000000002','website_update','QA B request');
select pg_temp.assert_portal(not exists(select 1 from public.service_requests where id='aa400000-0000-4000-8000-000000000001'),'B cannot read A request');
select pg_temp.assert_portal(not exists(select 1 from public.request_attachments where client_id='aa100000-0000-4000-8000-000000000001'),'B cannot read A attachment metadata');
select pg_temp.assert_portal(not exists(select 1 from storage.objects where name like 'aa100000-0000-4000-8000-000000000001/%'),'B cannot list A storage objects');
select pg_temp.assert_portal(not exists(select 1 from public.client_websites where client_id='aa100000-0000-4000-8000-000000000001'),'B cannot read A website');
do $$ declare affected integer; begin
 update public.service_requests set description='BAD' where id='aa400000-0000-4000-8000-000000000001';
 get diagnostics affected = row_count;
 perform pg_temp.assert_portal(affected=0,'B cannot update A request');
 delete from public.service_requests where id='aa400000-0000-4000-8000-000000000001';
 get diagnostics affected = row_count;
 perform pg_temp.assert_portal(affected=0,'B cannot delete A request');
 begin
  insert into public.service_requests(client_id,request_type,description) values('aa100000-0000-4000-8000-000000000001','website_update','BAD');
  raise exception 'unexpected insert';
 exception when insufficient_privilege then null; end;
 perform pg_temp.assert_portal(true,'B cannot submit as A');
 begin
  perform public.complete_request_upload('aa400000-0000-4000-8000-000000000001');
  raise exception 'unexpected completion';
 exception when others then if sqlerrm <> 'Request unavailable' then raise; end if; end;
 perform pg_temp.assert_portal(true,'B cannot finalize A upload');
 begin
  insert into storage.objects(bucket_id,name) values('client-request-files','aa100000-0000-4000-8000-000000000001/aa400000-0000-4000-8000-000000000001/bad.png');
  raise exception 'unexpected upload';
 exception when insufficient_privilege then null; end;
 perform pg_temp.assert_portal(true,'B cannot upload into A path');
end $$;

select set_config('request.jwt.claims','{"sub":"aa200000-0000-4000-8000-000000000003","role":"authenticated"}',true);
insert into public.request_admin_notes(request_id,note) values('aa400000-0000-4000-8000-000000000001','QA private note');
insert into public.request_work_logs(request_id,minutes) values('aa400000-0000-4000-8000-000000000001',15);
select pg_temp.assert_portal(exists(select 1 from public.service_requests where id='aa400000-0000-4000-8000-000000000001'),'admin can read client requests');
select set_config('request.jwt.claims','{"sub":"aa200000-0000-4000-8000-000000000001","role":"authenticated"}',true);
select pg_temp.assert_portal(not exists(select 1 from public.request_admin_notes),'client cannot read private admin notes');
select pg_temp.assert_portal(not exists(select 1 from public.request_work_logs),'client cannot read work time');
select pg_temp.assert_portal(not exists(select 1 from public.service_requests where id='aa400000-0000-4000-8000-000000000002'),'A cannot read B request');

reset role;
update public.clients set status='inactive' where id='aa100000-0000-4000-8000-000000000001';
set local role authenticated;
-- Same JWT: deactivation must work without needing a fresh sign-in.
select pg_temp.assert_portal(private.current_client_id() is null,'inactive identity no longer resolves');
select pg_temp.assert_portal(not exists(select 1 from public.service_requests where client_id='aa100000-0000-4000-8000-000000000001'),'inactive session cannot read requests');
select pg_temp.assert_portal(not exists(select 1 from public.clients where id='aa100000-0000-4000-8000-000000000001'),'inactive session cannot read client record');
select pg_temp.assert_portal(not exists(select 1 from storage.objects where name like 'aa100000-0000-4000-8000-000000000001/%'),'inactive session cannot list storage');
do $$ begin
 begin
  insert into public.service_requests(client_id,request_type,description) values('aa100000-0000-4000-8000-000000000001','website_update','BAD');
  raise exception 'unexpected insert';
 exception when insufficient_privilege then null; end;
 perform pg_temp.assert_portal(true,'inactive session cannot submit');
end $$;
reset role;
select jsonb_agg(jsonb_build_object('check',check_name,'passed',passed)) as results from portal_test_results;
rollback;
