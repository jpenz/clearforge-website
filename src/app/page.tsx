import Link from "next/link";
import { ArrowRight, Bot, Compass, Layers, Puzzle, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deepIndustries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";
import { industryIcons, solutionIcons } from "@/lib/icons";

const proof = [
  "Fortune 1000 manufacturing programs",
  "PE portfolio value creation",
  "Legacy-to-AI modernization initiatives",
];

const frameworkCards = [
  {
    phase: "Prepare",
    text: "Map value pools, define governance, and align leadership decisions.",
    icon: Compass,
  },
  {
    phase: "Modernize",
    text: "Refactor high-friction processes and create AI-ready data pathways.",
    icon: Layers,
  },
  {
    phase: "Build",
    text: "Deploy production AI agents into real workflows with controls.",
    icon: Bot,
  },
  {
    phase: "Scale",
    text: "Expand what works and continuously improve outcomes.",
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
          <span className="section-label">For CEOs, COOs, and PE Operating Teams</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
            Strategy that ships.
            <br />
            <span className="gradient-text">AI that performs.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-text-secondary">
            ClearForge helps companies close the AI value gap with strategy, implementation, and managed operations in one team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/advisor">Get Your AI Recommendation</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {proof.map((item) => (
              <span key={item} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">The AI Value Gap Is Widening</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "Pilots that never scale",
                "Teams run isolated pilots that never become production operations.",
              ],
              [
                "Strategy and execution are split",
                "One partner writes the plan, another partner attempts delivery, and value is lost in handoffs.",
              ],
              [
                "Technology without workforce change",
                "Systems launch, but teams are not prepared to operate with them, so adoption stalls.",
              ],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-xl font-bold text-text-primary">{title}</h3>
                <p className="mt-3 text-base text-text-secondary">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Modernize Work and Workforce in Tandem</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            ClearForge runs a dual-track transformation model: redesign critical workflows for AI while preparing teams to
            operate in a hybrid human-plus-agent model.
          </p>
          <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            {frameworkCards.map((item, index) => (
              <li key={item.phase} className="relative">
                <article className="rounded-xl border border-border bg-white p-6">
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
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Choose Your Point on the AI Journey</h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            Where you are now, what we do next, and what outcomes you should expect.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => {
              const SolutionIcon = solutionIcons[solution.icon];
              return (
                <article key={solution.slug} className="rounded-xl border border-border bg-white p-6">
                  <SolutionIcon className="mb-3 h-8 w-8 text-blue" aria-hidden />
                  <p className="text-xs font-semibold text-blue">{solution.stage}</p>
                  <h3 className="mt-2 text-xl font-bold text-text-primary">{solution.title}</h3>
                  <p className="mt-3 text-base text-text-secondary">{solution.tagline}</p>
                  <Link className="mt-4 inline-flex items-center text-sm font-medium text-blue hover:text-emerald" href={`/solutions/${solution.slug}`}>
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              );
            })}
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
            <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white hover:text-text-primary" asChild>
              <Link href="/scorecard">Take the AI Maturity Scorecard</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white" asChild>
              <Link href="/advisor">Get Your AI Recommendation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
