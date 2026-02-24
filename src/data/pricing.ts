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
  category: "marketing-agent" | "core-services";
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingTiers: PricingTier[] = [
  {
    category: "marketing-agent",
    name: "Foundation",
    price: "$3K-$5K",
    period: "/month",
    timeline: "AI Marketing Agent",
    description: "For companies that need a reliable local and organic demand engine before scaling spend.",
    features: [
      "SEO foundation and on-site optimization",
      "Google Business Profile management",
      "Core conversion and reporting setup",
      "Website optimization and landing page improvements",
      "Monthly growth review and priorities",
    ],
    cta: "Start Foundation",
  },
  {
    category: "marketing-agent",
    name: "Growth",
    price: "$7.5K-$10K",
    period: "/month",
    timeline: "AI Marketing Agent",
    description: "Adds paid acquisition and lifecycle workflows to accelerate qualified pipeline growth.",
    features: [
      "Everything in Foundation",
      "Paid ads management (Google + Meta)",
      "Email sequences for lead follow-up",
      "Lead intelligence and enrichment workflows",
      "CRM integration and reporting alignment",
    ],
    cta: "Start Growth",
    popular: true,
  },
  {
    category: "marketing-agent",
    name: "Scale",
    price: "$15K-$25K",
    period: "/month",
    timeline: "AI Marketing Agent",
    description: "For teams ready for multi-channel execution with deeper strategy support and automation.",
    features: [
      "Everything in Growth",
      "LinkedIn ads and account-based campaigns",
      "Content creation across web and social",
      "Advanced marketing automation orchestration",
      "Dedicated strategist and executive cadence",
    ],
    cta: "Start Scale",
    badge: "Flagship",
  },
  {
    category: "marketing-agent",
    name: "Enterprise",
    price: "Custom",
    period: "/month",
    timeline: "AI Marketing Agent",
    description: "Custom scope for multi-brand operators and portfolio-wide rollouts.",
    features: [
      "Portfolio-level strategy and governance",
      "Multi-brand campaign operations",
      "Shared reporting with company-level views",
      "Executive operating rhythm across stakeholders",
      "Custom delivery team and integration plan",
    ],
    cta: "Discuss Enterprise",
  },
  {
    category: "core-services",
    name: "AI Strategy & Market Intelligence",
    price: "$15K",
    period: "one-time",
    timeline: "4 weeks",
    description: "Clarify where AI should and should not be applied before deployment spend.",
    features: [
      "Strategic opportunity mapping",
      "Competitive and market intelligence",
      "Prioritized business case",
      "Board-ready implementation roadmap",
    ],
    cta: "Book Strategy Sprint",
  },
  {
    category: "core-services",
    name: "AI Design & Build",
    price: "$50K-$100K",
    period: "one-time",
    timeline: "6-8 weeks",
    description: "Build and launch production AI systems tied to measurable operational or revenue outcomes.",
    features: [
      "Architecture and implementation",
      "Production deployment",
      "Integration with operating workflows",
      "Post-launch optimization support",
    ],
    cta: "Start Build Sprint",
  },
  {
    category: "core-services",
    name: "AI Agent Retainer",
    price: "$15K",
    period: "/month",
    timeline: "Ongoing",
    description: "Embedded monthly AI build capacity with full ownership transfer.",
    features: [
      "Continuous development and optimization",
      "Weekly operator cadence",
      "Documentation and handoff-ready code",
      "You own what we build",
    ],
    cta: "Start Retainer",
    badge: "You own the code",
  },
  {
    category: "core-services",
    name: "Managed AI Services",
    price: "Custom",
    period: "/month",
    timeline: "Ongoing",
    description: "We build and run systems for teams that want outcomes without internal AI operations overhead.",
    features: [
      "Managed build and operations",
      "Monitoring and reliability management",
      "Continuous optimization",
      "Predictable monthly service model",
    ],
    cta: "Discuss Managed Services",
    badge: "We run it for you",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How do I choose between Foundation, Growth, and Scale?",
    answer:
      "Choose based on service scope, not lead volume. Foundation establishes your digital demand engine. Growth adds paid acquisition and lifecycle workflows. Scale adds multi-channel expansion, ABM, and dedicated strategy support.",
  },
  {
    question: "Is the AI Marketing Agent month-to-month?",
    answer:
      "Yes. Engagements start with a 90-day ramp to build the operating foundation, then continue month-to-month.",
  },
  {
    question: "What is the difference between AI Agent Retainer and Managed AI Services?",
    answer:
      "Retainer means we build with your team and you own the code and operating assets. Managed Services means we run delivery and operations for you as an ongoing service.",
  },
  {
    question: "Do you only work with PE-backed companies?",
    answer:
      "No. We work with PE portfolio companies, PE operating teams, and owner-led mid-market businesses that need measurable growth and efficiency outcomes.",
  },
  {
    question: "How quickly can we start?",
    answer:
      "Most engagements begin within two to three weeks after scope alignment.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No long annual lock-ins. Marketing Agent engagements move to month-to-month after the initial 90-day ramp.",
  },
];
