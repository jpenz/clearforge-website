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
**Current version:** V12.1 (Kombai redesign LIVE 2026-08-18 via PR #27, plus
the atmosphere/HDR pass, de-pricing, /start intake, and security hardening)

Components in `src/components/{layout,home,functional,ui}`, content in
`src/data/`, integrations in `src/lib/`.

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

## Design System — V12.1 (current, live)

Swiss-hairline editorial system on a ghost-white canvas, ONE cobalt accent,
serif display, plus a cinematic dark "atmosphere" layer.

### Tokens (`src/app/globals.css` — the single source of truth)

```css
--color-cobalt:        #2454ff;  /* THE accent */
--color-cobalt-press:  #1a41d8;
--color-cobalt-bright: #7a97ff;  /* accent ON DARK (cobalt fails contrast there) */
--color-ink:           #010b13;  /* text on light */
--color-ghost:         #f8f8ff;  /* canvas + text on dark */
--color-hairline:      rgba(1,11,19,.12);   /* + -faint .07, -strong .3 */
--color-hairline-ghost: rgba(248,248,255,.14); /* hairlines on dark */
```

### Typography — tri-register

- **Display:** Newsreader serif, loaded via the `--font-bodoni` CSS var (name
  kept from the Bodoni original, swapped 2026-08-18 for legibility). One
  italic accent phrase per headline: `text-cobalt` on light,
  `text-cobalt-bright` on dark.
- **Body:** Hanken Grotesk. **Data/labels/eyebrows:** `.tnum` tabular figures,
  uppercase, tracked.

### Atmosphere layer (V12.1)

- `.cf-dark-band` — cinematic navy-black band (gradient + `#030b13`) with a
  film-grain `::after` (inline SVG turbulence).
- `.cf-aurora` / `.cf-aurora-b` — pre-blurred radial gradients, transform-only
  drift animation (compositor-friendly, no `filter()`).
- `.cf-glow` — cobalt glow for product-UI objects sitting on dark.
- `.cf-dots` / `.cf-dots-ghost` — dotted-grid texture.
- `.cf-enter` — one-time load stagger via `--d` delay var.
- All of it disabled under `prefers-reduced-motion`.

### Hard-won CSS rules (each one shipped a real bug)

- **Never put `color` on bare element selectors** in globals — unlayered CSS
  beats ALL Tailwind utilities (navy-on-navy heading bug).
- **Never reference theme tokens via inline `style={{...var(--font-x)...}}`** —
  `@theme inline` vars do not exist at runtime; it silently falls back to
  body sans. Use utilities (`font-display`).
- **Never name a custom class after a Tailwind utility** (`.overline` collided
  with the `overline` text-decoration utility).
- **A white card inside `.cf-dark-band` must reset its own color** (`text-ink`)
  or it inherits ghost text and washes out.
- **Cal.com modal needs the `cal-modal-box` host rule** in globals (the embed
  fails to size its own host here, so the dialog renders unframed).
- Percentage-height chart bars need `h-full … justify-end` columns.

### Layout & register

- Hairline `PageFrame` (max-w-1360) + `SectionBand` headers are the structural
  primitives. Editorial rules and whitespace over boxes.
- Dark bands bookend the site: hero + footer, plus dark title blocks on
  /services, /pricing, /contact, /start.
- Cards ONLY for product-UI objects (the live agent card, the scorecard).
- A number in every viewport, tied to a named thing; numbers always `.tnum`.

### Motion Doctrine

- **Content renders instantly. Native scroll. No Lenis, no custom cursor, no
  opacity-0-until-ScrollTrigger reveals, no pinned/scrubbed sections.**
- Motion as moments: the `.cf-enter` load stagger, `CountUp`, hover states,
  the live agent card's own state changes. CSS-first, no animation libraries.

---

## Conversion System

- **Cal.com `james-penz/30min` is the primary conversion.** Loader in
  `src/lib/cal.ts` (embed JS loads on INTENT: hover/focus/touch preload, click
  opens; `bookingSuccessful` fires the `generate_lead` GA4 event once).
  `src/components/functional/BookCallButton.tsx` (modal, everywhere) +
  `BookingInline.tsx` (eager inline calendar, /contact only).
- **`/start`** is the project-brief intake (3 steps, optional hardened file
  upload); its confirmation opens the Cal modal with name/email prefilled.
- **Canonical CTA labels — do not invent variants** (drift was a 10-finding QA cluster):
  booking = **"Book a 30-min intro"** · agent = **"Map the Workflow"** (→ /discover) ·
  assessment = **"Take the scorecard"** (→ /scorecard).
- CSP in `next.config.ts` allows app.cal.com/cal.com/api.cal.com — required for the embed.

## Editorial Rules

- **No published prices** (owner decision 2026-08-20). Vocabulary: "fixed-fee
  two-week diagnostic", "scoped in the Diagnostic before you commit", "monthly
  retainer". Numeric bounds stay in `src/data/pricing.ts` for a one-commit
  flip-back if that reverses.
- **No em dashes in any public-facing copy.**
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
npm run build        # MUST pass (68 routes)
npm run typecheck    # tsc --noEmit
npx vitest run       # 16 unit tests (incl. 7 SSRF-guard tests)
npx next start -p 3008                                   # prod-mode server for QA
PLAYWRIGHT_BASE_URL=http://localhost:3008 npx playwright test   # 16 e2e
```

- Local `.env.local` has an EMPTY `RESEND_API_KEY` by design.
- **`NEXT_PUBLIC_*` vars inline at BUILD time even in server code**: to exercise
  Supabase/Resend integrations locally you must rebuild with the vars present
  (`set -a; source <(vercel env pull ...); set -a; npm run build`), or the
  graceful fallback reports success while persisting nothing.

## QA Gate (before calling anything "done")

Run the pipeline in `~/.claude/skills/premium-site-builder/QA_PIPELINE.md`:
prod-build crawl (console/overflow/broken links/images + screenshots both viewports) →
journey scripts (booking, scorecard flow, forms — ONE labeled test submission max) →
axe-core WCAG AA (zero serious/critical on our DOM; exclude the Cal iframe) → e2e green.

## Security (hardened 2026-08-20 — do not regress)

- **SSRF** (`src/lib/url-safety.ts` + `analysis.ts`): manual redirect following
  with per-hop re-validation, 512KB streamed body cap, DNS resolution rejecting
  private IPs, and a literal denylist covering encoded IP forms, IPv6
  link-local/ULA/mapped, cloud metadata, CGNAT, `.local`/`.internal`, and
  `user:pass@`. 7 unit tests lock it. NEVER use `redirect: "follow"` here.
- **Every unauthenticated server action** (`src/app/actions.ts`) needs BOTH a
  honeypot (`website` field) and `isRateLimited(await headers(), ...)`. All
  three have them; adding a fourth action means adding both.
- Rate limiting reads `x-real-ip` (platform-set), not the spoofable leftmost
  `x-forwarded-for`.
- Uploads: `src/lib/uploads.ts` (allowlist + size check BEFORE `arrayBuffer()`
  + magic-byte verification), UUID storage names, private Supabase bucket.
  `serverActions.bodySizeLimit` is set in `next.config.ts` — uploads break
  silently without it.
- JSON-LD escapes `< > &` before injection (`src/lib/seo.ts`).
- Full checklist: `~/.claude/skills/premium-site-builder/QA_PIPELINE.md`.

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
