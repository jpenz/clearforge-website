import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookingStrip } from "@/components/ui/BookingStrip";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { PE_PACK, SERVICE_STAGES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "One catalog, four stages: Diagnose, Build, Adopt, Run. Every price published. Engagements start with a $15K fixed-price diagnostic.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro band */}
      <PageFrame aria-label="Services introduction">
        <SectionBand
          left="Services"
          right="The journey: Diagnose, Build, Adopt, Run"
        />
        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="border-hairline px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
            <h1 className="font-display max-w-[18ch] text-[38px] leading-[1.08] font-medium tracking-[-0.01em] md:text-[60px] md:leading-[1.05]">
              One catalog. Four stages.{" "}
              <em className="text-cobalt italic">Every price published.</em>
            </h1>
          </div>
          <div className="flex flex-col border-t border-hairline lg:border-t-0">
            <div className="flex grow items-center border-b border-hairline px-5 py-8 md:px-10 md:py-10">
              <p className="tnum text-[16px] leading-relaxed text-ink/80">
                Every engagement starts with a{" "}
                <span className="font-semibold text-ink">$15K</span> diagnostic
                and ends with a system your team uses every week.
              </p>
            </div>
            <div className="px-5 py-6 md:px-10 md:py-8">
              <BookCallButton size="lg" />
            </div>
          </div>
        </div>
      </PageFrame>

      {/* The journey */}
      <PageFrame aria-label="The journey">
        <SectionBand left="The journey" right="4 stages · Start at $15K" />
        {SERVICE_STAGES.map((stage, stageIndex) => (
          <div
            key={stage.number}
            className={`grid lg:grid-cols-[420px_1fr] ${
              stageIndex < SERVICE_STAGES.length - 1
                ? "border-b border-hairline"
                : ""
            }`}
          >
            <div className="border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
              <p className="tnum flex items-center gap-3 text-[12px] tracking-[0.18em] text-ink/60 uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block size-[7px] bg-cobalt"
                />
                Stage {stage.number}
              </p>
              <h2 className="font-display mt-3 text-[34px] leading-[1.1] font-medium md:text-[44px]">
                {stage.name}
              </h2>
              <p className="tnum mt-4 max-w-[32ch] text-[15px] leading-relaxed text-ink/70">
                {stage.description}
              </p>
              {stage.link && (
                <Link
                  href={stage.link.href}
                  className="group mt-6 inline-block text-[14px] font-semibold text-cobalt"
                >
                  {stage.link.label}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              )}
            </div>
            <div>
              {stage.offerings.map((offering, offeringIndex) => (
                <div
                  key={offering.name}
                  className={`grid gap-2 px-5 py-6 md:gap-6 md:px-10 md:py-8 lg:grid-cols-[1fr_210px_140px] ${
                    offeringIndex < stage.offerings.length - 1
                      ? "border-b border-hairline"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="text-[17px] font-semibold">
                      {offering.name}
                    </h3>
                    <p className="tnum mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
                      {offering.description}
                    </p>
                  </div>
                  <p className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase lg:pt-1.5">
                    {offering.meta}
                  </p>
                  <p className="tnum text-[18px] font-semibold lg:pt-0.5 lg:text-right">
                    {offering.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </PageFrame>

      {/* PE Portfolio Pack */}
      <PageFrame aria-label="For sponsors" className="bg-ink text-ghost">
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(248,248,255,0.18)] px-5 py-5 md:px-10">
          <span className="text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
            For sponsors
          </span>
          <span className="text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
            Scoped with the sponsor
          </span>
        </div>
        <div className="grid lg:grid-cols-[1fr_440px]">
          <div className="border-[rgba(248,248,255,0.18)] px-5 py-10 md:px-10 md:py-14 lg:border-r">
            <h2 className="font-display text-[34px] leading-[1.1] font-medium md:text-[44px]">
              {PE_PACK.title}
            </h2>
            <div className="mt-8 max-w-[560px] border-t border-[rgba(248,248,255,0.18)]">
              {PE_PACK.points.map((point, index) => (
                <div
                  key={point}
                  className="grid grid-cols-[40px_1fr] gap-4 border-b border-[rgba(248,248,255,0.18)] py-4"
                >
                  <span className="tnum pt-0.5 text-[13px] text-ghost/60">
                    0{index + 1}
                  </span>
                  <p className="text-[15px] text-ghost/85">{point}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px] text-ghost/85">
              {PE_PACK.priceNote}
            </p>
            <BookCallButton size="lg" className="mt-8" />
          </div>
          <div className="flex flex-col justify-between border-t border-[rgba(248,248,255,0.18)] px-5 py-10 md:px-10 md:py-14 lg:border-t-0">
            <p className="font-display tnum text-[96px] leading-none font-medium md:text-[130px]">
              {PE_PACK.stat.value}
              <span className="align-top text-[40px] md:text-[52px]">%</span>
            </p>
            <div className="mt-10">
              <p className="tnum text-[15px] leading-relaxed text-ghost/85">
                {PE_PACK.stat.text}
              </p>
              <p className="mt-4 text-[12px] tracking-[0.14em] text-ghost/60 uppercase">
                {PE_PACK.stat.source}
              </p>
            </div>
          </div>
        </div>
      </PageFrame>

      {/* Closing strip */}
      <BookingStrip
        headline={
          <>
            The first step costs $15K.{" "}
            <em className="text-cobalt italic">2 weeks.</em>
          </>
        }
      />
    </>
  );
}
