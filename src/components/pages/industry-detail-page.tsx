import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Industry } from "@/data/industries";
import { industryIcons } from "@/lib/icons";

interface Props {
  industry: Industry;
}

export function IndustryDetailPage({ industry }: Props) {
  const IndustryIcon = industryIcons[industry.icon];

  return (
    <>
      <section className="bg-white py-20 lg:py-28 border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link href="/industries" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-teal">
            <ArrowLeft className="h-4 w-4" /> Back to industries
          </Link>
          <IndustryIcon className="mt-6 h-8 w-8 text-teal" aria-hidden />
          <h1 className="mt-3 text-4xl font-bold text-text sm:text-5xl">AI strategy for {industry.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">{industry.hero}</p>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-bold text-text">Industry context</h2>
            {industry.overview.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-text-secondary">{paragraph}</p>
            ))}
          </article>
          <article className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-bold text-text">Top challenges</h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex gap-2 text-base text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text">Use cases we prioritize</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {industry.useCases.map((useCase) => (
              <div key={useCase} className="rounded-xl border border-border bg-surface p-5 text-base text-text-secondary">{useCase}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-bold text-text">Related case study</h2>
            <p className="mt-3 text-base text-text-secondary">Proof from field execution.</p>
            <Button className="mt-4" asChild>
              <Link href={`/case-studies/${industry.caseStudySlug}`}>
                {industry.caseStudyTitle} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-bold text-text">Related insights</h2>
            <ul className="mt-4 space-y-2">
              {industry.relatedInsights.map((slug) => (
                <li key={slug}>
                  <Link href={`/insights/${slug}`} className="text-base text-teal hover:text-teal-light">/{slug}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Discuss AI for {industry.shortName}</h2>
          <p className="mt-4 text-lg text-white/80">We can map your top opportunities and a practical implementation path in one working session.</p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">Book a Discovery Call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
