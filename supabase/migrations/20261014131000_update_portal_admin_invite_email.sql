-- Keep the portal administrator bootstrap allow-list aligned with the current business email.
-- This does not alter the existing linked administrator auth user.

insert into private.portal_admin_invites (email)
values ('rebecca@rebeccaiaaland.com')
on conflict (email) do nothing;

delete from private.portal_admin_invites
where email = 'rebecca@pawcirclellc.com';
