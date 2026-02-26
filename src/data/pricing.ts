export interface PricingTier {
  name: string;
  price: string;
  period: string;
  timeline: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "AI Readiness Audit",
    price: "$15K",
    period: "one-time",
    timeline: "2 weeks",
    description:
      "A rapid diagnostic to assess your AI readiness and identify the highest-impact opportunities.",
    features: [
      "Stakeholder interviews with leadership and key operators",
      "Process mapping of core workflows",
      "Data quality and infrastructure assessment",
      "AI opportunity identification and prioritization",
      "Executive-ready roadmap with ROI projections",
      "Recommended quick wins for immediate impact",
    ],
    cta: "Book an Audit",
  },
  {
    name: "Performance Sprint",
    price: "$50K–$100K",
    period: "one-time",
    timeline: "6–8 weeks",
    description:
      "An intensive engagement to diagnose, build, and deploy AI solutions that drive measurable results.",
    features: [
      "Process mining and operational diagnostics",
      "Top-3 opportunity deep-dives with business cases",
      "Working MVP of highest-impact solution",
      "Team training and knowledge transfer",
      "Integration with existing tech stack",
      "30-day post-launch support included",
      "Measurable KPIs tracked from day one",
    ],
    cta: "Start a Sprint",
    popular: true,
  },
  {
    name: "AI Agent Retainer",
    price: "$15K",
    period: "/month",
    timeline: "Ongoing",
    description:
      "Continuous AI expertise embedded in your business — new agents, optimization, and strategic guidance.",
    features: [
      "20+ hours of senior AI expertise per month",
      "1–2 new AI agents built and deployed monthly",
      "Continuous optimization of existing solutions",
      "Weekly strategy sessions with leadership",
      "Priority support and rapid iteration",
      "Quarterly business impact reviews",
      "Access to ClearForge agent library",
    ],
    cta: "Start Retainer",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How do I know which package is right for my business?",
    answer:
      "Start with the AI Readiness Audit if you're unsure where to begin. It gives you a clear picture of your current state and a prioritized roadmap. If you already know your highest-impact opportunity, a Performance Sprint gets you to a working solution in 6–8 weeks. The Retainer is for companies ready for continuous AI development.",
  },
  {
    question: "What's included in the discovery call?",
    answer:
      "A 30-minute conversation where we learn about your business, current challenges, and goals. We'll give you an honest assessment of whether AI can help and which engagement makes sense. No pitch decks, no pressure — just a straightforward conversation.",
  },
  {
    question: "Do you work with companies of any size?",
    answer:
      "We focus on mid-market companies ($5M–$500M revenue) and PE portfolio companies. Our approach is designed for organizations large enough to benefit from AI but agile enough to move quickly.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work across industries including manufacturing, professional services, B2B software, healthcare, and financial services. Our methodology is industry-agnostic — we focus on the business processes and data patterns that drive results.",
  },
  {
    question: "How quickly can we see results?",
    answer:
      "Most clients see measurable results within 90 days. The AI Readiness Audit delivers a roadmap in 2 weeks. Performance Sprints produce working solutions in 6–8 weeks. Quick wins identified during the Audit can often be implemented immediately.",
  },
  {
    question: "Do you replace our existing tech stack?",
    answer:
      "No. We build on top of your existing tools and infrastructure. Our solutions integrate with your CRM, ERP, data warehouse, and other systems. We're additive, not disruptive.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "Senior operators — the same people who scope your engagement are the ones who deliver it. No bait-and-switch with junior consultants. You get experienced professionals with dual expertise in business strategy and AI engineering.",
  },
  {
    question: "What happens after the engagement ends?",
    answer:
      "Everything we build is yours. We include comprehensive documentation and team training so you can maintain and extend solutions independently. Many clients continue with a Retainer for ongoing development, but it's never required.",
  },
  {
    question: "Can you scope a custom engagement?",
    answer:
      "Absolutely. Our packages cover the most common needs, but we regularly design custom engagements for larger or more complex projects. Book a discovery call and we'll scope something that fits.",
  },
  {
    question: "What's your payment structure?",
    answer:
      "Audits and Sprints are billed 50% upfront, 50% on completion. Retainers are billed monthly. We're flexible on structure for larger engagements — the goal is to align incentives around results.",
  },
];
