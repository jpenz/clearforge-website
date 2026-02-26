import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeyStages, getSolutionsByStage } from "@/data/solutions";
import { solutionIcons } from "@/lib/icons";

const stageSubhead: Record<(typeof journeyStages)[number], string> = {
  UNDERSTAND: "Know where to win before you spend.",
  BUILD: "Deploy AI systems that work in real operations.",
  OPERATE: "Run and improve AI workflows as a managed capability.",
};

const stageCloser: Record<(typeof journeyStages)[number], string> = {
  UNDERSTAND: "CLOSER focus: Clarify + Label",
  BUILD: "CLOSER focus: Overview + practical execution design",
  OPERATE: "CLOSER focus: Sell the outcome, Explain concerns, Reinforce decisions",
};

export function SolutionsPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Solutions</span>
          <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl">AI solutions organized by your journey stage.</h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            ClearForge follows a practical transformation path: <strong>UNDERSTAND</strong> where value is,
            <strong> BUILD</strong> production systems, then <strong>OPERATE</strong> and optimize for compounding returns.
          </p>
          <p className="mt-3 max-w-3xl text-base text-text-tertiary">
            We use CLOSER language throughout delivery so leaders and operators align quickly on what matters and what to do next.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-border bg-white p-7 text-center text-xl font-semibold text-text sm:text-2xl">
            UNDERSTAND <span className="text-text-tertiary">→</span> BUILD <span className="text-text-tertiary">→</span> OPERATE
          </div>

          <div className="space-y-10">
            {journeyStages.map((stage) => {
              const items = getSolutionsByStage(stage);
              return (
                <div key={stage} className="rounded-2xl border border-border bg-white p-7">
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="section-label">{stage}</p>
                      <h2 className="mt-2 text-2xl font-bold text-text">{stageSubhead[stage]}</h2>
                      <p className="mt-2 text-sm font-medium text-teal">{stageCloser[stage]}</p>
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {items.map((solution) => {
                      const Icon = solutionIcons[solution.icon];
                      return (
                        <article key={solution.slug} className="rounded-xl border border-border border-l-4 border-l-teal bg-surface p-6">
                          <Icon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                          <h3 className="text-xl font-bold text-text">{solution.title}</h3>
                          <p className="mt-2 text-base text-teal">{solution.tagline}</p>
                          <p className="mt-3 text-base text-text-secondary">{solution.summary}</p>
                          <Button variant="link" className="mt-4 px-0" asChild>
                            <Link href={`/solutions/${solution.slug}`}>
                              Explore solution <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Not sure where to start in the journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Use the AI Assessment to score readiness, benchmark your industry, and get a tailored recommendation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/assessment">Start AI Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-text" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
