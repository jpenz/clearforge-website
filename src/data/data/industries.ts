export interface IndustryStep {
  title: string;
  description: string;
}

export interface IndustryBenchmark {
  label: string;
  value: string;
}

export interface Industry {
  slug: string;
  /** Rendered lowercase inside the headline emphasis. */
  name: string;
  bandLabel: string;
  workflowSteps: IndustryStep[];
  system: {
    name: string;
    description: string;
  };
  /** Illustrative industry ranges, never ClearForge results. */
  benchmarks: IndustryBenchmark[];
  /** e.g. "in your plant". Used in the starting-point line. */
  locationNoun: string;
}

/**
 * One reusable template that the 19 existing industry pages re-skin onto.
 * Three seeded examples; add an entry to publish a new industry page.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "industrial-manufacturing",
    name: "industrial manufacturing",
    bandLabel: "Industrial manufacturing",
    workflowSteps: [
      {
        title: "Inbound spec arrives",
        description:
          "A buyer emails a drawing or spec pack. Someone re-types it into the system.",
      },
      {
        title: "Engineering review",
        description:
          "An engineer checks feasibility by hand. The spec waits in a queue for their time.",
      },
      {
        title: "Quote assembled",
        description:
          "Pricing is pulled from spreadsheets and old quotes. The draft passes between desks.",
      },
      {
        title: "Order booked",
        description:
          "The win is keyed into the ERP by hand. Nothing from the quote carries over.",
      },
    ],
    system: {
      name: "A quote desk agent.",
      description:
        "An agent that reads inbound specs, drafts quotes for human review, and routes exceptions to your engineers. Your team keeps the final say on every quote. The agent removes the re-typing and the queue time.",
    },
    benchmarks: [
      { label: "Quote turnaround, manual", value: "2 to 5 days" },
      { label: "Spec review time share", value: "20 to 40 percent" },
      {
        label: "Quote win rate lift from faster response",
        value: "Varies by segment",
      },
    ],
    locationNoun: "in your plant",
  },
  {
    slug: "home-and-commercial-services",
    name: "home and commercial services",
    bandLabel: "Home and commercial services",
    workflowSteps: [
      {
        title: "Request arrives",
        description:
          "Requests come in by phone and web form. Someone triages each one by hand.",
      },
      {
        title: "Site visit scheduled",
        description:
          "Scheduling happens across calendars and callbacks. Requests wait in the queue.",
      },
      {
        title: "Quote assembled",
        description:
          "Pricing is pulled from spreadsheets and old jobs. The draft waits for review.",
      },
      {
        title: "Job booked",
        description:
          "The booking is keyed into the field service system by hand. Details drop between systems.",
      },
    ],
    system: {
      name: "An intake and quoting agent.",
      description:
        "An agent that triages inbound requests, drafts the quote, and proposes crew slots. Dispatch keeps the final say on every booking. The agent removes the triage pile and the callback loop.",
    },
    benchmarks: [
      { label: "Time from inquiry to quote, manual", value: "1 to 3 days" },
      { label: "Inquiries lost to slow response", value: "10 to 30 percent" },
      {
        label: "Quote win rate lift from faster response",
        value: "Varies by segment",
      },
    ],
    locationNoun: "in your dispatch office",
  },
  {
    slug: "wholesale-distribution",
    name: "wholesale distribution",
    bandLabel: "Wholesale distribution",
    workflowSteps: [
      {
        title: "Order request arrives",
        description:
          "Orders arrive by email and portal. Someone re-keys each line into the ERP.",
      },
      {
        title: "Availability check",
        description:
          "Stock and lead times are checked by hand across systems and suppliers.",
      },
      {
        title: "Pricing lookup",
        description:
          "Contract pricing lives in spreadsheets and price lists. Exceptions go to a manager.",
      },
      {
        title: "Order entered",
        description:
          "The confirmed order is entered manually. Errors surface at the dock, not the desk.",
      },
    ],
    system: {
      name: "An order desk agent.",
      description:
        "An agent that reads inbound orders, checks availability and contract pricing, and drafts the entry for human review. Your order desk keeps the final say. The agent removes the re-keying and the lookups.",
    },
    benchmarks: [
      { label: "Order entry time, manual", value: "10 to 30 minutes" },
      { label: "Manual entry error rate", value: "1 to 5 percent" },
      {
        label: "Fill rate lift from faster confirmation",
        value: "Varies by segment",
      },
    ],
    locationNoun: "in your warehouse",
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

/** Shared across all industries: every build ships the same named parts. */
export const INDUSTRY_DELIVERABLES = [
  {
    name: "Eval harness",
    detail: "Checks agent outputs against a test set before release.",
  },
  {
    name: "Reliability gates",
    detail: "Hard checks the system must pass before it ships.",
  },
  {
    name: "Live production system",
    detail: "The working system in your stack, not a report.",
  },
  {
    name: "Adoption Mile",
    detail: "To the 70 percent weekly-active bar by day 90.",
  },
];
