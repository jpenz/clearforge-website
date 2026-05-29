/**
 * Homepage copy + data — V9 redesign (design_handoff/).
 * Single source of truth for the homepage section components.
 *
 * Reconciliation notes (per handoff README "reconcile against @/data"):
 * - Engagements pull from forge-products.ts (the /pricing source of truth),
 *   NOT the prototype's higher placeholder prices.
 * - Founder facts use the established repo narrative (ex-Bain · EY · Capgemini,
 *   AI Automation practice), NOT the prototype's Bain-only CV.
 * - Case metrics use the real industrial-manufacturer case study numbers.
 * - Market-gap stats (79%/11%/68pt) are from the May 2026 Market Study,
 *   matching the prototype's designed thesis section.
 */

// ── Hero ──────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'AI consulting for mid-market & PE-backed companies',
  headline: ['AI that ships.', 'ROI you can prove.'], // 2nd line's last word gets accent
  sub: 'We find your highest-value workflows, build the AI, and deploy it to production in 10–14 weeks — then track the ROI. Transparent pricing, no lock-in.',
  secondaryCta: { label: 'See engagements & pricing', href: '#engagements' },
  stats: [
    { value: '79% → 11%', label: 'Claim AI adoption vs. run agents in production' },
    { value: '$11B', label: 'AI consulting market, growing 26% YoY' },
    { value: '47%', label: 'Of PE funds increasing AI spend in 2026' },
    { value: '10–14 wk', label: 'Kickoff to live production system' },
  ],
};

// The embedded Forge Intelligence agent that lives in the hero card.
// The visitor enters their site IN the card and it analyzes live — the card
// IS the agent, not a passive scorecard sitting next to a separate input.
export const heroAgent = {
  name: 'Forge Intelligence',
  heading: 'Score your AI readiness in 60 seconds.',
  prompt: 'Enter your website — our agent reads it and shows where AI pays off first.',
  cta: 'Analyze',
  note: 'Free · instant · no signup',
  gets: "You'll get a 0–100 readiness band and your top 3 AI opportunities.",
};

// ── Pillar strip — objection-neutralizing bullets, by objection frequency ──
export const pillars = [
  {
    objection: 'Pilots that never ship',
    rebuttal:
      'We define “live” up front and build to production criteria — not another POC that dies in a deck.',
  },
  {
    objection: 'No one can prove the ROI',
    rebuttal:
      'We baseline your KPIs on day one and track every dollar of impact through launch and beyond.',
  },
  {
    objection: 'We’ll be locked into a vendor',
    rebuttal:
      'You own the code, the models, and the runbooks. Hand-built in your stack, yours to keep.',
  },
];

// ── Production Gap ──────────────────────────────────────────────────────────
export const productionGap = {
  eyebrow: '01 — The thesis',
  headline: ['79% are buying AI.', '11% are running it.'],
  lede: 'The 68-point production gap is where strategy decks die — and where every ClearForge engagement begins.',
  bars: [
    { label: 'Claim AI adoption', value: 79, display: '79%', accent: false },
    { label: 'Agents in production', value: 11, display: '11%', accent: true },
    { label: 'Mid-market firms at full adoption', value: 15, display: '15%', accent: false },
    { label: 'Agentic projects facing cancellation', value: 40, display: '40%', accent: true },
  ],
  delta: { label: 'The production gap', value: '68 pts' },
  essays: [
    {
      eyebrow: 'Pilot purgatory',
      body: 'POCs without production-readiness criteria. We define “live” up front and ship to it.',
    },
    {
      eyebrow: 'Benefits void',
      body: '72% of AI investments destroyed value because no one tracked it. We measure baselines on day one.',
    },
    {
      eyebrow: 'Adoption gap',
      body: 'Builders leave; teams revert. We ship runbooks, training, and an operating cadence — not a handoff slide.',
    },
  ],
};

// ── Engagements ─────────────────────────────────────────────────────────────
// Section framing only — tier data is derived from forge-products.ts in the
// component so prices stay in lockstep with /pricing.
export const engagements = {
  eyebrow: '02 — Engagements',
  headline: ['A transparent ladder.', 'Mid-market budgets.'],
  lede: 'Published prices, fixed scope. Each step ships an artifact you own and credits forward into the next.',
  cta: { label: 'See full pricing & scope', href: '/pricing' },
};

// ── Operators ───────────────────────────────────────────────────────────────
export const operators = {
  eyebrow: '03 — Operators',
  headline: ['The humans on', 'your engagement,', 'by name.'],
  lede: 'ClearForge is staffed by senior operators only — Bain-grade strategists who also write production code. We don’t sell a methodology and pyramid a team underneath it. The signature on the proposal is the signature on the commit.',
  points: [
    {
      k: 'No bench',
      v: 'The senior operator who scopes the work runs the work. No handoff to a junior delivery team.',
    },
    {
      k: 'No nameless team',
      v: 'Every engagement lists the named humans on it. You meet them in week one.',
    },
    {
      k: 'Hand-built systems',
      v: 'Code, integrations, and runbooks are written by people — and reviewed by the operator who owns the outcome.',
    },
    {
      k: 'Adoption is staffed',
      v: 'A real human runs your training and 30-day post-launch reviews. Not a Notion doc and a Slack channel.',
    },
  ],
};

// ── Selected work — real industrial-manufacturer case study ──────────────────
export const selectedWork = {
  eyebrow: '04 — Selected work',
  headline: ['Sales intelligence', 'across 16 divisions.'],
  lede: 'A $4B industrial conglomerate replaced manual, siloed prospecting with a production AI intelligence platform — calibrated to its own product lines.',
  sector: 'Industrial · Sales Intelligence',
  body: 'Proprietary agents scan capital projects and demand signals across 20+ states, feed reps scored opportunities daily, and surface cross-division white space — with KPIs tracked from day one.',
  metrics: [
    { value: '1,181', label: 'Qualified opportunities in 6 months' },
    { value: '99.8%', label: 'Match to actual product capabilities' },
    { value: '$20B+', label: 'Investment value in the top 10 alone' },
  ],
  vizTopLeft: 'SIGHTFORGE / R0.12',
  vizTopRight: '20+ STATES',
  vizBottomLeft: 'VALUE POOL — $ / WEEK',
  caseSlug: 'industrial-manufacturer',
};

// ── Credibility band — reconciled to repo founder narrative ──────────────────
export const credibility = {
  eyebrow: '05 — Firm',
  headline: ['A consultant', 'who builds.'],
  copy: 'Founded by James Penz — 15 years across Bain, EY, and Capgemini, including Bain’s AI Automation practice, before building ClearForge. The team in the discovery call is the team that ships. Senior operators only.',
  cv: [
    { yr: '2024–', label: 'ClearForge.ai · Founder & Managing Partner' },
    { yr: 'Prior', label: 'Bain · AI Automation practice' },
    { yr: 'Prior', label: 'EY · Capgemini · Digital & Transformation' },
  ],
};

// ── Final CTA ────────────────────────────────────────────────────────────────
export const finalCta = {
  eyebrow: '— Next step',
  headline: ['Five questions.', 'Your production-readiness score in four minutes.'], // last line accent target = "production-readiness"
  sub: 'See where you sit against the 11% running agents in production — and what to fix first.',
  primaryCta: { label: 'Take the readiness score', href: '/scorecard' },
  secondaryCta: { label: 'Book a 30-min intro', href: '/contact' },
};
