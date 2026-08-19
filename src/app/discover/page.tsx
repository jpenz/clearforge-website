import type { Metadata } from "next";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { ForgeIntelligence } from "@/components/functional/ForgeIntelligence";

export const metadata: Metadata = {
  title: "Forge Intelligence",
  description:
    "The free AI workflow-mapping tool. Paste your company URL. The agent maps one workflow and shows what an AI system would do there. Free, no account.",
};

const NEXT_STEPS = [
  {
    number: "01",
    title: "You get the map.",
    text: "A one-page workflow map, yours to keep.",
  },
  {
    number: "02",
    title: "We scope it.",
    text: "If the map shows a build, the $15K Diagnostic prices the next step.",
  },
  {
    number: "03",
    title: "You decide.",
    text: "Every price after it is published.",
  },
];

export default function DiscoverPage() {
  return (
    <>
      {/* Label band + title block */}
      <PageFrame aria-label="Forge Intelligence introduction">
        <SectionBand
          left="Free tool"
          right="Forge Intelligence · Workflow mapping"
        />
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display max-w-[22ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            Map the workflow{" "}
            <em className="text-cobalt italic">before you buy anything.</em>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink/80">
            Paste your company URL. The agent maps one workflow and shows what
            an AI system would do there. Free, no account.
          </p>
        </div>
      </PageFrame>

      {/* Tool panel */}
      <PageFrame aria-label="Workflow mapping tool">
        <div className="px-5 py-8 md:px-10 md:py-12">
          <ForgeIntelligence />
        </div>
      </PageFrame>

      {/* What happens next */}
      <PageFrame aria-label="What happens next">
        <SectionBand left="What happens next" right="3 steps · Prices published" />
        <div className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
          {NEXT_STEPS.map((step) => (
            <div key={step.number} className="px-5 py-8 md:px-10 md:py-10">
              <p className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
                {step.number}
              </p>
              <h2 className="mt-4 text-[18px] leading-[1.4] font-semibold md:text-[19px]">
                {step.title}
              </h2>
              <p className="tnum mt-2 text-[14px] leading-relaxed text-ink/70">
                {step.text}
              </p>
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
