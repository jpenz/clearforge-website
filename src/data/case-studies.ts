export interface CaseMetric {
  value: string;
  label: string;
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
  letter: "A" | "B" | "C";
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
    slug: "industrial-conglomerate",
    letter: "A",
    client: "A $4B industrial conglomerate",
    summary:
      "1,181 qualified opportunities across 3 divisions in 6 months, at a 99.8% match rate to real product capabilities. Monthly volume ramped 32x, from 19 to 613. 631+ generated sales playbooks.",
    metrics: [
      { value: "1,181", label: "Qualified opportunities" },
      { value: "3", label: "Divisions" },
      { value: "6", label: "Months" },
      { value: "32x", label: "Monthly ramp, 19 to 613" },
      { value: "631+", label: "Sales playbooks" },
    ],
    scopeTag: "6 months · 3 divisions",
    headline: "A $4B industrial conglomerate needed pipeline.",
    headlineEmphasis: "The system found 1,181 opportunities.",
    intro:
      "One AI system for opportunity identification and qualification, built into production and run across three divisions.",
    glanceNote: "3 figures · All real, anonymized client",
    glance: [
      {
        display: "1,181",
        count: 1181,
        format: true,
        label: "Qualified opportunities across 3 divisions in 6 months",
      },
      {
        display: "32x",
        count: 32,
        suffix: "x",
        label: "Monthly volume ramp, from 19 to 613",
      },
      {
        display: "631+",
        count: 631,
        suffix: "+",
        label: "Generated sales playbooks",
      },
    ],
    sections: [
      {
        label: "The situation",
        figure: "$4B",
        figureLabel: "Industrial conglomerate, 16 divisions, 70+ facilities",
        paragraphs: [
          "A $4B industrial conglomerate ran 16 divisions across 70+ facilities. Sales teams worked in silos with no shared market intelligence. Prospecting was manual and untethered from what the company could actually make. Cross-sell opportunities between divisions were invisible.",
          "Leadership had no unified view of where capital projects were happening or where the white space was. Pipeline depended on individual effort. The company needed one system, and chose three divisions to run it first.",
        ],
      },
      {
        label: "What was built",
        figure: "10\u201314",
        figureLabel: "Weeks from kickoff to production",
        paragraphs: [
          "ClearForge built an AI system for opportunity identification and qualification. It went from kickoff to a live production system in 10 to 14 weeks.",
          "The system watched capital projects and industrial demand signals across 20+ states, matched each opportunity to the company's actual product lines and territories, and generated a rep-ready playbook for each account. Sales feedback on every playbook fed back into the scoring.",
          "It shipped with an eval harness and reliability gates. Outputs were checked against a test set before release. All three divisions worked from the same system.",
        ],
      },
      {
        label: "Results",
        figure: "6",
        figureLabel: "Months of measured output",
        paragraphs: [
          "The system found 1,181 qualified opportunities across 3 divisions in 6 months, at a 99.8% match rate to the client's actual product capabilities. Monthly volume ramped 32x, from 19 to 613, as the scoring calibrated.",
          "It also generated 631+ sales playbooks, one for each account the teams pursued.",
        ],
      },
      {
        label: "How adoption was run",
        figure: "70%",
        figureLabel: "Weekly-active adoption bar by day 90",
        paragraphs: [
          "Adoption ran on the Adoption Mile. A named operator owned it. The teams met on a weekly working cadence. A live adoption scoreboard tracked weekly-active use.",
          "The engagement was built to the 70 percent weekly-active adoption bar by day 90. That is the standard the firm builds to.",
        ],
      },
    ],
    resultsTable: [
      { metric: "Qualified opportunities", value: "1,181" },
      { metric: "Match rate to actual product capabilities", value: "99.8%" },
      { metric: "Monthly volume, start", value: "19" },
      { metric: "Monthly volume, after ramp", value: "613" },
      { metric: "Ramp multiple", value: "32x", accent: true },
      { metric: "Generated sales playbooks", value: "631+" },
    ],
  },
  {
    slug: "services-firm",
    letter: "B",
    client: "A home and commercial services firm",
    summary:
      "Commercial pipeline rebuilt from zero. 42 targets identified, 31 contacted, 18 quoted, 7 recurring accounts won.",
    metrics: [
      { value: "42", label: "Targets identified" },
      { value: "31", label: "Contacted" },
      { value: "18", label: "Quoted" },
      { value: "7", label: "Recurring accounts won" },
    ],
    scopeTag: "4-stage funnel",
    headline: "A home and commercial services firm had no commercial pipeline.",
    headlineEmphasis: "It was rebuilt from zero.",
    intro:
      "One AI system for commercial target identification and outreach, worked through a four-stage funnel.",
    glanceNote: "3 figures · All real, anonymized client",
    glance: [
      {
        display: "42",
        count: 42,
        label: "Commercial targets identified",
      },
      {
        display: "18",
        count: 18,
        label: "Quoted",
      },
      {
        display: "7",
        count: 7,
        label: "Recurring accounts won",
      },
    ],
    sections: [
      {
        label: "The situation",
        figure: "0",
        figureLabel: "Commercial accounts at the start",
        paragraphs: [
          "A home and commercial services firm had run for more than two decades on referrals and reputation. No website, no search presence, no structured outreach. As legacy customers churned, revenue eroded, and there was no pipeline to replace it.",
          "Its commercial pipeline did not exist. There was no target list and no method for working one. The firm needed a way to find commercial accounts and turn them into recurring work.",
        ],
      },
      {
        label: "What was built",
        figure: "10\u201314",
        figureLabel: "Weeks from kickoff to production",
        paragraphs: [
          "ClearForge built an AI system to identify commercial targets and support outreach through a four-stage funnel. It went from kickoff to a live production system in 10 to 14 weeks.",
          "The system qualified inbound and outbound opportunities, ran coordinated outreach and follow-up, and prepped every call. The owner worked the pipeline from one weekly view: leads, quotes, follow-ups, and account expansion.",
          "It shipped with an eval harness and reliability gates. Outputs were checked against a test set before release.",
        ],
      },
      {
        label: "Results",
        figure: "7",
        figureLabel: "Recurring accounts won",
        paragraphs: [
          "The commercial pipeline was rebuilt from zero. The funnel: 42 targets identified, 31 contacted, 18 quoted, 7 recurring accounts won.",
          "Recurring commercial maintenance contracts replaced one-off referral dependency. The documented pipeline also made the business easier for a buyer to diligence.",
        ],
      },
      {
        label: "How adoption was run",
        figure: "70%",
        figureLabel: "Weekly-active adoption bar by day 90",
        paragraphs: [
          "Adoption ran on the Adoption Mile. A named operator owned it. The team met on a weekly working cadence. A live adoption scoreboard tracked weekly-active use.",
          "The engagement was built to the 70 percent weekly-active adoption bar by day 90. That is the standard the firm builds to.",
        ],
      },
    ],
    resultsTable: [
      { metric: "Targets identified", value: "42" },
      { metric: "Contacted", value: "31" },
      { metric: "Quoted", value: "18" },
      { metric: "Recurring accounts won", value: "7", accent: true },
    ],
  },
  {
    slug: "pe-portfolio-diagnostic",
    letter: "C",
    client: "A PE operating team",
    summary:
      "Ran a portfolio-wide AI diagnostic: 3 companies assessed on one model, 8 priority plays selected, a 12-month execution plan.",
    metrics: [],
    scopeTag: "Portfolio-wide",
    headline: "A PE operating team needed a portfolio view of AI.",
    headlineEmphasis: "They left with a prioritized execution plan.",
    intro:
      "A portfolio-wide AI diagnostic, run across the sponsor's portfolio companies.",
    glanceNote: "Sourced third-party figure",
    glance: [
      {
        display: "98%",
        label:
          "of sponsors have mandated AI adoption. Accordion's May 2026 survey of 150 PE operating partners (accordion.com/the-pe-ai-adoption-benchmark)",
      },
      {
        display: "2",
        count: 2,
        label: "Weeks per Forge Diagnostic, fixed price",
      },
    ],
    sections: [
      {
        label: "The situation",
        figure: "98%",
        figureLabel:
          "of sponsors have mandated AI adoption. Source: accordion.com/the-pe-ai-adoption-benchmark",
        paragraphs: [
          "Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing.",
          "This operating team faced that gap. The mandate existed. A portfolio-level picture of where to start did not.",
        ],
      },
      {
        label: "What was run",
        figure: "3",
        figureLabel: "Portfolio companies assessed on one model",
        paragraphs: [
          "The team ran the PE Portfolio Pack: a portfolio AI scan, a Diagnostic multipack across portfolio companies, and a sponsor-level adoption scoreboard.",
          "Three portfolio companies were assessed with the same diagnostic model, scored on value pools, readiness, execution risk, and speed to value. For the first time the opportunities were comparable across companies.",
          "Each Forge Diagnostic runs 2 weeks at a fixed price and ends with a decision the sponsor can price.",
        ],
      },
      {
        label: "Results",
        figure: "8",
        figureLabel: "Priority plays selected for rollout",
        paragraphs: [
          "The operating team left with a prioritized execution plan across the portfolio: which companies to start with and which workflows to build first.",
          "Eight priority plays made the cut, sequenced into a 12-month plan with 30, 90, and 180-day checkpoints. Each play has a named owner and a KPI cadence. The playbook was built to be reused on future portfolio companies, not consumed once.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
