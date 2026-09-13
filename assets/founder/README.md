# Founder identity assets, currently hidden

The headshot moved here on 2026-09-12 when `SHOW_FOUNDER_IDENTITY` in
`src/data/site.ts` was set to false. Next.js only serves files under
`public/`, so while it sits here the photo is not fetchable at any URL.

To bring the founder identity back:

1. `git mv assets/founder/james-penz.jpg public/images/james-penz.jpg`
2. Set `SHOW_FOUNDER_IDENTITY = true` in `src/data/site.ts`
3. Restore the founder sentence in `public/llms.txt` (see the note there)
4. Run the gate: typecheck, lint, unit, build, e2e

Two things the flag does not control, because changing them would break a
live integration. Both are owner decisions:

- `FOUNDER_EMAIL` (`james@clearforge.ai`) still appears on the privacy,
  security and terms pages and is the address `src/lib/leads.ts` notifies.
  Changing it needs a mailbox that actually receives mail.
- `CAL_LINK` (`james-penz/30min`) is the Cal.com handle the booking embed
  opens, so the name is visible in the booking dialog. It reads from
  `NEXT_PUBLIC_CALCOM_LINK`, so a new event can be pointed at without a
  code change once one exists.
