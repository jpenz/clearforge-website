import Link from "next/link";
import { ArrowRight, Bot, Compass, Layers, Puzzle, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deepIndustries } from "@/data/industries";
import { getSolutionsByStage } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";
import { industryIcons } from "@/lib/icons";

const proof = [
  "Fortune 1000 and upper-mid-market operators",
  "Private equity portfolio value creation",
  "Owner-led and family-run businesses",
  "Strategy, AI delivery, and workforce transformation in one team",
];

const valueGapCards = [
  {
    title: "Pilots that never scale",
    text: "Teams run isolated pilots that never become production operations.",
    icon: Bot,
  },
  {
    title: "Strategy and execution are split",
    text: "One partner writes the plan, another partner attempts delivery, and value is lost in handoffs.",
    icon: Layers,
  },
  {
    title: "Technology without workforce change",
    text: "Systems launch, but teams are not prepared to operate with them, so adoption stalls.",
    icon: Users,
  },
];

const frameworkCards = [
  {
    phase: "Prepare",
    text: "Set priorities, define ownership, and baseline the metrics that matter.",
    icon: Compass,
  },
  {
    phase: "Modernize",
    text: "Redesign high-friction workflows and clean up data and handoffs.",
    icon: Layers,
  },
  {
    phase: "Build",
    text: "Deploy production AI agents into daily work with controls and governance.",
    icon: Bot,
  },
  {
    phase: "Scale",
    text: "Expand what works, train teams, and continuously improve outcomes.",
    icon: TrendingUp,
  },
];

const peopleCapabilityTrack = [
  "Role-based AI skills training for leadership, managers, and frontline teams",
  "Human-plus-agent operating playbooks so adoption sticks",
  "Manager coaching and governance rhythm to reinforce behavior change",
];

const serviceEngines = [
  {
    title: "Growth Strategy Engine",
    text: "Use market intelligence and a business strategy agent to identify where to grow, where to defend, and where to win first.",
    points: [
      "Map industry tailwinds and customer demand pockets",
      "Prioritize core and target markets for profitable expansion",
      "Translate strategy into a practical 12-month growth plan",
    ],
    icon: Compass,
  },
  {
    title: "Performance Improvement Engine",
    text: "Use AI agents and workflow redesign to increase capacity, reduce friction, and run the organization more efficiently.",
    points: [
      "Find bottlenecks across revenue, operations, and support",
      "Deploy human-plus-agent workflows with clear controls",
      "Build internal capability so improvements compound over time",
    ],
    icon: Bot,
  },
];

const transformationJourney = [
  {
    stage: "UNDERSTAND" as const,
    title: "Find the value and name the real bottleneck",
    text: "We define growth goals, capture the pain in your language, and quantify where value is leaking.",
    outcome: "Decision-ready strategy, not generic AI advice.",
    icon: Compass,
  },
  {
    stage: "BUILD" as const,
    title: "Redesign workflows and build controlled AI systems",
    text: "We review what was already tried, identify what failed, and build practical AI workflows with your operators.",
    outcome: "Working systems with owners, controls, and KPI baselines.",
    icon: Layers,
  },
  {
    stage: "OPERATE" as const,
    title: "Run, optimize, and reinforce adoption",
    text: "We turn early wins into operating rhythm, handle adoption concerns with proof, and reinforce execution discipline.",
    outcome: "Compounding gains in throughput, margin, and leadership confidence.",
    icon: TrendingUp,
  },
];

const differentiators = [
  {
    title: "One team from strategy to execution",
    text: "No split accountability between advisory and implementation vendors.",
    icon: Users,
  },
  {
    title: "Senior operators",
    text: "Direct access to experienced consultants and builders, not a junior leverage model.",
    icon: Shield,
  },
  {
    title: "Agents, not decks",
    text: "We deploy operating systems and agent workflows that run in the real business.",
    icon: Zap,
  },
  {
    title: "Process and people together",
    text: "Technology deployment and workforce adoption are delivered as one program.",
    icon: Puzzle,
  },
];

const industryTileDescriptions: Record<string, string> = {
  manufacturing: "Throughput, planning, and execution modernization.",
  "professional-services": "Higher billable capacity with faster delivery.",
  "financial-services": "Controlled speed gains across risk and operations.",
  "pe-portfolio": "Repeatable AI plays across portfolio companies.",
};

export default function Home() {
  const featuredCaseStudies = caseStudies.filter((item) => item.featured).slice(0, 2);

  return (
    <>
      <section className="grid-pattern bg-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">For owner-led companies, CEOs, COOs, and PE operating teams</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
            Strategy that ships.
            <br />
            <span className="gradient-text">AI that performs.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-text-secondary">
            Whether you are a PE operator, a Fortune 1000 leader, or a long-time owner running one company, we help you close the AI value gap with one accountable team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/assessment">Start AI Assessment</Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <a href="mailto:james@clearforge.ai" className="font-medium text-blue hover:text-emerald">
              Email james@clearforge.ai
            </a>
            <Link href="/contact" className="font-medium text-text-secondary hover:text-text-primary">
              Prefer a call? Send your details and we will reach out.
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {proof.map((item) => (
              <span key={item} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-bold text-text-primary">Built for operators who need results, not another AI slide deck.</h2>
            <p className="mt-3 max-w-3xl text-base text-text-secondary">
              If you know demand exists but your team does not have the capacity to capture it, we can help. We set the strategy, ship the systems, and train people to run a human-plus-agent operating model.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/assessment">Run the AI Readiness & Opportunity Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">The AI Value Gap Is Widening</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            Most companies do not fail because of AI tools. They fail because execution ownership is fragmented.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {valueGapCards.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-white p-6">
                <item.icon className="mb-4 h-9 w-9 text-blue" aria-hidden />
                <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-base text-text-secondary">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-sm font-medium text-blue">
            Problem pattern to value leakage to slower growth
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">How We Close the Gap</span>
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Modernize Work and Workforce in Tandem</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            We redesign workflows and upgrade workforce capability at the same time. This is how companies move from pilots to reliable business outcomes.
          </p>
          <p className="mt-3 max-w-3xl text-base text-text-tertiary">
            We do not automate broken processes. We simplify workflow debt first, then layer AI and feedback loops so performance keeps improving.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {frameworkCards.map((item, index) => (
              <li key={item.phase} className="relative h-full">
                <article className="h-full rounded-xl border border-border bg-white p-6">
                  <item.icon className="h-10 w-10 text-blue" aria-hidden />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue">{item.phase}</p>
                  <p className="mt-2 text-base text-text-secondary">{item.text}</p>
                </article>
                {index < frameworkCards.length - 1 && (
                  <ArrowRight className="absolute left-full top-1/2 ml-1 hidden h-4 w-4 -translate-y-1/2 text-blue md:block" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-xl border border-emerald/20 bg-emerald/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">People Capability Track (Runs Through Every Phase)</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {peopleCapabilityTrack.map((item) => (
                <div key={item} className="rounded-lg border border-emerald/25 bg-white/70 p-4 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">How We Transform Your Company, Step by Step</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            Two coordinated engines run in parallel: one to find where to grow, one to improve how the company performs.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {serviceEngines.map((engine) => (
              <article key={engine.title} className="rounded-xl border border-border bg-white p-6">
                <engine.icon className="h-9 w-9 text-blue" aria-hidden />
                <h3 className="mt-3 text-2xl font-bold text-text-primary">{engine.title}</h3>
                <p className="mt-3 text-base text-text-secondary">{engine.text}</p>
                <ul className="mt-4 space-y-2">
                  {engine.points.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-lg text-text-secondary">
            From there, we execute in a linear operating sequence tied to business outcomes.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {transformationJourney.map((step, index) => (
              <article key={step.stage} className="relative rounded-xl border border-border bg-white p-6">
                <step.icon className="mb-4 h-9 w-9 text-blue" aria-hidden />
                <p className="text-xs font-semibold text-blue">{step.stage}</p>
                <h3 className="mt-3 text-xl font-bold text-text-primary">{step.title}</h3>
                <p className="mt-3 text-base text-text-secondary">{step.text}</p>
                <p className="mt-3 text-sm font-medium text-blue">{step.outcome}</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-tertiary">Relevant solutions</p>
                  <ul className="mt-2 space-y-1">
                    {getSolutionsByStage(step.stage).map((solution) => (
                      <li key={solution.slug}>
                        <Link href={`/solutions/${solution.slug}`} className="text-sm text-text-secondary hover:text-blue">
                          {solution.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < transformationJourney.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-blue lg:block" />
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-white p-6">
            <h3 className="text-xl font-bold text-text-primary">One partner for the full transformation.</h3>
            <p className="mt-3 text-base text-text-secondary">
              We cover strategy, AI delivery, and workforce transformation in one integrated program so leaders can move faster without losing control.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact">Talk with ClearForge</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Case Studies That Prove the Model</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredCaseStudies.map((study) => (
              <article key={study.slug} className="rounded-xl border border-border bg-white p-6">
                <p className="text-sm text-text-tertiary">{study.industry}</p>
                <h3 className="mt-2 text-xl font-bold text-text-primary">{study.title}</h3>
                <p className="mt-3 text-base text-text-secondary">{study.excerpt}</p>
                <p className="mt-4 text-sm text-blue">
                  {study.heroMetric} {study.heroMetricLabel}
                </p>
                <Link className="mt-3 inline-flex items-center text-sm font-medium text-blue hover:text-emerald" href={`/case-studies/${study.slug}`}>
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Industry Depth Where It Matters Most</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            Focused execution playbooks for the operating environments where we go deepest.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deepIndustries.map((industry) => {
              const IndustryIcon = industryIcons[industry.icon];
              return (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-xl border border-border bg-white p-5">
                  <IndustryIcon className="mb-3 h-8 w-8 text-blue" aria-hidden />
                  <h3 className="text-lg font-bold text-text-primary">{industry.shortName}</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {industryTileDescriptions[industry.slug] ?? industry.hero}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Why ClearForge</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-white p-6">
                <item.icon className="mb-4 h-10 w-10 text-blue" aria-hidden />
                <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-base text-text-secondary">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Move from AI ambition to measurable execution.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">
            Choose the path that fits your context today and build from there.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white" asChild>
              <Link href="/assessment">Start AI Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
