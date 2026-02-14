export type InsightCategory =
  | "AI Strategy"
  | "Performance Improvement"
  | "PE Value Creation"
  | "AI Agents";

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  relatedSlugs: string[];
}

export const insights: Insight[] = [
  {
    slug: "ai-readiness-ceo-guide",
    title: "The CEO's Guide to AI Readiness: What Actually Matters",
    excerpt:
      "Most AI readiness frameworks are built by vendors trying to sell you something. Here's what actually determines whether your company can capture value from AI — and what to do about it.",
    category: "AI Strategy",
    date: "2025-01-15",
    readingTime: 8,
    author: {
      name: "ClearForge Team",
      role: "AI Performance Consulting",
    },
    content: [
      "Every CEO is getting pitched on AI right now. Vendors promise transformative results. Boards are asking about your AI strategy. Competitors are making announcements. The pressure to act is real — but the pressure to act *intelligently* is what separates companies that capture value from those that waste budget.",
      "After working with dozens of mid-market companies on AI implementation, we've identified five pillars that actually determine AI readiness. Not the ones on vendor checklists — the ones that predict whether an initiative will succeed or stall.",
      "## Data Maturity: The Foundation Everything Rests On",
      "The single biggest predictor of AI success isn't your tech stack or your budget — it's your data. Specifically: Is your key business data centralized, trustworthy, and accessible?",
      "Most mid-market companies we assess score poorly here, and it's not because they haven't invested in technology. It's because data is scattered across spreadsheets, legacy systems, and individual employees' heads. When we ask 'Can you pull your top 50 accounts by revenue, with their last touchpoint date and current pipeline value?' and the answer takes a week, that tells us everything.",
      "The fix isn't always a massive data warehouse project. Sometimes it's as simple as enforcing CRM hygiene, connecting two systems via API, or designating a data owner for key metrics. Start with the data that matters most to your highest-value processes.",
      "## Team Capability: People Beat Technology Every Time",
      "AI tools are useless without people who can use them. But 'team capability' doesn't mean everyone needs to become a data scientist. It means three things: leadership understands what AI can and cannot do, the team is open to changing workflows, and someone is championing the initiative internally.",
      "The companies that succeed with AI almost always have an internal champion — someone who understands both the business problem and the technology well enough to bridge the gap. This person doesn't need a PhD. They need credibility with the team and enough technical curiosity to separate real possibilities from vendor hype.",
      "If you don't have this person, your first AI hire should be someone who can play this role, not another engineer.",
      "## Process Documentation: You Can't Automate What You Don't Understand",
      "Here's a pattern we see constantly: a company wants to 'use AI to improve operations' but can't describe their current operations in enough detail to identify what to improve. They know things are inefficient. They can feel the operational drag. But nobody has mapped the actual workflow from trigger to completion.",
      "Process documentation doesn't need to be exhaustive. Start with your five highest-volume or most error-prone workflows. Map each one: Who does what, when, using which tools, with what handoffs? Where do things get stuck? Where do errors happen? This exercise alone — before any AI — often reveals quick wins that deliver immediate value.",
      "## Tech Infrastructure: Modern Enough to Connect",
      "You don't need cutting-edge technology to benefit from AI. You need technology that can talk to other technology. If your core systems have APIs, if you're at least partially cloud-based, and if your cybersecurity basics are covered, you have enough infrastructure to start.",
      "The most common infrastructure gap we see isn't outdated software — it's systems that can't share data. An ERP that doesn't integrate with your CRM. A project management tool that lives in isolation. AI creates value by connecting information across systems, so the ability to integrate is more important than the age of any individual system.",
      "## Budget Alignment: Realistic Expectations, Strategic Priority",
      "The companies that succeed with AI treat it as a strategic investment with measurable ROI, not a science experiment. They allocate real budget, expect returns within 6-18 months, and have leadership buy-in for the initiative.",
      "This doesn't mean massive upfront investment. Our most successful engagements start with a focused assessment ($15K, 2 weeks) that identifies specific, high-ROI opportunities. From there, a performance sprint ($50K-$100K) tackles the top opportunities and delivers working solutions within 6-8 weeks. The ROI from the sprint typically funds ongoing development.",
      "## What To Do Next",
      "If you're a CEO evaluating AI readiness, skip the generic assessments and focus on these five pillars. Score yourself honestly. Where are the gaps? Which gaps are blocking specific business outcomes you care about?",
      "Our AI Readiness Scorecard walks you through 18 questions across these five pillars and gives you a personalized readiness score with specific recommendations. It takes 5 minutes and the results are immediate.",
      "The goal isn't to be 'AI ready' in some abstract sense. The goal is to be ready to capture specific, measurable value from AI in your highest-impact areas. That's a much more actionable target.",
    ],
    relatedSlugs: [
      "why-95-percent-ai-pilots-fail",
      "hidden-cost-manual-processes",
    ],
  },
  {
    slug: "why-95-percent-ai-pilots-fail",
    title: "Why 95% of AI Pilots Fail (And How to Be in the 5%)",
    excerpt:
      "The AI pilot graveyard is full of technically successful projects that never made it to production. The problem isn't the technology — it's how companies approach the pilot itself.",
    category: "AI Strategy",
    date: "2025-01-08",
    readingTime: 7,
    author: {
      name: "ClearForge Team",
      role: "AI Performance Consulting",
    },
    content: [
      "There's a statistic that gets thrown around in every AI conference: 87% of AI projects never make it to production. Some estimates are even higher. The number matters less than the pattern behind it — and the pattern is remarkably consistent.",
      "After building and deploying AI solutions across manufacturing, professional services, private equity, and B2B software, we've seen why pilots fail. It's rarely the technology. It's almost always one of five organizational failure modes.",
      "## Failure Mode 1: The Solution Looking for a Problem",
      "The most common failure pattern starts with technology fascination rather than business need. Someone sees a demo, reads an article, or gets pitched by a vendor, and the initiative begins with 'We should use AI for...' instead of 'Our biggest operational challenge is...'",
      "Companies in the 5% start with a specific, measurable business problem. Not 'improve efficiency' — something like 'reduce invoice processing time from 3 days to same-day' or 'increase qualified lead response rate from 40% to 80%.' The specificity forces clarity about what success looks like and makes it obvious whether the pilot worked.",
      "## Failure Mode 2: No Executive Sponsor with Skin in the Game",
      "AI pilots that live in IT or innovation labs rarely survive contact with the business. They need an executive sponsor who owns a P&L, cares about the outcome, and will fight for resources when things get hard.",
      "The best sponsors aren't just cheerleaders. They're operators who have a business problem they need solved and see AI as the means, not the end. They'll make their team available for interviews, clear blockers, and hold everyone (including the AI team) accountable for results.",
      "## Failure Mode 3: Perfect Data Syndrome",
      "Many pilots stall because teams try to clean and perfect their data before starting. This feels responsible but is actually counterproductive. You'll never have perfect data, and you don't need it.",
      "What you need is data that's good enough for your specific use case. An AI model that predicts customer churn doesn't need every field in your CRM to be pristine — it needs the fields that actually correlate with churn behavior to be reasonably accurate. Start with what you have, identify the specific data gaps that matter, and fix those. Don't boil the ocean.",
      "## Failure Mode 4: Building a Cathedral When You Need a Cabin",
      "Enterprise AI architecture diagrams are beautiful. They're also the reason most projects never ship. The 5% don't start with a platform or a framework — they start with a working prototype that solves one problem for one team.",
      "Our 90-day sprint model exists because of this pattern. We pick the single highest-impact opportunity, build a working solution, prove the ROI, and then expand. The first solution is intentionally scrappy. It doesn't need to be enterprise-grade — it needs to work well enough that the business team can't imagine going back to the old way.",
      "## Failure Mode 5: No Change Management",
      "The most technically brilliant AI solution is worthless if nobody uses it. Change management isn't a nice-to-have — it's the difference between a successful deployment and an expensive experiment.",
      "This means training the team that will use the solution, adjusting workflows to incorporate AI outputs, setting up feedback loops so the model improves over time, and having a clear plan for when the AI gets it wrong (because it will). The 5% budget time and effort for adoption, not just development.",
      "## The 5% Playbook",
      "Companies that succeed with AI share a pattern: they start with a business problem, get executive sponsorship, work with imperfect data, build small and iterate, and invest in change management. None of this is revolutionary. It's basic operational discipline applied to a new technology.",
      "The irony is that the companies best positioned for AI success are often the ones least excited about AI itself. They're excited about solving their sales pipeline problem, their operational bottleneck, or their customer service gap. AI is just the tool that gets them there.",
      "If you're planning an AI pilot, stress-test it against these five failure modes. If you can't clearly articulate the business problem, name the executive sponsor, identify the minimum viable data, describe the smallest useful first version, and outline the adoption plan — you're not ready to start building. You're ready to start planning.",
    ],
    relatedSlugs: [
      "ai-readiness-ceo-guide",
      "pe-value-creation-with-ai",
    ],
  },
  {
    slug: "pe-value-creation-with-ai",
    title: "PE Value Creation with AI: A Practical Playbook",
    excerpt:
      "Private equity firms are sitting on a massive AI opportunity across their portfolios. Here's the playbook for identifying, prioritizing, and executing AI value creation at scale.",
    category: "PE Value Creation",
    date: "2024-12-18",
    readingTime: 9,
    author: {
      name: "ClearForge Team",
      role: "AI Performance Consulting",
    },
    content: [
      "Private equity firms have a unique advantage in the AI era: they control multiple companies, can deploy proven playbooks across portfolios, and have the financial discipline to demand measurable ROI. Yet most PE firms are still treating AI as a company-by-company science experiment rather than a systematic value creation lever.",
      "Here's the playbook we've developed after working with PE firms to deploy AI across their portfolios.",
      "## Why PE Firms Should Care About AI Right Now",
      "The math is straightforward. A mid-market PE portfolio company with $20M-$100M in revenue typically has 15-25% of operational costs tied up in manual, repetitive processes. AI-driven automation of even a fraction of these processes can drive meaningful EBITDA improvement — often 5-15% — within the hold period.",
      "More importantly, companies with demonstrated AI capabilities command higher multiples at exit. Buyers are paying premiums for businesses with embedded operational intelligence, automated workflows, and data-driven decision-making. AI value creation isn't just about cost savings — it's about building a more valuable asset.",
      "## The Portfolio Assessment Approach",
      "Don't start with one company. Start with a rapid assessment across the portfolio to identify where AI can create the most value. We typically assess 3-5 portfolio companies in parallel using a standardized framework that evaluates data maturity, process automation potential, team readiness, and expected ROI.",
      "This portfolio-level view reveals patterns that company-by-company analysis misses. Maybe three companies share similar CRM challenges. Maybe the logistics company's routing optimization model could inform the manufacturer's supply chain. Portfolio-level thinking creates portfolio-level returns.",
      "## The 90-Day Sprint Model",
      "Once you've identified the top opportunities, execute in 90-day sprints. Each sprint follows a disciplined structure: 2 weeks of diagnosis, 2 weeks of design, 4 weeks of build, and 2 weeks of optimization. The sprint ends with a working solution deployed in production, not a proof of concept sitting in a lab.",
      "The 90-day timeframe is deliberate. It's long enough to build something real and short enough to maintain urgency. PE firms think in quarters. So should their AI initiatives.",
      "We tie every sprint to a specific KPI that maps to EBITDA impact. If we can't draw a clear line from the AI solution to a financial metric the PE firm cares about, we don't build it.",
      "## Common High-Impact Opportunities",
      "Across dozens of portfolio assessments, certain opportunities appear repeatedly. Revenue operations — AI-powered prospecting, lead scoring, and sales automation — almost always delivers quick wins. Process automation — invoice processing, reporting, data entry — offers reliable cost savings. Customer experience — intelligent routing, automated responses, predictive service — improves retention and satisfaction scores.",
      "The specific opportunity depends on the company, but the pattern is consistent: start with the highest-volume, most manual process that directly impacts revenue or cost. Don't start with the most technically interesting problem. Start with the most financially impactful one.",
      "## Building vs. Buying",
      "PE firms often ask whether to build custom AI solutions or buy off-the-shelf tools. The answer is almost always both. Use off-the-shelf tools for commoditized capabilities (email automation, basic chatbots, standard analytics) and build custom solutions for processes that are unique to the business or the industry.",
      "The competitive advantage comes from custom solutions built on proprietary data. A manufacturer's quality inspection model trained on their specific products, a services firm's client matching algorithm based on their engagement history, a logistics company's routing optimization using their network data — these create defensible value that buyers will pay premiums for.",
      "## Measuring and Communicating Value",
      "Every AI initiative should have a clear value attribution model. How much cost did it save? How much revenue did it enable? What's the improvement in the target KPI? Document everything with before-and-after data.",
      "This discipline serves two purposes: it ensures you're actually creating value (not just deploying technology), and it creates the evidence base you'll need when it's time to tell the value creation story to prospective buyers. The best exit narratives aren't about AI technology — they're about business performance improvement with AI as the enabler.",
      "## Getting Started",
      "If you're a PE firm exploring AI value creation, start with a portfolio assessment. Identify your top 3-5 opportunities across companies, prioritize by expected ROI and implementation complexity, and execute one sprint to prove the model. The results from the first sprint will tell you everything you need to know about the opportunity ahead.",
      "The firms that move first will have a meaningful advantage. Not because AI is a winner-take-all technology, but because operational AI compounds over time — models improve, processes get more efficient, and the gap between AI-native companies and laggards widens with every quarter.",
    ],
    relatedSlugs: [
      "why-95-percent-ai-pilots-fail",
      "ai-agents-explained",
    ],
  },
  {
    slug: "hidden-cost-manual-processes",
    title: "The Hidden Cost of Manual Processes: What Your P&L Isn't Showing You",
    excerpt:
      "Manual processes don't show up as a line item on your P&L. But they're costing you more than you think — in time, errors, employee frustration, and missed opportunities.",
    category: "Performance Improvement",
    date: "2024-12-04",
    readingTime: 6,
    author: {
      name: "ClearForge Team",
      role: "AI Performance Consulting",
    },
    content: [
      "Here's an exercise we run with every new client: Pick your most important business process. Now estimate how many people touch it, how many hours per week it consumes, and what percentage of that time is spent on manual, repetitive tasks. The answers consistently surprise leadership teams.",
      "A $30M services company recently discovered that their client onboarding process — which they thought took 2 days — actually consumed 47 hours of staff time across 6 people when you mapped every step, handoff, and rework cycle. That's not visible on any P&L line item. It's distributed across salaries, hidden in 'overhead,' and accepted as 'just how things work.'",
      "## The Three Hidden Costs",
      "Manual processes cost you in three ways that financial statements obscure.",
      "**Direct labor costs** are the most obvious but least well-measured. When a $75K/year analyst spends 15 hours a week on data entry and report formatting, that's $28K in annual labor cost on tasks a system could handle. Multiply that across a team, and you're looking at six-figure waste that's invisible because it's bundled into salaries.",
      "**Error costs** are harder to quantify but often larger. Manual data entry has a typical error rate of 1-3%. In billing, that means revenue leakage. In reporting, it means bad decisions based on bad data. In compliance, it means risk exposure. One client discovered they were writing off $180K annually in billing corrections — all traceable to manual entry errors in three key workflows.",
      "**Opportunity costs** are the largest and most ignored. Every hour your team spends on manual work is an hour they're not spending on strategy, client relationships, or growth initiatives. A sales team that spends 60% of its time on admin instead of selling isn't a sales team — it's a data entry team with a sales quota.",
      "## Process Mining: Making the Invisible Visible",
      "The fix starts with visibility. Process mining maps your actual workflows — not how you think they work, but how they actually work. Where do handoffs happen? Where do things get stuck? Where is the same data entered into multiple systems? Where do errors propagate?",
      "We typically map the top 5-10 processes by volume and impact. For each one, we quantify the current cost (time, errors, delays), identify automation opportunities, and estimate the ROI of fixing them. This gives leadership a prioritized list of improvements ranked by financial impact and implementation complexity.",
      "## The Quick Win Pattern",
      "Not every process needs AI. Many of the highest-ROI improvements are straightforward automations: connecting two systems that currently require manual data transfer, auto-generating reports that someone currently builds in Excel, routing approvals that currently happen via email chains.",
      "We call these 'quick wins' — improvements that can be built and deployed in 2-4 weeks with immediate, measurable impact. They build organizational confidence in automation, free up team capacity for larger initiatives, and often generate enough savings to fund the next phase of improvement.",
      "## The Compound Effect",
      "Process improvement compounds. When you automate invoice reconciliation, you don't just save 10 hours a week — you eliminate the downstream errors, reduce the month-end close cycle, free up the finance team for analysis, and improve the accuracy of your financial reporting. The second-order effects often exceed the direct savings.",
      "This is why we advocate for systematic process improvement rather than one-off fixes. Each improvement creates capacity and data quality improvements that make the next improvement easier and more impactful.",
      "## What To Do Monday Morning",
      "You don't need a consultant to start this work. Pick your single most painful process — the one your team complains about most. Map it end to end on a whiteboard: every step, every handoff, every system, every manual input. Time each step. Count the errors from last month. Calculate the cost.",
      "That exercise alone will reveal opportunities you didn't know existed. And it will give you the data you need to make a business case for improvement — whether you do it internally or bring in help.",
      "For companies that want a structured assessment, our Performance Sprint starts with exactly this kind of process mining across your organization, identifies the top opportunities, and delivers working solutions within 6-8 weeks. The typical ROI is 3-5x the investment within the first year.",
    ],
    relatedSlugs: [
      "ai-readiness-ceo-guide",
      "ai-agents-explained",
    ],
  },
  {
    slug: "ai-agents-explained",
    title: "AI Agents Explained: What They Are, What They're Not, and When You Need One",
    excerpt:
      "AI agents are the most over-hyped and under-understood technology in business right now. Here's a practical guide to what they actually do, when they make sense, and how to evaluate if your business needs one.",
    category: "AI Agents",
    date: "2024-11-20",
    readingTime: 7,
    author: {
      name: "ClearForge Team",
      role: "AI Performance Consulting",
    },
    content: [
      "If you've been following AI news, you've heard about agents. AI agents that sell, AI agents that code, AI agents that manage your entire business while you sleep. The hype is intense, the demos are impressive, and the reality is more nuanced than either the enthusiasts or the skeptics suggest.",
      "Here's what you actually need to know.",
      "## What AI Agents Actually Are",
      "An AI agent is software that can take autonomous actions to accomplish a goal. Unlike a chatbot that responds to questions, an agent can execute multi-step workflows: researching prospects, drafting personalized outreach, scheduling meetings, updating your CRM — without human intervention at each step.",
      "The key distinction is autonomy. A traditional automation follows rigid rules: if X, then Y. An agent can handle ambiguity, make judgment calls, and adapt its approach based on context. When a prospect asks an unexpected question, a rule-based chatbot fails. An AI agent understands the question, finds the relevant information, and responds appropriately.",
      "## What They're Not",
      "AI agents are not magic. They don't understand your business intuitively. They don't replace human judgment on complex decisions. And they're not plug-and-play — they need to be configured, trained on your data, integrated with your systems, and monitored for quality.",
      "The demos you see at conferences show agents operating in controlled environments with clean data and well-defined workflows. Real-world deployment is messier. Your data has gaps. Your processes have edge cases. Your customers ask questions that nobody anticipated. A well-built agent handles these gracefully. A poorly built one creates problems faster than a human could.",
      "## The Four Types That Actually Work",
      "Based on our deployment experience, four types of AI agents consistently deliver ROI for mid-market companies.",
      "**Sales Development Agents** handle top-of-funnel prospect engagement: initial outreach, qualification conversations, meeting scheduling, and CRM updates. They work 24/7, respond in minutes instead of hours, and consistently execute your qualification criteria. We've seen these deliver 2-4x improvements in qualified meeting volume.",
      "**Operations Agents** automate repetitive operational workflows: invoice processing, report generation, data reconciliation, approval routing. These are the workhorses — not glamorous, but they reliably save thousands of hours and eliminate errors in high-volume processes.",
      "**Customer Success Agents** handle proactive customer engagement: check-in scheduling, usage monitoring, churn risk identification, and expansion opportunity flagging. They ensure no customer falls through the cracks and free your CS team to focus on high-touch relationships.",
      "**Finance Agents** automate financial operations: expense categorization, variance analysis, cash flow forecasting, and compliance monitoring. These are particularly valuable for PE portfolio companies where financial reporting accuracy and speed directly impact valuation.",
      "## When You Need One (And When You Don't)",
      "You need an AI agent when you have a high-volume, repeatable process where speed and consistency matter, where human judgment is needed for edge cases but not for the core workflow, and where the cost of the current approach (labor, errors, delays) justifies the investment.",
      "You don't need an AI agent when the process is low-volume (just hire someone), when the process is so complex that it requires human judgment at every step (an agent would just be a slower human), or when your underlying data and systems aren't ready (fix the foundation first).",
      "## How to Evaluate Agent Vendors",
      "The agent market is crowded and confusing. Here's how to evaluate options: Ask about their training process — how do they learn your specific business context? Ask about error handling — what happens when the agent encounters something unexpected? Ask about integration — can it connect with your existing systems? Ask about measurement — how do you track ROI?",
      "Be wary of vendors who promise full autonomy on day one, who can't explain their error handling, or who don't have experience in your industry. The best agent solutions are built on deep domain expertise, not just good AI models.",
      "## Building Custom vs. Off-the-Shelf",
      "Off-the-shelf agents work well for generic use cases: basic email automation, standard chatbot interactions, simple scheduling. Custom agents are worth the investment when your workflow is unique, when you need integration with proprietary systems, or when the competitive advantage comes from doing things differently than everyone else.",
      "Our approach is to start with the business outcome and work backward to the right solution. Sometimes that's a custom agent. Sometimes it's an off-the-shelf tool with custom configuration. Sometimes it's a hybrid. The technology should serve the business need, not the other way around.",
      "## Getting Started",
      "If you're considering AI agents, start by identifying your highest-volume repetitive process. Calculate its current cost (labor, errors, delays, opportunity cost). Then evaluate whether an agent could handle 70-80% of that workflow autonomously, with humans managing the exceptions.",
      "If the math works, the next step is a focused pilot — one agent, one process, 90 days, clear KPIs. That's how you separate the real opportunity from the hype.",
    ],
    relatedSlugs: [
      "hidden-cost-manual-processes",
      "pe-value-creation-with-ai",
    ],
  },
];

export const insightCategories: InsightCategory[] = [
  "AI Strategy",
  "Performance Improvement",
  "PE Value Creation",
  "AI Agents",
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getInsightsByCategory(category: InsightCategory): Insight[] {
  return insights.filter((i) => i.category === category);
}

export function getRelatedInsights(slugs: string[]): Insight[] {
  return insights.filter((i) => slugs.includes(i.slug));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
