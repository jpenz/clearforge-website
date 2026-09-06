# AGENTS.md — the shared contract for every tool working on this repo

Kombai reads this file automatically in every thread. Claude Code reads it
alongside CLAUDE.md. Paste it into ChatGPT or any other tool before it touches
this code. CLAUDE.md holds the full stack, design system, and command
reference. This file holds the rules that stop three tools from undoing each
other.

## One repo, one remote, many branches

- The only working copy on this machine is `/Users/agentmac/Projects/clearforge-website`.
  `~/agentforge/repos/clearforge-website` is a symlink to it, so AgentForge and
  this path are the same tree.
- The shared brain is the GitHub remote, not the folder. Never coordinate by
  leaving files in the working tree for another tool to find.
- Work on a branch named for the tool and the job: `kombai/<band>`,
  `claude/<change>`, `codex/<change>`. Push it. Open a PR. Never commit to
  `main`, never force push, never rebase a branch someone else may hold.
- Before starting, `git fetch` and branch from `origin/main` unless the task
  says otherwise. If your branch is behind by more than a day, merge `main` in
  before you build on it.
- Two tools must not run in this tree at the same time. The git index, the
  build cache, and `node_modules` are shared state and will corrupt. If you find
  a stale `.git/index.lock`, someone else is probably still running. Wait.

## What must never change without the owner saying so

- **No published prices anywhere**, including structured data. Say "fixed-fee
  two-week diagnostic", "scoped in the Diagnostic before you commit", "monthly
  retainer". Numeric bounds live in `src/data/pricing.ts` for a one-commit
  reversal if that decision changes.
- **No em dashes in any public copy.** Restructure the sentence instead.
- **Never invent a metric.** If a number is not in `src/data/`, it does not go
  on a page. Relabel or omit; never estimate. The 70 percent weekly-active bar
  is a target, and the site says so, because no observed figure exists yet.
- **No real client names.** Cases are anonymized by size and sector.
- The "or we keep working free" guarantee and any "Adoption Rescue" SKU are
  parked. Do not ship either.
- Canonical calls to action, no variants: **Book a 30-min intro**,
  **Map the Workflow**, **Take the scorecard**.
- Do not touch `src/app/actions.ts`, `src/lib/url-safety.ts`,
  `src/lib/uploads.ts`, `src/lib/rate-limit.ts`, `src/lib/leads.ts`,
  `src/lib/supabase.ts`, or the CSP block in `next.config.ts`. These carry
  security invariants with tests behind them.

## Design system: build inside it, not beside it

Tokens are frozen: cobalt `#2454ff`, cobalt-bright `#7a97ff` on dark, ink
`#010b13`, ghost `#f8f8ff`. No new hues, no second accent, no gradients as
decoration.

Reuse these primitives instead of writing new ones:

| Component | Use it for |
|---|---|
| `Container` | The content column inside any full-bleed band |
| `PageFrame` | A standard band with its hairline rules |
| `SectionBand` | The label strip that opens a band |
| `Plate` | A render behind a dark band, with its legibility scrim |
| `Stat` | Any figure with a label |
| `ArrowLink` | Any standalone "go" link |
| `GapPair` | Two figures compared against each other |
| `FaqAccordion`, `CountUp`, `ArticleBody` | As named |

Layout is full-bleed sections with a `max-w-[1440px] 2xl:max-w-[1600px]` inner
column. Horizontal rules span the viewport. There are no vertical side rules.
Cards are for product-UI objects only, never for text.

Motion: content renders instantly, native scroll, no library. The only
scroll-linked motion allowed is CSS `animation-timeline: view()` on background
plates, never on content. No pinned sections, no opacity-0 reveals, no custom
cursor.

## Imagery

AI-generated renders only, no stock photography of people. The one exception is
the founder's real headshot. Renders are palette-locked to ink and cobalt, 16:9,
2560px wide, JPEG quality 72, under 260KB, in `public/renders/`, served through
`next/image`.

Every render sits under a legibility scrim, and **the scrim is written for a
composition, not for an image**. If you make a card opaque, move a label, or
change a header, re-audit the scrim: a layer that protects nothing is just
crushing the render. Never fix a flat plate with a global alpha change, because
raising range that way lowers contrast somewhere else. Fix it by releasing the
region that carries no text, and measure both numbers together.

## The gate: a change is not done until it is measured

Run from the repo root, and all of it must be green:

```bash
npm run typecheck && npm run lint && npx vitest run && npm run build
```

Then serve the production build and test against it:

```bash
npx next start -p 3008
PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test
```

Kill whatever holds the port first, and prove the server is serving *your*
build by grepping the HTML for a string only your build has. A 200 response
proves a server exists, not that it is yours. An orphaned server cost a full
review cycle on 2026-09-05.

If you changed anything visual, also:

- `node scripts/qa-shots.mjs http://localhost:3008 <outdir> /,/services,/private-equity,/proof,/about,/start 1920,1440,390`
- axe with `@axe-core/playwright`, excluding the Cal.com iframe: zero serious or
  critical.
- Contrast of every text run over a plate, sampled from pixels rather than
  assumed: 4.5:1 for body, 3.0:1 for 24px and above.
- No horizontal overflow and no console errors at 390, 1440, or 1920.

## Reviewing the result

`/design-review-panel` runs ten expert lenses (Nielsen, Norman, Krug, Tufte,
Alexander, form, credibility, cognition, measured, peer benchmark), verifies
major findings with skeptics, and writes a scored report plus a worklist.
Reports live in `/Users/agentmac/Projects/clearforge-reviews`, deliberately
outside this repo so linting does not touch them. Run it before and after a
redesign and compare the scorecards.

## Facts the site is still waiting on

Do not invent these. Until the owner supplies them, the honest weaker wording
stands:

1. An observed weekly-active adoption figure from a completed engagement.
2. Any financial outcome for any case. Every case currently shows activity
   counts, while the headline promises a bottom-line effect.
3. Roles, titles, and years for the three lineage firms on /about.
4. A year for any case study.

## Owner-only decisions, currently parked

Leave these alone unless the owner says otherwise: the home engagement table and
FAQ, the "The founder comes from" lineage strip, the Engagements nav item and
the /pricing route, and the /private-equity headline.
