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
    tagline: 'Turn data into deals with AI-powered sales automation.',
    description:
      'We build AI-driven revenue engines that automate prospecting, surface intent signals, orchestrate personalized outreach, and give your team real-time pipeline analytics — so you close more, faster.',
    icon: 'LineChart',
    heroBg: '/images/abstract-value-creation.webp',
    idealClient:
      'Mid-market and growth-stage B2B companies looking to scale sales without linearly scaling headcount.',
    deliverables: [
      'AI-powered prospect identification and scoring',
      'Intent signal monitoring and alert system',
      'Automated outreach sequences with personalization',
      'Pipeline analytics dashboard with forecasting',
      'CRM enrichment and data hygiene automation',
      'Sales team enablement and training',
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
    tagline: 'Find the waste. Fix the processes. Measure the results.',
    description:
      'We use process mining, operational diagnostics, and custom automation to find inefficiencies hiding in your workflows — then build solutions that eliminate them and deliver measurable cost savings.',
    icon: 'Cog',
    heroBg: '/images/abstract-dataflow.webp',
    idealClient:
      'Operations-heavy companies spending too much on manual processes, data entry, or coordination overhead.',
    deliverables: [
      'Process mining and bottleneck analysis',
      'Operational efficiency diagnostics',
      'Custom automation for top-3 identified opportunities',
      'Real-time performance dashboards',
      'Standard operating procedures documentation',
      'Team training and change management',
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
    tagline: 'AI-driven value creation for portfolio companies.',
    description:
      'We partner with PE firms and their portfolio companies to identify and execute AI-driven value creation levers — from 90-day sprints to portfolio-wide AI playbooks that drive EBITDA improvement from due diligence through exit prep.',
    icon: 'Rocket',
    heroBg: '/images/abstract-forge-progression.webp',
    idealClient:
      'PE firms and their portfolio companies looking to accelerate value creation with AI.',
    deliverables: [
      'AI opportunity assessment and business case',
      '90-day value creation sprints',
      'Portfolio-wide AI playbook development',
      'EBITDA improvement initiatives',
      'Due diligence AI readiness evaluation',
      'Exit preparation: AI asset documentation',
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
    tagline: 'Bespoke AI agents built for your specific workflows.',
    description:
      'We design and build custom AI agents that handle complex, multi-step workflows across sales, operations, and finance. Not chatbots — intelligent agents that take action, make decisions, and integrate with your existing systems.',
    icon: 'Bot',
    heroBg: '/images/abstract-network.webp',
    idealClient:
      'Companies with complex, repetitive workflows that require judgment and cross-system coordination.',
    deliverables: [
      'Custom AI agent design and architecture',
      'Integration with existing tools and data sources',
      'Workflow orchestration and decision logic',
      'Monitoring and observability dashboards',
      'Guardrails and escalation protocols',
      'Documentation and team onboarding',
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
