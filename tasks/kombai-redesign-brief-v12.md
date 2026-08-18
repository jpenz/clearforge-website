# ClearForge.ai V12 Full Redesign Brief (for Kombai)

Paste everything below this line into Kombai as the project brief.

---

You are redesigning clearforge.ai from scratch. You have full freedom on layout, typography, color system, and visual language. You are designing against one diagnosed failure, so read section 1 before anything else.

## 1. The problem you are hired to solve

The current site is well crafted but overwhelming. Independent audit findings:

- It makes three competing asks on most pages (a quiz, a free AI tool, a booking) and the paid conversation is the least visible: it appears once per page at 74 to 88 percent scroll depth and is missing from the header on mobile.
- 8 of 15 key pages have no call to action above the fold.
- 71 public pages, 9 top-level nav items, a 7-band homepage with two full product demos. First-time visitors cannot say what the firm's core offer is.

Your redesign succeeds if a first-time visitor can answer four questions within the first two screens of the homepage: What do they do? For companies like mine? What does it cost to start? What is the one next step?

## 2. Who ClearForge is

ClearForge is a founder-led AI consulting and build firm for mid-market companies ($20M to $500M revenue) and private equity operating teams. Founder: James Penz, formerly of Bain's AI and Automation practice. The firm designs an AI system for a specific workflow, builds it into production, and stays through adoption until the team actually uses it. Prices are published. The deliverable is the working system, not a report.

The core message, stated once and early: ClearForge builds AI systems your team actually uses. Everything else on the site supports that sentence.

## 3. Approved facts (the complete list)

These are the only numbers and claims that may appear anywhere in the design or copy. Do not invent metrics, testimonials, logos, ratings, or dashboard numbers. If a mockup or illustration needs a number, use one of these or label the element clearly as illustrative.

- 70 percent weekly-active adoption bar by day 90 (the standard the firm builds to)
- 10 to 14 weeks from kickoff to a live production system
- Forge Diagnostic: $15K fixed price, 2 weeks
- Eval and Reliability Audit: $15K fixed price, 2 weeks, for AI systems a company already built (eval harness, reliability gates, a fix plan)
- Forge Sprint: from $75K, typical range $75K to $200K+; every Sprint ships with an eval harness and reliability gates as a named deliverable
- Forge Scale: $5K to $15K per month (the Adoption Mile: named operator, weekly working cadence, live adoption scoreboard); top tier is a Fractional Chief AI Officer engagement, from $15K per month
- Forge Run: $2.5K to $7.5K per system per month, managed agent operations after a build (monitoring, production evals, SLAs, model upgrades)
- PE Portfolio Pack: portfolio AI scan, Diagnostic multipack across portfolio companies, sponsor-level adoption scoreboard; pricing scoped with the sponsor and deliberately not published
- Third-party stat that must render with its source when used: Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing (accordion.com/the-pe-ai-adoption-benchmark)
- Case study A, a $4B industrial conglomerate: 1,181 qualified opportunities across 3 divisions in 6 months; monthly volume ramped 32x, from 19 to 613; 631+ generated sales playbooks
- Case study B, a home and commercial services firm: commercial pipeline rebuilt from zero; 42 targets identified, 31 contacted, 18 quoted, 7 recurring accounts won
- Case study C: a PE operating team ran a portfolio-wide AI diagnostic and left with a prioritized execution plan
- Founder background: Bain AI and Automation practice, EY, Capgemini

Client names are always anonymized (for example "a $4B industrial conglomerate"). Never name a real client. Never name other consulting firms.

## 4. Site map (this consolidation is part of the redesign)

Top navigation, exactly five items plus one button, present at every viewport width including mobile:

Services · Proof · Pricing · Insights · About · [Book a 30-min intro]

Design these 12 surfaces:

1. **Home**: five beats, one thought per band. (a) The core statement plus the live agent card as proof of craft, one button. (b) What you get: three rows, Diagnose then Build then Run, each with its price and one impact line (the Run row covers adoption and managed operations together). (c) Proof: one featured case study with its real numbers, links to the rest. (d) Try before you call: one compact row linking the two free tools. (e) Price anchor plus booking band. FAQ accordion below for AI-search visibility.
2. **Services**: one page covering the catalog as a journey: Diagnose (Forge Diagnostic, plus the Eval and Reliability Audit for systems already built), Build (Forge Sprint, which ships with an eval harness), Adopt (Forge Scale, with its Fractional Chief AI Officer top tier), Run (Forge Run managed operations). Below the journey, a PE Portfolio Pack band for sponsors that uses the sourced Accordion stat from section 3. Replaces the current separate method and operating-model pages.
3. **Proof index**: case studies first, blueprint library as a secondary shelf on the same page.
4. **Case study detail template**: narrative arc (situation, what was built, results with the real numbers, how adoption was run), fully readable without interaction.
5. **Pricing**: the published tiers (Diagnostic and Eval Audit at fixed prices, Sprint from $75K with a soft ceiling, Scale monthly, Run per-system monthly) plus one unnumbered row: PE and multi-company platform work, scoped with the sponsor. A short "why our pricing is public" block near the top: buyers should not need a sales call to learn what getting started costs. Then what happens in the first two weeks, the Adoption Mile explained, FAQ accordion. Every tier's primary button is the booking button with the one canonical label; commitment graduation happens in row copy, never in button labels.
6. **Insights index** plus **7. article template**: readable long-form, generous measure, table support, no fake reading times.
8. **About**: founder-led, real headshot slot, background, why the firm exists, booking button.
9. **Contact / Book**: inline embedded calendar as the primary surface, short fallback message form below it.
10. **Forge Intelligence (/discover)**: the free AI workflow-mapping tool. Reached from the homepage tool row and footer, deliberately absent from top nav.
11. **Scorecard flow**: 10 questions, answered on a 1 to 5 scale, across 5 pillars, with progress; then a results readout page with an overall score, per-pillar bars, and a name/email/company unlock form.
12. **Industry page template**: one reusable template that 19 existing industry pages will re-skin onto; structure it as: the workflow pattern in this industry, what we would build, illustrative benchmark ranges clearly labeled as industry ranges rather than ClearForge results, booking button.

## 5. Functional surfaces: design their states, do not build their logic

Engineering will wire live systems into your output. Leave clearly named empty component slots and design every state:

- **HeroAgent** (homepage): a live streaming AI analysis card. States: idle (URL input plus three sample-company chips), running (short progress lines appear one by one), streaming (analysis fields fill in one at a time), done (complete readout plus booking button), error (graceful, with retry). Design all five states at desktop and mobile.
- **BookCallButton**: opens a scheduling modal. Label is always exactly "Book a 30-min intro".
- **BookingInline** (contact page): an embedded month-view calendar, roughly 600px tall, light theme.
- **ScorecardFlow** and **ScoreResults** as described in surface 11.

## 6. Design direction

- Full freedom on the visual system. Constants: the ClearForge name, an electric-cobalt brand mark (logo kit exists; the mark's color family should not clash with your palette), and a register that reads as a premium advisory firm that also ships working software.
- Quality floor: the current site scores Lighthouse 100 on performance and its typography is professionally executed. Beat it on clarity, do not fall below it on craft.
- Hard-won lessons, treat as constraints: content renders instantly, native scroll, no preloaders, no scroll-jacked or pinned sections, no reveal-on-scroll that hides content. Motion is small and purposeful (count-ups, hover states, the agent card's own state changes) and respects prefers-reduced-motion. Uniform bordered card grids read as template sites, avoid them for text content. Whitespace and typographic hierarchy over boxes.
- Numbers are first-class visual citizens: every viewport should carry at least one real number tied to a named thing.
- Imagery: no stock photography of people. Image slots should be labeled with intended content; final imagery will be AI-generated renders supplied by the team. The founder headshot is real and supplied.
- Accessibility: WCAG AA contrast everywhere, visible focus states, no meaning carried by hover alone, forms fully labeled with correct autocomplete attributes.
- Performance budget the design must not break: LCP 2.5s or less, INP 200ms or less, CLS 0.1 or less, on mobile. No heavy animation libraries; motion is CSS.

## 7. Copy rules (binding)

- No em dashes anywhere. Restructure the sentence instead.
- Short sentences. Plain names for things. State the finding and stop. No "not X but Y" constructions. Never praise the firm's own rigor; show the number instead.
- Every claim comes from the approved facts list in section 3.
- One canonical CTA label for booking: "Book a 30-min intro". Secondary links may point to the tools ("Map the Workflow" for /discover, "Take the scorecard" for the scorecard).
- Do not include any money-back guarantee language or any "rescue" offering. These are explicitly out of scope.

## 8. Deliverable format

- Responsive designs at 1440 and 390 for all 12 surfaces, every state of the functional components.
- Implementation as componentized Next.js App Router pages, TypeScript, Tailwind CSS v4, design tokens as CSS variables in one file. Server components by default; client components only where interaction demands it. No CSS-in-JS runtimes, no animation libraries.
- Empty, clearly named slots for the five functional components listed in section 5.

## 9. Acceptance checklist (the design will be tested against this)

- The four questions in section 1 are answerable from the first two homepage screens.
- One primary ask per screen; the booking button is reachable within one click from every page at every width.
- Navigation is five items plus one button, complete on mobile.
- Zero invented numbers, zero em dashes, zero client or competitor names.
- All functional states designed, including error and empty states.
- AA contrast passes on every text/background pair in the token file.

---

## Appendix: engineering notes (ClearForge team, not Kombai)

- URLs being consolidated (/operating-model, /use-cases, /how-we-work, PE pages) get 301s; industry and insight URLs stay live re-skinned. GSC, Bing, IndexNow re-verified after launch.
- Live systems to port into Kombai output: /api/hero-analyze NDJSON streaming agent, Cal.com embed (james-penz/30min), scorecard logic, Supabase lead capture, Resend contact, GA4 + first-party analytics, JSON-LD @graph + FAQ schema, llms.txt, robots AI-crawler allows.
- Full QA gate before any deploy: typecheck, build, vitest, Playwright journeys, axe-core AA, Lighthouse, prod-crawl screenshot review at both widths.
- Pricing page ships Offer/PriceSpecification JSON-LD and server-rendered HTML prices (AI crawlers read raw HTML; JS-only pricing is invisible to them). A "how much does AI consulting cost" guide containing our own numbers is queued for the insights library after launch, targeting the cost-query citation space.
