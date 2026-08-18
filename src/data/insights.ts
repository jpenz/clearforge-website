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
  {
    slug: "clearforge-ai-transformation-maturity-model",
    topic: "Strategy",
    title: "The ClearForge AI transformation",
    titleEmphasis: "maturity model.",
    standfirst:
      "Five levels for judging whether AI is still a tool experiment or part of how the company runs.",
    summary:
      "A five-level model: Tool Use, Pilot Activity, Workflow Adoption, Operating Cadence, Learning System. Most companies sit between the first two.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI transformation maturity is not measured by how many tools a company has tested. It is measured by whether important work now runs with clearer ownership, better context, safer controls, faster decisions, and a recurring measurement cadence. The ClearForge model has five levels: Tool Use, Pilot Activity, Workflow Adoption, Operating Cadence, and Learning System.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Most companies are between Level 1 and Level 2. They have activity, enthusiasm, and experiments. The value comes when leaders move one workflow at a time into Level 3 and Level 4, where the system has an owner, baseline, data path, human review pattern, dashboard, and monthly improvement loop.",
        ],
      },
      { type: "heading", text: "What is AI transformation maturity?" },
      {
        type: "paragraph",
        content: [
          "AI transformation maturity is the operating capability to choose, build, adopt, govern, and improve AI-enabled workflows. It is different from AI literacy, tool adoption, or model sophistication.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A company can have thousands of employees using copilots and still be immature if no critical workflow has changed. A smaller company can be more mature if one revenue, service, or operations workflow is redesigned, measured, and actively managed.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The executive question is simple: has AI changed how the business creates value, or has it only changed how people draft emails and summarize meetings?",
        ],
      },
      { type: "heading", text: "Level 1: Tool Use" },
      {
        type: "paragraph",
        content: [
          "At Level 1, individuals use AI tools for personal productivity. They draft copy, summarize documents, analyze spreadsheets, or prepare meeting notes. This is useful, but it is not yet transformation. The signals:",
        ],
      },
      {
        type: "list",
        items: [
          "Usage is individual and uneven.",
          "Data stays outside the workflow.",
          "Leaders cannot tie activity to a business KPI.",
          "Risk rules are informal.",
          "Adoption depends on personal interest.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The next move is not to block tool use. The next move is to identify where informal usage reveals a real operating constraint: sales prep, service response, reporting, proposal work, onboarding, exception handling, quality review, or decision support.",
        ],
      },
      { type: "heading", text: "Level 2: Pilot Activity" },
      {
        type: "paragraph",
        content: [
          "At Level 2, the company has pilots. Teams are testing chatbots, copilots, automations, retrieval systems, or agents. The work feels more serious, but the business still has not changed how it runs. The signals:",
        ],
      },
      {
        type: "list",
        items: [
          "The pilot has a sponsor but not always an operating owner.",
          "Success is described as model quality, not business movement.",
          "Data access is patched together.",
          "Controls are added late.",
          "The handoff from pilot to production is unclear.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This is where many companies stall. The fix is to stop asking whether the technology works and start asking whether the workflow is ready to run differently.",
        ],
      },
      { type: "heading", text: "Level 3: Workflow Adoption" },
      {
        type: "paragraph",
        content: [
          "At Level 3, AI is attached to a real workflow. The system has a start point, end point, data path, owner, review rule, and operating metric. People know when to use it and when to override it. The signals:",
        ],
      },
      {
        type: "list",
        items: [
          "A business leader owns the KPI.",
          "The workflow boundary is explicit.",
          "Users are trained on the new way of working.",
          "Exceptions route to the right person.",
          "The dashboard shows usage and outcome movement.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This is the first level where transformation becomes visible. The company can now say that this work runs differently because AI is part of the operating model.",
        ],
      },
      { type: "heading", text: "Level 4: Operating Cadence" },
      {
        type: "paragraph",
        content: [
          "At Level 4, the workflow is managed like a business capability. Leaders review adoption, quality, exceptions, cycle time, cost, revenue, service, or margin movement on a recurring cadence. The system improves because the management routine exists. The signals:",
        ],
      },
      {
        type: "list",
        items: [
          "Monthly or biweekly review meetings include AI-enabled workflow metrics.",
          "Leaders compare actual adoption against the value case.",
          "The team reviews failure modes and improves prompts, rules, data, or process steps.",
          "Governance is practical and visible.",
          "The backlog for the next wave is tied to observed performance.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This is the level most CEOs, COOs, and PE operating partners should be aiming for first. It is mature enough to create repeatable value without pretending the whole company has been rebuilt.",
        ],
      },
      { type: "heading", text: "Level 5: Learning System" },
      {
        type: "paragraph",
        content: [
          "At Level 5, the company has a repeatable capability for finding, building, operating, and improving AI workflows across functions. The organization is not dependent on isolated enthusiasm. It has a method. The signals:",
        ],
      },
      {
        type: "list",
        items: [
          "The AI portfolio is reviewed with the same discipline as pricing, procurement, sales effectiveness, service quality, and operational improvement.",
          "Each build creates reusable patterns for data, controls, adoption, measurement, and governance.",
          "Teams know how to propose the next workflow and what evidence is required.",
          "Leaders can compare opportunities across functions and business units.",
          "The company gets faster at each new deployment because learning is captured.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Level 5 does not mean everything is automated. It means the company has learned how to change work responsibly.",
        ],
      },
      { type: "heading", text: "The six signals to score" },
      {
        type: "paragraph",
        content: [
          "Leaders can assess maturity by scoring six signals for each AI initiative:",
        ],
      },
      {
        type: "list",
        items: [
          "Owner: who owns the business outcome?",
          "Baseline: what metric is measured before build?",
          "Workflow: what work changes from start to finish?",
          "Context: what data, documents, rules, or system records does the AI need?",
          "Controls: when does the system act, recommend, escalate, or stop?",
          "Cadence: how will leaders review adoption and performance after launch?",
        ],
      },
      {
        type: "paragraph",
        content: [
          "If any of these are missing, the initiative is probably still Level 1 or Level 2 no matter how impressive the demo looks.",
        ],
      },
      {
        type: "pullquote",
        text: "Activity is not",
        emphasis: "operating progress.",
      },
      { type: "heading", text: "How CEOs and COOs should use the model" },
      {
        type: "paragraph",
        content: [
          "Use the model to separate activity from operating progress. Ask every function to list its current AI work and classify each item by maturity level. Then pick one workflow that can reach Level 3 or Level 4 within a focused sprint.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The right first workflow usually has clear volume, a measurable baseline, available context, visible pain, and a leader who cares enough to change the routine. It does not need to be the flashiest idea. It needs to be the one the business can actually operate.",
        ],
      },
      { type: "heading", text: "How PE operating partners should use the model" },
      {
        type: "paragraph",
        content: [
          "PE teams can use the model to compare portfolio companies without forcing every company into the same use case. One company may be ready for revenue intelligence. Another may need service triage. Another may need finance close support or quality exceptions.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The maturity lens gives the operating team a shared language: where are we still testing tools, where do we have pilots, where is a workflow adopted, and where do we have a repeatable operating cadence? That view makes it easier to build a portfolio playbook without flattening the differences between companies.",
        ],
      },
      { type: "heading", text: "What ClearForge builds toward" },
      {
        type: "paragraph",
        content: [
          "ClearForge does not start with a platform decision. We start with the operating constraint. The work is to move a selected workflow from Level 1 or Level 2 into Level 3 and Level 4: owner named, baseline set, data path designed, controls defined, users trained, dashboard live, and review cadence running.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "That is the difference between AI activity and AI transformation.",
        ],
      },
      { type: "heading", text: "What to do this month" },
      {
        type: "paragraph",
        content: [
          "Choose one workflow where AI activity already exists but value is not visible. Score it against the six signals. If the owner, baseline, workflow, context, controls, and cadence are not clear, pause the tool debate and redesign the operating model. Then build only what that workflow needs to reach production. Not sure where to start? ",
          { text: "Take the scorecard", href: "/scorecard" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "ai-pilots-operating-systems",
    topic: "Strategy",
    title: "Why AI pilots fail to become",
    titleEmphasis: "operating systems.",
    standfirst:
      "Most pilots prove that a model can work. They do not prove that the business can run differently.",
    summary:
      "Pilots stall when the owner, data path, controls, and cadence never change. The five missing pieces and a six-question test.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI pilots fail when they test technology without redesigning the workflow around it. The problem is rarely that the model cannot produce useful output. The problem is that the business has not defined the owner, data path, exception rules, approval logic, adoption cadence, or performance metric that would make the output operational. A pilot becomes an operating system only when it changes how work is triggered, routed, decided, measured, and improved.",
        ],
      },
      { type: "heading", text: "A pilot is not a transformation" },
      {
        type: "paragraph",
        content: [
          "Most AI pilots are designed to answer a narrow question: can this model or agent complete a task? That is useful, but it is not enough. A company can run a successful pilot and still fail to create business value because the surrounding operating model never changed.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The leadership question is different: can this workflow run faster, cheaper, better, or more consistently because AI is now part of the way work happens? That question forces a different design standard.",
        ],
      },
      { type: "heading", text: "The five missing pieces" },
      {
        type: "paragraph",
        content: [
          { text: "A business owner.", bold: true },
          " If no leader owns the KPI, the pilot becomes a technology experiment. Every meaningful AI initiative needs a named business owner accountable for revenue, cost, throughput, quality, or service movement.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "A workflow boundary.", bold: true },
          " AI cannot improve an undefined process. The team needs to know when the work starts, what context the system receives, what action the AI takes, what a person reviews, and when the workflow ends.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "A data path.", bold: true },
          " Strong AI output depends on context. If customer records, documents, pricing logic, case history, or operating rules are scattered across systems, the build must solve that context problem before scale.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Control rules.", bold: true },
          " Production AI needs confidence thresholds, escalation paths, human approval, audit trail, rollback, and clear failure modes. These rules are not bureaucracy. They are what makes the system safe enough to use.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "An improvement cadence.", bold: true },
          " AI systems drift without management. Leaders need a recurring review of usage, quality, exceptions, cycle time, and outcome movement. That cadence turns launch into compounding learning.",
        ],
      },
      { type: "heading", text: "The pilot-to-system test" },
      {
        type: "paragraph",
        content: [
          "A pilot is ready to become an operating system when the team can answer six questions:",
        ],
      },
      {
        type: "list",
        items: [
          "Which KPI should move?",
          "Who owns the KPI?",
          "What workflow will change?",
          "What context does the system need?",
          "What decisions stay with people?",
          "How will performance be reviewed after launch?",
        ],
      },
      {
        type: "paragraph",
        content: [
          "If those answers are fuzzy, more experimentation will not help much. The better move is to redesign the operating model around one high-value workflow and then build narrowly.",
        ],
      },
      {
        type: "pullquote",
        text: "The result is not an AI tool.",
        emphasis: "It is a new way to run the work.",
      },
      { type: "heading", text: "What ClearForge builds instead" },
      {
        type: "paragraph",
        content: [
          "ClearForge starts with the value chain, not the model. We identify the places where better information, faster routing, stronger recommendations, or automated execution can change business performance. Then we build the custom agents, data paths, dashboards, controls, and adoption routines around that workflow.",
        ],
      },
      { type: "heading", text: "Recommended next move" },
      {
        type: "paragraph",
        content: [
          "Choose one pilot that looked promising but stalled. Reframe it as an operating-system design problem. Map the workflow, owner, KPI, data path, controls, and adoption cadence before deciding whether to invest another dollar in technology. The ",
          { text: "$15K Forge Diagnostic", href: "/services" },
          " does exactly this mapping in 2 weeks.",
        ],
      },
    ],
  },
  {
    slug: "custom-agent-stack-mid-market",
    topic: "Agents",
    title: "The custom agent stack for",
    titleEmphasis: "mid-market companies.",
    standfirst:
      "Six layers connect work, data, controls, and dashboards. Start with the workflow, not the platform.",
    summary:
      "The six layers of a working agent stack: triggers, context, workflows, review, integration, and measurement. Build the smallest stack that moves the KPI.",
    blocks: [
      {
        type: "lead",
        content: [
          "A custom agent stack is the set of AI workers, workflow rules, data context, integrations, approvals, and dashboards that let a company run a specific operating process better. Mid-market leaders should avoid starting with a platform decision. Start with the workflow economics, then build the smallest reliable stack that can move the KPI.",
        ],
      },
      { type: "heading", text: "The stack starts with the work" },
      {
        type: "paragraph",
        content: [
          "The best agent systems do not begin with the question of which model to use. They begin with the question of which workflow should run differently. That distinction matters because agent design is mostly operating design.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "For a revenue team, the workflow might be signal detection, account prioritization, playbook generation, contact discovery, outreach prep, and manager coaching. For a service team, it might be intake triage, case summarization, knowledge retrieval, response drafting, escalation, and QA. The stack should fit the work.",
        ],
      },
      { type: "heading", text: "Layer 1: Signal and trigger logic" },
      {
        type: "paragraph",
        content: [
          "Every AI workflow needs a trigger. Something happens that starts the work: a new lead, capital project, customer complaint, quality exception, invoice mismatch, renewal risk, or executive request. Good systems define the trigger precisely and prevent noisy activity from flooding the team.",
        ],
      },
      { type: "heading", text: "Layer 2: Business context" },
      {
        type: "paragraph",
        content: [
          "Agents need structured context from CRM, ERP, documents, product rules, pricing history, customer records, support tickets, and policies. The quality of the context usually matters more than the novelty of the model.",
        ],
      },
      { type: "heading", text: "Layer 3: Agent workflows" },
      {
        type: "paragraph",
        content: [
          "This is where the system performs useful work: research, enrichment, summarization, classification, recommendation, routing, drafting, calculation, or execution. The agent should have a clear job and a clear boundary.",
        ],
      },
      { type: "heading", text: "Layer 4: Human review and escalation" },
      {
        type: "paragraph",
        content: [
          "Mid-market companies need practical controls. The system should know when confidence is high enough to proceed, when a person must approve, when to escalate, and when to stop. This is how leaders get speed without losing control.",
        ],
      },
      { type: "heading", text: "Layer 5: Integration into daily tools" },
      {
        type: "paragraph",
        content: [
          "If the workflow lives outside the systems people already use, adoption suffers. A good custom stack pushes the right action into CRM, ticketing, email, chat, ERP, dashboards, or the purpose-built interface where the work is managed.",
        ],
      },
      { type: "heading", text: "Layer 6: Performance dashboard" },
      {
        type: "paragraph",
        content: [
          "Leaders need to see usage, quality, cycle time, exception rate, conversion, cost savings, and financial movement. Without measurement, the system becomes another invisible layer of software.",
        ],
      },
      {
        type: "pullquote",
        text: "Custom does not mean complex.",
        emphasis: "It means built around your work.",
      },
      { type: "heading", text: "What not to overbuild" },
      {
        type: "paragraph",
        content: [
          "Do not start by trying to automate everything. Do not build a general agent that can do any task. Do not require a perfect data lake before starting. The right first stack is narrow, measurable, and connected to a workflow where the economics are obvious.",
        ],
      },
      { type: "heading", text: "The ClearForge view" },
      {
        type: "paragraph",
        content: [
          "Custom does not mean unnecessarily complex. It means the system is designed around the way your business actually creates value. The first version should be tight enough to launch quickly and instrumented enough to improve every month. That is what a ",
          { text: "Forge Sprint", href: "/services" },
          " builds in 10 to 14 weeks.",
        ],
      },
    ],
  },
  {
    slug: "pe-ai-ebitda-playbook",
    topic: "Private equity",
    title: "How PE firms turn AI experiments",
    titleEmphasis: "into EBITDA.",
    standfirst:
      "Treat AI as a portfolio operating capability, not a collection of experiments.",
    summary:
      "Diagnose value pools, score readiness, choose plays over pilots, install governance, and measure EBITDA-linked KPIs on a portfolio cadence.",
    blocks: [
      {
        type: "lead",
        content: [
          "Private equity firms create AI value when they treat AI as a portfolio operating capability, not a collection of experiments. The practical path is to diagnose value pools, score readiness, select a small number of high-confidence plays, install governance, and measure the movement in EBITDA-linked KPIs.",
        ],
      },
      { type: "heading", text: "The PE AI trap" },
      {
        type: "paragraph",
        content: [
          "Many portfolio companies are experimenting with AI independently. One team tests customer service tools. Another tries sales automation. Another buys copilot licenses. Activity rises, but the operating team still cannot answer the important question: where is AI moving EBITDA?",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The problem is not lack of interest. It is lack of a portfolio operating model.",
        ],
      },
      { type: "heading", text: "Start with value pools" },
      {
        type: "paragraph",
        content: [
          "AI value creation should map to the same levers operating teams already manage: revenue growth, gross margin, SG&A efficiency, working capital, retention, service cost, quality cost, and management productivity. A good diagnostic starts by identifying where those value pools are largest and where workflows are most ready for change.",
        ],
      },
      { type: "heading", text: "Score readiness before sequencing" },
      {
        type: "paragraph",
        content: [
          "The highest-value idea is not always the best first build. Portfolio teams should score each use case by data readiness, system complexity, adoption risk, leadership ownership, implementation speed, and repeatability across companies. This prevents capital from going into attractive but hard-to-operate ideas too early.",
        ],
      },
      { type: "heading", text: "Choose plays, not pilots" },
      {
        type: "paragraph",
        content: [
          "A play has a clear business owner, baseline metric, implementation pattern, dashboard, and governance cadence. A pilot often has a tool and a vague hope. PE teams should build a library of plays that can repeat across companies with adaptation.",
        ],
      },
      { type: "heading", text: "Examples of EBITDA-linked AI plays" },
      {
        type: "paragraph",
        content: [
          { text: "Revenue intelligence.", bold: true },
          " Agents identify high-fit prospects, expansion signals, churn risk, pricing opportunities, and account actions. The KPI link is pipeline quality, win rate, retention, and sales productivity.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Service cost and quality.", bold: true },
          " Agents triage cases, draft responses, retrieve knowledge, summarize interactions, and flag escalation risk. The KPI link is handle time, first-contact resolution, service cost, and customer satisfaction.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Operations throughput.", bold: true },
          " Agents compress quoting, scheduling, reporting, order review, invoice matching, and exception handling. The KPI link is labor capacity, cycle time, error rate, and margin leakage.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Management productivity.", bold: true },
          " Agents prepare operating reviews, synthesize KPIs, identify exceptions, draft action plans, and track commitments. The KPI link is decision speed and leadership capacity.",
        ],
      },
      { type: "heading", text: "Governance is a value lever" },
      {
        type: "paragraph",
        content: [
          "Governance is sometimes treated as a brake. In PE-backed companies, it should be treated as an accelerator. Clear approval rules, access control, audit trail, and KPI ownership make management teams more comfortable moving from experiment to production.",
        ],
      },
      { type: "heading", text: "The portfolio operating cadence" },
      {
        type: "paragraph",
        content: [
          "The most effective PE teams run a recurring AI value creation cadence:",
        ],
      },
      {
        type: "list",
        items: [
          "Monthly review of portfolio AI opportunities.",
          "Company-level readiness and value scoring.",
          "Wave-based build sequencing.",
          "KPI dashboard review.",
          "Playbook capture after each deployment.",
          "Reuse across the next company.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "That cadence turns learning into an operating asset.",
        ],
      },
      {
        type: "pullquote",
        text: "Choose plays,",
        emphasis: "not pilots.",
      },
      { type: "heading", text: "The ClearForge view" },
      {
        type: "paragraph",
        content: [
          "AI should show up in the value creation plan with the same rigor as pricing, procurement, sales effectiveness, or lean operations. The difference is that AI can create compounding capability when the playbook is reusable.",
        ],
      },
      { type: "heading", text: "Recommended next move" },
      {
        type: "paragraph",
        content: [
          "Run a 90-day portfolio AI diagnostic. Select the first wave of EBITDA-linked plays, assign owners, and build one production workflow that can become a reusable pattern across the portfolio. One operating team did exactly this. ",
          { text: "Read the case study", href: "/proof/pe-portfolio-diagnostic" },
          ".",
        ],
      },
    ],
  },
  {
    slug: "widening-ai-value-gap",
    topic: "Strategy",
    title: "The widening",
    titleEmphasis: "AI value gap.",
    standfirst:
      "AI leaders are compounding advantages while most companies stay in pilot loops.",
    summary:
      "The gap between companies that turn AI into operating performance and companies that only produce AI activity, why it is widening, and the sequence that closes it.",
    blocks: [
      {
        type: "lead",
        content: [
          "The AI value gap is the distance between companies that turn AI into operating performance and companies that only produce AI activity. Leaders are widening the gap because they focus on workflow-level economics, build operating systems rather than isolated pilots, and run continuous optimization loops. Laggards remain stuck in vendor theater, fragmented ownership, and weak adoption. The fix is not more experimentation. The fix is disciplined sequencing from strategy to build to managed operations.",
        ],
      },
      { type: "heading", text: "The AI value gap is not a technology gap" },
      {
        type: "paragraph",
        content: [
          "The market narrative still treats AI adoption as if every company is standing at the same starting line. That assumption is false. In practice, organizations are on very different maturity curves. Some have already integrated AI into planning, commercial execution, support operations, and decision cycles. Others have AI chat tools in individual departments but no measurable impact on cycle time, quality, margin, or revenue conversion.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This is why AI adoption is a poor metric. Adoption can mean a few licenses and internal demos. Value requires measurable operating movement. When a leadership team says it is adopting AI, the real question is what KPI moved, by how much, and at what cost. If that answer is unclear, the company is likely active but not improving.",
        ],
      },
      { type: "heading", text: "Why the gap is widening faster than expected" },
      {
        type: "paragraph",
        content: [
          "The first reason is compounding learning loops. AI systems that run in production generate feedback data every day. Teams operating those systems use that data to improve prompts, routing logic, model choice, and escalation rules. As that loop repeats, output quality rises and operating friction falls. A company running this loop for twelve months has a structural advantage over a company that has only completed a few pilots.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The second reason is organizational muscle memory. Teams that have already redesigned roles around human-plus-agent workflows move faster on each new use case. They know how to scope, launch, monitor, and govern. Teams without this muscle treat each initiative as a new program. The difference in speed, confidence, and quality grows quarter by quarter.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The third reason is portfolio spillover. Once one workflow is modernized, adjacent workflows often become easier to modernize because data quality improves and process handoffs become cleaner. Companies that have moved early therefore benefit from second-order improvements. Companies that have not continue to accumulate complexity.",
        ],
      },
      { type: "heading", text: "The five failure patterns behind the gap" },
      {
        type: "paragraph",
        content: [
          { text: "Pilot theater instead of operating priorities.", bold: true },
          " Many companies launch pilots because a tool looked compelling, not because a workflow had clear economic upside. These pilots can look successful in demos while failing to matter in the P&L. A useful heuristic: if a pilot does not tie to a named KPI owner and a measurable threshold for success, it is likely theater.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Strategy and delivery split across vendors.", bold: true },
          " A familiar pattern is a strategy firm delivering a high-level roadmap and a separate technical provider attempting implementation. Accountability fractures at the handoff. Assumptions in the strategy layer are rarely tested against workflow reality until late, creating rework and delay.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "No workforce redesign.", bold: true },
          " Technology can change overnight. Behavior does not. Teams often receive new tools but keep old process definitions and old role expectations. This produces confusion, trust erosion, and low usage. AI becomes an extra layer rather than a better way of working.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Fragmented data context.", bold: true },
          " Even strong models underperform in poor information environments. If core workflows rely on disconnected systems, incomplete records, and inconsistent definitions, AI outputs will remain noisy. Leaders who close the gap treat data readiness as workflow infrastructure, not as a side project.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "No managed operations function.", bold: true },
          " Many organizations assume that once systems launch, value will sustain itself. In practice, performance decays without ongoing monitoring and optimization. Market context changes. Customer behavior shifts. Process bottlenecks move. Without a managed loop, systems drift.",
        ],
      },
      { type: "heading", text: "What AI leaders do differently" },
      {
        type: "paragraph",
        content: [
          "AI leaders choose a high-impact workflow and define a small set of hard outcomes before building anything. They map baseline metrics, choose a practical first scope, and launch with operating controls. Then they create a monthly cadence for optimization and expansion.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "They also define ownership clearly. Someone on the business side owns outcome metrics, and someone on the technical side owns system reliability and improvement velocity. These are not committee responsibilities. They are explicit accountabilities.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Finally, leaders build communication discipline. They publish progress against business outcomes in plain language. They do not hide behind model complexity or vanity metrics. This creates trust across executive, operator, and frontline groups.",
        ],
      },
      { type: "heading", text: "A practical sequence for closing the gap" },
      {
        type: "list",
        items: [
          "Diagnose value pools. Map your top workflows by volume, error rate, cycle time, and economic impact. Prioritize by expected value and implementation feasibility.",
          "Build a narrow first system. Design for one workflow with clear boundaries, human override paths, quality checks, and rollback options. Launch only when measurement is in place.",
          "Run a 90-day learning loop. Treat the first quarter as operating design, not final state. Measure where outputs fail and where handoffs slow down. Improve every week.",
          "Expand to adjacent workflows. Reuse governance, integration patterns, and role enablement from the first system.",
          "Institutionalize managed AI operations. Create a permanent rhythm for performance reviews, optimization backlog, and roadmap decisions.",
        ],
      },
      {
        type: "pullquote",
        text: "AI value compounds only if",
        emphasis: "the operating loop exists.",
      },
      { type: "heading", text: "What this means for boards and investors" },
      {
        type: "paragraph",
        content: [
          "Boards increasingly ask whether AI strategy exists. The better question is whether AI operating capability exists. Strategy without operating capability is temporary confidence. Operating capability without strategy is local optimization. Durable value requires both.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "For investors, the signal is whether portfolio companies can repeatedly convert AI initiatives into measurable operating gains. Organizations that demonstrate repeatability in this conversion will likely command better strategic options over time.",
        ],
      },
      { type: "heading", text: "The leadership conversation to have this quarter" },
      {
        type: "paragraph",
        content: [
          "If your organization is still asking what AI can do for it, shift the question to which workflow should produce measurable gains in the next 90 days. This reframing forces specificity. It also exposes whether your team is prepared to run AI as an operating capability.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Closing the AI value gap is less about visionary declarations and more about disciplined execution. The companies that win will not be the loudest on AI messaging. They will be the ones that consistently turn AI into operating outcomes.",
        ],
      },
      { type: "heading", text: "Recommended next move" },
      {
        type: "paragraph",
        content: [
          "Run an AI value-gap diagnostic across your top workflows and assign clear ownership for one high-value launch. If you need a structured path, start with the ",
          { text: "$15K Forge Diagnostic", href: "/services" },
          ", then move directly into a build and managed operations cycle.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-new-workforce",
    topic: "Agents",
    title: "AI agents are",
    titleEmphasis: "the new workforce.",
    standfirst:
      "Where agents create value, where they fail, and what CEOs must do now.",
    summary:
      "Agents are a new class of digital worker for repeatable execution. Five CEO moves: define agent-eligible work, set authority boundaries, redesign roles, build controls, expand on a rhythm.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI agents are best understood as a new class of digital worker that executes repeatable tasks with speed and consistency. They do not replace leadership judgment, but they can absorb high-volume execution work and free teams for higher-value decisions. CEOs who treat agents as isolated software purchases will struggle. CEOs who redesign workflows, governance, and roles around human-plus-agent systems will capture disproportionate gains.",
        ],
      },
      { type: "heading", text: "Why tool thinking is no longer enough" },
      {
        type: "paragraph",
        content: [
          "For years, software was mostly assistive. A person opened an application, clicked through steps, and completed work manually. AI agents change that pattern because they can complete multi-step execution loops autonomously within defined boundaries.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "That shift matters because it changes how operating models are built. If a workflow can be partially or mostly executed by agents, then team design, role definitions, manager expectations, and KPI systems all need updates. Keeping old management assumptions while adding agents creates confusion and low trust.",
        ],
      },
      { type: "heading", text: "A practical definition CEOs can use" },
      {
        type: "paragraph",
        content: ["An AI agent is a software system that can:"],
      },
      {
        type: "list",
        items: [
          "Interpret a goal and relevant context.",
          "Plan and execute a sequence of steps.",
          "Interact with tools and systems.",
          "Escalate exceptions when confidence or authority thresholds are exceeded.",
          "Learn from feedback over time.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This definition avoids hype. It also clarifies the boundary: an agent is not magic and it is not fully autonomous governance. It is a controllable execution system.",
        ],
      },
      { type: "heading", text: "Where agents deliver reliable business value" },
      {
        type: "paragraph",
        content: [
          { text: "Revenue operations.", bold: true },
          " Agents can triage inbound leads, enrich records, prioritize outreach, and route opportunities to the right rep. The result is usually faster response times, improved qualification consistency, and cleaner pipeline hygiene.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Operations and shared services.", bold: true },
          " In finance, HR, and support operations, agents can process routine requests, prepare summaries, and coordinate handoffs. This often reduces cycle times while improving consistency.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Knowledge workflows.", bold: true },
          " For teams that spend substantial time on repetitive synthesis and reporting, agents can gather inputs, draft first-pass materials, and monitor signal changes. Human experts then focus on judgment, tradeoffs, and client communication.",
        ],
      },
      { type: "heading", text: "Why many agent initiatives still fail" },
      {
        type: "paragraph",
        content: [
          "The failure mode is rarely model quality alone. More often, leadership launches agents without workflow redesign. If the old process remains unchanged and the new agent is inserted in an ad hoc way, teams create parallel workstreams, duplicate reviews, and hidden bottlenecks.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Another failure mode is weak exception handling. Every real workflow contains edge cases. If teams do not define when an agent should escalate and who resolves the issue, trust collapses quickly.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A third failure mode is missing performance governance. Without clear metrics and regular review cadence, organizations cannot distinguish between real improvement and temporary novelty.",
        ],
      },
      { type: "heading", text: "The CEO agenda: five moves that matter" },
      {
        type: "list",
        items: [
          "Define agent-eligible work. Start with high-volume tasks where rules are clear, variation is manageable, and outcome metrics are objective. This is where reliability and ROI are easiest to establish.",
          "Set human authority boundaries. Define which decisions agents can execute independently and which require human approval. Document the boundaries explicitly.",
          "Redesign roles and incentives. If agents absorb certain tasks, people need new expectations. Measure teams on outcomes and exception quality, not manual activity volume.",
          "Build a control framework. Set quality thresholds, escalation paths, logging standards, and incident response routines. This converts agent initiatives from experiments into managed operations.",
          "Create a 90-day expansion rhythm. After one workflow is stable, expand to adjacent workflows with similar patterns. Repeatability is the real strategic advantage.",
        ],
      },
      { type: "heading", text: "The hybrid workforce model in practice" },
      {
        type: "paragraph",
        content: [
          "The hybrid workforce is not humans versus AI. It is a coordinated system where humans and agents perform different parts of the same workflow based on comparative advantage.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Agents are better at speed, consistency, and high-volume repetitive execution. Humans are better at contextual judgment, relationship management, ethical decisions, and handling ambiguity. High-performing organizations design for this complementarity. They do not force humans to imitate machines or expect machines to replace strategic judgment.",
        ],
      },
      { type: "heading", text: "What to measure in the first six months" },
      {
        type: "list",
        items: [
          "Cycle-time reduction in selected workflows.",
          "Error-rate and rework trend after launch.",
          "Throughput per full-time employee in affected processes.",
          "Exception-handling quality and response time.",
          "Adoption and trust signals from frontline managers.",
          "Economic impact mapped to cost, revenue, or risk reduction.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "These metrics keep leadership grounded in outcomes rather than feature lists.",
        ],
      },
      { type: "heading", text: "Common CEO questions" },
      {
        type: "paragraph",
        content: [
          { text: "Will agents eliminate jobs immediately?", bold: true },
          " In most organizations, near-term impact is role redesign and capacity shift, not immediate headcount collapse. Over time, staffing patterns will change, but transition quality depends on leadership choices.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Should we centralize agent ownership?", bold: true },
          " Centralize standards and governance. Decentralize workflow ownership. Business leaders should own outcomes in their domains, while a shared function supports architecture and controls.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Can we buy this off the shelf?", bold: true },
          " Some use cases can be accelerated with third-party tools. Durable advantage usually comes from integrating agents into proprietary workflows and data contexts.",
        ],
      },
      {
        type: "pullquote",
        text: "Agent technology can be bought.",
        emphasis: "Hybrid capability must be built.",
      },
      { type: "heading", text: "Strategic implication for the next 24 months" },
      {
        type: "paragraph",
        content: [
          "Every CEO should assume that competitors will improve execution density by deploying agents in operational workflows. The question is not whether this happens. The question is whether your organization develops the capability early enough to shape market outcomes rather than react to them.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The companies that move now will gather process intelligence, role fluency, and governance maturity that are difficult for late entrants to replicate quickly.",
        ],
      },
      { type: "heading", text: "What to do next" },
      {
        type: "paragraph",
        content: [
          "Pick one revenue or operations workflow that is currently manual, high-volume, and measurable. Design an agent-enabled version with explicit controls and a 90-day optimization plan. Then evaluate whether your leadership model, performance systems, and team roles are ready for expansion. If they are not, address that gap before scaling.",
        ],
      },
    ],
  },
  {
    slug: "legacy-systems-ai-bridge",
    topic: "Modernization",
    title: "Your legacy systems do not",
    titleEmphasis: "have to die.",
    standfirst:
      "Most organizations cannot rip and replace core systems. They do not need to.",
    summary:
      "A bridge strategy connects legacy systems to modern data and execution layers: integration adapters, phased modernization, and controlled risk instead of rip-and-replace.",
    blocks: [
      {
        type: "lead",
        content: [
          "Legacy modernization for AI does not require an immediate full replacement of core systems. The highest-return path is often a bridge strategy: identify value-critical workflows, create integration layers, modernize in phases, and maintain operational continuity. The goal is not architecture purity. The goal is measurable business improvement with controlled risk.",
        ],
      },
      { type: "heading", text: "The costly myth: replace everything first" },
      {
        type: "paragraph",
        content: [
          "Many executive teams assume AI value is impossible until legacy platforms are fully replaced. This belief creates a false choice: either delay AI for years or run risky replacement programs with unclear return.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "In real operations, neither option is attractive. Full replacements are expensive, slow, and operationally disruptive. Delaying all AI initiatives sacrifices near-term performance gains and gives competitors room to pull ahead.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A bridge strategy avoids this trap. It acknowledges that existing systems still support critical workflows and focuses modernization where value can move now.",
        ],
      },
      { type: "heading", text: "What a bridge strategy means" },
      {
        type: "paragraph",
        content: [
          "A bridge strategy connects legacy systems to modern data and execution layers without requiring immediate core replacement. It typically includes:",
        ],
      },
      {
        type: "list",
        items: [
          "API wrappers or integration adapters around older systems.",
          "Data normalization layers for key workflow entities.",
          "Workflow orchestration that can call both legacy and modern services.",
          "Controlled migration paths for the highest-friction process segments.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The bridge is not a temporary patch if designed correctly. It becomes the operational foundation that enables staged modernization.",
        ],
      },
      { type: "heading", text: "Why this works better for most businesses" },
      {
        type: "list",
        items: [
          "It preserves business continuity. Core systems often run finance, fulfillment, compliance, and customer operations. A bridge isolates modernization changes to targeted workflow segments.",
          "It improves time-to-value. Organizations can launch AI in selected workflows within weeks or months rather than waiting years for a complete stack replacement.",
          "It reduces transformation fatigue. Large replacement programs often exhaust teams before results appear. Phased modernization creates visible wins that sustain momentum.",
          "It builds evidence for larger investment. When early steps produce measurable outcomes, leadership can make better capital allocation decisions for later phases.",
        ],
      },
      { type: "heading", text: "Common legacy contexts and bridge patterns" },
      {
        type: "paragraph",
        content: [
          { text: "Mainframe-centered transaction systems.", bold: true },
          " Expose read and write endpoints for specific transaction types, then layer decision support and automation around them.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "ERP-centric operations with limited integration.", bold: true },
          " Create an event-driven integration layer that captures key workflow triggers and enables downstream automation.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Spreadsheet-dense planning processes.", bold: true },
          " Standardize source definitions, centralize key calculations, and automate data assembly before introducing AI forecasting or recommendation layers.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Acquired-system sprawl.", bold: true },
          " Prioritize one cross-system workflow such as quoting, onboarding, or reporting. Normalize data for that workflow and build a shared orchestration layer.",
        ],
      },
      { type: "heading", text: "The four-phase modernization sequence" },
      {
        type: "list",
        items: [
          "Value and dependency mapping. Identify high-value workflows and map exact system dependencies. Measure baseline cycle time, error rates, and handoff friction.",
          "Bridge architecture design. Define integration points, data contracts, and governance controls. Set reliability thresholds and rollback options.",
          "Targeted build and pilot. Launch the bridge-enabled workflow in a contained scope. Monitor performance, error patterns, and operator feedback.",
          "Scale and rationalize. Expand successful patterns to adjacent workflows, retire brittle process segments, and update the long-term roadmap.",
        ],
      },
      { type: "heading", text: "Managing risk and governance" },
      {
        type: "paragraph",
        content: [
          "Bridge modernization still requires discipline. Four controls are essential:",
        ],
      },
      {
        type: "list",
        items: [
          "Data quality gates for critical fields.",
          "Clear exception routing when system confidence is low.",
          "Audit trails for high-impact decisions.",
          "Release management with rollback plans.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Without these controls, a bridge can become unstable. With them, it becomes a reliable acceleration layer.",
        ],
      },
      { type: "heading", text: "What leaders usually underestimate" },
      {
        type: "paragraph",
        content: [
          { text: "Organizational change is harder than integration.", bold: true },
          " Technical integration is often solvable. Role clarity, decision rights, and adoption routines are harder. Build change management into the plan from day one.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Process simplification must happen first.", bold: true },
          " Many legacy workflows are complex because organizations layered exceptions over time. AI on top of chaotic process design creates fragile systems. Simplify before automating.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Metrics need to be workflow-specific.", bold: true },
          " Enterprise-level dashboards are useful but not enough. Teams need local metrics that show whether each modernized workflow is actually improving.",
        ],
      },
      {
        type: "pullquote",
        text: "Modernize the workflow,",
        emphasis: "not the org chart.",
      },
      { type: "heading", text: "How to decide what to modernize first" },
      {
        type: "paragraph",
        content: ["Start with a simple filter:"],
      },
      {
        type: "list",
        items: [
          "High workflow volume.",
          "Measurable economic impact.",
          "Persistent manual bottlenecks.",
          "Manageable dependency complexity.",
          "Strong business owner commitment.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "If a workflow scores high on these dimensions, it is a strong candidate for first-phase bridging.",
        ],
      },
      { type: "heading", text: "What success looks like after one year" },
      {
        type: "paragraph",
        content: [
          "Success is not a perfect architecture diagram. Success is multiple modernized workflows running reliably, improved KPIs tied to margin, speed, or revenue, teams operating confidently with updated roles, and a modernization roadmap informed by evidence rather than assumptions.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "At that point, leadership can decide whether deeper core replacement is justified and where.",
        ],
      },
      { type: "heading", text: "Final perspective" },
      {
        type: "paragraph",
        content: [
          "Legacy systems are often treated as a liability to eliminate. In reality, they are operational assets with embedded process logic and institutional knowledge. The practical move is to expose that value while reducing friction over time.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Bridging lets organizations modernize without pausing the business. For most companies, that is the practical way to expand AI use with acceptable risk.",
        ],
      },
      { type: "heading", text: "Next step" },
      {
        type: "paragraph",
        content: [
          "Choose one legacy-constrained workflow with clear economic importance. Build a bridge plan for that workflow, launch in a bounded scope, and run a measured optimization cycle before expanding.",
        ],
      },
    ],
  },
  {
    slug: "why-ai-pilots-fail-5-things-work",
    topic: "Strategy",
    title: "Why AI pilots fail, and the",
    titleEmphasis: "five things that work.",
    standfirst:
      "Most pilots optimize for technical novelty instead of operating outcomes.",
    summary:
      "The five failure modes that repeat across sectors, the five practices that convert pilots to production, and a 90-day blueprint.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI pilots fail when they are disconnected from business priorities, weak on ownership, and missing change management. Successful pilots are scoped to measurable workflow outcomes, led by accountable operators, and launched with governance from day one. The five practices in this article improve the odds that a pilot becomes a production workflow.",
        ],
      },
      { type: "heading", text: "The real problem with pilot programs" },
      {
        type: "paragraph",
        content: [
          "The phrase AI pilot sounds prudent. In practice, it often becomes a safe container for indecision. Teams explore tools, produce demos, and gather feedback, but never commit to operational change. The organization gets motion without momentum.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The root issue is not experimentation itself. Experimentation is necessary. The issue is unclear conversion criteria from pilot to production. If no one defines what must be true to scale, most pilots remain in limbo.",
        ],
      },
      { type: "heading", text: "Five failure modes that repeat across sectors" },
      {
        type: "list",
        items: [
          "The business problem is too vague. Pilots framed as improving efficiency fail because they are not testable. Teams cannot align on what success means.",
          "The executive sponsor lacks operating ownership. A sponsor who does not own affected KPIs cannot remove blockers or enforce adoption.",
          "The scope is too broad. Multi-function redesign at once overwhelms speed, and teams lose trust before value appears.",
          "Data preparation is detached from workflow context. Teams over-invest in generic cleanup and under-invest in the fields that matter for the target workflow.",
          "There is no adoption design. Even technically sound pilots fail when frontline teams do not understand how daily routines should change.",
        ],
      },
      { type: "heading", text: "The five things that actually work" },
      {
        type: "paragraph",
        content: [
          { text: "Define a narrow, economic outcome.", bold: true },
          " Pick one workflow and one measurable objective: reduce average response time against a pre-launch baseline, cut manual reconciliation touches, or improve qualified pipeline conversion with agreed definitions. Specificity anchors decisions and avoids abstract debates.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Assign a dual owner model.", bold: true },
          " One business owner for outcomes and one technical owner for system performance. Both owners should have authority and a shared operating cadence.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Build for day-30 reality, not day-1 perfection.", bold: true },
          " Launch quickly with clear controls, then improve through live feedback. Waiting for perfect architecture delays learning and often kills momentum.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Design exception handling before launch.", bold: true },
          " Every pilot should specify confidence thresholds, escalation channels, and fallback procedures. Teams trust systems that fail safely.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Treat adoption as core scope.", bold: true },
          " Run workflow-specific enablement, role updates, and communication loops. Adoption is not a support function. It is central to pilot success.",
        ],
      },
      { type: "heading", text: "A 90-day pilot-to-production blueprint" },
      {
        type: "table",
        caption: "The 90-day pilot-to-production schedule",
        headers: ["Window", "Work"],
        rows: [
          [
            "Weeks 1 to 2",
            "Clarify and baseline. Define target workflow, owner roles, and baseline metrics. Confirm data sources.",
          ],
          [
            "Weeks 3 to 6",
            "Build and validate. Develop workflow logic and integrations. Test with production-like cases.",
          ],
          [
            "Weeks 7 to 10",
            "Launch and stabilize. Deploy to a contained group. Monitor throughput, quality, and trust daily.",
          ],
          [
            "Weeks 11 to 13",
            "Decide and expand. Review outcomes against pre-set thresholds. If achieved, scale to adjacent teams.",
          ],
        ],
      },
      { type: "heading", text: "Governance signals that support scale" },
      {
        type: "list",
        items: [
          "Weekly joint review between business and technical owners.",
          "Transparent KPI dashboard tied to baseline.",
          "Explicit go and no-go criteria for expansion.",
          "Documented lessons from incidents and edge cases.",
        ],
      },
      {
        type: "paragraph",
        content: ["When these signals are absent, pilots usually stall."],
      },
      { type: "heading", text: "Industry-specific notes" },
      {
        type: "list",
        items: [
          "Manufacturing: start with planning, quality triage, or commercial intelligence workflows where data already exists and outcomes are measurable.",
          "Professional services: start with proposal acceleration, research synthesis, or delivery reporting where cycle-time gains are obvious.",
          "Financial services: start with controlled document workflows and exception triage where auditability can be maintained.",
          "PE portfolios: start with repeatable playbooks that can transfer across multiple portfolio companies.",
        ],
      },
      { type: "heading", text: "Why exact failure percentages are not the point" },
      {
        type: "paragraph",
        content: [
          "Failure percentages vary by source and definition. The more useful pattern is clear: organizations fail less because of model limitations and more because of execution design gaps. Once leadership corrects those gaps, pilot outcomes become easier to evaluate and improve.",
        ],
      },
      {
        type: "pullquote",
        text: "Use pilots to de-risk production,",
        emphasis: "not to delay it.",
      },
      { type: "heading", text: "The practical leadership checklist" },
      {
        type: "paragraph",
        content: [
          "Before approving any pilot, leadership should be able to answer:",
        ],
      },
      {
        type: "list",
        items: [
          "Which workflow and KPI are we targeting?",
          "Who owns outcomes and who owns system performance?",
          "What is the smallest useful launch scope?",
          "How will edge cases be handled?",
          "How will frontline behavior change?",
        ],
      },
      {
        type: "paragraph",
        content: ["If any answer is missing, the pilot is premature."],
      },
      { type: "heading", text: "Recommended next step" },
      {
        type: "paragraph",
        content: [
          "Select one pilot candidate and stress-test it against the five success practices above. If it passes, launch with a 90-day conversion plan. If it does not, redesign before spending more budget.",
        ],
      },
    ],
  },
  {
    slug: "hybrid-workforce-playbook",
    topic: "Workforce",
    title: "The hybrid workforce",
    titleEmphasis: "playbook.",
    standfirst:
      "How to redesign roles, governance, and metrics so humans and AI agents perform as one system.",
    summary:
      "Five principles for hybrid workforce design: workflow economics, explicit decision rights, role redesign, a capability ladder, and joint performance measurement.",
    blocks: [
      {
        type: "lead",
        content: [
          "A hybrid workforce combines human judgment with AI-agent execution in shared workflows. Success depends on role redesign, clear decision rights, and disciplined performance management. Companies that treat AI as a headcount reduction project usually fail. Companies that treat it as an operating system redesign create durable gains in speed, quality, and adaptability.",
        ],
      },
      { type: "heading", text: "Why hybrid design is now a leadership capability" },
      {
        type: "paragraph",
        content: [
          "AI adoption is no longer confined to isolated innovation teams. Agents are entering customer operations, planning, reporting, and commercial workflows. This shifts the leadership challenge from which tool to buy to how work should be designed when humans and agents collaborate.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Organizations that avoid this design question often drift into confusion:",
        ],
      },
      {
        type: "list",
        items: [
          "Teams do not know when to trust agent outputs.",
          "Managers cannot evaluate performance fairly.",
          "Exception handling becomes chaotic.",
          "Adoption stalls because work feels riskier, not easier.",
        ],
      },
      { type: "heading", text: "Principle 1: Start with workflow economics" },
      {
        type: "paragraph",
        content: [
          "Do not begin by asking which jobs to automate. Begin by mapping workflows and identifying where cycle time, error rates, and handoff friction create the largest business cost. Once this map exists, classify workflow tasks by execution type:",
        ],
      },
      {
        type: "list",
        items: [
          "Agent-first tasks: high volume, low ambiguity.",
          "Human-first tasks: high ambiguity, high judgment.",
          "Shared tasks: agent drafts, human approves or refines.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This approach creates clarity and reduces defensiveness because the conversation is about work design, not job elimination slogans.",
        ],
      },
      { type: "heading", text: "Principle 2: Define decision rights explicitly" },
      {
        type: "paragraph",
        content: [
          "Hybrid systems fail when authority is vague. Every workflow needs clear thresholds: what agents can decide independently, what agents can recommend but not execute, and what humans must decide every time. These rules should be documented and visible to operators. Hidden or informal rules undermine trust quickly.",
        ],
      },
      { type: "heading", text: "Principle 3: Redesign roles around new value" },
      {
        type: "paragraph",
        content: [
          "When agents absorb repetitive execution, human roles should shift toward oversight, exception handling, customer interaction, and judgment-intensive problem solving. Typical role changes:",
        ],
      },
      {
        type: "list",
        items: [
          "Analysts move from manual reporting to interpretation and scenario planning.",
          "Operations coordinators move from data entry to workflow quality management.",
          "Managers move from activity supervision to outcome and exception governance.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Without explicit role redesign, teams remain anchored to outdated expectations and perceive AI as added burden.",
        ],
      },
      { type: "heading", text: "Principle 4: Build a capability ladder" },
      {
        type: "paragraph",
        content: [
          "Hybrid readiness is a learnable capability, not a personality trait. Build a simple ladder:",
        ],
      },
      {
        type: "list",
        items: [
          "Level 1: Understand what agents do and where limits exist.",
          "Level 2: Operate workflows with agent support.",
          "Level 3: Diagnose and improve workflow performance.",
          "Level 4: Lead cross-functional optimization and expansion.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Training should map to real workflows, not generic AI literacy modules.",
        ],
      },
      { type: "heading", text: "Principle 5: Measure joint performance" },
      {
        type: "paragraph",
        content: [
          "Traditional KPIs often break in hybrid environments. Track system-level outcomes:",
        ],
      },
      {
        type: "list",
        items: [
          "End-to-end cycle time.",
          "Quality and rework rate.",
          "Exception resolution speed.",
          "Customer or stakeholder satisfaction.",
          "Economic impact per workflow.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Also track human experience signals, including clarity of expectations and perceived control. Sustainable performance requires both business results and team confidence.",
        ],
      },
      { type: "heading", text: "A practical operating model" },
      {
        type: "list",
        items: [
          "Governance layer: a cross-functional operating group that sets standards, monitors performance, and approves scale decisions.",
          "Workflow layer: each workflow has an owner accountable for outcomes, adoption, and risk controls.",
          "Enablement layer: role-specific playbooks, coaching, and incident-response training.",
          "Optimization layer: a prioritized backlog of improvements based on operating data and frontline feedback.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This structure prevents hybrid workforce efforts from becoming fragmented experiments.",
        ],
      },
      { type: "heading", text: "First 100 days: implementation sequence" },
      {
        type: "table",
        caption: "The first 100 days of a hybrid workforce rollout",
        headers: ["Window", "Work"],
        rows: [
          [
            "Days 1 to 20",
            "Select and map. Choose one high-value workflow and map tasks, decision rights, and baseline metrics.",
          ],
          [
            "Days 21 to 45",
            "Design and train. Define agent responsibilities, escalation paths, and role changes. Train the first cohort.",
          ],
          [
            "Days 46 to 75",
            "Launch and stabilize. Deploy in a contained scope. Monitor daily and resolve role conflicts quickly.",
          ],
          [
            "Days 76 to 100",
            "Evaluate and expand. Review outcomes, refine governance, and decide whether to scale.",
          ],
        ],
      },
      { type: "heading", text: "Change management: the underrated workstream" },
      {
        type: "paragraph",
        content: [
          "Hybrid workforce efforts are often framed as technical programs. In reality, they are behavior change programs with technical components. Effective change management includes:",
        ],
      },
      {
        type: "list",
        items: [
          "Clear narrative: why this change matters for team success.",
          "Manager enablement: managers need scripts and tools to coach through transition.",
          "Transparent metrics: people must see how performance is measured.",
          "Fast feedback loops: frontline concerns should influence workflow adjustments.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Ignoring these elements creates resistance that no model quality can solve.",
        ],
      },
      { type: "heading", text: "Common missteps and how to avoid them" },
      {
        type: "list",
        items: [
          "Over-automating too early. Avoid full autonomy before exception data is understood. Start with shared execution modes.",
          "Treating adoption as optional. Adoption is an explicit deliverable with owners, milestones, and measurement.",
          "Confusing cost cutting with transformation. Cost outcomes may occur, but the primary target should be performance and adaptability.",
          "Measuring the wrong signals. Agent response count is not a business outcome. Tie metrics to workflow economics.",
        ],
      },
      {
        type: "pullquote",
        text: "The hybrid workforce is not a rollout.",
        emphasis: "It is a management discipline.",
      },
      { type: "heading", text: "The leadership mindset shift" },
      {
        type: "paragraph",
        content: [
          "The key shift is from AI as software procurement to AI as work design. Leaders who embrace this shift build organizations that learn faster and execute with greater consistency. Teams that build this discipline early will have a structural advantage as agent capabilities continue to improve.",
        ],
      },
      { type: "heading", text: "Next step" },
      {
        type: "paragraph",
        content: [
          "Select one workflow and run a hybrid workforce design sprint with explicit role maps, decision rights, and success metrics. Launch small, optimize continuously, and scale only after trust and performance stabilize.",
        ],
      },
    ],
  },
  {
    slug: "continuous-ai-agents",
    topic: "Agents",
    title: "Why AI agents that learn beat",
    titleEmphasis: "one-time implementations.",
    standfirst:
      "Most AI engagements stop at launch. Continuous optimization is where value compounds.",
    summary:
      "AI systems are living infrastructure. Without a managed operations cadence after launch, value decays.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI systems are living infrastructure, not static deliverables. That is why build-and-abandon consulting models struggle to sustain value.",
        ],
      },
      { type: "heading", text: "The build-and-abandon trap" },
      {
        type: "paragraph",
        content: [
          "Teams launch AI workflows and move on. Over time, data context shifts, quality declines, and internal teams are left with systems they cannot evolve.",
        ],
      },
      { type: "heading", text: "The continuous model" },
      {
        type: "paragraph",
        content: [
          "A managed operations cadence retrains and tunes workflows based on live outcomes. This creates compounding intelligence and stronger performance each cycle. That is what ",
          { text: "Forge Run", href: "/services" },
          " does after a build: monitoring, production evals, SLAs, and model upgrades, for ",
          { text: "$2.5K to $7.5K per system per month.", tnum: true },
        ],
      },
      {
        type: "pullquote",
        text: "The key question for any AI partner:",
        emphasis: "what happens after launch?",
      },
      { type: "heading", text: "Why this matters" },
      {
        type: "paragraph",
        content: [
          "If optimization is not part of the model, value usually decays. Ask any prospective partner who watches the system in month six, and what number they watch.",
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-ceo-guide",
    topic: "Strategy",
    title: "The CEO's guide to",
    titleEmphasis: "AI readiness.",
    standfirst:
      "A practical readiness model: data, team, process, infrastructure, and budget discipline.",
    summary:
      "Five readiness pillars, scored honestly. Then fix the one bottleneck blocking your first measurable AI outcome.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI readiness is not a checklist exercise. It is a test of operating capability in five areas: data, team, process, infrastructure, and investment discipline.",
        ],
      },
      { type: "heading", text: "Five readiness pillars" },
      {
        type: "list",
        items: [
          "Data quality and accessibility.",
          "Team capability and leadership alignment.",
          "Process documentation and workflow clarity.",
          "Integration-ready technology infrastructure.",
          "Budget aligned to measurable outcomes.",
        ],
      },
      { type: "heading", text: "Practical next step" },
      {
        type: "paragraph",
        content: [
          "Score your current state honestly, then focus on the bottleneck blocking your first measurable AI outcome. The ",
          { text: "free scorecard", href: "/scorecard" },
          " takes a few minutes and scores one workflow, not the company in the abstract.",
        ],
      },
    ],
  },
  {
    slug: "pe-value-creation-with-ai",
    topic: "Private equity",
    title: "PE value creation with AI:",
    titleEmphasis: "a practical playbook.",
    standfirst:
      "How operating partners deploy repeatable AI value creation across portfolio companies.",
    summary:
      "Assess opportunities with one framework, prioritize by value and delivery risk, and deploy proven patterns in sprints.",
    blocks: [
      {
        type: "lead",
        content: [
          "PE firms can create outsize value from AI when initiatives are repeatable, KPI-linked, and managed at portfolio level.",
        ],
      },
      { type: "heading", text: "Portfolio-level approach" },
      {
        type: "paragraph",
        content: [
          "Assess opportunities across companies with one framework, prioritize by baseline value and delivery risk, and deploy proven patterns in sprints.",
        ],
      },
      { type: "heading", text: "What works" },
      {
        type: "list",
        items: [
          "Revenue operations automation.",
          "High-volume operational workflow modernization.",
          "Governance and KPI reporting tied to value creation goals.",
        ],
      },
      { type: "heading", text: "Why it matters" },
      {
        type: "paragraph",
        content: [
          "Repeatability is the operating advantage. Portfolio companies should not reinvent execution from scratch every time. The ",
          { text: "PE Portfolio Pack", href: "/services" },
          " packages this: a portfolio AI scan, a Diagnostic multipack, and a sponsor-level adoption scoreboard.",
        ],
      },
    ],
  },
  {
    slug: "hidden-cost-manual-processes",
    topic: "Operations",
    title: "The hidden cost of",
    titleEmphasis: "manual processes.",
    standfirst:
      "Manual work creates labor drag, error costs, and missed opportunity. Most companies under-measure all three.",
    summary:
      "Manual processes do not appear as a line item. Map one workflow end to end, quantify time and errors, then prioritize.",
    blocks: [
      {
        type: "lead",
        content: [
          "Manual processes do not appear as a single line item, but they quietly erode margin and execution speed.",
        ],
      },
      { type: "heading", text: "The three hidden costs" },
      {
        type: "list",
        items: [
          "Direct labor spent on repetitive tasks.",
          "Error and rework costs.",
          "Opportunity cost from delayed strategic work.",
        ],
      },
      { type: "heading", text: "What to do" },
      {
        type: "paragraph",
        content: [
          "Map one critical workflow end to end, quantify time and errors, then prioritize automation opportunities by impact and feasibility. Not every manual workflow needs AI. Some can be improved with simpler automation and process redesign. Week one of the ",
          { text: "Forge Diagnostic", href: "/services" },
          " is exactly this: sitting inside the workflow and putting a number on what the manual steps cost.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-explained",
    topic: "Agents",
    title: "AI agents,",
    titleEmphasis: "explained.",
    standfirst:
      "What they are, what they are not, and when you need one.",
    summary:
      "A working definition, the agent-vs-automation-vs-copilot comparison, where agents earn their keep, and the six control questions to ask before one touches production data.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI agents are the most oversold term in enterprise software right now, and the most useful when scoped honestly. This guide gives operators a working definition, a test for when an agent is the right tool, and the control questions to ask before one touches production data.",
        ],
      },
      { type: "heading", text: "What an AI agent actually is" },
      {
        type: "paragraph",
        content: [
          "An AI agent is software that pursues a goal across multiple steps: it reads context from your systems, decides what to do next, takes an action through an integration, checks the result, and repeats until the job is done or a rule tells it to stop and ask a human. The distinguishing feature is not intelligence. It is the loop of observe, decide, act, and verify, running inside boundaries you define.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "That makes an agent different from the two things it is most often confused with. A chatbot answers the question in front of it and waits for the next one. A workflow automation follows a fixed path someone drew in advance. An agent sits between them: it handles variation a fixed path cannot, but it operates against systems and rules, not an open-ended chat window.",
        ],
      },
      { type: "heading", text: "Agent vs. automation vs. copilot" },
      {
        type: "table",
        caption: "How agents compare to rules automation and copilots",
        headers: ["Approach", "How it works", "Best for", "Watch out for"],
        rows: [
          [
            "Rules automation",
            "Fixed if-this-then-that path",
            "Stable, high-volume, low-variation work",
            "Breaks silently when the process changes",
          ],
          [
            "Copilot",
            "Suggests, human executes",
            "Judgment work where the human stays in the loop",
            "Value depends entirely on adoption",
          ],
          [
            "AI agent",
            "Goal-directed loop with tool access",
            "Variable, multi-step work with clear success criteria",
            "Needs controls, escalation paths, and an owner",
          ],
        ],
      },
      {
        type: "paragraph",
        content: [
          "Most production systems we build combine all three: rules automation for the predictable spine, an agent for the variable middle, and a human approval gate where the consequences are real.",
        ],
      },
      { type: "heading", text: "Where agents earn their keep" },
      {
        type: "paragraph",
        content: [
          "The workflows where agents outperform both people and fixed automation share four traits:",
        ],
      },
      {
        type: "list",
        items: [
          "Volume. The work arrives constantly, so cycle-time savings compound.",
          "Variation. Inputs differ enough that rules alone break, which is why it was never automated before.",
          "Verifiable output. Success is checkable against data, so quality can be measured instead of assumed.",
          "Tolerable failure. A wrong draft costs a review, not a customer, so autonomy can be earned gradually.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Intake triage, order and RFQ processing, exception handling, collections follow-up, quality-control review, and research-and-draft work are the recurring winners across our engagements.",
        ],
      },
      { type: "heading", text: "Where agents fail" },
      {
        type: "paragraph",
        content: [
          "Agents fail predictably in three situations. First, low-volume high-stakes decisions: there is not enough repetition to justify the build, and the stakes demand human judgment anyway. Second, workflows with no reliable data path: an agent reading from a system nobody trusts produces confident nonsense faster than a person would. Third, organizations with no named owner: an agent is an operating change, and without someone accountable for watching the scoreboard, usage decays within weeks of launch.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "That third failure is the most common and the least technical. It is why every ClearForge build ships with the Adoption Mile: a named operator, a weekly working cadence, and a live adoption scoreboard. The difference between an agent that works and shelfware is rarely the model.",
        ],
      },
      {
        type: "pullquote",
        text: "A vendor that answers with model names",
        emphasis: "is selling a demo.",
      },
      { type: "heading", text: "The control questions to ask" },
      {
        type: "paragraph",
        content: [
          "Whether you are evaluating a vendor or scoping a custom build, the same six questions expose whether an agent is production-ready or a demo:",
        ],
      },
      {
        type: "list",
        items: [
          "What actions can it take without a human, and where is that list written down?",
          "What happens on an exception? Who gets pinged, and how fast?",
          "Where does every action get logged, and can we audit a decision after the fact?",
          "What data can it read, and under whose credentials?",
          "How is quality measured against a baseline, and who reviews that number weekly?",
          "When it improves, what retrains? When it degrades, who notices?",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A vendor or team that answers all six crisply is selling a system. One that answers with model names is selling a demo.",
        ],
      },
      { type: "heading", text: "Build or buy" },
      {
        type: "paragraph",
        content: [
          "Buy when the workflow is generic: meeting notes, basic support deflection, standard document extraction. Scale providers will out-iterate any custom build on commodity work. Build when the workflow is your operating advantage: the pricing desk, the intake path, the exception logic your margin actually lives in. Custom is also the honest answer when the agent must sit inside your systems, your controls, and your audit trail rather than a vendor's cloud.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The wrong answer is buying a platform and expecting it to become an operating change on its own. Tools do not adopt themselves. Teams adopt tools, and only when someone owns the rhythm.",
        ],
      },
    ],
  },
  {
    slug: "ai-consulting-cost",
    topic: "Pricing",
    title: "What AI consulting costs",
    titleEmphasis: "across the market.",
    standfirst:
      "The 2026 price bands, what each buys, and what drives cost. Our own prices included.",
    summary:
      "Market bands in 2026: fixed-fee diagnostics, implementation sprints, enterprise programs, and managed operations. What drives price, and where our published tiers sit.",
    blocks: [
      {
        type: "lead",
        content: [
          "AI consulting costs in 2026 generally fall into four bands: fixed-fee diagnostics at ",
          { text: "$10K to $25K,", tnum: true },
          " implementation sprints at ",
          { text: "$75K to $250K,", tnum: true },
          " enterprise programs at ",
          { text: "$500K to $2M+,", tnum: true },
          " and ongoing managed AI operations at ",
          { text: "$5K to $25K per month.", tnum: true },
          " Mid-market companies typically pay ",
          { text: "$90K to $300K", tnum: true },
          " all-in for a first production AI system. Pricing transparency matters because buyers need to qualify scope, budget, and decision timing before entering a sales process.",
        ],
      },
      { type: "heading", text: "What AI consulting actually includes" },
      {
        type: "paragraph",
        content: [
          "The phrase covers very different scopes depending on the firm. Before comparing prices, separate these into four categories:",
        ],
      },
      {
        type: "list",
        items: [
          "AI strategy and diagnostic: workflow analysis, opportunity identification, ROI sizing, roadmap. Output is a plan, not a working system.",
          "AI agent and automation build: engineering production systems, integrating with existing software, deploying agents.",
          "Managed AI operations: running, monitoring, and optimizing deployed systems on an ongoing basis.",
          "Enterprise AI program: multi-year work covering strategy, build, change management, and governance across the company.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Most mid-market buyers want the first two categories, with the third as an option, and do not need the fourth. Yet the fourth category's pricing is what shows up in most public benchmarks, which inflates expectations.",
        ],
      },
      { type: "heading", text: "The four market bands in 2026" },
      {
        type: "paragraph",
        content: [
          { text: "Fixed-fee diagnostic, $10K to $25K.", bold: true, tnum: true },
          " A bounded engagement, typically 2 to 6 weeks, that produces a prioritized roadmap, value sizing, a data-readiness read, and sequencing. The ClearForge version is the ",
          { text: "Forge Diagnostic", href: "/services" },
          ": ",
          { text: "$15K", bold: true, tnum: true },
          " fixed price, 2 weeks, ending in a build decision you can price.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Implementation sprint, $75K to $250K.", bold: true, tnum: true },
          " A 10 to 14 week engagement that builds and deploys a working production AI system in one workflow, integrated with your existing systems. The ClearForge version is the Forge Sprint: from ",
          { text: "$75K,", bold: true, tnum: true },
          " typical ",
          { text: "$75K to $200K+,", tnum: true },
          " 10 to 14 weeks, scoped to one workflow with a named owner and baseline metric. Every Sprint ships with an eval harness and reliability gates.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Enterprise program, $500K to $2M+.", bold: true, tnum: true },
          " Multi-quarter programs covering strategy, build, governance, and adoption across business units. Typical buyers are Fortune 500. These programs deliver value but often take 12 to 24 months and require dedicated client-side program management. They are rarely the right fit for $25M to $500M companies.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Managed AI operations, $5K to $25K per month.", bold: true, tnum: true },
          " Ongoing engagement that runs AI systems on the client's behalf: monitoring, drift detection, exception handling, and optimization. The ClearForge versions: Forge Scale at ",
          { text: "$5K to $15K per month", tnum: true },
          " for the Adoption Mile, and Forge Run at ",
          { text: "$2.5K to $7.5K per system per month", tnum: true },
          " to keep a built system in production.",
        ],
      },
      { type: "heading", text: "What drives the price" },
      {
        type: "table",
        caption: "Common cost drivers and their typical impact on price",
        headers: ["Cost driver", "Typical impact"],
        rows: [
          [
            "Number of integrated systems",
            "+15 to 30% per major system beyond 3",
          ],
          ["Data quality", "+20 to 50% if data prep work is required"],
          [
            "Compliance and regulatory posture",
            "+25 to 100% for GxP, HIPAA, SOC 2 Type 2",
          ],
          [
            "Custom vs off-the-shelf",
            "Off-the-shelf can cut cost 30 to 50% but limits differentiation",
          ],
          [
            "Senior staffing model",
            "Senior-led firms charge 30 to 60% more and should show faster decisions",
          ],
          [
            "Build team location",
            "US-based teams usually cost materially more than offshore",
          ],
        ],
      },
      { type: "heading", text: "Time to value" },
      {
        type: "table",
        caption: "Typical time to first measured outcome by engagement type",
        headers: ["Engagement type", "Time to first measured outcome"],
        rows: [
          ["Fixed-fee diagnostic", "2 to 6 weeks to the deliverable"],
          ["Implementation sprint", "10 to 14 weeks to production go-live"],
          ["Enterprise program", "6 to 18 months"],
          ["Managed AI operations", "Continuous"],
        ],
      },
      {
        type: "paragraph",
        content: [
          "One number sits behind the ClearForge timeline: every build is run to a 70 percent weekly-active adoption bar by day 90. Production is the start line, not the finish.",
        ],
      },
      {
        type: "pullquote",
        text: "A price you have to call to learn",
        emphasis: "is a price with a problem.",
      },
      { type: "heading", text: "Why pricing transparency matters" },
      {
        type: "paragraph",
        content: [
          "Many B2B services buyers prefer upfront pricing. Yet most major consulting firms publish no pricing on their websites. Buyers are forced into discovery calls just to learn whether a firm is in their budget range.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "This is changing. Mid-market AI consulting firms increasingly publish their tier ranges directly. The shift mirrors what happened in SaaS pricing a decade ago: firms that publish pricing capture the buyer who has already self-qualified. ",
          { text: "Our pricing is published in full", href: "/pricing" },
          ", readable without a call.",
        ],
      },
      { type: "heading", text: "How to evaluate pricing quotes" },
      {
        type: "list",
        items: [
          "Demand a fixed-fee phase 1. A reputable firm should be able to scope a diagnostic at fixed cost. Time-and-materials-only quotes signal scope discipline issues.",
          "Ask what is not included. Integration costs, data prep, compliance certification, and post-launch support are common scope gaps.",
          "Confirm senior staffing. Many firms quote senior rates and deliver with junior staff. Ask for the named team.",
          "Tie milestones to outcomes. Payment should release on operating outcomes, not on a deck being delivered.",
          "Verify the exit. Ongoing engagement should be optional, not architecturally required.",
        ],
      },
      { type: "heading", text: "ROI expectations" },
      {
        type: "paragraph",
        content: [
          "For mid-market companies, ROI should be modeled workflow by workflow before engineering begins. The business case should name the baseline, expected adoption rate, the cost, throughput, revenue, or quality metric in play, and the owner accountable for measurement after launch.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "A $15K diagnostic should uncover a value backlog large enough to justify the next decision. A six-figure build should have a named workflow, baseline metric, owner, and business case before engineering begins.",
        ],
      },
      { type: "heading", text: "Bottom line" },
      {
        type: "paragraph",
        content: [
          "For a mid-market company starting AI in 2026, expect to invest around ",
          { text: "$15K", bold: true, tnum: true },
          " for a credible diagnostic and ",
          { text: "$100K to $200K", tnum: true },
          " for the first production system. Typical first-year all-in with managed operations runs ",
          { text: "$150K to $350K", tnum: true },
          " across the market. Demand pricing transparency, a fixed-fee phase 1, senior staffing, baseline metrics, and outcome-tied milestones.",
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-assessment-guide",
    topic: "Diagnostics",
    title: "How to run an",
    titleEmphasis: "AI readiness assessment.",
    standfirst:
      "What it is, the five build-readiness gates, what free tools can tell you, and when to pay.",
    summary:
      "An assessment should test whether one workflow is ready for a production build. Free scorecards for self-education, paid diagnostics when real budget is on the line.",
    blocks: [
      {
        type: "lead",
        content: [
          "An AI readiness assessment should test whether one workflow has the value case, workflow clarity, data path, controls, and adoption cadence to become a production AI build. Free online diagnostics take minutes and produce a directional score. Paid diagnostics produce a prioritized roadmap, evidence plan, and first build decision. Most failed pilots break down because of scoping, ownership, data quality, or adoption readiness, not model capability alone.",
        ],
      },
      { type: "heading", text: "What an AI readiness assessment is" },
      {
        type: "paragraph",
        content: [
          "It is a structured evaluation of whether an organization has the foundations to deploy AI successfully. It produces a score, a tier classification, and a prioritized list of gaps to close before investing.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The framework descends from the digital maturity models of the 2010s, adapted for AI's specific failure modes. The largest causes of failure are usually insufficient organizational readiness, weak workflow ownership, and unclear operating metrics, not insufficient technology.",
        ],
      },
      { type: "heading", text: "The five build-readiness gates" },
      {
        type: "list",
        items: [
          "Ambition and value case: whether the first workflow has a named business reason, accountable owner, baseline, and value threshold.",
          "Workflow clarity: whether handoffs, exceptions, approvals, rework, and performance measures are visible enough to redesign.",
          "Data path: whether source systems, documents, data owners, access patterns, and trust gaps are clear before build.",
          "Controls and integration: whether the workflow can connect to existing systems with human review, escalation, audit trail, and failure handling.",
          "Adoption cadence: whether users and managers have the time, permission, training, and review rhythm to change daily work.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "ClearForge scores readiness around one workflow, not the company in the abstract. The goal is to decide whether that workflow is ready for a production build or needs operating clarity first.",
        ],
      },
      { type: "heading", text: "Free vs paid assessments" },
      {
        type: "table",
        caption: "Assessment types by cost, time, and output",
        headers: ["Type", "Cost", "Time", "Output"],
        rows: [
          [
            "Online scorecard",
            "Free",
            "5 to 15 minutes",
            "Directional score, generic recommendations",
          ],
          [
            "Vendor-led audit",
            "Free",
            "1 to 3 hours",
            "Vendor-tilted recommendations",
          ],
          [
            "Paid diagnostic",
            "$10K to $25K",
            "2 to 6 weeks",
            "Prioritized roadmap with value sizing and sequencing",
          ],
          [
            "Enterprise readiness program",
            "$50K+",
            "8 to 16 weeks",
            "Multi-stream program with change management",
          ],
        ],
      },
      {
        type: "paragraph",
        content: [
          "Free scorecards are useful for self-education. They give you a directional view of where you sit and a starting framework. They are not a substitute for a paid diagnostic when meaningful budget is on the line.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Paid diagnostics are warranted when the company is making AI investments above $50K. A paid diagnostic should identify measurable opportunities with baselines, owners, and assumptions stated clearly.",
        ],
      },
      { type: "heading", text: "How to conduct one" },
      {
        type: "list",
        items: [
          "Score yourself across the five gates. The free ClearForge scorecard takes about four minutes and scores one workflow.",
          "Identify the two weakest gates. Most companies have a clear pattern, typically data or workforce. Address those first. The others compound.",
          "Map current AI activity against readiness. List every initiative underway and compare each against your weakest gates. Most companies discover their initiatives are misaligned with their actual readiness.",
          "Sequence the use cases. Pick the workflow with the strongest value case that aligns with your strongest gates. Not the most exciting use case. The one most likely to ship.",
          "Decide: fix readiness first, or prove it now. Both are valid. Deploying one workflow to build organizational muscle typically wins for mid-market companies.",
        ],
      },
      { type: "heading", text: "What a paid diagnostic delivers" },
      {
        type: "list",
        items: [
          "Workflow opportunity mapping: every workflow scored for AI applicability and economic upside.",
          "Data readiness audit: data quality, accessibility, and gaps to close.",
          "Prioritized roadmap: ranked initiatives with effort, value case, and dependencies.",
          "Evidence-backed business case: value assumptions, baseline metric, and proof plan.",
          "Implementation sequencing: which workflow to start with and why.",
          "Build-vs-buy recommendations for each priority initiative.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The ",
          { text: "Forge Diagnostic", href: "/services" },
          " covers all six: ",
          { text: "$15K", bold: true, tnum: true },
          " fixed price, 2 weeks, ending in a decision you can price.",
        ],
      },
      {
        type: "pullquote",
        text: "An assessment is useful only when",
        emphasis: "it changes the build decision.",
      },
      { type: "heading", text: "Common mistakes in DIY assessments" },
      {
        type: "list",
        items: [
          "Optimism bias. Internal teams rate their data and process maturity higher than external benchmarks would.",
          "Confusing AI activity with readiness. A few deployed chatbots do not mean the company is ready for production agents.",
          "Skipping workforce evaluation. The easiest gate to under-rate and the highest predictor of failure.",
          "Treating it as a one-time event. Readiness is dynamic. Re-score annually at minimum.",
          "No external benchmark. Without a peer comparison, the score is meaningless.",
        ],
      },
      { type: "heading", text: "When not to run an assessment" },
      {
        type: "list",
        items: [
          "You are mid-deployment on a specific use case. Focus on shipping first.",
          "You have less than $25K to invest in AI in total. Basic process improvements typically have higher ROI.",
          "Your data infrastructure is fundamentally broken. Fix that first. An assessment will just confirm it.",
        ],
      },
      { type: "heading", text: "Free tools to use right now" },
      {
        type: "paragraph",
        content: [
          "The ",
          { text: "ClearForge scorecard", href: "/scorecard" },
          " is a 10-question, workflow-specific readout that takes about four minutes. ",
          { text: "Forge Intelligence", href: "/discover" },
          " analyzes your company website and maps the workflow we would build first. Academic maturity indexes are useful for board-level conversation.",
        ],
      },
      { type: "heading", text: "Bottom line" },
      {
        type: "paragraph",
        content: [
          "An AI readiness assessment is useful only when it changes the build decision. Free diagnostics are sufficient for self-education and board alignment. A paid diagnostic is warranted when meaningful budget is on the line. The practical test is simple: can you name the workflow, owner, baseline, data path, controls, and adoption cadence before engineering starts?",
        ],
      },
    ],
  },
  {
    slug: "fractional-caio-vs-full-time",
    topic: "Leadership",
    title: "Fractional Chief AI Officer:",
    titleEmphasis: "when to hire one.",
    standfirst:
      "Senior AI leadership without the full-time hire. What the role owns, what it costs, and when full-time wins.",
    summary:
      "Fractional CAIOs run $5K to $25K per month across the market, against $350K to $600K loaded comp for full-time. When each model fits, and how to evaluate a candidate.",
    blocks: [
      {
        type: "lead",
        content: [
          "A Fractional Chief AI Officer is a senior AI leader who serves your company part-time, at ",
          { text: "$5K to $25K per month", tnum: true },
          " across the market, against ",
          { text: "$250K to $400K", tnum: true },
          " base for a full-time hire. The fractional model fits mid-market companies that need senior AI leadership but do not have a full-time scope to fill. Many use it as a 6 to 18 month bridge before deciding whether to hire full-time.",
        ],
      },
      { type: "heading", text: "What a Fractional CAIO is" },
      {
        type: "paragraph",
        content: [
          "An experienced AI executive who works on a part-time, multi-month engagement basis. Typical commitment: 1 to 2 days per week, scoped to specific AI strategy and operating outcomes.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "The role emerged as mid-market companies recognized two truths at once: they needed senior AI leadership to avoid pilot purgatory, and they could not justify a $300K full-time hire with a 12 to 18 month onboarding curve. Fractional models, already common for CFO and CMO roles, adapted to fill the gap.",
        ],
      },
      { type: "heading", text: "What the role owns" },
      {
        type: "paragraph",
        content: [{ text: "Strategic responsibilities:", bold: true }],
      },
      {
        type: "list",
        items: [
          "Define the company's AI thesis and tie it to business strategy.",
          "Identify and sequence AI use cases by ROI and feasibility.",
          "Build the AI investment thesis for the board and executive team.",
          "Establish AI governance: data, risk, and vendor selection.",
          "Lead vendor and platform decisions on six-figure technology purchases.",
        ],
      },
      {
        type: "paragraph",
        content: [{ text: "Operating responsibilities:", bold: true }],
      },
      {
        type: "list",
        items: [
          "Lead AI roadmap execution as a fractional executive.",
          "Coach internal AI talent.",
          "Run the AI portfolio review cadence: monthly KPI reviews, quarterly sequencing.",
          "Interface with the board and executive team on AI progress.",
          "Bring an external network of vendors, talent, and peer learnings.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "What the role does not do:", bold: true },
          " hands-on engineering build, day-to-day project management, or permanent replacement of full-time leadership in companies with sustained multi-million-dollar AI programs.",
        ],
      },
      { type: "heading", text: "Pricing in 2026" },
      {
        type: "table",
        caption: "Market pricing for AI leadership models in 2026",
        headers: ["Model", "Typical cost", "Time commitment"],
        rows: [
          [
            "Fractional CAIO, advisor-only",
            "$5K to $10K per month",
            "4 to 8 hours per week",
          ],
          [
            "Fractional CAIO, operating",
            "$10K to $25K per month",
            "1 to 2 days per week",
          ],
          [
            "Embedded AI operating partner",
            "$15K to $30K per month",
            "2 to 3 days per week",
          ],
          ["Full-time CAIO, base only", "$250K to $400K per year", "Full-time"],
          [
            "Full-time CAIO, loaded comp",
            "$350K to $600K per year",
            "Full-time",
          ],
        ],
      },
      {
        type: "paragraph",
        content: [
          "The ClearForge version sits inside ",
          { text: "Forge Scale", href: "/services" },
          ", priced ",
          { text: "$5K to $15K per month.", tnum: true },
          " The top tier is a Fractional Chief AI Officer engagement, from ",
          { text: "$15K per month,", bold: true, tnum: true },
          " and operating-level engagements include access to a delivery team, not just advice.",
        ],
      },
      { type: "heading", text: "When to hire fractional vs full-time" },
      {
        type: "paragraph",
        content: [{ text: "Hire fractional when:", bold: true }],
      },
      {
        type: "list",
        items: [
          "Company revenue is $25M to $500M.",
          "AI program scope is under $2M in annual investment.",
          "You are 0 to 18 months into a formal AI program and still defining it.",
          "You need external network and credibility with vendors and the board.",
          "You cannot fill the role full-time within 6 months, or budget is constrained.",
        ],
      },
      {
        type: "paragraph",
        content: [{ text: "Hire full-time when:", bold: true }],
      },
      {
        type: "list",
        items: [
          "Company revenue is $500M or more.",
          "AI program scope is $2M+ annually with a sustained pipeline.",
          "You have 12+ months of clear roadmap requiring dedicated leadership.",
          "You can afford $400K to $600K in loaded comp.",
          "Organizational complexity requires daily senior presence.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "Many companies use both in sequence: a 6 to 12 month fractional engagement that converts to a full-time hire once the scope is proven.",
        ],
      },
      { type: "heading", text: "Fractional CAIO vs a consulting engagement" },
      {
        type: "table",
        caption: "Fractional CAIO compared to a project-based consulting engagement",
        headers: ["Dimension", "Fractional CAIO", "Consulting engagement"],
        rows: [
          ["Engagement length", "6 to 18 months typical", "Project-based, weeks"],
          ["Pricing", "Monthly retainer", "Fixed fee or time and materials"],
          [
            "Scope",
            "Strategic and operating leadership",
            "Specific deliverables: diagnostic, build",
          ],
          ["Best for", "Ongoing AI leadership", "Specific AI initiatives"],
          ["Continuity", "High. Same person every month", "Engagement-bound"],
        ],
      },
      {
        type: "paragraph",
        content: [
          "The two models are often complementary: the Fractional CAIO defines strategy and oversees implementation, and a delivery engagement builds the systems. At ClearForge, Forge Scale carries the leadership role and the ",
          { text: "Forge Sprint", href: "/pricing" },
          " is the build.",
        ],
      },
      { type: "heading", text: "How to evaluate a candidate" },
      {
        type: "list",
        items: [
          "Verify operator experience. They should have built AI systems in production, not only advised on strategy.",
          "Confirm sector relevance. Industry-specific patterns matter for use case prioritization.",
          "Ask for board-level references. Presenting to your board is a different skill than operating in the trenches.",
          "Check the delivery network. A Fractional CAIO without delivery muscle becomes a roadblock.",
          "Pressure-test commitment. One day per week can mean very different things. Confirm deliverables and meeting cadence.",
        ],
      },
      { type: "heading", text: "Risks to manage" },
      {
        type: "list",
        items: [
          "Disengagement after 6 months. Fractional engagements drift if KPIs and cadences are not explicit. Mitigate with quarterly business reviews and clear renewal triggers.",
          "Multiple-client conflict. Most fractional executives serve several clients. Confirm sector exclusivity if relevant and clarify availability for urgent escalations.",
          "Knowledge transfer gaps. Document playbooks, vendor relationships, and decision logs from day one.",
        ],
      },
      { type: "heading", text: "When fractional does not work" },
      {
        type: "paragraph",
        content: [
          "The model fails when the company has heavy daily AI decision volume, a regulatory environment that requires a named accountable executive, or organizational politics that require constant senior presence. In those cases, hire full-time even if the scope does not fully justify it.",
        ],
      },
      {
        type: "pullquote",
        text: "Test the role for a year",
        emphasis: "before you pay for it forever.",
      },
      { type: "heading", text: "Bottom line" },
      {
        type: "paragraph",
        content: [
          "Fractional is the right choice for mid-market companies with revenue between $25M and $500M and an AI program under $2M a year. Market cost runs ",
          { text: "$5K to $25K per month", tnum: true },
          " against ",
          { text: "$400K to $600K", tnum: true },
          " loaded comp for full-time. Use it as a 6 to 18 month bridge, pair it with a delivery team for implementation, and convert to full-time only when the scope proves it.",
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
