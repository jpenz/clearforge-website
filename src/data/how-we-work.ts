export interface EngagementModel {
  title: string;
  scope: string;
  timeline: string;
  bestFor: string;
  includes: string[];
}

export const engagementModels: EngagementModel[] = [
  {
    title: "AI Strategy Sprint",
    scope: "Rapid assessment, opportunity prioritization, and implementation roadmap",
    timeline: "2-4 weeks",
    bestFor: "Companies exploring AI for the first time",
    includes: [
      "Leadership interviews and workflow diagnostics",
      "AI opportunity map with impact/feasibility scoring",
      "90-day implementation plan",
      "Executive readout and governance recommendations",
    ],
  },
  {
    title: "Transformation Design",
    scope: "Deep-dive strategy and implementation architecture",
    timeline: "6-8 weeks",
    bestFor: "Companies ready to invest in AI",
    includes: [
      "Target operating model for AI-enabled workflows",
      "Technology and integration architecture",
      "Workforce and change management plan",
      "Delivery sequencing with risk controls",
    ],
  },
  {
    title: "AI Implementation",
    scope: "Hands-on build, deployment, and team enablement",
    timeline: "3-6 months",
    bestFor: "Companies building AI systems",
    includes: [
      "Agent and workflow build",
      "System integration and testing",
      "Launch support and performance instrumentation",
      "Role enablement and runbooks",
    ],
  },
  {
    title: "Managed AI Advisory",
    scope: "Ongoing AI operations, optimization, and strategy refresh",
    timeline: "Monthly",
    bestFor: "Companies scaling AI across the organization",
    includes: [
      "Monthly operations and optimization cadence",
      "Executive KPI reviews",
      "Roadmap evolution and expansion planning",
      "Governance and adoption support",
    ],
  },
];

export const firstWeekPlan = [
  "Kickoff with leadership and operating stakeholders",
  "Access setup for systems, workflows, and reporting baselines",
  "Initial opportunity and risk scan across priority functions",
  "Definition of success metrics and communication cadence",
  "Week-2 workplan with decision checkpoints",
];

export const howWeWorkFaqs = [
  {
    question: "How are engagements scoped?",
    answer:
      "Each engagement is scoped to your business context, systems, and goals. We align scope to measurable outcomes and operating constraints before work begins.",
  },
  {
    question: "Do you publish fixed pricing?",
    answer:
      "No. Our engagements are scoped to your needs. Most clients start with an AI Strategy Sprint, then expand based on results.",
  },
  {
    question: "Can we combine models?",
    answer:
      "Yes. Many clients begin with strategy or transformation design, then move into implementation and managed advisory as the operating model matures.",
  },
  {
    question: "Who works on the engagement?",
    answer:
      "Every engagement is senior-led by a cross-functional team spanning strategy, AI implementation, and operations."
  },
];
