export interface Faq {
  question: string;
  answer: string;
}

/**
 * Home page FAQ: the five questions three first-time readers asked
 * (cold-read test, 19 October 2026). Ownership follows the signed client
 * terms: the client owns its data and every lead, report and brief the
 * system makes for it; ClearForge keeps the software that makes them.
 */
export const HOME_FAQS: Faq[] = [
  {
    question: 'What does it cost?',
    answer:
      'Each step has one fixed price, agreed before it starts. We quote the two-week review on the first call, sized to your business. Building is priced at the end of those two weeks, so you know the full cost before you commit to it.',
  },
  {
    question: 'Can I stop after the first step?',
    answer:
      'Yes. Each step is its own decision, starting with a two-week review at one fixed price.',
  },
  {
    question: 'What do my people have to do?',
    answer:
      'Show us how the work is done today, tell us what a good result looks like, and give feedback on what the AI produces. After launch, your team meets ours once a week until using it is part of the routine.',
  },
  {
    question: 'What if you find nothing worth building?',
    answer:
      'We tell you, and you keep everything we found. You still come away knowing where AI will and will not pay in your business.',
  },
  {
    question: 'Who owns what you build?',
    answer:
      'You own your data and everything the system makes for you: the leads, reports and briefs. We own the software that makes them, and we run and update it for you. If you stop, you keep everything it made.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Your data stays in your own systems wherever possible, and the AI companies we use do not use it to train their AI. What you share stays confidential. Our security page lists every service we use.',
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
      'Managed agent operations after a build: monitoring, daily output checks, SLAs, and model upgrades. It runs as a monthly operations retainer, scoped per system.',
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
      "Each company's use of its systems, reported to the sponsor on a live adoption scoreboard. The target is 70 percent of the intended users active weekly by day 90. The operating team sees which companies are using their systems and which are not, without asking management for a status update.",
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
