export interface Faq {
  question: string;
  answer: string;
}

/** Home page FAQ, kept short for AI-search visibility. */
export const HOME_FAQS: Faq[] = [
  {
    question: "What does it cost to start?",
    answer:
      "The Forge Diagnostic is $15K, fixed price. It runs 2 weeks and it is where every engagement starts.",
  },
  {
    question: "How long until a live system?",
    answer:
      "The Forge Sprint takes 10 to 14 weeks from kickoff to a live production system. It is priced at $75K to $200K.",
  },
  {
    question: "What is the Adoption Mile?",
    answer:
      "Forge Scale, $5K to $15K per month. You get a named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.",
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
      "The Forge Diagnostic is $15K, fixed price. It runs 2 weeks and it is where every engagement starts.",
  },
  {
    question: "How long until a live system?",
    answer:
      "The Forge Sprint runs 10 to 14 weeks from kickoff to a live production system. It is priced from $75K, with a typical range of $75K to $200K+.",
  },
  {
    question: "What is the Adoption Mile?",
    answer:
      "Forge Scale, $5K to $15K per month. A named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.",
  },
  {
    question: "What does Forge Run cover?",
    answer:
      "Managed agent operations after a build: monitoring, production evals, SLAs, and model upgrades. It is priced at $2.5K to $7.5K per system per month.",
  },
  {
    question: "Is pricing really public?",
    answer:
      "Yes. Every tier on this page carries its published price. The one exception is PE and multi-company platform work, which is scoped with the sponsor.",
  },
];
