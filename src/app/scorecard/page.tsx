import type { Metadata } from "next";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { ScorecardFlow } from "@/components/functional/ScorecardFlow";

export const metadata: Metadata = {
  title: "AI Readiness Scorecard",
  description:
    "10 questions on a 1 to 5 scale across 5 pillars. A scored readout of your AI readiness at the end. Free, about three minutes.",
};

export default function ScorecardPage() {
  return (
    <>
      {/* Label band */}
      <PageFrame aria-label="Scorecard introduction">
        <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-10">
          <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            Free tool
          </span>
          <span className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            AI readiness scorecard · 10 questions
          </span>
        </div>
      </PageFrame>

      {/* ScorecardFlow */}
      <PageFrame aria-label="Scorecard">
        <div className="px-5 py-8 md:px-10 md:py-12">
          <ScorecardFlow />
        </div>
      </PageFrame>

      {/* Reassurance band */}
      <PageFrame aria-label="About the scorecard">
        <div className="px-5 py-5 md:px-10 md:py-6">
          <p className="tnum text-[14px] text-ink/70">
            Ten questions. About three minutes. Results scored across five
            pillars.
          </p>
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
