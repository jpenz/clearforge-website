import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";
import {
  getIndustry,
  INDUSTRIES,
  INDUSTRY_DELIVERABLES,
} from "@/data/industries";

export function generateStaticParams() {
  return INDUSTRIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `AI systems for ${industry.name}`,
    description: `The workflow pattern we see in ${industry.name}, and what we would build for it. Engagements start with a fixed-fee two-week diagnostic.`,
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      {/* Title block */}
      <PageFrame aria-label="Industry introduction">
        <SectionBand left="Industry" right={industry.bandLabel} />
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display max-w-[20ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            AI systems for{" "}
            <em className="text-cobalt italic">{industry.name}.</em>
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/80">
            The workflow pattern we see in this industry, and what we would
            build for it.
          </p>
        </div>
      </PageFrame>

      {/* Workflow pattern */}
      <PageFrame aria-label="The workflow pattern">
        <SectionBand
          left="The workflow pattern"
          right="4 steps · Every handoff is manual"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-hairline">
          {industry.workflowSteps.map((step, index, list) => (
            <div
              key={step.title}
              className="relative flex flex-col border-b border-hairline px-5 py-8 md:px-8 md:py-12 lg:border-b-0"
            >
              <p className="tnum flex items-center gap-2.5 text-[13px] font-medium text-ink/60">
                <span
                  aria-hidden="true"
                  className="inline-block size-[7px] bg-cobalt"
                />
                0{index + 1}
              </p>
              <h2 className="mt-4 text-[18px] leading-[1.4] font-semibold md:mt-6 md:text-[19px]">
                {step.title}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/70">
                {step.description}
              </p>
              {index < list.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[52px] right-[-7px] z-10 hidden bg-ghost text-[14px] leading-none text-ink/60 lg:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </PageFrame>

      {/* What we would build */}
      <PageFrame aria-label="What we would build">
        <SectionBand left="What we would build" right="4 named deliverables" />
        <div className="grid lg:grid-cols-[1fr_500px]">
          <div className="border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[22ch] text-[28px] leading-[1.2] font-medium md:text-[34px]">
              {industry.system.name}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink/80">
              {industry.system.description}
            </p>
            <p className="tnum mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink/80">
              <span className="font-semibold text-ink">10 to 14 weeks</span>{" "}
              from kickoff to a live production system. We stay through
              adoption.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-hairline px-5 py-4 md:px-8">
              <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
                Named deliverables
              </span>
            </div>
            {INDUSTRY_DELIVERABLES.map((deliverable, index) => (
              <div
                key={deliverable.name}
                className={`flex grow items-baseline gap-4 px-5 py-5 md:px-8 ${
                  index < INDUSTRY_DELIVERABLES.length - 1
                    ? "border-b border-hairline"
                    : ""
                }`}
              >
                <span className="tnum shrink-0 text-[13px] font-medium text-ink/60">
                  0{index + 1}
                </span>
                <div>
                  <p className="tnum text-[14px] font-semibold">
                    {deliverable.name}
                  </p>
                  <p className="tnum mt-0.5 text-[13px] text-ink/70">
                    {deliverable.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Industry benchmark ranges */}
      <PageFrame aria-label="Industry benchmark ranges">
        <SectionBand
          left="Industry ranges · Not ClearForge results"
          right="3 illustrative rows"
        />
        <div role="table" aria-label="Industry benchmark ranges, illustrative">
          {industry.benchmarks.map((benchmark) => (
            <div
              key={benchmark.label}
              role="row"
              className="grid items-baseline gap-1 border-b border-hairline px-5 py-5 md:grid-cols-[1fr_340px_120px] md:px-10 md:py-6"
            >
              <p role="cell" className="text-[15px] text-ink/80">
                {benchmark.label}
              </p>
              <p role="cell" className="tnum text-[15px] font-semibold">
                {benchmark.value}
              </p>
              <span
                role="cell"
                className="text-[11px] tracking-[0.14em] text-ink/60 uppercase md:text-right"
              >
                Illustrative
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-3 px-5 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-10">
          <p className="max-w-[80ch] text-[13px] leading-relaxed text-ink/70">
            Ranges are industry observations for orientation. They are not
            ClearForge results. Our results live on the proof page.
          </p>
          <Link
            href="/proof"
            className="group text-[14px] font-semibold whitespace-nowrap text-cobalt"
          >
            See the proof{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </PageFrame>

      {/* Starting point */}
      <PageFrame aria-label="Starting point">
        <div className="grid items-baseline gap-4 px-5 py-8 md:grid-cols-[1fr_auto] md:gap-10 md:px-10 md:py-10">
          <p className="font-display tnum max-w-[44ch] text-[24px] leading-[1.35] font-medium md:text-[28px]">
            Start where every engagement starts. The fixed-fee Diagnostic maps
            this workflow{" "}
            <em className="text-cobalt italic">{industry.locationNoun}</em> in
            2 weeks.
          </p>
          <span className="tnum text-[11px] tracking-[0.18em] whitespace-nowrap text-ink/60 uppercase">
            Starting point · Forge Diagnostic
          </span>
        </div>
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed fee · 2 weeks" />
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="font-display text-[30px] leading-[1.1] font-medium md:text-[40px]">
            Start with the fixed-fee{" "}
            <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
