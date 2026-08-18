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
 * One reusable template that every industry page re-skins onto.
 * Slugs carry indexed equity from the legacy site. Do not rename them.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing",
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
  {
    slug: "financial-services",
    name: "financial services",
    bandLabel: "Financial services",
    workflowSteps: [
      {
        title: "File opens",
        description:
          "An application or onboarding request arrives. Documents land in email and portals. Someone re-keys the entity data.",
      },
      {
        title: "Data gathered",
        description:
          "An analyst pulls statements, runs screening, and spreads financials by hand. The file waits on each lookup.",
      },
      {
        title: "Memo assembled",
        description:
          "The underwriting or compliance memo is written from scratch. Evidence is copied in one screen at a time.",
      },
      {
        title: "Decision filed",
        description:
          "The decision is keyed into the system of record. The audit trail is rebuilt by hand if anyone asks.",
      },
    ],
    system: {
      name: "A file intake and review agent.",
      description:
        "An agent that reads inbound documents, structures the entity data, drafts the memo with cited evidence, and routes exceptions to your analysts. Every action is logged for audit. Your team keeps the final say on every decision. The agent removes the data gathering, not the judgment.",
    },
    benchmarks: [
      {
        label: "Analyst time spent gathering data, not judging risk",
        value: "40 to 70 percent",
      },
      {
        label: "Fraud alerts that are false positives",
        value: "Above 90 percent",
      },
      {
        label: "Review throughput lift from automated intake",
        value: "Varies by control set",
      },
    ],
    locationNoun: "in your back office",
  },
  {
    slug: "healthcare",
    name: "healthcare",
    bandLabel: "Healthcare",
    workflowSteps: [
      {
        title: "Patient arrives",
        description:
          "Intake forms, insurance checks, and consents are collected by hand at the front desk. The queue backs up.",
      },
      {
        title: "Visit documented",
        description:
          "The clinician types the note into the EHR, often after hours. Coding happens later, from memory.",
      },
      {
        title: "Prior auth assembled",
        description:
          "Staff pull clinical notes into a packet by hand and submit it to the payer portal. Then they wait.",
      },
      {
        title: "Denial worked",
        description:
          "Denied claims come back weeks later. Appeals are drafted one at a time from the chart.",
      },
    ],
    system: {
      name: "A prior-auth and documentation agent.",
      description:
        "An agent that drafts prior-auth packets from the clinical record, prepares visit documentation for clinician sign-off, and flags claims likely to deny before submission. Built with HIPAA controls and a full audit trail. Clinicians keep the final say on every note and every submission. The agent removes the after-hours paperwork.",
    },
    benchmarks: [
      {
        label: "Clinician time spent on EHR documentation",
        value: "30 to 40 percent",
      },
      {
        label: "Front-desk time on intake and verification",
        value: "40 to 60 percent",
      },
      {
        label: "Denial rate reduction from pre-submission checks",
        value: "Varies by payer mix",
      },
    ],
    locationNoun: "in your clinic",
  },
  {
    slug: "saas",
    name: "SaaS and technology",
    bandLabel: "SaaS and technology",
    workflowSteps: [
      {
        title: "Lead lands",
        description:
          "A signup or inbound lead arrives. A rep researches the company by hand across a dozen tabs.",
      },
      {
        title: "Outreach drafted",
        description:
          "Messages are adapted from templates, one account at a time. Personalization depends on rep effort.",
      },
      {
        title: "CRM updated later",
        description:
          "Contacts, stages, and notes are keyed in after the fact, or not at all. Pipeline data drifts.",
      },
      {
        title: "Review deck built",
        description:
          "QBR and renewal decks are assembled by hand from usage exports. The prep eats selling time.",
      },
    ],
    system: {
      name: "A pipeline research and hygiene agent.",
      description:
        "An agent that enriches every account, drafts the pre-meeting brief, keeps the CRM current from email and calendar activity, and assembles the renewal review from live usage data. Reps keep the final say on every message. The agent removes the research hours and the admin backlog.",
    },
    benchmarks: [
      {
        label: "Rep time spent on automatable prospecting work",
        value: "About 30 percent",
      },
      {
        label: "Customer success time on manual reporting",
        value: "20 to 30 percent",
      },
      {
        label: "Pipeline conversion lift from faster follow-up",
        value: "Varies by motion",
      },
    ],
    locationNoun: "in your revenue team",
  },
  {
    slug: "private-equity",
    name: "private equity",
    bandLabel: "Private equity",
    workflowSteps: [
      {
        title: "Mandate lands",
        description:
          "The sponsor asks every portfolio company for an AI plan. Each one answers in its own format.",
      },
      {
        title: "Opportunities listed",
        description:
          "Use cases are gathered ad hoc. There is no shared scoring, so nothing is comparable across companies.",
      },
      {
        title: "Initiatives funded",
        description:
          "Projects start on conviction. Ownership is unclear and the EBITDA link is asserted, not instrumented.",
      },
      {
        title: "Reporting drifts",
        description:
          "Each company reports progress its own way. The operating team cannot see where value is moving.",
      },
    ],
    system: {
      name: "A portfolio scan and scoreboard.",
      description:
        "The same diagnostic run across portfolio companies, with every opportunity scored the same way and tied to a named EBITDA lever. A sponsor-level scoreboard shows adoption and progress in one view. The operating team keeps the final say on sequencing. The system removes the ad hoc lists, not the operating judgment.",
    },
    benchmarks: [
      {
        label: "Portfolio companies with a coherent AI plan",
        value: "Under 25 percent",
      },
      {
        label: "Lag between platform adoption and bolt-on rollout",
        value: "12 to 18 months",
      },
      {
        label: "EBITDA improvement cited in portfolio AI benchmarks",
        value: "Varies by company",
      },
    ],
    locationNoun: "across your portfolio",
  },
  {
    slug: "insurance",
    name: "insurance",
    bandLabel: "Insurance",
    workflowSteps: [
      {
        title: "Submission arrives",
        description:
          "ACORD forms, loss runs, and schedules land in the underwriter's inbox. Someone re-keys the data.",
      },
      {
        title: "Data structured",
        description:
          "The underwriter spends the day gathering and structuring submission data instead of selecting risk.",
      },
      {
        title: "Risk priced",
        description:
          "Pricing leans on experience and whatever comparables come to mind. Consistency varies by desk.",
      },
      {
        title: "Quote chased",
        description:
          "Missing information goes back and forth by email. Submissions stall in inbox queues and bind windows close.",
      },
    ],
    system: {
      name: "A submission intake agent.",
      description:
        "An agent that reads inbound submissions, structures the data, scores fit to appetite, and surfaces comparable bound risks for the underwriter. Built with the explainability and audit logs state regulators expect. Underwriters keep the final say on every risk. The agent removes the data prep, not the selection.",
    },
    benchmarks: [
      {
        label: "Underwriter time spent gathering data",
        value: "About 60 percent",
      },
      {
        label: "Submission handling time, manual intake",
        value: "Hours per file",
      },
      {
        label: "Bind ratio lift from faster quote turnaround",
        value: "Varies by line",
      },
    ],
    locationNoun: "on your underwriting desk",
  },
  {
    slug: "retail",
    name: "retail and e-commerce",
    bandLabel: "Retail and e-commerce",
    workflowSteps: [
      {
        title: "Sales data lands",
        description:
          "Weekly sell-through reports arrive as exports. Planners stitch them together in spreadsheets.",
      },
      {
        title: "Demand read by hand",
        description:
          "Forecasts are adjusted from experience. Store-level and SKU-level signals get averaged away.",
      },
      {
        title: "Prices and markdowns set",
        description:
          "Markdown depth and timing follow rules of thumb. Margin is negotiated cell by cell.",
      },
      {
        title: "Changes keyed per system",
        description:
          "Price and allocation changes are entered by hand across channels and stores. Errors surface on the shelf.",
      },
    ],
    system: {
      name: "A pricing and markdown agent.",
      description:
        "An agent that reads sell-through daily, drafts price and markdown recommendations with margin guardrails, and stages the changes for planner review. Merchants keep the final say on every price. The agent removes the spreadsheet assembly and the re-keying.",
    },
    benchmarks: [
      {
        label: "Planner time on report assembly per week",
        value: "8 to 12 hours",
      },
      {
        label: "Returns share of online sales, many categories",
        value: "About 30 percent",
      },
      {
        label: "Margin lift from disciplined markdowns",
        value: "Varies by category",
      },
    ],
    locationNoun: "in your merchandising office",
  },
  {
    slug: "logistics-transportation",
    name: "logistics and transportation",
    bandLabel: "Logistics and transportation",
    workflowSteps: [
      {
        title: "RFQ arrives",
        description:
          "A shipper emails a quote request. A rep re-keys the lane, checks rates, and starts the clock.",
      },
      {
        title: "Rate worked up",
        description:
          "Pricing is assembled from rate sheets, spot boards, and memory. The quote takes hours when the shipper expects minutes.",
      },
      {
        title: "Load dispatched",
        description:
          "Dispatchers match loads to drivers by hand across hours-of-service, location, and equipment. Utilization is left on the table.",
      },
      {
        title: "Status chased",
        description:
          "Customers call for updates. Reps chase check calls and paperwork instead of the next load.",
      },
    ],
    system: {
      name: "A quote and dispatch desk agent.",
      description:
        "An agent that reads inbound RFQs, drafts the quote with target margin by lane, proposes driver and load matches, and answers status requests from live data. Dispatch keeps the final say on every load. The agent removes the re-keying and the check calls.",
    },
    benchmarks: [
      {
        label: "Rep time spent on quote follow-up",
        value: "About 40 percent",
      },
      {
        label: "Dispatcher time on manual routing",
        value: "20 to 40 percent",
      },
      {
        label: "Margin lift from faster quotes",
        value: "Varies by lane mix",
      },
    ],
    locationNoun: "in your ops center",
  },
  {
    slug: "professional-services",
    name: "professional services",
    bandLabel: "Professional services",
    workflowSteps: [
      {
        title: "RFP arrives",
        description:
          "A partner scans the request and pulls the last similar proposal. The clock starts on a short deadline.",
      },
      {
        title: "Credentials hunted",
        description:
          "Past work, bios, and case material are hunted across drives and inboxes. Nobody finds the best example.",
      },
      {
        title: "Draft assembled",
        description:
          "Senior staff write sections from scratch at night. Formatting eats hours that clients never see.",
      },
      {
        title: "Pricing debated",
        description:
          "Fees are set from memory of the last deal. The proposal ships late and margin is guessed.",
      },
    ],
    system: {
      name: "A proposal desk agent.",
      description:
        "An agent that assembles the first draft from your past wins, retrieves the right credentials and methodology, and recommends pricing from historical margin. Partners keep the final say on every proposal. The agent removes the hunting and the formatting, not the judgment.",
    },
    benchmarks: [
      {
        label: "Senior staff time on work below their judgment",
        value: "40 to 60 percent",
      },
      {
        label: "Utilization at mid-market firms",
        value: "50 to 60 percent",
      },
      {
        label: "Proposal cycle compression from drafted-first workflows",
        value: "Varies by practice",
      },
    ],
    locationNoun: "in your practice",
  },
  {
    slug: "real-estate",
    name: "real estate",
    bandLabel: "Real estate",
    workflowSteps: [
      {
        title: "Deal lands",
        description:
          "An OM and rent roll arrive as PDFs. An analyst re-keys the numbers into the model by hand.",
      },
      {
        title: "Comps assembled",
        description:
          "Comparables are gathered from portals and calls, one submarket at a time. Days pass.",
      },
      {
        title: "Memo drafted",
        description:
          "The IC memo is written from scratch. Half the week goes to data prep, not the decision.",
      },
      {
        title: "Leases abstracted",
        description:
          "Post-close, lease terms are abstracted by hand into spreadsheets. The data goes stale immediately.",
      },
    ],
    system: {
      name: "A deal intake and abstraction agent.",
      description:
        "An agent that extracts rent rolls and lease terms from PDFs into your model, assembles the comp set, and drafts the IC memo for review. Your team keeps the final say on every deal. The agent removes the re-keying, so analysts work on the decision instead of the data prep.",
    },
    benchmarks: [
      {
        label: "CRE data trapped in unstructured documents",
        value: "Above 70 percent",
      },
      {
        label: "Asset manager time on data prep, not analysis",
        value: "50 to 70 percent",
      },
      {
        label: "Underwriting cycle compression from extraction",
        value: "Varies by asset class",
      },
    ],
    locationNoun: "in your acquisitions team",
  },
  {
    slug: "construction-engineering",
    name: "construction and engineering",
    bandLabel: "Construction and engineering",
    workflowSteps: [
      {
        title: "Bid invite arrives",
        description:
          "Plans land in the plan room. Estimators pick which jobs to bid based on the hours they have, not the fit.",
      },
      {
        title: "Takeoff by hand",
        description:
          "Quantities are counted off drawings manually. One bid consumes an estimator for days.",
      },
      {
        title: "Price assembled",
        description:
          "Costs are built from history and supplier calls. Risk is priced by feel.",
      },
      {
        title: "Paper chases the job",
        description:
          "RFIs, submittals, and dailies pile onto superintendents and PMs. Rework gets caught in the field, where it is expensive.",
      },
    ],
    system: {
      name: "An estimating and RFI desk agent.",
      description:
        "An agent that extracts quantities from drawings, drafts the bid from your cost history, and triages RFIs and submittals with cited drawing references. Estimators and PMs keep the final say on every number. The agent removes the counting and the paper chase.",
    },
    benchmarks: [
      {
        label: "Rework share of project cost",
        value: "5 to 15 percent",
      },
      {
        label: "Project cost that is admin and rework",
        value: "About 30 percent",
      },
      {
        label: "Bid volume lift at the same estimating headcount",
        value: "Varies by trade",
      },
    ],
    locationNoun: "in your estimating room",
  },
  {
    slug: "consumer-products",
    name: "consumer products",
    bandLabel: "Consumer products",
    workflowSteps: [
      {
        title: "Promo window opens",
        description:
          "A retailer asks for the promotion plan. The planner mines last year's spreadsheets for what ran.",
      },
      {
        title: "Plan negotiated",
        description:
          "Depth and timing are set from precedent and gut feel. The ROI case is asserted, not modeled.",
      },
      {
        title: "Forecast adjusted by hand",
        description:
          "Demand plans are overridden in meetings. SKU-level error flows straight into inventory and waste.",
      },
      {
        title: "Deductions reconciled late",
        description:
          "Months later, trade spend is reconciled against deductions by hand. Leakage is found after it is gone.",
      },
    ],
    system: {
      name: "A trade planning agent.",
      description:
        "An agent that drafts promotion plans from measured past lift, updates the demand forecast daily from POS and inventory signals, and flags deductions worth disputing with the evidence attached. Your commercial team keeps the final say on every plan. The agent removes the spreadsheet archaeology.",
    },
    benchmarks: [
      {
        label: "Trade promotions that break even or better",
        value: "Under 30 percent",
      },
      {
        label: "SKU-level forecast error, common baseline",
        value: "30 percent or more",
      },
      {
        label: "Trade ROI improvement from measured planning",
        value: "Varies by category",
      },
    ],
    locationNoun: "in your commercial team",
  },
  {
    slug: "life-sciences",
    name: "life sciences",
    bandLabel: "Life sciences",
    workflowSteps: [
      {
        title: "Data locks",
        description:
          "Clinical data is ready. Medical writers start assembling submission sections by hand from tables and prior documents.",
      },
      {
        title: "Drafts loop",
        description:
          "Every section cycles through review after review. The calendar, not the science, sets the pace.",
      },
      {
        title: "Safety reports triaged",
        description:
          "Adverse-event reports are classified one at a time for severity and reportability. Volume keeps growing.",
      },
      {
        title: "Records reviewed by hand",
        description:
          "Batch records and deviations are reviewed page by page. Quality staff read for completeness, not signal.",
      },
    ],
    system: {
      name: "A regulated drafting and triage agent.",
      description:
        "An agent that assembles first-draft submission sections from source data, classifies safety reports for human confirmation, and pre-reviews batch records for completeness. Built to GxP discipline: validation documentation, audit trails, and human sign-off on every regulated decision. The agent removes the assembly work, not the accountability.",
    },
    benchmarks: [
      {
        label: "Medical writer time on first-draft assembly",
        value: "50 to 70 percent",
      },
      {
        label: "Average cost to bring a new drug to market",
        value: "Above $2 billion",
      },
      {
        label: "Submission cycle compression from drafted-first work",
        value: "Varies by document type",
      },
    ],
    locationNoun: "in your regulatory team",
  },
  {
    slug: "energy-utilities",
    name: "energy and utilities",
    bandLabel: "Energy and utilities",
    workflowSteps: [
      {
        title: "Contact arrives",
        description:
          "A customer calls about a bill or an outage. An agent navigates several screens to find the answer.",
      },
      {
        title: "Answer read back",
        description:
          "Most contacts are routine. Each one still takes a person, a queue, and a hold time.",
      },
      {
        title: "Work order typed",
        description:
          "Field work is created by hand from the call notes. Skill, parts, and duration are guessed.",
      },
      {
        title: "Truck rolls",
        description:
          "The tech arrives without the right context or truck stock. Return trips absorb the day.",
      },
    ],
    system: {
      name: "A service and work-order agent.",
      description:
        "An agent that resolves routine billing and outage contacts from live system data, drafts work orders with predicted skill and parts, and escalates the complex cases to people. Your service center keeps the final say on every escalation. The agent removes the queue, not the human backstop.",
    },
    benchmarks: [
      {
        label: "Customer contacts that are routine",
        value: "About 60 percent or more",
      },
      {
        label: "Commercial building energy waste considered addressable",
        value: "20 to 30 percent",
      },
      {
        label: "First-time-fix lift from better work orders",
        value: "Varies by territory",
      },
    ],
    locationNoun: "in your service center",
  },
  {
    slug: "travel-hospitality",
    name: "travel and hospitality",
    bandLabel: "Travel and hospitality",
    workflowSteps: [
      {
        title: "Occupancy pulled",
        description:
          "The morning report is exported and read by hand. Yesterday's picture drives today's prices.",
      },
      {
        title: "Comp rates checked",
        description:
          "Competitor rates are checked screen by screen. Coverage depends on how much time the manager has.",
      },
      {
        title: "Rates set by rule of thumb",
        description:
          "Pricing follows fixed rules and instinct. Perishable inventory expires unsold or sells too cheap.",
      },
      {
        title: "Changes keyed per channel",
        description:
          "New rates are entered by hand across channels and rate codes. Guest requests pile up at the desk meanwhile.",
      },
    ],
    system: {
      name: "A rate desk and guest-request agent.",
      description:
        "An agent that drafts daily pricing by date, segment, and channel for manager approval, pushes approved rates everywhere at once, and handles routine guest requests so the desk works the exceptions. Your revenue manager keeps the final say on every rate. The agent removes the screen-by-screen checking.",
    },
    benchmarks: [
      {
        label: "Front-desk time on automatable tasks",
        value: "40 to 60 percent",
      },
      {
        label: "Rate updates keyed per day, manual shops",
        value: "Dozens per property",
      },
      {
        label: "Revenue per available unit lift from live pricing",
        value: "Varies by market",
      },
    ],
    locationNoun: "at your property",
  },
  {
    slug: "telecommunications",
    name: "telecommunications",
    bandLabel: "Telecommunications",
    workflowSteps: [
      {
        title: "Call arrives",
        description:
          "A customer calls about billing, a plan change, or a fault. The agent works across OSS and BSS screens.",
      },
      {
        title: "Script walked",
        description:
          "Troubleshooting follows the same script for every caller. Handle time stretches and queues grow.",
      },
      {
        title: "Truck roll booked",
        description:
          "When the script runs out, a tech is dispatched. Many rolls were never needed.",
      },
      {
        title: "Churn found late",
        description:
          "The customer leaves weeks later. The warning signs were in the data and nobody was looking.",
      },
    ],
    system: {
      name: "A service triage agent.",
      description:
        "An agent that resolves routine contacts from live account and network data, routes the rest to the right specialist, flags likely-unnecessary truck rolls, and surfaces at-risk customers while there is time to act. Your team keeps the final say on every dispatch and every save offer. The agent removes the script, not the service.",
    },
    benchmarks: [
      {
        label: "Network operations time on routine triage",
        value: "20 to 30 percent",
      },
      {
        label: "Churn detectable 30 to 60 days ahead",
        value: "15 to 25 percent",
      },
      {
        label: "Handle time reduction from data-first triage",
        value: "Varies by product mix",
      },
    ],
    locationNoun: "in your call center",
  },
  {
    slug: "automotive",
    name: "automotive and mobility",
    bandLabel: "Automotive and mobility",
    workflowSteps: [
      {
        title: "Claim arrives",
        description:
          "A warranty claim comes in from the dealer. An engineer reads the description and guesses at root cause.",
      },
      {
        title: "Parts travel",
        description:
          "Returned parts wait for teardown. The field keeps failing the same way while the queue moves.",
      },
      {
        title: "Issue triaged by hand",
        description:
          "Quality issues are classified one at a time and routed by whoever reads them first.",
      },
      {
        title: "Cost lands late",
        description:
          "Warranty spend is reconciled after the fact. The pattern that predicted it was in the claims text all along.",
      },
    ],
    system: {
      name: "A warranty and quality triage agent.",
      description:
        "An agent that reads incoming claims, clusters them to likely root cause, routes each issue to the right team, and flags emerging field patterns before they become campaigns. Your quality engineers keep the final say on every disposition. The agent removes the one-at-a-time reading.",
    },
    benchmarks: [
      {
        label: "Dealer F&I time on automatable paperwork",
        value: "Above 40 percent",
      },
      {
        label: "Typical vehicle development cycle",
        value: "5 to 7 years",
      },
      {
        label: "Warranty cost reduction from earlier triage",
        value: "Varies by program",
      },
    ],
    locationNoun: "in your quality team",
  },
  {
    slug: "education",
    name: "education",
    bandLabel: "Education",
    workflowSteps: [
      {
        title: "Application arrives",
        description:
          "Applications, transcripts, and aid documents land in the queue. Staff check each file for completeness by hand.",
      },
      {
        title: "Documents chased",
        description:
          "Missing items are chased one email at a time. Applicants go quiet while they wait.",
      },
      {
        title: "Questions answered one by one",
        description:
          "Advising, registrar, and aid teams answer the same routine questions all day.",
      },
      {
        title: "Risk found late",
        description:
          "Struggling students surface at midterms. The engagement signals were there weeks earlier.",
      },
    ],
    system: {
      name: "An enrollment and advising agent.",
      description:
        "An agent that screens applications for completeness, chases missing documents, answers routine advising and aid questions, and flags at-risk students to a human advisor early. Your staff keep the final say on every admit and every intervention. The agent removes the queue, so people do the counseling.",
    },
    benchmarks: [
      {
        label: "Educator time on administration, not instruction",
        value: "40 to 60 percent",
      },
      {
        label: "Higher-ed students at risk of dropping out",
        value: "15 to 25 percent",
      },
      {
        label: "Retention lift from earlier intervention",
        value: "Varies by institution",
      },
    ],
    locationNoun: "on your campus",
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
