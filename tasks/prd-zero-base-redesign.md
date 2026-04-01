# PRD: ClearForge.ai Zero-Base Website Redesign

## Introduction

Complete ground-up rebuild of clearforge.ai — not a reskin, not a token swap, but a new codebase with new layouts, new components, new animation architecture, and a fundamentally different user experience. The existing site has gone through V1-V5 iterations that produced a competent but generic consulting template. This redesign creates a distinctive, scroll-driven cinematic experience that makes ClearForge impossible to confuse with any other AI consulting firm.

**Problem:** The current site looks like every other AI consulting website — dark SaaS template with swapped colors. CEOs and PE partners visiting clearforge.ai should feel they've arrived at a firm that operates at a different level. The site itself must be proof of ClearForge's capabilities.

**Goal:** Build a website that functions as ClearForge's best case study — demonstrating technical depth, design craft, and strategic thinking in every scroll interaction.

## Goals

- Create a memorable, immersive first impression within 5 seconds of landing
- Increase scorecard completion rate through premium, friction-free UX
- Position ClearForge as a tier above boutique AI consultancies through design quality
- Achieve Lighthouse 95+ across all categories
- Generate 40%+ more time-on-page through scroll-driven storytelling (industry benchmark from scrollytelling research)
- Support SEO with proper page architecture and content hierarchy
- Build a component library that scales to future pages without losing design quality

## User Stories

### US-001: Design System Foundation
**Description:** As a developer, I need a complete design token system so all components share a consistent visual language.

**Acceptance Criteria:**
- [ ] New `globals.css` with complete Forge palette (Forge Black, Parchment, Brass, Bone, Anthracite + full spectrum)
- [ ] Google Fonts via `next/font`: Instrument Serif (display), Inter (body/UI), JetBrains Mono (data)
- [ ] Responsive type scale: Display XL (72px) down to Caption (12px) with mobile breakpoints
- [ ] Utility classes: `.overline`, `.metric-xl`, `.metric-lg`, `.dark-section`, `.divider-brass`
- [ ] Noise texture overlay, scrollbar styling, focus states, selection colors
- [ ] Tailwind v4 `@theme` block with all custom tokens
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Smooth Scroll + Animation Infrastructure
**Description:** As a user, I want buttery smooth scrolling with scroll-driven animations so the site feels premium and intentional.

**Acceptance Criteria:**
- [ ] Lenis smooth scroll provider (duration 1.2, exponential easing)
- [ ] GSAP ScrollTrigger integration with Lenis
- [ ] Reusable animation hooks: `useTextReveal()`, `useMetricCounter()`, `useStaggerReveal()`, `useParallax()`
- [ ] Easing constants: smooth (power2.out), precise (power3.out), editorial (power2.inOut), metric (power4.out)
- [ ] `prefers-reduced-motion` detection with full fallback (opacity-only for all animations)
- [ ] ScrollTrigger cleanup on unmount for all components
- [ ] Typecheck passes

### US-003: Navigation — Transparent to Frosted Glass
**Description:** As a user, I want navigation that's invisible on the hero but appears elegantly as I scroll, so content takes priority.

**Acceptance Criteria:**
- [ ] Transparent nav on hero (light text, no background)
- [ ] After hero: frosted glass effect (backdrop-blur, translucent parchment bg)
- [ ] Height shrinks: 80px → 64px on scroll
- [ ] "CLEARFORGE" uppercase wordmark (Inter 700, wide tracking) left-aligned
- [ ] Desktop nav links centered (Services, Case Studies, Assessment, About)
- [ ] "Book a Call" CTA right-aligned (brass-outlined button)
- [ ] Mobile: full-screen Forge Black overlay with Instrument Serif nav links, staggered GSAP reveal
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Homepage Hero — Scroll-Driven Transformation
**Description:** As a visitor, I want the hero to pin and reveal a narrative as I scroll, so I'm immediately engaged and understand what ClearForge does.

**Acceptance Criteria:**
- [ ] Full viewport height, Forge Black background with subtle noise/texture
- [ ] Pins for 3x viewport height (scrub-driven)
- [ ] Chapter 1 (0-33% scroll): Tagline reveals line-by-line with overflow masks — "Strategy that ships. *AI that performs.*" Instrument Serif 72px+. Brass italic accent.
- [ ] Chapter 2 (33-66% scroll): Problem statement fades in — "87% of AI pilots never reach production" with large JetBrains Mono metric. Supporting text appears.
- [ ] Chapter 3 (66-100% scroll): Solution — ClearForge's 3-phase approach (Audit → Sprint → Retainer) with animated timeline. CTAs appear: "Start Your AI Audit" (brass) + "See Our Results" (outlined)
- [ ] Canvas-based ambient visual: brass/gold particles with organic drift (NOT the old teal chaos-to-order)
- [ ] Mobile fallback: vertical stack with fade-in, no pinning
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Social Proof Marquee
**Description:** As a visitor, I want to see the types of companies ClearForge works with, building credibility before I read further.

**Acceptance Criteria:**
- [ ] Parchment background, thin top/bottom borders
- [ ] Horizontally scrolling text: company types separated by brass diamond glyphs
- [ ] GSAP scroll-driven (parallax, not time-based)
- [ ] Content: "PE-BACKED MANUFACTURERS ◆ SERIES B SAAS ◆ $200M HEALTHCARE GROUPS ◆ INDUSTRIAL SERVICES ◆ PORTFOLIO COMPANIES"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Problem Statement — Asymmetric Editorial
**Description:** As a visitor, I want to understand the problem ClearForge solves through compelling editorial layout.

**Acceptance Criteria:**
- [ ] Parchment background, asymmetric 7/5 column grid
- [ ] Left: Instrument Serif H1 headline + supporting paragraph
- [ ] Right: Single dramatic metric (87%) in JetBrains Mono 96px with caption
- [ ] Text reveals on scroll with GSAP
- [ ] Metric counter animates from 0 when in viewport
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Services — Pinned Scroll Showcase
**Description:** As a visitor, I want to explore all four service lines through an immersive scroll experience that reveals one service at a time.

**Acceptance Criteria:**
- [ ] Forge Black background, pinned for 4x viewport height
- [ ] Left column (4 cols): Vertical numbered progress indicator. Current service highlighted in brass.
- [ ] Right column (8 cols): Active service with brass geometric icon, Instrument Serif H2 title, Inter description, 3 deliverable bullets, brass "Learn More" link
- [ ] Services transition on scroll: previous fades out (x: 0 → -40, opacity 0), next slides in (x: 40 → 0, opacity 1)
- [ ] Mobile fallback: vertical card stack with border-top dividers, fade-in on scroll
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Metric Wall — Data as Architecture
**Description:** As a visitor, I want to see ClearForge's aggregate results presented as large, confident numbers that serve as visual focal points.

**Acceptance Criteria:**
- [ ] Parchment background with thin brass rule top/bottom
- [ ] 4-column grid: $47M+ / 3.2x / 89% / <90 days
- [ ] JetBrains Mono 48px, Anthracite color
- [ ] Each number animates from 0 via GSAP counter (power4.out, 2s duration)
- [ ] Stagger: 0.15s between each counter start
- [ ] Captions below each metric in Inter body-sm
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Case Study — Immersive Scroll Story
**Description:** As a PE partner, I want to read each case study as a cinematic, data-rich narrative that proves ClearForge's impact.

**Acceptance Criteria:**
- [ ] Each case study page: full scroll story with 5+ sections
- [ ] Section 1: Dark hero with industry category, title, one-line summary
- [ ] Section 2: Parchment — "The Challenge" with asymmetric layout
- [ ] Section 3: Dark — "The Approach" with scroll-driven phase timeline
- [ ] Section 4: Parchment — "The Results" with animated metric counters in 2x2 grid
- [ ] Section 5: Dark — Pull quote from client (Instrument Serif italic, centered)
- [ ] CTA band at bottom: "Want outcomes like these?" + Book a Call button
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Case Studies Listing Page
**Description:** As a visitor, I want to browse all case studies with enough context to choose which to read.

**Acceptance Criteria:**
- [ ] Dark hero with overline + Instrument Serif H1
- [ ] Parchment list section: each case study as a full-width horizontal card
- [ ] Card: industry tag (overline), title (H2), excerpt, key metric (JetBrains Mono brass)
- [ ] Hover: brass left border + subtle y-lift
- [ ] Framer Motion stagger reveal
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Process Timeline — Scroll-Driven Line Fill
**Description:** As a visitor, I want to understand ClearForge's engagement model (Audit → Sprint → Retainer) through an animated timeline.

**Acceptance Criteria:**
- [ ] Parchment background, 3 numbered steps in horizontal layout
- [ ] Steps connected by brass line that fills on scroll scrub (GSAP ScrollTrigger)
- [ ] Each step: large JetBrains Mono number (brass), Instrument Serif H2 title, timeline badge, Inter description
- [ ] Steps fade in as the line reaches them
- [ ] Mobile: vertical layout, line on left
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-012: Testimonial — Centered Editorial Quote
**Description:** As a visitor, I want to read a compelling client quote that reinforces trust.

**Acceptance Criteria:**
- [ ] Forge Black background, full-width
- [ ] 120px brass quotation mark glyph (decorative)
- [ ] Quote in Instrument Serif italic, H1 size, Bone color, max-width 800px, centered
- [ ] Attribution: name (Inter 600) — title (Inter 400, Stone color)
- [ ] Line-by-line text reveal on scroll
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: Pricing — Narrative Engagement Descriptions
**Description:** As a visitor, I want to understand pricing through narrative engagement descriptions, not a checkbox comparison grid.

**Acceptance Criteria:**
- [ ] Parchment background
- [ ] 3 cards: AI Readiness Audit ($15K), Transformation Sprint ($50K-$100K, featured), AI Agent Retainer ($15K/mo)
- [ ] Featured card: Forge Black background, brass top border, "Most Popular" badge
- [ ] Non-featured: white background, divider border
- [ ] Each card: Inter H3 name, JetBrains Mono 48px price, deliverable bullets, CTA button
- [ ] Sharp corners (0 border-radius), no shadows
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-014: AI Readiness Scorecard — Premium Assessment UI
**Description:** As a visitor, I want to complete the 20-question AI readiness assessment through a premium, focused interface.

**Acceptance Criteria:**
- [ ] Parchment background, 720px max-width centered
- [ ] Brass progress bar: "Question 5 of 20" with pillar indicators
- [ ] Each question: Instrument Serif H3 text
- [ ] Answer options: full-width stacked radio buttons (selected: Forge Black bg, Bone text, brass left border)
- [ ] Horizontal slide transitions between pillars (0.3s power2.inOut)
- [ ] Results page: 96px JetBrains Mono score with SVG circular progress ring (brass stroke)
- [ ] Pillar breakdown with animated progress bars
- [ ] Lead capture gate before full results (email, name, company)
- [ ] **Preserve all existing scoring logic** from `lib/scorecard.ts`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-015: About Page — Editorial Founder Story
**Description:** As a visitor, I want to understand who's behind ClearForge and why their background matters.

**Acceptance Criteria:**
- [ ] Dark hero with overline + Instrument Serif H1
- [ ] Parchment approach section: 3-column grid with numbered steps, border-top dividers
- [ ] Dark values section: 2x2 grid with numbered items
- [ ] Parchment "Who We Work With" section: 3-column grid showing client personas
- [ ] Dark CTA: "Let's discuss your priorities."
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-016: Contact Page — Split Layout
**Description:** As a visitor, I want a clean, premium contact form that's easy to complete.

**Acceptance Criteria:**
- [ ] Parchment background, 2-column layout
- [ ] Left: Overline + Instrument Serif H1 + description + "What to expect" numbered list
- [ ] Right: Form with bottom-border-only inputs (no box borders), brass focus state
- [ ] Fields: Name, Email, Company, Revenue (select), Message
- [ ] Submit: full-width brass button
- [ ] Success state: brass-tinted confirmation card
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-017: Footer — Architectural Dark CTA Band
**Description:** As a visitor, I want the footer to close with impact and provide easy navigation.

**Acceptance Criteria:**
- [ ] Pre-footer CTA band: Forge Black, Instrument Serif display headline, dual CTAs
- [ ] Main footer: Forge Black, 4-column links (Services, Company, Industries, Contact)
- [ ] "CLEARFORGE" wordmark consistent with nav
- [ ] Link hover: brass color transition
- [ ] Bottom bar: copyright + privacy/terms links
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-018: Insights/Blog — Magazine Editorial Layout
**Description:** As a visitor, I want to browse thought leadership content in a magazine-style layout.

**Acceptance Criteria:**
- [ ] Dark hero with overline + H1
- [ ] Parchment content area: featured article (large, full-width) + grid of remaining articles
- [ ] Each article card: category tag (overline), title (H3), excerpt, read time
- [ ] Hover: brass accent + subtle lift
- [ ] Individual article pages: narrow content column (720px), Instrument Serif H1, Inter body, generous line-height
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-019: KIE.ai Asset Generation
**Description:** As a designer, I need custom-generated images to replace stock photography and create a distinctive visual identity.

**Acceptance Criteria:**
- [ ] Hero ambient texture: dark walnut/leather surface (Nano Banana 2, 4K)
- [ ] 3x case study abstract images: manufacturing, services, PE (warm earth tones, desaturated, no people)
- [ ] Noise grain overlay: film grain at 3-5% opacity (tiled PNG)
- [ ] OG social card background: dark editorial, minimal
- [ ] All images optimized: WebP, lazy-loaded below fold, blur placeholders
- [ ] Typecheck passes

### US-020: Performance + Accessibility Polish
**Description:** As a user, I want a fast, accessible experience regardless of device or ability.

**Acceptance Criteria:**
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse SEO: 95+
- [ ] LCP < 2.5s, CLS < 0.1, TBT < 200ms
- [ ] WCAG AA contrast ratios on all text (verified with axe-core)
- [ ] All images have meaningful alt text
- [ ] Skip-to-content link
- [ ] Full keyboard navigation for scorecard and forms
- [ ] `prefers-reduced-motion` disables all GSAP; opacity-only fallbacks
- [ ] Schema.org JSON-LD for organization, services, articles
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Site must be built with Next.js 16 App Router, React 19, TypeScript 5 (strict), Tailwind v4
- FR-2: Server Components by default; `'use client'` only for interactive/animated components
- FR-3: GSAP + ScrollTrigger + Lenis for all scroll-driven animations
- FR-4: Framer Motion for simpler entrance animations (whileInView, AnimatePresence)
- FR-5: All ScrollTrigger instances must clean up on unmount (no memory leaks)
- FR-6: Mobile (< 768px): no pinned scroll sections; degrade to vertical stack with fade-in
- FR-7: Font payload < 120KB total (subset Latin only, swap display)
- FR-8: JS bundle (main) < 150KB gzipped
- FR-9: Dynamic imports for Recharts (scorecard radar chart), heavy animation sections
- FR-10: Preserve all existing API routes (`/api/scorecard`, `/api/contact`, `/api/assessment`, etc.)
- FR-11: Preserve scorecard scoring logic (`lib/scorecard.ts`) — algorithms, questions, pillar weights
- FR-12: Preserve all data files (`data/services.ts`, `data/case-studies.ts`, `data/pricing.ts`, `data/insights.ts`)
- FR-13: All forms must submit to existing API endpoints with existing payload formats
- FR-14: Deploy to Vercel with zero-downtime deployment

## Non-Goals (Out of Scope)

- No dark mode toggle — dark sections used architecturally, not as user preference
- No CMS integration — content stays in TypeScript data files
- No i18n/localization
- No user authentication or dashboard
- No A/B testing framework
- No chatbot or AI assistant widget
- No 3D WebGL scenes (performance risk; canvas 2D only)
- No custom video player — ambient loops only
- No changes to scoring algorithms or API logic

## Design Considerations

### Color System
| Role | Hex | Usage |
|------|-----|-------|
| Forge Black | `#1A1714` | Dark sections: hero, testimonial, CTA, footer |
| Parchment | `#F6F1EB` | Light sections: content, forms, pricing |
| Warm White | `#FDFBF7` | Cards, elevated surfaces |
| Anthracite | `#2B2622` | Text on light backgrounds |
| Warm Gray | `#6B635A` | Secondary text on light |
| Bone | `#EDE8E0` | Text on dark backgrounds |
| Stone | `#8B7D6B` | Secondary text on dark |
| Forge Brass | `#B8860B` | Primary accent: CTAs, metrics, interactive |
| Burnished Gold | `#9A7209` | Accent hover state |
| Deep Teal | `#1A5C52` | Secondary accent: tags, secondary buttons |
| Divider Light | `#E5DDD3` | Borders on light |
| Divider Dark | `#3A332C` | Borders on dark |

### Typography
| Role | Font | Sizes |
|------|------|-------|
| Display | Instrument Serif 400/italic | 72px (XL), 56px, 44px, 36px |
| Headings H3+ | Inter 600 | 28px, 22px, 18px |
| Body | Inter 400/500 | 18px (lg), 16px, 14px (sm) |
| Data/Metrics | JetBrains Mono 500 | 96px (XL), 48px (lg), 24px |
| Overline | Inter 600 uppercase | 12px, tracking 0.08em |

### Layout Grid
- Desktop: 12-col, 1200px max-width, 24px gutters
- Tablet: 8-col, 40px side margins
- Mobile: 4-col, 20px side margins
- Section spacing: 192px desktop, 96px mobile

### Animation Vocabulary
| Technique | Tool | Duration | Easing |
|-----------|------|----------|--------|
| Text line reveals | GSAP SplitText | 0.6-0.8s per line | power2.out |
| Metric counters | GSAP tween | 2s | power4.out |
| Pinned scroll | GSAP ScrollTrigger | scrub 0.5 | none (linear) |
| Card stagger | Framer Motion | 0.5s, stagger 0.08s | [0.16, 1, 0.3, 1] |
| Horizontal marquee | GSAP | continuous 30s | linear |
| Nav morph | CSS transition | 0.3s | ease |
| Hero load | GSAP timeline | 0.3-0.8s sequenced | power2.out |

## Technical Considerations

### File Structure (New)
```
src/
├── app/
│   ├── layout.tsx          (new: fonts, Lenis, body)
│   ├── globals.css         (new: complete design system)
│   ├── page.tsx            (new: homepage)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── case-studies/page.tsx
│   ├── case-studies/[slug]/page.tsx
│   ├── scorecard/page.tsx
│   ├── scorecard/results/page.tsx
│   ├── pricing/page.tsx
│   ├── insights/page.tsx
│   ├── insights/[slug]/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/               (PRESERVED — no changes)
├── components/
│   ├── layout/
│   │   ├── header.tsx      (new: transparent → frosted)
│   │   ├── footer.tsx      (new: CTA band + links)
│   │   └── mobile-nav.tsx  (new: full-screen overlay)
│   ├── home/
│   │   ├── hero-scroll.tsx (new: pinned 3-chapter hero)
│   │   ├── marquee.tsx     (new: diamond-separated)
│   │   ├── problem.tsx     (new: asymmetric editorial)
│   │   ├── services-pinned.tsx (new: pinned scroll showcase)
│   │   ├── metric-wall.tsx (new: large counters)
│   │   ├── case-study-preview.tsx
│   │   ├── process-timeline.tsx (new: scroll-driven fill)
│   │   ├── testimonial.tsx (new: centered serif quote)
│   │   ├── assessment-cta.tsx
│   │   ├── objections.tsx
│   │   └── final-cta.tsx
│   ├── scorecard/
│   │   ├── scorecard-form.tsx (new UI, same logic)
│   │   ├── question-card.tsx  (new: card-style radios)
│   │   ├── progress-bar.tsx   (new: brass)
│   │   ├── score-ring.tsx     (new: SVG circular)
│   │   └── radar-chart.tsx    (preserved, color update)
│   └── ui/
│       ├── button.tsx      (new: brass variants)
│       ├── container.tsx   (new)
│       ├── section.tsx     (new: bg variants)
│       └── ...existing Radix primitives (token updates only)
├── lib/
│   ├── animations/
│   │   ├── easings.ts      (new)
│   │   ├── hooks.ts        (new: useTextReveal, useMetricCounter, etc.)
│   │   └── variants.ts     (new: Forge-themed)
│   ├── scorecard.ts        (PRESERVED)
│   ├── metadata.ts         (PRESERVED)
│   ├── utils.ts            (PRESERVED)
│   └── supabase.ts         (PRESERVED)
└── data/                   (PRESERVED — all files)
```

### Dependencies (Existing — No New Installs)
- GSAP + @gsap/react + ScrollTrigger (already installed)
- Lenis (already installed)
- Framer Motion (already installed)
- Recharts (already installed)
- Radix UI primitives (already installed)
- Tailwind v4 (already installed)

### Server Component Strategy
**Server Components (default):** All page.tsx files, layout.tsx, static content sections
**Client Components (`'use client'`):** Header scroll listener, mobile menu, Lenis provider, all GSAP sections (hero-scroll, services-pinned, metric-wall, process-timeline, marquee), scorecard form, contact form, AnimatePresence wrappers

## Success Metrics

- Lighthouse Performance ≥ 95 on homepage
- Lighthouse Accessibility ≥ 95 on all pages
- Time-on-page increase ≥ 30% vs current site (measured via analytics)
- Scorecard completion rate maintained or improved
- Contact form submission rate maintained or improved
- `npm run build` passes with zero errors
- Zero hydration errors in console
- All routes return 200 status

## Open Questions

1. Should we generate a hero ambient video loop via KIE.ai (Veo 3.1 / Kling 3.0) for desktop progressive enhancement? Budget: ~$2-4 per generation.
2. Should we add Calendly embed directly on the contact page, or keep the current form-only approach?
3. Do we want to add an insights/blog page in phase 1, or defer to phase 2?
4. Should the scorecard results page include a downloadable PDF report (requires additional API work)?

---

## Implementation Phases

### Phase 1: Foundation + Design System (Days 1-2)
US-001, US-002

### Phase 2: Navigation + Hero (Days 3-5)
US-003, US-004, US-005

### Phase 3: Homepage Content Sections (Days 6-10)
US-006, US-007, US-008, US-011, US-012

### Phase 4: Case Studies + Pages (Days 11-14)
US-009, US-010, US-013, US-015, US-016, US-017

### Phase 5: Scorecard + Blog (Days 15-18)
US-014, US-018

### Phase 6: Assets + Polish (Days 19-21)
US-019, US-020
