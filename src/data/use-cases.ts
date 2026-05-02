export interface UseCase {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string;
  heroStatement: string;
  outcome: string;
  bestFor: string;
  fieldProof: {
    headline: string;
    body: string;
    bullets: string[];
  };
  operatorView: OperatorView;
  visual: {
    poster: string;
    mp4: string;
    webm: string;
    alt: string;
  };
  symptoms: string[];
  machine: {
    label: string;
    description: string;
  }[];
  plays: {
    title: string;
    description: string;
  }[];
  metrics: {
    value: string;
    label: string;
    description: string;
  }[];
  process: {
    phase: string;
    title: string;
    description: string;
  }[];
  relatedLinks: {
    label: string;
    href: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export type OperatorTone = 'emerald' | 'blue' | 'amber' | 'red' | 'slate';

export interface OperatorView {
  eyebrow: string;
  headline: string;
  body: string;
  productLabel: string;
  rhythm: string;
  kpis: {
    value: string;
    label: string;
    detail: string;
  }[];
  analytics?: {
    leadVolume: {
      month: string;
      found: number;
      validated: number;
      qualified: number;
    }[];
    teamPerformance: {
      member: string;
      territory: string;
      opportunities: number;
      stageMovement: string;
      firstContact: string;
      feedback: string;
      score: number;
    }[];
  };
  stages: {
    label: string;
    count: string;
    tone: OperatorTone;
  }[];
  opportunities: {
    name: string;
    trigger: string;
    stage: string;
    score: string;
    owner: string;
    action: string;
    tone: OperatorTone;
  }[];
  intelligenceGaps: string[];
  actionPlan: {
    phase: string;
    action: string;
  }[];
  autonomy: {
    label: 'Auto' | 'AI Draft' | 'Human Led';
    detail: string;
    tone: OperatorTone;
  }[];
  feedbackLoop: {
    label: string;
    detail: string;
  }[];
}

export const useCases: UseCase[] = [
  {
    slug: 'ai-sales-pipeline-acceleration',
    title: 'AI Sales Pipeline Acceleration',
    shortTitle: 'Sales Pipeline',
    eyebrow: 'Revenue growth',
    seoTitle: 'AI Sales Pipeline Acceleration for B2B Growth',
    metaDescription:
      'Build an AI sales pipeline machine that finds growth spots, prioritizes accounts, automates follow-up, and gives sales leaders cleaner forecast visibility.',
    keywords: [
      'AI sales pipeline',
      'AI sales automation',
      'AI revenue operations',
      'B2B sales AI agents',
      'sales pipeline acceleration',
    ],
    summary:
      'Turn scattered CRM data, market triggers, intent signals, and seller activity into a disciplined growth machine.',
    heroStatement:
      'Find the accounts most likely to move. Give your team the AI machine to reach them first.',
    outcome:
      'More qualified pipeline, faster follow-up, cleaner data, and a sales team focused on judgment instead of manual research.',
    bestFor:
      'B2B companies with long sales cycles, uneven CRM hygiene, slow lead response, or too many high-fit accounts going untouched.',
    fieldProof: {
      headline: 'The strongest pattern is a trigger-driven sales intelligence engine.',
      body: 'In a live industrial GTM deployment, the breakthrough was not a bigger prospect list. It was a territory-by-territory operating system that watched for capital projects, EPC awards, facility expansions, leadership changes, technical requirements, and customer ecosystem movement before buyers entered a standard procurement motion.',
      bullets: [
        'Build an 8-12 category trigger taxonomy around the real buying events in the market.',
        'Turn each trigger into scored accounts, decision-maker maps, sales plays, and rep-ready next actions.',
        'Close the loop weekly so sales feedback improves targeting, scoring, and message quality.',
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What the growth machine looks like once it is operating.',
      body: 'A CEO, COO, PE operator, or owner needs to see how ClearForge finds the growth spots, turns them into scored pursuits, gives people the next action, and learns from the field every week.',
      productLabel: 'Growth Intelligence Command',
      rhythm: 'Weekly territory growth review',
      kpis: [
        {
          value: '94%',
          label: 'Trigger coverage',
          detail: 'Priority signals monitored across territories and segments.',
        },
        {
          value: '48h',
          label: 'First-contact target',
          detail: 'Validated pursuits move quickly while the buying event is fresh.',
        },
        {
          value: '30d',
          label: 'Action window',
          detail: 'Every report becomes a near-term sales operating plan.',
        },
      ],
      analytics: {
        leadVolume: [
          { month: 'Jan', found: 42, validated: 14, qualified: 5 },
          { month: 'Feb', found: 58, validated: 19, qualified: 7 },
          { month: 'Mar', found: 76, validated: 26, qualified: 9 },
          { month: 'Apr', found: 104, validated: 34, qualified: 11 },
        ],
        teamPerformance: [
          {
            member: 'AE North',
            territory: 'Industrial accounts',
            opportunities: 31,
            stageMovement: '+14',
            firstContact: '39h',
            feedback: '92%',
            score: 91,
          },
          {
            member: 'AE Central',
            territory: 'Growth accounts',
            opportunities: 27,
            stageMovement: '+11',
            firstContact: '46h',
            feedback: '87%',
            score: 84,
          },
          {
            member: 'Inside Growth',
            territory: 'Emerging signals',
            opportunities: 44,
            stageMovement: '+18',
            firstContact: '31h',
            feedback: '89%',
            score: 88,
          },
        ],
      },
      stages: [
        { label: 'Identified', count: '128', tone: 'slate' },
        { label: 'Validated', count: '34', tone: 'blue' },
        { label: 'Called', count: '19', tone: 'amber' },
        { label: 'Qualified', count: '11', tone: 'emerald' },
        { label: 'Won', count: '4', tone: 'emerald' },
        { label: 'Not a Fit', count: '27', tone: 'red' },
      ],
      opportunities: [
        {
          name: 'Gulf Coast specialty chemical expansion',
          trigger: 'EPC award + capacity expansion',
          stage: 'Validated',
          score: '94',
          owner: 'Strategic AE',
          action: 'Confirm decision map and RFP window.',
          tone: 'emerald',
        },
        {
          name: 'Southwest AI data center campus',
          trigger: 'Cooling infrastructure demand',
          stage: 'Called',
          score: '90',
          owner: 'Regional seller',
          action: 'Validate specs with facilities lead.',
          tone: 'blue',
        },
        {
          name: 'Midwest battery materials facility',
          trigger: 'FEED start + incentive funding',
          stage: 'Identified',
          score: '87',
          owner: 'Growth lead',
          action: 'Build stakeholder map and first outreach.',
          tone: 'amber',
        },
      ],
      intelligenceGaps: [
        'RFP and procurement window not yet confirmed.',
        'EPC and end-user decision map incomplete.',
        'Technical specification package needs seller validation.',
      ],
      actionPlan: [
        { phase: 'Week 1', action: 'Score and triage the territory by live buying events.' },
        { phase: 'Week 2', action: 'Build contact maps and account-specific playbooks.' },
        { phase: 'Week 3', action: 'Launch executive outreach with seller review.' },
        { phase: 'Week 4', action: 'Review outcomes, overrides, and next trigger tuning.' },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail: 'Monitor triggers, enrich accounts, refresh scores, and flag stale pursuits.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare playbooks, outreach angles, call prep, and gap lists for review.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Own qualification, relationships, commercial judgment, and negotiation.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Market signal',
          detail: 'Capital project, expansion, regulation, or buyer change.',
        },
        {
          label: 'AI machine',
          detail: 'Score, brief, route, draft, and recommend the next action.',
        },
        { label: 'Team judgment', detail: 'Validate fit, update outcome, and improve the model.' },
      ],
    },
    visual: {
      poster: '/images/use-cases/sales-pipeline-dashboard-command-center.webp',
      mp4: '/videos/use-cases/ai-sales-pipeline-acceleration.mp4',
      webm: '/videos/use-cases/ai-sales-pipeline-acceleration.webm',
      alt: 'AI sales pipeline dashboard showing trigger volume, qualified opportunities, and forecast movement',
    },
    symptoms: [
      'Sales leaders cannot see which accounts deserve attention this week.',
      'Reps lose hours to research, list building, CRM cleanup, and hand-written follow-up.',
      'Marketing signals, web activity, and account context never become timely seller action.',
      'Forecast reviews become storytelling because pipeline quality is inconsistent.',
    ],
    machine: [
      {
        label: 'Trigger layer',
        description:
          'Define the market events that create urgency: funding, expansion, regulation, leadership change, product launch, competitor movement, or operational pain.',
      },
      {
        label: 'Prioritization layer',
        description:
          'Score accounts by fit, urgency, relationship context, white space, and next-best action.',
      },
      {
        label: 'Execution layer',
        description:
          'Trigger research briefs, account plans, outreach drafts, follow-up reminders, and manager alerts.',
      },
      {
        label: 'Operating layer',
        description:
          'Create weekly review routines so leaders inspect conversion quality, not just activity volume.',
      },
    ],
    plays: [
      {
        title: 'Account priority engine',
        description:
          'Ranks accounts and contacts by growth potential, trigger events, engagement, fit, and relationship history.',
      },
      {
        title: 'Territory intelligence report',
        description:
          'Packages scored opportunities, market context, intelligence gaps, and a 30-day sales action plan for each region or segment.',
      },
      {
        title: 'Rep research agent',
        description:
          'Builds concise account briefs, stakeholder maps, call prep, and tailored outreach angles from approved sources.',
      },
      {
        title: 'Follow-up and handoff orchestration',
        description:
          'Routes inbound leads, reminds owners, drafts next steps, and escalates stalled high-value opportunities.',
      },
      {
        title: 'Pipeline quality dashboard',
        description:
          'Shows conversion leaks, stale opportunities, incomplete fields, next actions, and manager coaching moments.',
      },
    ],
    metrics: [
      {
        value: 'Days',
        label: 'To first shipped workflow',
        description: 'Start with one sales motion before expanding across the revenue team.',
      },
      {
        value: 'Hours',
        label: 'Back to sellers weekly',
        description: 'Reduce research, CRM cleanup, and repetitive follow-up work.',
      },
      {
        value: 'Lift',
        label: 'In qualified pursuit',
        description:
          'Prioritize accounts with real business triggers instead of generic firmographic fit.',
      },
    ],
    process: [
      {
        phase: 'Week 1',
        title: 'Map the revenue path',
        description:
          'Audit CRM data, lead sources, funnel conversion, seller workflow, territory rules, and high-value account segments.',
      },
      {
        phase: 'Weeks 2-3',
        title: 'Build the trigger machine',
        description:
          'Connect data sources, design the trigger taxonomy, create scoring logic, and ship the first account intelligence workflow.',
      },
      {
        phase: 'Weeks 4-6',
        title: 'Install seller actions',
        description:
          'Add outreach, research, handoff, routing, and management routines with human review checkpoints.',
      },
      {
        phase: 'Ongoing',
        title: 'Tune the growth loop',
        description:
          'Review conversion quality, improve prompts and signals, and expand into adjacent sales motions.',
      },
    ],
    relatedLinks: [
      { label: 'AI Revenue Operations', href: '/services/ai-revenue-operations' },
      { label: 'SaaS & Technology', href: '/industries/saas' },
      { label: 'Professional Services', href: '/industries/professional-services' },
    ],
    faqs: [
      {
        question: 'Is this just automated outbound?',
        answer:
          'No. Outbound is one possible workflow, but the larger system is trigger detection, account prioritization, seller intelligence, CRM hygiene, follow-up discipline, and management visibility.',
      },
      {
        question: 'Will reps trust the recommendations?',
        answer:
          'Only if the system is built around their actual territory, data, and sales process. We install human review, feedback loops, and manager routines so adoption improves over time.',
      },
      {
        question: 'What systems can this connect to?',
        answer:
          'The most common starting points are CRM, marketing automation, enrichment, website analytics, email, calendar, and customer data sources.',
      },
    ],
  },
  {
    slug: 'ai-customer-service-excellence',
    title: 'AI Customer Service Excellence',
    shortTitle: 'Customer Service',
    eyebrow: 'Service quality',
    seoTitle: 'AI Customer Service Automation for Better Support Operations',
    metaDescription:
      'Use AI agents and service workflows to improve response time, quality, routing, escalation, and customer experience without losing human oversight.',
    keywords: [
      'AI customer service automation',
      'AI service operations',
      'customer support AI agents',
      'AI ticket triage',
      'AI customer experience',
    ],
    summary:
      'Give service teams an AI operating layer that triages, drafts, routes, escalates, and quality-checks customer work.',
    heroStatement:
      'Make service faster and more consistent without turning the customer experience into a chatbot maze.',
    outcome:
      'Shorter queues, better first responses, cleaner escalation paths, and a service team that protects trust while moving faster.',
    bestFor:
      'Companies with growing service volume, uneven response quality, manual ticket routing, or too much tribal knowledge trapped in senior staff.',
    fieldProof: {
      headline: 'Service automation works when autonomy is explicit.',
      body: 'The field model uses a practical autonomy ladder: some work can be fully automatic, some should be AI-drafted, and some must stay human-led. That same model is the right foundation for service operations because speed only helps if customers still feel judgment, context, and ownership.',
      bullets: [
        'Auto: classify, summarize, enrich, and route routine requests.',
        'AI Draft: prepare responses, knowledge suggestions, and escalation packets for human review.',
        'Human Led: own sensitive customers, ambiguous exceptions, negotiation, and relationship moments.',
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What the service machine looks like when speed has controls.',
      body: 'The right service system gives leaders a live picture of demand, escalation risk, draft quality, customer sentiment, and where human judgment is required before trust is damaged.',
      productLabel: 'Service Quality Command',
      rhythm: 'Daily backlog and escalation standup',
      kpis: [
        {
          value: '16m',
          label: 'Priority triage',
          detail: 'High-risk requests move to the right owner first.',
        },
        {
          value: '92%',
          label: 'Draft QA pass',
          detail: 'Responses meet tone, policy, and context checks before send.',
        },
        {
          value: '24',
          label: 'At-risk accounts',
          detail: 'Customer issues are grouped by renewal, SLA, and sentiment risk.',
        },
      ],
      stages: [
        { label: 'Intake', count: '186', tone: 'slate' },
        { label: 'Triaged', count: '121', tone: 'blue' },
        { label: 'Drafted', count: '78', tone: 'amber' },
        { label: 'Escalated', count: '14', tone: 'red' },
        { label: 'Resolved', count: '64', tone: 'emerald' },
        { label: 'Learned', count: '9', tone: 'emerald' },
      ],
      opportunities: [
        {
          name: 'Enterprise renewal complaint cluster',
          trigger: 'Negative sentiment + open SLA miss',
          stage: 'Escalated',
          score: '91',
          owner: 'Service leader',
          action: 'Send recovery packet for human approval.',
          tone: 'red',
        },
        {
          name: 'Multi-site onboarding delay',
          trigger: 'Three handoff misses in seven days',
          stage: 'Drafted',
          score: '84',
          owner: 'Implementation lead',
          action: 'Confirm owner and next customer update.',
          tone: 'amber',
        },
        {
          name: 'Repeat billing exception',
          trigger: 'Recurring ticket theme detected',
          stage: 'Triaged',
          score: '76',
          owner: 'Support ops',
          action: 'Route root-cause packet to finance ops.',
          tone: 'blue',
        },
      ],
      intelligenceGaps: [
        'Account history is split across CRM, helpdesk, and notes.',
        'Escalation owner is unclear for SLA-adjacent requests.',
        'Knowledge article needs update after repeated ticket pattern.',
      ],
      actionPlan: [
        { phase: 'Day 1', action: 'Classify demand and separate auto, draft, and human-led work.' },
        {
          phase: 'Day 2',
          action: 'Draft customer responses and escalation packets with QA gates.',
        },
        { phase: 'Day 3', action: 'Review sentiment, backlog risk, and priority accounts.' },
        { phase: 'Weekly', action: 'Convert repeated issues into knowledge and prevention work.' },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail: 'Classify, summarize, route, dedupe, and enrich routine service requests.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare replies, customer histories, escalation packets, and knowledge updates.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Own sensitive customers, exceptions, concessions, and relationship recovery.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Customer signal',
          detail: 'Ticket, email, sentiment, SLA, or account-risk event.',
        },
        { label: 'AI machine', detail: 'Classify, draft, route, quality-check, and flag risk.' },
        {
          label: 'Team judgment',
          detail: 'Approve, personalize, resolve, and improve the knowledge base.',
        },
      ],
    },
    visual: {
      poster: '/images/use-cases/customer-service-quality-dashboard.webp',
      mp4: '/videos/use-cases/ai-customer-service-excellence.mp4',
      webm: '/videos/use-cases/ai-customer-service-excellence.webm',
      alt: 'Customer service dashboard showing SLA health, case routing, deflection, and escalation risk',
    },
    symptoms: [
      'Customers wait because every request is treated like a blank page.',
      'Escalations depend on who is working, not on a consistent operating model.',
      'Quality varies across agents, locations, products, or customer segments.',
      'Managers lack a clear view of backlog risk, customer sentiment, and preventable rework.',
    ],
    machine: [
      {
        label: 'Autonomy layer',
        description:
          'Separate work into auto, AI-drafted, and human-led paths so the team knows exactly where judgment belongs.',
      },
      {
        label: 'Resolution layer',
        description:
          'Draft responses, summarize account history, recommend fixes, and surface relevant knowledge.',
      },
      {
        label: 'Escalation layer',
        description:
          'Route sensitive, high-value, or ambiguous cases to the right human with context already prepared.',
      },
      {
        label: 'Quality layer',
        description:
          'Monitor response quality, tone, policy adherence, repeat issues, and coaching opportunities.',
      },
    ],
    plays: [
      {
        title: 'Ticket triage and routing',
        description:
          'Classifies inbound requests and routes them based on urgency, customer tier, topic, and required expertise.',
      },
      {
        title: 'Autonomy badge rules',
        description:
          'Marks each workflow as auto, AI draft, or human led so leaders can expand automation without losing control.',
      },
      {
        title: 'Agent assist workspace',
        description:
          'Summarizes history, drafts responses, suggests fixes, and flags risks before a human sends anything.',
      },
      {
        title: 'Service quality review',
        description:
          'Scores resolution quality, sentiment, policy adherence, and preventable rework for manager review.',
      },
      {
        title: 'Knowledge gap loop',
        description:
          'Identifies repeated questions and missing documentation so the service machine gets smarter every week.',
      },
    ],
    metrics: [
      {
        value: 'Fast',
        label: 'First response',
        description:
          'Give agents prepared context and response drafts instead of starting from scratch.',
      },
      {
        value: 'Consistent',
        label: 'Resolution quality',
        description: 'Use quality checks and routing rules to reduce variation across the team.',
      },
      {
        value: 'Visible',
        label: 'Backlog risk',
        description:
          'Help leaders see queues, escalations, repeat issues, and service failure patterns.',
      },
    ],
    process: [
      {
        phase: 'Week 1',
        title: 'Map service demand',
        description:
          'Review support volume, categories, escalation paths, quality standards, knowledge sources, and risk rules.',
      },
      {
        phase: 'Weeks 2-3',
        title: 'Build triage and assist',
        description:
          'Ship autonomy rules, ticket classification, history summaries, response drafting, and routing workflows.',
      },
      {
        phase: 'Weeks 4-6',
        title: 'Install quality controls',
        description:
          'Add review queues, escalation rules, coaching dashboards, and customer-risk alerts.',
      },
      {
        phase: 'Ongoing',
        title: 'Improve the service loop',
        description:
          'Use real cases to improve knowledge, prompts, routing, and service leadership cadence.',
      },
    ],
    relatedLinks: [
      { label: 'Custom AI Agents', href: '/services/custom-ai-agents' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Insurance', href: '/industries/insurance' },
    ],
    faqs: [
      {
        question: 'Does this replace service reps?',
        answer:
          'The stronger pattern is augmentation: AI handles triage, summaries, drafts, checks, and routing while humans own judgment, relationship moments, and exceptions.',
      },
      {
        question: 'How do you prevent bad AI replies?',
        answer:
          'We design approval gates, restricted knowledge sources, escalation rules, audit logs, and quality reviews before customer-facing automation expands.',
      },
      {
        question: 'Can this work with our existing helpdesk?',
        answer:
          'Yes. The usual approach is to integrate with the current ticketing and knowledge systems rather than force a platform replacement first.',
      },
    ],
  },
  {
    slug: 'ai-operations-efficiency-machine',
    title: 'AI Operations Efficiency Machine',
    shortTitle: 'Operations Efficiency',
    eyebrow: 'Margin expansion',
    seoTitle: 'AI Operations Automation for Efficiency and Margin',
    metaDescription:
      'Find operational bottlenecks and build AI workflows for order intake, scheduling, approvals, reporting, and handoffs that improve speed and margin.',
    keywords: [
      'AI operations automation',
      'AI process automation',
      'operations efficiency AI',
      'back office AI automation',
      'AI workflow automation',
    ],
    summary:
      'Find the places where work slows down, then build the AI workflows that remove drag without breaking the operating model.',
    heroStatement:
      'Turn manual handoffs and hidden bottlenecks into an operating machine that moves faster every week.',
    outcome:
      'Less rework, fewer delays, cleaner handoffs, faster cycle times, and a clearer path to margin expansion.',
    bestFor:
      'Operations-heavy businesses with manual coordination, order-to-cash friction, approval delays, spreadsheet reporting, or too many status meetings.',
    fieldProof: {
      headline: 'Operations AI should look like a stage-gate system, not a loose tool shelf.',
      body: 'The best operating systems define the real gates in the workflow: what enters, what must be validated, who owns the decision, what evidence is required, and what moves the work forward. AI then does the heavy lifting around each gate while people keep control of exceptions and tradeoffs.',
      bullets: [
        'Map the as-is workflow into named stages, owners, entry criteria, and exit criteria.',
        'Use AI to gather evidence, check completeness, draft handoffs, and surface blockers.',
        'Review flow weekly by cycle time, rework, stuck items, and margin impact.',
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What the operations machine shows leaders every day.',
      body: 'Operators do not need another attractive dashboard. They need a work-control view that shows which handoffs are stuck, what evidence is missing, who owns the decision, and what gets margin back.',
      productLabel: 'Operations Flow Command',
      rhythm: 'Daily throughput and exception review',
      kpis: [
        {
          value: '31h',
          label: 'Waiting time found',
          detail: 'Avoidable pauses surfaced across one priority workflow.',
        },
        {
          value: '12',
          label: 'Stuck handoffs',
          detail: 'Items without owner, evidence, or exit criteria.',
        },
        {
          value: '7',
          label: 'Margin leaks',
          detail: 'Rework, expedite, discount, or delay patterns to attack.',
        },
      ],
      stages: [
        { label: 'Intake', count: '64', tone: 'slate' },
        { label: 'Validated', count: '43', tone: 'blue' },
        { label: 'Routed', count: '31', tone: 'amber' },
        { label: 'Approved', count: '18', tone: 'emerald' },
        { label: 'Completed', count: '22', tone: 'emerald' },
        { label: 'Exception', count: '8', tone: 'red' },
      ],
      opportunities: [
        {
          name: 'Quote package missing engineering inputs',
          trigger: 'Gate failed completeness check',
          stage: 'Exception',
          score: '89',
          owner: 'Ops manager',
          action: 'Route evidence request to engineering owner.',
          tone: 'red',
        },
        {
          name: 'Field schedule change pending approval',
          trigger: 'Customer date moved + no owner',
          stage: 'Routed',
          score: '82',
          owner: 'Planning lead',
          action: 'Draft decision packet for supervisor review.',
          tone: 'amber',
        },
        {
          name: 'Order-to-cash mismatch',
          trigger: 'Invoice variance above tolerance',
          stage: 'Validated',
          score: '74',
          owner: 'Finance ops',
          action: 'Compare contract, PO, and delivery evidence.',
          tone: 'blue',
        },
      ],
      intelligenceGaps: [
        'Entry criteria are not consistently captured before work moves.',
        'Approval reason codes are missing on late-cycle exceptions.',
        'Cost impact is visible after the delay, not while it can be prevented.',
      ],
      actionPlan: [
        { phase: 'Day 1', action: 'Map the gate logic and name the required evidence.' },
        {
          phase: 'Day 3',
          action: 'Automate completeness checks, handoff drafts, and owner routing.',
        },
        { phase: 'Week 2', action: 'Install exception views tied to cycle time and cost impact.' },
        {
          phase: 'Weekly',
          action: 'Review stuck work, repeat causes, and next workflow expansion.',
        },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail: 'Extract fields, check completeness, route standard work, and refresh status.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare handoffs, variance notes, approval packets, and risk summaries.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Decide exceptions, tradeoffs, customer commitments, and operating changes.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Workflow signal',
          detail: 'Missing input, wait time, status drift, or variance event.',
        },
        {
          label: 'AI machine',
          detail: 'Validate, route, draft, summarize, and surface the blocker.',
        },
        {
          label: 'Team judgment',
          detail: 'Resolve the exception and tune the gate for next time.',
        },
      ],
    },
    visual: {
      poster: '/images/use-cases/operations-efficiency-dashboard.webp',
      mp4: '/videos/use-cases/ai-operations-efficiency-machine.mp4',
      webm: '/videos/use-cases/ai-operations-efficiency-machine.webm',
      alt: 'Operations efficiency dashboard showing throughput, bottlenecks, cycle time, and exception ownership',
    },
    symptoms: [
      'Managers spend too much time chasing status instead of improving throughput.',
      'Work moves through email, spreadsheets, shared drives, and tribal knowledge.',
      'Approval queues and exceptions create expensive delays.',
      'Leadership sees lagging KPIs but not the workflow causes behind them.',
    ],
    machine: [
      {
        label: 'Stage-gate map',
        description:
          'Identify the stages, gates, entry rules, exit rules, evidence, systems, and owners that define the real process.',
      },
      {
        label: 'Automation layer',
        description:
          'Use AI agents and rules to draft, validate, route, summarize, and trigger work across systems.',
      },
      {
        label: 'Exception layer',
        description:
          'Separate standard work from edge cases, then route exceptions with context and ownership.',
      },
      {
        label: 'Cadence layer',
        description:
          'Install dashboards and routines so leaders manage flow, quality, and margin instead of noise.',
      },
    ],
    plays: [
      {
        title: 'Stage-gate intake',
        description:
          'Extracts requirements, checks completeness, flags missing information, and advances work only when the gate is ready.',
      },
      {
        title: 'Approval and exception routing',
        description:
          'Moves decisions to the right owner with summaries, policy checks, and recommended actions.',
      },
      {
        title: 'Operational reporting agent',
        description:
          'Turns system data and team updates into daily summaries, KPI variance notes, and risk alerts.',
      },
      {
        title: 'Handoff quality controls',
        description:
          'Checks whether work is ready for the next team before it creates downstream rework.',
      },
    ],
    metrics: [
      {
        value: 'Cycle',
        label: 'Time reduction',
        description: 'Shorten the path from request to completed work by removing avoidable waits.',
      },
      {
        value: 'Rework',
        label: 'Reduction',
        description: 'Catch missing information and quality issues before they move downstream.',
      },
      {
        value: 'Margin',
        label: 'Visibility',
        description: 'Tie workflow drag to cost, capacity, service level, and management action.',
      },
    ],
    process: [
      {
        phase: 'Week 1',
        title: 'Find the drag',
        description:
          'Map the workflow, quantify wait time, identify rework, and choose the highest-value flow to fix first.',
      },
      {
        phase: 'Weeks 2-3',
        title: 'Build the work machine',
        description:
          'Create stage gates, routing, validation, summaries, and reporting workflows around the real process.',
      },
      {
        phase: 'Weeks 4-6',
        title: 'Install accountability',
        description:
          'Deploy dashboards, ownership rules, escalation paths, and weekly operating reviews.',
      },
      {
        phase: 'Ongoing',
        title: 'Expand by value',
        description:
          'Move from one workflow to adjacent bottlenecks once the first system is stable and measured.',
      },
    ],
    relatedLinks: [
      { label: 'Performance Improvement', href: '/services/performance-improvement' },
      { label: 'Manufacturing & Industrial', href: '/industries/manufacturing' },
      { label: 'Wholesale & Distribution', href: '/industries/wholesale-distribution' },
    ],
    faqs: [
      {
        question: 'Where should operations automation start?',
        answer:
          'Start where there is high volume, repeatable decision logic, measurable cycle time, and clear business value. The best first workflow is rarely the flashiest one.',
      },
      {
        question: 'Do we need perfect data first?',
        answer:
          'No, but you need to know where data is reliable, where humans must review, and which decisions can be safely automated versus assisted.',
      },
      {
        question: 'How do you avoid disrupting daily operations?',
        answer:
          'We ship around one workflow at a time, keep human checkpoints, and install escalation paths before widening automation.',
      },
    ],
  },
  {
    slug: 'ai-knowledge-work-automation',
    title: 'AI Knowledge Work Automation',
    shortTitle: 'Knowledge Work',
    eyebrow: 'Speed to insight',
    seoTitle: 'AI Knowledge Work Automation for Research, Reporting, and Decisions',
    metaDescription:
      'Build AI knowledge workflows for research, reporting, document review, synthesis, decision support, and expert handoffs with human judgment built in.',
    keywords: [
      'AI knowledge work automation',
      'AI document automation',
      'AI research automation',
      'AI reporting automation',
      'AI decision support',
    ],
    summary:
      'Give analysts, managers, and experts an AI layer that finds, reads, compares, summarizes, and prepares decisions.',
    heroStatement:
      'Stop making your best people hunt for context. Put the knowledge machine around them.',
    outcome:
      'Faster research, cleaner reporting, more consistent analysis, and better use of scarce expert judgment.',
    bestFor:
      'Teams buried in reports, documents, research, approvals, client prep, compliance reviews, or knowledge trapped across systems.',
    fieldProof: {
      headline: 'The reporting agent should produce decisions, not just documents.',
      body: 'The strongest industrial intelligence outputs combined sourced research, opportunity scoring, intelligence gaps, a 30-day action plan, playbooks, and source bibliographies. That is the better pattern for knowledge work: the AI system prepares a decision packet with evidence, gaps, and next actions attached.',
      bullets: [
        'Require source trails and confidence notes so leaders can inspect the reasoning.',
        'Separate facts, gaps, recommendations, and human decisions into distinct sections.',
        'Turn each finished report into reusable memory for the next market, customer, or workflow.',
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What a decision packet looks like before it reaches an executive.',
      body: 'The strongest reports combine source trails, opportunity tables, evidence gaps, recommendations, and owners. That makes the work useful to an executive who needs to decide, fund, or direct action.',
      productLabel: 'Decision Intelligence Workspace',
      rhythm: 'Monthly market and decision review',
      kpis: [
        {
          value: '82p',
          label: 'Market study',
          detail: 'Deep research turned into executive-ready decisions.',
        },
        {
          value: '358',
          label: 'Companies mapped',
          detail: 'Targets grouped by segment, fit, and strategic relevance.',
        },
        {
          value: '5',
          label: 'Priority moves',
          detail: 'Recommendations tied to action owners and evidence gaps.',
        },
      ],
      stages: [
        { label: 'Sources', count: '214', tone: 'slate' },
        { label: 'Extracted', count: '146', tone: 'blue' },
        { label: 'Scored', count: '58', tone: 'amber' },
        { label: 'Gaps', count: '11', tone: 'red' },
        { label: 'Drafted', count: '7', tone: 'emerald' },
        { label: 'Reviewed', count: '5', tone: 'emerald' },
      ],
      opportunities: [
        {
          name: 'Industrial market-entry thesis',
          trigger: 'Segment growth + competitor whitespace',
          stage: 'Drafted',
          score: '93',
          owner: 'Strategy lead',
          action: 'Review investment thesis and source confidence.',
          tone: 'emerald',
        },
        {
          name: 'Customer ecosystem map',
          trigger: 'Top account network expanded',
          stage: 'Scored',
          score: '88',
          owner: 'Growth ops',
          action: 'Validate relationships and near-term buying events.',
          tone: 'amber',
        },
        {
          name: 'Competitive capability scan',
          trigger: 'New entrant signal in target segment',
          stage: 'Gaps',
          score: '79',
          owner: 'Executive sponsor',
          action: 'Close pricing and channel evidence gaps.',
          tone: 'red',
        },
      ],
      intelligenceGaps: [
        'Procurement timing is inferred and needs source confirmation.',
        'Competitor share estimate requires a higher-confidence citation set.',
        'Internal account owner feedback has not been added to the memo.',
      ],
      actionPlan: [
        { phase: 'Step 1', action: 'Gather approved sources and extract structured evidence.' },
        {
          phase: 'Step 2',
          action: 'Score targets, identify gaps, and separate facts from inference.',
        },
        { phase: 'Step 3', action: 'Draft the decision packet with recommendations and owners.' },
        { phase: 'Step 4', action: 'Capture executive decisions back into reusable memory.' },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail:
            'Collect sources, extract entities, maintain trails, and refresh research queues.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare summaries, comparisons, briefs, recommendations, and gap lists.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Judge confidence, make strategic decisions, and approve external use.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Knowledge signal',
          detail: 'Source, document, meeting note, report, or market event.',
        },
        {
          label: 'AI machine',
          detail: 'Extract, compare, cite, score, draft, and highlight uncertainty.',
        },
        {
          label: 'Team judgment',
          detail: 'Decide, annotate, approve, and teach the next research loop.',
        },
      ],
    },
    visual: {
      poster: '/images/use-cases/knowledge-work-automation-dashboard.webp',
      mp4: '/videos/use-cases/ai-knowledge-work-automation.mp4',
      webm: '/videos/use-cases/ai-knowledge-work-automation.webm',
      alt: 'Knowledge work dashboard showing document intake, cited briefs, decision queues, and research confidence',
    },
    symptoms: [
      'Experts spend valuable hours gathering context before they can make a decision.',
      'Reports are manually assembled from systems, documents, meetings, and spreadsheets.',
      'Teams duplicate research because prior work is hard to find or trust.',
      'Quality depends on who prepared the memo, not on a repeatable review standard.',
    ],
    machine: [
      {
        label: 'Source layer',
        description:
          'Connect trusted documents, systems, policies, prior work, meeting notes, and approved external sources.',
      },
      {
        label: 'Evidence layer',
        description:
          'Summarize, compare, extract, classify, and keep source trails attached to the next human decision.',
      },
      {
        label: 'Decision layer',
        description:
          'Prepare recommendations, open questions, risks, and evidence trails for review.',
      },
      {
        label: 'Memory layer',
        description:
          'Capture decisions and reusable knowledge so the system improves instead of resetting every week.',
      },
    ],
    plays: [
      {
        title: 'Research and synthesis agent',
        description:
          'Collects approved context, summarizes findings, compares options, and highlights evidence gaps.',
      },
      {
        title: 'Document intake and extraction',
        description:
          'Reads PDFs, contracts, forms, reports, and emails to pull structured fields and review flags.',
      },
      {
        title: 'Decision packet workflow',
        description:
          'Assembles executive summary, evidence, gaps, recommendations, action plan, and follow-up owners.',
      },
      {
        title: 'Expert handoff packet',
        description:
          'Prepares the context, evidence, and recommended next step before a specialist spends time.',
      },
    ],
    metrics: [
      {
        value: 'Speed',
        label: 'To first draft',
        description: 'Move from blank page to review-ready analysis faster.',
      },
      {
        value: 'Trace',
        label: 'Evidence trail',
        description: 'Keep citations, sources, and decision context attached to the work.',
      },
      {
        value: 'Reuse',
        label: 'Institutional memory',
        description: 'Turn repeated analysis into reusable knowledge assets.',
      },
    ],
    process: [
      {
        phase: 'Week 1',
        title: 'Choose the knowledge loop',
        description:
          'Find the recurring decision, report, review, or research workflow with high expert time cost.',
      },
      {
        phase: 'Weeks 2-3',
        title: 'Connect trusted context',
        description:
          'Define source rules, document handling, extraction fields, and review standards.',
      },
      {
        phase: 'Weeks 4-6',
        title: 'Ship decision support',
        description:
          'Deploy synthesis, draft, review, action-plan, and approval workflows with evidence trails and human checks.',
      },
      {
        phase: 'Ongoing',
        title: 'Build memory',
        description:
          'Capture reusable answers, improve source quality, and expand to adjacent knowledge workflows.',
      },
    ],
    relatedLinks: [
      { label: 'Custom AI Agents', href: '/services/custom-ai-agents' },
      { label: 'Financial Services', href: '/industries/financial-services' },
      { label: 'Professional Services', href: '/industries/professional-services' },
    ],
    faqs: [
      {
        question: 'How do you prevent hallucinations in knowledge work?',
        answer:
          'We constrain sources, require evidence trails, add review checkpoints, and design outputs around decision support rather than unsupervised final authority.',
      },
      {
        question: 'Can this use internal documents securely?',
        answer:
          'Yes, but the architecture depends on access controls, data sensitivity, retention requirements, and which systems hold the knowledge.',
      },
      {
        question: 'What is a good first workflow?',
        answer:
          'Good first workflows repeat often, consume expert time, have clear source material, and produce a consistent output such as a report, brief, review, or recommendation.',
      },
    ],
  },
  {
    slug: 'ai-quality-control-exception-management',
    title: 'AI Quality Control & Exception Management',
    shortTitle: 'Quality Exceptions',
    eyebrow: 'Quality and risk',
    seoTitle: 'AI Quality Control and Exception Management Workflows',
    metaDescription:
      'Use AI to detect, classify, route, and resolve operational exceptions before they damage quality, service, cost, or customer trust.',
    keywords: [
      'AI quality control',
      'AI exception management',
      'AI defect detection workflow',
      'quality assurance automation',
      'AI risk triage',
    ],
    summary:
      'Create an AI-assisted exception system that detects problems earlier and routes them with context.',
    heroStatement: 'Catch the misses before they become margin leakage, rework, or customer pain.',
    outcome:
      'Earlier detection, faster triage, clearer ownership, better root-cause visibility, and fewer repeated quality failures.',
    bestFor:
      'Manufacturers, service operators, insurers, distributors, and complex workflow teams where exceptions are costly and quality variation compounds.',
    fieldProof: {
      headline: 'The best quality use cases begin with event triggers.',
      body: 'In the industrial GTM work, quality-control crises and recall remediation became high-intent buying signals because they were urgent, funded, and tied to executive risk. Inside an operating company, the same logic applies: detect the quality event early, classify severity, assign ownership, and learn from the repeat pattern.',
      bullets: [
        'Monitor recalls, complaints, inspection failures, returns, warranty claims, and operational disruptions.',
        'Route exceptions by severity, customer impact, regulatory risk, and likely root cause.',
        'Use repeat-pattern mining to turn closed issues into prevention work.',
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What the exception machine shows before quality slips compound.',
      body: 'A serious quality system shows severity, ownership, customer exposure, root-cause evidence, corrective action, and repeat patterns before failures turn into rework, claims, or reputation damage.',
      productLabel: 'Exception Control Tower',
      rhythm: 'Daily severity and corrective-action review',
      kpis: [
        {
          value: '3',
          label: 'Severity tiers',
          detail: 'Clear routing for operational, customer, and regulatory risk.',
        },
        {
          value: '18',
          label: 'Repeat patterns',
          detail: 'Closed issues mined for prevention opportunities.',
        },
        {
          value: '4',
          label: 'Actions due',
          detail: 'Corrective work tracked by owner, proof, and deadline.',
        },
      ],
      stages: [
        { label: 'Detected', count: '42', tone: 'slate' },
        { label: 'Classified', count: '31', tone: 'blue' },
        { label: 'Owned', count: '19', tone: 'amber' },
        { label: 'Contained', count: '8', tone: 'emerald' },
        { label: 'Corrected', count: '13', tone: 'emerald' },
        { label: 'Risk', count: '5', tone: 'red' },
      ],
      opportunities: [
        {
          name: 'Warranty claim cluster',
          trigger: 'Repeat issue across two customer segments',
          stage: 'Risk',
          score: '92',
          owner: 'Quality director',
          action: 'Confirm exposure and containment owner.',
          tone: 'red',
        },
        {
          name: 'Inspection drift in final review',
          trigger: 'Tolerance miss above threshold',
          stage: 'Owned',
          score: '86',
          owner: 'Plant lead',
          action: 'Draft corrective action and evidence request.',
          tone: 'amber',
        },
        {
          name: 'Supplier defect pattern',
          trigger: 'Three related nonconformance notes',
          stage: 'Classified',
          score: '80',
          owner: 'Supply quality',
          action: 'Compare supplier lots and customer impact.',
          tone: 'blue',
        },
      ],
      intelligenceGaps: [
        'Root-cause evidence is still anecdotal in several closed issues.',
        'Customer exposure is not tied to severity rules early enough.',
        'Corrective-action proof is stored outside the management review.',
      ],
      actionPlan: [
        { phase: 'Day 1', action: 'Define event triggers, severity rules, and ownership paths.' },
        { phase: 'Day 3', action: 'Launch detection, classification, and context packets.' },
        {
          phase: 'Week 2',
          action: 'Connect corrective actions to evidence and deadline tracking.',
        },
        { phase: 'Weekly', action: 'Review repeat patterns and prevention work with leaders.' },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail: 'Detect signals, classify severity, group patterns, and alert owners.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare evidence summaries, root-cause hypotheses, and action packets.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Approve severity, containment, customer communication, and corrective action.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Quality signal',
          detail: 'Claim, inspection, return, complaint, recall, or nonconformance.',
        },
        { label: 'AI machine', detail: 'Detect, classify, group, route, and summarize evidence.' },
        {
          label: 'Team judgment',
          detail: 'Contain, correct, verify, and remove the repeat cause.',
        },
      ],
    },
    visual: {
      poster: '/images/use-cases/quality-exception-intelligence-dashboard.webp',
      mp4: '/videos/use-cases/ai-quality-control-exception-management.mp4',
      webm: '/videos/use-cases/ai-quality-control-exception-management.webm',
      alt: 'Quality exception dashboard showing defect heatmap, containment status, root causes, and repeat issue risk',
    },
    symptoms: [
      'Exceptions are found late, after cost, customer impact, or rework has already grown.',
      'Teams classify and route issues inconsistently.',
      'Root-cause patterns are buried in notes, tickets, inspections, and spreadsheets.',
      'Managers see quality metrics but cannot quickly connect them to specific process failures.',
    ],
    machine: [
      {
        label: 'Trigger layer',
        description:
          'Monitor signals from tickets, recalls, inspections, documents, transactions, sensors, and workflow events.',
      },
      {
        label: 'Classification layer',
        description:
          'Group exceptions by severity, source, customer risk, likely cause, and required next action.',
      },
      {
        label: 'Resolution layer',
        description:
          'Route ownership, prepare context, suggest remediation, and escalate high-risk cases.',
      },
      {
        label: 'Learning layer',
        description:
          'Identify repeated patterns so teams remove causes instead of only resolving symptoms.',
      },
    ],
    plays: [
      {
        title: 'Quality event triage',
        description:
          'Prioritizes issues by business impact, urgency, severity, customer exposure, and downstream risk.',
      },
      {
        title: 'Quality review assistant',
        description:
          'Summarizes evidence, compares against standards, and prepares the next review action.',
      },
      {
        title: 'Root-cause pattern mining',
        description:
          'Finds recurring issue types, locations, teams, products, vendors, or process steps.',
      },
      {
        title: 'Corrective action workflow',
        description:
          'Tracks owners, due dates, evidence, completion, and management review cadence.',
      },
    ],
    metrics: [
      {
        value: 'Earlier',
        label: 'Detection',
        description: 'Move exception discovery closer to the source of the problem.',
      },
      {
        value: 'Faster',
        label: 'Triage',
        description: 'Reduce ambiguity about owner, severity, and next action.',
      },
      {
        value: 'Lower',
        label: 'Repeat failure',
        description: 'Use pattern visibility to remove causes, not just close tickets.',
      },
    ],
    process: [
      {
        phase: 'Week 1',
        title: 'Define quality signals',
        description:
          'Map event triggers, exception types, sources, severity rules, ownership, and downstream business impact.',
      },
      {
        phase: 'Weeks 2-3',
        title: 'Build detection and routing',
        description:
          'Ship classification, prioritization, owner routing, and context packet workflows.',
      },
      {
        phase: 'Weeks 4-6',
        title: 'Install corrective action',
        description:
          'Add root-cause views, action tracking, escalation rules, and management review routines.',
      },
      {
        phase: 'Ongoing',
        title: 'Reduce repeats',
        description:
          'Tune signals, improve standards, and expand from one exception class to the next.',
      },
    ],
    relatedLinks: [
      { label: 'Performance Improvement', href: '/services/performance-improvement' },
      { label: 'Manufacturing & Industrial', href: '/industries/manufacturing' },
      { label: 'Insurance', href: '/industries/insurance' },
    ],
    faqs: [
      {
        question: 'Is this computer vision?',
        answer:
          'Sometimes, but not always. Many high-value quality systems start with tickets, documents, inspections, transactions, or workflow metadata before adding vision.',
      },
      {
        question: 'Can AI make quality decisions by itself?',
        answer:
          'For high-risk workflows, AI should assist detection, classification, context, and routing while humans own final judgment until reliability is proven.',
      },
      {
        question: 'What makes this different from a dashboard?',
        answer:
          'Dashboards show what happened. An exception machine routes the issue, prepares context, tracks action, and helps leaders prevent the repeat.',
      },
    ],
  },
  {
    slug: 'pe-portfolio-ai-value-creation',
    title: 'PE Portfolio AI Value Creation',
    shortTitle: 'PE Value Creation',
    eyebrow: 'Portfolio growth',
    seoTitle: 'AI Value Creation for Private Equity Portfolio Companies',
    metaDescription:
      'Identify repeatable AI value creation plays across PE portfolio companies, then build production systems tied to revenue, margin, speed, and exit narrative.',
    keywords: [
      'AI value creation private equity',
      'PE portfolio AI',
      'AI portfolio company value creation',
      'AI EBITDA improvement',
      'private equity AI consulting',
    ],
    summary:
      'Turn AI from scattered portfolio experiments into a repeatable operating playbook tied to value creation.',
    heroStatement:
      'Find the AI plays that repeat across the portfolio. Build them into measurable operating advantage.',
    outcome:
      'Clearer prioritization, faster execution, reusable playbooks, stronger operating cadence, and a better story for value creation.',
    bestFor:
      'PE firms, operating partners, and portfolio leadership teams that need practical AI initiatives tied to hold-period economics.',
    fieldProof: {
      headline: 'Reusable value creation comes from retuning the same machine.',
      body: 'The same operating pattern can support different business lines: one trigger taxonomy for industrial projects, another for automation demand, another for data-center infrastructure, another for specialty materials. That is the portfolio lesson: build the architecture once, retune it for each company and value lever.',
      bullets: [
        'Screen companies for repeatable revenue, service, operations, reporting, and quality plays.',
        'Build a first implementation that creates templates, taxonomies, prompts, scorecards, and cadence.',
        "Scale by pattern while preserving each company's local workflow, market, and data reality.",
      ],
    },
    operatorView: {
      eyebrow: 'Anonymized Operator View',
      headline: 'What a portfolio AI operating view makes visible.',
      body: 'Operating partners need to see which AI plays are worth funding, where the sponsor and data are ready, how the sprint is performing, and what can be reused across the portfolio.',
      productLabel: 'Portfolio Value Creation Map',
      rhythm: 'Monthly operating partner review',
      kpis: [
        {
          value: '5',
          label: 'Platform plays',
          detail: 'Revenue, service, operations, reporting, and quality patterns.',
        },
        {
          value: '90d',
          label: 'First playbook',
          detail: 'One sprint becomes reusable templates and governance.',
        },
        {
          value: 'KPI',
          label: 'Board trace',
          detail: 'Adoption, cycle time, quality, revenue, and margin tracked.',
        },
      ],
      stages: [
        { label: 'Screened', count: '18', tone: 'slate' },
        { label: 'Ranked', count: '11', tone: 'blue' },
        { label: 'Sponsored', count: '6', tone: 'amber' },
        { label: 'Built', count: '3', tone: 'emerald' },
        { label: 'Scaled', count: '2', tone: 'emerald' },
        { label: 'Blocked', count: '4', tone: 'red' },
      ],
      opportunities: [
        {
          name: 'Revenue intelligence sprint',
          trigger: 'Shared pipeline visibility gap',
          stage: 'Built',
          score: '95',
          owner: 'Operating partner',
          action: 'Package trigger taxonomy for next company.',
          tone: 'emerald',
        },
        {
          name: 'Service triage sprint',
          trigger: 'Backlog and renewal-risk pattern',
          stage: 'Sponsored',
          score: '88',
          owner: 'Portfolio COO',
          action: 'Confirm helpdesk data access and QA rules.',
          tone: 'amber',
        },
        {
          name: 'Margin workflow sprint',
          trigger: 'Manual approval drag across sites',
          stage: 'Ranked',
          score: '83',
          owner: 'Value creation lead',
          action: 'Set baseline cycle-time and cost metrics.',
          tone: 'blue',
        },
      ],
      intelligenceGaps: [
        'Sponsor ownership differs by company and must be confirmed before build.',
        'KPI baselines are inconsistent across similar workflows.',
        'Data access risk needs to be scored before the next sprint wave.',
      ],
      actionPlan: [
        { phase: 'Weeks 1-2', action: 'Screen companies by value, readiness, and repeatability.' },
        { phase: 'Weeks 3-6', action: 'Build the highest-return sprint in one company.' },
        { phase: 'Weeks 7-10', action: 'Codify templates, governance, integrations, and KPIs.' },
        { phase: 'Ongoing', action: 'Scale by pattern and report impact in operating reviews.' },
      ],
      autonomy: [
        {
          label: 'Auto',
          detail: 'Collect portfolio inputs, refresh scorecards, and flag blocked initiatives.',
          tone: 'emerald',
        },
        {
          label: 'AI Draft',
          detail: 'Prepare playbooks, sprint briefs, board updates, and KPI variance notes.',
          tone: 'amber',
        },
        {
          label: 'Human Led',
          detail: 'Prioritize capital, pick sponsors, resolve constraints, and scale the pattern.',
          tone: 'blue',
        },
      ],
      feedbackLoop: [
        {
          label: 'Portfolio signal',
          detail: 'Repeated pain, sponsor pull, KPI gap, or exit narrative lever.',
        },
        {
          label: 'AI machine',
          detail: 'Screen, rank, brief, track, and package reusable playbooks.',
        },
        { label: 'Team judgment', detail: 'Fund, govern, remove blockers, and scale what works.' },
      ],
    },
    visual: {
      poster: '/images/use-cases/pe-portfolio-value-creation-dashboard.webp',
      mp4: '/videos/use-cases/pe-portfolio-ai-value-creation.mp4',
      webm: '/videos/use-cases/pe-portfolio-ai-value-creation.webm',
      alt: 'Private equity portfolio dashboard showing EBITDA pipeline, initiative status, and portfolio company value creation',
    },
    symptoms: [
      'Portfolio companies are experimenting with AI but not scaling measurable systems.',
      'Operating teams lack a common way to prioritize AI by value, risk, and time-to-impact.',
      'Similar revenue, service, and operations problems repeat across companies without reusable playbooks.',
      'AI progress is hard to translate into board updates, KPI movement, or exit narrative.',
    ],
    machine: [
      {
        label: 'Portfolio map',
        description:
          'Assess companies by data readiness, workflow maturity, operating pain, and value creation levers.',
      },
      {
        label: 'Pattern layer',
        description:
          'Define reusable taxonomies, workflows, prompts, scorecards, and operating cadences for revenue, service, operations, reporting, and quality.',
      },
      {
        label: 'Sprint layer',
        description:
          'Ship the highest-value plays inside selected companies with practical governance and measurement.',
      },
      {
        label: 'Board layer',
        description:
          'Track adoption, KPI impact, risk, and next actions in a cadence operating partners can manage.',
      },
    ],
    plays: [
      {
        title: 'Portfolio pattern screen',
        description:
          'Ranks companies and workflows by value, repeatability, implementation complexity, data readiness, and sponsorship.',
      },
      {
        title: 'Revenue and service playbooks',
        description:
          'Reusable systems for pipeline acceleration, service triage, customer risk, and follow-up discipline.',
      },
      {
        title: 'Operations and margin playbooks',
        description:
          'Workflow automation for order handling, approvals, reporting, exception management, and rework reduction.',
      },
      {
        title: 'Board-ready value tracking',
        description:
          'Translates AI initiatives into adoption, cycle time, quality, revenue, cost, and margin measures.',
      },
    ],
    metrics: [
      {
        value: 'Rank',
        label: 'By value and readiness',
        description: 'Prioritize the right company and workflow before spending build effort.',
      },
      {
        value: 'Reuse',
        label: 'Across companies',
        description: 'Turn one successful sprint into a portfolio playbook.',
      },
      {
        value: 'Measure',
        label: 'Operating impact',
        description: 'Tie AI adoption to practical KPIs that matter in the hold period.',
      },
    ],
    process: [
      {
        phase: 'Weeks 1-2',
        title: 'Screen the portfolio',
        description:
          'Assess AI opportunities by value creation lever, workflow maturity, data readiness, and leadership pull.',
      },
      {
        phase: 'Weeks 3-6',
        title: 'Run the first sprint',
        description:
          'Build and deploy the highest-return system inside one portfolio company with measurable targets.',
      },
      {
        phase: 'Weeks 7-10',
        title: 'Codify the playbook',
        description:
          'Package what worked into templates, governance, integrations, and operating routines.',
      },
      {
        phase: 'Ongoing',
        title: 'Scale by pattern',
        description:
          'Apply the playbook to similar portfolio companies and track impact in operating reviews.',
      },
    ],
    relatedLinks: [
      { label: 'PE Value Creation', href: '/services/pe-value-creation' },
      { label: 'Private Equity', href: '/industries/private-equity' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
    faqs: [
      {
        question: 'How do you prioritize across portfolio companies?',
        answer:
          'We rank opportunities by business value, workflow maturity, data availability, integration complexity, leadership sponsorship, and how reusable the play may be across the portfolio.',
      },
      {
        question: 'Does each company need a custom AI strategy?',
        answer:
          'Each company needs local workflow fit, but the best PE approach is pattern-based: build reusable plays and adapt them to the operating context.',
      },
      {
        question: 'How does this support exit prep?',
        answer:
          'The output is not an AI story alone. It is evidence of better operating cadence, speed, quality, customer responsiveness, margin visibility, and adoption.',
      },
    ],
  },
];

export function getUseCaseBySlug(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
