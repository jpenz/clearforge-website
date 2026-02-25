import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Solution } from "@/data/solutions";

interface Props {
  solution: Solution;
}

export function SolutionDetailPage({ solution }: Props) {
  return (
    <>
      <section className="bg-white py-20 lg:py-28 border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-teal">
            <ArrowLeft className="h-4 w-4" /> Back to solutions
          </Link>
          <p className="mt-6 section-label">{solution.stage}</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-navy sm:text-5xl">{solution.headline}</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">{solution.summary}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild><Link href="/advisor">Get Your AI Recommendation</Link></Button>
            <Button variant="outline" asChild><Link href="/contact">Book a Discovery Call</Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-navy">Is this right for you?</h2>
            <ul className="mt-4 space-y-3">
              {solution.rightForYou.map((item) => (
                <li key={item} className="flex gap-2 text-base text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-navy">What we do</h2>
            <ul className="mt-4 space-y-3">
              {solution.whatWeDo.map((item) => (
                <li key={item} className="flex gap-2 text-base text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-navy">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solution.howItWorks.map((step) => (
              <div key={step.phase} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm font-semibold text-teal">{step.phase}</p>
                <p className="mt-2 text-base text-slate-700">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-navy">Typical engagement scope</h2>
            <p className="mt-4 text-base text-slate-700"><strong>Timeline:</strong> {solution.scope.timeline}</p>
            <p className="mt-2 text-base text-slate-700"><strong>Core team:</strong> {solution.scope.team}</p>
            <ul className="mt-4 space-y-2">
              {solution.scope.deliverables.map((deliverable) => (
                <li key={deliverable} className="text-base text-slate-600">• {deliverable}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-navy">Related case study</h2>
            <p className="mt-3 text-base text-slate-600">See how this capability shows up in real-world operations.</p>
            <Button className="mt-4" asChild>
              <Link href={`/case-studies/${solution.relatedCaseStudySlug}`}>
                {solution.relatedCaseStudyTitle} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-navy">FAQ</h2>
          <div className="mt-6 space-y-4">
            {solution.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-slate-navy">{faq.question}</h3>
                <p className="mt-2 text-base text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to apply this in your business?</h2>
          <p className="mt-4 text-lg text-slate-200">Get a tailored recommendation and an execution path designed for your context.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild><Link href="/advisor">Get Your AI Recommendation</Link></Button>
            <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild><Link href="/contact">Book a Discovery Call</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
