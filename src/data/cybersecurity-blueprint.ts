/**
 * CrowdStrike Enterprise AI Transformation Blueprint
 *
 * Source data:
 *  - Public FY2026 10-K metrics for CrowdStrike / a $5B+ ARR cybersecurity platform company
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

export const roleBrief = {
  heard: [
    {
      label: 'Enterprise AI roadmap',
      body: 'Own the internal AI strategy that connects platforms, tooling, capability building, and measurable movement toward the $10B revenue goal.',
    },
    {
      label: 'AI Center of Excellence',
      body: 'Build the cross-functional engine of product, engineering, analytics, governance, and functional operators that turns AI ambition into repeatable execution.',
    },
    {
      label: 'Executive governance',
      body: 'Chair the AI SteerCo, force prioritization, make investment and buy-vs-build decisions, and keep C-suite focus on value, risk, and adoption.',
    },
    {
      label: 'AI workflow deployment',
      body: 'Deploy reviewed AI workflows across the enterprise, integrate them into daily systems, and bend the OpEx curve through process redesign.',
    },
  ],
  beliefs: [
    {
      label: 'This is not a tools rollout',
      body: 'The win is a company operating model for human-plus-AI work: one roadmap, one governance model, one value pipeline, and many business-owned workflows.',
    },
    {
      label: 'Near-term proof funds the long-term model',
      body: 'The first 90 days should prove visible value in a few high-signal wedges, then recycle the lessons into a permanent opportunity pipeline.',
    },
    {
      label: 'Governance belongs in the build system',
      body: 'Security, compliance, evaluations, data boundaries, human approval, and model-risk controls should be designed into every intake gate, not inspected afterward.',
    },
    {
      label: 'Customer Zero should sharpen the product',
      body: 'Internal agent deployments should create a feedback loop for Falcon, Charlotte AI, field enablement, customer operations, and enterprise platform priorities.',
    },
  ],
};

export type BlueprintBuildStep = {
  label: string;
  body: string;
};

export const blueprintBuildSteps: BlueprintBuildStep[] = [
  {
    label: '1. Read the role like an operator',
    body: 'I translated the Enterprise AI Strategy and Transformation mandate into operating jobs: roadmap, AI CoE, SteerCo, governance, reviewed AI workflows, enterprise integrations, productivity, scouting, and Customer Zero feedback loops.',
  },
  {
    label: '2. Built the company baseline from public data',
    body: 'I pulled the FY2026 revenue, ARR, employee count, free cash flow, and operating expense base from CrowdStrike public materials, then used those as the factual anchor for the page.',
  },
  {
    label: '3. Mapped the enterprise value chain',
    body: 'I organized the company into the workflows where internal AI can move performance: market signal, product, threat intelligence, engineering, GTM, onboarding, support, operations, and governance.',
  },
  {
    label: '4. Turned the baseline into a first proposal',
    body: 'I created an initial 30-day diagnostic, 90-day production proof, and 12-month scale model with ambition wedges, governance gates, operating analytics, and a preview of the intake-to-value playbook.',
  },
];

export type BlueprintSourceRule = {
  label: string;
  body: string;
};

export const blueprintSourceRules: BlueprintSourceRule[] = [
  {
    label: 'CrowdStrike facts',
    body: 'Revenue, ARR, employee count, named products, and public operating metrics are sourced from CrowdStrike investor relations, SEC filings, or public job-posting mirrors.',
  },
  {
    label: 'James / ClearForge work',
    body: 'The automation ambition model, playbook structure, value-chain interpretation, use-case sequencing, and role-fit narrative are my proposal, based on prior transformation work and the playbooks referenced for this page.',
  },
  {
    label: 'Estimates',
    body: 'Function headcount allocation, FTE-equivalent capacity freed, run-rate savings, and the lead/sales analytics examples are directional hypotheses for executive discussion, not CrowdStrike-reported numbers.',
  },
  {
    label: 'Internal validation needed',
    body: 'If hired or engaged, I would replace every estimate with Workday, Salesforce, Jira, ServiceNow, product telemetry, finance, support, and adoption data before any investment decision.',
  },
];

export type CrowdStrikeSource = {
  claim: string;
  source: string;
  href: string;
  usedFor: string;
};

export const crowdstrikeSourceTrail: CrowdStrikeSource[] = [
  {
    claim: 'FY2026 revenue, ARR, net new ARR, free cash flow, and annual highlights',
    source: 'CrowdStrike FY2026 financial results',
    href: 'https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-reports-fourth-quarter-and-fiscal-year-2026/',
    usedFor: 'Hero metrics, FY2026 baseline, and the scale of the $5B+ ARR operating environment.',
  },
  {
    claim: '10,698 employees and FY2026 statement-of-operations detail',
    source: 'CrowdStrike FY2026 Form 10-K',
    href: 'https://ir.crowdstrike.com/node/16071/html',
    usedFor:
      'Employee base, subscription/professional services revenue, and OpEx categories used in the function-level model.',
  },
  {
    claim: '$10B ending ARR ambition and AI-era platform language',
    source: 'CrowdStrike Q1 FY2026 financial results',
    href: 'https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-reports-first-quarter-fiscal-year-2026-financial/',
    usedFor: 'The role framing around aligning internal AI to the $10B revenue / ARR ambition.',
  },
  {
    claim: 'Enterprise AI Strategy and Transformation role mandate',
    source: 'Public job-posting mirror and role text supplied by James',
    href: 'https://remotive.com/remote/jobs/ai-ml/vice-president-enterprise-ai-strategy-and-transformation-4481275',
    usedFor: 'Role coverage matrix, mandate interpretation, and initial 90-day ownership proposal.',
  },
];

export type AutomationAmbitionWedge = {
  opportunity: string;
  ambition: string;
  firstPainPoints: string;
  valueSignal: string;
  sponsor: string;
};

export const automationAmbitionWedges: AutomationAmbitionWedge[] = [
  {
    opportunity: 'Revenue execution system',
    ambition:
      'Every seller and sales engineer gets account intelligence, module-fit narratives, RFP drafts, stakeholder maps, and pipeline risk before the deal review.',
    firstPainPoints:
      'Manual account research, inconsistent RFP cycle times, stale CRM notes, MEDDICC risk buried in calls.',
    valueSignal: 'Seller capacity, win-rate lift, deal velocity, forecast accuracy',
    sponsor: 'CRO / RevOps',
  },
  {
    opportunity: 'Customer time-to-value system',
    ambition:
      'Implementation, support, and success teams move customers from signed to protected faster with agent-built runbooks and proactive risk detection.',
    firstPainPoints:
      'Runbooks rebuilt from templates, support summaries written manually, escalation risk found late.',
    valueSignal: 'Time to value, CSAT, support handle time, renewal readiness',
    sponsor: 'COO / Customer Officer',
  },
  {
    opportunity: 'Threat-to-customer intelligence engine',
    ambition:
      'Threat research becomes a high-velocity internal signal factory for product, field, marketing, support, and customer-specific risk briefs.',
    firstPainPoints:
      'IOC enrichment, report drafting, telemetry synthesis, and field translation consume analyst time.',
    valueSignal: 'Research cycle time, analyst capacity, customer-facing intelligence velocity',
    sponsor: 'CTO / Head of Intel',
  },
  {
    opportunity: 'Engineering delivery factory',
    ambition:
      'Engineering agents generate tests, docs, PR review notes, incident summaries, and migration support inside approved development workflows.',
    firstPainPoints:
      'Boilerplate, test coverage, documentation, incident log synthesis, and tribal knowledge transfer.',
    valueSignal: 'Cycle time, escaped defects, MTTR, engineer focus time',
    sponsor: 'CTO / Engineering',
  },
  {
    opportunity: 'Enterprise operations control tower',
    ambition:
      'A governed executive control tower tracks AI value, adoption, risk, spend, policy approvals, and next-wave opportunities across functions.',
    firstPainPoints:
      'QBR deck churn, spreadsheet PMO updates, fragmented ROI tracking, slow policy approvals.',
    valueSignal: 'OpEx movement, decision cycle time, adoption, risk visibility',
    sponsor: 'CFO / CIO / CAIO',
  },
];

export type AutomationPlaybookChapter = {
  title: string;
  body: string;
};

export const automationPlaybookChapters: AutomationPlaybookChapter[] = [
  {
    title: 'Mission and operating model',
    body: 'Defines the AI CoE mandate, business ownership model, SteerCo cadence, decision rights, and what qualifies as production value.',
  },
  {
    title: 'Teams, roles, and tools',
    body: 'Clarifies who owns value, who owns architecture, who approves risk, who signs off adoption, and which enterprise tools are system-of-record.',
  },
  {
    title: 'Intake to value journey',
    body: 'Turns ideas into shipped agent workflows through repeatable stages, gates, checklists, metric baselines, and adoption routines.',
  },
  {
    title: 'Artifact library preview',
    body: 'Includes teasers for opportunity charters, value scorecards, security reviews, model evaluations, launch plans, and value-realization templates.',
  },
];

export type AutomationPlaybookStage = {
  stage: string;
  focus: string;
  gate: string;
  artifactPreview: string;
  crowdstrikeApplication: string;
};

export const automationPlaybookJourney: AutomationPlaybookStage[] = [
  {
    stage: 'Intake',
    focus:
      'Capture the business problem, workflow owner, current-state pain, systems touched, and why this matters now.',
    gate: 'Business owner named and executive sponsor confirmed.',
    artifactPreview: 'Opportunity intake brief',
    crowdstrikeApplication:
      'Revenue, customer, engineering, threat intel, and G&A leaders submit opportunities into one AI value pipeline.',
  },
  {
    stage: 'Validate',
    focus:
      'Confirm value at stake, data availability, process readiness, adoption pull, security profile, and build-vs-buy options.',
    gate: 'SteerCo approves diagnostic priority and expected value thesis.',
    artifactPreview: 'Value and feasibility scorecard',
    crowdstrikeApplication:
      'The AI CoE pressure-tests whether a workflow should be automated, assisted, redesigned, or left alone.',
  },
  {
    stage: 'Define',
    focus:
      'Baseline the current process, define target metrics, assign product and technical owners, and lock the first production scope.',
    gate: 'KPI baseline, target outcome, and human approval model signed off.',
    artifactPreview: 'Use-case charter',
    crowdstrikeApplication:
      'Each agent has an explicit owner for cycle time, quality, capacity, customer experience, or risk reduction.',
  },
  {
    stage: 'Design',
    focus:
      'Design the human-plus-agent workflow, data access, UX, integrations, evaluations, audit trail, and escalation rules.',
    gate: 'Architecture, security, compliance, and change-management review complete.',
    artifactPreview: 'Future-state workflow map',
    crowdstrikeApplication:
      'Agents are designed around Salesforce, ServiceNow, Jira, GitHub, Workday, Anaplan, telemetry, and approved knowledge sources.',
  },
  {
    stage: 'Develop and test',
    focus:
      'Build in short sprints, test against real cases, measure quality, document failure modes, and tune before launch.',
    gate: 'Evaluation threshold met and launch risks accepted by owners.',
    artifactPreview: 'Eval pack and release checklist',
    crowdstrikeApplication:
      'The CoE creates reusable patterns for prompts, tools, retrieval, routing, observability, and model fallback.',
  },
  {
    stage: 'Deploy and adopt',
    focus:
      'Launch with role training, manager routines, support path, usage analytics, and frontline feedback loops.',
    gate: 'Adoption owner confirms readiness and support model is live.',
    artifactPreview: 'Launch and adoption plan',
    crowdstrikeApplication:
      'Managers see agent usage, exception rates, quality trends, and workflow adoption in the weekly operating cadence.',
  },
  {
    stage: 'Assess value',
    focus:
      'Compare before/after metrics, capture lessons, decide whether to scale, stop, tune, or recycle into the next wave.',
    gate: 'Value realized, risk posture, and scale decision reviewed by SteerCo.',
    artifactPreview: 'Value-realization readout',
    crowdstrikeApplication:
      'Every shipped agent feeds the Customer Zero product loop and the next quarterly AI investment decision.',
  },
];

export type RoleCoverageItem = {
  requirement: string;
  ownership: string;
  proof: string;
};

export const roleCoverage: RoleCoverageItem[] = [
  {
    requirement: 'Define the Enterprise AI Roadmap',
    ownership:
      'Build the company-wide AI roadmap tied to $10B ARR ambition, OpEx movement, product feedback loops, and function-level operating metrics.',
    proof:
      'Led automation ambition work that identified $150M to $200M+ of enterprise opportunity and converted it into an evergreen pipeline model.',
  },
  {
    requirement: 'Lead the AI Center of Excellence',
    ownership:
      'Stand up the cross-functional AI CoE with product, engineering, analytics, governance, and business operators aligned to shared standards.',
    proof:
      "Founding team member and first hire in Bain's Automation Center of Excellence, helping build the practice model from zero.",
  },
  {
    requirement: 'Chair AI SteerCo and investment governance',
    ownership:
      'Run the executive cadence, force tradeoff decisions, maintain the opportunity backlog, and guide build-vs-buy investment calls.',
    proof:
      'Built executive-ready operating routines, value scorecards, and decision frameworks for complex transformation portfolios.',
  },
  {
    requirement: 'Governance, ethics, risk, and compliance',
    ownership:
      'Embed data access, evaluations, human approval, model risk, audit trail, and responsible-use controls into every delivery gate.',
    proof:
      'Designed enterprise GenAI strategy frameworks across model selection, RAG patterns, risk controls, compliance review, and responsible adoption.',
  },
  {
    requirement: 'Deploy agentic systems',
    ownership:
      'Move from pilots to production agents that execute workflow steps, route exceptions, measure outcomes, and improve through managed loops.',
    proof:
      'ClearForge ships production multi-agent systems with model routing, tool orchestration, human handoffs, and measurable operating outcomes.',
  },
  {
    requirement: 'Cross-enterprise integration',
    ownership:
      'Integrate agents into CRM, ERP, ITSM, engineering, HRIS, finance planning, data lake, and collaboration workflows without creating shadow systems.',
    proof:
      'Built agent workflows across sales intelligence, research, reporting, pipeline management, contact discovery, and team performance analytics.',
  },
  {
    requirement: 'Drive productivity step-change',
    ownership:
      'Target high-volume workflows where speed, quality, customer experience, and margin improve together, then measure capacity freed and reinvested.',
    proof:
      'This blueprint translates public operating data into a function-by-function value map with ~4,200 FTE-equivalent capacity freed as a starting hypothesis.',
  },
  {
    requirement: 'Innovation scouting',
    ownership:
      'Continuously evaluate LLMs, agent frameworks, enterprise AI platforms, retrieval patterns, evaluation tooling, and automation vendors.',
    proof:
      'Hands-on builder across frontier models and agent stacks, with a practical bias toward utility over hype.',
  },
  {
    requirement: 'Executive gravity and consulting DNA',
    ownership:
      'Translate ambiguous executive ambition into a crisp narrative, investment thesis, operating plan, and measurable delivery model.',
    proof:
      'Bain Senior Manager, EY Performance Improvement, and Capgemini Financial Services transformation experience.',
  },
  {
    requirement: 'Customer Zero mindset',
    ownership:
      'Use internal deployments to create product feedback loops, sharpen employee experience, and prove AI operating patterns before scaling.',
    proof:
      'Built ClearForge as Customer Zero: the methods, agents, research systems, and operating loops are used internally before being sold externally.',
  },
];

export type StrategicPillar = {
  label: string;
  headline: string;
  body: string;
  proof: string;
};

export const strategicProposal: StrategicPillar[] = [
  {
    label: 'Define the roadmap',
    headline: 'Connect $10B revenue ambition to the internal workflows that must change first.',
    body: 'CrowdStrike already has the ingredients: account activity, product telemetry, threat research, support demand, partner motion, renewal signals, and field intelligence. I would connect those signals into one ranked view of where growth, speed, quality, customer trust, and OpEx improvement are most likely.',
    proof:
      'Output: a company-wide Enterprise AI roadmap with value at stake, named owners, risk posture, investment asks, and a sequenced first-year portfolio.',
  },
  {
    label: 'Build the CoE',
    headline: 'Create the AI Center of Excellence as a delivery engine, not a policy committee.',
    body: 'The AI CoE should behave like a product and delivery team: business PMs own outcomes, engineers own systems, analysts own measurement, governance owns guardrails, and functional leaders own adoption.',
    proof:
      'Output: an operating model with roles, decision rights, intake gates, reusable build patterns, vendor standards, and a weekly value cadence.',
  },
  {
    label: 'Govern the system',
    headline:
      'Make security, compliance, evaluation, and human judgment part of the production path.',
    body: 'Responsible AI cannot live in a side deck. Every agent needs clear data boundaries, evaluation thresholds, approval paths, audit trails, incident handling, and retirement criteria before it scales.',
    proof:
      'Output: AI governance embedded into the intake-to-value playbook so every workflow ships with controls, not just enthusiasm.',
  },
  {
    label: 'Scale AI operations',
    headline: 'Turn first-wave wins into a permanent company operating advantage.',
    body: 'The goal is not a pile of pilots. The goal is a durable AI operating model: every function has an opportunity backlog, every agent has a metric owner, and the leadership team can see adoption, ROI, risk, and next-wave value in one place.',
    proof:
      'Output: production agents shipped in waves, measured by business outcomes, and scaled through a repeatable enterprise playbook.',
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
      'An AI operating control tower tracks initiative health, ROI, staffing, risk, compliance, and executive decisions across the company portfolio.',
    useCases: ['Executive brief agent', 'Close and variance agent', 'AI governance tracker'],
    metric: 'Management cycle time, OpEx movement, risk visibility, decision quality',
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
    name: 'Enterprise AI diagnostic',
    promise:
      'Convert public and internal operating data into a prioritized opportunity map across the full company value chain, with the SteerCo aligned on first-wave value.',
    deliverables: [
      'Value-chain map with current-state friction',
      'Ranked use-case portfolio with value, effort, and risk scoring',
      'Executive business case for the first 90 days',
      'AI CoE operating model and governance gates',
    ],
  },
  {
    window: 'Days 31 to 90',
    name: 'Production proof',
    promise:
      'Ship the first five to eight agents where speed, quality, customer experience, employee experience, and margin move together.',
    deliverables: [
      'Production agent backlog and sprint cadence',
      'Before/after baselines for cycle time, cost, quality, and adoption',
      'Reusable agent patterns for security, evaluation, and change management',
      'Customer Zero feedback loop into product, platform, and enterprise architecture teams',
    ],
  },
  {
    window: 'Months 4 to 12',
    name: 'Scale the operating system',
    promise:
      'Turn early wins into a permanent AI capability owned by the business, measured by value, and governed with discipline.',
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
      'Map every function and value-chain activity at CrowdStrike against the agent archetype taxonomy. Score by AI fit, dollar value, risk, adoption pull, and Customer Zero product feedback potential.',
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
    'CrowdStrike has done something rare: built a category, scaled beyond $5B ARR, and created an enterprise data fabric that few security companies can match. That operating scale is exactly why the next advantage will come from applying AI to the company itself, not only to customer-facing products.',
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
        'ClearForge ships production multi-agent systems with tool access, model routing, human review, logging, and customer-facing delivery discipline.',
    },
    {
      jdRequirement: 'Identify opportunities for OpEx optimization through automation',
      proof:
        'This blueprint is the answer in CrowdStrike-specific terms. ~4,200 FTE-equivalent capacity freed. $631M annual run-rate. Real role examples, real from-state and to-state, real agent architectures.',
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
    'I have followed CrowdStrike closely as an operator, builder, and long-term believer in the cybersecurity platform shift. This is not a broad capabilities page. It is a company-specific view of where I would improve growth, speed, quality, customer experience, efficiency, and margin if hired into the Enterprise AI role or engaged as a contractor.',
  whatTheyDoAlready:
    'CrowdStrike already understands that AI is becoming the dividing line in security. The open opportunity is to take the same seriousness used for customer-facing innovation and apply it inside every function: the revenue engine, product factory, support motion, research workflow, and operating model.',
  callToAction:
    'The next conversation is not "can James talk AI?" It is which first 90-day wedge I should own as employee, contractor, or advisor.',
};
