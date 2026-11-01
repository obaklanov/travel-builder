# Profile editor setup

Project: Travel Easy (ytevjyzzqnapbawmenzz).

1. In Supabase SQL Editor run supabase-profile-editor-setup.sql. This adds an authenticated boolean name-availability function. It exposes no profile records and keeps the existing case-insensitive unique index as the final guard. Existing profiles and visits are preserved.
2. Authentication > Email Templates / Security notifications: enable Password changed. Supabase only sends this security email when the notification is enabled. No password should appear in any email. Verify delivery using your own account after saving this setting.
3. Authentication > Sign In / Providers > Email (password security): set the minimum password length to 8 and enable Require current password when changing password. The site requires a letter, a digit and a non-whitespace symbol for signup, reset and change; match those required character groups in the server settings where supported. If the dashboard offers only stricter character-group choices, review before enabling additional requirements.
4. The site also verifies the current password with Supabase sign-in before submitting the change, so wrong current passwords are rejected even before the extra server setting is enabled.
5. Test an available nickname, a taken nickname, a wrong current password, a mismatched confirmation and a valid change. Sign out and back in with the new credentials. Existing passwords are not changed by this setup.

Official references:
https://supabase.com/docs/guides/auth/password-security
https://supabase.com/docs/guides/auth/auth-email-templates

Local verification uses an isolated fake backend. No production password changes or email sends were performed by the automated tests.
