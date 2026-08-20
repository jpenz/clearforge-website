export interface Faq {
  question: string;
  answer: string;
}

/** Home page FAQ, kept short for AI-search visibility. */
export const HOME_FAQS: Faq[] = [
  {
    question: "What does it cost to start?",
    answer:
      "Every engagement starts with the Forge Diagnostic: two weeks, one workflow, a fixed fee agreed up front.",
  },
  {
    question: "How long until a live system?",
    answer:
      "The Forge Sprint takes 10 to 14 weeks from kickoff to a live production system. It is scoped in the Diagnostic and agreed before any build.",
  },
  {
    question: "What is the Adoption Mile?",
    answer:
      "Forge Scale, a monthly retainer scoped to the system. You get a named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.",
  },
  {
    question: "Who is it for?",
    answer:
      "Mid-market companies with $20M to $500M in revenue, and PE operating teams working across a portfolio.",
  },
  {
    question: "What is delivered?",
    answer:
      "A live production system built into your workflow, then run through adoption until your team uses it every week.",
  },
];

/** Pricing page FAQ. */
export const PRICING_FAQS: Faq[] = [
  {
    question: "What does it cost to start?",
    answer:
      "Every engagement starts with the Forge Diagnostic: two weeks, one workflow, a fixed fee agreed up front.",
  },
  {
    question: "How long until a live system?",
    answer:
      "The Forge Sprint runs 10 to 14 weeks from kickoff to a live production system. Pricing is scoped in the Diagnostic and agreed before any build.",
  },
  {
    question: "What is the Adoption Mile?",
    answer:
      "Forge Scale, a monthly retainer scoped to the system. A named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.",
  },
  {
    question: "What does Forge Run cover?",
    answer:
      "Managed agent operations after a build: monitoring, production evals, SLAs, and model upgrades. It runs as a monthly operations retainer, scoped per system.",
  },
  {
    question: "How is pricing set?",
    answer:
      "The Diagnostic is a fixed fee, agreed up front. Everything after it is scoped in the Diagnostic and agreed before any build. PE and multi-company platform work is scoped with the sponsor.",
  },
];
