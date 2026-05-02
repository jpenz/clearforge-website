/**
 * Industry value chains — McKinsey/BCG/Bain-style coverage.
 * The /industries/[slug] route renders these into editorial pages.
 */

export type ActivityType = 'automation' | 'agent' | 'model' | 'copilot';

export interface ValueChainActivity {
  name: string;
  aiImpact: string;
  type: ActivityType;
  impact: string;
}

export interface ValueChainFunction {
  function: string;
  icon: string;
  description: string;
  activities: ValueChainActivity[];
}

export interface IndustryChallenge {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export type IndustryCategory =
  | 'Industrials'
  | 'Financial Services'
  | 'Healthcare & Life Sciences'
  | 'Technology & Telecom'
  | 'Consumer & Retail'
  | 'Energy & Resources'
  | 'Public & Social Sector'
  | 'Real Assets'
  | 'Mobility & Transport'
  | 'Travel & Hospitality';

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  category: IndustryCategory;
  hero: string;
  oneLiner: string;
  overview: string[];
  marketContext: { stat: string; label: string }[];
  valueChain: ValueChainFunction[];
  challenges: IndustryChallenge[];
  forgeApplication: string;
  caseStudySlug?: string;
  videoBackground?: string;
}

export const industries: Industry[] = [
  // INDUSTRIALS — Manufacturing
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial',
    shortName: 'Manufacturing',
    category: 'Industrials',
    hero: 'Apply AI to throughput, planning, and commercial execution without disrupting critical operations.',
    oneLiner: 'Production AI for the shop floor and the front office.',
    overview: [
      'Manufacturers are balancing margin pressure, volatile demand, and workforce constraints while operating on complex system landscapes. AI matters only when it is deployed inside real production and commercial workflows.',
      'ClearForge helps manufacturers prioritize where AI changes operating economics first, then build and run those systems with measurable accountability.',
    ],
    marketContext: [
      { stat: '$1.1T', label: 'Annual cost of supply chain disruptions globally' },
      { stat: '82%', label: 'Of manufacturers still rely on reactive maintenance' },
      { stat: '15-20%', label: 'Of manufacturing cost attributed to quality failures' },
      { stat: '2.1M', label: 'US manufacturing jobs unfilled by 2030 (Deloitte)' },
    ],
    valueChain: [
      {
        function: 'Demand Planning & Forecasting',
        icon: 'TrendingUp',
        description:
          'Connect signals across customers, channels, and macro indicators into a single forecast surface.',
        activities: [
          {
            name: 'SKU-level demand sensing',
            aiImpact:
              'AI agent ingests POS, weather, promo, and macro signals to update forecasts daily',
            type: 'agent',
            impact: '20-35% forecast error reduction',
          },
          {
            name: 'New-product forecasting',
            aiImpact:
              'Model uses analog products, channel signals, and pre-orders to forecast launches',
            type: 'model',
            impact: 'Reduce launch over/under-forecasting 40%',
          },
          {
            name: 'Promotion uplift modeling',
            aiImpact: 'Predict promo response by SKU/region, recommend optimal depth and timing',
            type: 'model',
            impact: '5-10% promo ROI lift',
          },
          {
            name: 'S&OP narrative generation',
            aiImpact: 'Copilot drafts the demand story and risk callouts ahead of S&OP meetings',
            type: 'copilot',
            impact: '50% reduction in planner prep time',
          },
        ],
      },
      {
        function: 'Procurement & Supply Chain',
        icon: 'Package',
        description:
          'Surface tier-2 risk, spend leakage, and supplier performance — and act on it.',
        activities: [
          {
            name: 'Spend categorization & maverick spend',
            aiImpact: 'Agent auto-classifies spend, flags off-contract and duplicate purchases',
            type: 'agent',
            impact: '5-15% addressable savings identified',
          },
          {
            name: 'Supplier risk monitoring',
            aiImpact:
              'Continuous scan of news, financial, and weather signals for tier-1/2 disruptions',
            type: 'agent',
            impact: 'Early warning 7-30 days ahead of disruption',
          },
          {
            name: 'Should-cost modeling',
            aiImpact: 'Auto-generate component should-cost from raw material indices and BOM data',
            type: 'model',
            impact: '3-8% material cost negotiation lift',
          },
          {
            name: 'Inventory rebalancing',
            aiImpact:
              'Agent recommends transfers and PO timing across sites to free working capital',
            type: 'agent',
            impact: '10-25% inventory reduction at same service level',
          },
        ],
      },
      {
        function: 'Production & Operations',
        icon: 'Settings',
        description: 'Use AI to keep lines running, predict failures, and improve OEE.',
        activities: [
          {
            name: 'Predictive maintenance',
            aiImpact:
              'Model trained on equipment sensor + failure history predicts failures days in advance',
            type: 'model',
            impact: '30-50% downtime reduction',
          },
          {
            name: 'Computer-vision quality inspection',
            aiImpact: 'Replace visual inspection with vision model on production line',
            type: 'model',
            impact: '10x inspection throughput, 60-80% defect catch rate lift',
          },
          {
            name: 'Production scheduling optimization',
            aiImpact:
              'Agent re-sequences jobs against orders, machine availability, and changeover cost',
            type: 'agent',
            impact: '5-15% throughput gain',
          },
          {
            name: 'Energy optimization',
            aiImpact: 'Model predicts and shifts energy load to off-peak windows',
            type: 'model',
            impact: '5-12% utility spend reduction',
          },
        ],
      },
      {
        function: 'Sales & Commercial',
        icon: 'Target',
        description:
          'Connect product capability to market opportunity at the SKU and account level.',
        activities: [
          {
            name: 'Capital project intelligence',
            aiImpact:
              'Agent scans permits, news, and bids to surface capital projects matching product capability',
            type: 'agent',
            impact: '1,181 qualified opportunities surfaced for $4B conglomerate',
          },
          {
            name: 'Cross-sell white-space analysis',
            aiImpact: 'Model identifies untapped SKUs by account based on peer purchasing behavior',
            type: 'model',
            impact: '8-20% wallet-share lift',
          },
          {
            name: 'Quote-to-order automation',
            aiImpact:
              'Agent generates quotes from request, BOM, and pricing rules; routes to approver',
            type: 'agent',
            impact: '60-80% reduction in quote cycle time',
          },
          {
            name: 'Account playbook generation',
            aiImpact: 'Auto-generate account-specific entry strategies, competitive analysis, risk',
            type: 'agent',
            impact: '631+ playbooks generated in pilot',
          },
        ],
      },
      {
        function: 'Service & Aftermarket',
        icon: 'Wrench',
        description: 'Turn the installed base into a recurring intelligence and revenue engine.',
        activities: [
          {
            name: 'Field service triage',
            aiImpact:
              'Copilot recommends parts, technician skill level, and time-on-site from issue description',
            type: 'copilot',
            impact: '20-40% first-time-fix rate improvement',
          },
          {
            name: 'Warranty fraud detection',
            aiImpact: 'Model flags suspicious claim patterns by dealer/product/region',
            type: 'model',
            impact: '3-7% warranty cost recovery',
          },
          {
            name: 'Spare parts demand forecasting',
            aiImpact: 'Forecast slow-moving parts using install base age and failure rates',
            type: 'model',
            impact: 'Reduce parts inventory 15-30%',
          },
          {
            name: 'Service contract renewal agent',
            aiImpact:
              'Agent prepares renewal pricing, identifies upgrade opportunities, drafts outreach',
            type: 'agent',
            impact: '10-20% renewal rate lift',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Supply Chain Blind Spots',
        description:
          'Multi-tier supplier networks create visibility gaps that surface as stockouts, excess inventory, and margin erosion.',
        metric: '$1.1T',
        metricLabel: 'Annual cost of supply chain disruptions',
      },
      {
        title: 'Reactive Maintenance Cycles',
        description:
          'Unplanned downtime costs 10x more than scheduled maintenance. Legacy systems generate data but lack the intelligence layer.',
        metric: '82%',
        metricLabel: 'Still use reactive maintenance',
      },
      {
        title: 'Quality Control at Scale',
        description:
          'Manual inspection catches defects after the fact. Visual sampling cannot keep pace with throughput demands.',
        metric: '15-20%',
        metricLabel: 'Cost attributed to quality failures',
      },
      {
        title: 'Labor Optimization',
        description:
          'Skilled labor shortages force a choice between overtime costs and lost production. Workforce scheduling remains manual.',
        metric: '2.1M',
        metricLabel: 'US jobs unfilled by 2030',
      },
    ],
    forgeApplication:
      'The Forge Method for manufacturing starts with the operational AI Diagnostic — process-level mapping across production, supply chain, and commercial workflows, with quantified ROI for each. Sprint engagements typically deploy 1-3 production systems integrated with existing MES/ERP/SCADA. Scale runs the operating cadence and expansion across sites and divisions.',
    caseStudySlug: 'industrial-manufacturer',
    videoBackground: '/videos/manufacturing.mp4',
  },

  // FINANCIAL SERVICES — Banking
  {
    slug: 'financial-services',
    name: 'Financial Services',
    shortName: 'Financial Services',
    category: 'Financial Services',
    hero: 'Drive speed and consistency in risk, operations, and client-facing workflows while keeping controls intact.',
    oneLiner:
      'Production AI for regulated environments — explainability and audit trails by default.',
    overview: [
      'Financial institutions face a paradox: the industry generates more structured data than almost any other sector, yet most AI initiatives stall in pilot because they cannot meet explainability, auditability, and governance requirements.',
      'ClearForge builds production AI for regulated environments — accelerating risk decisions, automating compliance workflows, and surfacing customer insights while maintaining the audit trails regulators expect.',
    ],
    marketContext: [
      { stat: '$270B', label: 'Annual global compliance spending' },
      { stat: '95%', label: 'Of fraud alerts are false positives at most banks' },
      { stat: '40%', label: 'Of risk-analyst time spent on automatable tasks' },
      { stat: '5-25%', label: 'Revenue uplift from AI-driven personalization' },
    ],
    valueChain: [
      {
        function: 'Risk & Credit',
        icon: 'ShieldCheck',
        description:
          'Underwrite, monitor, and report risk faster while improving model governance.',
        activities: [
          {
            name: 'Credit decisioning copilot',
            aiImpact:
              'Pre-fills the underwriting memo with cash-flow analysis, ratios, and peer comps',
            type: 'copilot',
            impact: '40-60% reduction in underwriter time per file',
          },
          {
            name: 'Portfolio early-warning model',
            aiImpact:
              'Model flags accounts likely to deteriorate 60-90 days ahead of covenant breach',
            type: 'model',
            impact: 'Catch 70%+ of deteriorations early',
          },
          {
            name: 'Stress testing automation',
            aiImpact: 'Agent runs scenarios, drafts narrative, formats regulatory submission',
            type: 'agent',
            impact: '5-10x faster scenario cycle time',
          },
          {
            name: 'Model documentation',
            aiImpact: 'Auto-generate model cards, validation reports, and SR 11-7 documentation',
            type: 'agent',
            impact: '70% reduction in MRM cycle time',
          },
        ],
      },
      {
        function: 'Compliance & Financial Crime',
        icon: 'FileSearch',
        description: 'Triage alerts, investigate cases, and produce regulator-ready reports.',
        activities: [
          {
            name: 'KYC/CDD intake automation',
            aiImpact: 'Agent extracts entity data, runs screening, drafts the file',
            type: 'agent',
            impact: '60-80% reduction in onboarding time',
          },
          {
            name: 'AML alert triage',
            aiImpact:
              'Model scores alert probability, agent gathers evidence and drafts initial disposition',
            type: 'agent',
            impact: '50-70% reduction in alert review time',
          },
          {
            name: 'Sanctions screening',
            aiImpact: 'Continuous re-screening against updated lists with explainable matches',
            type: 'model',
            impact: 'Reduce false positives 60%+',
          },
          {
            name: 'SAR drafting copilot',
            aiImpact: 'Generate SAR narrative from case file with cited evidence',
            type: 'copilot',
            impact: 'Investigators handle 2-3x more cases',
          },
        ],
      },
      {
        function: 'Customer Operations',
        icon: 'Users',
        description: 'Resolve service requests faster and lift CSAT without adding headcount.',
        activities: [
          {
            name: 'Service request agent',
            aiImpact: 'Agent handles transfers, statements, balance, dispute initiation end-to-end',
            type: 'agent',
            impact: '40-60% deflection of contact center volume',
          },
          {
            name: 'Document intake automation',
            aiImpact: 'Extract data from loan apps, claims, account opening docs',
            type: 'automation',
            impact: '95%+ accuracy at 10x throughput',
          },
          {
            name: 'Complaint classification',
            aiImpact: 'Auto-route complaints by issue, severity, and regulator-reportable flags',
            type: 'model',
            impact: '50% faster cycle time, 100% regulatory tagging',
          },
          {
            name: 'Wealth-advisor copilot',
            aiImpact: 'Pre-meeting briefs with portfolio drift, life events, next-best-action',
            type: 'copilot',
            impact: 'Advisors handle 30% more relationships',
          },
        ],
      },
      {
        function: 'Sales & Marketing',
        icon: 'Target',
        description: 'Personalize at scale while remaining inside marketing-compliance guardrails.',
        activities: [
          {
            name: 'Next-best-product model',
            aiImpact:
              'Model predicts product propensity by customer segment with compliance-approved cohorts',
            type: 'model',
            impact: '8-20% wallet-share lift',
          },
          {
            name: 'Marketing copy generation',
            aiImpact: 'Agent drafts campaign copy and runs through compliance checks before send',
            type: 'agent',
            impact: '5x content velocity, 100% compliance coverage',
          },
          {
            name: 'Attrition early-warning',
            aiImpact: 'Predict customer churn from transaction signals, trigger retention plays',
            type: 'model',
            impact: '15-30% reduction in attrition',
          },
          {
            name: 'Lead enrichment & routing',
            aiImpact:
              'Agent enriches leads with firmographic data and routes to RM by territory and capacity',
            type: 'agent',
            impact: '2-3x lead conversion',
          },
        ],
      },
      {
        function: 'Finance & Treasury',
        icon: 'BarChart3',
        description:
          'Close faster, forecast smarter, and free finance staff from manual reconciliation.',
        activities: [
          {
            name: 'Close acceleration',
            aiImpact:
              'Agent auto-reconciles intercompany, flags exceptions, drafts journal entries',
            type: 'agent',
            impact: '30-50% close time reduction',
          },
          {
            name: 'Liquidity forecasting',
            aiImpact:
              'Model forecasts cash positions at the bank/account level with anomaly detection',
            type: 'model',
            impact: '10-25 bps net interest margin lift',
          },
          {
            name: 'Variance analysis copilot',
            aiImpact: 'Pre-write variance commentary against budget with drill-down explanation',
            type: 'copilot',
            impact: '60% faster variance reporting',
          },
          {
            name: 'Regulatory reporting',
            aiImpact: 'Auto-populate Call Reports, FFIEC, CCAR templates with audit trail',
            type: 'automation',
            impact: '50%+ reduction in reporting hours',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Risk Assessment Speed',
        description:
          'Manual evaluation creates bottlenecks that slow deal flow. Analysts spend 60-70% of time on data gathering vs. judgment on edge cases.',
        metric: '40%',
        metricLabel: 'Of analyst time on automatable work',
      },
      {
        title: 'Compliance Burden',
        description:
          'Regulatory requirements are multiplying faster than compliance teams can scale. KYC/AML/transaction monitoring overwhelm review capacity.',
        metric: '$270B',
        metricLabel: 'Annual global compliance spend',
      },
      {
        title: 'Fraud Detection Gaps',
        description:
          'Rules-based systems generate excessive false positives while sophisticated fraud patterns evolve faster than manual rule updates.',
        metric: '95%',
        metricLabel: 'Of fraud alerts are false positives',
      },
      {
        title: 'Customer Analytics Blindness',
        description:
          'Decades of transactional data sit unused. Customer lifetime value remains theoretical rather than operational.',
        metric: '5-25%',
        metricLabel: 'Revenue lift from AI personalization',
      },
    ],
    forgeApplication:
      'The Forge Method for financial services bakes governance, explainability, and audit trails into every system from day one. Diagnostic prioritizes use cases by regulatory risk and speed-to-value. Sprint deploys production systems with model cards, monitoring, and drift detection. Scale operates the model-governance cadence and expands into adjacent workflows.',
    videoBackground: '/videos/financial-services.mp4',
  },

  // HEALTHCARE
  {
    slug: 'healthcare',
    name: 'Healthcare & Life Sciences',
    shortName: 'Healthcare',
    category: 'Healthcare & Life Sciences',
    hero: 'Reduce administrative burden and improve clinical decision support while preserving HIPAA controls.',
    oneLiner: 'AI agents for the back office, copilots for the front line.',
    overview: [
      'Healthcare organizations are squeezed by labor shortages, declining reimbursement, and rising administrative cost — while sitting on rich clinical and operational data that goes underused.',
      'ClearForge deploys AI in workflows where reliability, privacy, and clinician trust matter most. Production-ready systems with full audit trails, not pilot demos.',
    ],
    marketContext: [
      { stat: '$760-935B', label: 'Annual US healthcare administrative waste (JAMA)' },
      { stat: '40%', label: 'Of clinician time on EHR documentation' },
      { stat: '90M', label: 'US prior auth requests per year' },
      { stat: '$16K', label: 'Annual clinician burnout cost per FTE' },
    ],
    valueChain: [
      {
        function: 'Patient Access & Scheduling',
        icon: 'Calendar',
        description: 'Reduce friction in the moments before care.',
        activities: [
          {
            name: 'Patient intake automation',
            aiImpact: 'Agent collects history, insurance, consent forms via voice or chat',
            type: 'agent',
            impact: '60% reduction in front-desk workload',
          },
          {
            name: 'No-show prediction',
            aiImpact: 'Model identifies high-risk no-shows; trigger reminders and overbooking',
            type: 'model',
            impact: '15-25% no-show reduction',
          },
          {
            name: 'Insurance verification',
            aiImpact: 'Auto-verify eligibility, benefits, deductibles before visit',
            type: 'automation',
            impact: '90%+ verification at point of scheduling',
          },
          {
            name: 'Smart referral routing',
            aiImpact: 'Match referral to in-network specialist by urgency, distance, sub-specialty',
            type: 'agent',
            impact: '30-50% referral leakage reduction',
          },
        ],
      },
      {
        function: 'Clinical Documentation',
        icon: 'FileText',
        description: 'Give clinicians time back without compromising chart quality.',
        activities: [
          {
            name: 'Ambient scribe',
            aiImpact: 'Voice-to-note in the room with real-time HCC/CPT suggestion',
            type: 'copilot',
            impact: '60-80% reduction in pajama-time charting',
          },
          {
            name: 'Clinical summary generation',
            aiImpact: 'Auto-generate H&P, discharge summary from EHR + visit notes',
            type: 'agent',
            impact: '40% faster discharge cycles',
          },
          {
            name: 'Prior-auth automation',
            aiImpact: 'Agent drafts prior-auth packet from clinical notes, submits to payer portal',
            type: 'agent',
            impact: '70%+ reduction in PA submission time',
          },
          {
            name: 'Quality measure abstraction',
            aiImpact: 'Auto-extract HEDIS, MIPS, STAR measures from notes',
            type: 'automation',
            impact: '85% abstraction time reduction',
          },
        ],
      },
      {
        function: 'Revenue Cycle Management',
        icon: 'DollarSign',
        description: 'Capture revenue you have already earned and reduce denial cycles.',
        activities: [
          {
            name: 'Coding assistance',
            aiImpact: 'Suggest CPT/ICD-10 codes from clinical notes with confidence scores',
            type: 'copilot',
            impact: '15-30% revenue capture lift',
          },
          {
            name: 'Denial prediction & prevention',
            aiImpact:
              'Model flags claims likely to deny pre-submission with corrective recommendation',
            type: 'model',
            impact: '20-40% denial rate reduction',
          },
          {
            name: 'Appeal letter drafting',
            aiImpact: 'Agent reads denial reason, pulls clinical evidence, drafts appeal',
            type: 'agent',
            impact: '3-5x appeal volume per FTE',
          },
          {
            name: 'Patient billing copilot',
            aiImpact: 'Generate plain-language billing explanations and payment plan options',
            type: 'copilot',
            impact: '20% lift in self-pay collections',
          },
        ],
      },
      {
        function: 'Clinical Operations',
        icon: 'Activity',
        description: 'Predict deterioration, smooth throughput, optimize staffing.',
        activities: [
          {
            name: 'Length-of-stay prediction',
            aiImpact: 'Model predicts LOS at admission to drive discharge planning',
            type: 'model',
            impact: '0.3-0.6 day LOS reduction',
          },
          {
            name: 'Sepsis early warning',
            aiImpact: 'Vitals + labs model alerts care team 4-6 hours before clinical recognition',
            type: 'model',
            impact: 'Mortality reduction in pilot cohorts',
          },
          {
            name: 'OR scheduling optimization',
            aiImpact:
              'Agent re-optimizes block schedules against utilization and surgeon preferences',
            type: 'agent',
            impact: '10-20% OR utilization lift',
          },
          {
            name: 'Nurse staffing forecasting',
            aiImpact: 'Predict acuity and census 24-72 hours out for staffing decisions',
            type: 'model',
            impact: 'Reduce agency labor 15-25%',
          },
        ],
      },
      {
        function: 'Care Management & Population Health',
        icon: 'Heart',
        description: 'Move from reactive sick-care to proactive, risk-stratified outreach.',
        activities: [
          {
            name: 'Risk stratification model',
            aiImpact: 'Tier panel by readmission, ED, total-cost-of-care risk',
            type: 'model',
            impact: 'Focus care management on top 5%, 15%+ TCC reduction',
          },
          {
            name: 'Care gap closure agent',
            aiImpact: 'Agent identifies open quality gaps, drafts outreach, books appointments',
            type: 'agent',
            impact: '20-40% gap closure rate lift',
          },
          {
            name: 'Social determinants screening',
            aiImpact: 'Auto-extract SDOH from notes and route to community resources',
            type: 'agent',
            impact: '3x SDOH screening rate',
          },
          {
            name: 'Chronic-condition coaching',
            aiImpact: 'Asynchronous AI coach with clinician escalation for diabetes, CHF, CKD',
            type: 'agent',
            impact: '0.5-1.5 A1c reduction in diabetes cohorts',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Administrative Burden',
        description:
          'Clinicians spend 40% of time on documentation. Prior auth, appeals, and quality reporting consume back-office capacity.',
        metric: '$760-935B',
        metricLabel: 'Annual US administrative waste',
      },
      {
        title: 'Workforce Shortages',
        description:
          'Nurse and physician burnout drive turnover. Agency rates compound the cost of every open position.',
        metric: '$16K',
        metricLabel: 'Annual cost per burned-out clinician',
      },
      {
        title: 'Reimbursement Pressure',
        description:
          'Value-based contracts require analytics most provider organizations are not equipped to run at scale.',
        metric: '40%',
        metricLabel: 'Of clinician time on EHR documentation',
      },
      {
        title: 'Data Fragmentation',
        description:
          'EHR, claims, scheduling, and SDOH data sit in separate systems. Joining them for AI is slow and expensive.',
        metric: '90M',
        metricLabel: 'US prior auth requests per year',
      },
    ],
    forgeApplication:
      'The Forge Method for healthcare requires HIPAA, SOC 2, and clinical-validation discipline from day one. Diagnostic identifies highest-burden workflows (prior auth, documentation, denials). Sprint deploys clinician-trusted systems with audit trails. Scale operates the model and tracks clinical + financial outcomes.',
    videoBackground: '/videos/healthcare.mp4',
  },

  // SAAS & TECHNOLOGY
  {
    slug: 'saas',
    name: 'SaaS & Technology',
    shortName: 'SaaS',
    category: 'Technology & Telecom',
    hero: 'Use AI to compress sales cycles, lift retention, and remove unit-economic drag from operations.',
    oneLiner: 'Production AI for the GTM, success, and engineering motions of growth-stage SaaS.',
    overview: [
      'SaaS companies live and die on the unit economics of acquisition, expansion, and retention. AI is now table stakes — but most teams ship features without changing the operating model.',
      'ClearForge embeds AI agents inside the GTM, customer success, and engineering motions where they materially shift CAC, GRR, and gross margin.',
    ],
    marketContext: [
      { stat: '$1.2T', label: 'Global SaaS market by 2027' },
      { stat: '32%', label: 'Of SaaS rep time spent on prospecting that could be automated' },
      { stat: '110%', label: 'NRR target for top-quartile SaaS — most miss it' },
      { stat: '20-30%', label: 'Of CS time on manual reporting' },
    ],
    valueChain: [
      {
        function: 'Demand Generation & Marketing',
        icon: 'Megaphone',
        description:
          'Replace one-size-fits-all campaigns with intent-driven, account-level personalization.',
        activities: [
          {
            name: 'ICP enrichment & scoring',
            aiImpact:
              'Agent enriches every account with firmographic, technographic, intent signals',
            type: 'agent',
            impact: '2-3x SQL conversion rate',
          },
          {
            name: 'Personalized landing-page generation',
            aiImpact: 'Auto-generate vertical/persona landing pages from a master template',
            type: 'agent',
            impact: '30-60% conversion lift on paid traffic',
          },
          {
            name: 'Outbound sequence personalization',
            aiImpact:
              'Agent drafts persona-tailored outbound from research signals; rep edits + sends',
            type: 'agent',
            impact: '3-5x reply rate',
          },
          {
            name: 'Content strategy copilot',
            aiImpact: 'Identify content gaps, draft briefs, and generate first-draft articles',
            type: 'copilot',
            impact: '5-10x content velocity',
          },
        ],
      },
      {
        function: 'Sales',
        icon: 'TrendingUp',
        description: 'Move reps from research and admin into selling time.',
        activities: [
          {
            name: 'Pre-meeting research agent',
            aiImpact:
              'Agent prepares brief on company, decision-maker, recent news, competitive landscape',
            type: 'agent',
            impact: '60-90 min/day saved per rep',
          },
          {
            name: 'Deal-risk scoring',
            aiImpact: 'Model identifies stalled deals from CRM activity + email + call sentiment',
            type: 'model',
            impact: '15-25% pipeline conversion lift',
          },
          {
            name: 'CRM hygiene automation',
            aiImpact: 'Agent updates contacts, deal stages, notes from email/calendar/calls',
            type: 'agent',
            impact: '5-10 hrs/week reclaimed per rep',
          },
          {
            name: 'Proposal & contract generation',
            aiImpact:
              'Generate proposal from CRM data, route through approvals, send for signature',
            type: 'agent',
            impact: '70%+ reduction in proposal cycle time',
          },
        ],
      },
      {
        function: 'Customer Success',
        icon: 'Users',
        description: 'Predict churn and expand accounts at scale.',
        activities: [
          {
            name: 'Churn prediction model',
            aiImpact:
              'Score accounts by churn risk weekly using product-usage + support + sentiment',
            type: 'model',
            impact: '10-25% logo retention lift',
          },
          {
            name: 'EBR/QBR automation',
            aiImpact: 'Agent generates QBR deck with usage trends, ROI, expansion opportunities',
            type: 'agent',
            impact: '50-70% CSM time reduction per QBR',
          },
          {
            name: 'Onboarding copilot',
            aiImpact: 'In-product agent guides setup, answers questions, books help when stuck',
            type: 'agent',
            impact: '20-40% time-to-value reduction',
          },
          {
            name: 'Renewal-risk plays',
            aiImpact: 'Agent triggers and orchestrates retention plays based on risk score',
            type: 'agent',
            impact: '15-30% renewal lift on at-risk cohort',
          },
        ],
      },
      {
        function: 'Product & Engineering',
        icon: 'Code',
        description: 'AI augments product velocity and code quality.',
        activities: [
          {
            name: 'Feature-request triage',
            aiImpact: 'Agent categorizes inbound requests, deduplicates, links to roadmap',
            type: 'agent',
            impact: '80% reduction in PM triage time',
          },
          {
            name: 'Bug-report enrichment',
            aiImpact: 'Agent reproduces bug, attaches logs, assigns priority and team',
            type: 'agent',
            impact: '50% faster bug resolution',
          },
          {
            name: 'Code review copilot',
            aiImpact: 'AI reviews PRs for style, security, test coverage before human review',
            type: 'copilot',
            impact: '30-50% reduction in review cycles',
          },
          {
            name: 'In-product AI features',
            aiImpact:
              'Build, validate, and operate user-facing AI features (search, summary, agents)',
            type: 'agent',
            impact: 'Differentiated product moat + ARPU expansion',
          },
        ],
      },
      {
        function: 'Finance & Operations',
        icon: 'Calculator',
        description: 'Run a tighter operating cadence with less FTE drag.',
        activities: [
          {
            name: 'SaaS metrics automation',
            aiImpact: 'Agent reconciles MRR, NRR, gross margin from CRM/billing/usage daily',
            type: 'automation',
            impact: 'Same-day metric refresh, board-ready',
          },
          {
            name: 'Cash-collection agent',
            aiImpact: 'Agent prioritizes AR follow-ups, drafts dunning emails, escalates by stage',
            type: 'agent',
            impact: '20-30% DSO reduction',
          },
          {
            name: 'Headcount-planning copilot',
            aiImpact: 'Forecast hiring needs by team based on capacity, pipeline, and policy',
            type: 'copilot',
            impact: 'Quarterly plan in days vs. weeks',
          },
          {
            name: 'Vendor-spend optimization',
            aiImpact: 'Agent flags duplicate SaaS, unused seats, contract-renewal risk',
            type: 'agent',
            impact: '15-25% vendor-spend reduction',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'CAC Inflation',
        description:
          'Paid channels are saturated and reps are buried in admin. Top-of-funnel productivity has flatlined for most growth-stage SaaS.',
        metric: '32%',
        metricLabel: 'Of rep time on automatable prospecting',
      },
      {
        title: 'Retention Pressure',
        description:
          'NRR is the #1 metric public SaaS comps. Manual CSM models cannot deliver consistent expansion at scale.',
        metric: '110%',
        metricLabel: 'NRR target — most fall short',
      },
      {
        title: 'Engineering Bandwidth',
        description:
          'Roadmap velocity is gated by review cycles, bug load, and feature-request triage.',
        metric: '20-30%',
        metricLabel: 'Of CS time on reporting overhead',
      },
      {
        title: 'Operating Cadence Cost',
        description:
          'Manual finance, RevOps, and reporting consumes 10-15% of headcount in growth-stage companies.',
        metric: '$1.2T',
        metricLabel: 'Global SaaS market by 2027',
      },
    ],
    forgeApplication:
      'The Forge Method for SaaS focuses on GTM and operations workflows where CAC, NRR, or gross margin can move. Diagnostic ranks the first workflow. Sprint deploys 1-2 production agents integrated with Salesforce/HubSpot, billing, and product analytics. Scale operates the agents and expands across motions.',
    videoBackground: '/videos/saas.mp4',
  },

  // PRIVATE EQUITY
  {
    slug: 'private-equity',
    name: 'Private Equity Portfolio',
    shortName: 'Private Equity',
    category: 'Financial Services',
    hero: 'Deploy repeatable AI value-creation plays across portfolio companies with tighter execution control.',
    oneLiner: 'AI as a portfolio-level operating discipline, not a single-portco experiment.',
    overview: [
      'Operating partners need measurable value creation within hold periods, not isolated innovation projects. The opportunity is highest when initiatives are repeatable and linked directly to EBITDA levers.',
      'ClearForge helps PE operating teams identify cross-portfolio patterns, prioritize high-return use cases, and execute quickly with clear governance — turning AI into a repeatable value-creation play.',
    ],
    marketContext: [
      { stat: '$13T', label: 'Global PE AUM' },
      { stat: '5-7%', label: 'EBITDA uplift potential from systematic AI deployment' },
      { stat: '<25%', label: 'Of portcos have a coherent AI plan' },
      { stat: '12-18 mo', label: 'Typical lag between platform sponsor and bolt-on adoption' },
    ],
    valueChain: [
      {
        function: 'Deal Sourcing & Diligence',
        icon: 'Search',
        description: 'Move from manual screening to AI-augmented sourcing and diligence.',
        activities: [
          {
            name: 'Sector mapping agent',
            aiImpact:
              'Agent maps sub-sector ecosystems, identifies private targets matching thesis',
            type: 'agent',
            impact: '5-10x sourcing throughput',
          },
          {
            name: 'AI-readiness diligence',
            aiImpact: 'Diligence target operating model, data, and AI use cases as part of QofE',
            type: 'agent',
            impact: 'Surface 5-15% additional value-creation upside',
          },
          {
            name: 'Document-room analysis',
            aiImpact: 'Agent reads VDR, extracts material terms, flags risks across contracts',
            type: 'agent',
            impact: '60-80% legal review time reduction',
          },
          {
            name: 'Integration-value modeling copilot',
            aiImpact: 'Quantify revenue and cost opportunities for bolt-on combinations',
            type: 'copilot',
            impact: 'Diligence cycle compressed by 1-2 weeks',
          },
        ],
      },
      {
        function: 'Portfolio Diagnostic',
        icon: 'Target',
        description: 'Standardize how AI opportunities are identified and ranked across portcos.',
        activities: [
          {
            name: 'Cross-portco opportunity scan',
            aiImpact:
              'Agent runs the same diagnostic across portcos and scores opportunities consistently',
            type: 'agent',
            impact: 'Common playbook across 5-15 portcos',
          },
          {
            name: 'EBITDA-tied value sizing',
            aiImpact: 'Quantify each opportunity against margin, working capital, growth',
            type: 'copilot',
            impact: 'Initiatives ranked by IRR and time-to-value',
          },
          {
            name: 'Readiness scoring',
            aiImpact: 'Score portcos on data, talent, and execution readiness for AI',
            type: 'model',
            impact: 'Sequence sponsor effort and capital correctly',
          },
          {
            name: 'Operating-cadence design',
            aiImpact: 'Define monthly value-creation cadence with KPIs and ownership',
            type: 'copilot',
            impact: 'OP team manages by exception, not by report',
          },
        ],
      },
      {
        function: 'Revenue & Commercial Acceleration',
        icon: 'Zap',
        description: 'Deploy proven revenue plays repeatably across portfolio companies.',
        activities: [
          {
            name: 'Pricing optimization',
            aiImpact: 'Model + agent recommend price changes by segment, with margin guardrails',
            type: 'model',
            impact: '2-5% margin lift per portco',
          },
          {
            name: 'Sales-effectiveness agent',
            aiImpact: 'Same agent stack deployed across multiple portco sales teams',
            type: 'agent',
            impact: '15-30% rep productivity lift',
          },
          {
            name: 'Cross-portfolio account targeting',
            aiImpact: 'Identify shared customers and cross-sell across portcos',
            type: 'agent',
            impact: 'Net-new revenue from existing relationships',
          },
          {
            name: 'Demand-gen template library',
            aiImpact: 'Repeatable AI-driven outbound + content stack',
            type: 'agent',
            impact: 'New portcos hit demand-gen velocity in <90 days',
          },
        ],
      },
      {
        function: 'Operations & Cost',
        icon: 'Settings',
        description: 'Run the same operating-cost plays across the portfolio.',
        activities: [
          {
            name: 'Procurement-savings sweep',
            aiImpact: 'Agent runs spend analysis + supplier benchmarking across portcos',
            type: 'agent',
            impact: '5-15% addressable spend identified',
          },
          {
            name: 'Back-office automation rollout',
            aiImpact: 'Pre-built finance/HR/IT automation deployed in 30-60 days per portco',
            type: 'automation',
            impact: '20-35% G&A reduction',
          },
          {
            name: 'Working-capital optimization',
            aiImpact: 'AR/AP/inventory agents deployed with portfolio benchmarks',
            type: 'agent',
            impact: '5-15 days DSO/DIO improvement',
          },
          {
            name: 'Service-line restructure',
            aiImpact: 'AI-supported productivity benchmarking and offshoring decisions',
            type: 'copilot',
            impact: '10-25% labor cost reduction',
          },
        ],
      },
      {
        function: 'Exit & Reporting',
        icon: 'BarChart3',
        description: 'Tell a sharper story with cleaner data — and prove it.',
        activities: [
          {
            name: 'Portfolio reporting automation',
            aiImpact: 'Standardize portco reporting; agent prepares MPR/QPR consolidated views',
            type: 'agent',
            impact: 'Same-day reporting cycle',
          },
          {
            name: 'Exit narrative copilot',
            aiImpact: 'Generate CIM-ready story with AI-driven value-creation evidence',
            type: 'copilot',
            impact: 'Narrative compression from weeks to days',
          },
          {
            name: 'Buyer-question Q&A agent',
            aiImpact: 'Agent fields buyer diligence questions from VDR with cited evidence',
            type: 'agent',
            impact: '50%+ reduction in management distraction',
          },
          {
            name: 'Track-record analysis',
            aiImpact: 'Auto-generate fund track-record updates and LP communications',
            type: 'agent',
            impact: 'IR cycle accelerated, fewer manual errors',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Inconsistent Diagnostics',
        description:
          'AI opportunities are identified ad hoc — no shared framework, no comparable scoring, no portfolio sequencing.',
        metric: '<25%',
        metricLabel: 'Of portcos have a coherent AI plan',
      },
      {
        title: 'Operating Bandwidth',
        description:
          'Operating partners cannot personally drive implementation across 10-30 portcos. Without a repeatable model, AI stalls.',
        metric: '12-18 mo',
        metricLabel: 'Lag between sponsor adoption and bolt-on rollout',
      },
      {
        title: 'Value Measurement',
        description:
          'AI initiatives drift from EBITDA. Without explicit KPI tie-back, sponsors lose visibility.',
        metric: '5-7%',
        metricLabel: 'EBITDA uplift potential from systematic AI',
      },
      {
        title: 'Exit-Story Discipline',
        description:
          'AI value creation is hard to evidence at exit unless it was instrumented from the start.',
        metric: '$13T',
        metricLabel: 'Global PE AUM',
      },
    ],
    forgeApplication:
      'The Forge Method for PE delivers a portfolio-level diagnostic, then deploys repeatable AI plays across portcos. Diagnostic surfaces top opportunities tied to EBITDA. Sprint deploys 1-2 priority plays per portco. Scale runs the operating cadence and expands the playbook to new portcos and bolt-ons.',
    caseStudySlug: 'pe-portfolio-diagnostic-plan',
    videoBackground: '/videos/pe.mp4',
  },

  // INSURANCE
  {
    slug: 'insurance',
    name: 'Insurance',
    shortName: 'Insurance',
    category: 'Financial Services',
    hero: 'Compress underwriting and claim cycles, lift loss ratio precision, and rebuild distribution economics.',
    oneLiner: 'AI agents across underwriting, claims, and distribution — not pilot demos.',
    overview: [
      'Insurance is data-rich and process-heavy. Underwriting, claims, and distribution all run on workflows where AI can compress cycle time, improve loss-ratio precision, and free human experts for the work that requires judgment.',
      'ClearForge builds production AI for carriers, MGAs, and brokers — with the explainability and audit discipline state regulators expect.',
    ],
    marketContext: [
      { stat: '$7.5T', label: 'Global insurance premium volume' },
      { stat: '5-13%', label: 'Combined-ratio improvement potential from AI deployment' },
      { stat: '60%', label: 'Of underwriter time spent on data gathering' },
      { stat: '$80B+', label: 'Annual insurance fraud cost in US alone' },
    ],
    valueChain: [
      {
        function: 'Distribution & New Business',
        icon: 'Briefcase',
        description: 'Convert more agent submissions and lift quote-to-bind ratios.',
        activities: [
          {
            name: 'Submission triage',
            aiImpact:
              'Agent extracts data from agent emails, scores fit-to-appetite, routes to underwriter',
            type: 'agent',
            impact: '60-80% reduction in submission handling time',
          },
          {
            name: 'Agent productivity copilot',
            aiImpact: 'Score producer effectiveness, recommend training and book transfers',
            type: 'copilot',
            impact: '10-20% premium per agent lift',
          },
          {
            name: 'Quote-to-bind agent',
            aiImpact: 'Agent shepherds quotes through bind, follows up on missing info',
            type: 'agent',
            impact: '15-30% bind ratio lift',
          },
          {
            name: 'Renewal-retention model',
            aiImpact: 'Predict at-risk renewals and trigger retention pricing or outreach',
            type: 'model',
            impact: '5-15% retention lift',
          },
        ],
      },
      {
        function: 'Underwriting',
        icon: 'FileSearch',
        description:
          'Move underwriters from data gathering into selection and portfolio management.',
        activities: [
          {
            name: 'Submission data extraction',
            aiImpact:
              'Agent reads ACORD forms, loss runs, schedules, financials and structures the data',
            type: 'agent',
            impact: '70%+ time reduction on data prep',
          },
          {
            name: 'Risk-scoring model',
            aiImpact: 'Hybrid model combines underwriter heuristics with peer-comparable risk data',
            type: 'model',
            impact: '3-7% loss-ratio improvement',
          },
          {
            name: 'Reference-deal retrieval',
            aiImpact: 'Agent surfaces comparable bound risks and pricing',
            type: 'agent',
            impact: 'Faster, more consistent decisioning',
          },
          {
            name: 'Pricing-recommendation copilot',
            aiImpact: 'Recommend price within authority, flag exceptions to senior underwriter',
            type: 'copilot',
            impact: '20-40% submission throughput per UW',
          },
        ],
      },
      {
        function: 'Claims',
        icon: 'AlertTriangle',
        description: 'Resolve more claims faster, with better leakage control.',
        activities: [
          {
            name: 'FNOL automation',
            aiImpact: 'Agent intakes claim via voice or web, classifies, assigns adjuster',
            type: 'agent',
            impact: '30-60% faster cycle initiation',
          },
          {
            name: 'Claim-severity prediction',
            aiImpact: 'Model predicts claim severity at FNOL to route to right adjuster tier',
            type: 'model',
            impact: 'Reduce reserve misses 20-40%',
          },
          {
            name: 'Fraud-detection model',
            aiImpact: 'Score claims for fraud probability with explainable indicators',
            type: 'model',
            impact: '$80B+ industry fraud cost addressable',
          },
          {
            name: 'Subrogation identification',
            aiImpact: 'Agent reviews claim files for subro opportunities',
            type: 'agent',
            impact: '5-15% subro recovery lift',
          },
        ],
      },
      {
        function: 'Customer Service',
        icon: 'Phone',
        description: 'Self-service the routine, escalate the complex.',
        activities: [
          {
            name: 'Policy-service agent',
            aiImpact: 'Agent handles ID cards, address changes, billing, certificates of insurance',
            type: 'agent',
            impact: '50-70% deflection of service volume',
          },
          {
            name: 'Document intake',
            aiImpact: 'Auto-classify and process inbound endorsements, audits, supporting docs',
            type: 'automation',
            impact: '10x throughput at 95%+ accuracy',
          },
          {
            name: 'Complaint analytics',
            aiImpact: 'Auto-tag complaints by issue, track regulatory exposure',
            type: 'model',
            impact: 'Same-day visibility into systemic issues',
          },
          {
            name: 'Producer-support copilot',
            aiImpact: 'Agent answers producer questions on coverage, appetite, quoting',
            type: 'copilot',
            impact: 'Producer NPS lift, faster onboarding',
          },
        ],
      },
      {
        function: 'Actuarial & Finance',
        icon: 'Calculator',
        description: 'Run more reserve and pricing scenarios, faster.',
        activities: [
          {
            name: 'Reserving acceleration',
            aiImpact: 'Auto-generate triangle analyses, IBNR splits, and narrative commentary',
            type: 'agent',
            impact: 'Cut reserving cycle time 40-60%',
          },
          {
            name: 'Catastrophe modeling integration',
            aiImpact: 'Agent runs cat scenarios and explains exposure changes by treaty/region',
            type: 'agent',
            impact: 'Faster reinsurance decisions',
          },
          {
            name: 'Loss-ratio narrative copilot',
            aiImpact: 'Pre-write LR commentary by line, region, and producer cohort',
            type: 'copilot',
            impact: '60% reduction in MD&A drafting time',
          },
          {
            name: 'Financial-close automation',
            aiImpact: 'Reconcile premium, claims, reinsurance balances daily',
            type: 'automation',
            impact: '30-50% close cycle compression',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Underwriting Data Burden',
        description:
          'Underwriters spend most of their time gathering and structuring submission data instead of selecting risk.',
        metric: '60%',
        metricLabel: 'Of UW time on data gathering',
      },
      {
        title: 'Claim Leakage',
        description:
          'Reserve misses, fraud, and missed subrogation cost carriers points of combined ratio every year.',
        metric: '$80B+',
        metricLabel: 'US insurance fraud cost',
      },
      {
        title: 'Distribution Efficiency',
        description:
          'Agent productivity is uneven and inflexible. Submissions stall in inbox queues.',
        metric: '5-13%',
        metricLabel: 'CR improvement potential',
      },
      {
        title: 'Regulatory Discipline',
        description:
          'Every model needs explainability, audit, and rate-filing discipline. Most pilots cannot meet the bar.',
        metric: '$7.5T',
        metricLabel: 'Global premium volume',
      },
    ],
    forgeApplication:
      'The Forge Method for insurance carriers builds underwriting and claim agents with explainability, audit logs, and human-in-the-loop controls. Diagnostic ranks workflows by line. Sprint deploys 1-2 production systems integrated to PAS/CMS. Scale operates governance and expands across lines and geographies.',
  },

  // RETAIL & E-COMMERCE
  {
    slug: 'retail',
    name: 'Retail & E-commerce',
    shortName: 'Retail',
    category: 'Consumer & Retail',
    hero: 'Lift unit economics across merchandising, marketing, and stores with AI that touches the P&L.',
    oneLiner: 'Production AI for the merchandising, marketing, and store-operations stack.',
    overview: [
      'Retailers are squeezed between digital pure-plays, pricing pressure, and labor cost. AI in retail must deliver against gross margin, conversion, and store productivity — not flashy demos.',
      'ClearForge deploys production AI inside merchandising, marketing, and store-operations workflows where economics actually move.',
    ],
    marketContext: [
      { stat: '$30T', label: 'Global retail market' },
      { stat: '$1.75T', label: 'Annual cost of returns globally' },
      { stat: '6-15%', label: 'Margin uplift available from AI-driven pricing + merchandising' },
      { stat: '60%', label: 'Of consumers expect personalized experiences' },
    ],
    valueChain: [
      {
        function: 'Merchandising & Buying',
        icon: 'ShoppingBag',
        description:
          'Plan assortments, pricing, and allocations with continuously updated demand signals.',
        activities: [
          {
            name: 'Demand forecasting (SKU/store)',
            aiImpact: 'AI agent predicts SKU-level demand by store, season, pricing scenario',
            type: 'agent',
            impact: 'Stockouts -30%, excess inventory -25%',
          },
          {
            name: 'Assortment optimization',
            aiImpact: 'Model recommends SKU adds/drops by cluster + locality',
            type: 'model',
            impact: '2-6% comp lift on new assortment',
          },
          {
            name: 'Markdown optimization',
            aiImpact:
              'Agent recommends markdown depth and timing to maximize sell-through and margin',
            type: 'agent',
            impact: '3-10% margin lift on clearance cohorts',
          },
          {
            name: 'Allocation & replenishment',
            aiImpact: 'Daily allocation by store with rebalancing recommendations',
            type: 'automation',
            impact: 'Inventory turn improvement 10-30%',
          },
        ],
      },
      {
        function: 'Pricing & Promotions',
        icon: 'Tag',
        description: 'Run a tight pricing engine with promotion ROI evidence.',
        activities: [
          {
            name: 'Dynamic pricing',
            aiImpact: 'Model recommends prices by SKU/market with competitor + elasticity inputs',
            type: 'model',
            impact: '2-5% margin lift, 1-3% revenue lift',
          },
          {
            name: 'Promotion ROI modeling',
            aiImpact: 'Predict uplift, cannibalization, halo by promo + event',
            type: 'model',
            impact: 'Promo budget reallocated for 5-10% ROI gain',
          },
          {
            name: 'Personalized offer agent',
            aiImpact: 'Agent generates personalized offers by segment with margin guardrails',
            type: 'agent',
            impact: '10-25% redemption lift',
          },
          {
            name: 'Markdown narrative copilot',
            aiImpact: 'Auto-generate weekly markdown commentary for buyers and merchants',
            type: 'copilot',
            impact: 'Save planner 8-12 hours per week',
          },
        ],
      },
      {
        function: 'Marketing & E-Commerce',
        icon: 'Megaphone',
        description:
          'Convert more sessions and lift LTV with personalization and ad-spend discipline.',
        activities: [
          {
            name: 'Onsite personalization',
            aiImpact: 'Recommendations and ranking driven by per-user model',
            type: 'model',
            impact: '5-15% conversion-rate lift',
          },
          {
            name: 'Search relevance',
            aiImpact: 'Hybrid semantic search replaces keyword matching',
            type: 'model',
            impact: '20-40% lift in search-led conversion',
          },
          {
            name: 'Ad-creative generation',
            aiImpact: 'Agent generates ad variants by audience and channel; tests at scale',
            type: 'agent',
            impact: '3-5x creative throughput',
          },
          {
            name: 'CRM journey orchestration',
            aiImpact: 'Agent dispatches the right message at the right time per shopper',
            type: 'agent',
            impact: '15-30% LTV lift',
          },
        ],
      },
      {
        function: 'Store Operations',
        icon: 'Store',
        description: 'Optimize labor, shrink, and execution at every location.',
        activities: [
          {
            name: 'Labor scheduling',
            aiImpact: 'Forecast traffic and book labor against task standards',
            type: 'model',
            impact: '4-8% labor cost reduction',
          },
          {
            name: 'Shrink-detection model',
            aiImpact: 'Identify high-risk SKUs and stores, prioritize loss-prevention focus',
            type: 'model',
            impact: '15-25% shrink reduction',
          },
          {
            name: 'Task-execution copilot',
            aiImpact: 'In-aisle agent guides associates on the highest-value task next',
            type: 'copilot',
            impact: 'Out-of-stock, planogram, and price-tag compliance lift',
          },
          {
            name: 'Store-level demand sensing',
            aiImpact: 'Real-time replenishment signal from POS and traffic',
            type: 'agent',
            impact: '2-5% comp lift through availability',
          },
        ],
      },
      {
        function: 'Supply Chain & Fulfillment',
        icon: 'Truck',
        description: 'Move product faster at lower cost-to-serve.',
        activities: [
          {
            name: 'Fulfillment-network optimization',
            aiImpact: 'Order routing across stores, DCs, drop-ship by cost-to-serve',
            type: 'model',
            impact: '5-15% fulfillment cost reduction',
          },
          {
            name: 'Returns triage',
            aiImpact: 'Agent classifies returns and routes to refurb, liquidation, or restock',
            type: 'agent',
            impact: '10-25% recovery on returned inventory',
          },
          {
            name: 'Last-mile ETA model',
            aiImpact: 'Model predicts ETA to customer; trigger pre-empt communication on slip',
            type: 'model',
            impact: 'CSAT lift, fewer where-is-my-order tickets',
          },
          {
            name: 'Carrier-allocation optimization',
            aiImpact: 'Allocate parcels by carrier based on price/perf/SLA per lane',
            type: 'agent',
            impact: '3-7% transportation cost reduction',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Margin Compression',
        description:
          'Pricing pressure plus rising fulfillment cost erodes operating margin even with revenue growth.',
        metric: '6-15%',
        metricLabel: 'Margin uplift from AI pricing+merchandising',
      },
      {
        title: 'Personalization Expectations',
        description:
          'Consumers expect personalized experiences across channels; most retailers cannot deliver consistently.',
        metric: '60%',
        metricLabel: 'Expect personalized experiences',
      },
      {
        title: 'Returns Drag',
        description:
          'Returns are ~30% of online sales for many categories. Most retailers lose money on every reverse-logistics flow.',
        metric: '$1.75T',
        metricLabel: 'Annual returns cost globally',
      },
      {
        title: 'Store Labor Optimization',
        description:
          'Labor is the largest controllable cost in stores. Manual scheduling and task management leave material savings on the table.',
        metric: '$30T',
        metricLabel: 'Global retail market',
      },
    ],
    forgeApplication:
      'The Forge Method for retail starts where the economics are clearest — pricing, demand, or fulfillment — and ships production agents inside existing merchandising and ops workflows. Sprint targets are baselined before build, then reviewed against gross margin, inventory, service, and labor metrics.',
  },

  // WHOLESALE & DISTRIBUTION
  {
    slug: 'wholesale-distribution',
    name: 'Wholesale & Distribution',
    shortName: 'Distribution',
    category: 'Real Assets',
    hero: 'Convert decades of transaction data into pricing power, working-capital efficiency, and sales productivity.',
    oneLiner:
      'AI agents in pricing, sales, and warehouse — built for SKU-heavy, asset-heavy distributors.',
    overview: [
      'Distributors run on volume, SKU complexity, and working capital. The economics live at the intersection of pricing, sales coverage, and inventory turns. AI is the single biggest lever to compress costs and lift margin without disrupting the business.',
      'ClearForge builds AI for distributors that touches inside-sales productivity, pricing discipline, and warehouse throughput.',
    ],
    marketContext: [
      { stat: '$10T+', label: 'Global wholesale distribution market' },
      { stat: '50-70%', label: 'Of distributors lack systematic pricing discipline' },
      { stat: '15-30%', label: 'Of inventory is dead or slow-moving' },
      { stat: '60-80%', label: 'Of inside-rep time on order-taking, not selling' },
    ],
    valueChain: [
      {
        function: 'Sales & Coverage',
        icon: 'Phone',
        description:
          'Move inside reps from order-takers to sellers; field reps from drivers to advisors.',
        activities: [
          {
            name: 'Account-prioritization agent',
            aiImpact:
              'Daily account list ranked by buy-pattern shift, decline risk, and white space',
            type: 'agent',
            impact: '20-40% sales productivity lift',
          },
          {
            name: 'Cross-sell recommendations',
            aiImpact: 'Per-account cross-sell SKUs based on peer purchase data',
            type: 'model',
            impact: '5-15% wallet-share lift',
          },
          {
            name: 'Quote-acceleration copilot',
            aiImpact: 'Generate quotes from inbound RFQ, validate margin, send',
            type: 'copilot',
            impact: '60% quote cycle time reduction',
          },
          {
            name: 'Customer-decline early warning',
            aiImpact: 'Flag accounts with declining order patterns 30-60 days before churn',
            type: 'model',
            impact: '10-25% churn reduction',
          },
        ],
      },
      {
        function: 'Pricing & Margin',
        icon: 'Tag',
        description: 'Build pricing discipline across millions of SKU/customer combinations.',
        activities: [
          {
            name: 'Customer-segment pricing',
            aiImpact: 'Recommend price by segment with elasticity + competitive data',
            type: 'model',
            impact: '2-5% gross margin lift',
          },
          {
            name: 'Quote-margin guardrails',
            aiImpact: 'Agent flags margin-erosion quotes pre-send, recommends counter-offer',
            type: 'agent',
            impact: 'Reduce margin leakage 1-3 pts',
          },
          {
            name: 'Special-pricing agreement audit',
            aiImpact: 'Agent reviews active SPAs for compliance and renegotiation triggers',
            type: 'agent',
            impact: '0.5-2% margin recapture',
          },
          {
            name: 'Cost-to-serve model',
            aiImpact: 'Calculate fully loaded cost-to-serve by customer/order to inform pricing',
            type: 'model',
            impact: 'Identify unprofitable accounts',
          },
        ],
      },
      {
        function: 'Inventory & Purchasing',
        icon: 'Boxes',
        description: 'Convert dead stock into cash without losing service level.',
        activities: [
          {
            name: 'Demand forecasting (SKU/branch)',
            aiImpact: 'Forecast every SKU at every branch with seasonality + promos',
            type: 'model',
            impact: '20-40% forecast error reduction',
          },
          {
            name: 'Reorder-point optimization',
            aiImpact: 'Agent re-tunes ROP/EOQ continuously by SKU velocity class',
            type: 'agent',
            impact: '10-25% inventory reduction at same fill rate',
          },
          {
            name: 'Slow-moving cleanup',
            aiImpact: 'Agent identifies dead stock, recommends transfer/markdown/return',
            type: 'agent',
            impact: 'Recover 5-15% of slow inventory value',
          },
          {
            name: 'Vendor-rebate optimization',
            aiImpact: 'Track vendor rebate tiers, recommend purchases to maximize rebate $',
            type: 'agent',
            impact: '0.5-2% rebate lift',
          },
        ],
      },
      {
        function: 'Warehouse & Logistics',
        icon: 'Warehouse',
        description: 'Lift labor productivity without capex.',
        activities: [
          {
            name: 'Slotting optimization',
            aiImpact: 'Re-slot SKUs by velocity, weight, and pick path',
            type: 'model',
            impact: '10-25% pick productivity lift',
          },
          {
            name: 'Wave-planning agent',
            aiImpact: 'Optimize order release waves by carrier cutoff + labor capacity',
            type: 'agent',
            impact: 'On-time-ship lift, OT reduction',
          },
          {
            name: 'Outbound carrier-rate shopping',
            aiImpact: 'Agent rate-shops carrier per shipment by lane and SLA',
            type: 'agent',
            impact: '3-7% freight cost reduction',
          },
          {
            name: 'Yard & dock scheduling',
            aiImpact: 'Predictive arrival + dock-door allocation optimization',
            type: 'agent',
            impact: 'Reduce detention, dock congestion',
          },
        ],
      },
      {
        function: 'Customer Service & E-Commerce',
        icon: 'Users',
        description: 'Self-service the routine; let humans handle the complex.',
        activities: [
          {
            name: 'Order-status agent',
            aiImpact: 'Agent fields where-is-my-order, ETA changes, replacement requests',
            type: 'agent',
            impact: '40-60% deflection of inbound calls',
          },
          {
            name: 'Catalog enrichment',
            aiImpact: 'Agent enriches product data, normalizes spec, attaches images/MSDS',
            type: 'agent',
            impact: 'Onboard new SKUs in days, not weeks',
          },
          {
            name: 'Returns automation',
            aiImpact: 'Agent processes returns from inbound request through credit issuance',
            type: 'agent',
            impact: '70%+ touchless returns',
          },
          {
            name: 'Self-serve quoting',
            aiImpact: 'Customer portal generates instant quotes with margin compliance',
            type: 'agent',
            impact: '10-25% inside-sales workload reduction',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Pricing Discipline',
        description:
          'Most distributors leave 1-3 points of margin on the table because pricing decisions are uneven, manual, and tribal.',
        metric: '50-70%',
        metricLabel: 'Lack systematic pricing discipline',
      },
      {
        title: 'Working Capital Drag',
        description:
          'Inventory turns are degraded by manual reorder logic, missed transfers, and slow-moving stock that lingers.',
        metric: '15-30%',
        metricLabel: 'Of inventory is dead or slow',
      },
      {
        title: 'Sales-Rep Bandwidth',
        description:
          'Inside reps spend most of their time taking orders and answering routine questions instead of selling.',
        metric: '60-80%',
        metricLabel: 'Of rep time on order-taking',
      },
      {
        title: 'Service-Level Variability',
        description:
          'On-time-ship and order accuracy vary by branch. Customers feel it, and large accounts notice.',
        metric: '$10T+',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for distributors typically starts with pricing or sales productivity — both have direct gross-margin impact and short cycle times. Sprint deploys 1-2 production agents integrated to ERP and CRM. Scale operates the agents and expands into inventory, warehouse, and customer service.',
  },

  // LOGISTICS & TRANSPORTATION
  {
    slug: 'logistics-transportation',
    name: 'Logistics & Transportation',
    shortName: 'Logistics',
    category: 'Mobility & Transport',
    hero: 'Compress cycle time, lift asset utilization, and remove friction across every freight touchpoint.',
    oneLiner: 'AI agents from quoting to claims, built for asset-heavy logistics operators.',
    overview: [
      'Logistics businesses run on cycle time and asset utilization. AI is changing the unit economics of freight — pricing, dispatch, capacity matching, and customer service are all being rewritten by agents.',
      'ClearForge builds production AI for carriers, brokers, and 3PLs that compresses turnaround and surfaces every dollar of margin.',
    ],
    marketContext: [
      { stat: '$10T', label: 'Global logistics spend' },
      { stat: '20-40%', label: 'Of dispatcher time on manual routing' },
      { stat: '$120B', label: 'Annual deadhead miles cost in US trucking' },
      { stat: '40%+', label: 'Of broker reps spend day on quote follow-up' },
    ],
    valueChain: [
      {
        function: 'Sales & Pricing',
        icon: 'DollarSign',
        description: 'Quote faster, price smarter, win more freight.',
        activities: [
          {
            name: 'Lane-pricing model',
            aiImpact: 'Predict win-probability and target margin by lane, equipment, and customer',
            type: 'model',
            impact: '2-5% margin lift on bid lanes',
          },
          {
            name: 'Quote-automation agent',
            aiImpact: 'Agent reads inbound RFQ email, generates quote, routes to approver',
            type: 'agent',
            impact: '90%+ quote-cycle reduction',
          },
          {
            name: 'Customer-bid retention model',
            aiImpact: 'Predict which lanes are at risk in annual bid; trigger account play',
            type: 'model',
            impact: '10-25% retained-volume lift',
          },
          {
            name: 'Tender-acceptance optimization',
            aiImpact: 'Recommend which loads to accept based on margin + asset utilization',
            type: 'agent',
            impact: '3-7% net margin per move',
          },
        ],
      },
      {
        function: 'Dispatch & Operations',
        icon: 'Map',
        description: 'Use every asset, every minute, with less manual work.',
        activities: [
          {
            name: 'Driver/load matching',
            aiImpact: 'Agent matches loads to drivers by HOS, location, customer, equipment',
            type: 'agent',
            impact: 'Reduce dwell, lift moves per asset 10-15%',
          },
          {
            name: 'Backhaul optimization',
            aiImpact: 'Identify backhaul opportunities for outbound trucks',
            type: 'model',
            impact: 'Reduce empty miles 5-15%',
          },
          {
            name: 'Dispatcher copilot',
            aiImpact: 'Pre-build day plan for each dispatcher with disruptions handled first',
            type: 'copilot',
            impact: 'Dispatchers handle 30%+ more drivers',
          },
          {
            name: 'ETA model + customer alerts',
            aiImpact: 'Predict ETAs with delay drivers; auto-update customers proactively',
            type: 'agent',
            impact: 'CSAT lift, fewer call-in WISMO tickets',
          },
        ],
      },
      {
        function: 'Capacity & Procurement',
        icon: 'Truck',
        description: 'Source capacity at the right price without leaving margin on the table.',
        activities: [
          {
            name: 'Carrier-sourcing agent',
            aiImpact:
              'Agent rate-shops capacity in real time across spot board + contract carriers',
            type: 'agent',
            impact: '3-8% buy-side cost reduction',
          },
          {
            name: 'Carrier-performance model',
            aiImpact: 'Score carriers on OTP, claims, billing accuracy',
            type: 'model',
            impact: 'Reroute volume to higher-quality lanes',
          },
          {
            name: 'Spot-market arbitrage',
            aiImpact: 'Agent identifies imbalances in spot rates by lane + day-of-week',
            type: 'agent',
            impact: '5-15% spot margin lift',
          },
          {
            name: 'Contract carrier compliance',
            aiImpact: 'Auto-monitor contract terms and surface non-compliance',
            type: 'agent',
            impact: 'Reduce off-contract spend leakage',
          },
        ],
      },
      {
        function: 'Customer Service',
        icon: 'Headphones',
        description: 'Deflect routine, accelerate exceptions.',
        activities: [
          {
            name: 'Track & trace agent',
            aiImpact: 'Agent fields shipment-status calls and emails with citation to source',
            type: 'agent',
            impact: '50-70% inbound deflection',
          },
          {
            name: 'Exception-management triage',
            aiImpact: 'Classify exceptions by severity and route to right resolver',
            type: 'agent',
            impact: '40% faster exception resolution',
          },
          {
            name: 'Booking automation',
            aiImpact: 'Agent intakes booking requests, validates capacity, confirms',
            type: 'agent',
            impact: 'Same-day booking acknowledgement',
          },
          {
            name: 'Document intake',
            aiImpact: 'Process BOLs, PODs, customs forms with structured extraction',
            type: 'automation',
            impact: '95%+ accuracy at 10x throughput',
          },
        ],
      },
      {
        function: 'Finance & Compliance',
        icon: 'Shield',
        description: 'Bill faster, collect cleaner, satisfy regulators.',
        activities: [
          {
            name: 'Auto-billing agent',
            aiImpact: 'Agent matches POD to invoice and triggers billing on delivery confirmation',
            type: 'agent',
            impact: 'DSO reduction 5-15 days',
          },
          {
            name: 'Claim-processing automation',
            aiImpact: 'Triage damage claims, gather evidence, draft response to claimant',
            type: 'agent',
            impact: 'Reduce claim cycle 30-50%',
          },
          {
            name: 'Detention/accessorial recovery',
            aiImpact: 'Identify uncollected accessorials from telematics + dispatch logs',
            type: 'agent',
            impact: '1-3% revenue recapture',
          },
          {
            name: 'Driver compliance copilot',
            aiImpact: 'HOS, drug testing, license expirations tracked with proactive nudges',
            type: 'copilot',
            impact: 'Compliance violations down significantly',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Dispatch & Routing Drag',
        description:
          'Manual dispatch caps how many drivers a dispatcher can manage and leaves utilization on the table.',
        metric: '20-40%',
        metricLabel: 'Of dispatcher time on manual routing',
      },
      {
        title: 'Quote-Cycle Friction',
        description:
          'Brokers and 3PLs lose freight because quotes take hours when shippers expect minutes.',
        metric: '40%+',
        metricLabel: 'Of rep day on quote follow-up',
      },
      {
        title: 'Asset Underutilization',
        description: 'Empty miles and idle equipment compound across every load decision.',
        metric: '$120B',
        metricLabel: 'Annual deadhead cost in US trucking',
      },
      {
        title: 'Service-Level Variability',
        description:
          'Customers expect real-time tracking and exception management. Most carriers cannot deliver consistently.',
        metric: '$10T',
        metricLabel: 'Global logistics spend',
      },
    ],
    forgeApplication:
      'The Forge Method for logistics typically starts with pricing/quote automation or dispatch — both ship measurable margin and asset-utilization wins in <90 days. Sprint deploys 1-2 production agents integrated to TMS. Scale operates the agents and expands into capacity, claims, and customer service.',
  },

  // PROFESSIONAL SERVICES
  {
    slug: 'professional-services',
    name: 'Professional Services',
    shortName: 'Professional Services',
    category: 'Public & Social Sector',
    hero: 'Lift utilization, accelerate proposals, and scale expertise without scaling headcount.',
    oneLiner:
      'AI agents across the entire delivery lifecycle for consulting, accounting, legal, engineering, and architecture firms.',
    overview: [
      'Professional services firms succeed on speed, quality, and trust. AI compresses the work that does not require human judgment so partners and senior staff focus on the work that does.',
      'ClearForge helps firms build hybrid AI-and-human delivery models without compromising client outcomes — pulling utilization, margin, and speed at the same time.',
    ],
    marketContext: [
      { stat: '$6T', label: 'Global professional services market' },
      { stat: '40-60%', label: 'Of senior staff time on automatable work' },
      { stat: '15-30%', label: 'Realization-rate uplift available from AI deployment' },
      { stat: '<60%', label: 'Average utilization in mid-market firms' },
    ],
    valueChain: [
      {
        function: 'Business Development',
        icon: 'Target',
        description: 'Move firms from referral-dependent to data-driven origination.',
        activities: [
          {
            name: 'Account-targeting agent',
            aiImpact:
              'Score and prioritize accounts by service-line fit, recent triggers, and white space',
            type: 'agent',
            impact: '2-3x meeting density per partner',
          },
          {
            name: 'Proposal-acceleration copilot',
            aiImpact:
              'Generate first-draft proposals from deal context, past wins, and pricing logic',
            type: 'copilot',
            impact: '60-80% reduction in proposal cycle time',
          },
          {
            name: 'Pipeline-stage triage',
            aiImpact: 'Agent flags stalled opportunities and recommends next-step plays',
            type: 'agent',
            impact: '15-30% conversion-rate lift',
          },
          {
            name: 'Cross-sell intelligence',
            aiImpact: 'Identify expansion opportunities across service lines per client',
            type: 'model',
            impact: '8-15% per-client revenue lift',
          },
        ],
      },
      {
        function: 'Engagement Delivery',
        icon: 'Briefcase',
        description: 'Compress research, drafting, and review without losing quality.',
        activities: [
          {
            name: 'Research-and-synthesis agent',
            aiImpact: 'Agent runs market scans, competitor analysis, and primary research drafts',
            type: 'agent',
            impact: '5-10x research velocity',
          },
          {
            name: 'Document-drafting copilot',
            aiImpact: 'Generate first-draft sections from data, prior work, and engagement context',
            type: 'copilot',
            impact: '40-60% drafting time reduction',
          },
          {
            name: 'Quality-review agent',
            aiImpact: 'Pre-review deliverables for consistency, citations, and policy compliance',
            type: 'agent',
            impact: 'Catch issues before partner review',
          },
          {
            name: 'Status-reporting automation',
            aiImpact: 'Agent compiles project status from time, deliverables, and risk logs',
            type: 'agent',
            impact: '3-5 hrs/week reclaimed per project lead',
          },
        ],
      },
      {
        function: 'Client Experience',
        icon: 'Users',
        description: 'Surface insight to clients faster and tighten the relationship.',
        activities: [
          {
            name: 'Insight-delivery agent',
            aiImpact: 'Agent posts proactive insights and benchmarks to client portals',
            type: 'agent',
            impact: 'Lift retention and renewal velocity',
          },
          {
            name: 'Onboarding orchestration',
            aiImpact: 'Auto-route handoff from BD to delivery, gather data, schedule kickoff',
            type: 'agent',
            impact: '50%+ faster engagement start',
          },
          {
            name: 'Client-portal intake',
            aiImpact: 'Self-serve document and data intake with structured validation',
            type: 'agent',
            impact: '70% reduction in admin overhead',
          },
          {
            name: 'Renewal-risk model',
            aiImpact: 'Predict at-risk client relationships from engagement signals',
            type: 'model',
            impact: '10-20% renewal lift',
          },
        ],
      },
      {
        function: 'Knowledge & Expertise',
        icon: 'BookOpen',
        description: 'Make every consultant as smart as the firm.',
        activities: [
          {
            name: 'Knowledge-retrieval agent',
            aiImpact: 'Agent surfaces past work, methodology, and SME insight on demand',
            type: 'agent',
            impact: '70% faster onboarding for new hires',
          },
          {
            name: 'Methodology-codification copilot',
            aiImpact: 'Convert tacit expert knowledge into structured assets',
            type: 'copilot',
            impact: 'Scale partner expertise across firm',
          },
          {
            name: 'Best-practice harvesting',
            aiImpact: 'Auto-extract reusable templates and tools from completed engagements',
            type: 'agent',
            impact: 'Continuous capability growth',
          },
          {
            name: 'Training-content generation',
            aiImpact: 'Generate onboarding curricula and certifications from internal IP',
            type: 'agent',
            impact: 'Faster ramp-up for new hires',
          },
        ],
      },
      {
        function: 'Practice Operations',
        icon: 'BarChart3',
        description: 'Run the firm with crisper utilization, pricing, and resourcing.',
        activities: [
          {
            name: 'Resource-management copilot',
            aiImpact: 'Match staff to engagements by skill, availability, and stretch goals',
            type: 'copilot',
            impact: '5-10 pts utilization improvement',
          },
          {
            name: 'Pricing-discipline agent',
            aiImpact: 'Recommend pricing for proposals based on past margin and complexity',
            type: 'agent',
            impact: '2-5 pts margin lift',
          },
          {
            name: 'Time-entry automation',
            aiImpact: 'Agent drafts time entries from calendar, email, and document activity',
            type: 'agent',
            impact: '4-6 hrs/week reclaimed per consultant',
          },
          {
            name: 'Engagement-economics dashboard',
            aiImpact: 'Daily project margin and burn-rate monitoring with anomaly alerts',
            type: 'agent',
            impact: 'Catch margin slippage in days, not months',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Senior-Staff Bandwidth',
        description:
          'Senior consultants spend 40-60% of their time on work that does not require their judgment — research, slide formatting, status reporting.',
        metric: '40-60%',
        metricLabel: 'Of senior time on automatable work',
      },
      {
        title: 'Utilization Variance',
        description:
          'Mid-market firms run at 50-60% utilization while top-quartile is 70%+. Most variance is operational, not demand.',
        metric: '<60%',
        metricLabel: 'Average mid-market utilization',
      },
      {
        title: 'Realization-Rate Drag',
        description:
          'Discounting, scope creep, and unbilled time erode realization. Most firms cannot see it in real time.',
        metric: '15-30%',
        metricLabel: 'Realization uplift from AI',
      },
      {
        title: 'Knowledge Diffusion',
        description:
          'Expertise lives in partner heads. New hires take 12-24 months to become productive.',
        metric: '$6T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for professional services firms targets the workflow with the highest senior-staff multiplier — usually proposals, research, or knowledge retrieval. Sprint ships a production copilot embedded in delivery workflow. Scale operates the agent and expands across practice groups.',
    caseStudySlug: 'home-services-turnaround',
  },

  // REAL ESTATE
  {
    slug: 'real-estate',
    name: 'Real Estate',
    shortName: 'Real Estate',
    category: 'Real Assets',
    hero: 'Underwrite faster, lease smarter, and run buildings with less manual workload.',
    oneLiner:
      'AI agents across acquisition, leasing, and operations for owners, operators, and managers.',
    overview: [
      'Real estate runs on data — rent rolls, leases, comps, operating budgets — most of which sits in PDFs and spreadsheets. AI now extracts, structures, and acts on that data continuously.',
      'ClearForge builds production AI for real estate owners and operators across acquisitions, leasing, and asset management.',
    ],
    marketContext: [
      { stat: '$330T', label: 'Global real estate market value' },
      { stat: '70%+', label: 'Of CRE data trapped in unstructured documents' },
      { stat: '50-70%', label: 'Of asset manager time on data prep, not analysis' },
      { stat: '20-30%', label: 'Of building energy spend addressable via AI' },
    ],
    valueChain: [
      {
        function: 'Acquisitions',
        icon: 'Search',
        description: 'Process more deals with less manual underwriting drag.',
        activities: [
          {
            name: 'Deal-screening agent',
            aiImpact: 'Agent screens incoming OMs against thesis criteria, drafts initial memo',
            type: 'agent',
            impact: '5-10x deal-throughput',
          },
          {
            name: 'Rent-roll extraction',
            aiImpact: 'Auto-extract rent roll data from PDFs into structured model',
            type: 'automation',
            impact: 'Faster underwriting model prep with reviewable extraction accuracy',
          },
          {
            name: 'Comp-set analysis',
            aiImpact: 'Agent assembles comps and benchmarks for any submarket',
            type: 'agent',
            impact: 'Hours instead of days per IC memo',
          },
          {
            name: 'IC-memo drafting',
            aiImpact: 'Pre-draft IC memos from data room, market data, sponsor history',
            type: 'copilot',
            impact: '60-80% drafting time reduction',
          },
        ],
      },
      {
        function: 'Leasing',
        icon: 'FileText',
        description: 'Shorten cycle times and lift retention.',
        activities: [
          {
            name: 'Lease-abstract automation',
            aiImpact: 'Agent extracts terms from lease docs into standardized format',
            type: 'automation',
            impact: '90%+ abstraction time reduction',
          },
          {
            name: 'Tenant-matching agent',
            aiImpact: 'Match available units to prospects by industry, fit, and financial strength',
            type: 'agent',
            impact: '25-50% leasing-cycle compression',
          },
          {
            name: 'Rent-recommendation model',
            aiImpact: 'Recommend asking rents by unit type and submarket comp',
            type: 'model',
            impact: '2-6% effective rent lift',
          },
          {
            name: 'Renewal-risk model',
            aiImpact: 'Predict tenants likely to vacate; trigger retention plays',
            type: 'model',
            impact: '5-15 pts retention lift',
          },
        ],
      },
      {
        function: 'Asset Management',
        icon: 'BarChart3',
        description: 'Move asset managers from data-prep to portfolio-decision work.',
        activities: [
          {
            name: 'Performance-monitoring agent',
            aiImpact: 'Daily monitoring of NOI, occupancy, capex against plan with anomaly alerts',
            type: 'agent',
            impact: 'Catch issues days, not quarters, sooner',
          },
          {
            name: 'Hold-vs-sell model',
            aiImpact: 'Continuously update hold-vs-sell IRR per asset',
            type: 'model',
            impact: 'Better-timed dispositions',
          },
          {
            name: 'Capital-plan optimization',
            aiImpact: 'Optimize capex spend across portfolio for best ROI',
            type: 'model',
            impact: '10-20% capex prioritization improvement',
          },
          {
            name: 'Investor-reporting agent',
            aiImpact: 'Auto-generate investor reports with commentary and supporting data',
            type: 'agent',
            impact: 'Same-day reporting cycle',
          },
        ],
      },
      {
        function: 'Property Operations',
        icon: 'Building2',
        description: 'Run buildings with less labor and lower opex.',
        activities: [
          {
            name: 'Work-order triage',
            aiImpact: 'Classify maintenance requests, route to vendor or tech, predict cost',
            type: 'agent',
            impact: '30-50% faster response time',
          },
          {
            name: 'Energy optimization',
            aiImpact: 'Model controls HVAC schedules and setpoints by occupancy + weather',
            type: 'model',
            impact: '10-25% energy spend reduction',
          },
          {
            name: 'Tenant-service agent',
            aiImpact: 'Chatbot handles routine tenant questions, requests, and updates',
            type: 'agent',
            impact: '50%+ deflection of inbound calls',
          },
          {
            name: 'Vendor-bid normalization',
            aiImpact: 'Standardize and compare contractor bids automatically',
            type: 'agent',
            impact: '5-15% capex savings on RFP work',
          },
        ],
      },
      {
        function: 'Capital Markets',
        icon: 'TrendingUp',
        description: 'Move debt and equity faster with cleaner data.',
        activities: [
          {
            name: 'Loan-document drafting',
            aiImpact: 'Agent generates first-draft loan applications and supporting packages',
            type: 'agent',
            impact: 'Cycle time compression of weeks',
          },
          {
            name: 'Lender-Q&A agent',
            aiImpact: 'Agent fields lender Q&A from data room with cited evidence',
            type: 'agent',
            impact: '50%+ reduction in management time',
          },
          {
            name: 'Refi-opportunity model',
            aiImpact: 'Model identifies refinancing opportunities by loan + rate environment',
            type: 'model',
            impact: 'Capture more refi value, faster',
          },
          {
            name: 'Capital-call automation',
            aiImpact: 'Automate capital call calculations, distribution waterfalls, and notices',
            type: 'automation',
            impact: 'Eliminate manual errors, faster cycles',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Document-Heavy Workflows',
        description:
          'Leases, OMs, rent rolls, and loan docs sit in PDFs. Extracting and acting on the data is the slowest part of every workflow.',
        metric: '70%+',
        metricLabel: 'Of CRE data is unstructured',
      },
      {
        title: 'Asset-Manager Productivity',
        description: 'Most asset-manager time is consumed by data prep, not portfolio decisions.',
        metric: '50-70%',
        metricLabel: 'Of AM time on data prep',
      },
      {
        title: 'Energy & Opex',
        description:
          'Building operations represent 30-40% of NOI. Manual property management leaves measurable savings on the table.',
        metric: '20-30%',
        metricLabel: 'Of energy spend addressable',
      },
      {
        title: 'Decision Speed',
        description:
          'Acquisitions, leasing, and capital-markets cycles all run on weeks-of-document-review timelines that AI compresses to days.',
        metric: '$330T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for real estate starts with the document-heavy workflow that gates everything else — usually rent-roll abstraction or lease abstraction. Sprint deploys 1-2 agents integrated to property management or investment systems. Scale operates the agents and expands across portfolio.',
  },

  // CONSTRUCTION & ENGINEERING
  {
    slug: 'construction-engineering',
    name: 'Construction & Engineering',
    shortName: 'Construction',
    category: 'Industrials',
    hero: 'Pre-construction, project delivery, and field operations rebuilt with AI agents.',
    oneLiner: 'AI agents from estimating to closeout for owners, contractors, and engineers.',
    overview: [
      'Construction is one of the least digitized industries by labor productivity and one of the most cost-volatile. AI is starting to change project economics — bid-to-award, change-order management, and field productivity are all being rewritten.',
      'ClearForge builds AI for GCs, subs, and design firms that compresses pre-construction, reduces rework, and lifts field productivity.',
    ],
    marketContext: [
      { stat: '$13T', label: 'Global construction market' },
      { stat: '<1%', label: 'Productivity growth in last 20 years' },
      { stat: '$1.6T', label: 'Annual cost of construction rework globally' },
      { stat: '30%+', label: 'Of project cost is non-value-add admin and rework' },
    ],
    valueChain: [
      {
        function: 'Business Development & Estimating',
        icon: 'FileText',
        description: 'Win more bids at higher margin without scaling estimating staff.',
        activities: [
          {
            name: 'Bid-opportunity agent',
            aiImpact: 'Agent scans permits, plan rooms, and RFP feeds for fit-to-thesis projects',
            type: 'agent',
            impact: '3-5x qualified pipeline',
          },
          {
            name: 'Quantity takeoff automation',
            aiImpact: 'Auto-extract quantities from drawings using vision models',
            type: 'automation',
            impact: '60-80% takeoff time reduction',
          },
          {
            name: 'Bid-pricing copilot',
            aiImpact: 'Recommend pricing from historical wins, current cost, and risk',
            type: 'copilot',
            impact: '2-5% margin lift on won bids',
          },
          {
            name: 'Proposal-drafting agent',
            aiImpact: 'Generate proposal narrative, schedule, and team bio from prior work',
            type: 'agent',
            impact: '70% proposal cycle compression',
          },
        ],
      },
      {
        function: 'Pre-Construction & Design',
        icon: 'Compass',
        description: 'Catch issues in design when fixes are cheap, not in the field.',
        activities: [
          {
            name: 'Design-clash detection',
            aiImpact: 'Auto-detect clashes in BIM models and recommend fixes',
            type: 'model',
            impact: '40-60% reduction in field RFIs',
          },
          {
            name: 'Constructability copilot',
            aiImpact: 'Review design for constructability, sequencing, and cost issues',
            type: 'copilot',
            impact: 'Catch issues before procurement',
          },
          {
            name: 'Schedule-build agent',
            aiImpact: 'Generate first-draft project schedule from drawings and historicals',
            type: 'agent',
            impact: 'Days, not weeks, to baseline schedule',
          },
          {
            name: 'Procurement-spec generation',
            aiImpact: 'Generate procurement specs from drawings; match to vendors',
            type: 'agent',
            impact: 'Faster cycle, fewer change orders',
          },
        ],
      },
      {
        function: 'Project Delivery',
        icon: 'Settings',
        description: 'Run projects with proactive risk and predictive performance management.',
        activities: [
          {
            name: 'RFI-triage agent',
            aiImpact:
              'Agent intakes RFIs, classifies, drafts response with cited drawing reference',
            type: 'agent',
            impact: '50-70% RFI cycle compression',
          },
          {
            name: 'Submittal-review automation',
            aiImpact: 'Auto-review submittals against spec, flag deviations for human review',
            type: 'automation',
            impact: '60% review time reduction',
          },
          {
            name: 'Change-order intelligence',
            aiImpact: 'Identify scope drift early; quantify cost and schedule impact',
            type: 'model',
            impact: 'Recover 1-3 pts of project margin',
          },
          {
            name: 'Schedule-risk model',
            aiImpact: 'Predict schedule slippage 30-60 days ahead with mitigation recommendations',
            type: 'model',
            impact: '15-30% reduction in late deliveries',
          },
        ],
      },
      {
        function: 'Field Operations',
        icon: 'HardHat',
        description: 'Lift productivity at the point of work without disrupting the trades.',
        activities: [
          {
            name: 'Daily-log automation',
            aiImpact: 'Agent compiles daily reports from photos, weather, headcount, and progress',
            type: 'agent',
            impact: '90%+ time saved per super',
          },
          {
            name: 'Safety-incident triage',
            aiImpact: 'Auto-classify near-miss and incident reports; recommend corrective action',
            type: 'agent',
            impact: 'Faster response, better OSHA reporting',
          },
          {
            name: 'Punch-list management',
            aiImpact: 'Photo-driven punch list with auto-routing to subs and tracking',
            type: 'agent',
            impact: 'Closeout cycle compression of weeks',
          },
          {
            name: 'Quality inspection assistance',
            aiImpact: 'Vision model flags installation defects from photos',
            type: 'model',
            impact: 'Catch quality issues at source',
          },
        ],
      },
      {
        function: 'Closeout & Operations',
        icon: 'CheckCircle',
        description: 'Close projects faster and hand over a better building.',
        activities: [
          {
            name: 'O&M document compilation',
            aiImpact: 'Auto-compile manuals, warranties, as-builts at closeout',
            type: 'agent',
            impact: 'Closeout in days, not months',
          },
          {
            name: 'Warranty-claim agent',
            aiImpact: 'Agent triages warranty calls, dispatches subs, tracks resolution',
            type: 'agent',
            impact: '50% reduction in warranty cost',
          },
          {
            name: 'Project-financials reconciliation',
            aiImpact: 'Auto-reconcile costs, contracts, billings to close project books',
            type: 'automation',
            impact: 'Same-day close vs. weeks',
          },
          {
            name: 'Lessons-learned synthesis',
            aiImpact: 'Synthesize project insights for future bidding and estimation',
            type: 'agent',
            impact: 'Continuous estimating-accuracy improvement',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Estimating Bandwidth',
        description:
          'Bid volume is constrained by estimator capacity, not opportunity. Most firms bid only what they can manually quantify.',
        metric: '<1%',
        metricLabel: 'Productivity growth in 20 years',
      },
      {
        title: 'Rework & Change Orders',
        description:
          'Rework consumes 5-15% of project cost. Most is design or sequencing failure caught too late.',
        metric: '$1.6T',
        metricLabel: 'Annual rework cost globally',
      },
      {
        title: 'Field-Productivity Variance',
        description:
          'Trade productivity varies 30-50% between crews on the same project. Manual management cannot consistently lift it.',
        metric: '30%+',
        metricLabel: 'Project cost is admin + rework',
      },
      {
        title: 'Document Burden',
        description:
          'RFIs, submittals, change orders, and dailies consume superintendent and PM time that could go to execution.',
        metric: '$13T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for construction starts with estimating, RFI/submittal automation, or daily-log automation — high-frequency workflows where AI ships measurable wins quickly. Sprint deploys 1-2 production agents integrated to estimating + project management systems. Scale operates the agents and expands across project types.',
  },

  // CONSUMER PRODUCTS
  {
    slug: 'consumer-products',
    name: 'Consumer Products & CPG',
    shortName: 'Consumer Products',
    category: 'Consumer & Retail',
    hero: 'Rebuild trade promotion, demand sensing, and shopper marketing with AI that touches the P&L.',
    oneLiner:
      'AI agents across innovation, demand, trade, and shopper for CPG and consumer brands.',
    overview: [
      'CPG companies are squeezed between retailer power, private-label pressure, and direct-to-consumer disruption. The traditional commercial model is breaking. AI rebuilds the demand-sensing, trade-promotion, and shopper-marketing workflows.',
      'ClearForge deploys production AI inside CPG planning, trade, and innovation workflows where margin lives.',
    ],
    marketContext: [
      { stat: '$13T', label: 'Global CPG market' },
      { stat: '$200B+', label: 'Annual trade promotion spend in US alone' },
      { stat: '<30%', label: 'Of trade promotions deliver positive ROI' },
      { stat: '70%', label: 'Of new products fail in first 2 years' },
    ],
    valueChain: [
      {
        function: 'Innovation & Insights',
        icon: 'Lightbulb',
        description: 'Move from instinct-based innovation to evidence-driven launches.',
        activities: [
          {
            name: 'Consumer-insight agent',
            aiImpact: 'Agent synthesizes social, review, and primary research into insight',
            type: 'agent',
            impact: 'Cycle compression weeks to days',
          },
          {
            name: 'Concept-testing automation',
            aiImpact: 'Auto-generate and test concept variations against target audience',
            type: 'agent',
            impact: 'Test 10x more concepts at lower cost',
          },
          {
            name: 'Competitive-monitoring agent',
            aiImpact: 'Continuous watch on competitor launches, claims, pricing',
            type: 'agent',
            impact: 'Days-fresh competitive intelligence',
          },
          {
            name: 'Innovation-portfolio model',
            aiImpact: 'Predict launch success probability and prioritize innovation pipeline',
            type: 'model',
            impact: 'Lift launch hit-rate 15-30%',
          },
        ],
      },
      {
        function: 'Demand Planning',
        icon: 'TrendingUp',
        description:
          'Forecast demand at the SKU/customer/region level with continuously updated signals.',
        activities: [
          {
            name: 'Demand-sensing model',
            aiImpact: 'Daily forecast updates using POS, inventory, promo, and weather data',
            type: 'model',
            impact: '20-40% forecast error reduction',
          },
          {
            name: 'Promo-uplift forecasting',
            aiImpact: 'Predict promo lift, cannibalization, halo by event and SKU',
            type: 'model',
            impact: '5-15% promo ROI lift',
          },
          {
            name: 'New-product forecasting',
            aiImpact: 'Use analog products + channel signals to forecast launches',
            type: 'model',
            impact: 'Reduce launch over/under-forecast 40%',
          },
          {
            name: 'S&OP narrative copilot',
            aiImpact: 'Pre-write S&OP narrative with demand drivers and risks',
            type: 'copilot',
            impact: '50% reduction in planner prep',
          },
        ],
      },
      {
        function: 'Revenue Growth Management',
        icon: 'DollarSign',
        description: 'Close the trade-spend leakage and lift price/mix.',
        activities: [
          {
            name: 'Trade-promo optimization',
            aiImpact: 'Recommend promo plans by retailer/SKU based on past ROI',
            type: 'model',
            impact: '5-15% trade ROI improvement',
          },
          {
            name: 'Pricing & price-pack architecture',
            aiImpact: 'Recommend price changes and pack-size mix by channel',
            type: 'model',
            impact: '1-3% revenue lift, 2-5% margin lift',
          },
          {
            name: 'Mix-management agent',
            aiImpact: 'Identify mix-shift opportunities at the customer level',
            type: 'agent',
            impact: '0.5-1.5 pt margin recapture',
          },
          {
            name: 'Customer-deduction analysis',
            aiImpact: 'Auto-classify and dispute deductions; agent drafts dispute letters',
            type: 'agent',
            impact: '20-40% deduction recovery',
          },
        ],
      },
      {
        function: 'Sales Execution',
        icon: 'ShoppingCart',
        description: 'Drive better in-store and online execution per account.',
        activities: [
          {
            name: 'Field-rep prioritization',
            aiImpact: 'Daily store-call list ranked by opportunity and execution gap',
            type: 'agent',
            impact: 'Lift call effectiveness 20-30%',
          },
          {
            name: 'Image-recognition shelf audit',
            aiImpact: 'Vision model checks planogram compliance and OSA from photos',
            type: 'model',
            impact: '10x audit coverage at lower cost',
          },
          {
            name: 'Joint-business-plan copilot',
            aiImpact: 'Pre-build JBP analytics and recommendations per top customer',
            type: 'copilot',
            impact: '50% reduction in prep time per JBP',
          },
          {
            name: 'E-commerce execution agent',
            aiImpact: 'Monitor digital shelf, content quality, and pricing across retailers',
            type: 'agent',
            impact: 'Catch issues in hours, not weeks',
          },
        ],
      },
      {
        function: 'Marketing & Shopper',
        icon: 'Megaphone',
        description: 'Personalize at scale and prove marketing ROI.',
        activities: [
          {
            name: 'Creative-generation agent',
            aiImpact: 'Generate ad and packaging variants by audience and channel',
            type: 'agent',
            impact: '5-10x creative throughput',
          },
          {
            name: 'Media-mix model',
            aiImpact: 'Optimize media spend across channels with continuous calibration',
            type: 'model',
            impact: '10-25% MROI lift',
          },
          {
            name: 'Shopper-marketing personalization',
            aiImpact: 'Personalize offers and content per shopper at retailer scale',
            type: 'model',
            impact: '15-30% redemption lift',
          },
          {
            name: 'Brand-health monitoring',
            aiImpact: 'Continuous brand health, sentiment, and equity tracking',
            type: 'agent',
            impact: 'Same-day visibility into brand erosion',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Trade-Spend Leakage',
        description:
          'Most CPG promo spend produces negative ROI. Manual planning and post-promo evaluation cannot fix the cycle.',
        metric: '<30%',
        metricLabel: 'Of promotions deliver +ROI',
      },
      {
        title: 'Forecast Volatility',
        description:
          'Forecast accuracy gates inventory, service, and waste. Most CPGs run with 30%+ error at the SKU level.',
        metric: '$200B+',
        metricLabel: 'Annual US trade spend',
      },
      {
        title: 'Innovation Hit-Rate',
        description:
          '70% of new products fail in first 2 years. Concept testing is too slow and shallow to catch winners early.',
        metric: '70%',
        metricLabel: 'Of products fail in 2 years',
      },
      {
        title: 'Retailer Pressure',
        description:
          'Retailer concentration squeezes margin. Without granular RGM, mid-cap CPGs cede pricing to bigger competitors.',
        metric: '$13T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for CPG starts with the workflow most likely to move economics — typically RGM, demand sensing, or trade promotion. Sprint deploys 1-2 production agents integrated to ERP, planning, and trade-management systems. Scale operates the agents and expands across categories and customers.',
  },

  // LIFE SCIENCES & PHARMA
  {
    slug: 'life-sciences',
    name: 'Life Sciences & Pharmaceuticals',
    shortName: 'Life Sciences',
    category: 'Healthcare & Life Sciences',
    hero: 'Compress R&D, regulatory, and commercial cycles with validated AI built for GxP environments.',
    oneLiner: 'AI agents from molecule to market — built for GxP, FDA, and EMA requirements.',
    overview: [
      'Life sciences runs on long cycles, heavy documentation, and regulated decisions. AI compresses cycle time across R&D, manufacturing, and commercial — but only when systems are validated, auditable, and explainable.',
      'ClearForge builds production AI for biotech, pharma, and medical device companies that meets FDA, EMA, and GxP requirements out of the box.',
    ],
    marketContext: [
      { stat: '$1.4T', label: 'Global pharma + biotech market' },
      { stat: '$2.6B', label: 'Average cost to bring a new drug to market' },
      { stat: '90%', label: 'Of clinical trial drugs fail' },
      { stat: '50-70%', label: 'Of medical writer time on automatable drafting' },
    ],
    valueChain: [
      {
        function: 'R&D & Discovery',
        icon: 'Beaker',
        description:
          'Accelerate target identification, lead optimization, and translational research.',
        activities: [
          {
            name: 'Literature-synthesis agent',
            aiImpact: 'Continuous monitoring and synthesis of relevant publications',
            type: 'agent',
            impact: '5-10x faster literature review',
          },
          {
            name: 'Target-identification model',
            aiImpact: 'Identify novel targets from genomic and proteomic data',
            type: 'model',
            impact: 'Lift target-validation hit rate',
          },
          {
            name: 'Trial-design copilot',
            aiImpact: 'Recommend trial design based on indication, endpoint, prior art',
            type: 'copilot',
            impact: 'Reduce design cycle weeks',
          },
          {
            name: 'Patient-recruitment agent',
            aiImpact: 'Match trial criteria to EHR data to find eligible patients',
            type: 'agent',
            impact: '30-50% faster enrollment',
          },
        ],
      },
      {
        function: 'Regulatory & Medical Writing',
        icon: 'FileText',
        description: 'Compress submission cycles without compromising regulatory rigor.',
        activities: [
          {
            name: 'Submission drafting copilot',
            aiImpact: 'Generate first-draft sections of CTD, IND, NDA from clinical data',
            type: 'copilot',
            impact: '40-60% drafting time reduction',
          },
          {
            name: 'Regulatory-intelligence agent',
            aiImpact: 'Continuous scan of FDA/EMA guidance changes by therapeutic area',
            type: 'agent',
            impact: 'Days-fresh regulatory awareness',
          },
          {
            name: 'Adverse-event triage',
            aiImpact: 'Auto-classify pharmacovigilance reports for severity and reportability',
            type: 'agent',
            impact: '60-80% PV review time reduction',
          },
          {
            name: 'Label-comparison agent',
            aiImpact: 'Compare label changes across markets and competitor products',
            type: 'agent',
            impact: 'Hours instead of weeks per comparison',
          },
        ],
      },
      {
        function: 'Manufacturing & Quality',
        icon: 'Settings',
        description: 'Lift batch yields and reduce deviations in GxP manufacturing.',
        activities: [
          {
            name: 'Batch-record review automation',
            aiImpact: 'Auto-review batch records for completeness and deviations',
            type: 'automation',
            impact: '70% review time reduction',
          },
          {
            name: 'Deviation-investigation copilot',
            aiImpact: 'Pre-draft investigations and root cause analysis',
            type: 'copilot',
            impact: 'Investigation cycle compression',
          },
          {
            name: 'Yield-optimization model',
            aiImpact: 'Optimize process parameters for yield and quality',
            type: 'model',
            impact: '2-5% yield improvement',
          },
          {
            name: 'Predictive-maintenance model',
            aiImpact: 'Predict equipment failures in GxP facilities',
            type: 'model',
            impact: 'Reduce unplanned downtime 30-50%',
          },
        ],
      },
      {
        function: 'Commercial & Medical Affairs',
        icon: 'Stethoscope',
        description: 'Engage HCPs and payers with personalized, compliant content.',
        activities: [
          {
            name: 'HCP-engagement agent',
            aiImpact: 'Recommend next-best HCP interaction by territory and prescriber pattern',
            type: 'agent',
            impact: '20-40% rep productivity lift',
          },
          {
            name: 'Medical-information agent',
            aiImpact: 'Field HCP medical-information requests with cited evidence',
            type: 'agent',
            impact: '50%+ deflection of MI calls',
          },
          {
            name: 'Content-personalization model',
            aiImpact: 'Personalize HCP content with MLR-approved variants',
            type: 'model',
            impact: 'Lift email/click engagement',
          },
          {
            name: 'Payer-engagement copilot',
            aiImpact: 'Pre-build value dossiers and payer Q&A responses',
            type: 'copilot',
            impact: 'Faster formulary decisions',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Cycle Time',
        description:
          'Drug development averages 10-15 years. Every cycle compression has compounding economic impact.',
        metric: '$2.6B',
        metricLabel: 'Cost per new drug',
      },
      {
        title: 'Documentation Burden',
        description:
          'Medical writers, regulatory, and pharmacovigilance teams produce massive volumes of regulated text.',
        metric: '50-70%',
        metricLabel: 'Of writer time on automatable drafting',
      },
      {
        title: 'Trial Recruitment',
        description:
          'Enrollment is the slowest part of clinical trials. AI-driven patient matching changes the cycle.',
        metric: '90%',
        metricLabel: 'Of trial drugs fail',
      },
      {
        title: 'Commercial Productivity',
        description:
          'Field-medical and sales teams need personalization at scale within MLR guardrails.',
        metric: '$1.4T',
        metricLabel: 'Global pharma market',
      },
    ],
    forgeApplication:
      'The Forge Method for life sciences requires GxP-grade validation, audit trails, and human-in-the-loop controls. Sprint deploys 1-2 production agents in regulatory writing, manufacturing, or commercial workflows. Scale operates the systems with full validation documentation.',
  },

  // ENERGY & UTILITIES
  {
    slug: 'energy-utilities',
    name: 'Energy & Utilities',
    shortName: 'Energy',
    category: 'Energy & Resources',
    hero: 'Optimize generation, transmission, and customer operations across the energy transition.',
    oneLiner: 'AI for utilities, IPPs, and energy retailers — grid through customer.',
    overview: [
      'Energy and utilities are navigating the largest infrastructure transition in a generation while running 24/7 critical operations. AI is now central to grid optimization, asset reliability, and customer experience.',
      'ClearForge builds production AI for utilities and energy operators that lift reliability, compress cycle times, and improve customer outcomes.',
    ],
    marketContext: [
      { stat: '$10T', label: 'Annual energy transition investment needed' },
      { stat: '20-30%', label: 'Of energy waste in commercial buildings addressable' },
      { stat: '60%+', label: 'Of utility customer-service contacts are routine' },
      { stat: '$150B+', label: 'Annual US grid modernization spend' },
    ],
    valueChain: [
      {
        function: 'Generation & Trading',
        icon: 'Zap',
        description: 'Forecast better, dispatch smarter, trade tighter.',
        activities: [
          {
            name: 'Load + renewable forecasting',
            aiImpact: 'Forecast load and renewable generation by interval and zone',
            type: 'model',
            impact: '20-40% forecast error reduction',
          },
          {
            name: 'Dispatch optimization',
            aiImpact: 'Optimize unit commitment against forecast and constraints',
            type: 'agent',
            impact: '2-5% reduction in production cost',
          },
          {
            name: 'Power-trading copilot',
            aiImpact: 'Recommend trading strategies based on signals + risk limits',
            type: 'copilot',
            impact: 'Lift trading P&L per trader',
          },
          {
            name: 'Asset-performance monitoring',
            aiImpact: 'Predict equipment performance degradation in plants',
            type: 'model',
            impact: 'Reduce unplanned outages 20-40%',
          },
        ],
      },
      {
        function: 'Grid Operations',
        icon: 'Network',
        description: 'Lift reliability and accelerate restoration.',
        activities: [
          {
            name: 'Outage-prediction model',
            aiImpact: 'Predict outage probability by feeder using weather + asset data',
            type: 'model',
            impact: 'Pre-position crews, reduce SAIDI 10-20%',
          },
          {
            name: 'Outage-restoration agent',
            aiImpact: 'Optimize crew routing and dispatch during storm events',
            type: 'agent',
            impact: 'Faster restoration, fewer customer-minutes lost',
          },
          {
            name: 'DER-orchestration model',
            aiImpact: 'Coordinate distributed energy resources across grid',
            type: 'model',
            impact: 'Defer T&D capex',
          },
          {
            name: 'Asset-inspection automation',
            aiImpact: 'Vision models inspect lines, poles, transformers from drone imagery',
            type: 'model',
            impact: '5-10x inspection coverage',
          },
        ],
      },
      {
        function: 'Customer Operations',
        icon: 'Users',
        description: 'Self-service the routine, escalate the complex.',
        activities: [
          {
            name: 'Service-request agent',
            aiImpact: 'Agent handles billing, outage status, service starts/stops',
            type: 'agent',
            impact: '50-70% deflection of inbound contacts',
          },
          {
            name: 'Bill-explanation copilot',
            aiImpact: 'Generate plain-language bill explanations for customer questions',
            type: 'copilot',
            impact: 'CSAT lift, fewer escalations',
          },
          {
            name: 'Energy-efficiency agent',
            aiImpact: 'Recommend efficiency improvements by customer usage profile',
            type: 'agent',
            impact: 'Lift program participation 2-3x',
          },
          {
            name: 'Collections optimization',
            aiImpact: 'Recommend collection strategy by account',
            type: 'model',
            impact: 'Reduce DSO, lift collection rate',
          },
        ],
      },
      {
        function: 'Field & Maintenance',
        icon: 'Wrench',
        description: 'Get the right tech, with the right truck, to the right job.',
        activities: [
          {
            name: 'Work-order triage',
            aiImpact: 'Classify work orders, assign tech skill, predict duration',
            type: 'agent',
            impact: 'First-time-fix lift 15-30%',
          },
          {
            name: 'Mobile-tech copilot',
            aiImpact: 'Field tech assistant with manuals, schematics, and AR overlays',
            type: 'copilot',
            impact: 'Lift productivity per tech',
          },
          {
            name: 'Inventory & truck-stock agent',
            aiImpact: 'Recommend truck-stock loadout by predicted job mix',
            type: 'agent',
            impact: 'Reduce return-trips 20-40%',
          },
          {
            name: 'Vegetation-management model',
            aiImpact: 'Identify vegetation risk areas from imagery',
            type: 'model',
            impact: 'Reduce vegetation-caused outages',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Energy-Transition Complexity',
        description:
          'Utilities are integrating DERs, EVs, and renewables while keeping the grid stable.',
        metric: '$10T',
        metricLabel: 'Energy transition investment',
      },
      {
        title: 'Customer Operations Cost',
        description:
          'Most service contacts are routine billing/outage questions that can be deflected to AI.',
        metric: '60%+',
        metricLabel: 'Of contacts are routine',
      },
      {
        title: 'Grid-Modernization Pace',
        description:
          'Aging infrastructure plus rising demand means smarter, faster decisions on capex.',
        metric: '$150B+',
        metricLabel: 'Annual US grid modernization',
      },
      {
        title: 'Reliability Pressure',
        description:
          'Customers expect always-on service. AI-driven prediction and restoration moves SAIDI/SAIFI numbers.',
        metric: '20-30%',
        metricLabel: 'Of energy waste addressable',
      },
    ],
    forgeApplication:
      'The Forge Method for utilities targets the workflow with the highest reliability + economic impact — usually outage prediction, work-order triage, or customer service. Sprint deploys agents integrated to OMS, CIS, and field-mobile systems. Scale runs continuous improvement with regulated audit trails.',
  },

  // TRAVEL & HOSPITALITY
  {
    slug: 'travel-hospitality',
    name: 'Travel & Hospitality',
    shortName: 'Travel',
    category: 'Travel & Hospitality',
    hero: 'Personalize every guest interaction, optimize revenue, and run leaner operations.',
    oneLiner: 'AI for hotels, airlines, OTAs, and cruise — pre-booking through post-stay.',
    overview: [
      'Travel & hospitality runs on volume, perishable inventory, and guest experience. AI is rewriting revenue management, customer service, and operations across the sector.',
      'ClearForge builds production AI for travel operators that lifts revenue per available unit, compresses operations cost, and personalizes the guest experience.',
    ],
    marketContext: [
      { stat: '$11T', label: 'Global travel & tourism market' },
      { stat: '40-60%', label: 'Of front-desk time on automatable tasks' },
      { stat: '5-15%', label: 'RevPAR/RASM uplift available from AI revenue management' },
      { stat: '$120B', label: 'Annual customer-service cost across travel' },
    ],
    valueChain: [
      {
        function: 'Marketing & Distribution',
        icon: 'Globe',
        description: 'Drive direct demand and lift conversion across channels.',
        activities: [
          {
            name: 'Personalization model',
            aiImpact: 'Recommend properties, rooms, fares by user signal',
            type: 'model',
            impact: '5-15% conversion lift',
          },
          {
            name: 'Search-relevance model',
            aiImpact: 'Hybrid semantic search across inventory',
            type: 'model',
            impact: '20-40% search-led conversion',
          },
          {
            name: 'Loyalty-engagement agent',
            aiImpact: 'Personalize loyalty offers by member tier and behavior',
            type: 'agent',
            impact: 'Lift loyalty enrollment + redemption',
          },
          {
            name: 'Content-generation agent',
            aiImpact: 'Generate property/destination content at scale',
            type: 'agent',
            impact: '10x content velocity',
          },
        ],
      },
      {
        function: 'Revenue Management',
        icon: 'TrendingUp',
        description: 'Price every unit at the right time, on every channel.',
        activities: [
          {
            name: 'Demand-forecasting model',
            aiImpact: 'Forecast occupancy + RevPAR by date/segment',
            type: 'model',
            impact: 'Forecast error -25%, RevPAR +5-10%',
          },
          {
            name: 'Dynamic-pricing agent',
            aiImpact: 'Recommend pricing per channel and length-of-stay',
            type: 'agent',
            impact: '3-8% RevPAR lift',
          },
          {
            name: 'Inventory-allocation model',
            aiImpact: 'Allocate inventory across channels and rate codes',
            type: 'model',
            impact: 'Reduce dilution, lift mix',
          },
          {
            name: 'Group-quoting copilot',
            aiImpact: 'Recommend group pricing based on displaced transient',
            type: 'copilot',
            impact: 'Faster, smarter group pricing',
          },
        ],
      },
      {
        function: 'Guest Experience',
        icon: 'Heart',
        description: 'Personalize every touchpoint and resolve issues before they escalate.',
        activities: [
          {
            name: 'Pre-arrival agent',
            aiImpact: 'Personalized pre-arrival messaging and upsell',
            type: 'agent',
            impact: '20-40% upsell capture',
          },
          {
            name: 'In-stay service agent',
            aiImpact: 'Voice/chat agent handles requests, complaints, FAQs',
            type: 'agent',
            impact: '50%+ deflection of front-desk calls',
          },
          {
            name: 'Sentiment-monitoring model',
            aiImpact: 'Identify at-risk guests in real time from feedback signals',
            type: 'model',
            impact: 'Recover service issues before checkout',
          },
          {
            name: 'Review-response agent',
            aiImpact: 'Draft personalized review responses across platforms',
            type: 'agent',
            impact: '90% reduction in response time',
          },
        ],
      },
      {
        function: 'Operations',
        icon: 'Settings',
        description: 'Run a tighter property with less labor friction.',
        activities: [
          {
            name: 'Housekeeping optimization',
            aiImpact: 'Optimize housekeeping schedules by checkout pattern and length',
            type: 'agent',
            impact: '10-20% labor savings',
          },
          {
            name: 'Predictive-maintenance model',
            aiImpact: 'Predict equipment failures in HVAC, elevators, kitchen',
            type: 'model',
            impact: 'Reduce downtime 30-50%',
          },
          {
            name: 'Energy-management agent',
            aiImpact: 'Optimize HVAC and lighting by occupancy and weather',
            type: 'agent',
            impact: '15-25% energy spend reduction',
          },
          {
            name: 'Inventory & F&B forecasting',
            aiImpact: 'Forecast F&B demand and reduce waste',
            type: 'model',
            impact: '20-30% food waste reduction',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Revenue Management Sophistication',
        description:
          'Most independent and mid-scale operators run revenue management with manual rules, not modern models.',
        metric: '5-15%',
        metricLabel: 'RevPAR uplift available',
      },
      {
        title: 'Guest-Service Cost',
        description:
          'Customer service is one of the largest controllable costs. Most contacts are routine.',
        metric: '$120B',
        metricLabel: 'Annual service cost',
      },
      {
        title: 'Labor Cost',
        description:
          'Wages and turnover squeeze property margins. AI-driven scheduling is meaningful.',
        metric: '40-60%',
        metricLabel: 'Of front-desk time automatable',
      },
      {
        title: 'Loyalty Erosion',
        description:
          'OTAs erode brand-direct demand. Personalization at scale rebuilds direct relationships.',
        metric: '$11T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for travel & hospitality typically starts with revenue management or guest service — both ship measurable RevPAR and labor wins. Sprint deploys 1-2 production agents integrated to PMS, CRS, and CRM. Scale operates the agents and expands across properties.',
  },

  // TELECOMMUNICATIONS
  {
    slug: 'telecommunications',
    name: 'Telecommunications',
    shortName: 'Telecom',
    category: 'Technology & Telecom',
    hero: 'Lift network reliability, compress customer-service cost, and recapture margin from churn.',
    oneLiner: 'AI for carriers across network, customer, and field operations.',
    overview: [
      'Telecommunications is one of the largest controllable-cost industries on earth. AI is now central to network operations, customer experience, and back-office productivity.',
      'ClearForge deploys production AI inside telecom workflows where reliability, churn, and service cost meaningfully shift.',
    ],
    marketContext: [
      { stat: '$1.7T', label: 'Global telecom services market' },
      { stat: '20-30%', label: 'Of network-ops time on automatable triage' },
      { stat: '$70B+', label: 'Annual industry customer-service cost' },
      { stat: '15-25%', label: 'Of customer churn predictable 30-60 days ahead' },
    ],
    valueChain: [
      {
        function: 'Network Operations',
        icon: 'Network',
        description: 'Detect, predict, and resolve network issues before customers feel them.',
        activities: [
          {
            name: 'Anomaly-detection model',
            aiImpact: 'Identify abnormal network behavior in real time',
            type: 'model',
            impact: 'Reduce MTTR 20-40%',
          },
          {
            name: 'Auto-remediation agent',
            aiImpact: 'Run runbooks to remediate known network issues',
            type: 'agent',
            impact: '50%+ tickets auto-resolved',
          },
          {
            name: 'Capacity-planning model',
            aiImpact: 'Forecast capacity needs by site and traffic class',
            type: 'model',
            impact: 'Defer 5-15% of capex',
          },
          {
            name: 'Predictive-failure model',
            aiImpact: 'Predict equipment failures in field nodes',
            type: 'model',
            impact: 'Reduce truck rolls 20-40%',
          },
        ],
      },
      {
        function: 'Customer Operations',
        icon: 'Phone',
        description: 'Deflect routine, accelerate complex, lift CSAT.',
        activities: [
          {
            name: 'Service-request agent',
            aiImpact: 'Agent handles billing, plan changes, troubleshooting',
            type: 'agent',
            impact: '50-70% call-volume deflection',
          },
          {
            name: 'Triage-routing model',
            aiImpact: 'Classify and route inbound to the right specialist',
            type: 'model',
            impact: '15-25% AHT reduction',
          },
          {
            name: 'Churn-prediction model',
            aiImpact: 'Predict customers likely to churn 30-60 days ahead',
            type: 'model',
            impact: '5-15% churn reduction',
          },
          {
            name: 'Retention-offer agent',
            aiImpact: 'Recommend retention offers within margin guardrails',
            type: 'agent',
            impact: 'Save more accounts at lower cost',
          },
        ],
      },
      {
        function: 'Field Operations',
        icon: 'Wrench',
        description: 'Get the right tech to the right place with the right parts.',
        activities: [
          {
            name: 'Truck-roll optimization',
            aiImpact: 'Re-optimize routes against priority, skill, parts',
            type: 'agent',
            impact: '10-20% jobs per tech per day',
          },
          {
            name: 'First-time-fix copilot',
            aiImpact: 'Tech assistant with troubleshooting + parts recommendations',
            type: 'copilot',
            impact: 'FTF lift 15-30%',
          },
          {
            name: 'Install-quality model',
            aiImpact: 'Vision model on installation photos detects defects',
            type: 'model',
            impact: 'Reduce rework + repeat dispatches',
          },
          {
            name: 'Vendor + sub-contractor scoring',
            aiImpact: 'Score vendor quality and route work accordingly',
            type: 'model',
            impact: 'Improve service level',
          },
        ],
      },
      {
        function: 'Sales & Marketing',
        icon: 'Megaphone',
        description: 'Convert more, expand more, lift LTV.',
        activities: [
          {
            name: 'Next-best-offer model',
            aiImpact: 'Recommend the right offer by segment and life-stage',
            type: 'model',
            impact: '8-20% take-rate lift',
          },
          {
            name: 'Cross-sell agent',
            aiImpact: 'Identify mobile-to-broadband, B2B-to-B2C cross-sell opportunities',
            type: 'agent',
            impact: 'Lift ARPU and household penetration',
          },
          {
            name: 'Channel-attribution model',
            aiImpact: 'Quantify channel contribution to acquisition',
            type: 'model',
            impact: 'Reallocate marketing spend for 10-25% MROI lift',
          },
          {
            name: 'Personalized retention offers',
            aiImpact: 'Tailor retention offers per at-risk customer',
            type: 'model',
            impact: 'Reduce save-cost per save',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Network Complexity',
        description:
          'Operators run hundreds of thousands of network elements. Manual ops cannot triage at speed.',
        metric: '20-30%',
        metricLabel: 'Of net-ops time on triage',
      },
      {
        title: 'Service-Cost Intensity',
        description:
          'Customer service is one of the largest spend lines. Routine contacts are addressable.',
        metric: '$70B+',
        metricLabel: 'Industry service cost',
      },
      {
        title: 'Churn Erosion',
        description:
          'Mid-cycle churn destroys LTV. Most churn is predictable — but only with model-based detection.',
        metric: '15-25%',
        metricLabel: 'Of churn predictable ahead',
      },
      {
        title: 'Field-Productivity Variance',
        description:
          'Tech productivity varies widely. AI-supported dispatch + copilot is one of the largest levers.',
        metric: '$1.7T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for telecoms typically starts with customer-service deflection or network anomaly detection — both ship measurable wins quickly. Sprint deploys 1-2 production agents integrated to OSS/BSS. Scale operates the agents and expands across customer + network workflows.',
  },

  // AUTOMOTIVE & MOBILITY
  {
    slug: 'automotive',
    name: 'Automotive & Mobility',
    shortName: 'Automotive',
    category: 'Mobility & Transport',
    hero: 'Compress engineering, manufacturing, and dealer operations with AI built for OEMs and Tier-1s.',
    oneLiner:
      'AI agents across product, manufacturing, supply chain, and aftermarket for OEMs, suppliers, and dealers.',
    overview: [
      'Automotive is one of the most complex value chains on earth — engineering, manufacturing, supply, and channel coordinated globally. AI is now critical to compress development cycles and lift dealer-network productivity.',
      'ClearForge builds production AI for OEMs, Tier-1 suppliers, and dealer groups across the automotive value chain.',
    ],
    marketContext: [
      { stat: '$3T', label: 'Global automotive industry' },
      { stat: '5-7 yrs', label: 'Average vehicle development cycle' },
      { stat: '40%+', label: 'Of dealer F&I time on automatable paperwork' },
      { stat: '$1.1T', label: 'Annual cost of automotive supply-chain disruptions' },
    ],
    valueChain: [
      {
        function: 'Engineering & Product',
        icon: 'Compass',
        description: 'Compress design, simulation, and validation cycles.',
        activities: [
          {
            name: 'Design-search agent',
            aiImpact: 'Search prior CAD assets and patents for reusable IP',
            type: 'agent',
            impact: 'Reduce duplicate engineering effort',
          },
          {
            name: 'Simulation copilot',
            aiImpact: 'Recommend simulation parameters and analyze results',
            type: 'copilot',
            impact: '30-50% simulation cycle reduction',
          },
          {
            name: 'Quality-issue triage',
            aiImpact: 'Classify field-quality issues to root cause and team',
            type: 'agent',
            impact: 'Faster recall response, lower warranty cost',
          },
          {
            name: 'Spec-management automation',
            aiImpact: 'Auto-update spec documents from engineering changes',
            type: 'automation',
            impact: 'Eliminate spec drift errors',
          },
        ],
      },
      {
        function: 'Supply Chain',
        icon: 'Package',
        description: 'Get visibility and resilience across multi-tier supply.',
        activities: [
          {
            name: 'Multi-tier risk monitoring',
            aiImpact: 'Continuous scan of tier-2/3 suppliers for disruption signals',
            type: 'agent',
            impact: 'Early warning 7-30 days ahead',
          },
          {
            name: 'Demand-forecasting model',
            aiImpact: 'Forecast vehicle and parts demand at SKU/region level',
            type: 'model',
            impact: 'Reduce inventory + missed sales',
          },
          {
            name: 'Logistics-optimization agent',
            aiImpact: 'Optimize parts logistics across plants and dealer network',
            type: 'agent',
            impact: '5-10% logistics cost reduction',
          },
          {
            name: 'Order-allocation model',
            aiImpact: 'Allocate scarce inventory across regions/dealers',
            type: 'model',
            impact: 'Maximize revenue per unit',
          },
        ],
      },
      {
        function: 'Manufacturing',
        icon: 'Settings',
        description: 'Lift line throughput, quality, and uptime.',
        activities: [
          {
            name: 'Predictive-maintenance model',
            aiImpact: 'Predict line equipment failures in advance',
            type: 'model',
            impact: 'Reduce downtime 30-50%',
          },
          {
            name: 'Quality-vision inspection',
            aiImpact: 'Computer-vision quality check on body, paint, assembly',
            type: 'model',
            impact: 'Lift defect catch rate',
          },
          {
            name: 'Production-scheduling agent',
            aiImpact: 'Re-sequence builds against orders + parts availability',
            type: 'agent',
            impact: '5-10% throughput lift',
          },
          {
            name: 'Energy-optimization model',
            aiImpact: 'Optimize energy use in stamping, welding, paint',
            type: 'model',
            impact: '5-12% energy cost reduction',
          },
        ],
      },
      {
        function: 'Sales & Aftermarket',
        icon: 'Car',
        description: 'Lift dealer productivity and capture aftermarket revenue.',
        activities: [
          {
            name: 'Lead-scoring model',
            aiImpact: 'Score and route dealer leads by close probability',
            type: 'model',
            impact: 'Lift close rate 20-30%',
          },
          {
            name: 'F&I document automation',
            aiImpact: 'Auto-generate financing, insurance, and warranty docs',
            type: 'agent',
            impact: '40-60% F&I cycle reduction',
          },
          {
            name: 'Service-bay scheduling',
            aiImpact: 'Optimize service bay scheduling and parts ordering',
            type: 'agent',
            impact: 'Throughput +15-25%',
          },
          {
            name: 'Connected-vehicle insights',
            aiImpact: 'Use telematics to predict service needs and proactive offers',
            type: 'agent',
            impact: 'Lift service retention + parts revenue',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Development Cycle',
        description: '5-7 year vehicle cycles cannot keep pace with software-defined competition.',
        metric: '5-7 yrs',
        metricLabel: 'Average dev cycle',
      },
      {
        title: 'Supply-Chain Volatility',
        description: 'Multi-tier supply chains are fragile. Cost of disruption is enormous.',
        metric: '$1.1T',
        metricLabel: 'Annual disruption cost',
      },
      {
        title: 'Dealer-Network Productivity',
        description:
          'Dealer operations consume customer time and OEM margin. F&I, service scheduling are addressable.',
        metric: '40%+',
        metricLabel: 'Of F&I time on paperwork',
      },
      {
        title: 'Quality + Warranty',
        description:
          'Field-quality issues drive warranty cost and brand erosion. Faster triage cuts both.',
        metric: '$3T',
        metricLabel: 'Global market',
      },
    ],
    forgeApplication:
      'The Forge Method for automotive starts with the workflow where value and readiness are clearest — usually quality triage, dealer F&I automation, or supply-chain risk. Sprint deploys 1-2 production agents integrated to PLM, MES, or DMS. Scale operates the agents and expands.',
  },

  // EDUCATION
  {
    slug: 'education',
    name: 'Education',
    shortName: 'Education',
    category: 'Public & Social Sector',
    hero: 'Lift student outcomes and reduce administrative load with AI built for K-12, higher-ed, and ed-tech.',
    oneLiner: 'AI agents for institutions and ed-tech operators — learner through back office.',
    overview: [
      'Education is one of the largest sectors on earth and one of the slowest to digitize. AI is starting to lift personalization, reduce administrative cost, and free educators to focus on learning.',
      'ClearForge builds production AI for K-12, higher-ed, and ed-tech operators across student support, instruction, and operations.',
    ],
    marketContext: [
      { stat: '$8T', label: 'Global education spend' },
      { stat: '40-60%', label: 'Of teacher time on admin, not instruction' },
      { stat: '15-25%', label: 'Of higher-ed students at risk of dropping out' },
      { stat: '$2T+', label: 'Outstanding student-loan debt in US alone' },
    ],
    valueChain: [
      {
        function: 'Student Recruitment & Enrollment',
        icon: 'Users',
        description: 'Convert more applicants and lift yield.',
        activities: [
          {
            name: 'Yield-prediction model',
            aiImpact: 'Predict applicant yield by segment and outreach',
            type: 'model',
            impact: '5-15% yield lift',
          },
          {
            name: 'Personalized-outreach agent',
            aiImpact: 'Personalize email, chat, and content per applicant',
            type: 'agent',
            impact: 'Lift application + conversion rate',
          },
          {
            name: 'Application-review automation',
            aiImpact: 'Auto-screen applications for completeness; flag for review',
            type: 'automation',
            impact: '60-80% review time reduction',
          },
          {
            name: 'Financial-aid agent',
            aiImpact: 'Recommend aid packages and walk applicants through process',
            type: 'agent',
            impact: 'Lift FAFSA completion + enrollment',
          },
        ],
      },
      {
        function: 'Instruction & Learning',
        icon: 'BookOpen',
        description: 'Personalize at scale; free educators for the human work.',
        activities: [
          {
            name: 'Personalized-tutoring agent',
            aiImpact: 'AI tutor for homework, practice, and concept explanation',
            type: 'agent',
            impact: 'Lift student outcomes; equity in access',
          },
          {
            name: 'Lesson-planning copilot',
            aiImpact: 'Generate first-draft lesson plans and assessments',
            type: 'copilot',
            impact: '40-60% planning time reduction',
          },
          {
            name: 'Grading + feedback agent',
            aiImpact: 'Provide first-draft feedback on writing and open-ended assignments',
            type: 'agent',
            impact: 'Lift feedback quality + frequency',
          },
          {
            name: 'Curriculum-personalization model',
            aiImpact: 'Recommend content path by learner mastery + pace',
            type: 'model',
            impact: 'Improve learning outcomes',
          },
        ],
      },
      {
        function: 'Student Success & Retention',
        icon: 'Heart',
        description: 'Identify and intervene with at-risk students earlier.',
        activities: [
          {
            name: 'At-risk early warning',
            aiImpact: 'Predict drop-out risk from academic + engagement signals',
            type: 'model',
            impact: 'Catch students 30-60 days earlier',
          },
          {
            name: 'Advising agent',
            aiImpact: 'Agent handles routine advising questions; routes complex to humans',
            type: 'agent',
            impact: '50%+ advising-load reduction',
          },
          {
            name: 'Career-services personalization',
            aiImpact: 'Match students to career resources, internships, jobs',
            type: 'model',
            impact: 'Lift career-outcomes metrics',
          },
          {
            name: 'Engagement-monitoring agent',
            aiImpact: 'Track engagement signals to identify struggling students',
            type: 'agent',
            impact: 'Lift retention 5-15 pts',
          },
        ],
      },
      {
        function: 'Institutional Operations',
        icon: 'Settings',
        description: 'Run institutions with less admin and better data.',
        activities: [
          {
            name: 'Document automation',
            aiImpact: 'Auto-process applications, transcripts, financial documents',
            type: 'automation',
            impact: '70%+ admin time reduction',
          },
          {
            name: 'Help-desk agent',
            aiImpact: 'Agent handles IT, registrar, financial-aid questions',
            type: 'agent',
            impact: '50%+ deflection of inbound',
          },
          {
            name: 'Schedule + room optimization',
            aiImpact: 'Optimize course scheduling and classroom usage',
            type: 'model',
            impact: 'Lift utilization 10-25%',
          },
          {
            name: 'Compliance + reporting automation',
            aiImpact: 'Auto-generate IPEDS, HEERF, and accreditation reports',
            type: 'automation',
            impact: 'Same-day reporting cycles',
          },
        ],
      },
    ],
    challenges: [
      {
        title: 'Educator Bandwidth',
        description:
          'Teachers spend nearly half their time on administrative work, not instruction.',
        metric: '40-60%',
        metricLabel: 'Of teacher time on admin',
      },
      {
        title: 'Student-Outcome Variance',
        description:
          'Outcome gaps persist across student populations. Personalization at scale is the lever.',
        metric: '15-25%',
        metricLabel: 'Of students at risk of dropping out',
      },
      {
        title: 'Cost Pressure',
        description:
          'Public funding constraints meet rising operating costs. Administrative AI is one of the biggest cost levers.',
        metric: '$2T+',
        metricLabel: 'Outstanding student debt (US)',
      },
      {
        title: 'Workforce Alignment',
        description:
          'Education must align with employer needs faster. AI-driven curriculum + career services is the bridge.',
        metric: '$8T',
        metricLabel: 'Global education spend',
      },
    ],
    forgeApplication:
      'The Forge Method for education starts with the workflow where student outcomes, staff time, or revenue impact can be measured — typically enrollment, advising, or grading. Sprint deploys 1-2 production agents integrated to SIS/LMS. Scale operates the agents and expands across the institution.',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustriesByCategory(): Record<IndustryCategory, Industry[]> {
  return industries.reduce(
    (acc, ind) => {
      if (!acc[ind.category]) acc[ind.category] = [];
      acc[ind.category].push(ind);
      return acc;
    },
    {} as Record<IndustryCategory, Industry[]>,
  );
}

export const industryCategories: IndustryCategory[] = [
  'Industrials',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Technology & Telecom',
  'Consumer & Retail',
  'Real Assets',
  'Mobility & Transport',
  'Travel & Hospitality',
  'Energy & Resources',
  'Public & Social Sector',
];
