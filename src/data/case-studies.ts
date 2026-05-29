export interface CaseStudyOutcome {
  metric: string;
  description: string;
}

export interface CaseStudySystemLayer {
  name: string;
  role: string;
  evidence: string;
}

export interface CaseStudyDashboardMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudyChartPoint {
  label: string;
  value: number;
}

export interface CaseStudyTeamPerformance {
  name: string;
  opportunities: number;
  playbooks: number;
  quality: string;
}

export interface CaseStudyProofDashboard {
  title: string;
  summary: string;
  metrics: CaseStudyDashboardMetric[];
  leadVolume?: CaseStudyChartPoint[];
  teamPerformance?: CaseStudyTeamPerformance[];
  pipelineStages?: CaseStudyChartPoint[];
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
  systemLayers?: CaseStudySystemLayer[];
  proofDashboard?: CaseStudyProofDashboard;
  evidenceNotes?: string[];
  scale: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'home-services-turnaround',
    title: 'Home & Commercial Services Firm Rebuilds Commercial Pipeline from Zero',
    industry: 'Home & Commercial Services',
    service: 'AI Marketing Agent',
    heroMetric: '0 → Recurring',
    heroMetricLabel: 'From Customer Attrition to Repeatable Pipeline',
    featured: true,
    excerpt:
      'A two-decade-old services business with no formal marketing motion moved from customer attrition and declining revenue to active growth with recurring commercial maintenance contracts, giving buyers a cleaner business to diligence.',
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
        description: 'Documented workflows improved buyer confidence for PE interest',
      },
      {
        metric: 'Owner Confidence',
        description: 'A repeatable pipeline replaced ad hoc lead generation',
      },
    ],
    systemLayers: [
      {
        name: 'Local market signal layer',
        role: 'Turned search demand, service geography, reviews, and competitor gaps into a prioritized owner worklist.',
        evidence:
          'The business moved from no formal demand capture to a measurable local pipeline.',
      },
      {
        name: 'Commercial account motion',
        role: 'Sequenced target accounts, service positioning, follow-up, and recurring maintenance offers.',
        evidence: 'Recurring contracts replaced one-off referral dependency.',
      },
      {
        name: 'Owner operating cadence',
        role: 'Installed a weekly review of leads, quotes, follow-ups, reviews, and account expansion.',
        evidence:
          'The owner could see where demand was coming from and what needed attention next.',
      },
    ],
    proofDashboard: {
      title: 'Owner pipeline control tower',
      summary:
        'A simple operating view for the owner: where leads come from, which commercial accounts need follow-up, and how the recurring-contract motion is building.',
      metrics: [
        {
          label: 'Growth direction',
          value: 'Positive',
          context: 'Moved from erosion to active growth',
        },
        {
          label: 'Revenue mix',
          value: 'Recurring',
          context: 'Maintenance contracts added predictability',
        },
        {
          label: 'Buyer confidence',
          value: 'Higher',
          context: 'Documented workflows support acquisition readiness',
        },
      ],
      pipelineStages: [
        { label: 'Identified', value: 42 },
        { label: 'Contacted', value: 31 },
        { label: 'Quoted', value: 18 },
        { label: 'Recurring', value: 7 },
      ],
    },
    evidenceNotes: [
      'Positioning, website, lead capture, CRM workflow, and follow-up were built as one owner-run cadence.',
      'The workflow was designed for owner usability, not a complex enterprise stack.',
    ],
    scale:
      'With the growth cadence documented and running, the business is no longer dependent on one-off referrals. It now has an operating model that can be handed off and diligenced by potential acquirers. Anonymous client quote: "For the first time, marketing is a repeatable part of this business, not a guess."',
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
      "A $4B industrial conglomerate with 16 divisions and 70+ facilities deployed ClearForge's AI intelligence platform across three business units, identifying 1,181 qualified opportunities with a 99.8% match rate and giving sales leaders a daily execution view.",
    challenge:
      "Sales teams across 16 divisions operated in silos with no shared market intelligence. Prospecting was manual, inconsistent, and untethered from the company's actual product capabilities. Cross-sell opportunities across divisions were invisible. Leadership had no unified view of where capital projects were happening, which accounts were under-served, and where the real white space existed. The commercial model had not evolved even as the market, the tools, and buyer behavior had fundamentally changed.",
    solution: [
      "Deployed custom signal collectors and scoring workflows across capital projects, industrial demand signals, and competitive movement in 20+ states — calibrated specifically to the client's product lines",
      'Built 24 active intelligence triggers across three core business divisions — each generating scored, enriched opportunities in real time',
      'Created 631+ rep-ready sales playbooks by opportunity, vertical, and buyer persona, with entry strategies, competitive analysis, and risk assessments',
      'Built and deployed a purpose-built sales intelligence platform — with visual pipeline management, playbooks, contact discovery, and performance analytics the sales team uses daily',
      'Designed a portfolio-level expansion model prioritizing 5 additional divisions based on market size, AI fit scoring, and transferable trigger architecture',
      'Mapped a commercial model redesign framework — diagnostic-first approach to aligning sales structure, compensation, and AI tools to margin-focused growth',
    ],
    continuousModel: [
      'Market-signal workflows monitor thousands of sources daily — every closed-won and closed-lost data point refines the scoring model',
      'New triggers, territories, and divisions are added continuously, with each deployment starting from more proven trigger logic than the last',
      'The platform captures structured feedback on every playbook (1-5 star ratings across 4 dimensions), creating a review loop that improves output quality',
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
      { metric: '631+', description: 'Rep-ready sales playbooks with competitive analysis' },
      { metric: '20+', description: 'States covered with active intelligence triggers' },
      {
        metric: '$20B+',
        description: 'Combined investment value in the top 10 opportunities alone',
      },
    ],
    systemLayers: [
      {
        name: 'Market signal intelligence',
        role: 'Custom signal workflows monitored capital projects, industrial demand signals, competitive movements, and geography-specific triggers.',
        evidence: '1,181 qualified opportunities identified across three divisions in six months.',
      },
      {
        name: 'Capability match engine',
        role: 'Matched opportunities to the company product lines, territories, facilities, and division-specific capabilities.',
        evidence: '99.8% match rate to the client actual product capabilities.',
      },
      {
        name: 'Sales playbook factory',
        role: 'Generated account-entry strategy, buyer context, competitive analysis, risk notes, and recommended next action.',
        evidence: '631+ sales playbooks created for active opportunities.',
      },
      {
        name: 'Sales execution platform',
        role: 'Unified pipeline review, playbook ratings, opportunity triage, contact discovery, and manager coaching into one workflow.',
        evidence:
          'Daily-use dashboard gave leadership visibility across divisions, reps, and opportunity quality.',
      },
      {
        name: 'Continuous learning loop',
        role: 'Captured feedback from sales activity and playbook quality ratings to improve trigger logic and recommended actions.',
        evidence: 'Opportunity volume ramped from 19 to 613 per month during calibration.',
      },
    ],
    proofDashboard: {
      title: 'SightForge-style revenue intelligence dashboard',
      summary:
        'The executive view combined opportunity volume, division coverage, playbook quality, and sales-team execution so leadership could see where market demand was emerging and which reps were converting intelligence into action.',
      metrics: [
        { label: 'Qualified opportunities', value: '1,181', context: '3 divisions, 6 months' },
        {
          label: 'Capability match rate',
          value: '99.8%',
          context: 'Aligned to real product lines',
        },
        { label: 'Sales playbooks', value: '631+', context: 'Generated with next-best action' },
        { label: 'Monthly ramp', value: '32x', context: '19 to 613 opportunities per month' },
      ],
      leadVolume: [
        { label: 'Jan', value: 19 },
        { label: 'Feb', value: 64 },
        { label: 'Mar', value: 171 },
        { label: 'Apr', value: 314 },
        { label: 'May', value: 488 },
        { label: 'Jun', value: 613 },
      ],
      teamPerformance: [
        { name: 'Team North', opportunities: 318, playbooks: 171, quality: '94%' },
        { name: 'Team Central', opportunities: 284, playbooks: 155, quality: '92%' },
        { name: 'Team South', opportunities: 246, playbooks: 129, quality: '90%' },
        { name: 'Strategic Accounts', opportunities: 333, playbooks: 176, quality: '96%' },
      ],
      pipelineStages: [
        { label: 'Detected', value: 1181 },
        { label: 'Matched', value: 1179 },
        { label: 'Playbooked', value: 631 },
        { label: 'Sales active', value: 416 },
      ],
    },
    evidenceNotes: [
      'This was not an off-the-shelf sales dashboard. The intelligence was calibrated to divisions, facilities, product capabilities, territory coverage, and manager review routines.',
      'The most important design choice was closing the loop between market signal, sales action, manager coaching, and playbook quality feedback.',
    ],
    scale:
      'What began as a two-division pilot expanded into a division-level intelligence workflow in under six months. The platform now covers three core divisions, with the largest generating over 950 opportunities alone, and five additional divisions ready for deployment. ClearForge built a custom sales intelligence dashboard that the team uses daily to manage the full pipeline, and is now designing commercial model changes to align sales structure, compensation, and coverage to market intelligence. As field feedback accumulates, the scoring and playbooks become more accurate month by month.',
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
      'A PE operating team needed a practical AI value creation plan across portfolio companies. ClearForge delivered a cross-portfolio diagnostic, prioritized value levers, and mapped a 12-month execution plan tied to EBITDA improvement.',
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
    systemLayers: [
      {
        name: 'Portfolio value diagnostic',
        role: 'Scored each company by value pool, workflow maturity, data readiness, operating risk, and speed-to-value.',
        evidence: 'Three portfolio companies assessed with a single comparison model.',
      },
      {
        name: 'AI initiative backlog',
        role: 'Translated functional pain points into prioritized revenue, cost, service, and working-capital initiatives.',
        evidence: 'Eight priority plays selected for rollout.',
      },
      {
        name: 'Governance cadence',
        role: 'Defined KPI owners, decision forums, build sequencing, and 30/90/180-day execution checkpoints.',
        evidence: 'Operating team left with a governance-ready 12-month execution plan.',
      },
    ],
    proofDashboard: {
      title: 'Portfolio AI value-creation map',
      summary:
        'The operating team could compare companies, choose the highest-confidence plays, and sequence the roadmap by value, readiness, and implementation risk.',
      metrics: [
        { label: 'Companies assessed', value: '3', context: 'Common diagnostic model' },
        { label: 'Priority plays', value: '8', context: 'Chosen for 12-month roadmap' },
        { label: 'Execution horizon', value: '180 days', context: 'First wave sequencing' },
      ],
      pipelineStages: [
        { label: 'Ideas', value: 47 },
        { label: 'Scored', value: 24 },
        { label: 'Validated', value: 12 },
        { label: 'Wave 1', value: 8 },
      ],
    },
    evidenceNotes: [
      'The diagnostic gave deal teams, operators, and management teams one language for AI value creation.',
      'The deliverable was built to be reused across future portfolio companies, not consumed once.',
    ],
    scale:
      'The operating team left with a repeatable portfolio playbook, not a one-off report. The plan gave deal teams and management teams a shared language for prioritization, clear ownership by function, and a practical path to reuse proven workflows across future portfolio companies.',
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
