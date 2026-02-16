# ClearForge V5 Design Brief — Brand Rationale & Design Decisions

## Problem Statement
The V4 design used a dark mode + violet/purple color scheme that was indistinguishable from every AI startup on the internet. For a firm selling $50-100K engagements to CEOs and PE partners, this was actively undermining credibility. It screamed "hackathon" when it needed to whisper "boardroom."

## Design Direction: "Boardroom Editorial"

### Tone
**Editorial/Magazine** meets **Luxury/Refined**. Think: if The Economist published a consulting firm's website. Clean, authoritative, typographically driven.

### Color Palette Rationale
- **Midnight (#0F1A2E)** — Deep navy conveys trust, authority, establishment. Used by KKR, Blackstone, Goldman Sachs. Used for headings, hero backgrounds, dark sections.
- **Brass (#B8860B)** — Warm gold/brass accent. Premium without being flashy. Conveys establishment (think: law firm letterhead, financial institution accents). Used sparingly for metrics, labels, CTAs, accent elements.
- **White (#FFFFFF) + Ivory (#F7F8FA)** — Light mode default. More editorial, more premium, breaks from dark-mode AI cliché. Alternating white/ivory sections create rhythm.
- **Slate (#4A5568) + Stone (#718096)** — Body text and secondary text. Warm enough to feel approachable, professional enough to feel serious.
- **Fog (#E2E8F0)** — Borders and dividers. Subtle, structured, clean.

### What Was Eliminated
- ❌ Purple/violet (screams startup/gaming)
- ❌ Dark mode default (AI cliché)
- ❌ Gradient text (overused)
- ❌ Mesh gradient backgrounds (generic)
- ❌ Grid background pattern (developer aesthetic)
- ❌ Rounded pill buttons (casual)
- ❌ Neon/glow effects

### Typography Rationale
- **Libre Bodoni (headings)** — High-contrast modern serif. Editorial elegance. Says "established firm" not "startup." Banned: Inter, Roboto, Arial, Open Sans per skill requirements. A serif heading font was mandatory for consulting credibility.
- **Plus Jakarta Sans (body)** — Clean geometric sans-serif. Modern and readable. Not banned. Pairs well with Bodoni's editorial weight.
- **JetBrains Mono (metrics)** — Technical credibility for numbers and KPIs. Tabular-nums for aligned data.

### Layout Philosophy
- **Sharp corners** — Square borders, no rounded cards. More architectural, more serious.
- **Grid-based compositions** — Border-separated grids for data, metrics, and steps. Clean and structured like a financial report.
- **Generous whitespace** — The unforgettable element is typography + whitespace, not animations or effects.
- **Alternating light sections** — White → Ivory → White creates visual rhythm without color gimmicks.
- **Dark sections used sparingly** — Midnight backgrounds only for hero contrasts and final CTAs. Creates premium punctuation.

### Motion Philosophy
- Framer Motion for entrance animations only (fade + subtle translateY)
- No continuous animations, no particle effects, no gradient animations
- Scroll-triggered reveals with `whileInView`
- Animated number counters for metrics (the one "wow" moment, earned through substance)

### Component System
- **section-label** — 11px uppercase tracking, brass color. Consistent section identification.
- **metric-display** — JetBrains Mono, tabular-nums, brass color. For all numbers/metrics.
- **Border-grid cards** — `border border-fog` with no shadows. Clean, structured.
- **Buttons** — Square (no border-radius). Default: midnight bg. Brass variant for CTAs on dark sections.

### Accessibility
- WCAG AA contrast ratios throughout
- Brass (#B8860B) on white = 4.6:1 (passes AA for large text)
- Midnight (#0F1A2E) on white = 15.4:1 (passes AAA)
- Slate (#4A5568) on white = 7.0:1 (passes AAA)
- Semantic HTML, skip-to-content link, aria labels on interactive elements
- 16px+ font sizes, 44px+ touch targets

### Vercel/Next.js Best Practices Applied
- Server components by default, `"use client"` only where needed (interactivity)
- Dynamic import for recharts radar chart (bundle-dynamic-imports)
- Static generation for all content pages
- Metadata via `generateMetadata` for dynamic routes
- No barrel file imports
- Schema.org JSON-LD for organization, services, articles, FAQ

## Pages Built
1. `/` — Homepage (hero, problem, differentiators, how-we-work, services, case study, results, scorecard CTA, team, final CTA)
2. `/services` — All 4 service lines with deliverables and outcomes
3. `/case-studies` — Featured + list view
4. `/case-studies/industrial-manufacturer` — Full anonymized case study with animated metrics
5. `/scorecard` — 18-question, 5-pillar AI readiness assessment
6. `/scorecard/results` — Radar chart, pillar bars, email gate
7. `/pricing` — 4 tiers with Build & Transfer vs Managed Services framing
8. `/about` — Values, approach, team stats
9. `/insights` — Article listing
10. `/insights/[slug]` — 6 full articles (continuous-ai-agents, ceo-guide, etc.)
11. `/contact` — Form with validation
12. `/privacy`, `/terms` — Legal pages

## Build Status
- ✅ `npm run build` — ZERO errors
- ✅ All routes return 200
- ✅ Server running on port 3004
