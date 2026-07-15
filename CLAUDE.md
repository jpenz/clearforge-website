# CLAUDE.md — ClearForge.ai Marketing Site

> Read this before touching any code. Run `npm run build` after every change.
> This file is the source of truth for HOW to work here — it overrides older
> doctrine you may find in commit history or design docs.

---

## What This Is

Marketing + lead-generation site for ClearForge AI, an AI strategy/build/adoption firm
for mid-market & PE (James Penz, ex-Bain AI & Automation practice).

**Production URL:** https://clearforge.ai (Vercel auto-deploys `main`)
**Repo:** https://github.com/jpenz/clearforge-website
**Current version:** V11 (Wave 1 live, tag `v11.1`; Wave 2 on PR #11)

---

## Working Discipline (Karpathy rules, adopted 2026-07-14)

1. **Think before coding.** State assumptions explicitly; when the evidence is
   ambiguous, MEASURE (computed styles, probes, curl) before "fixing." Wrong
   assumptions here have shipped invisible-text bugs.
2. **Simplicity first.** Minimum code that solves the problem. No speculative
   features, no premature abstraction. If it could be half the size, cut it.
3. **Surgical changes.** Touch only what the task needs. Match surrounding
   style. Never mass-reformat (Biome debt is quarantined — see CI). Clean up
   only orphans your change created.
4. **Goal-driven execution.** Define success criteria, then loop until verified:
   `typecheck → build → vitest → e2e → browser/crawler proof`. A change without
   verification is not done.

---

## Stack

- Next.js 16 App Router · React 19 · TypeScript 5 (strict) · Tailwind CSS v4 (`@theme inline`)
- No animation libraries — motion is CSS + IntersectionObserver/rAF (see Motion Doctrine) · Radix primitives · Zod v4
- Anthropic + Perplexity APIs (Forge Intelligence agents) · Supabase (leads) · Resend (contact email)
- Cal.com booking embed (`@calcom/embed-react`)
- Tests: Vitest (unit) + Playwright (`e2e/`, run `PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test`)
- Deploy: Vercel

---

## Design System — V11 (navy/cobalt/serif — NOT the old V8 editorial-ember or V9 signal-blue)

Cool paper, navy ink, ONE electric cobalt accent, serif display. See
`tasks/prd-v11-site-modernization.md` for the full spec.

### Tokens (`src/app/globals.css` — legacy NAMES kept, values remapped; do NOT rename tokens)

```css
--color-forge-black: #081826;  /* deep navy — dark sections (NOT black) */
--color-parchment:   #F8F7F4;  /* cool paper — light sections */
--color-anthracite:  #0B1B2B;  /* navy ink — text on light */
--color-warm-gray:   #46525E;  /* slate — secondary on light */
--color-bone:        #EDF1F4;  /* text on navy */
--color-stone:       #8D9AA6;  /* secondary on navy */
--color-brass:       #1F4CDB;  /* THE accent (electric cobalt) */
--color-brass-hover: #1638A8;
--color-brass-light: #7A97FF;  /* accent ON DARK — cobalt fails contrast on navy */
--color-divider:     #E1E1DB;  --color-divider-dark: #1C3040;
```

### Typography — tri-font

- **Display:** Newsreader serif (~550 weight, never ultra-bold), css var still named
  `--font-fraunces`. One italic cobalt accent phrase per display headline (`.display-accent`).
- **Body:** Hanken Grotesk. **Data/overlines:** DM Mono, uppercase, tracked.
- Type scale classes: `.text-display-xl/.text-display/.text-h1…h4`, `.overline`, `.metric*`.

### Hard-won CSS rules (violating these has shipped real bugs)

- **Never put `color` on bare element selectors** in globals — unlayered CSS beats ALL
  Tailwind utilities; headings become un-recolorable (navy-on-navy /discover bug).
- **Never reference theme tokens via inline `style={{...var(--font-display)...}}`** —
  `@theme inline` vars don't exist at runtime; the style silently falls back to body
  sans (this broke serif on 10 files incl. the hero). Use utilities (`font-display`).
- **Never name a custom class after a Tailwind utility** (`.overline` collided with the
  `overline` text-decoration utility).
- **On dark surfaces**: `text-brass-light` + `border-brass-light/50`, secondary `text-stone`.
  `text-brass`/`text-warm-gray` on navy fail WCAG.
- Percentage-height chart bars need `h-full … justify-end` columns (`items-end` on the
  row collapses them to 0).

### Layout & register

- Editorial ruled lines + whitespace; cards ONLY for product-UI objects and max ONE
  bento per page. Asymmetric 12-col grids, `max-w-[1400px]`.
- Cinematic dark hero + light interior; ONE extra dark band per page (credibility/CTA).
- Product-as-hero: the homepage hero card IS the live agent (`/api/hero-analyze`).
- A number in every viewport, tied to a named thing; numbers always DM Mono.

### Motion Doctrine (V11 — reverses V7/V8 rules you may find elsewhere)

- **Content renders instantly. Native scroll. No Lenis, no custom cursor, no
  opacity-0-until-ScrollTrigger reveals, no pinned/scrubbed sections.** A client called
  the old scroll-theater build "very lazy"; removing it fixed it.
- Motion as moments only: `MetricCounter` count-ups, one CSS marquee, hover states, the
  agent card's own state changes. `prefers-reduced-motion` respected.
- Reveal wrappers (`ui/animate.tsx`, `home/homepage-animations.tsx`) are inert server
  passthroughs — keep their APIs; do not re-arm them casually.
- Background videos must be normalized (`scale-110 blur-[10px] saturate-50..85
  opacity-40` + gradient) — several contain baked-in text/off-palette hues.

---

## Conversion System

- **Cal.com `james-penz/30min` is the primary conversion.** `src/components/booking/book-call.tsx`:
  `BookingInline` (on /contact) + `BookCallButton` (popup everywhere else).
- **Canonical CTA labels — do not invent variants** (drift was a 10-finding QA cluster):
  booking = **"Book a 30-min intro"** · agent = **"Map the Workflow"** (→ /discover) ·
  assessment = **"Take the scorecard"** (→ /scorecard).
- CSP in `next.config.ts` allows app.cal.com/cal.com/api.cal.com — required for the embed.

## Editorial Rules

- **Never invent metrics.** If a stat is irrelevant or unsourced, render nothing.
- **No real client names** (anonymized: "$180M industrial manufacturer"). James's real
  caseload is confidential.
- The 70% weekly-active adoption bar is publishable; the **"or we keep working free"
  guarantee and any "Adoption Rescue" SKU are PARKED — owner-only decisions, do not ship.**
- Insights articles: markdown body; `## ` splits sections; pre-`##` text = lede; tables
  supported. Don't fake reading times.

---

## Commands

```bash
npm run dev          # dev on :3007 — pass env explicitly:
                     # ANTHROPIC_API_KEY=... PERPLEXITY_API_KEY=... npx next dev -p 3007
npm run build        # MUST pass (92 routes)
npm run typecheck    # tsc --noEmit
npx vitest run       # 170 unit tests
npx next start -p 3008                                   # prod-mode server for QA
PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test   # 164 e2e
```

- Local `.env.local` has an EMPTY `RESEND_API_KEY` → /api/contact 503s locally by
  design; production has the key and works.

## QA Gate (before calling anything "done")

Run the pipeline in `~/.claude/skills/premium-site-builder/QA_PIPELINE.md`:
prod-build crawl (console/overflow/broken links/images + screenshots both viewports) →
journey scripts (booking, scorecard flow, forms — ONE labeled test submission max) →
axe-core WCAG AA (zero serious/critical on our DOM; exclude the Cal iframe) → e2e green.

## CI (GitHub Actions)

TypeScript, Vitest, TruffleHog, Semgrep must be green. **Biome and npm audit are
pre-existing red on main** (legacy debt + Supabase transitive `ws`) — add no NEW
violations; do not mass-fix.

---

## What NOT To Do

- ❌ Reintroduce Lenis / scroll-hiding reveals / pinned sections (see Motion Doctrine)
- ❌ New colors, second accents, gradients-as-decoration, or renaming legacy tokens
- ❌ `color` on bare element selectors; inline-style theme-var references
- ❌ Cards/boxes for text content (product-UI objects + one bento only)
- ❌ Stock photography of people; imagery = AI-generated renders (KIE Nano Banana Pro)
- ❌ Invented metrics, real client names, the parked guarantee language
- ❌ CTA label variants beyond the three canonical labels
- ❌ Breaking the scorecard flow (e2e covers it — keep specs updated WITH the UI)
- ❌ `'use client'` on pages; client components only where interaction demands it

## Version History (condensed)

- **V11** (2026-07) — clean-slate rebrand: navy/cobalt/Newsreader tri-font register,
  cinematic HDR hero + live agent card, native scroll + instant content, Cal.com booking
  as primary conversion, founder-led /about (real headshot), Adoption Mile™ pricing band,
  /how-we-work + /security pages, full-site QA sweep (69 findings root-caused: serif
  restoration, case-study rebuild, ghost-video normalization, insights table renderer,
  CTA canonicalization). Waves gated by owner preview; tags v11.1+.
- **V9–V10** (2026-06/07) — signal-blue all-sans rebrand + agent-hero homepage (superseded).
- **V8.x** (2026-04/05) — editorial redesign era: 17-industry value chains, SEO/AEO layer
  (schema.org + AI-crawler opt-in), scorecard, insights library, perf work. Data files and
  routes from this era remain the content backbone.
- **V7** — original CLOSER-framework site with Forge Intelligence agent.
