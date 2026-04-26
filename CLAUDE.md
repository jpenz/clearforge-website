# CLAUDE.md — ClearForge.ai Marketing Site

> Read this before touching any code. Run `npm run build` after every change.

---

## What This Is

Marketing + lead generation site for ClearForge AI, an AI transformation consulting firm.
Showcases services, case studies, pricing, the Forge Intelligence™ AI agent, and the AI Readiness Scorecard.

**Production URL:** https://clearforge.ai
**Repo:** https://github.com/jpenz/clearforge-website
**Business:** ClearForge AI (James Penz, ex-Bain AI Automation practice)
**Current version:** V8.24

---

## Stack

- Next.js 16 App Router · React 19 · TypeScript 5 (strict: true)
- Tailwind CSS v4
- GSAP + @gsap/react (hero parallax, scrub marquees, section reveals, text reveals)
- Lenis (smooth scroll)
- Framer Motion (legacy — still present in a few utility components)
- Radix UI primitives
- Zod v4 for form validation
- Anthropic + Perplexity APIs for Forge Intelligence discovery agent
- Deploy: Vercel

---

## Design System — V8 Editorial (NOT Linear/Vercel dark SaaS)

The site is an **editorial typographic layout** in the tradition of McKinsey, Bain, and print-first magazines — **not** a dark SaaS site. There are no card containers; ruled lines and whitespace do the structural work.

### Colors (actual values — see `src/app/globals.css`)

```css
/* Core palette */
--color-forge-black: #0A0F1E;   /* dark-section bg */
--color-parchment:   #F8F8F6;   /* light-section bg */
--color-surface:     #FFFFFF;   /* raised surfaces */
--color-recessed:    #F0F0ED;   /* recessed sections */
--color-anthracite:  #141428;   /* primary text on light */
--color-warm-gray:   #4A4A62;   /* secondary text on light */
--color-bone:        #EAEAF2;   /* text on dark */
--color-stone:       #9090A8;   /* secondary text on dark */

/* Accent — emerald #047857 (the variable is named "brass" for
   historical reasons from a V7→V8 pivot; the value is emerald,
   not actual brass #B08D57). Use `text-brass` / `bg-brass`. */
--color-brass:       #047857;   /* primary accent, WCAG AA */
--color-brass-hover: #065F46;   /* hover state */
--color-brass-light: #34D399;   /* on dark sections */

/* Borders */
--color-divider:      #C8C8D2;  /* on light */
--color-divider-dark: #232940;  /* on dark */
```

### Typography

- **Display / headlines:** Instrument Serif (via `var(--font-instrument-serif)`)
- **Body / UI:** DM Sans (via Tailwind default — **NOT Inter, NOT Geist**)
- **Metrics / mono:** JetBrains Mono (via `var(--font-jetbrains-mono)`)
- Hero headline size: `clamp(2.5rem, 8vw, 6.5rem)` — large serif IS the design element
- Overline: uppercase, tracking-widest, 10–12px
- All color + text combinations verified WCAG AA

### Layout rules

- **Ruled lines, not cards** — `border-t border-divider` between list items, not boxed containers
- Full-width sections alternating `bg-parchment` / `dark-section` / `bg-recessed`
- Asymmetric `lg:grid-cols-12` layouts, typography-first
- Max container width: `max-w-[1400px]`
- Whitespace is a load-bearing design element — respect the generous padding (`py-20 sm:py-32 lg:py-40`)

### Animation rules (enforced by premium-site-builder skill)

- Uses 5 distinct GSAP entrance types: `fade-up`, `slide-left`, `slide-right`, `scale-up`, `clip-reveal`
- **Never** repeat the same animation on consecutive sections
- Hero video background: Veo 3 ambient loop at `public/videos/hero-ambient.mp4`, desktop+tablet only, static fallback on mobile
- Marquee is **scroll-scrubbed**, not time-based
- Hero parallax: subtle y-translate via ScrollTrigger scrub

---

## Commands

```bash
npm run dev          # dev server (currently running on :3001 via tailscale)
npm run build        # MUST pass — run after every change
npm run lint         # biome check
npm run typecheck    # tsc --noEmit
```

Local dev with API keys requires explicit env var passing for Turbopack:
`ANTHROPIC_API_KEY=xxx PERPLEXITY_API_KEY=xxx npx next dev -p 3001`

---

## Core Features

### Forge Intelligence™ AI Agent (`/discover`)
3-phase UX: URL input → Perplexity company research → Claude Sonnet 4.6 CLOSER-framework conversation → PDF report.
API routes: `/api/discover`, `/api/discover/research`, `/api/discover/report`.

### The Forge Method™ (the service framework)
1. **Forge Diagnostic™** — 4 weeks, from $15K
2. **Forge Sprint™** — 10–14 weeks, $75K–$200K
3. **Forge Scale™** — ongoing, $5K–$15K/mo

**Guarantee:** If Forge Diagnostic doesn't identify 3 actionable AI opportunities with clear ROI, full refund.

### AI Readiness Scorecard (`/scorecard`)
18-question assessment across 5 pillars, outputs 0–100 score.
1. Data Maturity (30%)
2. Team Capability (25%)
3. Process Clarity (20%)
4. Technology Infrastructure (15%)
5. Leadership Alignment (10%)

Tier: Starter / Developing / Advanced / Leader.

### 64 routes total
Homepage, Services hub + 4 service pages, Case Studies + case detail, About, Contact, Pricing, Discover, Scorecard + Results, **17 Industry pages via /industries/[slug]** (data-driven from `src/data/industries-value-chains.ts`), Insights hub + 13 articles, Privacy, Terms.

### Industry value-chain system (V8.20)
- `src/data/industries-value-chains.ts` — 17 industries × 4-5 functions × 3-4 activities per function = ~300 addressable activities
- Each activity has: name, AI impact description, type (agent/automation/model/copilot), quantified business impact
- Single dynamic `/industries/[slug]/page.tsx` template renders all 17
- `/industries` hub groups by 10 categories (Industrials, FS, Healthcare, Tech, Consumer, Real Assets, Mobility, Travel, Energy, Public Sector)

### SEO + AEO/GEO optimization (V8.21, V8.24)
- Schema.org structured data: `ProfessionalService` (org), `Service` + `OfferCatalog` (industries — every value chain function/activity becomes indexable JSON-LD), `Article`/`BlogPosting`, `FAQPage`, `BreadcrumbList`, `CollectionPage`
- robots.txt explicitly opts in major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) — research showed 35.67x citation lift from schema markup
- 3 AEO pillar articles authored by James Penz (E-E-A-T): `ai-consulting-cost`, `ai-readiness-assessment-guide`, `fractional-caio-vs-full-time`

### Ad strategy as code (V8.23)
- `src/data/ad-strategy.ts` — 5 keyword clusters, 8 concrete campaigns across LinkedIn (70%) / Google (20%) / Meta (10%), positioning angles, buyer language to mirror

---

## Performance Targets

- Lighthouse: **95+** on all pages
- LCP < 2.5s
- Server Components for all marketing pages
- Client components only where GSAP / hero video / interactive forms are needed
- Dynamic import: Recharts (scorecard), heavy client-only components

---

## What NOT To Do

- ❌ **No dark SaaS aesthetic** — this is editorial, not Linear/Vercel. Read the V8 design notes before styling.
- ❌ **No cards / boxed containers** — ruled lines and whitespace only
- ❌ **No Inter, Geist, or system-ui fonts** — Instrument Serif + DM Sans + JetBrains Mono only
- ❌ **No stock photography** — photoreal people in offices are banned. Abstract editorial imagery (hand-drawn diagrams, data-viz, atmospheric particle fields) only.
- ❌ **No client names in case studies** — anonymized only ("$180M industrial manufacturer")
- ❌ **No `'use client'` on pages** — only on components that genuinely need it (GSAP, hero video)
- ❌ **No corporate blue** — brass (#B08D57) + emerald (#047857) accents only
- ❌ **Never break the scorecard flow** — test the full 18-question path after any scorecard change
- ❌ **Never land an orphaned asset** — if a PNG goes into `/public`, it must be referenced from source the same commit

---

## Version History

- **V8.24** — AEO pillar articles (cost, readiness, fractional CAIO) authored by James Penz, Article+FAQPage JSON-LD on insights, CTA language lift ("Schedule a Discussion" → "Book a 15-Min Diagnostic Call" — research-backed 35% conv lift), trust line credentials prepended
- **V8.23** — Ad strategy data file (5 keyword clusters, 8 campaigns, channel allocation 70% LinkedIn / 20% Google / 10% Meta, ownable positioning angles)
- **V8.22** — Homepage industries surface (12 of 17), research-backed trust line ("industry: 16%", "80% stuck in pilot")
- **V8.21** — Comprehensive SEO + structured data layer (ProfessionalService schema, Service+OfferCatalog on industries, BreadcrumbList, FAQPage, CollectionPage; robots.txt allows AI crawlers; data-driven sitemap)
- **V8.20** — 17-industry value-chain system + dynamic [slug] template + /industries hub. 64 static pages now (was 49)
- **V8.19** — McKinsey-grade editorial audit: anonymized case-study slug, "0 → Recurring" hero metric, fixed Industries footer IA, killed "pilot purgatory" homepage hero, atmospheric Contact hero
- **V8.18** — Fixed GSAP opacity bug + atmospheric hero bgs across all top-level pages
- **V8.17** — Seedance 2 video backgrounds on use case pages, scroll-driven hero (reverted)
- **V8.16** — Industry page hero overhaul (matches service page editorial pattern)
- **V8.15** — Service detail page editorial polish (fixed wrapping bug)
- **V8.14** — Hero LCP perf (1.1s → 0.7s desktop)
- **V8.5** — Wired orphaned Forge Method diagram into homepage, added atmospheric abstract bgs, fixed hero video opacity, deleted 30+ dead assets, rewrote this CLAUDE.md to match reality
- **V8.4** — Veo 3 AI-generated hero video background, updated KIE.ai API reference
- **V8.3** — Excalidraw Forge Method diagram generated (but not wired, fixed in V8.5)
- **V8.2** — premium-site-builder skill compliance (5 animation types, scroll-scrub marquee, pinned section)
- **V8.1** — DM Sans, 6.5rem hero, ken burns, horizontal marquee, frontend-design skill compliance
- **V8.0** — Editorial redesign: no cards, ruled lines, typography-first
- **V7.4** — McKinsey-level GSAP scroll experience + premium interactions
- **V7.3** — Mobile responsive, scroll animations, PDF reports, Lighthouse polish
- **V7.2** — Research-backed zero-base redesign with CLOSER framework + Forge Intelligence AI agent
