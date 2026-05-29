# ClearForge Homepage — Design Handoff

## What this is
A high-fidelity homepage redesign for **clearforge.ai**, built as an HTML/React prototype in `prototype/`. It's a **technical-confident B2B** direction grounded in the May 2026 Market Study (production-AI positioning, transparent pricing, PE + mid-market industrial ICPs), with a Hormozi-style "tightened" hero: one dominant CTA, an above-the-fold proof artifact, and objection-neutralizing bullets.

**The files in `prototype/` are a design reference, not production code to copy directly.** Your job is to recreate the design inside the **existing `jpenz/clearforge-website` Next.js + Tailwind v4 codebase**, reusing its established tokens, components, and animation primitives. This README was written against the live repo (`main`) — the mapping below points at real files.

## Fidelity
**High-fidelity.** Final layout, spacing, copy, and interactions. Recreate pixel-close — but **adapt to the repo's own design system** (see "Reconcile with the live codebase" — there are real, deliberate decisions to make about type and accent color).

---

## ⚠️ Global changes — DECISIONS MADE (do these site-wide, READ FIRST)
Two brand decisions are now final and apply to the **entire site**, not just the homepage. The prototype already reflects both, so it's the visual target. Make these global edits in a first pass, before building sections.

### 1. Accent → signal blue (site-wide reskin)
The accent token is named `--color-brass` but currently holds a deep teal. **Keep the token name** (renaming `brass`→`accent` would churn every file); just change its value everywhere it resolves. In `src/app/globals.css` `@theme inline`:

```css
/* was teal — now signal blue */
--color-brass:       #0E5DC2;   /* was #0B5E57 */
--color-brass-hover: #0A4A9C;   /* was #084B46 */
--color-brass-light: #4D8DE8;   /* was #E0A072 (peach) — now light blue for on-dark accents */
```

**Then hunt down the hard-coded teal/peach `rgba()`s elsewhere in `globals.css`** (these don't use the token, so the reskin misses them otherwise):
- `::selection` → `background: rgba(14, 93, 194, 0.15);` (was `rgba(4, 120, 87, 0.15)`)
- `.card-hover:hover` box-shadow → swap `rgba(4, 120, 87, 0.12)` → `rgba(14, 93, 194, 0.12)`
- `.glow-pulse` keyframes → swap all `rgba(4, 120, 87, …)` → `rgba(14, 93, 194, …)`
- `.premium-cursor__ring` / `__dot` and `.is-interactive` → swap the peach `rgba(224, 160, 114, …)` → `rgba(77, 141, 232, …)` and the teal `rgba(11, 94, 87, …)` → `rgba(14, 93, 194, …)`

**Leave `--color-success: #287D72` green** — it's semantic (check marks), not the brand accent. Also check `src/app/opengraph-image.tsx`, `apple-icon.tsx`, `icon.svg`, and any SVG diagram components (`hero-signal-overlay`, `forge-method-diagram`, etc.) for hard-coded teal hexes and update those too. Grep the repo for `0B5E57`, `084B46`, `047857`, `4, 120, 87`, `11, 94, 87`, `E0A072` to catch stragglers.

### 2. Type → all-sans (drop the serif site-wide)
Remove **Instrument Serif** entirely and make display headings sans. The prototype uses **Geist** for sans (display + body) + **JetBrains Mono** for numerals — adopt that.

- In `src/app/layout.tsx`: remove the `Instrument_Serif` import/variable. Add Geist — easiest is the official `geist` package (`npm i geist`, then `import { GeistSans } from 'geist/font/sans'` and use `GeistSans.variable`). Keep `JetBrains_Mono`. (You can drop DM Sans, or keep it as the body face paired with Geist display — either is fine; the prototype is all-Geist.)
- In `src/app/globals.css`: point `--font-sans` and `--font-display` at Geist (`--font-mono` stays JetBrains).
- **Re-tune the heading styles** — serif headings were `font-weight: 400`; sans display needs more weight + tighter tracking or it looks flabby. Update the `h1, h2 {}` block and every `.text-display*` / `.text-h1` / `.text-h2` rule to:
  `font-weight: 600; letter-spacing: -0.03em; line-height: 1.0–1.08;` (heavier negative tracking on the biggest sizes). Use the prototype's `.hero__h` / `.h-1` / `.h-2` in `prototype/styles.css` as the exact size/weight/tracking reference.

### 3. Ornamentation
The prototype is deliberately flat (sharp corners, 1px hairline borders, no shadows). Keep the new homepage sections austere, but still wrap them in the repo's `SectionReveal` / `StaggerReveal` so scroll-in motion matches the rest of the site.

**Do NOT port the prototype's `Nav` or `Footer`.** The live site renders `<Header>` and `<Footer>` from `src/app/layout.tsx` — reuse them. The prototype's Nav/Footer exist only to make the standalone file look complete.

---

## Page Structure (top → bottom)
The new homepage (`src/app/page.tsx`) should compose, in order: **Hero → PillarStrip → ProductionGap → Engagements → Operators → Case → CredibilityBand → FinalCTA**. (Header + Footer come from the layout.)

1. **Hero** — headline "AI that ships. ROI you can prove." Build the **tightened** layout only:
   - 2-col grid. Left = eyebrow + headline + sub + CTAs. Right = `HeroProof` card.
   - **`HeroProof`** is a dark "production-readiness scorecard": big mono score `34 / 100`, an accent meter at 34%, three sub-score rows (Data readiness 2/5, Deployment path 1/5, Adoption plan 1/5), footer "Most firms score < 40 / Yours in 4 min →". **Reuse `src/components/scorecard/score-ring.tsx` and `progress-bar.tsx`** for the visual language instead of rebuilding it.
   - Primary CTA = solid accent `<Button>` → wire to the existing assessment/scorecard route (the one the header CTA already points to; see `src/components/scorecard/scorecard-form.tsx` + `/api/scorecard`). Secondary ("See engagements & pricing") = **quiet link** (`<Button variant="link">` or `variant="ghost"`) so the readiness score is the single dominant action.
   - Below: 4-col mono stat strip (79%→11%, $11B, 47%, 10–14 wk) — use `.metric` for numbers, `MetricCounter` if you want the count-up.
2. **PillarStrip** — 3 objection-neutralizing bullets, ordered by objection frequency: "Pilots that never ship" / "No one can prove the ROI" / "We'll be locked into a vendor" — each headline is the literal buyer objection (sentence case, ~18px) with a one-line rebuttal beneath. Bordered grid, hairline dividers.
3. **Production Gap** (`#gap`, `bg-recessed`) — section head + 2-col body. Left: 4 stacked progress bars in a bordered panel ending in a "68 pts" delta. Right: 3 eyebrow-led mini essays.
4. **Engagements** (`#engagements`, `bg-warm-white`) — 4-col bordered ladder (Diagnostic / Sprint / Scale / Transform). Each: name + ID, big mono price, cadence, "Best for · …", description, dash-bulleted deliverables, bottom CTA link. Sprint tier has a 2px accent top rule.
5. **Operators** (`#operators`, `.dark-section`) — "The humans on your engagement, by name." 2-col: lede left, 2×2 bordered grid of 4 points (No bench / No nameless team / Hand-built systems / Adoption is staffed).
6. **Selected work** (`#work`, `bg-recessed`) — case study card, ~1.05fr / 1fr split: text body + 3-metric strip left, dark visualization panel right with a generated heatmap.
7. **Credibility band** (`#firm`) — 3-col founder section: eyebrow + heading left, 1-paragraph copy middle, 3-row CV timeline right. Top border rule. (Cross-check founder facts against `@/data` / existing trust copy — the live site already has founder bio content.)
8. **Final CTA** (`.dark-section`) — full-bleed dark band, "Five questions. Your production-readiness score in four minutes." → same assessment route as the hero CTA.

The prototype also carries an in-page **Tweaks panel** and a `focus` / `accent` / `density` toggle. **None of that ships** — it's dev tooling. Build the tightened hero + 3-bullet pillars, hard-code the chosen accent, done.

---

## Token mapping (prototype → live repo)
The live tokens live in `src/app/globals.css` under `@theme inline` as `--color-*`. Map the prototype's CSS vars onto the existing ones — don't add new ones:

| Prototype var | Use this existing token | Value |
|---|---|---|
| `--paper` (page bg) | `bg-parchment` | `#F6F3EC` |
| `--canvas` (card bg) | `bg-warm-white` | `#FFFFFF` |
| `--ivory` (alt section bg) | `bg-recessed` | `#ECE7DE` |
| `--ink` (dark bands) | `.dark-section` / `bg-forge-black` | `#08090B` |
| `--rule` (hairline) | `border-divider` | `#CEC6BA` |
| `--ink` (primary text) | `text-anthracite` | `#121214` |
| `--slate` (body text) | `text-warm-gray` | `#5B554D` |
| `--stone` (muted) | `text-stone` | `#9A948B` |
| text on dark | `text-bone` / `text-stone` | `#F2EFE8` / `#9A948B` |
| `--accent` | `text-brass` / `bg-brass` (now blue) | `#0E5DC2` |
| accent-2 / on-dark accent | `text-brass-light` (now blue) | `#4D8DE8` |
| success tick | `text-success` | `#287D72` |

**Type utilities to reuse** (already defined, but now sans after the global font swap): `.text-display` (display scale), `.text-h3`/`.text-h4`, `.text-body-lg`/`.text-body`/`.text-body-sm`, `.overline` (accent uppercase 11px eyebrow), `.metric` / `.metric-lg` / `.metric-xl` (JetBrains Mono, tabular-nums). The prototype's bespoke clamps (`h-display`, `h-1`, etc.) map onto these — and their weight/tracking values are the reference for re-tuning the now-sans heading rules.

**Container:** the prototype's `.wrap` = the repo's standard `mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10`.

---

## File mapping (real paths in `jpenz/clearforge-website`)

| Prototype | Lives in repo at | Action |
|---|---|---|
| `app.jsx` (composition) | `src/app/page.tsx` | Replace the body with the new section order |
| tokens in `styles.css :root` | `src/app/globals.css` (`@theme inline`) | Reuse token names; **change the `--color-brass*` values to blue** (Global changes §1). Add no new tokens. |
| fonts in `index.html` head | `src/app/layout.tsx` | **Change:** remove Instrument Serif, add Geist (see Global changes §2); keep JetBrains Mono |
| `Nav` | `src/components/layout/header.tsx` | **Reuse existing** — do not port |
| `Footer` | `src/components/layout/footer.tsx` | **Reuse existing** — do not port |
| `Hero` + `HeroProof` | `src/components/home/hero.tsx` (+ reuse `src/components/scorecard/score-ring.tsx`, `progress-bar.tsx`) | New |
| `PillarStrip` | `src/components/home/objections.tsx` | New |
| `ProductionGap` | `src/components/home/production-gap.tsx` | New |
| `Engagements` | `src/components/home/engagements.tsx` | New |
| `Operators` | `src/components/home/operators.tsx` | New |
| `Case` + heatmap | `src/components/home/selected-work.tsx` | New |
| `CredibilityBand` | `src/components/home/credibility-band.tsx` | New |
| `FinalCTA` | `src/components/home/final-cta.tsx` | New |
| CTA buttons | `src/components/ui/button.tsx` | **Reuse** (`variant="default"` solid; `variant="link"`/`"ghost"` for the quiet secondary; `size="lg"`) |
| scroll-in motion | `src/components/home/homepage-animations.tsx` (`SectionReveal`, `StaggerReveal`) | **Wrap new sections** |
| animated numbers | `src/components/home/metric-counter.tsx` (`MetricCounter`) | Reuse for the stat strip / metrics |
| section copy | `src/data/homepage.ts` (follow the existing `@/data/*` pattern) | Put new strings/tiers/bullets here, not hardcoded in JSX |
| `tweaks-panel.jsx` | — | **Do not ship.** Dev tooling only |

**Sections being replaced** in the current `src/app/page.tsx`: it presently renders `HeroScroll`, a market-gap block, `ValueOperatingSystem`, `TransformationSpine`, `BenefitsRealizationSystem`, a results/case block, a use-cases block, first-90-days, a trust dark-section, and a final CTA. The new composition supersedes the homepage layout — remove or retire the home-only components you no longer use (`hero-scroll`, `value-operating-system`, `transformation-spine`, `benefits-realization-system`, `hero-operating-scene`, `hero-signal-overlay`, `operating-change-map`) once the new sections are in. **Leave all other routes, data models, the scorecard logic, and `/discover` untouched.**

Use server components by default (these sections are static); only `MetricCounter` / reveal wrappers need `"use client"`, and they already declare it.

---

## Copy
All copy in the prototype is final. Lift verbatim — but reconcile **founder facts** (name, CV years) and any **case-study numbers** against what's already in the repo's `@/data` so the new homepage doesn't contradict interior pages.

## Screenshots (visual reference)
In `screenshots/` — the tightened design as built:
- `01-hero.png` — hero + readiness-scorecard proof card
- `02-pillars.png` — 3 objection bullets
- `03-production-gap.png` · `04-engagements.png` · `05-operators.png` · `06-selected-work.png` · `07-final-cta.png`

(These show the **signal-blue** accent — now the final brand color after the site-wide reskin, so the screenshots match the intended result.)

## Files in this bundle
- `prototype/index.html` — page shell
- `prototype/styles.css` — full prototype CSS (source of truth for spacing, breakpoints, section layout)
- `prototype/app.jsx` — section composition + accent/focus/density logic
- `prototype/components/sections.jsx` — every section as a React function (incl. `HeroProof`)
- `prototype/tweaks-panel.jsx` — dev tooling only (do not port)
- `screenshots/` — rendered reference images

---

## Suggested prompt for Claude Code

> I have the Next.js + Tailwind v4 codebase `clearforge-website`. I've added a `design_handoff/` folder with a new homepage design as an HTML/React prototype.
>
> **Read `design_handoff/README.md` first** — especially §"⚠️ Global changes — DECISIONS MADE" and the token/file mapping tables. Then:
>
> 1. **First, do the site-wide changes in §"Global changes" of the README:** (a) reskin the accent — change the `--color-brass*` tokens in `src/app/globals.css` to signal blue (`#0E5DC2` / `#0A4A9C` / `#4D8DE8`) and fix the hard-coded teal/peach `rgba()`s and any teal hexes in SVGs/icons (grep `0B5E57`, `4, 120, 87`, `11, 94, 87`, `E0A072`); leave `--color-success` green. (b) Go all-sans — remove Instrument Serif from `layout.tsx`, add **Geist** (the `geist` package), point `--font-sans`/`--font-display` at it, keep JetBrains Mono, and re-tune the now-sans heading rules to `font-weight:600` + tight negative tracking (use `prototype/styles.css` `.hero__h`/`.h-1`/`.h-2` as the reference). Build the rest of the homepage on the existing utilities/tokens after that.
> 2. Rebuild `src/app/page.tsx` with the new section order: Hero → PillarStrip → ProductionGap → Engagements → Operators → Case → CredibilityBand → FinalCTA. Reuse `<Header>`/`<Footer>` from the layout — don't port the prototype's Nav/Footer.
> 3. Create one component per section under `src/components/home/` (see file-mapping table). Wrap them in the existing `SectionReveal`/`StaggerReveal`; use `<Button>` for CTAs; reuse the `scorecard/` components for the hero proof card. Put new copy in `src/data/homepage.ts`.
> 4. Build the **tightened** hero + **3 objection bullets** only — the prototype's Tweaks panel and focus/accent/density toggles are dev-only and must not ship.
> 5. Wire both the hero and final CTAs to the existing assessment/scorecard route.
> 6. Retire the home-only components no longer used; **leave all other routes, the scorecard logic, `/discover`, and data models untouched.**
> 7. Run `npm run build` and `npm run lint`; fix anything that breaks, then start the dev server and screenshot the homepage to compare against `design_handoff/screenshots/`.

## Best-practice notes
- **Pin the prototype.** Commit `design_handoff/` on a branch (e.g. `feat/homepage-redesign`) so Claude Code has a stable reference to diff against.
- **Scope it.** Tell the agent explicitly what NOT to touch (other routes, scorecard logic, `/discover`, content models) — otherwise it will refactor the world.
- **Iterate in passes.** 1) tokens + page composition, 2) per-section pixel polish, 3) responsive QA. Don't ask for everything at once.
- **Pre-flight.** Have it run the dev server and screenshot each section before claiming done; compare side-by-side with `screenshots/`.
