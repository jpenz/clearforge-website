# CLAUDE.md — ClearForge.ai Marketing Site

> Read this before touching any code. Run `npm run build` after every change.

---

## What This Is

Marketing + lead generation site for Clearforge AI, an AI transformation consulting firm.
Showcases services, case studies, pricing, and an AI Readiness Scorecard.

**Production URL:** https://clearforge.ai
**Repo:** https://github.com/jpenz/clearforge-website
**Business:** Clearforge AI (James Penz, ex-Bain AI Automation practice)

---

## Stack

- Next.js 16 App Router · React 19 · TypeScript 5 (strict: true)
- Tailwind CSS v4 · Radix UI primitives · Framer Motion
- Zod v4 for form validation
- Deploy: Vercel

---

## Design System

**Dark mode SaaS aesthetic** (Linear/Vercel quality). Clean, modern, premium.

```css
--navy: #0F172A;          /* page bg */
--blue: #3B82F6;          /* primary CTA */
--emerald: #10B981;       /* success/highlight */
--bg-dark: #0A0A0A;
--bg-card: #111111;
--bg-elevated: #1A1A1A;
--border-subtle: #1E293B;
--text-primary: #F8FAFC;
--text-secondary: #94A3B8;
```

**Typography:** Geist Sans (headlines + body) + Geist Mono (code)
**NO:** stock photos, corporate blue, jargon, flashy animations, light mode

---

## Commands

```bash
npm run dev          # dev server
npm run build        # MUST pass — run after every change
npm run lint         # biome check
npm run typecheck    # tsc --noEmit
```

---

## Services & Pricing

1. **AI Revenue Operations** — Sales automation, intent signals, pipeline analytics
2. **Performance Improvement** — Process mining, ops diagnostics, custom automation
3. **PE Value Creation** — 90-day sprints, portfolio AI playbooks, EBITDA improvement
4. **Custom AI Agents** — Bespoke agents for sales, ops, finance, orchestration

**Pricing:**
- AI Readiness Audit: $15K / 2 weeks
- Performance Sprint: $50K–$100K / 6–8 weeks
- AI Agent Retainer: $15K/mo ongoing

---

## AI Readiness Scorecard

18-question assessment across 5 pillars:
1. Data Maturity (30%)
2. Team Capability (25%)
3. Process Clarity (20%)
4. Technology Infrastructure (15%)
5. Leadership Alignment (10%)

Outputs a 0-100 score with tier: Starter / Developing / Advanced / Leader

---

## Performance Targets

- Lighthouse: **95+** on all pages
- LCP < 2.5s
- Server Components for all marketing pages
- Dynamic import: Recharts (scorecard), heavy Framer Motion sections

---

## What NOT To Do

- ❌ No light mode — dark only
- ❌ No stock photography
- ❌ No client names in case studies — anonymized only
- ❌ No `'use client'` on marketing pages (Server Components)
- ❌ No inline styles — Tailwind + CSS variables only
- ❌ Don't break the scorecard flow — test full 18-question path after changes
