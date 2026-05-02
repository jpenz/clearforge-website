/**
 * Cyber Security Technology Company AI Transformation Blueprint
 *
 * Source data:
 *  - Public FY2026 10-K metrics for a $5B+ ARR cybersecurity technology company
 *  - Apollo people-search sample n=1,000, titles classified into functions
 *  - Public enterprise AI strategy role requirements and internal AI platform signals
 *
 * Methodology:
 *  - Triangulated headcount per function from OpEx allocation, title samples, and cybersecurity benchmarks
 *  - AI-automation % per function from the Bain/Dell Automation Ambition methodology
 *  - From-state / to-state inspired by Bain Automation playbook archetypes
 */

export const cybersecurityCompanyFY2026 = {
  totalEmployees: 10698,
  fiscalYearEnded: 'January 31, 2026',
  totalRevenueM: 4812,
  subscriptionRevenueM: 4565,
  servicesRevenueM: 247,
  arrM: 5300,
  netNewArrM: 1010,
  smSpendM: 1831,
  rdSpendM: 1385,
  gaSpendM: 670,
  totalOpexM: 3886,
  freeCashFlowM: 1240,
  cloudModulesAtFYE: 32,
  cloudModulesCurrent: 33,
  internationalRevenuePctOfTotal: 33,
  backlogM: 4200,
};

export const blueprintSummary = {
  totalFTEEquivalentFreed: 4204,
  pctOfTotalWorkforceCapacity: 39.3,
  estimatedAnnualOpExSavingsM: 631, // 4,204 FTEs * $150K loaded cost
  blendedLoadedCostKUSD: 150,
};

export type StrategicPillar = {
  label: string;
  headline: string;
  body: string;
  proof: string;
};

export const strategicProposal: StrategicPillar[] = [
  {
    label: 'Find the growth spots',
    headline:
      'Turn every market, account, product, and customer signal into a ranked opportunity map.',
    body: 'The company already has the ingredients: account activity, product telemetry, threat research, support demand, partner motion, renewal signals, and field intelligence. ClearForge would connect those signals into a single view of where growth is hiding and which teams should act first.',
    proof:
      'Output: a ranked portfolio of expansion plays, retention risks, product gaps, and operational bottlenecks with named owners and value at stake.',
  },
  {
    label: 'Build the machine',
    headline:
      'Design the AI operating system around the actual value chain, not isolated point tools.',
    body: 'The proposal is not another chatbot layer. It is a people-plus-AI machine where agents collect signals, draft the work, route exceptions, measure outcomes, and compound learning across product, GTM, customer, and operating teams.',
    proof:
      'Output: a future-state blueprint for the company, including agent roles, data sources, governance, integrations, and measurable business outcomes.',
  },
  {
    label: 'Prove it in production',
    headline:
      'Pick the first five to eight use cases where speed, margin, quality, and customer experience improve together.',
    body: 'ClearForge would start with practical workflows: account intelligence, RFP response, support deflection, product feedback clustering, threat research drafting, engineering delivery, and executive operating rhythm.',
    proof:
      'Output: production agents shipped in 90 days with before/after baselines on cycle time, cost, win rate, support quality, and employee capacity freed.',
  },
  {
    label: 'Scale the capability',
    headline: 'Stand up the operating cadence so this becomes a permanent company advantage.',
    body: 'The goal is not a pile of pilots. The goal is an evergreen AI transformation system: every function has an opportunity backlog, every agent has a metric owner, and the leadership team can see adoption, ROI, risk, and next-wave value in one place.',
    proof:
      'Output: AI Center of Excellence governance, monthly value reviews, reusable build patterns, and a living enterprise opportunity pipeline.',
  },
];

export type ValueChainStage = {
  stage: string;
  owner: string;
  today: string;
  futureState: string;
  useCases: string[];
  metric: string;
};

export const valueChainFutureState: ValueChainStage[] = [
  {
    stage: 'Market signal + ICP',
    owner: 'Strategy, RevOps, Marketing',
    today:
      'Market movement, competitive shifts, trigger events, and customer pain signals live across analyst notes, call transcripts, CRM fields, web intent, and field anecdotes.',
    futureState:
      'An AI market radar scores segments, accounts, and buying centers daily, then recommends the highest-probability expansion plays and new-logo motions.',
    useCases: ['Growth-spot radar', 'ICP refresh engine', 'Competitive movement monitor'],
    metric: 'Pipeline created from priority segments, win-rate lift, research hours eliminated',
  },
  {
    stage: 'Product strategy + roadmap',
    owner: 'Product, UX, Product Marketing',
    today:
      'Roadmap inputs arrive from sales calls, support tickets, threat research, customer advisory boards, and competitor launches, but synthesis is slow and episodic.',
    futureState:
      'A product intelligence layer clusters customer feedback, maps it to modules and ARR impact, drafts PRDs, and tracks competitor gaps continuously.',
    useCases: ['Feedback clustering', 'PRD drafting', 'Module whitespace map'],
    metric: 'Faster roadmap decisions, better expansion attach, fewer low-signal builds',
  },
  {
    stage: 'Threat research + intelligence',
    owner: 'Threat Research, Intelligence, Managed Services',
    today:
      'Analysts spend high-value time enriching IOCs, clustering activity, drafting reports, and converting raw telemetry into customer-ready insight.',
    futureState:
      'Research agents enrich indicators, cluster attacker behavior, draft first-pass reports, and push relevant insights into product, marketing, support, and customer success.',
    useCases: ['IOC enrichment', 'Adversary report drafting', 'Customer-specific risk briefs'],
    metric: 'Analyst capacity freed, report cycle time, customer-facing intelligence velocity',
  },
  {
    stage: 'Engineering delivery + quality',
    owner: 'Engineering, SRE, Platform',
    today:
      'Engineering time is consumed by boilerplate, tests, docs, PR review, incident log analysis, and knowledge transfer across module teams.',
    futureState:
      'Engineering agents generate tests and docs, inspect PRs against team patterns, summarize incidents, and surface root-cause hypotheses before handoff.',
    useCases: ['Test generation', 'PR quality copilot', 'Incident root-cause assistant'],
    metric: 'Cycle time, escaped defects, incident MTTR, engineer focus time',
  },
  {
    stage: 'GTM execution + sales',
    owner: 'Sales, Sales Engineering, Alliances',
    today:
      'AEs, SDRs, SEs, and alliance teams rebuild account research, RFP responses, mutual action plans, and stakeholder maps one deal at a time.',
    futureState:
      'A revenue agent generates account briefs, entry plays, module fit, RFP drafts, stakeholder maps, MEDDICC risk, and next-best actions from CRM and product signals.',
    useCases: ['Account intelligence', 'RFP response agent', 'Pipeline risk forecast'],
    metric: 'Seller capacity, proposal cycle time, deal velocity, forecast accuracy',
  },
  {
    stage: 'Onboarding + professional services',
    owner: 'Customer Success, Professional Services, Implementation',
    today:
      'Implementation teams translate customer context into runbooks, integration plans, status reports, and enablement materials with heavy manual effort.',
    futureState:
      'Deployment agents assemble customer-specific runbooks, generate weekly status narratives, answer configuration questions, and surface risks before go-live.',
    useCases: ['Deployment runbook agent', 'Customer config Q&A', 'Go-live risk monitor'],
    metric: 'Time to value, implementation margin, escalation rate, customer confidence',
  },
  {
    stage: 'Support + success + retention',
    owner: 'Support, Success, Renewals',
    today:
      'Known-answer tickets, case summarization, escalation routing, renewal prep, and health-risk diagnosis take capacity away from higher-value customer work.',
    futureState:
      'Support and success agents deflect common issues, draft responses, summarize cases, create renewal briefs, and detect adoption risks from product telemetry.',
    useCases: ['Tier 1 deflection', 'Renewal brief agent', 'Customer health risk detector'],
    metric: 'CSAT, handle time, renewal readiness, churn risk detected earlier',
  },
  {
    stage: 'Enterprise operations + governance',
    owner: 'Finance, Legal, HR, IT, Executive Team',
    today:
      'The operating system is split across QBR decks, spreadsheets, ticket queues, policy reviews, and ad hoc executive requests.',
    futureState:
      'An AI operating control tower tracks initiative health, ROI, staffing, risk, compliance, and executive decisions across the transformation portfolio.',
    useCases: ['Executive brief agent', 'Close and variance agent', 'AI governance tracker'],
    metric: 'Management cycle time, OpEx leverage, risk visibility, decision quality',
  },
];

export type FutureStateUseCase = {
  name: string;
  strategicRole: string;
  agentSystem: string;
  firstDataSources: string[];
  businessOutcomes: string[];
};

export const futureStateUseCases: FutureStateUseCase[] = [
  {
    name: 'Growth-Spot Radar',
    strategicRole: 'Find the highest-probability pockets of expansion before the market sees them.',
    agentSystem:
      'Continuously reads CRM activity, support themes, threat research, web intent, installed-base modules, and competitor movement to recommend the next segment, account, and product play.',
    firstDataSources: [
      'Salesforce',
      'Gong or call transcripts',
      'product telemetry',
      'support tickets',
    ],
    businessOutcomes: [
      'More qualified pipeline',
      'faster account planning',
      'clearer segment bets',
    ],
  },
  {
    name: 'Revenue Execution Agent',
    strategicRole:
      'Give every AE, SE, and alliance lead the research capacity of a dedicated strategy team.',
    agentSystem:
      'Builds account briefs, stakeholder maps, module-fit narratives, RFP drafts, mutual action plans, pricing context, and deal-risk alerts.',
    firstDataSources: ['CRM', 'knowledge base', 'pricing rules', 'security platform documentation'],
    businessOutcomes: [
      'Shorter sales cycles',
      'better forecast accuracy',
      'higher seller throughput',
    ],
  },
  {
    name: 'Threat-to-Customer Intelligence Engine',
    strategicRole:
      'Convert deep research into customer value, product insight, and field-ready narratives faster.',
    agentSystem:
      'Enriches IOCs, clusters adversary behavior, drafts reports, generates customer-specific risk briefs, and routes relevant intelligence to product and GTM teams.',
    firstDataSources: [
      'threat telemetry',
      'research notes',
      'customer environments',
      'public threat feeds',
    ],
    businessOutcomes: [
      'faster intelligence publishing',
      'stronger customer trust',
      'more differentiated product stories',
    ],
  },
  {
    name: 'AI Delivery Factory',
    strategicRole: 'Increase engineering throughput without trading off quality or reliability.',
    agentSystem:
      'Generates tests, docs, migration notes, and PR reviews; summarizes incidents; proposes root-cause hypotheses; and turns tribal knowledge into reusable engineering patterns.',
    firstDataSources: ['GitHub', 'Jira', 'incident logs', 'OpenAPI specs'],
    businessOutcomes: ['shorter delivery cycles', 'lower MTTR', 'better platform quality'],
  },
  {
    name: 'Customer Time-to-Value Machine',
    strategicRole:
      'Make onboarding, implementation, and support feel faster, more precise, and more proactive.',
    agentSystem:
      'Creates deployment runbooks, answers configuration questions, drafts status reports, deflects known-answer support, and builds renewal briefs from product usage.',
    firstDataSources: ['support KB', 'implementation plans', 'Jira', 'product telemetry'],
    businessOutcomes: ['faster onboarding', 'higher CSAT', 'better retention economics'],
  },
  {
    name: 'Enterprise AI Control Tower',
    strategicRole:
      'Give the executive team one trusted view of where AI is creating value and where execution is blocked.',
    agentSystem:
      'Tracks opportunity pipeline, adoption, risk, spend, ROI, policy approvals, owner accountability, and next-wave use cases across every function.',
    firstDataSources: ['Workday', 'Anaplan', 'Salesforce', 'Jira', 'ServiceNow'],
    businessOutcomes: ['visible ROI', 'faster decisions', 'repeatable governance'],
  },
];

export const proposalRoadmap = [
  {
    window: 'Days 1 to 30',
    name: 'Strategy diagnostic',
    promise:
      'Convert public and internal operating data into a prioritized opportunity map across the full company value chain.',
    deliverables: [
      'Value-chain map with current-state friction',
      'Ranked use-case portfolio with value, effort, and risk scoring',
      'Executive business case for the first 90 days',
    ],
  },
  {
    window: 'Days 31 to 90',
    name: 'Production proof',
    promise:
      'Ship the first five to eight agents where speed, quality, customer experience, and margin move together.',
    deliverables: [
      'Production agent backlog and sprint cadence',
      'Before/after baselines for cycle time, cost, quality, and adoption',
      'Reusable agent patterns for security, evaluation, and change management',
    ],
  },
  {
    window: 'Months 4 to 12',
    name: 'Scale the operating system',
    promise:
      'Turn early wins into a permanent AI transformation capability owned by the business, measured by value, and governed with discipline.',
    deliverables: [
      'AI Center of Excellence operating model',
      'Executive control tower for ROI, risk, adoption, and next-wave value',
      'Function-by-function roadmap through the next fiscal planning cycle',
    ],
  },
];

export type FromToState = {
  fromState: string;
  toState: string;
  agentArchetype: string;
  exampleOutput: string;
};

export type FunctionAnalysis = {
  function: string;
  estimatedHeadcount: number;
  shareOfTotalHCPct: number;
  derivationNote: string;
  aiAutomationPct: number;
  fteEquivalentFreed: number;
  annualHoursFreed: number;
  highValueAreas: string;
  sampleApolloTitles: string[];
  sampleNamedEmployees: { name: string; title: string }[];
  fromTo: FromToState;
};

// Per-function analysis, sorted by FTE-equivalent capacity freed
export const functionAnalysis: FunctionAnalysis[] = [
  {
    function: 'Sales',
    estimatedHeadcount: 2781,
    shareOfTotalHCPct: 26.0,
    derivationNote: '$1.83B S&M, sales-led GTM, Apollo n=1,000 sample 42% sales-titled',
    aiAutomationPct: 45.0,
    fteEquivalentFreed: 1251,
    annualHoursFreed: 2602080,
    highValueAreas:
      'Account research and prioritization, prospecting, RFP responses, deal QBRs, forecasting, pipeline triage, account plans',
    sampleApolloTitles: [
      'Regional Sales Manager',
      'Corporate Account Executive',
      'Regional Alliance Manager',
      'OEM Alliances Manager',
      'Senior Sales Engineer',
      'SDR Manager',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'AE manually researches each net-new account before outreach. SDR builds account plan from scratch. RFPs take 3 to 5 days each. Forecasting calls drain 4 hours weekly per RSM.',
      toState:
        'Account agents auto-generate an account brief, top 3 entry plays, named-account contact map, and 80 percent draft RFP within 30 minutes of request. Forecast agents assemble weighted pipeline views daily and flag slip risks before the call.',
      agentArchetype: 'Account Intelligence + RFP + Forecast Agent',
      exampleOutput:
        'For a Fortune 100 healthcare prospect: company brief, 3 entry plays grounded in module fit, 12 named contacts mapped to ICP, draft RFP with module-level pricing — produced in 28 minutes vs 2.5 days.',
    },
  },
  {
    function: 'R&D / Engineering',
    estimatedHeadcount: 3209,
    shareOfTotalHCPct: 30.0,
    derivationNote: '$1.38B R&D ÷ ~$430K loaded cost per engineer FTE',
    aiAutomationPct: 28.0,
    fteEquivalentFreed: 899,
    annualHoursFreed: 1869320,
    highValueAreas:
      'Code generation, test generation, log analysis, doc generation, code review automation, AI pair programming',
    sampleApolloTitles: [
      'Senior Engineer - Cloud',
      'Full Stack Engineer',
      'Software Engineer',
      'Engineering Manager',
      'Principal Engineer',
      'Site Reliability Engineer',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Engineers spend 30 to 40 percent of week on boilerplate, tests, docs, and PR review. Production incidents take 90 minutes average to root-cause from logs.',
      toState:
        'AI pair-programming agent embedded in IDE generates first-draft code, tests, and docs. Log-analysis agent pulls top 3 hypotheses for any incident in under 5 minutes. PR review agent enforces team patterns before human review.',
      agentArchetype: 'Coding Copilot + Log Forensics + PR Review Agent',
      exampleOutput:
        'For a new cloud module: 60 percent of unit tests auto-generated, API docs drafted from OpenAPI spec, 2 of 3 incident root-causes surfaced before on-call paged.',
    },
  },
  {
    function: 'Threat Intel & Research',
    estimatedHeadcount: 856,
    shareOfTotalHCPct: 8.0,
    derivationNote:
      'managed threat hunting, adversary research operations, and agentic security training requirements',
    aiAutomationPct: 50.0,
    fteEquivalentFreed: 428,
    annualHoursFreed: 890240,
    highValueAreas:
      'Threat triage, malware family clustering, IOC enrichment, report drafting, telemetry summarization, analyst copilots',
    sampleApolloTitles: [
      'Senior Threat Researcher',
      'adversary research Specialist for Intel and Hunting',
      'Information Security | Threat Intelligence',
      'Senior Malware Analyst',
      'Incident Response Consultant',
      'Threat Hunter',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Analyst manually triages alerts in the security console. Malware sample analysis takes hours per family. Adversary reports are drafted from scratch over multi-day cycles.',
      toState:
        'Internal research agents orchestrate triage, cluster malware variants by behavior, enrich IOCs across telemetry, and draft adversary reports in minutes — analysts become editors and decision-makers, not manual producers.',
      agentArchetype: 'Threat Triage + Malware Clustering + Report Drafting Agent',
      exampleOutput:
        'For a new ransomware variant: behavioral cluster auto-identified, IOC list enriched across customer telemetry, draft attribution + TTP report ready for analyst review in 12 minutes.',
    },
  },
  {
    function: 'Customer Support',
    estimatedHeadcount: 642,
    shareOfTotalHCPct: 6.0,
    derivationNote: '~28K customers, multi-tier global support, $1.0B subscription cost-of-revenue',
    aiAutomationPct: 55.0,
    fteEquivalentFreed: 353,
    annualHoursFreed: 734240,
    highValueAreas:
      'Tier 1 ticket deflection, knowledge base draft, response generation, case summarization, escalation routing',
    sampleApolloTitles: [
      'Technical Support Engineer',
      'Senior Technical Support Engineer',
      'Customer Support Specialist',
      'Support Manager',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Tier 1 handles 70 percent of L1 tickets that have known answers in KB. Average ticket time 22 minutes. Escalations take human triage. Case summary written manually at close.',
      toState:
        'Customer-facing chat agent grounded on product docs deflects 50 percent of L1 before ticket creation. Internal copilot drafts response to remaining tickets, summarizes cases, and routes escalations automatically.',
      agentArchetype: 'Tier 1 Deflection + Response Drafting + Case Summarization Agent',
      exampleOutput:
        'Self-service ratio rises from 18 percent to 40 percent. Avg handle time drops 22 to 12 min. Engineers focus on novel issues that require judgment.',
    },
  },
  {
    function: 'Marketing',
    estimatedHeadcount: 428,
    shareOfTotalHCPct: 4.0,
    derivationNote: 'Demand gen, field, brand, comms, content, ABM, partner marketing',
    aiAutomationPct: 50.0,
    fteEquivalentFreed: 214,
    annualHoursFreed: 445120,
    highValueAreas:
      'Content production, campaign optimization, persona research, copy generation, social automation, A/B test design',
    sampleApolloTitles: [
      'Marketing Campaign Specialist',
      'Sr. Regional Marketing Manager',
      'Regional Marketing Manager Benelux',
      'Marketing Director',
      'Senior Manager, Demand Generation',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Content writer drafts blog posts in 6 to 8 hours each. Field marketer assembles event playbook for each regional event from scratch. Campaign optimization happens in monthly retros, not real time.',
      toState:
        'Content agent drafts technical blog from product specs and threat reports in under 1 hour, ready for editorial review. Event playbook agent generates region-specific run-of-show. Campaign agent reallocates spend daily based on conversion deltas.',
      agentArchetype: 'Content Drafting + Event Playbook + Spend Reallocation Agent',
      exampleOutput:
        'For a major industry conference: regional event playbook, social calendar, and 12 customer-meeting briefings generated from a single intake brief in 4 hours vs 3 days.',
    },
  },
  {
    function: 'Operations & Strategy',
    estimatedHeadcount: 535,
    shareOfTotalHCPct: 5.0,
    derivationNote: 'RevOps, BizOps, Strategy, PMO, Chief of Staff, Program Management',
    aiAutomationPct: 40.0,
    fteEquivalentFreed: 214,
    annualHoursFreed: 445120,
    highValueAreas:
      'Board deck generation, OKR tracking, executive briefs, PMO automation, scenario modeling',
    sampleApolloTitles: [
      'Head of Continuous Identity Product Strategy',
      'VP, Services Operations & Success',
      'Associate Manager, Talent Operations',
      'Chief of Staff',
      'Senior Program Manager',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'BizOps assembles QBR deck over 5 to 7 days each quarter. OKR tracking happens in spreadsheets that go stale. PMO updates collected manually across 40+ initiative leads.',
      toState:
        'Board-deck agent stitches quarterly narrative from systems-of-record (Salesforce, Workday, Anaplan, Jira) with named call-outs. OKR agent flags slip and re-baselines weekly. Initiative agent emails owners for updates and consolidates into PMO view automatically.',
      agentArchetype: 'Executive Brief + OKR Tracker + PMO Consolidation Agent',
      exampleOutput:
        'QBR prep: 5 days down to 4 hours of editorial review. OKR confidence cycle: monthly to weekly. PMO health: known on Monday, not month-end.',
    },
  },
  {
    function: 'Professional Services',
    estimatedHeadcount: 535,
    shareOfTotalHCPct: 5.0,
    derivationNote:
      '$247M services revenue + $203M services cost-of-revenue, IR + deployment + advisory',
    aiAutomationPct: 35.0,
    fteEquivalentFreed: 187,
    annualHoursFreed: 388960,
    highValueAreas:
      'Implementation playbook generation, customer config Q&A, deployment doc drafting, status report automation',
    sampleApolloTitles: [
      'Senior Consultant',
      'Senior Consultant - Cloud Security',
      'Sr. Cybersecurity Consultant',
      'Incident Response Consultant',
      'Implementation Manager',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Implementation engineer authors customer-specific runbook from template each engagement. Status report drafted weekly. Customer config questions answered ad-hoc.',
      toState:
        'Implementation agent assembles customer-specific runbook in 1 hour from intake (industry, modules, integrations). Status report agent drafts weekly update from Jira and Slack. Config-Q&A agent grounded on customer environment answers in real time.',
      agentArchetype: 'Implementation Runbook + Status Report + Config Q&A Agent',
      exampleOutput:
        'New identity-protection module deployment: runbook delivered Day 1 vs Week 2 historically. Customer config questions answered 80 percent without engineer escalation.',
    },
  },
  {
    function: 'Product',
    estimatedHeadcount: 428,
    shareOfTotalHCPct: 4.0,
    derivationNote: 'PM, UX, Product Marketing, Product Analyst across 33 cloud modules',
    aiAutomationPct: 35.0,
    fteEquivalentFreed: 150,
    annualHoursFreed: 312000,
    highValueAreas:
      'User research synthesis, PRD drafting, customer feedback clustering, competitive analysis, design system maintenance',
    sampleApolloTitles: [
      'Principal Product Manager',
      'Product Manager',
      'Senior Product Manager',
      'Product Marketing Manager',
      'Product Designer',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'PM clusters 200+ user interviews manually. PRDs drafted from scratch. Competitive analysis quarterly, not continuous.',
      toState:
        'Research synthesis agent clusters user interviews and CSAT comments into themes weekly. PRD agent drafts from epic + research. Competitive intel agent monitors top-tier security competitors daily and flags shifts.',
      agentArchetype: 'Research Synthesis + PRD + Competitive Intel Agent',
      exampleOutput:
        'For an identity protection module roadmap: 240 user comments clustered into 9 themes, draft PRD for top 3, competitor feature matrix updated daily — PM time on synthesis drops 60 percent.',
    },
  },
  {
    function: 'Finance',
    estimatedHeadcount: 321,
    shareOfTotalHCPct: 3.0,
    derivationNote:
      '$670M G&A, public company finance scale (FP&A, controllership, treasury, billing)',
    aiAutomationPct: 45.0,
    fteEquivalentFreed: 144,
    annualHoursFreed: 299520,
    highValueAreas:
      'Financial close acceleration, variance analysis, accruals, intercompany reconciliation, FP&A scenario modeling',
    sampleApolloTitles: [
      'SME, Global Sales Order Billing Operations',
      'Finance Transformation PMO',
      'Manager, Corporate Sales Finance East',
      'Senior FP&A Analyst',
      'Revenue Accounting Manager',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Monthly close 8 to 10 days. Variance commentary written manually. FP&A scenario modeling sequential — one variable at a time.',
      toState:
        'Close agent automates accruals, intercompany matching, and reconciliation. Variance agent drafts narrative for review. Scenario agent runs 20+ permutations in parallel for FP&A.',
      agentArchetype: 'Close Acceleration + Variance Drafting + Scenario Agent',
      exampleOutput:
        'Close compresses from 9 days to 4 days. CFO scenario meetings show full sensitivity grid, not three pre-baked cases.',
    },
  },
  {
    function: 'HR / Talent',
    estimatedHeadcount: 321,
    shareOfTotalHCPct: 3.0,
    derivationNote: 'Recruiting, L&D, comp, benefits, HRBP, talent ops',
    aiAutomationPct: 40.0,
    fteEquivalentFreed: 128,
    annualHoursFreed: 266240,
    highValueAreas:
      'Resume screening, interview scheduling, onboarding, JD generation, comp benchmarking, employee Q&A',
    sampleApolloTitles: [
      'Senior Talent Acquisition Partner',
      'Senior Technical Recruiter',
      'Talent Acquisition',
      'HRBP',
      'Senior Recruiter',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Recruiter screens 200 resumes manually for each Senior Engineer req. JDs written from scratch. Comp benchmarking is project-based, not continuous.',
      toState:
        'Screening agent ranks candidates against ICP rubric with rationale. JD agent drafts from job family + level. Comp agent monitors market comp daily and flags drift.',
      agentArchetype: 'Candidate Screening + JD Drafting + Comp Benchmarking Agent',
      exampleOutput:
        'Senior Cloud Engineer req: 200 resumes ranked with rationale in 8 min. JD draft in 5 min. Recruiter time-on-screen drops 65 percent.',
    },
  },
  {
    function: 'IT',
    estimatedHeadcount: 214,
    shareOfTotalHCPct: 2.0,
    derivationNote: 'Internal IT, IT security, helpdesk, asset management for 10K+ employees',
    aiAutomationPct: 55.0,
    fteEquivalentFreed: 118,
    annualHoursFreed: 245440,
    highValueAreas:
      'Helpdesk Tier 1, software provisioning, password reset, asset management, security monitoring',
    sampleApolloTitles: [
      'Manager, IT Services',
      'Information Technology System Administrator',
      'Senior Systems Engineer',
      'Service Desk Lead',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Helpdesk handles 500+ tickets weekly, 60 percent password / SSO / access. Software provisioning is multi-step manual workflow.',
      toState:
        'IT agent (employee chat) handles password, SSO, and access automatically with policy guardrails. Provisioning agent triggers on hire and orchestrates Okta, JIRA, Slack, GitHub access in 3 minutes.',
      agentArchetype: 'IT Helpdesk + Provisioning Agent',
      exampleOutput:
        'Self-service ticket deflection 25 percent to 65 percent. New-hire ready-to-work time: 3 days to 30 minutes.',
    },
  },
  {
    function: 'Legal & Compliance',
    estimatedHeadcount: 214,
    shareOfTotalHCPct: 2.0,
    derivationNote:
      'Public company legal, GDPR, federal compliance frameworks, contracts, regulatory monitoring',
    aiAutomationPct: 35.0,
    fteEquivalentFreed: 75,
    annualHoursFreed: 156000,
    highValueAreas:
      'Contract review, NDA generation, privacy review, regulatory monitoring, audit prep',
    sampleApolloTitles: [
      'Counsel Member',
      'Legal Operations Specialist',
      'Senior Compliance Analyst',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Counsel manually reviews 200+ contracts monthly. NDAs drafted from templates. Reg-monitoring is quarterly review.',
      toState:
        'Contract review agent flags non-standard clauses with risk scoring and suggested redlines. NDA agent assembles in 5 min. Reg-monitoring agent watches federal compliance frameworks and global privacy regulations daily and flags impacts.',
      agentArchetype: 'Contract Review + NDA + Reg-Monitor Agent',
      exampleOutput:
        'Counsel time-on-review drops 50 percent. NDA cycle: 2 days to 30 minutes. Reg-watch is daily not quarterly.',
    },
  },
  {
    function: 'Executive',
    estimatedHeadcount: 214,
    shareOfTotalHCPct: 2.0,
    derivationNote: 'Senior leadership across functions, EVP, SVP, VP-level',
    aiAutomationPct: 20.0,
    fteEquivalentFreed: 43,
    annualHoursFreed: 89440,
    highValueAreas:
      'Briefing prep, calendar management, decision research, internal comms drafting',
    sampleApolloTitles: [
      'Regional Director Saudi & Middle East',
      'Director, Specialist Sales',
      'Marketing Director',
      'VP, Engineering',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'EA prepares meeting briefs the night before. Internal memos drafted personally over evenings. Decision research done by chief of staff multi-day.',
      toState:
        'Executive agent briefs each meeting with relevant context, decision frame, and follow-up actions. Memo agent drafts internal comms from a 3-bullet outline. Research agent answers decision questions in minutes with citations.',
      agentArchetype: 'Executive Briefing + Memo + Decision Research Agent',
      exampleOutput:
        'CRO walks into every meeting with a 3-page brief generated in 60 seconds. Time saved: 4 to 6 hours per week per VP+.',
    },
  },
];

export const transformationMethod = [
  {
    phase: 1,
    name: 'Identify',
    weeks: '1 to 4',
    description:
      'Map every function and value-chain activity at a $5B+ ARR Cyber Security Technology Company against the agent archetype taxonomy. Score by AI fit and dollar value.',
    deliverable:
      'Enterprise opportunity map: every function, every activity, scored on AI agent suitability + dollar opportunity. Ranked pipeline ready for sequencing.',
    companySpecific:
      'Already drafted in this blueprint. Refined in week 1 with internal data such as Workday headcount, Salesforce activity logs, Jira ticket volumes, support queues, and product telemetry.',
  },
  {
    phase: 2,
    name: 'Size',
    weeks: '2 to 6',
    description:
      'For each opportunity, build the from-state baseline (current cycle time, $ cost, error rates) and the to-state target (post-agent metrics).',
    deliverable:
      'Per-opportunity business case with baseline metrics, target metrics, FTE-equivalent capacity freed, and dollar savings.',
    companySpecific:
      'Anchor on the module portfolio, GTM segments, customer journey, and the 13 enterprise functions. Each opportunity ties to a named OKR owner.',
  },
  {
    phase: 3,
    name: 'Sequence',
    weeks: '4 to 8',
    description:
      'Order opportunities by value, speed-to-deploy, and risk. Build a 90-day sprint backlog and a 12-month roadmap. Lock executive sponsors.',
    deliverable:
      '90-day sprint backlog (5 to 8 priority opportunities), 12-month roadmap, named sponsors, governance cadence, success metrics.',
    companySpecific:
      'Aligned to the AI Center of Excellence operating model. The AI Steering Committee gets a single roadmap with weekly tracking.',
  },
  {
    phase: 4,
    name: 'Sprint',
    weeks: '8 onward',
    description:
      'Deploy agents into production through 2-week sprint cycles. Measure outcomes in business metrics, not pilots. Capture and recycle learnings into the evergreen pipeline.',
    deliverable:
      'Production agents shipped, metrics captured, evergreen opportunity pipeline standing up the next wave automatically.',
    companySpecific:
      'Internal-facing agents can start on governed enterprise tooling, while customer-facing agents follow the same playbook with stricter evaluation, security, and support-readiness gates.',
  },
];

export const whyJames = {
  appreciation:
    'This company has done something rare: built a category, scaled beyond $5B ARR, and created an enterprise data fabric that few security companies can match. That operating scale is exactly why the next advantage will come from applying AI to the company itself, not only to customer-facing products.',
  shareholderSince: 2020,
  experienceMatches: [
    {
      jdRequirement: 'Architect and direct AI Center of Excellence',
      proof:
        "First hire and founding team member of Bain's Automation Center of Excellence. Built the practice, the methodology, and the operating model from zero.",
    },
    {
      jdRequirement: 'Define the Enterprise AI Roadmap',
      proof:
        "Led Dell Automation Ambition: identified $150 to $200M in G&A opportunities across 5 priority workstreams, built the evergreen opportunity pipeline that became Dell's permanent capability.",
    },
    {
      jdRequirement: 'Deploy autonomous workflows and agentic systems',
      proof:
        'ClearForge.AI ships production multi-agent systems. AgentForge: 44 tools, 6 agent teams, 9-tier model router across Claude, GPT-4, Gemini, Groq, MiniMax. Real production workloads, real customers, real ROI.',
    },
    {
      jdRequirement: 'Identify opportunities for OpEx optimization through automation',
      proof:
        'This blueprint is the answer in a $5B+ ARR Cyber Security Technology Company-specific terms. ~4,200 FTE-equivalent capacity freed. $631M annual run-rate. Real role examples, real from-state and to-state, real agent architectures.',
    },
    {
      jdRequirement: 'Buy-vs-build decisions, AI investment governance',
      proof:
        'Designed enterprise GenAI strategy frameworks for Fortune 100 clients (foundation model selection, embeddings + RAG patterns, fine-tuning approaches, vector DB architecture, responsible AI governance).',
    },
    {
      jdRequirement: 'Top-tier management consulting',
      proof:
        'Bain & Company, Senior Manager (Automation Center of Excellence). Prior: EY Performance Improvement, Capgemini Financial Services Tech Transformation.',
    },
    {
      jdRequirement: 'Customer Zero mindset',
      proof:
        'I built ClearForge.AI as Customer Zero. Every framework, every agent, every methodology gets deployed against my own work first before I sell it to a client.',
    },
  ],
};

export const carnegieAppeal = {
  genuineInterest:
    'I have followed this company closely as an operator, builder, and long-term believer in the cybersecurity platform shift. This is not a generic AI pitch. It is a company-specific view of where AI can improve growth, speed, quality, customer experience, efficiency, and margin.',
  whatTheyDoAlready:
    'The company already understands that AI is becoming the dividing line in security. The open opportunity is to take the same seriousness used for customer-facing innovation and apply it inside every function: the revenue engine, product factory, support motion, research workflow, and operating model.',
  callToAction:
    'I would like 15 minutes to walk through the proposal, pressure-test the assumptions, and identify the first sprint that would create visible value fastest.',
};
