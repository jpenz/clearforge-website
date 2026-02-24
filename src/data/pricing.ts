export interface PricingTier {
  name: string;
  price: string;
  period: string;
  timeline: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  badge?: string;
  category: "strategy-build-operate" | "marketing-revenue-ops";
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingTiers: PricingTier[] = [
  {
    category: "strategy-build-operate",
    name: "Growth Strategy & Diagnosis",
    price: "$15K",
    period: "one-time",
    timeline: "4 weeks",
    description: "Clarify exactly where to focus before committing build budget.",
    features: [
      "Market and competitive diagnosis",
      "Operational gap analysis",
      "Prioritized AI opportunity stack",
      "Board-ready strategy and implementation roadmap",
    ],
    cta: "Book Strategy Diagnostic",
    badge: "Entry Point",
  },
  {
    category: "strategy-build-operate",
    name: "AI Design & Build",
    price: "$50K-$100K",
    period: "one-time",
    timeline: "6-8 weeks",
    description: "Design and launch production AI systems tied to business outcomes.",
    features: [
      "Custom AI agent and workflow implementation",
      "System integrations with core operations",
      "Production deployment and instrumentation",
      "Post-launch stabilization and enablement",
    ],
    cta: "Start Design & Build",
  },
  {
    category: "strategy-build-operate",
    name: "Managed AI Operations",
    price: "$15K+",
    period: "/month",
    timeline: "Ongoing",
    description: "Operate and optimize AI systems continuously with executive visibility.",
    features: [
      "Managed operation and reliability",
      "Continuous optimization cycles",
      "Live executive reporting",
      "Quarterly roadmap evolution",
    ],
    cta: "Discuss Managed Operations",
    popular: true,
    badge: "Most Common Operating Model",
  },
  {
    category: "strategy-build-operate",
    name: "Legacy System Modernization",
    price: "Custom",
    period: "project",
    timeline: "Phased",
    description: "Modernize legacy systems so AI can create value without full replacement.",
    features: [
      "Legacy architecture and risk assessment",
      "Phased modernization and integration roadmap",
      "AI-ready workflow modernization",
      "Governance and change management support",
    ],
    cta: "Scope Modernization",
    badge: "COBOL to AI-Ready",
  },
  {
    category: "marketing-revenue-ops",
    name: "Foundation",
    price: "$3K-$5K",
    period: "/month",
    timeline: "AI Marketing & Revenue Operations",
    description: "For teams building a reliable demand engine with clear reporting and conversion basics.",
    features: [
      "SEO and on-site conversion foundation",
      "Core analytics and reporting setup",
      "Baseline CRM and pipeline alignment",
      "Monthly optimization and priority planning",
    ],
    cta: "Start Foundation",
  },
  {
    category: "marketing-revenue-ops",
    name: "Growth",
    price: "$7.5K-$10K",
    period: "/month",
    timeline: "AI Marketing & Revenue Operations",
    description: "Adds paid acquisition and tighter revenue operations workflows for faster qualified pipeline growth.",
    features: [
      "Everything in Foundation",
      "Paid media management",
      "Lead intelligence and follow-up workflows",
      "CRM process automation",
    ],
    cta: "Start Growth",
    popular: true,
  },
  {
    category: "marketing-revenue-ops",
    name: "Scale",
    price: "$15K-$25K",
    period: "/month",
    timeline: "AI Marketing & Revenue Operations",
    description: "Multi-channel execution with deeper strategy, automation, and leadership cadence.",
    features: [
      "Everything in Growth",
      "Advanced multi-channel orchestration",
      "Pipeline acceleration workflows",
      "Executive operating rhythm",
    ],
    cta: "Start Scale",
    badge: "Full Revenue Engine",
  },
  {
    category: "marketing-revenue-ops",
    name: "Enterprise",
    price: "Custom",
    period: "/month",
    timeline: "AI Marketing & Revenue Operations",
    description: "Portfolio-wide or multi-brand implementations with custom governance and delivery.",
    features: [
      "Multi-brand or portfolio rollout",
      "Custom integration architecture",
      "Shared executive reporting across entities",
      "Dedicated delivery team",
    ],
    cta: "Discuss Enterprise",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Where should most companies start?",
    answer:
      "Most companies start with Growth Strategy & Diagnosis. It identifies where AI should be applied first so budget goes to high-impact work.",
  },
  {
    question: "Is AI Marketing & Revenue Operations your core offer?",
    answer:
      "It is one application of the broader ClearForge platform. The core model is Strategy, Design & Build, then Managed AI Operations.",
  },
  {
    question: "How do Managed AI Operations and AI Design & Build differ?",
    answer:
      "Design & Build is a time-bound engagement to launch production systems. Managed AI Operations is the ongoing model for running and continuously improving those systems.",
  },
  {
    question: "Can you work with legacy infrastructure?",
    answer:
      "Yes. Legacy System Modernization is designed for COBOL, mainframes, older ERP systems, and spreadsheet-heavy workflows that still need AI-driven outcomes.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No annual lock-ins by default. Ongoing services are structured as monthly operating relationships after initial setup periods.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We work with PE operating partners, portfolio company leaders, owner-led businesses, and Fortune 1000 teams that need strategy plus execution.",
  },
];
