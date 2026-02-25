import Link from "next/link";
import { Button } from "@/components/ui/button";
import { engagementModels, firstWeekPlan, howWeWorkFaqs } from "@/data/how-we-work";
import { engagementIcons } from "@/lib/icons";

export function HowWeWorkPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-slate-navy py-20 lg:py-28"
        style={{
          backgroundImage: "url('/api/img?src=https://heyboss.heeyo.ai/replicate-flux-schnell-1771984863-0d8df5ff.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-slate-navy/75" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label text-teal-light">How We Work</span>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Engagement models built for execution, not slideware.</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-200">
            ClearForge engagements are scoped around your operating priorities, timeline, and internal capacity. We focus on measurable business outcomes and practical adoption.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {engagementModels.map((model) => {
              const Icon = engagementIcons[model.icon];
              return (
                <article key={model.title} className="rounded-xl glass glass-hover p-6">
                  <Icon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                  <h2 className="text-2xl font-bold text-slate-navy">{model.title}</h2>
                  <p className="mt-3 text-base text-slate-600">{model.scope}</p>
                  <p className="mt-3 text-sm text-slate-700"><strong>Timeline:</strong> {model.timeline}</p>
                  <p className="mt-1 text-sm text-slate-700"><strong>Best for:</strong> {model.bestFor}</p>
                  <ul className="mt-4 space-y-2">
                    {model.includes.map((item) => (
                      <li key={item} className="text-base text-slate-600">• {item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-navy">What to expect in week one</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {firstWeekPlan.map((item) => (
              <div key={item} className="rounded-xl glass glass-hover p-5 text-base text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-navy">FAQ</h2>
          <div className="mt-6 space-y-4">
            {howWeWorkFaqs.map((faq) => (
              <article key={faq.question} className="rounded-xl glass p-5">
                <h3 className="text-lg font-semibold text-slate-navy">{faq.question}</h3>
                <p className="mt-2 text-base text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Start with the right engagement model for your goals.</h2>
          <p className="mt-4 text-lg text-slate-200">Most clients begin with an AI Strategy Sprint and expand based on results.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white hover:text-slate-navy" asChild>
              <Link href="/advisor">Get Your AI Recommendation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
