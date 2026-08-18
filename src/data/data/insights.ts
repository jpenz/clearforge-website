export type Inline =
  | string
  | { text: string; bold?: boolean; tnum?: boolean; href?: string };

export type ArticleBlock =
  | { type: "lead"; content: Inline[] }
  | { type: "paragraph"; content: Inline[] }
  | { type: "heading"; text: string }
  | {
      type: "table";
      caption: string;
      headers: string[];
      rows: string[][];
    }
  | { type: "pullquote"; text: string; emphasis: string }
  | { type: "list"; items: string[] };

export interface Article {
  slug: string;
  topic: string;
  title: string;
  titleEmphasis?: string;
  standfirst: string;
  summary: string;
  featured?: boolean;
  blocks: ArticleBlock[];
}

/** Long-form insights. Every number traces to the approved facts list. */
export const ARTICLES: Article[] = [
  {
    slug: "what-ai-consulting-costs",
    topic: "Pricing",
    title: "What AI consulting",
    titleEmphasis: "actually costs.",
    standfirst:
      "Our prices are published. This is what they buy and what changes them.",
    summary:
      "Our own published numbers, explained. Diagnostic at $15K, Sprints from $75K, and what changes the price.",
    featured: true,
    blocks: [
      {
        type: "lead",
        content: [
          "Buyers should not need a sales call to learn what getting started costs. So we publish our prices. This article walks through each tier, what it includes, and the factors that move an engagement up or down the range.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The entry point is fixed. The ",
          { text: "Forge Diagnostic", href: "/services" },
          " is ",
          { text: "$15K,", bold: true, tnum: true },
          " fixed price, and it takes 2 weeks. If your company already built an AI system, the Eval and Reliability Audit is the same shape: ",
          { text: "$15K", bold: true, tnum: true },
          " fixed, 2 weeks, applied to the system you have.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Build work is where ranges appear. A Forge Sprint starts from ",
          { text: "$75K.", bold: true, tnum: true },
          " The typical range runs ",
          { text: "$75K to $200K+.", tnum: true },
          " Every Sprint ships with an eval harness and reliability gates as a named deliverable, not an add-on.",
        ],
      },
      { type: "heading", text: "The published tiers" },
      {
        type: "paragraph",
        content: [
          "Five tiers, five prices. Diagnose and audit at fixed prices. Build in a range. Adopt and run priced monthly. The full ledger:",
        ],
      },
      {
        type: "table",
        caption: "Published pricing tiers with price and duration",
        headers: ["Tier", "Price", "Duration"],
        rows: [
          ["Forge Diagnostic", "$15K fixed", "2 weeks"],
          ["Eval and Reliability Audit", "$15K fixed", "2 weeks"],
          ["Forge Sprint", "From $75K, typical $75K to $200K+", "10 to 14 weeks"],
          ["Forge Scale", "$5K to $15K per month", "Ongoing"],
          ["Forge Run", "$2.5K to $7.5K per system per month", "Ongoing"],
        ],
      },
      {
        type: "paragraph",
        content: [
          "Forge Scale runs the Adoption Mile: a named operator, a weekly working cadence, and a live adoption scoreboard, at ",
          { text: "$5K to $15K per month.", tnum: true },
          " The top tier is a Fractional Chief AI Officer engagement, from ",
          { text: "$15K per month.", bold: true, tnum: true },
          " After a build, Forge Run keeps the system in production for ",
          { text: "$2.5K to $7.5K per system per month.", tnum: true },
        ],
      },
      {
        type: "pullquote",
        text: "A price you can read is",
        emphasis: "a decision you can make.",
      },
      { type: "heading", text: "What changes the price" },
      {
        type: "paragraph",
        content: [
          "The Sprint range is wide because scope is wide. What stays constant is the deliverable. Every Sprint ships with the same named parts:",
        ],
      },
      {
        type: "list",
        items: [
          "An eval harness that checks outputs against a test set.",
          "Reliability gates the system must pass before release.",
          "A live production system, not a report.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The path from kickoff to a live production system runs 10 to 14 weeks. The full breakdown of each tier lives on ",
          { text: "the pricing page", href: "/pricing" },
          " and is published in plain HTML, readable without a call.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "One number sits behind all of these prices. We build to a 70 percent weekly-active adoption bar by day 90. That is the standard the pricing pays for.",
        ],
      },
    ],
  },
  {
    slug: "the-70-percent-adoption-bar",
    topic: "Adoption",
    title: "The 70 percent",
    titleEmphasis: "adoption bar.",
    standfirst:
      "Why we hold every system to 70 percent weekly-active use by day 90.",
    summary:
      "Why we hold every system to 70 percent weekly-active use by day 90, and how the Adoption Mile gets there.",
    blocks: [
      {
        type: "lead",
        content: [
          "Every system we build is held to one standard: 70 percent of the target team uses it every week by day 90. This article explains where that bar sits in an engagement and how the Adoption Mile reaches it.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The deliverable of a Forge Sprint is a live production system. A system in production is not the same as a system in use. The 70 percent weekly-active bar by day 90 is the standard the firm builds to, and it is written into the engagement from the start.",
        ],
      },
      { type: "heading", text: "The Adoption Mile" },
      {
        type: "paragraph",
        content: [
          "Adoption is run as its own phase, priced at ",
          { text: "$5K to $15K per month", tnum: true },
          " inside Forge Scale. It has three named parts:",
        ],
      },
      {
        type: "list",
        items: [
          "A named operator who owns adoption.",
          "A weekly working cadence with the team.",
          "A live adoption scoreboard tracking weekly-active use.",
        ],
      },
      {
        type: "pullquote",
        text: "Shipped is not done.",
        emphasis: "Used is done.",
      },
      { type: "heading", text: "What the scoreboard shows" },
      {
        type: "paragraph",
        content: [
          "The scoreboard tracks weekly-active use against the 70 percent bar. Everyone reads the same number every week. When the number stalls, the weekly cadence exists to find out why and fix it.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The bar also shapes what gets built. A system aimed at 70 percent weekly-active use has to fit the workflow the team already runs. That constraint is set during the ",
          { text: "$15K Forge Diagnostic", href: "/pricing" },
          ", before a single build week is priced.",
        ],
      },
    ],
  },
  {
    slug: "every-sprint-ships-with-an-eval-harness",
    topic: "Reliability",
    title: "Every Sprint ships with",
    titleEmphasis: "an eval harness.",
    standfirst:
      "What eval harnesses and reliability gates are, and why they are a named deliverable.",
    summary:
      "What eval harnesses and reliability gates are, and why they are a named deliverable.",
    blocks: [
      {
        type: "lead",
        content: [
          "Every Forge Sprint ships with an eval harness and reliability gates as a named deliverable. Not an option, not an add-on. This article explains what those two things are and why they are in the contract.",
        ],
      },
      { type: "heading", text: "The eval harness" },
      {
        type: "paragraph",
        content: [
          "An eval harness checks the system's outputs against a test set. Before any change reaches production, the harness runs and reports what improved and what regressed. It turns 'the model seems better' into a number you can read.",
        ],
      },
      { type: "heading", text: "Reliability gates" },
      {
        type: "paragraph",
        content: [
          "Reliability gates are the pass conditions the system must clear before release. If a gate fails, the release stops. The gates make reliability a property of the process rather than a hope about the model.",
        ],
      },
      {
        type: "pullquote",
        text: "Reliability is a process property,",
        emphasis: "not a model property.",
      },
      { type: "heading", text: "Already built something?" },
      {
        type: "paragraph",
        content: [
          "For AI systems your company already built, the ",
          { text: "Eval and Reliability Audit", href: "/services" },
          " applies the same machinery retroactively: ",
          { text: "$15K", bold: true, tnum: true },
          " fixed price, 2 weeks. You get an eval harness, reliability gates, and a fix plan for the system you have.",
        ],
      },
    ],
  },
  {
    slug: "the-sponsor-mandate-gap",
    topic: "Private equity",
    title: "The sponsor",
    titleEmphasis: "mandate gap.",
    standfirst:
      "98 percent of sponsors have mandated AI adoption. About half of portfolio companies are implementing.",
    summary:
      "Accordion's May 2026 survey of 150 PE operating partners: 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing. Source: accordion.com/the-pe-ai-adoption-benchmark.",
    blocks: [
      {
        type: "lead",
        content: [
          "Accordion's May 2026 survey of 150 PE operating partners found 98 percent of sponsors have mandated AI adoption while only about half of portfolio companies are actively implementing (accordion.com/the-pe-ai-adoption-benchmark). That distance between mandate and implementation is the gap this article is about.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A mandate is a sentence in a board deck. Implementation is a working system inside one company's workflow. The gap between the two is not conviction. It is the absence of a portfolio-level view of where to start.",
        ],
      },
      { type: "heading", text: "What closes the gap" },
      {
        type: "paragraph",
        content: [
          "The ",
          { text: "PE Portfolio Pack", href: "/services" },
          " is built for operating teams facing this gap. It has three parts:",
        ],
      },
      {
        type: "list",
        items: [
          "A portfolio AI scan.",
          "A Diagnostic multipack across portfolio companies.",
          "A sponsor-level adoption scoreboard.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Each Forge Diagnostic inside the multipack runs 2 weeks at a fixed price and ends with a build decision the sponsor can price. Pricing for portfolio work is scoped with the sponsor.",
        ],
      },
      {
        type: "pullquote",
        text: "The mandate is not the plan.",
        emphasis: "The plan is the plan.",
      },
      {
        type: "paragraph",
        content: [
          "One case: a PE operating team ran a portfolio-wide AI diagnostic and left with a prioritized execution plan. ",
          { text: "Read the case study", href: "/proof/pe-portfolio-diagnostic" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "10-to-14-weeks-to-production",
    topic: "Delivery",
    title: "10 to 14 weeks",
    titleEmphasis: "to production.",
    standfirst:
      "What happens between kickoff and a live production system.",
    summary: "What happens between kickoff and a live production system.",
    blocks: [
      {
        type: "lead",
        content: [
          "A Forge Sprint runs 10 to 14 weeks from kickoff to a live production system. Not a prototype, not a pilot, not a report. This article walks through what fills those weeks.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The Sprint starts where the ",
          { text: "Forge Diagnostic", href: "/services" },
          " ended: one workflow, mapped and sized, with a priced build decision. That means week one of a Sprint is build work, not discovery.",
        ],
      },
      { type: "heading", text: "What the weeks buy" },
      {
        type: "list",
        items: [
          "The system is built inside the workflow the team already runs.",
          "An eval harness checks outputs against a test set from the first build week.",
          "Reliability gates are set and must pass before production release.",
          "Cutover lands the system in production, live for the team.",
        ],
      },
      {
        type: "pullquote",
        text: "The deliverable is the working system,",
        emphasis: "not a report.",
      },
      { type: "heading", text: "After the cutover" },
      {
        type: "paragraph",
        content: [
          "Production day is the start of the Adoption Mile: a named operator, a weekly working cadence, and a live adoption scoreboard, built to the 70 percent weekly-active bar by day 90. After that, ",
          { text: "Forge Run", href: "/services" },
          " keeps the system operating for ",
          { text: "$2.5K to $7.5K per system per month.", tnum: true },
        ],
      },
    ],
  },
  {
    slug: "two-weeks-one-workflow",
    topic: "Diagnostics",
    title: "Two weeks, one workflow,",
    titleEmphasis: "a build decision.",
    standfirst: "How the $15K Forge Diagnostic works.",
    summary: "How the $15K Forge Diagnostic works.",
    blocks: [
      {
        type: "lead",
        content: [
          "Every ClearForge engagement starts the same way: a Forge Diagnostic at ",
          { text: "$15K,", bold: true, tnum: true },
          " fixed price, 2 weeks. This article walks through what the two weeks contain and what you hold at the end.",
        ],
      },
      { type: "heading", text: "The two weeks" },
      {
        type: "table",
        caption: "The Forge Diagnostic schedule",
        headers: ["Window", "Work"],
        rows: [
          ["Week 1", "Map the workflow, size the opportunity"],
          ["Week 2", "Prove viability, price the build"],
          ["Day 10 to 14", "A decision you can price: build, fix, or stop"],
        ],
      },
      {
        type: "paragraph",
        content: [
          "Week one is spent inside the workflow, putting a number on what the manual steps cost. Week two tests the candidate system against your real data and scopes the Sprint.",
        ],
      },
      {
        type: "pullquote",
        text: "It ends with a decision you can price,",
        emphasis: "not a report you file.",
      },
      { type: "heading", text: "What you hold at the end" },
      {
        type: "paragraph",
        content: [
          "A build decision with a price on it. If you build, the ",
          { text: "Forge Sprint", href: "/pricing" },
          " is priced from ",
          { text: "$75K", bold: true, tnum: true },
          " and runs 10 to 14 weeks to a live production system. If the answer is stop, you spent $15K to avoid a build that would not have worked. Both outcomes are the product.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Not sure which workflow to start with? ",
          { text: "Map the Workflow", href: "/discover" },
          " with Forge Intelligence, free, before you book anything.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getReadNext(slug: string, count = 2) {
  const index = ARTICLES.findIndex((article) => article.slug === slug);
  if (index === -1) return ARTICLES.slice(0, count);
  return Array.from(
    { length: count },
    (_, i) => ARTICLES[(index + i + 1) % ARTICLES.length],
  );
}
