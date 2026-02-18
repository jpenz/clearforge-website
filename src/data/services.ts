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
    slug: "ai-strategy",
    title: "AI Strategy & Market Intelligence",
    tagline: "Know where AI creates the most value before you spend a dollar building.",
    description:
      "We conduct deep market studies, competitive landscape analysis, and AI opportunity mapping to build a strategic roadmap that prioritizes the highest-ROI initiatives. This isn't a generic AI maturity assessment. It's a custom strategy built from your market position, your data assets, and your competitive threats.",
    icon: "Search",
    idealClient:
      "CEOs, COOs, and PE operating partners who need to know where AI fits in their business before committing capital.",
    deliverables: [
      "Market and competitive intelligence study",
      "AI opportunity map with ROI projections",
      "Process-by-process redesign recommendations (designed for AI, not just automated)",
      "Strategic roadmap with phased execution plan",
      "Board-ready presentation with business case",
      "Vendor and build-vs-buy analysis",
    ],
    outcomes: [
      { metric: "5+ Use Cases", description: "High-ROI AI opportunities identified per engagement" },
      { metric: "4 Weeks", description: "From kickoff to board-ready strategic roadmap" },
      { metric: "3x Pipeline", description: "Average new revenue pipeline from market intelligence" },
      { metric: "$2M+ TAM", description: "New addressable market identified per study" },
    ],
    workflow: [
      { phase: "Week 1", title: "Discover", description: "Stakeholder interviews, data audit, market scan, competitive landscape." },
      { phase: "Week 2", title: "Analyze", description: "Process mapping, AI opportunity scoring, ROI modeling." },
      { phase: "Week 3", title: "Design", description: "AI-first process redesign, strategic roadmap, phased plan." },
      { phase: "Week 4", title: "Deliver", description: "Board presentation, business case, execution recommendations." },
    ],
  },
  {
    slug: "ai-design-build",
    title: "AI Design & Build",
    tagline: "Production AI systems that ship on schedule and deliver on the business case.",
    description:
      "We architect and build custom AI systems end-to-end: from data infrastructure and model development to workflow integration and production deployment. Every system is designed around the business outcome it needs to deliver, with built-in measurement from day one.",
    icon: "Rocket",
    idealClient:
      "Companies with a clear AI opportunity who need senior engineering talent to design, build, and deploy production systems.",
    deliverables: [
      "System architecture and technical design",
      "Custom AI agents and workflow automation",
      "Data pipeline and integration engineering",
      "Production deployment with monitoring",
      "Performance dashboards tied to business KPIs",
      "Full documentation and team onboarding",
    ],
    outcomes: [
      { metric: "80% Automation", description: "Average workflow automation rate for targeted processes" },
      { metric: "6-8 Weeks", description: "Typical time from design to production deployment" },
      { metric: "$240K Savings", description: "Average annual cost savings from deployed systems" },
      { metric: "10x Speed", description: "Improvement in process completion time vs. manual" },
    ],
    workflow: [
      { phase: "Week 1-2", title: "Discover", description: "Requirements gathering, data assessment, architecture design." },
      { phase: "Week 3-4", title: "Design", description: "AI-first process redesign, system architecture, integration mapping." },
      { phase: "Week 5-7", title: "Build", description: "Development, integration, testing, and iteration." },
      { phase: "Week 8", title: "Deploy", description: "Production launch, monitoring setup, team training." },
    ],
  },
  {
    slug: "managed-ai-operations",
    title: "Managed AI Operations",
    tagline: "Your AI gets smarter every month. We make sure of it.",
    description:
      "AI systems depreciate the moment you stop optimizing them. We run continuous operations: model retraining, market monitoring, performance optimization, and proactive improvements. Your AI compounds in value while your team focuses on the business.",
    icon: "BarChart3",
    idealClient:
      "Companies with deployed AI systems who want continuous optimization without building an in-house AI ops team.",
    deliverables: [
      "Monthly model retraining on fresh data",
      "Continuous market and competitive intelligence monitoring",
      "AI performance reporting and optimization",
      "Proactive system improvements and new feature deployment",
      "Quarterly strategic reviews with executive team",
      "24/7 system monitoring and incident response",
    ],
    outcomes: [
      { metric: "15%/Quarter", description: "Average performance improvement from continuous optimization" },
      { metric: "99.9% Uptime", description: "System reliability with proactive monitoring" },
      { metric: "Monthly", description: "Frequency of model retraining and intelligence updates" },
      { metric: "0 FTEs", description: "Internal headcount needed to manage AI operations" },
    ],
    workflow: [
      { phase: "Month 1", title: "Baseline", description: "Establish performance benchmarks, monitoring, and reporting cadence." },
      { phase: "Monthly", title: "Optimize", description: "Retrain models, update intelligence, deploy improvements." },
      { phase: "Quarterly", title: "Review", description: "Strategic review, market update, roadmap adjustments." },
      { phase: "Ongoing", title: "Monitor", description: "24/7 system health, anomaly detection, proactive maintenance." },
    ],
  },
  {
    slug: "ai-readiness-assessment",
    title: "AI Readiness Assessment",
    tagline: "The fastest way to know if your business is ready for AI.",
    description:
      "A structured 4-week diagnostic that evaluates your data maturity, process readiness, team capability, and competitive position. You get a scored assessment across 5 pillars with a specific, prioritized action plan. Low-risk, high-clarity starting point.",
    icon: "Search",
    idealClient:
      "Business leaders who suspect AI could help but aren't sure where to start or how ready their organization is.",
    deliverables: [
      "AI readiness scorecard across 5 pillars",
      "Data maturity and infrastructure evaluation",
      "Process automation opportunity identification",
      "Competitive AI landscape assessment",
      "Prioritized 90-day action plan",
      "Executive presentation with recommendations",
    ],
    outcomes: [
      { metric: "$15K", description: "Fixed-price engagement with no surprises" },
      { metric: "4 Weeks", description: "From kickoff to delivered assessment" },
      { metric: "90-Day Plan", description: "Specific, prioritized action items you can execute immediately" },
      { metric: "5 Pillars", description: "Comprehensive evaluation across data, process, team, tech, and market" },
    ],
    workflow: [
      { phase: "Week 1", title: "Discover", description: "Stakeholder interviews, data audit, current-state documentation." },
      { phase: "Week 2", title: "Assess", description: "5-pillar scoring, gap analysis, opportunity identification." },
      { phase: "Week 3", title: "Design", description: "Roadmap development, prioritization, business case modeling." },
      { phase: "Week 4", title: "Deliver", description: "Executive presentation, scored assessment, 90-day action plan." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
