# PRD: V11 — ClearForge Full-Site Modernization (Clean-Slate Re-brand)

**Status:** Draft for approval · **Owner:** James Penz · **Builder:** Claude (end-to-end)
**Date:** 2026-07-08 · **Supersedes:** V9 design system (live), V10 (abandoned)

---

## 1. Introduction / Overview

clearforge.ai reads as a clean *editorial consulting* site. The bar the owner is measuring against — attentive.com, hightouch.com, salesforce.com — is *product-company* design. ClearForge's entire pitch is "we build production AI, not decks," so the site should look like the systems it sells.

This program is a **clean-slate re-brand + full-site rebuild**, grounded in two research teardowns (2026-07):

- **Teardown A (Attentive / Hightouch / Salesforce):** the "modern" feeling is 8 mechanical ingredients — product-as-hero-object, tri-font stack (grotesque body + serif display at normal/medium weight + mono eyebrows), quiet neutrals + ONE electric accent, motion-as-moments (marquees, autoplay product loops, IO reveals — no ambience), a number in every viewport tied to a named customer, fixed proof choreography (hero → logo marquee → product blocks → case metrics → restated CTA), token discipline (1px hairlines, 5–12px radii, flat cards), and **named SKU taxonomy as the design architecture**. Notably: almost **no gradients** — "modern" is not mesh-gradient glow.
- **Teardown B (2026 bar + implementation):** light-first wins for services trust; permanent-dark + neon is the #1 "AI slop" tell. One dark charcoal "product proof" band adds weight where it counts. One bento max. Real product UI in hero is current and strengthening; ClearForge's live agent is *ahead* of the interactive-demo curve — keep and foreground it. Avoid: gradient meshes/aurora, glassmorphism beyond nav, 3D blobs, particle fields, animated glowing borders, badge-above-H1, stat-banner rows, Inter-everywhere.

## 2. Goals

- The site is visually indistinguishable in quality from Attentive/Hightouch — while keeping consulting gravitas for $15K–$200K buyers (COOs, PE operating partners).
- ClearForge's assets are **productized**: the live analyzer, scorecard, value-chain generator, and blueprints presented as named product UI, not service descriptions.
- Every page on the site (SEO/AIO library included) is on the new system — zero legacy-styled pages at program end.
- Messaging reworked site-wide to the new positioning voice (Section 8).
- Performance holds: LCP < 2.5s on every page; no CWV regression.
- All existing conversion machinery keeps working: `/api/hero-analyze`, scorecard flow, discover pipeline, contact, analytics.

## 3. The New Brand (clean slate)

### 3.1 Identity thesis
**"The forge, modernized."** ClearForge makes AI *operational* — molten input, machined output. The brand voice is a precision workshop, not a lab or an agency.

### 3.2 Type — tri-font stack (per teardown formula)
| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (Google, variable) | Serif display at weight 500–600, tight tracking (−0.02 to −0.04em), *italic accent word* in hero headlines ("AI that actually *ships*."). The Academia/Victor-Serif move, license-free. |
| Body / UI | **Hanken Grotesk** (Google) | Warm neo-grotesque, 400/500/600. Replaces Geist. |
| Data / eyebrows | **DM Mono** (Google) | All stats, scores, labels, SKU tags — the "engineering firm" voice. Replaces JetBrains Mono. |

### 3.3 Color — quiet neutrals + one electric accent
| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#FAF7F0` | Light-first warm surface (differentiated vs everyone's white/black) |
| `--color-ink` | `#141210` | Near-black warm ink — contrast deepened per research |
| `--color-ink-2` | `#57534B` | Secondary text |
| `--color-hairline` | `#E3DED2` | 1px rules |
| `--color-ember` | `#E8490F` | **THE accent.** Electric ember — the forge. CTAs, accent words, live indicators, metric highlights. Used with discipline (one electric accent, per formula). |
| `--color-charcoal` | `#161511` | The single dark "product proof" band (agent demo section) + footer |
| `--color-success` | `#1F7A4D` | Semantic only |

No gradients (at most a restrained single-hue wash on the charcoal band). Radii: 6px tight / 12px loose (Attentive's token pair). Shadows: none-to-whisper; hairlines do the work.

### 3.4 Named SKU taxonomy (naming = architecture)
Productize and consistently name — these drive nav, cards, and footer like Agentforce/AI Pro do:
- **Forge Intelligence™** — the live analyzer agent (hero object)
- **Forge Scorecard™** — AI readiness score (rendered as dashboard UI)
- **Forge Blueprints™** — the blueprint library (artifact cards)
- **Forge Method™** — Diagnostic → Sprint → Scale (the engagement ladder, phased Linear-style narrative)

## 4. User Stories

### WAVE 1 — Design system + Homepage + Shell (first preview)

#### US-101: New design-token system
**Description:** As a builder, I need the V11 tokens (type, color, radii, spacing) in `globals.css` so every subsequent surface inherits the new brand.
**Acceptance Criteria:**
- [ ] Fraunces + Hanken Grotesk + DM Mono wired via `next/font/google`; Geist/JetBrains removed
- [ ] Full token block replaced (paper/ink/ember/charcoal/hairline per §3.3); old brass/parchment tokens mapped or removed with zero dead `var()` refs repo-wide
- [ ] Type scale utilities rebuilt: display serif clamps to ~5.5–7rem hero, mono eyebrow style, deepened body contrast
- [ ] Typecheck + build pass
- [ ] Verify in browser using dev-browser skill

#### US-102: Header + footer on the new system
**Description:** As a visitor, I see a modern nav (product-taxonomy dropdowns for the four Forge SKUs + Industries + Resources) and a charcoal footer.
**Acceptance Criteria:**
- [ ] Nav: Products (4 SKUs w/ one-line descriptions), Industries, Use Cases, Resources (Blueprints/Insights/Case Studies), Pricing; single ember CTA ("Get your readiness score")
- [ ] Shallow depth (no 40-item mega-nav); mobile drawer rebuilt
- [ ] Charcoal footer with SKU taxonomy columns
- [ ] Verify in browser using dev-browser skill

#### US-103: Hero — product-as-object with the live agent
**Description:** As a visitor, the first thing I see is a serif headline with an italic-ember accent word and the **live Forge Intelligence agent framed in browser chrome** — real product, analyzing live.
**Acceptance Criteria:**
- [ ] Serif display headline (new messaging, §8), one-sentence sub, dual CTA ("Get a demo"-class primary + "Try the analyzer" secondary or the input itself)
- [ ] Agent card reframed in browser-chrome treatment; idle state shows a looping 10–15s recorded analysis of a recognizable brand (poster-first, lazy, muted) OR the live input — decided in build against LCP budget
- [ ] Headline is the LCP element (server-rendered text); agent island lazy-hydrates post-paint
- [ ] `/api/hero-analyze` untouched and functional
- [ ] Verify in browser using dev-browser skill

#### US-104: Logo marquee (slot #2) + proof choreography
**Description:** As a visitor, immediately under the hero I see client/industry logos in a CSS marquee, then product blocks, then metric-paired case cards — the fixed choreography.
**Acceptance Criteria:**
- [ ] CSS-keyframe marquee (reduced-motion respected); anonymized-safe logo treatment where client names can't be used (industry wordmarks / "as measured at a $4B industrial conglomerate" chips)
- [ ] Homepage section order: Hero → Marquee → Product blocks (4 SKUs w/ real UI) → Method narrative → Case metrics → Charcoal agent-proof band → Final CTA
- [ ] A number in every viewport, each tied to a named case ("1,181 opportunities — $4B industrial")
- [ ] Verify in browser using dev-browser skill

#### US-105: Product blocks — the four SKUs as real UI
**Description:** As a visitor, I see the Scorecard as dashboard UI, Blueprints as artifact cards, the value-chain generator as diagram cards, and the Method as a phased narrative — product screenshots, not icon-and-blurb.
**Acceptance Criteria:**
- [ ] Each SKU block contains a designed product-UI visual (built as styled DOM/SVG, not raster mockups, so they stay crisp + theme-consistent)
- [ ] One bento grid maximum on the homepage
- [ ] DM Mono eyebrow labels; 6/12px radii; hairline borders
- [ ] Verify in browser using dev-browser skill

#### US-106: Motion system
**Description:** As a visitor, motion appears as moments: marquee, autoplay product loops, IO scroll-reveals, animated stat counters — no scroll-jacking or ambient parallax.
**Acceptance Criteria:**
- [ ] CSS scroll-driven animations for simple reveals; GSAP only where pinning/scrubbing/counters need it; Lenis kept
- [ ] `prefers-reduced-motion` honored globally
- [ ] No new animation libraries added
- [ ] Verify in browser using dev-browser skill

### WAVE 2 — Funnel pages (second preview)

#### US-201: /discover on the new system
- [ ] Full-run agent experience restyled (browser-chrome frame, ember accents, charcoal band); pipeline logic untouched
- [ ] Verify in browser using dev-browser skill

#### US-202: /scorecard + /scorecard/results as product UI
- [ ] 20-question flow restyled as dashboard-grade UI; results page = shareable "product report"; flow logic untouched (full-path test)
- [ ] Verify in browser using dev-browser skill

#### US-203: /pricing as the Method ladder
- [ ] Diagnostic/Sprint/Scale as the phased narrative w/ transparent prices (kept — validated wedge); FAQ restyled; FAQPage schema kept
- [ ] Verify in browser using dev-browser skill

#### US-204: /contact + /about on the new system
- [ ] New-voice messaging; founder credibility block; forms restyled; API untouched
- [ ] Verify in browser using dev-browser skill

### WAVE 3 — SEO/AIO library re-template (third preview)

#### US-301: Use-cases hub + detail template
#### US-302: Blueprints hub + detail template
#### US-303: Industries hub + 17 value-chain pages template
#### US-304: Insights hub + article template
#### US-305: Case-studies hub + story template
#### US-306: Operating-model page
**Shared Acceptance Criteria (each):**
- [ ] Re-templated to V11 tokens/components; zero legacy classes remain on the page
- [ ] ALL slugs still statically generated; URLs unchanged; JSON-LD schemas preserved (Service/OfferCatalog, Article, FAQPage, Breadcrumb)
- [ ] llms.txt + sitemap intact; metadata/descriptions updated to new voice
- [ ] Verify in browser using dev-browser skill (hub + ≥1 slug each)

#### US-307: Brand asset sweep
- [ ] icon.svg / apple-icon / OG image / favicon.ico re-drawn to ember-on-charcoal; contact-email template restyled; maturityColor ramp re-toned; zero old-palette hexes repo-wide (grep gate)

## 5. Functional Requirements

- FR-1: All existing routes keep their URLs; no redirects needed.
- FR-2: `/api/hero-analyze`, `/api/discover/*`, `/api/scorecard`, `/api/contact`, `/api/analytics` remain functionally unchanged.
- FR-3: Every page ships the same JSON-LD it ships today (or richer).
- FR-4: Fonts load via `next/font` with `display: swap`; zero layout shift from font swap on hero.
- FR-5: The dark charcoal band appears exactly once per page maximum (the product-proof moment).
- FR-6: Ember accent is the only saturated color on any page (success green semantic-only).
- FR-7: Each wave merges to `main` only after preview sign-off by owner; tags `v11.1`, `v11.2`, `v11.3`.
- FR-8: 170+ unit tests pass at every wave; scorecard 20-question path manually verified in Wave 2.

## 6. Non-Goals (Out of Scope)

- No CMS migration, no new backend features, no new routes (except any messaging-driven renames explicitly approved).
- No filmed video production, analyst badges (no coverage), homepage pricing modules beyond the Method ladder, 300-tool integration grids.
- No dark-mode toggle (light-first, one charcoal band).
- No new animation libraries (GSAP + CSS only).
- Kombai not used (owner chose Claude end-to-end).

## 7. Technical Considerations

- Stack unchanged: Next.js 16 / React 19 / Tailwind v4 / GSAP + Lenis / Vercel.
- Hero LCP = server-rendered text; agent = lazy client island (dynamic import post-hydration).
- Product-UI visuals built as DOM/SVG components (not raster) for crispness, theming, and tiny payloads; any demo loops are poster-first lazy MP4/WebM.
- Biome + npm-audit are pre-existing-red on main; V11 must not add new violations (same standard as V9/V10 PRs).
- Branch: `feat/v11-modernization`; PR per wave; CI gates: TypeScript, Vitest, Semgrep, TruffleHog green.

## 8. Messaging Rework (direction)

Voice: **precision workshop** — confident, concrete, zero hype. Every claim paired with a number and a name.
- Hero direction (final copy in Wave 1): serif with ember italic accent — candidates: "AI that actually *ships*." / "Make AI *operational*." / "From ambition to *production*."
- Keep (research-validated): transparent pricing, "production AI not decks," the live-proof agent, pilot-purgatory pain language.
- Rework: every page's headline/sub/section copy rewritten in the new voice; SKU naming (§3.4) applied consistently; metadata + OG descriptions refreshed; AEO answer-capsule pattern kept on insights.

## 9. Success Metrics

- Owner sign-off each wave ("this matches the Attentive/Hightouch bar").
- LCP < 2.5s (Vercel Analytics) on /, /discover, /scorecard, one industry page.
- Zero broken routes; 100% of sitemap URLs return 200 post-Wave-3.
- Agent runs (hero-analyze calls) per session ≥ current baseline after Wave 1.
- All schema validates in Rich Results test post-Wave-3.

## 10. Open Questions

1. **Accent confirmation:** Ember orange `#E8490F` is the recommendation (ownable, on-metaphor). Alternates if it doesn't land on preview: electric cobalt `#2138CA` (Salesforce-adjacent) or acid mint (Hightouch-adjacent). Decide on Wave-1 preview.
2. **Hero object mode:** live input vs recorded loop of the agent analyzing a known brand — will build both behind the LCP budget and pick on preview.
3. Client logo permissions for the marquee — anonymized industry chips used wherever real logos aren't cleared.
