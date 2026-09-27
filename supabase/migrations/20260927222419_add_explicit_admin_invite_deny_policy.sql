-- Remote migration version: 20260927222419

create policy "deny direct portal admin invite access"
on private.portal_admin_invites
for all
to public
using (false)
with check (false);
