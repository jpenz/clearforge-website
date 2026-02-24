export type ServiceIcon = "Search" | "PenTool" | "Rocket" | "BarChart3" | "Bot";

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
    slug: "growth-strategy-diagnosis",
    title: "Growth Strategy & Diagnosis",
    tagline: "Know where to win before you spend.",
    description:
      "Our entry point engagement combines strategic diagnosis with AI opportunity mapping. We assess market position, competitive pressure, operating bottlenecks, and the AI use cases that can move results fastest.",
    icon: "Search",
    idealClient:
      "PE operating partners, portfolio company CEOs, and owners who need decision clarity before committing implementation budget.",
    deliverables: [
      "Market and competitive position assessment",
      "Operational gap analysis across revenue and delivery workflows",
      "Prioritized AI opportunity stack with impact and feasibility",
      "Board-ready strategy pack with clear sequencing",
      "30-60-90 day execution roadmap",
      "Investment guidance on what to build now vs later",
    ],
    outcomes: [
      { metric: "$15K", description: "Fixed engagement fee" },
      { metric: "4 Weeks", description: "From kickoff to board-ready strategy" },
      { metric: "Prioritized", description: "Opportunities ranked by business impact" },
      { metric: "Decision-Ready", description: "Leadership clarity on where AI should be deployed" },
    ],
    workflow: [
      { phase: "Week 1", title: "Diagnose", description: "Interview leaders and map current commercial and operational constraints." },
      { phase: "Week 2", title: "Analyze", description: "Assess market position, process friction, and AI readiness by function." },
      { phase: "Week 3", title: "Prioritize", description: "Score opportunities by value, speed to impact, and delivery risk." },
      { phase: "Week 4", title: "Decide", description: "Deliver the roadmap, operating model, and implementation priorities." },
    ],
  },
  {
    slug: "ai-design-build",
    title: "AI Design & Build",
    tagline: "Production systems, not prototypes.",
    description:
      "When priorities are clear, we design and build production AI systems tied to real workflows. This includes custom agents, workflow automation, and integrations with the systems your team already depends on.",
    icon: "Rocket",
    idealClient:
      "Companies that know what they need to build and want working AI in production within a defined delivery window.",
    deliverables: [
      "Solution architecture tied to strategy priorities",
      "Custom AI agent and workflow implementation",
      "Integration with CRM, ERP, and core operating tools",
      "Launch instrumentation and KPI monitoring",
      "Operational documentation and enablement",
      "Post-launch stabilization and iteration plan",
    ],
    outcomes: [
      { metric: "$50K-$100K", description: "Typical engagement range" },
      { metric: "6-8 Weeks", description: "From design to production deployment" },
      { metric: "Production", description: "Daily-use systems launched with your team" },
      { metric: "Integrated", description: "Connected to existing operating infrastructure" },
    ],
    workflow: [
      { phase: "Weeks 1-2", title: "Design", description: "Finalize architecture, integration plan, and acceptance criteria." },
      { phase: "Weeks 3-5", title: "Build", description: "Implement agents, automation workflows, and controls." },
      { phase: "Weeks 6-7", title: "Validate", description: "Run live testing with operating users and real data." },
      { phase: "Week 8", title: "Deploy", description: "Launch to production with adoption support and monitoring." },
    ],
  },
  {
    slug: "managed-ai-operations",
    title: "Managed AI Operations",
    tagline: "We run the systems so your team can run the business.",
    description:
      "We operate, optimize, and evolve your AI systems continuously. You get performance visibility, ongoing improvements, and accountable delivery without building a dedicated AI operations team internally.",
    icon: "BarChart3",
    idealClient:
      "Leadership teams that want measurable outcomes from AI without the overhead of maintaining AI operations in-house.",
    deliverables: [
      "Managed operation of AI workflows and agents",
      "Continuous optimization and performance tuning",
      "Reliability monitoring and issue response",
      "Executive reporting with live operational visibility",
      "Quarterly roadmap evolution tied to business priorities",
      "Governance cadence with leadership stakeholders",
    ],
    outcomes: [
      { metric: "$15K+/mo", description: "Managed AI operations retainers" },
      { metric: "Ongoing", description: "Continuous operation and optimization cadence" },
      { metric: "Real-Time", description: "Executive visibility into performance" },
      { metric: "Compounding", description: "Systems improve with every operating cycle" },
    ],
    workflow: [
      { phase: "Month 1", title: "Stand Up", description: "Align goals, reporting, controls, and service cadence." },
      { phase: "Monthly", title: "Operate", description: "Run production workflows and maintain service reliability." },
      { phase: "Monthly", title: "Optimize", description: "Improve conversion, efficiency, and quality metrics." },
      { phase: "Quarterly", title: "Evolve", description: "Expand or shift scope as business priorities change." },
    ],
  },
  {
    slug: "legacy-system-modernization",
    title: "Legacy System Modernization",
    tagline: "Make legacy infrastructure AI-ready without ripping everything out.",
    description:
      "For companies running on COBOL, mainframes, aging ERP stacks, or spreadsheet-heavy workflows, we modernize the operating layer so AI can create value where it matters most.",
    icon: "PenTool",
    idealClient:
      "Established businesses that need AI value from legacy systems without a high-risk full replacement program.",
    deliverables: [
      "Legacy system and data flow assessment",
      "Integration architecture for AI-ready workflows",
      "Phased modernization plan with risk controls",
      "Targeted migration of high-friction processes",
      "Operational bridge patterns for old and new systems",
      "Governance and change management support",
    ],
    outcomes: [
      { metric: "Custom", description: "Pricing based on system complexity" },
      { metric: "Phased", description: "Incremental modernization to reduce risk" },
      { metric: "AI-Ready", description: "Critical workflows prepared for AI deployment" },
      { metric: "No Rip-and-Replace", description: "Value delivered without full stack replacement" },
    ],
    workflow: [
      { phase: "Phase 1", title: "Assess", description: "Map legacy systems, dependencies, and operational risk points." },
      { phase: "Phase 2", title: "Design", description: "Define modernization architecture and integration approach." },
      { phase: "Phase 3", title: "Implement", description: "Execute prioritized upgrades and workflow transitions." },
      { phase: "Phase 4", title: "Scale", description: "Extend modernization pattern across additional functions." },
    ],
  },
  {
    slug: "ai-marketing-revenue-operations",
    title: "AI Marketing & Revenue Operations",
    tagline: "One application of the platform: a full-cycle revenue engine.",
    description:
      "This is a specific application of our Managed AI Operations model. We deploy and run AI-powered marketing and revenue workflows across SEO, paid media, outreach, CRM, and pipeline operations.",
    icon: "Bot",
    idealClient:
      "CMOs, revenue leaders, and operators who need one accountable system for demand generation and pipeline execution.",
    deliverables: [
      "Revenue strategy tied to growth targets",
      "Always-on SEO, paid media, and content operations",
      "Lead intelligence and outbound workflow automation",
      "CRM and pipeline process integration",
      "Conversion optimization across site and landing journeys",
      "Executive reporting and weekly optimization cycle",
    ],
    outcomes: [
      { metric: "$3K-$25K/mo", description: "Tiered service levels by scope" },
      { metric: "90 Days", description: "Ramp period before month-to-month cadence" },
      { metric: "Full-Cycle", description: "From demand generation through pipeline management" },
      { metric: "Application", description: "Delivered as part of the broader AI platform" },
    ],
    workflow: [
      { phase: "Weeks 1-2", title: "Baseline", description: "Audit current funnel, channel mix, and pipeline flow." },
      { phase: "Weeks 3-4", title: "Launch", description: "Activate channel operations, automation, and tracking." },
      { phase: "Weeks 5-12", title: "Stabilize", description: "Tune messaging, conversion points, and sales handoff." },
      { phase: "Ongoing", title: "Scale", description: "Expand channels and workflows based on performance." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
