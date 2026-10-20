export interface CaseMetric {
  value: string;
  label: string;
  /** When present, the figure counts up on view. */
  count?: number;
  format?: boolean;
}

export interface GlanceFigure {
  display: string;
  /** When present, the figure counts up on view. */
  count?: number;
  suffix?: string;
  format?: boolean;
  label: string;
}

export interface CaseNarrativeSection {
  label: string;
  figure: string;
  figureLabel: string;
  paragraphs: string[];
}

export interface CaseResultRow {
  metric: string;
  value: string;
  accent?: boolean;
}

export interface CaseStudy {
  slug: string;
  letter: 'A' | 'B' | 'C';
  client: string;
  summary: string;
  metrics: CaseMetric[];
  scopeTag: string;
  headline: string;
  headlineEmphasis: string;
  intro: string;
  glanceNote: string;
  glance: GlanceFigure[];
  sections: CaseNarrativeSection[];
  /** Rendered as a hairline table inside the Results section. */
  resultsTable?: CaseResultRow[];
}

/** Anonymized case studies. Every number is from the approved facts list. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'industrial-conglomerate',
    letter: 'A',
    client: 'A $4B+ industrial supplier, more than 100 years old',
    summary:
      'AI agents run revenue operations for three divisions: they find companies that just showed a reason to buy, identify and verify the right contact, brief the sales team every Monday, and feed marketing campaigns built on what the market is doing. Eight months in, they found the client’s biggest new customer.',
    /** The result first; the scope lives in its label, not in cells of its own. */
    metrics: [
      {
        value: '8',
        count: 8,
        label: 'Months from launch to the client’s biggest new customer',
      },
      {
        value: '1,482',
        count: 1482,
        format: true,
        label: 'Opportunities found in September 2026, across three divisions',
      },
      { value: '19', count: 19, label: 'Opportunities found in month one' },
    ],
    scopeTag: 'AI revenue operations · 3 divisions',
    headline:
      'A $4B+ industrial supplier, more than 100 years old, put AI agents on revenue operations.',
    headlineEmphasis: 'Eight months in, they found its biggest new customer.',
    intro:
      'AI agents that run revenue operations for three divisions: they find who is about to buy, pick the right person, verify how to reach them, brief the sales team, and feed marketing campaigns built on what the market is doing.',
    glanceNote: 'All real, anonymized client',
    glance: [
      {
        display: '8',
        count: 8,
        label: 'Months from launch to the client’s biggest new customer',
      },
      {
        display: '1,482',
        count: 1482,
        format: true,
        label: 'Opportunities found in September 2026, across three divisions',
      },
      {
        display: '19',
        count: 19,
        label: 'Opportunities found in month one',
      },
    ],
    sections: [
      {
        label: 'The situation',
        figure: '100+',
        figureLabel: 'Years in business, more than $4B in sales',
        paragraphs: [
          'A more-than-100-year-old industrial supplier with over $4 billion in sales runs several divisions, each selling different products to different buyers.',
          'Buying moments show up in public before anyone calls: a plant expansion, a contract award, a new production line, a retrofit, new funding. Reps found them late or not at all, and marketing built weekly lead lists by hand. Leadership wanted one system to find demand for every division.',
        ],
      },
      {
        label: 'What the agents do',
        figure: 'Weekly',
        figureLabel: 'Every Monday, for every division',
        paragraphs: [
          'Over the weekend, AI agents search each division’s territories for the events that division cares about, in news, permits and trade press. The client sets the events and the exclusions.',
          'The agents merge repeat findings into one record per company and project, and write a short brief for each: what happened, why it matters for that division, where the project stands, and an opening line, with dated sources.',
          'For each opportunity they identify the best person to contact and verify that person’s direct phone number and email.',
          'On Monday morning each division gets a report by state with a summary and a 30-day action plan.',
        ],
      },
      {
        label: 'More than leads',
        figure: '2',
        figureLabel: 'Teams fed every week: sales and marketing',
        paragraphs: [
          'The same signals feed marketing. Each week the agents hand the marketing team the companies, contacts and trigger themes for its automated email campaigns, and build ad and LinkedIn campaigns around the trends they see in the market.',
          'When a run of plant expansions shows up in one region, sales calls those companies and marketing’s campaigns speak to that exact moment.',
        ],
      },
      {
        label: 'Results',
        figure: '8',
        figureLabel: 'Months to the client’s biggest new customer',
        paragraphs: [
          'Eight months after the agents started running revenue operations, they found the account that became the client’s biggest new customer.',
          'Volume grew as the agents learned what each division wants: 19 opportunities in month one, 613 in month six, and 1,482 in September 2026 across three divisions.',
        ],
      },
      {
        label: 'How it runs',
        figure: 'Daily',
        figureLabel: 'Checks on what the agents produced',
        paragraphs: [
          'Forward-deployed engineers from ClearForge built the system with the client’s sales and marketing leads, and still run it: daily checks on what the agents produced, a monthly performance report, and a quarterly review to tune the events and territories.',
          'Every brief carries its sources, and every claim in the market reports is checked against the page it cites.',
        ],
      },
    ],
    resultsTable: [
      { metric: 'Months to the client’s biggest new customer', value: '8', accent: true },
      { metric: 'Opportunities found, month one', value: '19' },
      { metric: 'Opportunities found, month six', value: '613' },
      { metric: 'Opportunities found, September 2026', value: '1,482' },
      { metric: 'Divisions run on one system', value: '3' },
    ],
  },
  {
    slug: 'services-firm',
    letter: 'B',
    client: 'A home and commercial services firm',
    summary:
      'Commercial pipeline rebuilt from zero. 42 targets identified, 31 contacted, 18 quoted, 7 recurring accounts won.',
    metrics: [
      { value: '42', label: 'Targets identified' },
      { value: '31', label: 'Contacted' },
      { value: '18', label: 'Quoted' },
      { value: '7', label: 'Recurring accounts won' },
    ],
    scopeTag: 'Four-stage funnel',
    headline: 'A home and commercial services firm had no commercial pipeline.',
    headlineEmphasis: 'It was rebuilt from zero.',
    intro:
      'One AI system for commercial target identification and outreach, worked through a four-stage funnel.',
    glanceNote: 'All real, anonymized client',
    glance: [
      {
        display: '42',
        count: 42,
        label: 'Commercial targets identified',
      },
      {
        display: '18',
        count: 18,
        label: 'Quoted',
      },
      {
        display: '7',
        count: 7,
        label: 'Recurring accounts won',
      },
    ],
    sections: [
      {
        label: 'The situation',
        figure: '0',
        figureLabel: 'Commercial accounts at the start',
        paragraphs: [
          'A home and commercial services firm had run for more than two decades on referrals and reputation. No website, no search presence, no structured outreach. As legacy customers churned, revenue eroded, and there was no pipeline to replace it.',
          'Its commercial pipeline did not exist. There was no target list and no method for working one. The firm needed a way to find commercial accounts and turn them into recurring work.',
        ],
      },
      {
        label: 'What was built',
        figure: '10\u201314',
        figureLabel: 'Weeks from kickoff to production',
        paragraphs: [
          'ClearForge built an AI system to identify commercial targets and support outreach through a four-stage funnel. It went from kickoff to a live production system in 10 to 14 weeks.',
          'The system qualified inbound and outbound opportunities, ran coordinated outreach and follow-up, and prepped every call. The owner worked the pipeline from one weekly view: leads, quotes, follow-ups, and account expansion.',
        ],
      },
      {
        label: 'Results',
        figure: '7',
        figureLabel: 'Recurring accounts won',
        paragraphs: [
          'The commercial pipeline was rebuilt from zero. The funnel: 42 targets identified, 31 contacted, 18 quoted, 7 recurring accounts won.',
          'Recurring commercial maintenance contracts replaced one-off referral dependency. The documented pipeline also made the business easier for a buyer to diligence.',
        ],
      },
      {
        label: 'How adoption was run',
        figure: '70%',
        figureLabel: 'Weekly-active adoption bar by day 90',
        paragraphs: [
          'Adoption ran on the Adoption Mile. A named operator owned it. The team met on a weekly working cadence. A live adoption scoreboard tracked use of the system.',
          'The engagement was built to the 70 percent weekly-active adoption bar by day 90. That is the standard the firm builds to.',
        ],
      },
    ],
    resultsTable: [
      { metric: 'Targets identified', value: '42' },
      { metric: 'Contacted', value: '31' },
      { metric: 'Quoted', value: '18' },
      { metric: 'Recurring accounts won', value: '7', accent: true },
    ],
  },
  {
    slug: 'pe-portfolio-diagnostic',
    letter: 'C',
    client: 'A PE operating team',
    summary:
      'Ran a portfolio-wide AI diagnostic: 3 companies assessed on one model, 8 priority plays selected, a 12-month execution plan.',
    /** Scope, not outcomes: the same three figures on /proof and /private-equity. */
    metrics: [
      { value: '3', count: 3, label: 'Companies assessed on one model' },
      { value: '8', count: 8, label: 'Priority plays selected' },
      { value: '12', count: 12, label: 'Months in the execution plan' },
    ],
    scopeTag: 'Portfolio-wide',
    headline: 'A PE operating team needed a portfolio view of AI.',
    headlineEmphasis: 'They left with a prioritized execution plan.',
    intro: "A portfolio-wide AI diagnostic, run across the sponsor's portfolio companies.",
    glanceNote: 'Sourced third-party figure',
    glance: [
      {
        display: '98%',
        label:
          "of sponsors have mandated AI adoption. Accordion's May 2026 survey of 150 PE operating partners (accordion.com/the-pe-ai-adoption-benchmark)",
      },
      {
        display: '2',
        count: 2,
        label: 'Weeks per Forge Diagnostic, fixed price',
      },
    ],
    sections: [
      {
        label: 'The situation',
        figure: '98%',
        figureLabel:
          'of sponsors have mandated AI adoption. Source: accordion.com/the-pe-ai-adoption-benchmark',
        paragraphs: [
          "Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing.",
          'This operating team faced that gap. The mandate existed. A portfolio-level picture of where to start did not.',
        ],
      },
      {
        label: 'What was run',
        figure: '3',
        figureLabel: 'Portfolio companies assessed on one model',
        paragraphs: [
          'The team ran the PE Portfolio Pack: a portfolio AI scan, a Diagnostic multipack across portfolio companies, and a sponsor-level adoption scoreboard.',
          'Three portfolio companies were assessed with the same diagnostic model, scored on value pools, readiness, execution risk, and speed to value. For the first time the opportunities were comparable across companies.',
          'Each Forge Diagnostic runs 2 weeks at a fixed price and ends with a decision the sponsor can price.',
        ],
      },
      {
        label: 'Results',
        figure: '8',
        figureLabel: 'Priority plays selected for rollout',
        paragraphs: [
          'The operating team left with a prioritized execution plan across the portfolio: which companies to start with and which workflows to build first.',
          'Eight priority plays made the cut, sequenced into a 12-month plan with 30, 90, and 180-day checkpoints. Each play has a named owner and a KPI cadence. The playbook was built to be reused on future portfolio companies, not consumed once.',
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
