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
    slug: "ai-marketing-agent",
    title: "AI Marketing Agent",
    tagline: "A full marketing program that runs continuously and improves every week.",
    description:
      "We deploy and operate an AI-powered marketing engine that covers strategy, execution, reporting, and optimization. It is designed for companies that need reliable pipeline growth without building a large in-house marketing team.",
    icon: "Bot",
    idealClient:
      "PE-backed operators, CMOs, and owners who need a complete marketing function with board-level accountability.",
    deliverables: [
      "Full-funnel campaign strategy and execution",
      "Always-on paid media, SEO, and content operations",
      "Lead intelligence, scoring, and coordinated outreach",
      "Conversion-focused landing pages and website optimization",
      "Real-time performance dashboard with executive views",
      "Weekly optimization cycle and quarterly growth planning",
    ],
    outcomes: [
      { metric: "$3K-$25K/mo", description: "Tiered monthly retainers based on scope" },
      { metric: "90 Days", description: "Initial ramp before month-to-month engagement" },
      { metric: "24/7", description: "Campaign and pipeline coverage across channels" },
      { metric: "Real-Time", description: "Performance visibility for leadership" },
    ],
    workflow: [
      { phase: "Weeks 1-2", title: "Audit + Plan", description: "Baseline current channels, pipeline, and conversion blockers." },
      { phase: "Weeks 3-4", title: "Launch", description: "Activate campaigns, tracking, and lead handling workflows." },
      { phase: "Weeks 5-12", title: "Stabilize", description: "Tune messaging, creative, audience targeting, and follow-up cadence." },
      { phase: "Ongoing", title: "Scale", description: "Expand channels and playbooks based on conversion and revenue signals." },
    ],
  },
  {
    slug: "ai-strategy",
    title: "AI Strategy & Market Intelligence",
    tagline: "Know where AI creates value before you commit serious capital.",
    description:
      "A focused strategy engagement that maps your highest-impact AI opportunities, competitive risks, and execution sequence. You leave with a board-ready roadmap tied to business outcomes.",
    icon: "Search",
    idealClient:
      "PE operating partners, CEOs, and leadership teams that need investment clarity before building.",
    deliverables: [
      "Market and competitive AI landscape assessment",
      "Process-level opportunity map and prioritization",
      "Business-case assumptions and ROI logic",
      "Phased roadmap with sequencing and owners",
      "Board-ready strategy pack",
      "Build vs. buy recommendation set",
    ],
    outcomes: [
      { metric: "$15K", description: "Fixed engagement fee" },
      { metric: "4 Weeks", description: "Typical timeline from kickoff to roadmap" },
      { metric: "Prioritized", description: "Clear list of initiatives by impact and feasibility" },
      { metric: "Board-Ready", description: "Decision material leadership can act on" },
    ],
    workflow: [
      { phase: "Week 1", title: "Discover", description: "Interview stakeholders and document current-state constraints." },
      { phase: "Week 2", title: "Analyze", description: "Assess market signals, process friction, and data readiness." },
      { phase: "Week 3", title: "Prioritize", description: "Score initiatives by impact, speed, and implementation risk." },
      { phase: "Week 4", title: "Decide", description: "Deliver execution roadmap and investment recommendation." },
    ],
  },
  {
    slug: "ai-design-build",
    title: "AI Design & Build (Performance Sprint)",
    tagline: "Ship production AI systems in 6-8 weeks.",
    description:
      "A focused build sprint for teams that already know where AI should be applied. We design, build, integrate, and launch production systems tied to defined operational or revenue goals.",
    icon: "Rocket",
    idealClient:
      "Companies that need a working AI system in production, not a prototype or proof-of-concept.",
    deliverables: [
      "Solution architecture and delivery plan",
      "Custom AI agent and workflow implementation",
      "Integration with core operating systems",
      "Launch monitoring and failure handling",
      "Team enablement and handoff documentation",
      "Post-launch optimization window",
    ],
    outcomes: [
      { metric: "$50K-$100K", description: "Typical engagement range" },
      { metric: "6-8 Weeks", description: "From design to production launch" },
      { metric: "Production", description: "Systems built for daily operating use" },
      { metric: "Instrumented", description: "KPI tracking built into delivery" },
    ],
    workflow: [
      { phase: "Weeks 1-2", title: "Design", description: "Define architecture, integrations, and acceptance criteria." },
      { phase: "Weeks 3-5", title: "Build", description: "Implement agents, workflows, and quality controls." },
      { phase: "Weeks 6-7", title: "Validate", description: "Run live tests with real data and user feedback." },
      { phase: "Week 8", title: "Launch", description: "Deploy to production and operationalize with your team." },
    ],
  },
  {
    slug: "ai-agent-retainer",
    title: "AI Agent Retainer",
    tagline: "Ongoing AI development with full code ownership.",
    description:
      "An embedded monthly model for companies that want continuous AI development and optimization while retaining ownership of everything built.",
    icon: "PenTool",
    idealClient:
      "Operators who want a standing AI build team without hiring one internally.",
    deliverables: [
      "Monthly development capacity for new agents",
      "Enhancements to existing production systems",
      "Strategic prioritization with leadership",
      "Performance monitoring and optimization",
      "Documentation and handoff-ready code",
      "Quarterly roadmap updates",
    ],
    outcomes: [
      { metric: "$15K/mo", description: "Standard monthly retainer" },
      { metric: "You Own It", description: "Code, documentation, and implementation IP" },
      { metric: "Weekly", description: "Operating cadence with leadership and operators" },
      { metric: "Ongoing", description: "Continuous releases and optimization" },
    ],
    workflow: [
      { phase: "Month 1", title: "Prioritize", description: "Define immediate build queue and operating rhythm." },
      { phase: "Monthly", title: "Build", description: "Ship new capabilities and improve existing systems." },
      { phase: "Monthly", title: "Review", description: "Assess performance and reset priorities." },
      { phase: "Quarterly", title: "Plan", description: "Align roadmap with business goals and market shifts." },
    ],
  },
  {
    slug: "managed-ai-services",
    title: "Managed AI Services",
    tagline: "We build and run your AI systems as an operating service.",
    description:
      "For teams that want outcomes without managing AI infrastructure and operations internally. We own delivery and ongoing operations while your team focuses on the business.",
    icon: "BarChart3",
    idealClient:
      "Companies that need AI capability but do not want to maintain an internal AI operations team.",
    deliverables: [
      "Solution build and deployment",
      "Managed hosting, monitoring, and maintenance",
      "Model refresh and performance tuning",
      "Service reporting and governance reviews",
      "Security and reliability oversight",
      "Scalable monthly operating model",
    ],
    outcomes: [
      { metric: "Custom", description: "Monthly scope based on complexity" },
      { metric: "Managed", description: "Ongoing operation handled by ClearForge" },
      { metric: "Predictable", description: "Consistent monthly service model" },
      { metric: "Flexible", description: "Scope expands as business priorities evolve" },
    ],
    workflow: [
      { phase: "Month 1", title: "Stand Up", description: "Finalize scope, controls, and reporting cadence." },
      { phase: "Month 2", title: "Operate", description: "Run production systems and user support routines." },
      { phase: "Monthly", title: "Optimize", description: "Tune performance and deploy improvements." },
      { phase: "Quarterly", title: "Evolve", description: "Adjust service roadmap to match business changes." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
