export interface CaseStudyOutcome {
  metric: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  service: string;
  heroMetric: string;
  heroMetricLabel: string;
  excerpt: string;
  featured?: boolean;
  challenge: string;
  solution: string[];
  continuousModel?: string[];
  outcomes: CaseStudyOutcome[];
  scale: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'metro-detroit-services-company',
    title: 'Metro Detroit Services Company Rebuilds Pipeline from Zero',
    industry: 'Home & Commercial Services',
    service: 'AI Marketing Agent',
    heroMetric: 'Growth Mode',
    heroMetricLabel: 'From Decline to Repeatable Pipeline',
    featured: true,
    excerpt:
      'A legacy services business with no formal marketing system moved from customer attrition and declining revenue to active growth with recurring commercial contracts.',
    challenge:
      'The company had operated for more than two decades on referrals and reputation. It had no website, no search presence, no paid campaigns, and no structured outreach motion. As legacy customers churned, revenue steadily eroded and there was no predictable pipeline to replace it.',
    solution: [
      'Built and launched a conversion-focused website with clear service positioning and lead capture',
      'Established local search foundation and profile management so qualified buyers could find the company',
      'Implemented lead intelligence and qualification workflows for inbound and outbound opportunities',
      'Deployed coordinated outreach sequences and follow-up workflows',
      'Introduced CRM-centered call workflow with AI-assisted prep and prioritization',
      'Created a recurring commercial maintenance contract motion to stabilize revenue',
      'Built a repeatable review and testimonial engine to strengthen trust in-market',
    ],
    outcomes: [
      {
        metric: 'Active Growth',
        description: 'Revenue direction shifted from decline to expansion',
      },
      {
        metric: 'Recurring Contracts',
        description: 'Commercial maintenance agreements created more predictable cash flow',
      },
      {
        metric: 'Acquisition-Ready',
        description: 'Documented systems improved buyer confidence for PE interest',
      },
      {
        metric: 'Owner Confidence',
        description: 'A repeatable pipeline replaced ad hoc lead generation',
      },
    ],
    scale:
      'With systems documented and running continuously, the business is no longer dependent on one-off referrals. It now has an operating model that can be scaled, handed off, and diligenced by potential acquirers. Anonymous client quote: "For the first time, marketing is a system in this business, not a guess."',
  },
  {
    slug: 'industrial-manufacturer',
    title: '$4B Industrial Conglomerate Deploys AI Sales Intelligence Across 16 Divisions',
    industry: 'Industrial Manufacturing & Distribution',
    service: 'AI Strategy + AI Design & Build + Revenue Operations',
    heroMetric: '1,181',
    heroMetricLabel: 'Qualified Opportunities Identified in 6 Months',
    featured: true,
    excerpt:
      "A $4B industrial conglomerate with 16 divisions and 70+ facilities deployed ClearForge's AI intelligence platform across three business units — identifying 1,181 qualified opportunities with a 99.8% match rate and building a purpose-built sales execution platform to turn intelligence into revenue.",
    challenge:
      "Sales teams across 16 divisions operated in silos with no shared market intelligence. Prospecting was manual, inconsistent, and untethered from the company's actual product capabilities. Cross-sell opportunities across divisions were invisible. Leadership had no unified view of where capital projects were happening, which accounts were under-served, and where the real white space existed. The commercial model had not evolved even as the market, the tools, and buyer behavior had fundamentally changed.",
    solution: [
      "Deployed proprietary AI agents scanning capital projects, industrial demand signals, and competitive movements across 20+ states — calibrated specifically to the client's product lines",
      'Built 24 active intelligence triggers across three core business divisions — each generating scored, enriched opportunities in real time',
      'Created 631+ AI-generated sales playbooks tailored by opportunity, vertical, and buyer persona — with entry strategies, competitive analysis, and risk assessments',
      'Built and deployed a purpose-built sales intelligence platform — with visual pipeline management, AI-generated playbooks, automated contact discovery, and performance analytics the sales team uses daily',
      'Designed a portfolio-level expansion model prioritizing 5 additional divisions for AI deployment based on market size, AI fit scoring, and transferable trigger architecture',
      'Mapped a commercial model redesign framework — diagnostic-first approach to aligning sales structure, compensation, and AI tools to margin-focused growth',
    ],
    continuousModel: [
      'AI agents monitor thousands of market signals daily — every closed-won and closed-lost data point refines the scoring model, compounding precision month over month',
      'New triggers, territories, and divisions are added continuously — the intelligence architecture scales horizontally, with each deployment accelerating faster than the last',
      'The platform captures structured feedback on every playbook (1–5 star ratings across 4 dimensions), creating a closed-loop system that improves AI output quality automatically',
      'Market shifts are auto-captured within hours, not weeks — ensuring the sales team always has the freshest intelligence and first-mover advantage on capital projects',
    ],
    outcomes: [
      {
        metric: '1,181',
        description: 'Qualified opportunities identified across 3 divisions in 6 months',
      },
      { metric: '99.8%', description: "Match rate to the client's actual product capabilities" },
      {
        metric: '32x',
        description: 'Ramp from 19 to 613 opportunities per month during calibration',
      },
      { metric: '631+', description: 'AI-generated sales playbooks with competitive analysis' },
      { metric: '20+', description: 'States covered with active intelligence triggers' },
      {
        metric: '$20B+',
        description: 'Combined investment value in the top 10 opportunities alone',
      },
    ],
    scale:
      'What began as a two-division pilot expanded into an enterprise-wide intelligence system in under six months. The platform now covers three core divisions — with the largest generating over 950 opportunities alone — and five additional divisions ready for deployment. ClearForge built a custom sales intelligence dashboard that the team uses daily to manage the full pipeline, and is now designing a commercial model transformation to align sales structure, compensation, and coverage to the intelligence the AI is generating. The system gets exponentially smarter every month — by Month 12, the precision and coverage will be fundamentally different from Month 1.',
  },
  {
    slug: 'pe-portfolio-diagnostic-plan',
    title: 'PE Operating Team Runs Portfolio Diagnostic and Builds Execution Plan',
    industry: 'Private Equity Portfolio Operations',
    service: 'PE Value Creation + AI Strategy',
    heroMetric: '90 Days',
    heroMetricLabel: 'Diagnostic to Portfolio Execution Plan',
    featured: true,
    excerpt:
      'A PE operating team needed a practical AI value creation roadmap across portfolio companies. ClearForge delivered a cross-portfolio diagnostic, prioritized value levers, and mapped a 12-month execution plan tied to EBITDA improvement.',
    challenge:
      'The PE team had strong hypotheses about where AI could create value, but no shared diagnostic framework to compare opportunities across portfolio companies. Initiatives were fragmented, management teams had different levels of readiness, and leadership needed a plan that could move quickly while preserving operating control.',
    solution: [
      'Ran a portfolio-wide AI opportunity diagnostic across revenue, operations, and support workflows',
      'Benchmarked each company on readiness, data quality, execution risk, and speed-to-value',
      'Identified and scored high-impact use cases tied to clear EBITDA levers',
      'Built company-level and portfolio-level sequencing for 30, 90, and 180-day execution',
      'Defined governance cadence, operating ownership, and KPI instrumentation for each initiative',
      'Prepared an implementation playbook that operating partners could reuse across additional companies',
    ],
    outcomes: [
      { metric: '3', description: 'Portfolio companies assessed with a common diagnostic model' },
      {
        metric: '12-Month Plan',
        description: 'Execution roadmap aligned to value creation targets',
      },
      {
        metric: '8 Priority Plays',
        description: 'High-confidence initiatives selected for rollout',
      },
      {
        metric: 'Governance Ready',
        description: 'Operating rhythm and KPI cadence defined for execution',
      },
    ],
    scale:
      'The operating team left with a repeatable portfolio playbook, not a one-off report. The plan gave deal teams and management teams a shared language for prioritization, clear ownership by function, and a practical path to scale proven workflows across future portfolio companies.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.service === service);
}

export function getFeaturedCaseStudy(): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.featured);
}
