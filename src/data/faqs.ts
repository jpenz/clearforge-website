export interface Faq {
  question: string;
  answer: string;
}

/** Home page FAQ, kept short for AI-search visibility. */
export const HOME_FAQS: Faq[] = [
  {
    question: 'How does an engagement start, and how is the fee set?',
    answer:
      'Every engagement starts with the Forge Diagnostic: two weeks, one workflow, a fixed fee agreed up front.',
  },
  {
    question: 'How long until a live system?',
    answer:
      'The Forge Sprint takes 10 to 14 weeks from kickoff to a live production system. It is scoped in the Diagnostic and agreed before any build.',
  },
  {
    question: 'What is the Adoption Mile?',
    answer:
      'Forge Scale, a monthly retainer scoped to the system. You get a named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Mid-market companies with $20M to $500M in revenue, and PE operating teams working across a portfolio.',
  },
  {
    question: 'What is delivered?',
    answer:
      'A live production system built into your workflow, then run through adoption until your team uses it every week.',
  },
];

/** Pricing page FAQ. */
export const PRICING_FAQS: Faq[] = [
  {
    question: 'How does an engagement start, and how is the fee set?',
    answer:
      'Every engagement starts with the Forge Diagnostic: two weeks, one workflow, a fixed fee agreed up front.',
  },
  {
    question: 'How long until a live system?',
    answer:
      'The Forge Sprint runs 10 to 14 weeks from kickoff to a live production system. Pricing is scoped in the Diagnostic and agreed before any build.',
  },
  {
    question: 'What is the Adoption Mile?',
    answer:
      'Forge Scale, a monthly retainer scoped to the system. A named operator, a weekly working cadence, and a live adoption scoreboard. The bar is 70 percent weekly-active adoption by day 90.',
  },
  {
    question: 'What does Forge Run cover?',
    answer:
      'Managed agent operations after a build: monitoring, production evals, SLAs, and model upgrades. It runs as a monthly operations retainer, scoped per system.',
  },
  {
    question: 'How is pricing set?',
    answer:
      'The Diagnostic is a fixed fee, agreed up front. Everything after it is scoped in the Diagnostic and agreed before any build. PE and multi-company platform work is scoped with the sponsor.',
  },
];

/**
 * Private-equity FAQ. Written as direct answers to the questions a sponsor
 * or operating partner actually asks, so answer engines can quote a whole
 * response rather than stitching one from prose.
 */
export const PE_FAQS: Faq[] = [
  {
    question:
      'How do you work across a portfolio without running a separate engagement for every company?',
    answer:
      'One diagnostic model, run across the companies you choose. Each portfolio company gets the same two-week diagnostic on the same scoring model, so the outputs are comparable. The sponsor gets a ranked view of where AI is worth funding first instead of a stack of unrelated reports.',
  },
  {
    question: 'What does a portfolio AI scan actually produce?',
    answer:
      'A ranked list of workflows worth building across the portfolio, the companies where each play applies, an estimate of what it takes to build, and a sequence. In a recent portfolio engagement that was 3 companies assessed on one model, 8 priority plays selected, and a 12-month execution plan.',
  },
  {
    question: 'How do you measure whether portfolio companies actually adopt what gets built?',
    answer:
      'Weekly-active usage, reported to the sponsor. The bar is 70 percent of the intended users active weekly by day 90. It is tracked on a live adoption scoreboard so the operating team sees which companies are using their systems and which are not, without asking management for a status update.',
  },
  {
    question: 'How fast can one portfolio company get to a live system?',
    answer:
      'Two weeks for the diagnostic, then 10 to 14 weeks from kickoff to a system running in production inside the workflow the team already uses. The diagnostic prices and scopes the build before anyone commits to it.',
  },
  {
    question: 'Do you work with the management team or around them?',
    answer:
      'With them. The system is built into the workflow the operating team already runs, and adoption is the metric we are graded on, so a build that management will not use is a failed build. The sponsor gets visibility; the company gets the working system.',
  },
  {
    question: 'How is portfolio work priced?',
    answer:
      'Scoped with the sponsor. Single-company work starts with a fixed-fee diagnostic that prices the build before you commit. Portfolio work is scoped against the number of companies and the depth of the scan.',
  },
];
