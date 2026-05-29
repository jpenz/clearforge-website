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
    name: 'Forge Diagnostic™',
    price: '$15K',
    period: 'one-time',
    timeline: '4 weeks',
    description:
      'A rapid diagnostic to assess AI readiness, choose the right workflow, and define the baseline before a build.',
    features: [
      'Stakeholder interviews with leadership and key operators',
      'Process mapping of core workflows',
      'Data quality and infrastructure assessment',
      'Workflow selection and prioritization',
      'Executive-ready build plan with assumptions and owner decisions',
      'Baseline metrics for cycle time, cost, quality, or throughput',
    ],
    cta: 'Map the Workflow',
  },
  {
    name: 'Forge Sprint™',
    price: '$75K–$200K',
    period: 'one-time',
    timeline: '10–14 weeks',
    description:
      'An intensive engagement to diagnose, build, deploy, and train the team around one production workflow.',
    features: [
      'Process mining and operational diagnostics',
      'Priority workflow deep-dive with business case assumptions',
      'Working production release for the selected workflow',
      'Team training and knowledge transfer',
      'Integration with existing tech stack',
      '30-day post-launch support included',
      'Baseline KPIs tracked from day one',
    ],
    cta: 'Map the Workflow',
    popular: true,
  },
  {
    name: 'Forge Scale™',
    price: '$5K–$15K',
    period: '/month',
    timeline: 'Ongoing',
    description:
      'Ongoing AI operations for live workflows, adoption support, and measured improvement.',
    features: [
      '20+ hours of senior AI operator time per month',
      'Agent updates and new workflow scopes as priorities change',
      'Monthly review of live workflow performance',
      'Weekly or biweekly working sessions with leadership',
      'Priority support and rapid iteration',
      'Quarterly value and adoption reviews',
      'Reusable agent patterns documented for your team',
    ],
    cta: 'Map the Workflow',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How do I know which package is right for my business?',
    answer:
      "Start with the Forge Diagnostic if you're unsure where to begin. It gives you a clear picture of your current workflow, data readiness, owner decisions, and build plan in 4 weeks. If you already know the workflow to fix, a Forge Sprint gets you to a working release in 10-14 weeks. Forge Scale is for companies with live AI workflows that need ongoing operations.",
  },
  {
    question: "What's included in the discovery call?",
    answer:
      "A 30-minute conversation where we learn about your business, current workflow, systems, and goals. We'll give you an honest assessment of whether AI can help and which engagement makes sense. No sales theater, no pressure - just a straightforward conversation.",
  },
  {
    question: 'Do you work with companies of any size?',
    answer:
      'We focus on mid-market and growth-stage companies and PE portfolio companies. Our approach is designed for organizations large enough to benefit from AI but agile enough to move quickly.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We work across industries including manufacturing, professional services, B2B software, healthcare, and financial services. Our methodology is industry-agnostic — we focus on the business processes and data patterns that drive results.',
  },
  {
    question: 'How quickly can we see results?',
    answer:
      'The Forge Diagnostic delivers a build plan in 4 weeks. Forge Sprints produce working releases in 10-14 weeks. We define baseline metrics before launch so results can be reviewed against actual workflow performance.',
  },
  {
    question: 'Do you replace our existing tech stack?',
    answer:
      "No. We build on top of your existing tools and infrastructure. Our solutions integrate with your CRM, ERP, data warehouse, and other systems. We're additive, not disruptive.",
  },
  {
    question: 'Who actually does the work?',
    answer:
      'Senior operators - the same people who scope your engagement are the ones who deliver it. You get experienced professionals with business, workflow, and AI engineering depth.',
  },
  {
    question: 'What happens after the engagement ends?',
    answer:
      "Everything we build is yours. We include comprehensive documentation and team training so you can maintain and extend solutions independently. Many clients continue with a Retainer for ongoing development, but it's never required.",
  },
  {
    question: 'Can you scope a custom engagement?',
    answer:
      "Absolutely. Our packages cover the most common needs, but we regularly design custom engagements for larger or more complex projects. Book a discovery call and we'll scope something that fits.",
  },
  {
    question: "What's your payment structure?",
    answer:
      "Diagnostics and Sprints are billed 50% upfront, 50% on completion. Scale is billed monthly. We're flexible on structure for larger engagements - the goal is to align scope, owner decisions, and review cadence before work begins.",
  },
];
