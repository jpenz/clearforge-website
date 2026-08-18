import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { CountUp } from "@/components/ui/CountUp";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { BLUEPRINTS } from "@/data/blueprints";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "Case studies with real numbers and anonymized clients: 1,181 qualified opportunities across 3 divisions in 6 months, a commercial pipeline rebuilt from zero, a portfolio-wide AI diagnostic.",
};

const readLink = (slug: string) => (
  <Link
    href={`/proof/${slug}`}
    className="group inline-block text-[15px] font-semibold text-cobalt"
  >
    Read the case study{" "}
    <span
      aria-hidden="true"
      className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
    >
      →
    </span>
  </Link>
);

export default function ProofPage() {
  return (
    <>
      {/* Intro band */}
      <PageFrame aria-label="Proof introduction">
        <SectionBand
          left="Proof"
          right="3 case studies · Real numbers, anonymized clients"
        />
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display max-w-[22ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            The numbers are{" "}
            <em className="text-cobalt italic">the case study.</em>
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/80">
            Client names are anonymized. The results are not.
          </p>
        </div>
      </PageFrame>

      {/* Case A */}
      <PageFrame aria-label="Case A">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="tnum text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case A · $4B industrial conglomerate
          </p>
          <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            6 months
          </span>
        </div>
        <div className="grid lg:grid-cols-[1fr_460px]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <p className="tnum text-[72px] leading-none font-light tracking-tight md:text-[128px]">
              <CountUp value={1181} />
            </p>
            <p className="tnum mt-6 max-w-[46ch] text-[16px] leading-relaxed text-ink/80">
              Qualified opportunities across{" "}
              <span className="font-semibold text-ink">3 divisions</span> in{" "}
              <span className="font-semibold text-ink">6 months.</span>
            </p>
            <div className="mt-auto pt-8">
              {readLink("industrial-conglomerate")}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-hairline px-5 py-4 md:px-8">
              <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
                Secondary figures
              </span>
            </div>
            <div className="flex grow flex-col justify-center border-b border-hairline px-5 py-6 md:px-8 md:py-8">
              <p className="tnum text-[40px] leading-none font-light">
                <CountUp value={32} suffix="x" />
              </p>
              <p className="tnum mt-3 text-[13px] text-ink/70">
                Monthly volume ramp, from 19 to 613
              </p>
            </div>
            <div className="flex grow flex-col justify-center px-5 py-6 md:px-8 md:py-8">
              <p className="tnum text-[40px] leading-none font-light">
                <CountUp value={631} suffix="+" />
              </p>
              <p className="mt-3 text-[13px] text-ink/70">
                Generated sales playbooks
              </p>
            </div>
          </div>
        </div>
      </PageFrame>

      {/* Case B */}
      <PageFrame aria-label="Case B">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case B · Home and commercial services firm
          </p>
          <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            4-stage funnel
          </span>
        </div>
        <div className="grid lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[16ch] text-[28px] leading-[1.2] font-medium md:text-[34px]">
              Commercial pipeline rebuilt from zero.
            </h2>
            <div className="mt-auto pt-8">{readLink("services-firm")}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-hairline">
            {[
              { stage: "Stage 1", value: 42, label: "Targets identified" },
              { stage: "Stage 2", value: 31, label: "Contacted" },
              { stage: "Stage 3", value: 18, label: "Quoted" },
              {
                stage: "Stage 4",
                value: 7,
                label: "Recurring accounts won",
                accent: true,
              },
            ].map((item, index, list) => (
              <div
                key={item.stage}
                className="relative flex flex-col justify-between gap-6 border-b border-hairline px-5 py-6 md:gap-0 md:border-b-0 md:px-7 md:py-12"
              >
                <p className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                  {item.stage}
                </p>
                <div>
                  <p
                    className={`tnum text-[40px] leading-none font-light md:text-[56px] ${
                      item.accent ? "text-cobalt" : ""
                    }`}
                  >
                    <CountUp value={item.value} />
                  </p>
                  <p className="mt-3 text-[13px] text-ink/70">{item.label}</p>
                </div>
                {index < list.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-7px] bottom-[52px] z-10 hidden bg-ghost text-[14px] leading-none text-ink/60 md:block"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Case C */}
      <PageFrame aria-label="Case C">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case C · PE operating team
          </p>
          <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Portfolio-wide
          </span>
        </div>
        <div className="grid items-end gap-6 px-5 py-8 md:grid-cols-[1fr_auto] md:gap-10 md:px-10 md:py-12">
          <p className="font-display max-w-[34ch] text-[28px] leading-[1.3] font-medium md:text-[34px]">
            A portfolio-wide AI diagnostic. They left with{" "}
            <em className="text-cobalt italic">
              a prioritized execution plan.
            </em>
          </p>
          <div className="pb-1 whitespace-nowrap">
            {readLink("pe-portfolio-diagnostic")}
          </div>
        </div>
      </PageFrame>

      {/* Blueprint library */}
      <PageFrame aria-label="Blueprint library">
        <SectionBand
          left="Blueprint library"
          right="Build patterns from past systems"
        />
        <div className="grid md:grid-cols-2">
          {BLUEPRINTS.map((blueprint, index) => (
            <div
              key={blueprint.name}
              className={`flex items-baseline justify-between gap-6 px-5 py-5 md:px-10 md:py-6 ${
                index % 2 === 0 ? "md:border-r md:border-hairline" : ""
              } ${
                index < BLUEPRINTS.length - (BLUEPRINTS.length % 2 === 0 ? 2 : 1)
                  ? "border-b border-hairline"
                  : "max-md:border-b max-md:border-hairline max-md:last:border-b-0"
              }`}
            >
              <div>
                <p className="text-[14px] font-semibold">
                  {blueprint.name}{" "}
                  <span aria-hidden="true" className="text-cobalt">
                    →
                  </span>
                </p>
                <p className="mt-1 text-[13px] text-ink/70">
                  {blueprint.description}
                </p>
              </div>
              <span className="shrink-0 text-[10px] tracking-[0.14em] text-ink/60 uppercase">
                Illustrative
              </span>
            </div>
          ))}
        </div>
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed price · 2 weeks" />
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="font-display text-[30px] leading-[1.1] font-medium md:text-[40px]">
            Start with the <span className="tnum">$15K</span>{" "}
            <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
