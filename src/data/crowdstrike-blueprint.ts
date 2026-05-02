/**
 * CrowdStrike Enterprise AI Transformation Blueprint
 *
 * Source data:
 *  - CrowdStrike FY2026 10-K (filed Mar 2026, fiscal year ended Jan 31, 2026)
 *  - Apollo people-search sample n=1,000 (titles classified into functions)
 *  - Job posting: VP, Enterprise AI Strategy and Transformation (Remote, $300-340K)
 *  - Company posts on Charlotte AI / AgentWorks / Agentic SOC (Spring 2026 release)
 *
 * Methodology:
 *  - Triangulated headcount per function from OpEx allocation + Apollo titles + cybersec benchmarks
 *  - AI-automation % per function from Bain Dell Automation Ambition methodology
 *  - From-state / to-state inspired by Bain Automation playbook archetypes
 */

export const crowdstrikeFY2026 = {
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
        'Charlotte-style account agent auto-generates account brief, top 3 entry plays, named-account contact map, and 80 percent draft RFP within 30 minutes of request. Forecast agent assembles weighted pipeline view daily and flags slip risks before the call.',
      agentArchetype: 'Account Intelligence + RFP + Forecast Agent',
      exampleOutput:
        'For a Fortune 100 healthcare prospect: company brief, 3 entry plays grounded in Falcon module fit, 12 named contacts mapped to ICP, draft RFP with module-level pricing — produced in 28 minutes vs 2.5 days.',
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
        'For a new Falcon cloud module: 60 percent of unit tests auto-generated, API docs drafted from OpenAPI spec, 2 of 3 incident root-causes surfaced before on-call paged.',
    },
  },
  {
    function: 'Threat Intel & Research',
    estimatedHeadcount: 856,
    shareOfTotalHCPct: 8.0,
    derivationNote: 'Falcon OverWatch + Counter Adversary Operations + Charlotte AI training',
    aiAutomationPct: 50.0,
    fteEquivalentFreed: 428,
    annualHoursFreed: 890240,
    highValueAreas:
      'Threat triage, malware family clustering, IOC enrichment, report drafting, telemetry summarization (Charlotte AI eats own dog food)',
    sampleApolloTitles: [
      'Senior Threat Researcher',
      'Counter Adversary Specialist for Intel and Hunting',
      'Information Security | Threat Intelligence',
      'Senior Malware Analyst',
      'Incident Response Consultant',
      'Threat Hunter',
    ],
    sampleNamedEmployees: [],
    fromTo: {
      fromState:
        'Analyst manually triages alerts in Falcon console. Malware sample analysis takes hours per family. Adversary report drafted from scratch over multi-day cycles.',
      toState:
        'Charlotte AI AgentWorks orchestrates triage, clusters malware variants by behavior, enriches IOCs across telemetry, and drafts adversary report in minutes — analyst becomes the editor and decision-maker, not the producer.',
      agentArchetype: 'Charlotte AI Triage + Malware Clustering + Report Drafting Agent',
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
        'Customer-facing chat agent grounded on Falcon docs deflects 50 percent of L1 before ticket creation. Internal copilot drafts response to remaining tickets, summarizes case, and routes escalations automatically.',
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
        'For Black Hat 2026: regional event playbook, social calendar, and 12 customer-meeting briefings generated from a single intake brief in 4 hours vs 3 days.',
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
    derivationNote: '$247M services revenue + $203M services cost-of-revenue, IR + deployment + advisory',
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
        'New Falcon Identity Protection deployment: runbook delivered Day 1 vs Week 2 historically. Customer config questions answered 80 percent without engineer escalation.',
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
        'Research synthesis agent clusters user interviews and CSAT comments into themes weekly. PRD agent drafts from epic + research. Competitive intel agent monitors SentinelOne, Palo Alto, Microsoft daily and flags shifts.',
      agentArchetype: 'Research Synthesis + PRD + Competitive Intel Agent',
      exampleOutput:
        'For Falcon Identity Protection roadmap: 240 user comments clustered into 9 themes, draft PRD for top 3, competitor feature matrix updated daily — PM time on synthesis drops 60 percent.',
    },
  },
  {
    function: 'Finance',
    estimatedHeadcount: 321,
    shareOfTotalHCPct: 3.0,
    derivationNote: '$670M G&A, public company finance scale (FP&A, controllership, treasury, billing)',
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
    derivationNote: 'Public company legal, GDPR, FedRAMP, contracts, regulatory monitoring',
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
        'Contract review agent flags non-standard clauses with risk scoring and suggested redlines. NDA agent assembles in 5 min. Reg-monitoring agent watches FedRAMP, GDPR, state privacy daily and flags impacts.',
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
      'Map every function and value-chain activity at CrowdStrike against the agent archetype taxonomy. Score by AI fit and dollar value.',
    deliverable:
      'Enterprise opportunity map: every function, every activity, scored on AI agent suitability + dollar opportunity. Ranked pipeline ready for sequencing.',
    crowdstrikeSpecific:
      'Already drafted in this blueprint. Refined in week 1 with internal data (Workday headcount, Salesforce activity logs, Jira ticket volumes, Falcon telemetry).',
  },
  {
    phase: 2,
    name: 'Size',
    weeks: '2 to 6',
    description:
      'For each opportunity, build the from-state baseline (current cycle time, $ cost, error rates) and the to-state target (post-agent metrics).',
    deliverable:
      'Per-opportunity business case with baseline metrics, target metrics, FTE-equivalent capacity freed, and dollar savings.',
    crowdstrikeSpecific:
      'Anchor on the 33 Falcon modules, GTM segments, and the 13 enterprise functions. Each opportunity ties to a named OKR owner.',
  },
  {
    phase: 3,
    name: 'Sequence',
    weeks: '4 to 8',
    description:
      'Order opportunities by value, speed-to-deploy, and risk. Build a 90-day sprint backlog and a 12-month roadmap. Lock executive sponsors.',
    deliverable:
      '90-day sprint backlog (5 to 8 priority opportunities), 12-month roadmap, named sponsors, governance cadence, success metrics.',
    crowdstrikeSpecific:
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
    crowdstrikeSpecific:
      'Charlotte AI AgentWorks is the natural production runtime for internal-facing agents. External-facing customer agents follow the same playbook.',
  },
];

export const whyJames = {
  appreciation:
    'CrowdStrike has done something rare. You built a category, defined the modern endpoint, and crossed $5B ARR with 22 percent growth. Charlotte AI AgentWorks puts agentic security into the hands of every analyst. The 33 cloud modules of the Falcon platform are an enterprise data fabric that few companies can match.',
  shareholderSince: 2020,
  experienceMatches: [
    {
      jdRequirement: 'Architect and direct AI Center of Excellence',
      proof:
        'First hire and founding team member of Bain\'s Automation Center of Excellence. Built the practice, the methodology, and the operating model from zero.',
    },
    {
      jdRequirement: 'Define the Enterprise AI Roadmap',
      proof:
        'Led Dell Automation Ambition: identified $150 to $200M in G&A opportunities across 5 priority workstreams, built the evergreen opportunity pipeline that became Dell\'s permanent capability.',
    },
    {
      jdRequirement: 'Deploy autonomous workflows and agentic systems',
      proof:
        'ClearForge.AI ships production multi-agent systems. AgentForge: 44 tools, 6 agent teams, 9-tier model router across Claude, GPT-4, Gemini, Groq, MiniMax. Real production workloads, real customers, real ROI.',
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
      proof: 'Bain & Company, Senior Manager (Automation Center of Excellence). Prior: EY Performance Improvement, Capgemini Financial Services Tech Transformation.',
    },
    {
      jdRequirement: 'Customer Zero mindset',
      proof:
        'I built ClearForge.AI as Customer Zero. Every framework, every agent, every methodology gets deployed against my own work first before I sell it to a client.',
    },
  ],
};

export const carnegieAppeal = {
  geninuneInterest:
    'I\'ve been a CrowdStrike shareholder since 2020 — through the Falcon expansion, the Charlotte AI launch, the Spring \'26 platform release. This isn\'t a job to me. This is the company I have been studying, betting on, and rooting for from the outside. I want to help build it from the inside.',
  whatTheyDoAlready:
    'You don\'t need me to tell you AI is the dividing line. Michael Sentonas already said it. You don\'t need me to tell you the Falcon platform is the right substrate for agentic security — Charlotte AI AgentWorks proves it. What you do need is someone who can take the same playbook you used to build the agentic SOC for customers and apply it inside CrowdStrike to unlock the next leg of the $10B journey.',
  callToAction:
    'I\'d like 15 minutes with the hiring leader to discuss the blueprint above and how this lands inside the AI Center of Excellence operating model.',
};
