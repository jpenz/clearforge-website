import Link from "next/link";
import { Button } from "@/components/ui/button";
import { engagementModels, firstWeekPlan, howWeWorkFaqs } from "@/data/how-we-work";
import { engagementIcons } from "@/lib/icons";

export function HowWeWorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label text-teal-light">How We Work</span>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Engagement models built for execution, not slideware.</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80">
            ClearForge engagements are scoped around your operating priorities, timeline, and internal capacity. We focus on measurable business outcomes and practical adoption.
          </p>
          <p className="mt-4 max-w-3xl text-base text-white/70">
            Our operating language follows CLOSER: Clarify and Label first, then Overview, outcome vision, concern handling, and reinforced execution.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {engagementModels.map((model) => {
              const Icon = engagementIcons[model.icon];
              return (
                <article key={model.title} className="rounded-xl border border-border bg-white p-6">
                  <Icon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                  <h2 className="text-2xl font-bold text-text">{model.title}</h2>
                  <p className="mt-3 text-base text-text-secondary">{model.scope}</p>
                  <p className="mt-3 text-sm text-text-secondary"><strong>Timeline:</strong> {model.timeline}</p>
                  <p className="mt-1 text-sm text-text-secondary"><strong>Best for:</strong> {model.bestFor}</p>
                  <ul className="mt-4 space-y-2">
                    {model.includes.map((item) => (
                      <li key={item} className="text-base text-text-secondary">• {item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text">What to expect in week one</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {firstWeekPlan.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-white p-6 text-base text-text-secondary">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text">FAQ</h2>
          <div className="mt-6 space-y-4">
            {howWeWorkFaqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-lg font-semibold text-text">{faq.question}</h3>
                <p className="mt-2 text-base text-text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Start with the right engagement model for your goals.</h2>
          <p className="mt-4 text-lg text-white/80">Most clients begin with an AI Strategy Sprint and expand based on results.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-text" asChild>
              <Link href="/assessment">Start AI Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
