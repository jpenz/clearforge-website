export type ServiceIcon = 'LineChart' | 'Cog' | 'Rocket' | 'Bot';

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: ServiceIcon;
  idealClient: string;
  deliverables: string[];
  /**
   * Outcomes render as three lines in a 4-column grid:
   *   value  (big, mono, brass)    e.g. "30%"
   *   label  (semibold, anthracite) e.g. "Pipeline Increase"
   *   description (body-sm, muted)   e.g. "Average increase in qualified pipeline within 90 days"
   *
   * Splitting value/label prevents the entire metric string from wrapping
   * awkwardly inside one narrow grid cell at desktop widths.
   */
  outcomes: { value: string; label: string; description: string }[];
  workflow: { phase: string; title: string; description: string }[];
  /** Atmospheric hero bg image (webp). Matches the pattern used on industry pages. */
  heroBg: string;
}

export const services: Service[] = [
  {
    slug: 'ai-revenue-operations',
    title: 'AI Revenue Operations',
    tagline: 'Custom AI systems for pipeline, account intelligence, and commercial execution.',
    description:
      'We redesign the revenue workflow and build the custom agents, signal engines, CRM integrations, and operating dashboards that help teams find the right accounts, act faster, and manage pipeline with discipline.',
    icon: 'LineChart',
    heroBg: '/images/abstract-value-creation.webp',
    idealClient:
      'B2B companies where high-fit accounts are being missed, seller time is going into research and cleanup, or pipeline reviews depend too much on stories instead of current buying signals.',
    deliverables: [
      'Revenue value map and workflow redesign',
      'Custom account signal and trigger engine',
      'CRM enrichment, routing, and data quality automation',
      'Agent-assisted outreach, research, and follow-up workflows',
      'Pipeline analytics, forecast movement, and team performance dashboards',
      'Sales leadership cadence, adoption plan, and enablement',
    ],
    outcomes: [
      {
        value: 'Signal',
        label: 'Account Priority',
        description: 'Named buying triggers and scored accounts for seller action',
      },
      {
        value: '<48h',
        label: 'Response Target',
        description: 'A practical SLA for validated high-fit account events',
      },
      {
        value: 'Clean',
        label: 'CRM Hygiene',
        description: 'Missing fields, stale pursuits, and next actions surfaced',
      },
      {
        value: 'Weekly',
        label: 'Leader Review',
        description: 'Pipeline quality, rep follow-through, and trigger tuning cadence',
      },
    ],
    workflow: [
      {
        phase: 'Week 1-2',
        title: 'Diagnose',
        description: 'Audit current sales stack, data flows, and conversion bottlenecks.',
      },
      {
        phase: 'Week 3-4',
        title: 'Design',
        description: 'Define the trigger taxonomy, owner rules, CRM path, and review cadence.',
      },
      {
        phase: 'Week 5-8',
        title: 'Build',
        description:
          'Ship account scoring, rep briefs, routing, follow-up workflows, and analytics.',
      },
      {
        phase: 'Ongoing',
        title: 'Optimize',
        description: 'Review conversion quality, tune signals, and expand the motion that works.',
      },
    ],
  },
  {
    slug: 'performance-improvement',
    title: 'Performance Improvement',
    tagline: 'AI-enabled operating model redesign for speed, quality, and margin.',
    description:
      'We map how work actually moves, quantify the delays and error patterns, then build custom agents, workflow automations, analytics, and controls that remove drag without breaking the operating model.',
    icon: 'Cog',
    heroBg: '/images/abstract-dataflow.webp',
    idealClient:
      'Operations-heavy companies where managers are chasing status, exceptions are handled differently by each team, and margin is leaking through wait time, rework, expedite cost, or manual coordination.',
    deliverables: [
      'Operating model and process maturity assessment',
      'Bottleneck, exception, and margin leakage analysis',
      'Custom automation for priority workflow constraints',
      'Throughput, quality, and ownership dashboards',
      'Future-state SOPs, controls, and escalation rules',
      'Team training, adoption plan, and performance cadence',
    ],
    outcomes: [
      {
        value: 'Baseline',
        label: 'Cost Of Drag',
        description: 'Cycle time, rework, expedite cost, and manual coordination quantified',
      },
      {
        value: 'Owner',
        label: 'Exception Control',
        description: 'Every stuck item has a named owner, evidence, and next step',
      },
      {
        value: 'Gate',
        label: 'Quality Check',
        description: 'Work moves forward only when required inputs are complete',
      },
      {
        value: 'Live',
        label: 'Management View',
        description: 'Throughput, quality, blockers, and cost impact visible in one place',
      },
    ],
    workflow: [
      {
        phase: 'Week 1-2',
        title: 'Diagnose',
        description: 'Map current processes, measure baseline metrics, identify waste.',
      },
      {
        phase: 'Week 3-4',
        title: 'Design',
        description: 'Prioritize top-3 opportunities, design automation solutions.',
      },
      {
        phase: 'Week 5-8',
        title: 'Build',
        description: 'Ship routing, validation, summaries, dashboards, and integrations.',
      },
      {
        phase: 'Week 9+',
        title: 'Optimize',
        description: 'Monitor results, iterate, and expand to additional processes.',
      },
    ],
  },
  {
    slug: 'pe-value-creation',
    title: 'PE Value Creation',
    tagline: 'Portfolio AI strategy, build sprints, and repeatable value creation playbooks.',
    description:
      'We help sponsors and portfolio leaders set AI ambition, compare value levers across companies, build the first custom systems, and turn proven plays into a portfolio-wide operating capability.',
    icon: 'Rocket',
    heroBg: '/images/abstract-forge-progression.webp',
    idealClient:
      'PE firms and portfolio leaders who need a repeatable way to compare AI build candidates, fund the first sprint, and show adoption and KPI movement without asking each company to invent its own method.',
    deliverables: [
      'Portfolio AI ambition and value-creation thesis',
      'AI readiness and value lever assessment by company',
      '90-day custom build sprints tied to EBITDA levers',
      'Common operating playbooks for revenue, service, operations, and G&A',
      'Portfolio dashboard for adoption, run-rate value, and risk',
      'Exit narrative and AI asset documentation',
    ],
    outcomes: [
      {
        value: 'Ranked',
        label: 'Value Backlog',
        description: 'Portfolio companies compared by value, readiness, and sponsor pull',
      },
      {
        value: '90 days',
        label: 'To First System',
        description: 'A first workflow built, measured, and ready to reuse as a pattern',
      },
      {
        value: 'Board',
        label: 'Value Trace',
        description: 'Adoption, KPI movement, risk, and next wave tracked for sponsors',
      },
      {
        value: 'Reusable',
        label: 'Playbooks',
        description: 'Revenue, service, operations, reporting, and quality patterns codified',
      },
    ],
    workflow: [
      {
        phase: 'Week 1-2',
        title: 'Assess',
        description: 'Compare value pools, workflows, data readiness, sponsor ownership, and risk.',
      },
      {
        phase: 'Week 3-6',
        title: 'Sprint',
        description: 'Build one priority workflow with measurable adoption and KPI movement.',
      },
      {
        phase: 'Week 7-12',
        title: 'Scale',
        description: 'Package the pattern, train owners, and prepare the next company or function.',
      },
      {
        phase: 'Ongoing',
        title: 'Portfolio',
        description: 'Roll out proven playbooks to additional portfolio companies.',
      },
    ],
  },
  {
    slug: 'custom-ai-agents',
    title: 'Custom AI Agents',
    tagline:
      'Strategy, engineering, integration, and governance for agents built around your workflows.',
    description:
      'We design and build custom AI agents for complex, multi-step work across sales, operations, finance, service, and knowledge workflows. Not chatbots or generic copilots - working systems that integrate with your tools, escalate to people, and improve with use.',
    icon: 'Bot',
    heroBg: '/images/abstract-network.webp',
    idealClient:
      'Companies with recurring work that crosses systems, requires judgment, and breaks down when the handoff, evidence, approval, or exception path is not explicit.',
    deliverables: [
      'Agent strategy, workflow scope, and success metrics',
      'Custom agent architecture and orchestration design',
      'Integration with existing tools, documents, and data sources',
      'Decision logic, approvals, escalation paths, and guardrails',
      'Monitoring, observability, quality checks, and dashboards',
      'Runbooks, documentation, team onboarding, and governance',
    ],
    outcomes: [
      {
        value: 'Scoped',
        label: 'Workflow Boundary',
        description: 'Clear trigger, inputs, outputs, owner, and exception path before build',
      },
      {
        value: 'Reviewed',
        label: 'Human Control',
        description: 'Approval gates, confidence thresholds, and escalation rules built in',
      },
      {
        value: 'Observable',
        label: 'Quality Checks',
        description: 'Usage, errors, exceptions, audit trail, and output quality visible',
      },
      {
        value: 'Owned',
        label: 'Operating Cadence',
        description: 'A manager review rhythm so the system improves after launch',
      },
    ],
    workflow: [
      {
        phase: 'Week 1-2',
        title: 'Discover',
        description: 'Map target workflows, define agent scope and success criteria.',
      },
      {
        phase: 'Week 3-4',
        title: 'Architect',
        description: 'Design agent logic, integrations, and guardrails.',
      },
      {
        phase: 'Week 5-8',
        title: 'Build & Test',
        description: 'Develop the agent, integrate with systems, test edge cases, and train users.',
      },
      {
        phase: 'Ongoing',
        title: 'Evolve',
        description: 'Monitor performance, add capabilities, expand to new workflows.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
