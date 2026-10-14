# Aaland Client Portal — Production Source of Truth

Updated October 13, 2026.

## Purpose

The Aaland Client Portal is an invite-only client service inside the existing
`rebeccaiaaland.com` Next.js application. It gives active website clients one
place to submit website changes, upload files, and track request status.

The portal is not a separate website or Vercel project. Production entry point:

`https://www.rebeccaiaaland.com/portal/login`

Billing remains Phase 2.

## Current public business direction

Aaland Web Design & Business Solutions currently centers its public business
services on websites, website updates, and Site Care. Technical-writing material
lives under the portfolio/writing-samples area rather than as a primary business
service. The portal should not reintroduce retired service navigation or become
a duplicate sales catalog.

## Supabase project

- Organization: Aaland Web Design & Business Solutions
- Project: `aaland-client-portal`
- Project ref: `lfqxfnncuygstugjpzbo`
- Region: East US (Ohio / `us-east-2`)
- Data API: enabled
- Automatically expose new tables: disabled
- RLS: enabled on portal application tables

## Authentication and access

Client-facing sign-in options:

- Continue with Google
- Email me a secure sign-in link

Portal access is approval-based. The Before User Created hook
`private.hook_allow_approved_portal_user(event jsonb)` allows account creation
only for an approved active client email or an approved portal administrator.

An unapproved visitor can submit a portal access request from the sign-in page.
The anonymous submission is limited to a pending-only RLS insert with database
length/format constraints; anonymous users cannot read or decide requests.
Rebecca receives an email notification and can approve or reject the request
from the administrator dashboard. Rejection requires a reason. The decision
RPC is SECURITY INVOKER and runs under the signed-in administrator's existing
RLS permissions. Approval creates or reactivates the active client record before
the requester is emailed; that active client record immediately satisfies the
existing Auth hook, so the approved email can then sign in with Google or a
secure email link. No Supabase Auth user is created merely by requesting access.

Authentication identifies the user. Database RLS and private Storage policies,
not navigation visibility, enforce client-to-client isolation.

Inactive clients retain historical records but no longer qualify for active
portal access.

## Data model

- `portal_admins`
- `clients`
- `client_websites`
- `client_services`
- `service_requests`
- `request_attachments`
- `request_status_history`
- `request_admin_notes`
- `request_work_logs` (administrator-only work time)

Request statuses:

- Received
- Working on it
- Complete

Private admin notes are stored separately from client-readable request data.

## Client experience implemented

- `/portal/login`
- `/portal/dashboard`
- Website Update request
- Upload Photos / Files request
- Change Business Information request
- Add Something New request
- Something Else request
- Request detail/status/history
- Client-visible completion notes
- Secure private file access
- Responsive loading/skeleton states

Upload flows support validation, private storage, deterministic request paths,
and resumable retry behavior so an interrupted upload does not create a second
service request.

## Admin experience implemented

- Admin request queue on the portal dashboard
- Request detail
- Status updates
- Attached file access
- Client-visible completion notes
- Private administrator notes
- Request status history

## Storage

Private bucket:

`client-request-files`

Path convention:

`<client_id>/<request_id>/<number>-<safe_filename>`

Server-side bucket restrictions:

- private bucket
- maximum 15 MB per file
- JPEG
- PNG
- WebP
- GIF
- AVIF
- HEIC
- HEIF
- PDF

The browser performs matching extension/size validation, but Storage restrictions
remain the server-side enforcement layer.

## Backup and recovery

Database protection:

- Supabase organization plan: Pro.
- Automatic daily physical database backups are enabled.
- The current Pro retention window is seven days.
- Point-in-Time Recovery is not required for the portal's current scale.
- Restore database state from **Supabase → Database → Backups → Scheduled**.

Private-file protection:

- Supabase database backups include Storage metadata but do **not** include the
  uploaded file bytes in `client-request-files`.
- Maintain a separate authenticated off-site copy in the business Google Drive.
- Backup destination:
  `Aaland Web Design & Business Solutions / Client Portal / Backups / Supabase Storage / YYYY-MM-DD`
- Create one dated folder for each backup run and copy the private
  `client-request-files` objects into it.
- Minimum operating cadence: weekly while the portal contains active client
  files, plus an extra backup before destructive Storage cleanup or a major
  migration.
- Keep this Drive hierarchy private to the business account; do not make client
  backup folders publicly link-accessible.

Recovery procedure:

1. Restore the database from the closest appropriate Supabase scheduled backup.
2. Identify any Storage objects that are missing from the restored/current
   `client-request-files` bucket.
3. Restore the corresponding files from the latest appropriate dated Google
   Drive backup while preserving their original Storage object paths.
4. Verify attachment metadata, private Storage access, and client/admin file
   opening after recovery.
5. Test the procedure with synthetic data before relying on it for real client
   recovery.

Initial backup hierarchy created October 13, 2026. The first dated folder is
`2026-10-13`.

## Tracked remote migrations

- `20260927213028_initial_portal_foundation`
- `20260927213124_harden_portal_rls_and_indexes`
- `20260927222342_add_invite_only_auth_gate`
- `20260927222407_move_admin_invites_private`
- `20260927222419_add_explicit_admin_invite_deny_policy`
- `20261006024603_enforce_active_portal_clients`
- `20261013000744_restrict_client_request_file_types`
- `20261014005914_portal_upload_recovery_and_work_tracking`
- `20261014130517_update_portal_admin_invite_email`
- `20261014132814_add_portal_access_approval_workflow`
- `20261014133442_harden_portal_access_approval_workflow`

A separate historical `noop_test_cleanup` migration exists remotely but did
not introduce portal functionality.

## Search/privacy/security behavior

- Portal routes are excluded from the public sitemap.
- `/portal/` and `/portal-auth-test` are disallowed in `robots.txt`.
- The portal layout applies `noindex, nofollow`.
- Site Privacy Policy covers portal authentication, request data, and private
  client uploads.
- Site Terms cover invite-only access, uploaded content, and the fact that a
  portal request does not automatically expand contract scope.
- Baseline response security headers are configured in `next.config.ts`.

## Vercel configuration required

The existing `rebecca-aaland-portfolio` Vercel project must provide these
public Supabase settings to Preview and Production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

These are browser-visible Supabase project settings, not service-role secrets.

## Supabase Auth production configuration required

The canonical production redirect must be allowed:

`https://www.rebeccaiaaland.com/portal/login`

Preview/local redirect patterns should remain configured for testing.

## Final pre-merge verification

PR #8 remains draft and must not be merged without Rebecca's explicit approval.

Verified on the current preview / hosted project:

1. Approved client Google sign-in succeeds.
2. Approved client magic-link sign-in succeeds and returns to the portal.
3. Unapproved access is rejected by the invitation-only Auth hook.
4. Admin login succeeds.
5. All five request types submit successfully.
6. File upload, removal, interrupted-connection recovery, and retry work without
   duplicate service requests.
7. Client-visible completion notes display to the client.
8. Private admin notes do not display to clients.
9. Two real browser sessions remain separate; Client A receives "Request
   unavailable" when attempting to open Client B's request URL.
10. Hosted transactional tests also cover inactive-client database/Storage
    authorization.
11. Dashboard, request/detail screens, review/success states, and mobile
    navigation were checked at narrow width.
12. Client/admin file opening, admin filters, pending-upload indicators, and
    work-time logging work in Chrome.
13. Production environment variables and Auth redirect configuration are
    confirmed.
14. Supabase Pro daily physical database backups with seven-day retention are
    confirmed.
15. The admin invite allow-list now contains only
    `rebecca@rebeccaiaaland.com`; the existing linked administrator auth user ID
    is intentionally preserved.
16. Access-request approval/rejection database flow passed transactional
    verification: approval creates an active client and the Auth hook allows the
    email; rejection creates no client and the Auth hook continues to return
    403. The QA rows were rolled back.
17. Supabase Security Advisor was rerun after hardening the access workflow; no
    new schema/RLS or public SECURITY DEFINER findings remain.

Remaining operational cleanup before relying on backups for real client files:

- The six orphaned QA Storage objects must be copied to the first dated Google
  Drive backup folder (if retained as backup evidence) or removed through the
  authorized Storage API. Their database attachment/request rows are already
  gone.
- Perform one synthetic private-file recovery from the Google Drive backup when
  convenient.
- After any approved merge, run a production smoke test at
  `https://www.rebeccaiaaland.com/portal/login`.

## Merge rule

Do not merge PR #8 until final QA passes. After final QA passes, obtain Rebecca's explicit approval before merging into the existing `main` branch. Vercel will then deploy the portal as part of
the existing rebeccaiaaland.com application; no new repository, Vercel project,
subdomain, or DNS change is required.


## October 13 audit follow-through

Implemented on PR #8; no merge or production website release:

- All five forms share validation, review, submission, optional attachments,
  primary-website defaults, and a selector for clients with multiple websites.
- Recovery data (request UUID, fields, selected files) is committed to IndexedDB
  before the first request write. It is scoped to the signed-in user and request
  type. Same browser/device recovery is available for seven days; expiry is
  checked on access. Successful submission and explicit sign-out clear it.
- Retrying a lost request/Storage/metadata response uses the original UUID and
  deterministic attachment path. This retries whole files; it is not byte-level
  resumable transfer and does not restore files on a different device.
- The database records expected file counts and pending upload state. A narrowly
  authorized RPC verifies private Storage objects and attachment records before
  marking the upload finished. Clients still have no general request UPDATE
  policy. Requests with pending uploads cannot be marked Complete.
- Admin/client views identify incomplete uploads. Admin queue is paged in the
  database (20 rows) and filtered by client, status, or incomplete uploads.
- File opening reserves the new window during the click and offers an explicit
  signed link if the browser blocks it.
- Private work-time entries are protected in a separate admin-only table.
- Billing now explains the existing invoice/payment process. Request review
  explains that requested dates need confirmation and extra work is quoted.
- CI runs lint, TypeScript, submission/draft tests, and the Next.js build.

### Evidence and limits

Hosted database: 21 transactional authorization assertions passed, including
cross-client reads, writes, Storage paths, private notes/time, and inactive-client
access under the same claims. Those original authorization fixtures were rolled
back. A separate October 14 access-approval transaction also passed and was
rolled back. The client/request database tables are currently clean, while six
older orphaned QA file objects remain physically in private Storage pending
authorized Storage cleanup. These tests exercise real database roles and RLS;
they do not prove browser email delivery or file-byte recovery.

Submission tests cover lost insert responses, failed upload, lost upload
response, lost metadata response, failed finalization, duplicate retry,
inactive/current-user checks, file limits, and duplicate filenames.
Draft tests cover persisted recovery, user/type separation, sign-out cleanup,
and expiry. IndexedDB tests use a test implementation of the browser API;
real phone/browser persistence must still be verified.

Prior Oct 12 signed-in QA remains historical evidence: Google/magic-link,
all five request types, uploads, status controls, completion/private notes,
and dashboard mobile menu. New shared forms require refreshed preview QA.

Local lint and TypeScript/build checks passed; two existing image warnings
outside the portal remain. Database advisor has no schema/RLS security findings;
its existing unused password-flow warning remains.

### Remaining release gates

- Fresh successful Vercel preview and CI for the latest commit.
- Browser QA the new access-request form, administrator notification email,
  approve/reject controls, and requester decision email.
- Copy or remove the six orphaned QA Storage objects through the authorized
  Storage API; do not delete them directly from Storage SQL.
- Complete the first off-site private-file copy to the documented Google Drive
  backup folder and verify one synthetic file recovery before relying on the
  process for real client data.
- Safari file-opening behavior has not been manually checked; Chrome passed.
- Rebecca's explicit merge approval, then production smoke test.

## Operating checklist

Before inviting a client, create one approved client record with the exact
sign-in email, add their website(s), designate the primary site, and add an
active service with the actual agreed scope. Put the included hour/allowance,
overage process, rollover rule, and response expectations in the service summary
only after those terms are agreed. Do not invent blanket promises in the UI.

Portal access requests now generate an administrator email and appear in the
admin dashboard. Approve only known clients; rejection requires a reason and
emails that reason to the requester. Continue reviewing Received and Files still
uploading each business day because service-request notifications remain a
separate future enhancement. Follow up on incomplete requests. Log work minutes
privately; compare monthly time to the client's agreed allowance. Add a useful
completion note and mark Complete only when the work is finished.

Offboarding: mark the client inactive to block future database/Storage access
while retaining history. Existing signed file links last at most their short
expiry. Decide the agreed retention period before deleting data. Deleting rows
can cascade through requests and metadata but does not constitute a Storage-file
cleanup process: remove files through the Storage API under authorized admin
access and verify cleanup separately. Do not delete directly from Storage SQL.

Backup: Supabase Pro daily physical database backups are confirmed with a
seven-day retention window. Back up `client-request-files` weekly to the private
business Google Drive hierarchy documented above, using a new dated folder for
each run. A database backup alone must not be treated as a backup of uploaded
file bytes. Restore a synthetic request plus file in an isolated environment
before relying on the process.

Notifications, integrated billing, and formal retention durations remain owner
choices. No emails were sent, no paid resources were provisioned, and no client
pricing or contract terms were changed during this work.
