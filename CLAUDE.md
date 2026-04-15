# CLAUDE.md — ClearForge.ai Marketing Site

> Read this before touching any code. Run `npm run build` after every change.

---

## What This Is

Marketing + lead generation site for ClearForge AI, an AI transformation consulting firm.
Showcases services, case studies, pricing, the Forge Intelligence™ AI agent, and the AI Readiness Scorecard.

**Production URL:** https://clearforge.ai
**Repo:** https://github.com/jpenz/clearforge-website
**Business:** ClearForge AI (James Penz, ex-Bain AI Automation practice)
**Current version:** V8.5

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

### Colors

```css
/* Core palette — warm, archival, not "tech" */
--forge-black: #0A0F1E;      /* deepest dark */
--forge-navy:  #0A0F1E;      /* dark-section bg */
--parchment:   #F8F8F6;      /* light-section bg */
--bone:        #F5F3EE;      /* dark-section text */
--stone:       #B8B2A4;      /* dark-section secondary text */
--warm-gray:   #6B6459;      /* light-section secondary */
--anthracite:  #2A2A2A;      /* primary light-section text */

/* Accent — brass/emerald, not blue */
--brass:       #B08D57;      /* primary accent, WCAG AA on parchment */
--brass-light: #C9A978;      /* on dark-section */
--emerald:     #047857;      /* CTA secondary, WCAG AA */
--divider:     rgba(0,0,0,0.08);
--divider-dark: rgba(255,255,255,0.08);
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

### 47 routes total
Homepage, Services, 4 service pages, Case Studies + case detail, About, Contact, Pricing, Discover, Scorecard + Results, 5 Industry pages (Manufacturing, Financial Services, Healthcare, SaaS, PE), Insights, Privacy, Terms.

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

- **V8.5** — Wired orphaned Forge Method diagram into homepage, added atmospheric abstract bgs, fixed hero video opacity, deleted 30+ dead assets, rewrote this CLAUDE.md to match reality
- **V8.4** — Veo 3 AI-generated hero video background, updated KIE.ai API reference
- **V8.3** — Excalidraw Forge Method diagram generated (but not wired, fixed in V8.5)
- **V8.2** — premium-site-builder skill compliance (5 animation types, scroll-scrub marquee, pinned section)
- **V8.1** — DM Sans, 6.5rem hero, ken burns, horizontal marquee, frontend-design skill compliance
- **V8.0** — Editorial redesign: no cards, ruled lines, typography-first
- **V7.4** — McKinsey-level GSAP scroll experience + premium interactions
- **V7.3** — Mobile responsive, scroll animations, PDF reports, Lighthouse polish
- **V7.2** — Research-backed zero-base redesign with CLOSER framework + Forge Intelligence AI agent
