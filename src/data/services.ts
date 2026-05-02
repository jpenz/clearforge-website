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
      'Mid-market and growth-stage B2B companies looking to scale sales without linearly scaling headcount.',
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
        value: '30%',
        label: 'Pipeline Increase',
        description: 'Average increase in qualified pipeline within 90 days',
      },
      {
        value: '3.5x',
        label: 'Conversion Lift',
        description: 'Improvement in lead-to-opportunity conversion rates',
      },
      {
        value: '15 hrs',
        label: 'Per Rep / Week Saved',
        description: 'Time saved per rep on manual prospecting tasks',
      },
      {
        value: '60%',
        label: 'Faster Response',
        description: 'Reduction in lead response time with AI routing',
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
        description: 'Map ideal revenue architecture and AI integration points.',
      },
      {
        phase: 'Week 5-8',
        title: 'Build',
        description: 'Implement AI prospecting, outreach automation, and analytics.',
      },
      {
        phase: 'Ongoing',
        title: 'Optimize',
        description: 'A/B test, refine models, and scale what works.',
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
      'Operations-heavy companies spending too much on manual processes, data entry, or coordination overhead.',
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
        value: '$240K',
        label: 'Annual Savings',
        description: 'Average annual cost savings from process automation',
      },
      {
        value: '40%',
        label: 'Time Reduction',
        description: 'Decrease in manual process completion time',
      },
      {
        value: '95%',
        label: 'Error Reduction',
        description: 'Improvement in accuracy for automated workflows',
      },
      {
        value: '2x',
        label: 'Throughput',
        description: 'Increase in processing capacity without additional headcount',
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
        description: 'Implement automations, dashboards, and integrations.',
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
      'PE firms and their portfolio companies looking to accelerate value creation with AI.',
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
        value: '10%',
        label: 'EBITDA Lift',
        description: 'Average EBITDA improvement across portfolio engagements',
      },
      {
        value: '90 days',
        label: 'To First ROI',
        description: 'Time from engagement start to measurable value delivery',
      },
      {
        value: '3x',
        label: 'Multiple Impact',
        description: 'Contribution to valuation improvement at exit',
      },
      {
        value: '5+',
        label: 'Use Cases Identified',
        description: 'AI applications identified per portfolio company',
      },
    ],
    workflow: [
      {
        phase: 'Week 1-2',
        title: 'Assess',
        description: 'AI readiness evaluation, opportunity mapping, quick-win identification.',
      },
      {
        phase: 'Week 3-6',
        title: 'Sprint',
        description: 'Execute top-priority AI initiatives with measurable KPIs.',
      },
      {
        phase: 'Week 7-12',
        title: 'Scale',
        description: 'Expand wins across the organization, build internal capability.',
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
      'Companies with complex, repetitive workflows that require judgment and cross-system coordination.',
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
        value: '80%',
        label: 'Automation',
        description: 'Percentage of targeted workflow steps automated',
      },
      {
        value: '24/7',
        label: 'Operation',
        description: 'Agents work around the clock without fatigue or errors',
      },
      {
        value: '10x',
        label: 'Speed',
        description: 'Improvement in workflow completion time vs. manual',
      },
      {
        value: '99%',
        label: 'Accuracy',
        description: 'Decision accuracy with built-in quality checks',
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
        description: 'Develop agent, integrate with systems, rigorous testing.',
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
