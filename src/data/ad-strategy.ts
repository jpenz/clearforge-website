/**
 * Ad strategy + paid-acquisition plan.
 *
 * This file is the single source of truth for paid-acquisition campaigns.
 * Structured here so future tooling (ad-copy generator, UTM builder,
 * landing-page variant router, conversion attribution) can read directly
 * from it.
 *
 * Built from market research conducted 2026-04-25 covering AI consulting
 * demand patterns, competitor positioning (Slalom, BCG X, McKinsey QB,
 * boutique AI shops, fractional CAIO firms), and channel benchmarks.
 *
 * Key strategic insights:
 * - Buyer narrative is "execution gap" / "pilot purgatory" — leaders have
 *   activity, but the operating model is not changing. Mirror this language.
 * - Pricing transparency is a wedge against MBB + Slalom (both hide pricing)
 * - The $15K Forge Diagnostic is the TOFU magnet — make it the primary CTA
 * - LinkedIn = primary B2B channel (CPC $5-15, CPL $50-200, conv to opp 2-3x
 *   higher than other social)
 * - Meta = retargeting only (CPM 2-4x lower but targeting too coarse for
 *   $25M-$500M ICP firmographic precision)
 * - Search has $20-40 CPC for head terms; long-tail industry+role $5-15
 * - Disciplined ad/LP relevance is the single biggest controllable lever
 * - Content must be optimized for citation in ChatGPT/Claude/Perplexity,
 *   not just blue-link SEO
 */

export interface KeywordCluster {
  id: string;
  name: string;
  intent: 'TOFU' | 'MOFU' | 'BOFU';
  primaryProduct: 'diagnostic' | 'sprint' | 'scale';
  pillarKeywords: string[];
  longTailKeywords: string[];
  estimatedCPC: string; // descriptive range
  contentNeeded: string[];
  primaryLandingPage: string;
  primaryCTA: string;
}

export interface AdCampaign {
  id: string;
  channel: 'google' | 'linkedin' | 'meta';
  name: string;
  audience: string;
  objective: 'awareness' | 'consideration' | 'conversion' | 'retargeting';
  cluster: string; // KeywordCluster id
  format: string;
  budget: string;
  copyVariants: { headline: string; body: string; cta: string }[];
  landingPage: string;
  utm: { source: string; medium: string; campaign: string };
}

// ─────────────────────────────────────────────────────────────────────────
// Keyword Clusters — five primary topics that form content + ads pillars
// ─────────────────────────────────────────────────────────────────────────

export const keywordClusters: KeywordCluster[] = [
  {
    id: 'ai-readiness',
    name: 'AI Readiness & Diagnostic',
    intent: 'BOFU',
    primaryProduct: 'diagnostic',
    pillarKeywords: [
      'AI readiness assessment',
      'AI maturity model',
      'AI maturity assessment',
      'AI gap analysis',
      'AI readiness scorecard',
      'AI audit',
    ],
    longTailKeywords: [
      'AI readiness assessment cost',
      'how do I know if my company is AI ready',
      'AI readiness assessment for mid-market',
      'AI maturity assessment for manufacturing',
      'paid AI diagnostic vs free assessment',
      '90 day AI roadmap',
    ],
    estimatedCPC: '$8-18 (very high commercial intent)',
    contentNeeded: [
      'AI Readiness Scorecard pillar page (exists at /scorecard)',
      'How to Know If Your Company Is AI Ready (long-form Q&A)',
      "Free vs Paid AI Diagnostic — Buyer's Guide",
      'AI Maturity Model: 4-tier framework explained',
    ],
    primaryLandingPage: '/scorecard',
    primaryCTA: 'Take the free AI Readiness Scorecard',
  },
  {
    id: 'ai-pe-value',
    name: 'AI for PE Value Creation',
    intent: 'BOFU',
    primaryProduct: 'diagnostic',
    pillarKeywords: [
      'AI for private equity',
      'AI value creation private equity',
      'PE portfolio AI playbook',
      '100-day AI plan PE',
      'AI operating partner',
      'EBITDA AI levers',
    ],
    longTailKeywords: [
      'AI value creation PE portfolio',
      '100 day AI plan operating partner',
      'AI for portfolio company COO',
      'how to deploy AI across PE portfolio',
      'AI operating partner playbook',
      'mid-market PE AI consulting',
    ],
    estimatedCPC: '$15-30 (narrow ICP, high ACV)',
    contentNeeded: [
      'PE Portfolio AI Playbook (long-form)',
      '100-Day AI Plan for Operating Partners',
      'AI Diligence Checklist for Acquisitions',
      'Portfolio Diagnostic case study',
    ],
    primaryLandingPage: '/industries/private-equity',
    primaryCTA: 'Book a Portfolio Diagnostic',
  },
  {
    id: 'ai-agents-functions',
    name: 'AI Agents for [Function]',
    intent: 'MOFU',
    primaryProduct: 'sprint',
    pillarKeywords: [
      'AI agents for revenue operations',
      'AI agents for customer service',
      'AI agents for supply chain',
      'AI agents for procurement',
      'AI agents for sales',
      'agentic workflow design',
    ],
    longTailKeywords: [
      'AI agents for Salesforce',
      'AI agents for HubSpot',
      'AI agents for NetSuite',
      'AI agents for B2B sales',
      'how to deploy AI agents in production',
      'AI agents vs RPA',
      'AI agent implementation cost',
    ],
    estimatedCPC: '$10-25',
    contentNeeded: [
      'AI Agents for RevOps — definitive guide',
      'AI Agents for Customer Service — top use cases ranked by ROI',
      'AI Agent Implementation Roadmap',
      "AI Agents vs RPA vs Workflow Automation — buyer's guide",
    ],
    primaryLandingPage: '/services/custom-ai-agents',
    primaryCTA: 'See AI Agent capabilities',
  },
  {
    id: 'industry-ai',
    name: 'Industry AI Transformation',
    intent: 'MOFU',
    primaryProduct: 'sprint',
    pillarKeywords: [
      'AI consulting for manufacturing',
      'AI consulting for financial services',
      'AI consulting for healthcare',
      'AI consulting for CPG',
      'AI consulting for distribution',
      'AI consulting for logistics',
    ],
    longTailKeywords: [
      'AI for mid-market manufacturer',
      'AI for regional bank',
      'AI for healthcare provider operations',
      'AI for B2B distribution',
      'AI for SaaS company GTM',
      'AI for industrial supply chain',
    ],
    estimatedCPC: '$8-18',
    contentNeeded: [
      'Industry value-chain pages (✅ shipped V8.20 — 17 industries)',
      'Per-industry case study',
      "Industry-specific buyer's guide",
    ],
    primaryLandingPage: '/industries',
    primaryCTA: 'Generate Custom Value Chain',
  },
  {
    id: 'fractional-caio',
    name: 'Fractional AI Leadership',
    intent: 'BOFU',
    primaryProduct: 'scale',
    pillarKeywords: [
      'fractional Chief AI Officer',
      'fractional CAIO',
      'fractional AI executive',
      'embedded AI operator',
      'AI program management',
      'AI advisory retainer',
    ],
    longTailKeywords: [
      'fractional CAIO cost',
      'fractional CAIO vs full-time CAIO',
      'AI fractional executive for mid-market',
      'monthly AI advisory retainer',
      'embedded AI operating partner',
    ],
    estimatedCPC: '$12-22',
    contentNeeded: [
      'Fractional CAIO landing page (build /capabilities/fractional-caio)',
      'Fractional CAIO vs Full-Time Hire — decision framework',
      'When to bring in an AI Operating Partner',
    ],
    primaryLandingPage: '/services/pe-value-creation',
    primaryCTA: 'Discuss a Forge Scale retainer',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Ad campaigns — concrete plans by channel
// ─────────────────────────────────────────────────────────────────────────

export const adCampaigns: AdCampaign[] = [
  // ── LINKEDIN — primary channel ────────────────────────────────────────
  {
    id: 'li-pe-operating-partner',
    channel: 'linkedin',
    name: 'PE Operating Partners — Portfolio AI Diagnostic',
    audience:
      'Job titles: Operating Partner, Portfolio Operating Executive, COO at PE-backed company. Companies: $50M-$500M revenue.',
    objective: 'conversion',
    cluster: 'ai-pe-value',
    format: 'Document Ad (PDF: PE Portfolio AI Playbook)',
    budget: '$3-5K/mo, $200-400 target CPL',
    copyVariants: [
      {
        headline: 'AI value creation across your portfolio — without the MBB price tag.',
        body: 'Forge Diagnostic ($15K, 4 weeks) maps every AI opportunity against EBITDA across your portfolio. Used by operating partners managing 5-20 portcos.',
        cta: 'Download the Playbook',
      },
      {
        headline: 'Most portcos have no coherent AI plan. Yours can.',
        body: 'A repeatable AI playbook deployed across 5-15 portcos. Bain-trained team. Outcomes tied to EBITDA, not innovation theater.',
        cta: 'Book a Portfolio Diagnostic',
      },
    ],
    landingPage: '/industries/private-equity',
    utm: { source: 'linkedin', medium: 'cpc', campaign: 'pe-portfolio-diagnostic' },
  },
  {
    id: 'li-mfg-coo',
    channel: 'linkedin',
    name: 'Manufacturing COOs / VP Operations — AI for OEE & Supply Chain',
    audience:
      'Job titles: COO, VP Operations, Plant Manager, Supply Chain VP. Industries: industrial manufacturing, industrial goods. Companies: $50M-$500M.',
    objective: 'conversion',
    cluster: 'industry-ai',
    format: 'Single Image Ad with case study link',
    budget: '$3-5K/mo',
    copyVariants: [
      {
        headline: '1,181 qualified opportunities. 99.8% match rate. Six months.',
        body: '$4B industrial conglomerate deployed ClearForge AI sales intelligence across three divisions. See the value chain we used.',
        cta: 'See the case',
      },
      {
        headline: "Your data is generating signals you're not acting on.",
        body: 'AI agents in supply chain, predictive maintenance, and commercial execution. Production AI in 10 weeks — not 10 quarters.',
        cta: 'Get a Forge Diagnostic',
      },
    ],
    landingPage: '/industries/manufacturing',
    utm: { source: 'linkedin', medium: 'cpc', campaign: 'manufacturing-coo' },
  },
  {
    id: 'li-thought-leader-james',
    channel: 'linkedin',
    name: 'Thought Leader Ad — James Penz / Pilot Purgatory',
    audience:
      'COO, CRO, CEO at $25M-$500M companies. Industries: Manufacturing, Financial Services, Healthcare, Distribution, SaaS, PE-backed.',
    objective: 'awareness',
    cluster: 'ai-readiness',
    format: 'Thought Leader Ad (founder LinkedIn post amplification)',
    budget: '$2-3K/mo',
    copyVariants: [
      {
        headline: 'AI pilots stall when no one owns the workflow.',
        body: 'Forge Diagnostic ($15K, 4 weeks) turns pilot activity into a ranked workflow roadmap with owners, baselines, controls, and a next build decision.',
        cta: 'See the framework',
      },
    ],
    landingPage: '/scorecard',
    utm: { source: 'linkedin', medium: 'social', campaign: 'thought-leader-james' },
  },
  {
    id: 'li-conversation-revops',
    channel: 'linkedin',
    name: 'Conversation Ad — RevOps & CRO',
    audience:
      'CRO, VP Sales, RevOps Director, VP Revenue Operations. Companies: $25M-$200M ARR SaaS, B2B services.',
    objective: 'conversion',
    cluster: 'ai-agents-functions',
    format: 'Conversation Ad with 2-step CTA',
    budget: '$2-4K/mo',
    copyVariants: [
      {
        headline: 'AI agents for RevOps — that ship in 10 weeks.',
        body: 'Lead routing, deal-risk flagging, forecast accuracy, CRM hygiene. Production agents integrated to your stack — not a deck.',
        cta: 'Talk to ClearForge',
      },
    ],
    landingPage: '/services/ai-revenue-operations',
    utm: { source: 'linkedin', medium: 'conversation', campaign: 'revops-cro' },
  },

  // ── GOOGLE SEARCH — direct intent capture ─────────────────────────────
  {
    id: 'g-ai-readiness',
    channel: 'google',
    name: 'Search — AI Readiness Assessment',
    audience: 'Self-identified buyers searching for AI readiness/maturity assessments',
    objective: 'conversion',
    cluster: 'ai-readiness',
    format: 'Search Ads',
    budget: '$2-4K/mo, $80-150 target CPL',
    copyVariants: [
      {
        headline: 'AI Readiness Assessment | Free in 5 Minutes | ClearForge',
        body: '20 questions across 5 pillars. Get your AI maturity score and a personalized roadmap. Bain-trained team. No sales call required.',
        cta: 'Take the Free Scorecard',
      },
      {
        headline: 'AI Diagnostic for Mid-Market | $15K Fixed Fee | 4 Weeks',
        body: 'Forge Diagnostic identifies 3+ measurable AI opportunities with baselines, owners, evidence needs, and a next build decision.',
        cta: 'Book a Diagnostic',
      },
    ],
    landingPage: '/scorecard',
    utm: { source: 'google', medium: 'cpc', campaign: 'ai-readiness-search' },
  },
  {
    id: 'g-ai-pe',
    channel: 'google',
    name: 'Search — AI for PE Portfolio',
    audience: 'PE professionals searching for portfolio AI strategy',
    objective: 'conversion',
    cluster: 'ai-pe-value',
    format: 'Search Ads',
    budget: '$2-3K/mo',
    copyVariants: [
      {
        headline: 'AI Value Creation for PE Portfolios | ClearForge',
        body: 'Repeatable AI plays deployed across 5-15 portcos. Tied to EBITDA. 4-week portfolio diagnostic from $15K.',
        cta: 'Book a Portfolio Diagnostic',
      },
    ],
    landingPage: '/industries/private-equity',
    utm: { source: 'google', medium: 'cpc', campaign: 'ai-pe-search' },
  },
  {
    id: 'g-ai-agents',
    channel: 'google',
    name: 'Search — AI Agents for [Function]',
    audience: 'Searching for AI agents implementation',
    objective: 'consideration',
    cluster: 'ai-agents-functions',
    format: 'Search Ads',
    budget: '$3-5K/mo',
    copyVariants: [
      {
        headline: 'Production AI Agents | Built in 10 Weeks | ClearForge',
        body: 'AI agents for RevOps, customer service, and supply chain workflows. Built around owners, controls, adoption, and measurement.',
        cta: 'See AI Agent Capabilities',
      },
    ],
    landingPage: '/services/custom-ai-agents',
    utm: { source: 'google', medium: 'cpc', campaign: 'ai-agents-search' },
  },

  // ── META — retargeting only ──────────────────────────────────────────
  {
    id: 'meta-retarget-website',
    channel: 'meta',
    name: 'Meta Retargeting — Website Visitors',
    audience: 'Website visitors past 90 days who did NOT submit /discover or /scorecard',
    objective: 'retargeting',
    cluster: 'ai-readiness',
    format: 'Carousel + Video case study',
    budget: '$1-2K/mo',
    copyVariants: [
      {
        headline: 'Still wondering where AI fits in your business?',
        body: 'Forge Intelligence™ generates a custom value chain from your website in 5 minutes. See exactly which workflows AI agents would automate first.',
        cta: 'Generate My Value Chain',
      },
    ],
    landingPage: '/discover',
    utm: { source: 'meta', medium: 'retargeting', campaign: 'website-revisit' },
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Channel allocation guidance (research-backed)
// ─────────────────────────────────────────────────────────────────────────

export const channelAllocation = {
  linkedin: {
    sharePercent: 70,
    rationale:
      'LinkedIn lead-gen forms convert at 15-20% (vs 4-9% off-platform). LinkedIn leads convert to opps 2-3x other social channels. CPL $50-200 — within budget for $75K-$200K ACV. Best for $25M-$500M ICP firmographic targeting.',
  },
  google: {
    sharePercent: 20,
    rationale:
      'Direct intent capture for high-commercial-intent searchers. CPCs $8-30 require disciplined Quality Score management. Long-tail BOFU keywords (AI consulting cost, AI readiness assessment) convert best.',
  },
  meta: {
    sharePercent: 10,
    rationale:
      'Retargeting + thought leadership amplification only. NOT primary acquisition. CPMs 2-4x lower than LinkedIn but firmographic targeting too coarse for ICP precision. Use Custom Audiences from website + LinkedIn engagement.',
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Ownable positioning angles (vs competitors)
// ─────────────────────────────────────────────────────────────────────────

export const positioningAngles = [
  {
    angle: 'Bain-trained operators, not platform sellers',
    against: 'DataRobot, Dataiku, vendor-pushed AI consultancies',
    proof: 'Founder ex-Bain AI Automation practice',
  },
  {
    angle: 'Sprint, not slide-ware',
    against: 'McKinsey, BCG, Deloitte slow MBB engagements',
    proof: '10-week Forge Sprint produces a working production system',
  },
  {
    angle: 'Diagnostic before commitment',
    against: 'MBB "contact us for a proposal" gatekeeping',
    proof: '$15K Forge Diagnostic fixed-fee paid pilot',
  },
  {
    angle: 'Mid-market priced, MBB-trained',
    against: 'Slalom (mid-market priced, no MBB pedigree) + MBB (pedigree, wrong price)',
    proof: '$15K Diagnostic, $75K-$200K Sprint, $5-15K/mo Scale published transparently',
  },
  {
    angle: 'PE-grade rigor for non-PE owned companies',
    against: 'Vague "AI strategy" engagements with no EBITDA tie-back',
    proof: 'Every system tied to revenue, cost, or throughput KPIs',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Buyer language — phrases to mirror in copy (research-backed 2026)
// ─────────────────────────────────────────────────────────────────────────

export const buyerLanguage = [
  'pilot purgatory',
  'execution gap',
  'GenAI Divide',
  'AI value gap',
  'AI workforce readiness',
  'pilot to production',
  'stuck in pilot',
  'pilot without an owner',
  'workflow ready for production',
  'AI Overviews / answer engines',
  'AI agents in production',
  '90-day AI roadmap',
  '100-day AI plan',
  'EBITDA AI levers',
  'measured against revenue, cost, or throughput',
];
