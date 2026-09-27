# Aaland Client Portal — Foundation

## Supabase project

- Organization: Aaland Web Design & Business Solutions
- Project: `aaland-client-portal`
- Project ref: `lfqxfnncuygstugjpzbo`
- Region: East US (Ohio / `us-east-2`)
- Data API: enabled
- Automatically expose new tables: disabled
- Automatic RLS: enabled

## Authentication direction

Use Supabase email magic-link authentication with persistent sessions.

The magic link authenticates the user. Row Level Security and private Storage policies authorize what that user can access.

## Current data model

- `portal_admins`
- `clients`
- `client_websites`
- `client_services`
- `service_requests`
- `request_attachments`
- `request_status_history`
- `request_admin_notes`

Request statuses remain intentionally simple:

- Received
- Working on it
- Complete

## Security rules

- Every application table has RLS enabled.
- Anonymous database access to application tables is revoked.
- Client reads are scoped to the authenticated client's record.
- Clients may submit their own requests but may not change request status.
- Internal admin notes are isolated from client-readable request data.
- Status changes are logged automatically.
- Authorization helper functions live outside the exposed public API schema.
- Supabase security advisor currently reports no security lints.

## Storage

Planned private bucket:

`client-request-files`

Object path convention:

`<client_id>/<request_id>/<filename>`

Storage RLS policies are already defined for this bucket. The bucket itself still needs to be created as **private** before upload work begins.

## Remote migrations

- `20260927213028_initial_portal_foundation`
- `20260927213124_harden_portal_rls_and_indexes`

The matching SQL files are tracked in `supabase/migrations/`.

## Current public services to reflect in the portal

- New websites — from $1,500
- Website updates — from $150
- Site Care — $100/month
- Technical writing & documentation — from $175
- Grant research & writing — from $195

The Services area should show the client's active service first and link out to the public website for broader service details rather than duplicating a full sales catalog inside the portal.

## Next implementation steps

1. Create the private `client-request-files` Storage bucket.
2. Configure Supabase Auth Site URL and allowed redirect URLs for production and preview.
3. Create Rebecca's portal auth account and add its user ID to `portal_admins`.
4. Add Supabase client/auth code to this branch.
5. Build the login flow.
6. Create two test clients and explicitly prove cross-client database and file access is denied before building the rest of the request UI.
