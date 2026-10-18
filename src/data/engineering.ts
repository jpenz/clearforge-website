import type { Faq } from '@/data/faqs';

/**
 * /engineering: the forward-deployed delivery model and the production
 * standard, ordered by the questions a technical reviewer asks. Every
 * point is a practice running in production for clients, checked against
 * those systems on 18 October 2026 (workflow exports, the live database
 * and the scripts). Practices not yet shipped (cross-provider failover,
 * prompt evals, injection defenses, MCP tooling) stay off this page until
 * they run.
 */

export interface DeployedStep {
  when: string;
  detail: string;
}

export const DEPLOYED_TITLE =
  'Engineers work inside your team from the first interview to the monthly review.';

export const DEPLOYED_STEPS: DeployedStep[] = [
  {
    when: 'Before the build',
    detail: 'Engineers sit with the people who run the workflow and map it step by step.',
  },
  {
    when: 'During the build',
    detail: 'The system is built in your stack, under your access controls, wherever possible.',
  },
  {
    when: 'After launch',
    detail: 'The same engineers run the system and move it to better models as they ship.',
  },
];

export interface StandardQuestion {
  id: string;
  step: string;
  question: string;
  answer: string;
  points: string[];
  link?: { label: string; href: string };
}

export const STANDARD_QUESTIONS: StandardQuestion[] = [
  {
    id: 'running',
    step: '01',
    question: 'Will it keep running?',
    answer:
      'Each step saves its result, so a rerun after a failure redoes only the unfinished work.',
    points: [
      'Model and database calls retry on their own, up to five times, before a run fails.',
      'Runs execute in a queued pool of workers, and each business line generates in parallel.',
      'Reruns never duplicate a record, and every failure is logged for review.',
      'The automation database is backed up nightly, and a full restore drill passed in September 2026.',
    ],
  },
  {
    id: 'access',
    step: '02',
    question: 'Can it touch our systems safely?',
    answer: 'Each agent gets only the access its job needs.',
    points: [
      "Clients on our standard template get their own database schema and a login role that cannot read other clients' tables.",
      'The research agent has one tool: read-only web search.',
      'Text an agent writes is cleaned against a strict allowlist before it appears on screen.',
    ],
    link: { label: 'Security and data handling', href: '/security' },
  },
  {
    id: 'control',
    step: '03',
    question: 'Does a person stay in control?',
    answer: 'Agents propose and people decide; no agent emails your customers or moves a deal.',
    points: [
      'An agent can only add an opportunity as Identified; only a person can mark it Validated.',
      'Outreach is drafted in the playbook for a rep to review and send.',
      'Every out-of-sequence stage change is logged with a reason and counted in an override rate.',
    ],
  },
  {
    id: 'correct',
    step: '04',
    question: 'How do you know it is right?',
    answer:
      'Research claims are checked against their sources, and every playbook is checked daily.',
    points: [
      'Market scans download every cited page and remove claims the page does not support.',
      'The daily check flags any playbook with unfilled fields, missing sources or broken structure.',
      'Reps rate each playbook for accuracy and contact quality, and the ratings feed the scoreboard.',
    ],
  },
  {
    id: 'operate',
    step: '05',
    question: 'Who watches it after launch?',
    answer: 'Every live system gets a daily check on what it produced, beyond whether it ran.',
    points: [
      'The check confirms each business line still produces new opportunities at its normal weekly rate.',
      'Every run is traced step by step, with each model call recorded.',
      'Each research run is priced in model tokens and search calls, per business line.',
      'Models are sized to the job: the largest for synthesis, mid-size ones for research and writing.',
    ],
  },
];

/** The five questions double as the page's FAQ structured data. */
export const ENGINEERING_FAQS: Faq[] = STANDARD_QUESTIONS.map((item) => ({
  question: item.question,
  answer: [item.answer, ...item.points].join(' '),
}));
