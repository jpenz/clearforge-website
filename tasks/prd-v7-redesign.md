# PRD: ClearForge.ai V7 — Research-Backed Full Redesign with AI Discovery Agent

## Introduction

Complete ground-up rebuild of clearforge.ai informed by 37 pages of competitive intelligence (CellCog agent team research analyzing 16 AI consulting firms) and a 14-page conversion playbook with data from 19+ industry reports. This redesign introduces "The Forge Method™" as ClearForge's named framework and "Forge Intelligence™" as the industry's first AI-powered discovery agent on a consulting website.

**The core insight:** Not a single AI consulting firm (of 16 analyzed including McKinsey, BCG, Bain, Accenture, Palantir, Thoughtworks) targets mid-market companies, shows pricing, or offers an interactive lead gen tool. ClearForge will be first in all three — creating an unfillable competitive moat.

## Goals

- Be the first AI consulting website explicitly targeting $50M-$500M companies
- Be the first consulting firm to show transparent pricing and timelines
- Be the first consulting firm with an AI-powered discovery agent that generates personalized reports
- Achieve 4-6% visitor-to-lead conversion (professional services benchmark)
- Achieve 10%+ conversion on dedicated case study pages (industry benchmark: 10.7%)
- Lighthouse 95+ across all categories
- Homepage follows research-proven 7-section CLOSER flow

## User Stories

### US-001: Design System & Foundation
**Description:** As a developer, I need the complete V7 design system so all components are visually consistent.

**Acceptance Criteria:**
- [ ] `globals.css` with complete palette: Navy (#0B1222), Parchment (#FAFAF8), Electric Blue (#2563EB), Bone (#E8E8F0), Anthracite (#1A1A2E)
- [ ] Google Fonts: Instrument Serif (display), Inter (body), JetBrains Mono (metrics)
- [ ] Type scale from Display XL (72px) to Caption (12px) with responsive breakpoints
- [ ] Utility classes: `.overline`, `.metric-xl`, `.metric-lg`, `.dark-section`
- [ ] Lenis smooth scroll + GSAP ScrollTrigger integration
- [ ] `prefers-reduced-motion` full fallback
- [ ] Typecheck passes

### US-002: Navigation — Transparent to Frosted Glass
**Description:** As a visitor, I want navigation that's invisible on the hero but elegantly appears on scroll.

**Acceptance Criteria:**
- [ ] Transparent on hero (light text)
- [ ] Frosted glass after scroll: `backdrop-blur`, translucent parchment, text switches to dark
- [ ] Height: 80px → 64px transition
- [ ] "CLEARFORGE" uppercase wordmark left
- [ ] Nav links center: Services, Case Studies, Industries, About
- [ ] Primary CTA right: "Start My Assessment" (electric blue, first-person language for 202% lift)
- [ ] Mobile: full-screen navy overlay with Instrument Serif links
- [ ] Typecheck passes
- [ ] Verify in browser

### US-003: Homepage — 7-Section CLOSER Flow
**Description:** As a CEO or PE partner visiting clearforge.ai, I want to immediately understand what ClearForge does, see proof it works, and have a clear low-friction next step.

**Acceptance Criteria:**

**Section 1: Hero (0-5 sec) — CLARIFY**
- [ ] Headline: "AI that delivers. Built for companies like yours." (Instrument Serif, 72px)
- [ ] Subline: "We build production AI systems in 6-10 weeks for $75K-$200K. No enterprise budgets required."
- [ ] Single primary CTA: "Start My Assessment" (centered, electric blue)
- [ ] Secondary: "See Our Work" (text link)
- [ ] Pinned scroll: hero pins for 2x viewport, tagline reveals line-by-line with GSAP overflow masks
- [ ] Mobile: no pinning, vertical stack

**Section 2: Trust Bar (5-15 sec) — PROOF**
- [ ] Partner badges: AWS, Azure, GCP certifications (when available)
- [ ] Metric: "4.9/5 client satisfaction" or similar proof point
- [ ] Industry tags: Manufacturing · Financial Services · Healthcare · SaaS

**Section 3: Mini Case Studies (15-30 sec) — SELL THE VACATION**
- [ ] 2-3 result cards with specific metrics: "[Company size] reduced [metric] by [%] in [weeks]"
- [ ] Format: "$180M manufacturer → 30% cost reduction in 12 weeks"
- [ ] Each links to full case study
- [ ] GSAP stagger reveal on scroll

**Section 4: The Forge Method Preview (30-60 sec) — THOUGHT LEADERSHIP**
- [ ] "The Forge Method™" heading with brief framework overview
- [ ] 3 named products: Forge Diagnostic ($15K, 2 weeks) → Forge Sprint ($75K-$200K, 8-12 weeks) → Forge Operations ($5K-$15K/mo)
- [ ] Show timelines and price ranges (transparency differentiator)
- [ ] "Learn How It Works" secondary CTA

**Section 5: Pain/Solution Cards (60-90 sec) — LABEL THE PROBLEM**
- [ ] Cards organized by buyer situation (not service type):
  - "Revenue Stall" → AI Revenue Operations
  - "AI Pilots Not Scaling" → Forge Sprint deployment
  - "Post-Acquisition Integration" → PE Value Creation
  - "Manual Processes Bleeding Cost" → Performance Improvement
- [ ] Each card: problem name, 1-line description, relevant metric, link to service page
- [ ] CLOSER "L" step: naming the problem so they feel understood

**Section 6: Testimonial + Social Proof (90-120 sec) — REINFORCE**
- [ ] Full-width dark section with centered Instrument Serif italic quote
- [ ] Named attribution: "VP of Operations — Industrial Manufacturer, $180M Revenue"
- [ ] Below: Forge Intelligence CTA — "Not ready to talk? Let our AI analyze your situation."

**Section 7: Final CTA + Objections (120+ sec) — EXPLAIN & CLOSE**
- [ ] Primary CTA repeated: "Start My Assessment" (centered)
- [ ] 3-4 FAQ items addressing top objections (inline, not separate page)
- [ ] Phone number visible (research: executives want to know they can reach you)
- [ ] "Schedule a Confidential Discussion" as secondary CTA

- [ ] Typecheck passes
- [ ] Verify in browser

### US-004: Forge Intelligence™ — AI Discovery Agent (Dedicated Page)
**Description:** As a visitor, I want to interact with an AI agent that understands my business, follows the CLOSER framework, and generates a personalized PDF report with tech stack recommendations and a roadmap.

**Acceptance Criteria:**

**Page: /discover**
- [ ] Full-page conversational interface (not a sidebar widget)
- [ ] Clean chat UI: visitor messages right-aligned, agent messages left-aligned
- [ ] Instrument Serif for agent headings, Inter for body text
- [ ] Dark navy background with subtle noise texture

**CLOSER Conversation Flow:**
- [ ] **C — Clarify:** Agent opens with "What brings you to ClearForge today?" + 3-4 suggested situation cards (Revenue Stall, AI Pilots Stuck, Cost Reduction Needed, Exploring AI)
- [ ] **L — Label:** Agent labels their problem: "So it sounds like [specific problem]. Companies in your situation typically face [2-3 specific challenges]..."
- [ ] **O — Overview:** "What have you tried so far?" with suggested options (Hired consultancy, Built internally, Bought platform, Haven't started)
- [ ] **S — Sell Vacation:** Agent paints future state with specific metrics relevant to their industry/problem
- [ ] **E — Explain:** Proactively addresses 2-3 objections relevant to their profile
- [ ] **R — Reinforce:** Generates PDF report + offers to schedule call

**Data Collection (natural within conversation, not a form):**
- [ ] Company name and industry (asked conversationally)
- [ ] Revenue range (asked as context for recommendations)
- [ ] Current AI maturity (assessed through questions)
- [ ] Primary challenge and past attempts
- [ ] Name and email (for PDF delivery — asked at end, after value delivered)

**PDF Report Generation:**
- [ ] AI maturity score across 5 pillars (data, workforce, process, tech, strategy)
- [ ] Recommended enterprise tech stack for their industry
- [ ] 3-5 automation/AI agent opportunities specific to their workflows
- [ ] Prioritized roadmap: 90-day / 6-month / 12-month
- [ ] Investment range for recommended Forge Method engagement
- [ ] "What companies like yours are doing" competitive context

**Technical:**
- [ ] Backend: Claude Sonnet 4.6 via Anthropic SDK (direct API, not KIE)
- [ ] System prompt encodes CLOSER framework + ClearForge knowledge base
- [ ] Conversation state managed client-side (React state)
- [ ] API route: POST /api/discover — streams Claude response
- [ ] PDF generation: server-side via /api/discover/report
- [ ] Lead data saved to Supabase on email capture
- [ ] Typecheck passes
- [ ] Verify in browser

### US-005: Floating Forge Intelligence Indicator
**Description:** As a visitor on any page, I want a subtle indicator that I can talk to the AI agent without it being an intrusive chat bubble.

**Acceptance Criteria:**
- [ ] Persistent bottom bar (not bottom-right bubble): "Have questions? Talk to Forge Intelligence →"
- [ ] 48px height, dark navy, electric blue accent, Inter 600
- [ ] Appears after 10 seconds on page (not immediately)
- [ ] Click navigates to /discover
- [ ] Dismissible (remembers dismissal in sessionStorage)
- [ ] Does NOT appear on /discover page itself
- [ ] Typecheck passes
- [ ] Verify in browser

### US-006: Case Studies — Immersive Scroll Stories
**Description:** As a PE partner doing due diligence, I want case studies that prove ClearForge's impact with specific, verifiable metrics.

**Acceptance Criteria:**
- [ ] Listing page (/case-studies): dark hero + full-width horizontal cards
- [ ] Each card: industry tag, title, 1-line result, key metric in JetBrains Mono
- [ ] Detail pages: 5-section scroll story (Hero → Challenge → Approach → Results → Quote)
- [ ] Results section: 2x2 animated metric grid with GSAP counters
- [ ] Snapshot box at top: industry, company size, key KPIs, time-to-value
- [ ] CTA at bottom: "Want results like these? Start My Assessment"
- [ ] Typecheck passes
- [ ] Verify in browser

### US-007: Services — Organized by Industry + Named Products
**Description:** As a visitor, I want to find services relevant to my industry and understand what each named product delivers.

**Acceptance Criteria:**
- [ ] Services overview page: The Forge Method with 3 named products
- [ ] Each product: name, timeline, price range, deliverables, CTA
- [ ] Industry cards below: Manufacturing, Financial Services, Healthcare, SaaS, PE Portfolio
- [ ] Each industry card links to industry-specific service page
- [ ] Individual service pages follow conversion playbook structure: Value Prop → Problem → Approach → Proof → Deliverables → FAQ → CTA
- [ ] Typecheck passes
- [ ] Verify in browser

### US-008: About — Builder Identity
**Description:** As a visitor, I want to understand who's behind ClearForge and why their background matters.

**Acceptance Criteria:**
- [ ] Headline framing: "We build production AI systems" (not "We advise on AI strategy")
- [ ] Founder story: Bain → EY → Capgemini → ClearForge (credibility through pedigree)
- [ ] Values section: 3-4 principles with builder-oriented language
- [ ] "Platform vs. Partner" section addressing why hire ClearForge vs buy DataRobot/Dataiku
- [ ] Typecheck passes
- [ ] Verify in browser

### US-009: Contact — Confidential Discussion
**Description:** As a qualified visitor, I want to easily schedule a conversation.

**Acceptance Criteria:**
- [ ] CTA language: "Schedule a Confidential Discussion" (not "Book a Demo")
- [ ] 2-column: left info + right form
- [ ] Bottom-border inputs, electric blue focus state
- [ ] Fields: Name, Email, Company, Revenue (select), "What's your biggest challenge?"
- [ ] "What to expect" numbered list on the left
- [ ] Phone number visible: research shows executives want direct contact option
- [ ] Typecheck passes
- [ ] Verify in browser

### US-010: Pricing — Transparent Engagement Models
**Description:** As a buyer, I want to understand investment levels before committing to a conversation.

**Acceptance Criteria:**
- [ ] 3 named products with transparent pricing:
  - Forge Diagnostic: "From $15K · 2 weeks"
  - Forge Sprint: "$75K-$200K · 8-12 weeks" (featured)
  - Forge Operations: "$5K-$15K/mo · Ongoing"
- [ ] Each with: description, deliverables, ideal client profile, CTA
- [ ] ROI framing: "Clients typically see 3-5x return within 12 months"
- [ ] FAQ section addressing pricing objections
- [ ] Typecheck passes
- [ ] Verify in browser

### US-011: KIE.ai Asset Generation
**Description:** As a designer, I need custom-generated images for a distinctive visual identity.

**Acceptance Criteria:**
- [ ] Hero ambient texture (dark, abstract, 4K) via Nano Banana 2
- [ ] 3x case study industry images (manufacturing, services, PE) — abstract, warm earth tones, no people
- [ ] Noise grain overlay (tiled PNG, 3-5% opacity)
- [ ] OG social card background
- [ ] All optimized: WebP, lazy-loaded, blur placeholders

### US-012: Performance & Accessibility
**Description:** As a user, I want a fast, accessible experience.

**Acceptance Criteria:**
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] LCP < 2.5s, CLS < 0.1, TBT < 200ms
- [ ] WCAG AA contrast ratios (verified with axe-core)
- [ ] `prefers-reduced-motion` disables all GSAP
- [ ] Keyboard navigation for all interactive elements
- [ ] Schema.org JSON-LD for organization, services, articles
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v4
- FR-2: Server Components by default; `'use client'` only for interactive components
- FR-3: GSAP ScrollTrigger + Lenis for scroll-driven animations
- FR-4: Claude Sonnet 4.6 via Anthropic SDK for Forge Intelligence agent
- FR-5: Streaming responses for AI agent (SSE via API route)
- FR-6: PDF generation server-side for discovery reports
- FR-7: Supabase for lead data storage (conversations + contact form)
- FR-8: All ScrollTrigger instances clean up on unmount
- FR-9: Mobile (< 768px): no pinned scroll; vertical stack with fade-in
- FR-10: Preserve all existing API routes, scoring logic, and data files
- FR-11: CTA language uses first-person: "Start My Assessment" not "Start Your Assessment"
- FR-12: Single primary CTA per page section (266% conversion boost)
- FR-13: Deploy to Vercel with zero-downtime deployment

## Non-Goals (Out of Scope)

- No dark mode toggle (dark sections used architecturally)
- No CMS (content stays in TypeScript files)
- No i18n
- No user authentication/dashboard
- No 3D WebGL (performance risk)
- No third-party chat widget (Forge Intelligence is custom-built)
- No real-time calendar integration in V7 Phase 1 (link to Calendly is fine)
- No video generation (ambient loops only if time permits)

## Design Considerations

### Color System
| Role | Hex | Usage |
|------|-----|-------|
| Forge Navy | `#0B1222` | Dark sections |
| Parchment | `#FAFAF8` | Light sections |
| White | `#FFFFFF` | Cards, surfaces |
| Anthracite | `#1A1A2E` | Text on light |
| Warm Gray | `#5A5A6E` | Secondary text |
| Bone | `#E8E8F0` | Text on dark |
| Stone | `#8888A0` | Secondary on dark |
| Electric Blue | `#2563EB` | Primary accent, CTAs |
| Blue Hover | `#1D4ED8` | Hover state |
| Blue Light | `#60A5FA` | Accent on dark |
| Emerald | `#059669` | Success, positive metrics |
| Red | `#DC2626` | Error |

### CTA Language Spectrum (from Conversion Playbook)
| Commitment | Language | Placement |
|-----------|---------|-----------|
| Lowest | "Read the Case Study" | After content |
| Low | "Download the Framework" | After thought leadership |
| Medium | "Start My Assessment" | Hero + page end (PRIMARY) |
| High | "Schedule a Confidential Discussion" | Hero + after proof |
| Highest | "Request a Proposal" | Service pages only |

### Homepage Section Flow (Research-Proven)
```
Hero (CLARIFY) → Trust Bar → Mini Case Studies (SELL VACATION)
→ Forge Method Preview → Pain Cards (LABEL PROBLEM)
→ Testimonial (REINFORCE) → CTA + Objections (EXPLAIN + CLOSE)
```

## Technical Considerations

### AI Discovery Agent Architecture
```
Client (React chat UI)
  → POST /api/discover (streaming SSE)
    → Claude Sonnet 4.6 (system prompt: CLOSER + ClearForge knowledge)
    → Response streamed back to client
  → POST /api/discover/report (after conversation)
    → Generate PDF from conversation data
    → Save lead to Supabase
    → Return PDF URL
```

### File Structure
```
src/
├── app/
│   ├── layout.tsx, globals.css, page.tsx
│   ├── discover/page.tsx          (Forge Intelligence)
│   ├── services/page.tsx + [slug]
│   ├── case-studies/page.tsx + [slug]
│   ├── about, contact, pricing, insights, privacy, terms
│   └── api/
│       ├── discover/route.ts      (NEW: Claude streaming)
│       ├── discover/report/route.ts (NEW: PDF generation)
│       └── (existing routes preserved)
├── components/
│   ├── layout/ (header, footer, lenis-provider)
│   ├── home/ (hero, trust-bar, case-previews, forge-method, pain-cards, testimonial, cta)
│   ├── discover/ (chat-ui, message-bubble, situation-cards, report-preview)
│   ├── scorecard/ (preserved components)
│   └── ui/ (button, input, etc.)
├── lib/
│   ├── animations/ (easings, variants, hooks)
│   ├── discover/ (system-prompt.ts, pdf-generator.ts)
│   └── (preserved: scorecard, metadata, utils, supabase)
└── data/ (preserved)
```

## Success Metrics

- Visitor-to-lead conversion: ≥ 4% (professional services benchmark)
- Forge Intelligence completion rate: ≥ 60% of starts
- PDF report generation: ≥ 40% of completions
- Case study page conversion: ≥ 10%
- Time on homepage: ≥ 2 minutes (40% improvement target)
- Lighthouse: 95+ all categories
- Zero build errors, zero hydration errors

## Open Questions

1. Should Forge Intelligence conversations be stored for the sales team to review before the call?
2. Should the PDF report include a comparison to anonymized industry benchmarks?
3. Do we need a "Platform vs. Partner" comparison page addressing DataRobot/Dataiku?
4. Should we add Calendly integration for direct scheduling from the report?
