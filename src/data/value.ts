import type { Faq } from '@/data/faqs';

/**
 * /value: the front of the lifecycle (find the opportunities, rank the
 * business case, design the solution) and the scoreboard that measures
 * the return after launch. Every measure named in RETURN_MEASURES is one
 * the client scoreboards compute today (checked 18 October 2026); weekly
 * active use and dollar value are not computed yet, so neither is named.
 */

export interface ValueStep {
  step: string;
  name: string;
  title: string;
  points: string[];
}

export const VALUE_STEPS: ValueStep[] = [
  {
    step: '01',
    name: 'Value the business',
    title: 'Our diligence values your business first, then shows where AI adds the most earnings.',
    points: [
      'A valuation sets earnings and enterprise value as the baseline.',
      'Commercial diligence tests market, customers, pricing and pipeline for revenue left behind.',
      'Performance diligence measures the hours, cost to serve and wait time in the work.',
    ],
  },
  {
    step: '02',
    name: 'Rank the business case',
    title:
      'Every opportunity is ranked by what it is worth, what it costs, and how fast it pays back.',
    points: [
      'Worth is measured in earnings, from a baseline taken from your own records.',
      'Cost covers the build, the run and the team time the change takes.',
      'Payback is the month the gain covers the cost.',
      'The top-ranked opportunity leaves the two-week diagnostic with a design and a priced build plan.',
    ],
  },
];

export interface ReturnMeasure {
  name: string;
  question: string;
  detail: string;
}

export const RETURN_TITLE =
  'The return is measured on a scoreboard built into the system, from its own records.';

export const RETURN_MEASURES: ReturnMeasure[] = [
  {
    name: 'Adoption',
    question: 'Is it used?',
    detail: "Each person's activity, and how far their work has moved through the pipeline.",
  },
  {
    name: 'Quality',
    question: 'Is it right?',
    detail:
      'How users rate the output, how much of it they validate, and how often they override it.',
  },
  {
    name: 'Outcome',
    question: 'Is it paying?',
    detail: 'Win rate, deals won and days to close, against the baseline in the business case.',
  },
  {
    name: 'Cost',
    question: 'What does it cost?',
    detail: 'Each research run, priced in model tokens and search calls, per business line.',
  },
];

export const RETURN_CLOSE =
  'Each month the result is set against the business case: what the system was meant to return, and what it cost.';

export const VALUE_FAQS: Faq[] = [
  {
    question: 'How do you measure the return on AI?',
    answer:
      'Against a baseline taken from your own records before the build, on the measure the business case named. The scoreboard reports use, quality, results and running cost, and your team reviews it with us every month.',
  },
  {
    question: 'What does the diligence cover?',
    answer:
      'A valuation of the business, then two diligence passes. The commercial pass covers market, customers, pricing and pipeline. The performance pass covers the hours, cost and hand-offs in the work. Each finding is tied to earnings, so opportunities compare on what they are worth.',
  },
  {
    question: 'How long does it take to find the opportunities?',
    answer:
      'The fixed-fee diagnostic runs two weeks, working from your financial records, your systems and the people who do the work. It ends with a ranked list, a business case for the top opportunity and a priced plan for the one workflow worth building first.',
  },
  {
    question: 'Can a sponsor run this across a portfolio?',
    answer:
      'Yes. The same diligence and the same scoreboard run on every company you choose, on one model, so results compare across the portfolio and report to the operating team.',
  },
];
