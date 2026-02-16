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
    timeline: "4 weeks",
    description: "A comprehensive diagnostic to assess your AI readiness and identify the highest-impact opportunities.",
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
    price: "$50K\u2013$100K",
    period: "one-time",
    timeline: "6\u20138 weeks",
    description: "An intensive engagement to diagnose, build, and deploy AI solutions that drive measurable results.",
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
    description: "Continuous AI expertise embedded in your business \u2014 new agents, optimization, and strategic guidance. You own everything we build.",
    features: [
      "20+ hours of senior AI expertise per month",
      "1\u20132 new AI agents built and deployed monthly",
      "Continuous optimization of existing solutions",
      "Weekly strategy sessions with leadership",
      "Priority support and rapid iteration",
      "Quarterly business impact reviews",
      "Full code ownership and documentation",
    ],
    cta: "Start Retainer",
    badge: "You own the code",
  },
  {
    name: "Managed AI Services",
    price: "Custom",
    period: "/month",
    timeline: "Ongoing",
    description: "ClearForge builds, owns, and maintains AI applications and agents for your business. You get best-in-class tools on a subscription \u2014 without the overhead of owning the infrastructure.",
    features: [
      "ClearForge-built AI agents tailored to your workflows",
      "Fully managed hosting, monitoring, and maintenance",
      "Monthly retraining and optimization on your data",
      "No engineering team required on your end",
      "SLA-backed uptime and performance guarantees",
      "Scale up or down as needs evolve",
      "Predictable monthly cost, no surprise invoices",
    ],
    cta: "Learn More",
    badge: "We run it for you",
  },
];

export const faqs: FAQ[] = [
  { question: "How do I know which package is right for my business?", answer: "Start with the AI Readiness Audit if you're unsure where to begin. It gives you a clear picture of your current state and a prioritized roadmap. If you already know your highest-impact opportunity, a Performance Sprint gets you to a working solution in 6\u20138 weeks. For ongoing development, choose between the Retainer (you own the code) or Managed Services (we run it for you) based on your team's capacity." },
  { question: "What's the difference between the Retainer and Managed Services?", answer: "With the Retainer, we build AI solutions and transfer full ownership to you \u2014 code, documentation, and all. Your team maintains it. With Managed Services, ClearForge builds, hosts, and maintains the AI applications. You get the results without the engineering overhead. Both models include continuous optimization." },
  { question: "What's included in the discovery call?", answer: "A 30-minute conversation where we learn about your business, current challenges, and goals. We'll give you an honest assessment of whether AI can help and which engagement makes sense. No pitch decks, no pressure." },
  { question: "Do you work with companies of any size?", answer: "We focus on mid-market companies ($5M+ revenue), PE portfolio companies, and growth-stage firms. Our approach is designed for organizations large enough to benefit from AI but agile enough to move quickly." },
  { question: "How quickly can we see results?", answer: "Most clients see measurable results within 90 days. The AI Readiness Audit delivers a roadmap in 4 weeks. Performance Sprints produce working solutions in 6\u20138 weeks." },
  { question: "Who actually does the work?", answer: "Senior operators \u2014 the same people who scope your engagement are the ones who deliver it. No bait-and-switch with junior consultants." },
  { question: "What's your payment structure?", answer: "Audits and Sprints are billed 50% upfront, 50% on completion. Retainers and Managed Services are billed monthly. We're flexible on structure for larger engagements." },
];
