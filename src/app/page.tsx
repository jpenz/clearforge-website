import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata, faqJsonLd } from "@/lib/metadata";
import { deepIndustries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";

export const metadata = createMetadata({
  title: "AI Strategy That Actually Ships | ClearForge",
  description:
    "ClearForge helps companies close the AI value gap with strategy, implementation, and managed operations in one team.",
  path: "",
  keywords: ["AI value gap", "AI strategy and execution", "AI consulting"],
});

const homeFaqs = [
  {
    question: "Is this right for companies our size?",
    answer:
      "Yes. We work with growing mid-market teams, PE portfolio companies, and enterprise divisions. Scope is matched to your operating reality and decision speed.",
  },
  {
    question: "What if we already tried AI and it did not work?",
    answer:
      "Most stalled efforts fail at prioritization and operating adoption. We reset around business-critical workflows, measurable outcomes, and hands-on execution.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Many clients see measurable movement in 30-90 days, depending on starting data quality and implementation complexity.",
  },
  {
    question: "Do you replace our existing team?",
    answer:
      "No. We work as an extension of your team, modernize workflows, and build internal capability as systems go live.",
  },
];

const proof = ["Fortune 1000 manufacturing programs", "PE portfolio value creation", "Legacy-to-AI modernization initiatives"];

export default function Home() {
  const featuredCaseStudies = caseStudies.slice(0, 2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }} />

      <section className="relative overflow-hidden bg-slate-navy py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.30),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.18),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">CLARIFY</span>
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
              <span key={item} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">LABEL</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl">The AI Value Gap Is Widening</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Pilots that never scale", "Teams run isolated pilots that never become production operations."],
              ["Strategy and execution are split", "One partner writes the plan, another partner attempts delivery, and value is lost in handoffs."],
              ["Technology without workforce change", "Systems launch, but teams are not prepared to operate with them, so adoption stalls."],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-slate-navy">{title}</h3>
                <p className="mt-3 text-base text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">OVERVIEW</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl">Modernize Work and Workforce in Tandem</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            ClearForge runs a dual-track transformation model: redesign critical workflows for AI while preparing teams to operate in a hybrid human-plus-agent model.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Prepare", "Map value pools, define governance, and align leadership decisions."],
              ["Modernize", "Refactor high-friction processes and create AI-ready data pathways."],
              ["Build", "Deploy production AI agents into real workflows with controls."],
              ["Scale", "Expand what works and continuously improve outcomes."],
            ].map(([phase, text]) => (
              <article key={phase} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-semibold text-teal">{phase}</p>
                <p className="mt-2 text-base text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">SELL THE VACATION</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl">Choose your point on the AI journey</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">Where are you now, what we do next, and what outcomes you should expect.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <article key={solution.slug} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-xs font-semibold text-teal">{solution.stage}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-navy">{solution.title}</h3>
                <p className="mt-3 text-base text-slate-600">{solution.tagline}</p>
                <Link className="mt-4 inline-flex items-center text-sm font-medium text-teal" href={`/solutions/${solution.slug}`}>
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl">Case studies that prove the model</h2>
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

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl">Industry depth where it matters most</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deepIndustries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-teal">
                <h3 className="text-xl font-bold text-slate-navy">{industry.shortName}</h3>
                <p className="mt-2 text-base text-slate-600">{industry.hero}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="section-label">EXPLAIN</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-navy sm:text-4xl">Questions leaders ask before moving forward</h2>
          <div className="mt-8 space-y-4">
            {homeFaqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-navy">{faq.question}</h3>
                <p className="mt-2 text-base text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-navy sm:text-4xl">Why ClearForge</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["One team from strategy to execution", "No split accountability between advisory and implementation vendors."],
              ["Senior operators", "Direct access to experienced consultants and builders, not a junior leverage model."],
              ["Agents, not decks", "We deploy operating systems and agent workflows that run in the real business."],
              ["Process and people together", "Technology deployment and workforce adoption are delivered as one program."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-lg font-bold text-slate-navy">{title}</h3>
                <p className="mt-2 text-base text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <span className="section-label">REINFORCE</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Move from AI ambition to measurable execution.</h2>
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
