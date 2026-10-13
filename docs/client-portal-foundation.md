# Aaland Client Portal — Production Source of Truth

Updated October 12, 2026.

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

## Tracked remote migrations

- `20260927213028_initial_portal_foundation`
- `20260927213124_harden_portal_rls_and_indexes`
- `20260927222342_add_invite_only_auth_gate`
- `20260927222407_move_admin_invites_private`
- `20260927222419_add_explicit_admin_invite_deny_policy`
- `20261006024603_enforce_active_portal_clients`
- `20261013000744_restrict_client_request_file_types`

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

PR #8 remains draft and must not be merged until the updated branch has a fresh
successful Vercel preview and the following checks are complete:

1. Approved client Google sign-in succeeds.
2. Approved client magic-link sign-in succeeds and returns to the portal.
3. Unapproved/inactive access is rejected.
4. Admin login succeeds.
5. All five request types submit successfully.
6. File upload, removal, and retry work without duplicate service requests.
7. Client-visible completion notes display to the client.
8. Private admin notes do not display to clients.
9. Client A cannot read Client B database rows or private files.
10. Public site navigation, footer, sitemap, forms, and current service
    positioning remain unchanged except for the intentional Client Portal link.
11. Production environment variables and Auth redirect configuration are
    confirmed.
12. After merge, run a production smoke test at
    `https://www.rebeccaiaaland.com/portal/login`.

## Merge rule

Do not merge PR #8 until final QA passes. When it does pass, merge the portal
into the existing `main` branch. Vercel will then deploy the portal as part of
the existing rebeccaiaaland.com application; no new repository, Vercel project,
subdomain, or DNS change is required.
