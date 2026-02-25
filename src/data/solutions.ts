export type JourneyStage = "UNDERSTAND" | "BUILD" | "OPERATE";
export type SolutionIcon = "Compass" | "Bot" | "Gauge" | "Layers" | "TrendingUp";

export interface Solution {
  slug: string;
  stage: JourneyStage;
  icon: SolutionIcon;
  title: string;
  shortTitle: string;
  tagline: string;
  headline: string;
  summary: string;
  rightForYou: string[];
  whatWeDo: string[];
  howItWorks: { phase: string; detail: string }[];
  scope: {
    timeline: string;
    team: string;
    deliverables: string[];
  };
  relatedCaseStudySlug: string;
  relatedCaseStudyTitle: string;
  faqs: { question: string; answer: string }[];
}

export const solutions: Solution[] = [
  {
    slug: "ai-strategy",
    stage: "UNDERSTAND",
    icon: "Compass",
    title: "AI Strategy & Growth Diagnosis",
    shortTitle: "AI Strategy",
    tagline: "Know where to win before you spend.",
    headline: "Turn AI ambiguity into a focused growth and execution agenda.",
    summary:
      "For leadership teams that know AI matters but need precision on where value exists, what to sequence first, and what to ignore.",
    rightForYou: [
      "You have multiple AI ideas but no shared prioritization logic.",
      "Your board or investors want a concrete AI value plan.",
      "Past pilots created activity but not measurable business outcomes.",
    ],
    whatWeDo: [
      "Quantify your AI value pools by workflow, function, and risk profile.",
      "Diagnose strategy to execution gaps that block pilot-to-production progress.",
      "Prioritize 30-60-90 day initiatives with clear owners and KPI targets.",
      "Build a practical operating plan that aligns leadership, technology, and workforce change.",
    ],
    howItWorks: [
      { phase: "Week 1", detail: "Leadership and operator interviews, baseline KPI mapping, and process signal review." },
      { phase: "Week 2", detail: "Opportunity sizing and feasibility scoring across growth, efficiency, and risk." },
      { phase: "Week 3", detail: "Target operating model design, governance structure, and initiative sequencing." },
      { phase: "Week 4", detail: "Executive readout with implementation blueprint and first-quarter workplan." },
    ],
    scope: {
      timeline: "2-4 weeks",
      team: "Senior strategy lead, AI architect, operations analyst",
      deliverables: [
        "AI opportunity map",
        "Initiative prioritization matrix",
        "90-day implementation plan",
        "Executive narrative and board-ready materials",
      ],
    },
    relatedCaseStudySlug: "industrial-manufacturer",
    relatedCaseStudyTitle: "Fortune 1000 Industrial Manufacturer",
    faqs: [
      {
        question: "Do we need a mature AI team first?",
        answer: "No. This engagement is designed for teams at the beginning or reset stage. We identify where internal capability is enough and where external support is needed.",
      },
      {
        question: "Will we leave with actionable next steps, not just strategy slides?",
        answer: "Yes. The output is a sequenced implementation plan with named owners, measurable goals, and operating cadence.",
      },
    ],
  },
  {
    slug: "ai-agents",
    stage: "BUILD",
    icon: "Bot",
    title: "AI Agent Design & Build",
    shortTitle: "AI Agents",
    tagline: "Deploy AI agents that work alongside your team.",
    headline: "Ship reliable AI agents into real workflows, not isolated demos.",
    summary:
      "We design, integrate, and launch production agents that handle specific jobs with clear human handoffs and measurable performance.",
    rightForYou: [
      "You already know which workflows need automation or augmentation.",
      "You need speed to production without cutting safety and quality controls.",
      "You want agents embedded in existing systems, not another disconnected tool.",
    ],
    whatWeDo: [
      "Design agent workflows with human-in-the-loop controls for critical decisions.",
      "Integrate agents with CRM, ERP, ticketing, and internal knowledge systems.",
      "Instrument quality, cycle time, and conversion metrics from day one.",
      "Train teams on operating with agents in daily execution.",
    ],
    howItWorks: [
      { phase: "Phase 1", detail: "Workflow mapping and agent design with acceptance criteria." },
      { phase: "Phase 2", detail: "Build, integration, and testing with production-like data." },
      { phase: "Phase 3", detail: "Launch with runbooks, escalation rules, and role enablement." },
      { phase: "Phase 4", detail: "30-day stabilization and optimization sprint." },
    ],
    scope: {
      timeline: "6-12 weeks",
      team: "AI engineer, integration engineer, workflow strategist, delivery lead",
      deliverables: [
        "Production agents and orchestration layer",
        "System integrations",
        "Operational runbooks",
        "Adoption and enablement plan",
      ],
    },
    relatedCaseStudySlug: "industrial-manufacturer",
    relatedCaseStudyTitle: "Fortune 1000 Industrial Manufacturer",
    faqs: [
      {
        question: "How do you prevent agent errors from damaging operations?",
        answer: "We set confidence thresholds, escalation paths, and human approvals on high-impact actions before launch.",
      },
      {
        question: "Can we start small and expand later?",
        answer: "Yes. We typically launch in one workflow first, prove value, and then extend the architecture to adjacent workflows.",
      },
    ],
  },
  {
    slug: "managed-operations",
    stage: "OPERATE",
    icon: "Gauge",
    title: "Managed AI Operations",
    shortTitle: "Managed Ops",
    tagline: "We run it. It gets smarter every cycle.",
    headline: "Operate, tune, and scale your AI systems with accountable performance ownership.",
    summary:
      "ClearForge runs AI workflows as an extension of your team, with ongoing optimization tied to business outcomes.",
    rightForYou: [
      "Your AI systems are live but performance is inconsistent.",
      "Internal teams are overloaded and cannot own continuous optimization.",
      "You need executive visibility and KPI accountability for AI operations.",
    ],
    whatWeDo: [
      "Run production AI workflows and monitor reliability, quality, and throughput.",
      "Optimize prompts, logic, models, and handoffs based on real operating data.",
      "Publish recurring executive performance reviews tied to your core KPIs.",
      "Expand working patterns to additional functions as outcomes compound.",
    ],
    howItWorks: [
      { phase: "Month 1", detail: "Baseline and service setup, KPI targets, and governance cadence." },
      { phase: "Monthly", detail: "Operate workflows, resolve issues, and tune performance." },
      { phase: "Quarterly", detail: "Portfolio review, roadmap updates, and expansion decisions." },
    ],
    scope: {
      timeline: "Monthly retainer",
      team: "Engagement lead, AI operator, analytics specialist, solution architect",
      deliverables: [
        "Operational dashboards",
        "Optimization backlog and releases",
        "Executive business reviews",
        "Quarterly scale plan",
      ],
    },
    relatedCaseStudySlug: "metro-detroit-services-company",
    relatedCaseStudyTitle: "Metro Detroit Services Company",
    faqs: [
      {
        question: "Do you replace our internal team?",
        answer: "No. We extend your team and transfer capability over time while maintaining execution momentum.",
      },
      {
        question: "How quickly should we expect measurable impact?",
        answer: "Most clients see measurable movement within the first 30-90 days, depending on data and workflow complexity.",
      },
    ],
  },
  {
    slug: "legacy-modernization",
    stage: "BUILD",
    icon: "Layers",
    title: "Legacy System Modernization",
    shortTitle: "Legacy Modernization",
    tagline: "Bridge your existing systems to AI.",
    headline: "Modernize high-friction legacy workflows without a risky rip-and-replace program.",
    summary:
      "We create integration and migration pathways that unlock AI value from existing systems while controlling delivery risk.",
    rightForYou: [
      "Core workflows depend on older ERP, on-prem, or fragmented spreadsheet systems.",
      "A full system replacement is too costly or too disruptive right now.",
      "You need AI-ready data and process flow in a phased program.",
    ],
    whatWeDo: [
      "Map dependencies and identify modernization choke points.",
      "Design bridge architecture between legacy systems and modern AI workflows.",
      "Execute phased upgrades for highest-value process areas first.",
      "Build governance and transition playbooks for safe scale-out.",
    ],
    howItWorks: [
      { phase: "Phase 1", detail: "Legacy stack and data flow assessment." },
      { phase: "Phase 2", detail: "Target architecture and phased modernization plan." },
      { phase: "Phase 3", detail: "Bridge build and pilot migration in priority workflows." },
      { phase: "Phase 4", detail: "Operational transition and expansion roadmap." },
    ],
    scope: {
      timeline: "8-20 weeks depending on stack complexity",
      team: "Modernization architect, integration engineer, data lead, delivery manager",
      deliverables: [
        "System dependency map",
        "Bridge architecture blueprint",
        "Phased migration workplan",
        "Operational transition controls",
      ],
    },
    relatedCaseStudySlug: "industrial-manufacturer",
    relatedCaseStudyTitle: "Fortune 1000 Industrial Manufacturer",
    faqs: [
      {
        question: "Do we have to replace everything to use AI effectively?",
        answer: "No. Most clients realize value faster by modernizing targeted workflows and building bridges around the existing core.",
      },
      {
        question: "How do you control risk during modernization?",
        answer: "We sequence by business criticality, use staged rollouts, and maintain rollback options for each transition phase.",
      },
    ],
  },
  {
    slug: "revenue-operations",
    stage: "OPERATE",
    icon: "TrendingUp",
    title: "AI Marketing & Revenue Operations",
    shortTitle: "Revenue Ops",
    tagline: "One application: your full revenue engine.",
    headline: "Unify demand generation, qualification, and pipeline operations with AI-enabled execution.",
    summary:
      "A managed operating model for revenue teams that need consistent pipeline performance and cleaner handoffs from marketing to sales.",
    rightForYou: [
      "Revenue is constrained by disconnected systems and inconsistent execution.",
      "Marketing and sales teams are misaligned on lead quality and follow-up.",
      "You need a single operating cadence for pipeline creation and conversion.",
    ],
    whatWeDo: [
      "Run SEO, paid, outbound, and CRM workflows in one coordinated operating model.",
      "Automate lead qualification and routing for faster response cycles.",
      "Create consistent revenue analytics across top-of-funnel to closed-won performance.",
      "Continuously optimize messaging, channels, and handoffs using live data.",
    ],
    howItWorks: [
      { phase: "Weeks 1-2", detail: "Baseline funnel and process diagnostics." },
      { phase: "Weeks 3-6", detail: "Workflow activation, automation, and instrumentation." },
      { phase: "Weeks 7-12", detail: "Optimization cycle and conversion lift experiments." },
      { phase: "Monthly", detail: "Ongoing managed operation and strategy refresh." },
    ],
    scope: {
      timeline: "3-6 month implementation, then monthly",
      team: "Revenue strategist, AI workflow operator, growth analyst, RevOps lead",
      deliverables: [
        "Revenue operating blueprint",
        "Channel and CRM automations",
        "Pipeline analytics cockpit",
        "Monthly optimization plan",
      ],
    },
    relatedCaseStudySlug: "metro-detroit-services-company",
    relatedCaseStudyTitle: "Metro Detroit Services Company",
    faqs: [
      {
        question: "Is this only for large teams?",
        answer: "No. We run this model for lean teams and larger organizations by matching automation depth to team capacity.",
      },
      {
        question: "Can this align with our existing sales process?",
        answer: "Yes. We map to your current process first, then improve constraints without forcing disruptive wholesale change.",
      },
    ],
  },
];

export const journeyStages: JourneyStage[] = ["UNDERSTAND", "BUILD", "OPERATE"];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export function getSolutionsByStage(stage: JourneyStage): Solution[] {
  return solutions.filter((solution) => solution.stage === stage);
}
