export const marketGaps = [
  {
    icon: 'line-chart',
    label: 'Strategy',
    title: 'The ambition is real, but the value thesis is not owned.',
    detail: 'AI priorities need a sponsor, baseline, business case, and investment sequence.',
  },
  {
    icon: 'workflow',
    label: 'Design',
    title: 'The workflow has not been redesigned for AI and people together.',
    detail: 'Most teams add tools to old work instead of changing decisions, handoffs, and review.',
  },
  {
    icon: 'gauge',
    label: 'Implementation',
    title: 'The build is not connected to adoption and governance.',
    detail: 'Agents, automations, dashboards, controls, and training need to launch as one system.',
  },
  {
    icon: 'search',
    label: 'Realization',
    title: 'Benefits are discussed, but not tracked like an operating plan.',
    detail: 'Leaders need a cadence that shows adoption, value captured, risk, and next actions.',
  },
] as const;

export const transformationSpine = [
  {
    icon: 'target',
    title: 'Set the AI ambition',
    detail:
      'Define where AI should improve growth, speed, quality, service, margin, or enterprise value.',
    output: 'Value thesis',
  },
  {
    icon: 'workflow',
    title: 'Design the operating model',
    detail:
      'Redesign the workflow, decisions, handoffs, controls, and roles before the build starts.',
    output: 'Future-state work',
  },
  {
    icon: 'gauge',
    title: 'Build the custom AI system',
    detail:
      'Implement agents, automations, dashboards, integrations, and exception rules around your systems.',
    output: 'Production system',
  },
  {
    icon: 'users',
    title: 'Drive adoption and governance',
    detail:
      'Train users, define human review, establish risk controls, and install the leadership cadence.',
    output: 'Adoption model',
  },
  {
    icon: 'line-chart',
    title: 'Realize and scale benefits',
    detail:
      'Track value captured, identify leakage, improve the system, and sequence the next wave.',
    output: 'Benefits ledger',
  },
] as const;

export const benefitsDashboardPanels = [
  {
    title: 'AI contribution',
    icon: 'gauge',
    rows: [
      ['Agent work completed', '12,480'],
      ['Owner-approved outputs', '74%'],
      ['Escalations routed', '312'],
    ],
  },
  {
    title: 'People adoption',
    icon: 'users',
    rows: [
      ['Active workflow users', '86%'],
      ['Quality feedback logged', '1,940'],
      ['Overrides reviewed', '218'],
    ],
  },
  {
    title: 'Benefit movement',
    icon: 'line-chart',
    rows: [
      ['Cycle time removed', '41%'],
      ['Service variance down', '28%'],
      ['Run-rate value', '$4.8M'],
    ],
  },
] as const;

export const benefitsOperatingModel = [
  {
    title: 'AI work telemetry',
    detail:
      'Track agent runs, recommendations, confidence thresholds, exceptions, escalations, and accepted outputs.',
    signal: 'What the system handled',
  },
  {
    title: 'Human adoption signals',
    detail:
      'Track role-level usage, reviews, overrides, feedback quality, cycle movement, and coaching needs.',
    signal: 'How people changed the work',
  },
  {
    title: 'Benefits ledger',
    detail:
      'Tie usage to revenue, speed, quality, service, margin, risk, and enterprise-value movement.',
    signal: 'What the business captured',
  },
  {
    title: 'Incentive scorecard',
    detail:
      'Align scorecards to value realized, quality held, customer outcomes, and responsible adoption.',
    signal: 'What behavior gets reinforced',
  },
] as const;

export const benefitsMetrics = [
  { value: '74%', label: 'AI-assisted work reviewed by accountable owners' },
  { value: '41%', label: 'Manual cycle load removed from priority workflows' },
  { value: '18', label: 'Value pools tracked through the benefits ledger' },
  { value: '$4.8M', label: 'Run-rate benefit under management' },
] as const;

export const proofNotes = [
  'Value thesis',
  'Future workflow',
  'System shipped',
  'Benefits tracked',
] as const;

export const priorityUseCaseCopy = [
  {
    slug: 'ai-sales-pipeline-acceleration',
    focus: 'Revenue growth',
    line: 'Find buying events, match them to fit, and give sellers the next action.',
    signal: 'Lead volume, stage movement, seller feedback',
  },
  {
    slug: 'ai-customer-service-excellence',
    focus: 'Service quality',
    line: 'Reduce response variance while keeping judgment and escalation visible.',
    signal: 'Response time, repeat issues, escalation quality',
  },
  {
    slug: 'ai-operations-efficiency',
    focus: 'Operations efficiency',
    line: 'Move manual coordination, approvals, and exception queues into a managed workflow.',
    signal: 'Cycle time, backlog, manual load',
  },
  {
    slug: 'ai-knowledge-work-automation',
    focus: 'Knowledge work',
    line: 'Turn research, drafting, review, and reuse into a faster expert workflow.',
    signal: 'Hours saved, quality checks, reuse rate',
  },
  {
    slug: 'ai-quality-control-exception-management',
    focus: 'Quality exceptions',
    line: 'Detect repeat issues, route work to the right owner, and close the learning loop.',
    signal: 'Exception rate, rework, root-cause closure',
  },
  {
    slug: 'pe-portfolio-ai-value-creation',
    focus: 'PE value creation',
    line: 'Prioritize portfolio workflows by value, feasibility, adoption, and EBITDA path.',
    signal: 'Value map, build priority, owner readiness',
  },
] as const;

export const firstNinetyDays = [
  {
    day: '01',
    title: 'Align ambition and value pools',
    detail:
      'Confirm the business outcomes, sponsors, baselines, constraints, and first priority areas.',
  },
  {
    day: '30',
    title: 'Design the future-state workflow',
    detail: 'Define the operating design, controls, data path, user journey, and benefits model.',
  },
  {
    day: '60',
    title: 'Build and launch the first system',
    detail: 'Ship the custom AI workflow with dashboard, handoffs, escalation, and user training.',
  },
  {
    day: '90',
    title: 'Run the benefits cadence',
    detail: 'Review adoption, value captured, risks, exceptions, and the next wave of automation.',
  },
] as const;

export const trustStandards = [
  {
    title: 'Strategy with implementation inside it',
    detail: 'The roadmap is designed around what can actually be built, adopted, and measured.',
  },
  {
    title: 'Workflow before platform',
    detail: 'The operating model is designed before tools are selected.',
  },
  {
    title: 'Governance by design',
    detail: 'Human review, escalation, monitoring, and auditability are part of the system.',
  },
  {
    title: 'Benefits realization discipline',
    detail: 'Value capture is tracked after launch, not assumed at go-live.',
  },
] as const;
