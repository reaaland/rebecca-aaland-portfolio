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

Use Supabase Auth with two client-facing sign-in options:

- Continue with Google
- Email me a sign-in link (magic link)

Use persistent sessions for returning clients. Authentication identifies the user; Row Level Security and private Storage policies authorize what that user can access.

Portal access remains approval-based. A new auth user should only be created when the email already exists as an approved client record. Google sign-in should use the same approved email address. Supabase can automatically link Google and email identities that share the same verified email.

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

The `client-request-files` bucket has now been created as **private**. Storage RLS policies are already defined for it.

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

1. Configure Supabase Auth Site URL and allowed redirect URLs for production and preview.
2. Create Rebecca's portal auth account and add its user ID to `portal_admins`.
3. Add Supabase client/auth code to this branch.
4. Build the login flow.
5. Create two test clients and explicitly prove cross-client database and file access is denied before building the rest of the request UI.


## Invite-only access gate

Google sign-in is configured in Supabase alongside magic-link authentication.

A Postgres `Before User Created` hook function is now present:

`private.hook_allow_approved_portal_user(event jsonb)`

It allows creation of a Supabase Auth user only when:

- the email matches an active row in `public.clients`, or
- the email is on the private portal-admin bootstrap allow-list.

The current admin bootstrap email is Rebecca's present Google Workspace identity:
`rebecca@pawcirclellc.com`.

After an approved user is created, an `auth.users` trigger automatically:

- adds an approved admin to `public.portal_admins`, or
- links an approved client by setting `clients.auth_user_id`.

The admin email allow-list lives in the non-exposed `private` schema and has an explicit deny-all RLS policy for direct access.

**Remaining dashboard step:** enable the Supabase Authentication → Auth Hooks → Before User Created hook and select the Postgres function `private.hook_allow_approved_portal_user`.

Security Advisor is clean after these migrations.


## Login UI direction

The portal sign-in screen should use a polished centered auth card/modal inspired by finished consumer login experiences, while remaining fully Aaland-branded.

- Show the Aaland logo/wordmark at the top.
- Primary option: **Continue with Google**.
- Secondary option: **Email me a sign-in link**.
- No guest login.
- Keep unrelated navigation and clutter off the auth screen.
- Match the homepage visual system: light background, navy text, blue/cyan/lilac accents, subtle gradients/glows, rounded corners, and generous spacing.
- A simple “or” divider may separate Google and email options.
- Magic-link flow: enter email → send link → confirmation state.
- Mobile presentation must remain clean and comfortable.
