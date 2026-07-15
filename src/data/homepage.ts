/**
 * Homepage copy + data — V11 (clean-slate re-brand, precision-workshop voice).
 * Single source of truth for the homepage section components.
 *
 * Voice rules: confident, concrete, zero hype. Every claim pairs a number
 * with a name. SKU taxonomy (Forge Intelligence / Scorecard / Blueprints /
 * Method) is the architecture. Engagement prices always mirror
 * forge-products.ts (the /pricing source of truth).
 */

// ── Hero ────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'AI strategy · build · adoption — for mid-market & PE',
  // Rendered as: "AI that actually <em>ships</em>."
  headlineLead: 'AI that actually',
  headlineAccent: 'ships',
  sub: 'We find your highest-value workflows, build production AI, and get your teams to actually use it — in 10–14 weeks, with pricing you can see.',
  primaryCta: { label: 'Get your readiness score', href: '/scorecard' },
  secondaryCta: { label: 'See engagements & pricing', href: '/pricing' },
};

// ── The Adoption Gap — the problem beat (why us, before what we sell) ───
// Research-validated: "AI adoption gap" + "last mile" carry the most market
// currency (IBM 2026 CEO study; HBR/Forbes 2026). McKinsey's $3-of-change-
// per-$1-of-model anchor is the pricing ammo. The named method (Bain
// Results Delivery® move): The Adoption Mile™, stitched through every SKU.
export const adoptionGap = {
  eyebrow: 'The AI adoption gap',
  headlineLead: "AI doesn't fail in the build. It fails at",
  headlineAccent: 'adoption',
  lede: 'Most firms can stand up a pilot. Almost nobody staffs the last mile — so we productized it. The Adoption Mile™ runs inside every engagement: a named operator, weekly cadence, and an adoption scoreboard until your team runs it without us. The industry’s own planning math calls for $3 of change work per $1 of model build. We budget for it; most vendors hope.',
  stats: [
    {
      value: '79% → 11%',
      label: 'companies claiming AI adoption vs. running agents in production',
    },
    { value: '~70%', label: 'of transformations fail on people, not technology' },
    {
      value: '89%',
      label: 'of ClearForge projects reach production — adoption is staffed, not hoped for',
    },
  ],
  failures: [
    {
      k: 'Pilot purgatory',
      pain: 'POCs launch without production criteria, so nothing ever counts as "live."',
      counter: 'We define "live" up front and build to it — go/no-go criteria in week one.',
    },
    {
      k: 'The adoption gap',
      pain: 'Builders leave; teams quietly revert to the old way within a quarter.',
      counter:
        'A named operator runs your training, playbooks, and weekly cadence until the numbers move — the way we ran SightForge for a $4B industrial sales org.',
    },
    {
      k: 'The benefits void',
      pain: 'Nobody baselines KPIs, so nobody can prove the system paid for itself.',
      counter: 'We baseline on day one and track every dollar through launch and beyond.',
    },
  ],
  // The behavior bar The Adoption Mile™ builds to (measured on the scoreboard).
  bar: {
    stat: '70%',
    label:
      'weekly-active usage — the adoption bar we build to by day 90, tracked in the open on your scoreboard.',
  },
};

// The live agent in the hero (browser-chrome frame). Card copy only —
// behavior lives in components/home/forge-agent.tsx.
export const heroAgent = {
  name: 'Forge Intelligence™',
  url: 'clearforge.ai/agent',
  heading: 'Watch it work on your company.',
  prompt: 'Enter your website. The agent reads it and drafts your first AI play — live.',
  cta: 'Analyze',
  note: 'Free · ~60 seconds · no signup',
};

// ── Trust marquee (slot #2) — numbers tied to names, anonymized-safe ────
export const marqueeItems = [
  { stat: '1,181', label: 'qualified opportunities · $4B industrial conglomerate' },
  { stat: '99.8%', label: 'product-capability match rate · sales intelligence platform' },
  { stat: '89%', label: 'of ClearForge projects reach production' },
  { stat: '<90 days', label: 'to first measured ROI · median engagement' },
  { stat: '631+', label: 'AI sales playbooks generated · industrial client' },
  { stat: '17', label: 'industry value chains mapped · 300+ activities' },
  { stat: '$20B+', label: 'investment value in top-10 surfaced opportunities' },
];

// ── The Forge System — four SKUs as product blocks (one bento) ──────────
export const skuIntro = {
  eyebrow: '01 — The Forge System',
  headlineLead: 'Not a methodology.',
  headlineAccent: 'Working AI systems.',
  lede: 'Agents, automations, and dashboards your team actually works in — actions with a human in the loop, models that retrain and improve every month, results measured in the open. Two of them you can try right now, free.',
};

export const skus = [
  {
    id: 'intelligence',
    tag: 'FORGE-INTEL',
    name: 'Forge Intelligence™',
    desc: 'A live diagnostic agent. Paste a URL — it reads the business and drafts a readiness band plus the top three AI plays in about a minute.',
    stat: '~60s',
    statLabel: 'to first insight',
    href: '/discover',
    cta: 'Run the agent',
  },
  {
    id: 'scorecard',
    tag: 'FORGE-SCORE',
    name: 'Forge Scorecard™',
    desc: 'A 20-question production-readiness score across five pillars. Benchmarked against operators at your scale — realistic, not flattering.',
    stat: '0–100',
    statLabel: 'readiness score',
    href: '/scorecard',
    cta: 'Take the scorecard',
  },
  {
    id: 'blueprints',
    tag: 'FORGE-BP',
    name: 'Forge Blueprints™',
    desc: 'Deployment-ready system designs from real engagements — architecture, agents, integrations, and the KPIs each one moves.',
    stat: '8',
    statLabel: 'published blueprints',
    href: '/blueprints',
    cta: 'Browse blueprints',
  },
  {
    id: 'method',
    tag: 'FORGE-METHOD',
    name: 'Forge Method™',
    desc: 'Diagnostic → Sprint → Scale. Fixed scope, published prices, production criteria defined up front, benefits tracked from day one.',
    stat: '$15K',
    statLabel: 'transparent start',
    href: '/pricing',
    cta: 'See the ladder',
  },
];

// ── Method ladder — framing only; tiers derive from forge-products.ts ───
export const methodIntro = {
  eyebrow: '02 — Forge Method™',
  headlineLead: 'A transparent ladder,',
  headlineAccent: 'priced in public.',
  lede: 'Three engagements. Every one ships an artifact you own and credits forward into the next. No platform lock-in, no pyramid of juniors.',
};

// ── Case metrics — numbers with names ───────────────────────────────────
export const casesIntro = {
  eyebrow: '03 — Evidence',
  headlineLead: 'What changed, and',
  headlineAccent: 'for whom.',
  lede: 'Every engagement is measured against revenue, cost, or throughput. These are the receipts.',
};

// ── Charcoal band — credibility + final CTA (the one dark moment) ───────
export const charcoal = {
  eyebrow: 'The firm',
  headlineLead: 'Built by operators who',
  headlineAccent: 'ship',
  headlineTail: '.',
  copy: 'ClearForge was founded by James Penz — 15 years across Bain, EY, and Capgemini, including Bain’s AI Automation practice. The person who scopes your engagement builds it — and stays through adoption until your team runs it without us. Senior operators only, named on every proposal.',
  stats: [
    { value: '89%', label: 'projects reach production — industry median is 16%' },
    { value: '10–14 wk', label: 'kickoff to live production system' },
    { value: '3', label: 'engagement tiers, prices published' },
  ],
  primaryCta: { label: 'Get your readiness score', href: '/scorecard' },
  secondaryCta: { label: 'Book a 30-min intro', href: '/contact' },
};
