export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  hero: string;
  overview: string[];
  challenges: string[];
  useCases: string[];
  caseStudySlug: string;
  caseStudyTitle: string;
  relatedInsights: string[];
}

export const deepIndustries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    shortName: "Manufacturing",
    hero: "Apply AI to throughput, planning, and commercial execution without disrupting critical operations.",
    overview: [
      "Manufacturers are balancing margin pressure, volatile demand, and workforce constraints while operating on complex system landscapes. AI can create significant leverage, but only when deployed inside real production and commercial workflows.",
      "ClearForge helps manufacturers prioritize where AI changes operating economics first, then build and run those systems with measurable accountability.",
    ],
    challenges: [
      "Siloed operational and commercial data across plants, divisions, and regions",
      "Manual planning and reporting cycles that slow response to demand shifts",
      "Legacy systems that make modern AI workflows difficult to deploy",
      "Frontline adoption issues when new tools disrupt established routines",
    ],
    useCases: [
      "Sales intelligence and territory prioritization across business units",
      "Predictive maintenance and downtime risk triage",
      "Automated quality exception monitoring",
      "Planning assistant workflows for sourcing and inventory decisions",
    ],
    caseStudySlug: "industrial-manufacturer",
    caseStudyTitle: "Fortune 1000 Industrial Manufacturer",
    relatedInsights: ["widening-ai-value-gap", "legacy-systems-ai-bridge"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortName: "Professional Services",
    hero: "Increase billable capacity and client responsiveness by redesigning delivery workflows with AI.",
    overview: [
      "Professional services firms succeed on speed, quality, and trust. AI can accelerate proposal workflows, delivery operations, and account intelligence, but only when governance and quality controls stay strong.",
      "We help firms build practical hybrid workforce models where teams and AI agents collaborate without compromising client outcomes.",
    ],
    challenges: [
      "Consultants and analysts overloaded with manual prep and reporting work",
      "Inconsistent delivery quality across teams and offices",
      "Difficulty scaling expertise across client engagements",
      "Pressure to improve utilization while reducing burnout",
    ],
    useCases: [
      "Proposal and statement-of-work acceleration workflows",
      "Research and synthesis agents for account teams",
      "Automated project status and risk reporting",
      "Client onboarding and service handoff orchestration",
    ],
    caseStudySlug: "metro-detroit-services-company",
    caseStudyTitle: "Metro Detroit Services Company",
    relatedInsights: ["ai-agents-new-workforce", "hybrid-workforce-playbook"],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    shortName: "Financial Services",
    hero: "Drive speed and consistency in risk, operations, and client-facing workflows while keeping controls intact.",
    overview: [
      "Financial services teams face constant pressure to improve responsiveness while maintaining compliance and trust. AI can improve cycle time and service quality, but deployment discipline is essential.",
      "ClearForge supports controlled AI adoption in workflows where reliability, auditability, and measurable impact matter most.",
    ],
    challenges: [
      "Manual document and workflow processing bottlenecks",
      "High-volume client operations with uneven service levels",
      "Regulatory and governance constraints slowing experimentation",
      "Fragmented data environments across core systems",
    ],
    useCases: [
      "Intelligent document intake and triage",
      "Risk and exception summarization workflows",
      "Client operations assistants for onboarding and service requests",
      "Portfolio analytics automation and insight generation",
    ],
    caseStudySlug: "industrial-manufacturer",
    caseStudyTitle: "Fortune 1000 Industrial Manufacturer",
    relatedInsights: ["why-ai-pilots-fail-5-things-work", "widening-ai-value-gap"],
  },
  {
    slug: "pe-portfolio",
    name: "PE Portfolio Companies",
    shortName: "PE Portfolios",
    hero: "Deploy repeatable AI value creation plays across portfolio companies with tighter execution control.",
    overview: [
      "Operating partners need measurable value creation within hold periods, not isolated innovation projects. The opportunity is highest when initiatives are repeatable and linked to EBITDA levers.",
      "We help portfolio and operating teams identify cross-portfolio patterns, prioritize high-return use cases, and execute quickly with clear governance.",
    ],
    challenges: [
      "AI initiatives scattered across portfolio companies without common playbooks",
      "Difficulty prioritizing opportunities by speed-to-value and complexity",
      "Limited internal bandwidth to run implementation and change management",
      "Inconsistent measurement of AI impact against value creation goals",
    ],
    useCases: [
      "Portfolio-wide AI opportunity diagnostics",
      "Shared agent frameworks for revenue and operations workflows",
      "Monthly performance cadence and operating reviews",
      "Exit-readiness narratives supported by operating KPI improvements",
    ],
    caseStudySlug: "metro-detroit-services-company",
    caseStudyTitle: "Metro Detroit Services Company",
    relatedInsights: ["widening-ai-value-gap", "hybrid-workforce-playbook"],
  },
];

export const broadIndustries = [
  "Healthcare",
  "Distribution",
  "Technology",
  "Legal",
  "Business Services",
  "Construction",
  "Logistics",
  "Energy",
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return deepIndustries.find((industry) => industry.slug === slug);
}
