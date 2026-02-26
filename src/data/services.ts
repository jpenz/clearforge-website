export type ServiceIcon = "LineChart" | "Cog" | "Rocket" | "Bot";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: ServiceIcon;
  idealClient: string;
  deliverables: string[];
  outcomes: { metric: string; description: string }[];
  workflow: { phase: string; title: string; description: string }[];
}

export const services: Service[] = [
  {
    slug: "ai-revenue-operations",
    title: "AI Revenue Operations",
    tagline: "Turn data into deals with AI-powered sales automation.",
    description:
      "We build AI-driven revenue engines that automate prospecting, surface intent signals, orchestrate personalized outreach, and give your team real-time pipeline analytics — so you close more, faster.",
    icon: "LineChart",
    idealClient:
      "B2B companies with $5M-$500M revenue looking to scale sales without linearly scaling headcount.",
    deliverables: [
      "AI-powered prospect identification and scoring",
      "Intent signal monitoring and alert system",
      "Automated outreach sequences with personalization",
      "Pipeline analytics dashboard with forecasting",
      "CRM enrichment and data hygiene automation",
      "Sales team enablement and training",
    ],
    outcomes: [
      { metric: "30% Pipeline Increase", description: "Average increase in qualified pipeline within 90 days" },
      { metric: "3.5x Conversion Lift", description: "Improvement in lead-to-opportunity conversion rates" },
      { metric: "15 hrs/week Saved", description: "Time saved per rep on manual prospecting tasks" },
      { metric: "60% Faster Response", description: "Reduction in lead response time with AI routing" },
    ],
    workflow: [
      { phase: "Week 1-2", title: "Diagnose", description: "Audit current sales stack, data flows, and conversion bottlenecks." },
      { phase: "Week 3-4", title: "Design", description: "Map ideal revenue architecture and AI integration points." },
      { phase: "Week 5-8", title: "Build", description: "Implement AI prospecting, outreach automation, and analytics." },
      { phase: "Ongoing", title: "Optimize", description: "A/B test, refine models, and scale what works." },
    ],
  },
  {
    slug: "performance-improvement",
    title: "Performance Improvement",
    tagline: "Find the waste. Fix the processes. Measure the results.",
    description:
      "We use process mining, operational diagnostics, and custom automation to find inefficiencies hiding in your workflows — then build solutions that eliminate them and deliver measurable cost savings.",
    icon: "Cog",
    idealClient:
      "Operations-heavy companies spending too much on manual processes, data entry, or coordination overhead.",
    deliverables: [
      "Process mining and bottleneck analysis",
      "Operational efficiency diagnostics",
      "Custom automation for top-3 identified opportunities",
      "Real-time performance dashboards",
      "Standard operating procedures documentation",
      "Team training and change management",
    ],
    outcomes: [
      { metric: "$240K Savings", description: "Average annual cost savings from process automation" },
      { metric: "40% Time Reduction", description: "Decrease in manual process completion time" },
      { metric: "95% Error Reduction", description: "Improvement in accuracy for automated workflows" },
      { metric: "2x Throughput", description: "Increase in processing capacity without additional headcount" },
    ],
    workflow: [
      { phase: "Week 1-2", title: "Diagnose", description: "Map current processes, measure baseline metrics, identify waste." },
      { phase: "Week 3-4", title: "Design", description: "Prioritize top-3 opportunities, design automation solutions." },
      { phase: "Week 5-8", title: "Build", description: "Implement automations, dashboards, and integrations." },
      { phase: "Week 9+", title: "Optimize", description: "Monitor results, iterate, and expand to additional processes." },
    ],
  },
  {
    slug: "pe-value-creation",
    title: "PE Value Creation",
    tagline: "AI-driven value creation for portfolio companies.",
    description:
      "We partner with PE firms and their portfolio companies to identify and execute AI-driven value creation levers — from 90-day sprints to portfolio-wide AI playbooks that drive EBITDA improvement from due diligence through exit prep.",
    icon: "Rocket",
    idealClient:
      "PE firms and their portfolio companies ($10M-$500M revenue) looking to accelerate value creation with AI.",
    deliverables: [
      "AI opportunity assessment and business case",
      "90-day value creation sprints",
      "Portfolio-wide AI playbook development",
      "EBITDA improvement initiatives",
      "Due diligence AI readiness evaluation",
      "Exit preparation: AI asset documentation",
    ],
    outcomes: [
      { metric: "10% EBITDA Lift", description: "Average EBITDA improvement across portfolio engagements" },
      { metric: "90-Day ROI", description: "Time from engagement start to measurable value delivery" },
      { metric: "3x Multiple Impact", description: "Contribution to valuation improvement at exit" },
      { metric: "5+ Use Cases", description: "AI applications identified per portfolio company" },
    ],
    workflow: [
      { phase: "Week 1-2", title: "Assess", description: "AI readiness evaluation, opportunity mapping, quick-win identification." },
      { phase: "Week 3-6", title: "Sprint", description: "Execute top-priority AI initiatives with measurable KPIs." },
      { phase: "Week 7-12", title: "Scale", description: "Expand wins across the organization, build internal capability." },
      { phase: "Ongoing", title: "Portfolio", description: "Roll out proven playbooks to additional portfolio companies." },
    ],
  },
  {
    slug: "custom-ai-agents",
    title: "Custom AI Agents",
    tagline: "Bespoke AI agents built for your specific workflows.",
    description:
      "We design and build custom AI agents that handle complex, multi-step workflows across sales, operations, and finance. Not chatbots — intelligent agents that take action, make decisions, and integrate with your existing systems.",
    icon: "Bot",
    idealClient:
      "Companies with complex, repetitive workflows that require judgment and cross-system coordination.",
    deliverables: [
      "Custom AI agent design and architecture",
      "Integration with existing tools and data sources",
      "Workflow orchestration and decision logic",
      "Monitoring and observability dashboards",
      "Guardrails and escalation protocols",
      "Documentation and team onboarding",
    ],
    outcomes: [
      { metric: "80% Automation", description: "Percentage of targeted workflow steps automated" },
      { metric: "24/7 Operation", description: "Agents work around the clock without fatigue or errors" },
      { metric: "10x Speed", description: "Improvement in workflow completion time vs. manual" },
      { metric: "99% Accuracy", description: "Decision accuracy with built-in quality checks" },
    ],
    workflow: [
      { phase: "Week 1-2", title: "Discover", description: "Map target workflows, define agent scope and success criteria." },
      { phase: "Week 3-4", title: "Architect", description: "Design agent logic, integrations, and guardrails." },
      { phase: "Week 5-8", title: "Build & Test", description: "Develop agent, integrate with systems, rigorous testing." },
      { phase: "Ongoing", title: "Evolve", description: "Monitor performance, add capabilities, expand to new workflows." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
