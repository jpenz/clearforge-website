import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Compass,
  Layers,
  Puzzle,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinePattern } from "@/components/ui/line-pattern";
import { createMetadata } from "@/lib/metadata";
import { deepIndustries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";
import { industryIcons, solutionIcons } from "@/lib/icons";

export const metadata = createMetadata({
  title: "AI Strategy That Actually Ships | ClearForge",
  description:
    "ClearForge helps companies close the AI value gap with strategy, implementation, and managed operations in one team.",
  path: "",
  keywords: ["AI value gap", "AI strategy and execution", "AI consulting"],
});

const proof = ["Fortune 1000 manufacturing programs", "PE portfolio value creation", "Legacy-to-AI modernization initiatives"];

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
  const featuredCaseStudies = caseStudies.slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-navy py-28 lg:py-36 section-clip-bottom">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.15),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.12),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">AI Strategy That Actually Ships</h1>
          <p className="mt-6 max-w-3xl text-xl text-slate-200">
            Most companies know AI should be driving more value. The gap is not technology. The gap is knowing where to focus and having a team that can execute.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/solutions">See Our Solutions</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
              <Link href="/advisor">Get Your AI Recommendation</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {proof.map((item) => (
              <span key={item} className="rounded-full glass-pill px-4 py-2 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-14 overflow-hidden bg-slate-navy">
        <LinePattern className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2" />
      </div>

      <section className="bg-slate-navy py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>The AI Value Gap Is Widening</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Pilots that never scale", "Teams run isolated pilots that never become production operations."],
              ["Strategy and execution are split", "One partner writes the plan, another partner attempts delivery, and value is lost in handoffs."],
              ["Technology without workforce change", "Systems launch, but teams are not prepared to operate with them, so adoption stalls."],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-xl glass-dark glass-dark-hover p-6">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-base text-slate-200">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Modernize Work and Workforce in Tandem</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            ClearForge runs a dual-track transformation model: redesign critical workflows for AI while preparing teams to operate in a hybrid human-plus-agent model.
          </p>
          <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            {frameworkCards.map((item, index) => (
              <li key={item.phase} className="relative">
                <article className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                  <item.icon className="h-12 w-12 text-teal" aria-hidden />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal">{item.phase}</p>
                  <p className="mt-2 text-base text-slate-700">{item.text}</p>
                </article>
                {index < frameworkCards.length - 1 && (
                  <>
                    <div className="absolute left-6 top-full h-8 w-px bg-teal/40 md:hidden" />
                    <div className="absolute left-full top-1/2 hidden h-px w-5 -translate-y-1/2 bg-teal/40 md:block" />
                    <ArrowRight className="absolute left-full top-1/2 ml-5 hidden h-4 w-4 -translate-y-1/2 text-teal md:block" />
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Choose your point on the AI journey</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">Where are you now, what we do next, and what outcomes you should expect.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => {
              const SolutionIcon = solutionIcons[solution.icon];
              return (
                <article key={solution.slug} className="rounded-xl border border-gray-200 border-l-4 border-l-teal bg-white p-6">
                  <SolutionIcon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                  <p className="text-xs font-semibold text-teal">{solution.stage}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-navy">{solution.title}</h3>
                  <p className="mt-3 text-base text-slate-600">{solution.tagline}</p>
                  <Link className="mt-4 inline-flex items-center text-sm font-medium text-teal" href={`/solutions/${solution.slug}`}>
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Case studies that prove the model</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredCaseStudies.map((study) => (
              <article key={study.slug} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-sm text-slate-500">{study.industry}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-navy">{study.title}</h3>
                <p className="mt-3 text-base text-slate-600">{study.excerpt}</p>
                <p className="mt-4 text-sm text-teal">{study.heroMetric} {study.heroMetricLabel}</p>
                <Link className="mt-3 inline-flex items-center text-sm font-medium text-teal" href={`/case-studies/${study.slug}`}>
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Industry depth where it matters most</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">Focused execution playbooks for the operating environments where we go deepest.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deepIndustries.map((industry) => {
              const IndustryIcon = industryIcons[industry.icon];
              return (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <IndustryIcon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                  <h3 className="text-lg font-bold text-slate-navy">{industry.shortName}</h3>
                  <p className="mt-2 truncate text-sm text-slate-600">{industryTileDescriptions[industry.slug] ?? industry.hero}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Why ClearForge</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <item.icon className="mb-4 h-12 w-12 text-teal" aria-hidden />
                <h3 className="text-lg font-bold text-slate-navy">{item.title}</h3>
                <p className="mt-2 text-base text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-14 overflow-hidden bg-slate-navy">
        <LinePattern className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2" />
      </div>

      <section className="relative overflow-hidden bg-slate-navy py-28 lg:py-36 grain-overlay gradient-mesh">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(13,148,136,0.24),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(6,182,212,0.22),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>Move from AI ambition to measurable execution.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-200">Choose the path that fits your context today and build from there.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild><Link href="/contact">Book a Discovery Call</Link></Button>
            <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild><Link href="/scorecard">Take the AI Maturity Scorecard</Link></Button>
            <Button size="lg" variant="outline" className="border-teal/80 text-white hover:bg-teal hover:text-white" asChild><Link href="/advisor">Get Your AI Recommendation</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
