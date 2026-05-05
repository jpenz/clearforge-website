export type BlueprintType = 'Role Proposal' | 'Example Build' | 'Composite Scenario';

export interface Blueprint {
  slug: string;
  href: string;
  type: BlueprintType;
  eyebrow: string;
  title: string;
  h1: string;
  description: string;
  audience: string;
  situation: string;
  truthLabel: string;
  firstWorkflow: string;
  businessQuestion: string;
  operatingOwner: string;
  buildWindow: string;
  proofStandard: string;
  buildSequence: {
    phase: string;
    title: string;
    description: string;
  }[];
  systemLayers: {
    label: string;
    detail: string;
  }[];
  controlPoints: string[];
  valueSignals: {
    label: string;
    metric: string;
    detail: string;
  }[];
  evidenceToBring: string[];
  relatedLinks: {
    label: string;
    href: string;
  }[];
}

export const blueprints: Blueprint[] = [
  {
    slug: 'cybersecurity-technology-company',
    href: '/blueprints/cybersecurity-technology-company',
    type: 'Role Proposal',
    eyebrow: 'Enterprise AI leadership proposal',
    title: 'Cybersecurity Technology Company AI Operating System',
    h1: 'An Enterprise AI operating system for a cybersecurity technology company.',
    description:
      'A role-specific proposal showing how James would lead enterprise AI strategy, governance, automation, and operating cadence inside a large cybersecurity company.',
    audience: 'Enterprise AI leaders, executive teams, and technology operators',
    situation:
      'The company needs internal AI adoption to support growth, operating discipline, governance, and product feedback without creating unmanaged shadow AI.',
    truthLabel:
      'Role proposal based on public company information and ClearForge operating patterns.',
    firstWorkflow: 'AI roadmap, SteerCo governance, and internal workflow deployment engine',
    businessQuestion:
      'How should enterprise AI be governed, funded, shipped, and measured across the company?',
    operatingOwner: 'Enterprise AI leader with C-suite steering committee',
    buildWindow: '90-day operating system launch',
    proofStandard: 'Roadmap adoption, approved governance, shipped workflows, and KPI movement',
    buildSequence: [
      {
        phase: 'Weeks 1-2',
        title: 'Build the source-backed value map',
        description:
          'Map public operating signals, functional workflows, AI ambition, governance requirements, and the role coverage needed to move from strategy to production.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Stand up the AI operating cadence',
        description:
          'Define SteerCo decision rights, buy-vs-build rules, workflow scoring, governance gates, and the Center of Excellence operating model.',
      },
      {
        phase: 'Weeks 7-12',
        title: 'Ship first internal workflows',
        description:
          'Launch agentic workflows with owners, controls, adoption plans, and evidence dashboards tied to productivity and quality movement.',
      },
    ],
    systemLayers: [
      {
        label: 'Roadmap',
        detail: 'Enterprise AI ambition, investment choices, and function-level value map.',
      },
      {
        label: 'Governance',
        detail: 'Responsible AI standards, controls, data access, model risk, and audit trail.',
      },
      {
        label: 'Workflow factory',
        detail: 'Repeatable path from opportunity intake to shipped agentic workflow.',
      },
      {
        label: 'Adoption loop',
        detail: 'Usage, exceptions, quality, productivity, and executive review cadence.',
      },
    ],
    controlPoints: [
      'AI SteerCo prioritization and funding thresholds',
      'Human review and escalation rules before workflow launch',
      'Security, compliance, and responsible AI review built into each sprint',
      'Product feedback loop from internal usage into product and engineering teams',
    ],
    valueSignals: [
      {
        label: 'OPEX discipline',
        metric: 'Baseline first',
        detail: 'Capacity and productivity claims require source-backed assumptions.',
      },
      {
        label: 'Governance',
        metric: 'Approved gates',
        detail: 'Every workflow moves through security, risk, and ownership checks.',
      },
      {
        label: 'Adoption',
        metric: 'Weekly review',
        detail: 'Leaders inspect usage, quality, exceptions, and value movement.',
      },
    ],
    evidenceToBring: [
      'Current AI initiatives and business owners',
      'Workflow volumes, queues, cycle times, and exception rates',
      'Current governance, security, and procurement standards',
      'Enterprise systems involved in first internal workflows',
    ],
    relatedLinks: [
      {
        label: 'Open the full CrowdStrike proposal',
        href: '/blueprints/cybersecurity-technology-company',
      },
      { label: 'AI Operating Model', href: '/operating-model' },
      { label: 'Custom AI Agents', href: '/services/custom-ai-agents' },
    ],
  },
  {
    slug: 'industrial-sales-intelligence-command',
    href: '/blueprints/industrial-sales-intelligence-command',
    type: 'Example Build',
    eyebrow: 'Revenue growth blueprint',
    title: 'Industrial Sales Intelligence Command',
    h1: 'A sales intelligence system that turns market triggers into seller action.',
    description:
      'An example build for industrial and B2B companies where high-fit accounts are missed because signals, CRM data, seller feedback, and leadership review are disconnected.',
    audience: 'CEOs, CROs, sales leaders, and PE operating partners',
    situation:
      'Sellers know the market, but account research, trigger monitoring, outreach timing, and pipeline reviews still depend on manual effort and memory.',
    truthLabel:
      'Example build based on ClearForge revenue operations patterns. Not presented as a separate client result.',
    firstWorkflow: 'Trigger-driven account prioritization and weekly growth review',
    businessQuestion:
      'Which accounts are likely to move now, who owns the next action, and what did the field learn?',
    operatingOwner: 'CRO, revenue operations leader, or sales VP',
    buildWindow: '10-12 week first production sprint',
    proofStandard:
      'Trigger coverage, validated pursuits, response time, stage movement, and seller feedback quality',
    buildSequence: [
      {
        phase: 'Weeks 1-2',
        title: 'Define the buying-event taxonomy',
        description:
          'Identify the market events that actually precede demand: expansions, leadership changes, permits, capital projects, funding, compliance deadlines, or competitor movement.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Build account scoring and seller briefs',
        description:
          'Connect CRM, public signals, enrichment, territory rules, decision maps, and AI-drafted account briefs into a reviewable workflow.',
      },
      {
        phase: 'Weeks 7-12',
        title: 'Run the weekly growth desk',
        description:
          'Launch a manager cadence that reviews found, validated, contacted, qualified, and won opportunities with rep feedback built into scoring.',
      },
    ],
    systemLayers: [
      {
        label: 'Signal engine',
        detail: 'Monitors named buying events and refreshes account priority.',
      },
      {
        label: 'Seller brief',
        detail: 'Drafts the reason to act, account context, stakeholders, and next step.',
      },
      {
        label: 'CRM path',
        detail: 'Routes pursuits into the system of record with owner, stage, and review status.',
      },
      {
        label: 'Growth dashboard',
        detail: 'Shows volume, conversion, response time, and team follow-through.',
      },
    ],
    controlPoints: [
      'Seller approves outreach before external contact',
      'Managers review low-confidence signals before routing',
      'Feedback required on rejected pursuits',
      'CRM fields and stage movement audited weekly',
    ],
    valueSignals: [
      {
        label: 'Found',
        metric: 'Monthly volume',
        detail: 'New account events found by segment and territory.',
      },
      {
        label: 'Validated',
        metric: 'Quality rate',
        detail: 'Share of signals sales accepts as worth action.',
      },
      {
        label: 'Response',
        metric: '<48h target',
        detail: 'Time from validated trigger to first seller action.',
      },
    ],
    evidenceToBring: [
      'CRM stages, fields, owners, and pipeline review format',
      'Recent won/lost accounts and what triggered demand',
      'Territory model, target account lists, and seller capacity',
      'Current enrichment, intent, website, and market-data sources',
    ],
    relatedLinks: [
      { label: 'Sales Pipeline Use Case', href: '/use-cases/ai-sales-pipeline-acceleration' },
      { label: 'Industrial Case Study', href: '/case-studies/industrial-manufacturer' },
      { label: 'AI Revenue Operations', href: '/services/ai-revenue-operations' },
    ],
  },
  {
    slug: 'customer-service-quality-command-center',
    href: '/blueprints/customer-service-quality-command-center',
    type: 'Example Build',
    eyebrow: 'Service quality blueprint',
    title: 'Customer Service Quality Command Center',
    h1: 'A service workflow that triages, drafts, escalates, and quality-checks customer work.',
    description:
      'An example build for service teams with growing request volume, inconsistent response quality, slow escalation, or managers who cannot see risk until customers complain.',
    audience: 'COOs, service leaders, customer success leaders, and owners',
    situation:
      'Requests arrive through multiple channels, frontline teams improvise, and managers learn about quality risk too late.',
    truthLabel: 'Example build. Not presented as a client result.',
    firstWorkflow: 'Priority triage and response quality review',
    businessQuestion:
      'Which requests need action first, what can AI draft safely, and where should a person intervene?',
    operatingOwner: 'COO, VP service, customer success leader, or operations manager',
    buildWindow: '8-10 week first production sprint',
    proofStandard:
      'Backlog age, escalation accuracy, draft quality, SLA risk, and customer follow-up discipline',
    buildSequence: [
      {
        phase: 'Weeks 1-2',
        title: 'Map request types and risk rules',
        description:
          'Classify inbound work, customer risk, SLA commitments, escalation paths, approval needs, and examples of high-quality responses.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Build triage and draft assistance',
        description:
          'Route work by priority, summarize context, draft responses, flag missing information, and send risky items to human review.',
      },
      {
        phase: 'Weeks 7-10',
        title: 'Launch service review cadence',
        description:
          'Give managers a daily view of backlog, at-risk accounts, quality checks, exceptions, and coaching needs.',
      },
    ],
    systemLayers: [
      {
        label: 'Intake layer',
        detail: 'Pulls email, tickets, forms, chats, and customer records into one triage queue.',
      },
      {
        label: 'Risk scoring',
        detail: 'Ranks work by customer value, urgency, SLA risk, sentiment, and open issues.',
      },
      {
        label: 'Draft assistant',
        detail: 'Prepares response drafts, summaries, and next-action recommendations.',
      },
      {
        label: 'Quality desk',
        detail: 'Reviews exceptions, missed SLAs, inconsistent responses, and coaching themes.',
      },
    ],
    controlPoints: [
      'AI drafts require human approval before customer send',
      'Escalation rules override automation when risk is high',
      'Quality samples reviewed by manager each day',
      'Customer history and account tier visible before response',
    ],
    valueSignals: [
      {
        label: 'Backlog',
        metric: 'Age by priority',
        detail: 'What is stuck, why, and who owns it.',
      },
      {
        label: 'Quality',
        metric: 'Draft pass rate',
        detail: 'How often AI drafts are approved or corrected.',
      },
      {
        label: 'Risk',
        metric: 'At-risk accounts',
        detail: 'Customers needing manager attention before churn or escalation.',
      },
    ],
    evidenceToBring: [
      'Ticket categories, SLA rules, and escalation policies',
      'Examples of excellent and poor responses',
      'Customer tiers, account ownership, and renewal or revenue impact',
      'Current systems for tickets, CRM, chat, email, and knowledge base',
    ],
    relatedLinks: [
      { label: 'Customer Service Use Case', href: '/use-cases/ai-customer-service-excellence' },
      { label: 'Performance Improvement', href: '/services/performance-improvement' },
      { label: 'Run Diagnostic', href: '/scorecard' },
    ],
  },
  {
    slug: 'operations-exception-control-tower',
    href: '/blueprints/operations-exception-control-tower',
    type: 'Composite Scenario',
    eyebrow: 'Operations efficiency blueprint',
    title: 'Operations Exception Control Tower',
    h1: 'An operations control tower that makes exceptions visible before they become margin loss.',
    description:
      'A composite scenario for teams where work stalls across handoffs, approvals, missing inputs, expediting, rework, and status meetings.',
    audience: 'COOs, plant leaders, operations VPs, and service business owners',
    situation:
      'Managers spend too much time chasing status because exceptions live across inboxes, spreadsheets, ERP notes, and undocumented judgment calls.',
    truthLabel:
      'Composite scenario based on common operations patterns. Not presented as a client result.',
    firstWorkflow: 'Exception intake, owner routing, and manager review',
    businessQuestion:
      'Which work is stuck, what is blocking it, who owns the next action, and what is the cost of delay?',
    operatingOwner: 'COO, VP operations, site leader, or general manager',
    buildWindow: '8-12 week first production sprint',
    proofStandard:
      'Cycle time, backlog aging, rework, expedite cost, owner response, and exception recurrence',
    buildSequence: [
      {
        phase: 'Weeks 1-2',
        title: 'Name the exception patterns',
        description:
          'Map where work waits, what information is missing, which approvals slow down flow, and how managers know something is at risk.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Build exception detection and routing',
        description:
          'Connect source systems, identify stuck work, summarize blockers, assign ownership, and recommend the next action.',
      },
      {
        phase: 'Weeks 7-12',
        title: 'Run the control-tower cadence',
        description:
          'Launch daily and weekly reviews for aged work, repeated blockers, quality issues, and process fixes.',
      },
    ],
    systemLayers: [
      {
        label: 'Exception detector',
        detail: 'Flags aged work, missing inputs, SLA risk, and process breaks.',
      },
      {
        label: 'Owner routing',
        detail: 'Assigns the next accountable person and required evidence.',
      },
      {
        label: 'Action brief',
        detail: 'Summarizes what happened, what is missing, and what to do next.',
      },
      { label: 'Manager view', detail: 'Shows backlog, blockers, recurrence, and value at risk.' },
    ],
    controlPoints: [
      'Managers approve rule changes before automation expands',
      'Human owner remains accountable for customer or supplier decisions',
      'Root-cause categories reviewed weekly',
      'Audit trail maintained for routed exceptions',
    ],
    valueSignals: [
      {
        label: 'Cycle time',
        metric: 'Baseline vs current',
        detail: 'Where the workflow slows down and why.',
      },
      {
        label: 'Rework',
        metric: 'Repeat blockers',
        detail: 'Patterns that indicate process or data quality problems.',
      },
      {
        label: 'Margin',
        metric: 'Delay cost',
        detail: 'Expedite, overtime, credits, and manual coordination risk.',
      },
    ],
    evidenceToBring: [
      'Current process map and handoff owners',
      'Backlog exports, exception examples, and aging reports',
      'ERP, ticketing, project, or spreadsheet sources',
      'Known quality, rework, or expedite-cost categories',
    ],
    relatedLinks: [
      {
        label: 'Operations Efficiency Use Case',
        href: '/use-cases/ai-operations-efficiency-system',
      },
      { label: 'Performance Improvement', href: '/services/performance-improvement' },
      { label: 'AI Operating Model', href: '/operating-model' },
    ],
  },
  {
    slug: 'private-equity-portfolio-ai-value-creation',
    href: '/blueprints/private-equity-portfolio-ai-value-creation',
    type: 'Composite Scenario',
    eyebrow: 'PE value creation blueprint',
    title: 'Private Equity Portfolio AI Value Creation System',
    h1: 'A portfolio AI system that turns scattered ideas into funded operating plays.',
    description:
      'A composite blueprint for PE operating partners who need a repeatable way to find, fund, build, and review AI value creation across portfolio companies.',
    audience: 'PE operating partners, deal partners, portfolio CEOs, and transformation leaders',
    situation:
      'Every portfolio company has ideas, but the sponsor needs a common method for comparing value, readiness, risk, adoption, and evidence.',
    truthLabel: 'Composite scenario. Not presented as a client result.',
    firstWorkflow: 'Portfolio diagnostic, value backlog, and first portco sprint',
    businessQuestion:
      'Which AI play should be funded first, at which company, with which owner and proof standard?',
    operatingOwner: 'PE operating partner with portfolio company CEO or COO',
    buildWindow: '90-day diagnostic-to-first-sprint path',
    proofStandard:
      'Ranked backlog, approved first build, owner adoption, KPI baseline, and board-ready value trace',
    buildSequence: [
      {
        phase: 'Weeks 1-3',
        title: 'Score the portfolio opportunity set',
        description:
          'Compare companies and workflows by value, readiness, sponsor pull, operating owner, implementation risk, and repeatability.',
      },
      {
        phase: 'Weeks 4-8',
        title: 'Build the first portco workflow',
        description:
          'Ship one workflow with a baseline, dashboard, controls, training, and adoption review.',
      },
      {
        phase: 'Weeks 9-12',
        title: 'Package the repeatable play',
        description:
          'Turn the build into a playbook, board update, operating review, and next-wave backlog for other companies.',
      },
    ],
    systemLayers: [
      {
        label: 'Portfolio map',
        detail: 'Compares companies, workflows, value cases, readiness, and risk.',
      },
      {
        label: 'Playbook library',
        detail: 'Codifies revenue, service, operations, quality, finance, and G&A plays.',
      },
      {
        label: 'Sprint tracker',
        detail: 'Tracks scope, owner decisions, evidence, adoption, and blockers.',
      },
      {
        label: 'Board view',
        detail: 'Shows value movement, adoption, risk, and next investment choices.',
      },
    ],
    controlPoints: [
      'No build without portfolio company owner approval',
      'Board-ready baseline before value claims',
      'Sponsor and operator agree on evidence standard before sprint',
      'Every reusable play names data, systems, controls, and training needs',
    ],
    valueSignals: [
      {
        label: 'Backlog',
        metric: 'Ranked plays',
        detail: 'AI opportunities compared by value and readiness.',
      },
      {
        label: 'Adoption',
        metric: 'Owner cadence',
        detail: 'Portco leader reviews usage, exceptions, and KPI movement.',
      },
      {
        label: 'Repeatability',
        metric: 'Play reuse',
        detail: 'Patterns packaged for other companies or functions.',
      },
    ],
    evidenceToBring: [
      'Portfolio company list, systems, and major operating themes',
      'Existing value creation plan and board priorities',
      'Workflow baselines for revenue, service, operations, finance, or G&A',
      'Operating partner decision rights and portco sponsor model',
    ],
    relatedLinks: [
      { label: 'PE Portfolio AI Use Case', href: '/use-cases/pe-portfolio-ai-value-creation' },
      { label: 'Private Equity Industry Page', href: '/industries/private-equity' },
      { label: 'PE Value Creation Service', href: '/services/pe-value-creation' },
    ],
  },
  {
    slug: 'knowledge-work-delivery-system',
    href: '/blueprints/knowledge-work-delivery-system',
    type: 'Example Build',
    eyebrow: 'Knowledge work blueprint',
    title: 'Knowledge Work Delivery System',
    h1: 'A delivery system that turns expert judgment into repeatable, reviewable work.',
    description:
      'An example build for consulting, legal, engineering, finance, and professional services teams where documents, research, analysis, and approvals slow down delivery.',
    audience: 'Professional services leaders, COOs, practice leaders, and owners',
    situation:
      'High-value people spend too much time gathering context, formatting drafts, reconciling sources, and waiting for review.',
    truthLabel: 'Example build. Not presented as a client result.',
    firstWorkflow: 'Research-to-draft workflow with human review and source trail',
    businessQuestion:
      'Which parts of expert work can AI draft or check while humans keep judgment, quality, and client accountability?',
    operatingOwner: 'COO, practice leader, delivery leader, or managing partner',
    buildWindow: '8-10 week first production sprint',
    proofStandard:
      'Draft cycle time, review quality, source completeness, rework, and expert capacity returned',
    buildSequence: [
      {
        phase: 'Weeks 1-2',
        title: 'Map the expert workflow',
        description:
          'Define inputs, source standards, draft types, review gates, quality criteria, and what must remain human-led.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Build source-grounded drafting',
        description:
          'Create AI-assisted research, summarization, first-draft, QA, and citation workflows around approved knowledge sources.',
      },
      {
        phase: 'Weeks 7-10',
        title: 'Train the review cadence',
        description:
          'Launch a manager review loop for draft acceptance, corrections, knowledge gaps, and quality improvements.',
      },
    ],
    systemLayers: [
      {
        label: 'Knowledge base',
        detail: 'Connects approved templates, prior work, source files, and research rules.',
      },
      {
        label: 'Draft workflow',
        detail: 'Turns intake and source material into reviewable first drafts.',
      },
      {
        label: 'QA checks',
        detail: 'Checks missing evidence, unsupported claims, formatting, and policy issues.',
      },
      {
        label: 'Review loop',
        detail: 'Captures edits, acceptance, reuse, and knowledge gaps for improvement.',
      },
    ],
    controlPoints: [
      'No external delivery without human approval',
      'Source trail required for claims and recommendations',
      'Sensitive documents stay inside approved systems',
      'Reviewers score draft quality and correction themes',
    ],
    valueSignals: [
      {
        label: 'Cycle time',
        metric: 'Draft to review',
        detail: 'Time from intake to first human-reviewable output.',
      },
      { label: 'Quality', metric: 'Correction themes', detail: 'What experts change and why.' },
      {
        label: 'Capacity',
        metric: 'Expert hours',
        detail: 'Time returned from low-judgment assembly work.',
      },
    ],
    evidenceToBring: [
      'Examples of recent deliverables and source materials',
      'Current templates, review comments, and approval standards',
      'Knowledge repositories and document permissions',
      'Common rework themes and delivery bottlenecks',
    ],
    relatedLinks: [
      { label: 'Knowledge Work Use Case', href: '/use-cases/ai-knowledge-work-automation' },
      { label: 'Custom AI Agents', href: '/services/custom-ai-agents' },
      { label: 'Run Diagnostic', href: '/scorecard' },
    ],
  },
];

export function getBlueprintBySlug(slug: string) {
  return blueprints.find((blueprint) => blueprint.slug === slug);
}
