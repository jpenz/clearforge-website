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
      'Calls to models and databases retry on their own before a run fails.',
      'Every failure is logged, and reruns never duplicate a record.',
    ],
  },
  {
    id: 'access',
    step: '02',
    question: 'Can it touch our systems safely?',
    answer: 'Each agent gets only the access its job needs.',
    points: [
      'Clients on our standard setup get their own schema and a scoped database login.',
      'Research agents can search the web and nothing else.',
    ],
    link: { label: 'Security and data handling', href: '/security' },
  },
  {
    id: 'control',
    step: '03',
    question: 'Does a person stay in control?',
    answer: 'Agents propose and people decide; no agent emails your customers or moves a deal.',
    points: [
      'Only a person can approve an opportunity an agent finds.',
      'Outreach is drafted for a rep to review and send.',
    ],
  },
  {
    id: 'correct',
    step: '04',
    question: 'How do you know it is right?',
    answer: 'Research claims are checked against their sources, and every playbook is checked daily.',
    points: [
      'Claims a cited source does not support are removed before anyone reads them.',
      'Users rate what the system produced, and the ratings feed the scoreboard.',
    ],
  },
  {
    id: 'operate',
    step: '05',
    question: 'Who watches it after launch?',
    answer: 'Every live system gets a daily check on what it produced, beyond whether it ran.',
    points: [
      'Every run is traced step by step, and research runs are priced by what they use.',
      'Each step runs on a model sized to the job.',
    ],
  },
];

/** The five questions double as the page's FAQ structured data. */
export const ENGINEERING_FAQS: Faq[] = STANDARD_QUESTIONS.map((item) => ({
  question: item.question,
  answer: [item.answer, ...item.points].join(' '),
}));
