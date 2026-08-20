import type { Metadata } from "next";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder-led. James Penz, formerly of Bain's AI and Automation practice, with earlier work at EY and Capgemini. ClearForge builds AI systems your team actually uses.",
};

const BACKGROUND = [
  {
    label: "Practice",
    title: "Bain, AI and Automation practice",
    description: "AI and automation programs for enterprise clients.",
  },
  {
    label: "Earlier",
    title: "EY",
    description: "Advisory and technology work for large organizations.",
  },
  {
    label: "Earlier",
    title: "Capgemini",
    description: "Delivery of enterprise technology programs.",
  },
];

const HOW_WE_WORK = [
  {
    step: "01 · Diagnose",
    sentence: "Diagnose before building.",
    terms: "Fixed fee, 2 weeks.",
  },
  {
    step: "02 · Build",
    sentence: "Build into production.",
    terms: "Sprints scoped in the Diagnostic.",
  },
  {
    step: "03 · Adopt",
    sentence: "Stay through adoption.",
    terms: "The Adoption Mile.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Title block + founder headshot */}
      <PageFrame aria-label="About ClearForge">
        <SectionBand left="About" right="Founder-led · Founded by James Penz" />
        <div className="grid lg:grid-cols-[1fr_540px]">
          <div className="flex flex-col border-b border-hairline px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-16 lg:border-r lg:border-b-0">
            <h1 className="font-display max-w-[16ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
              One founder. One standard.{" "}
              <em className="text-cobalt italic">
                Systems your team actually uses.
              </em>
            </h1>
            <div className="mt-8 max-w-[52ch] space-y-5 md:mt-10">
              <p className="tnum text-[16px] leading-relaxed text-ink/80">
                Mid-market companies and PE operating teams get AI advice as
                reports. ClearForge exists to do the other thing. We design an
                AI system for a specific workflow, build it into production,
                and stay through adoption until the team actually uses it.
              </p>
              <p className="text-[16px] leading-relaxed text-ink/80">
                Pricing is scoped in the Diagnostic and agreed before any
                build. The deliverable is the working system, not a report.
              </p>
            </div>
            <a
              href="#standard"
              className="group mt-auto inline-block pt-8 text-[15px] font-semibold text-cobalt md:pt-10"
            >
              See the standard we build to{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center px-5 py-8 md:px-10 md:py-10">
            <div className="w-full max-w-[460px]">
              {/* FounderHeadshot slot: real photo supplied by the team */}
              <div className="relative flex h-[420px] items-center justify-center border border-hairline bg-white md:h-[560px]">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-6 bg-cobalt"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-6 w-px bg-cobalt"
                />
                <p className="px-10 text-center text-[11px] leading-[1.8] tracking-[0.14em] text-ink/60 uppercase">
                  Founder headshot · James Penz · real photo supplied
                </p>
              </div>
              <div className="flex items-center justify-between border-x border-b border-hairline px-4 py-3">
                <span className="text-[13px] font-semibold">
                  James Penz · Founder
                </span>
                <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                  ClearForge
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageFrame>

      {/* Background ledger */}
      <PageFrame aria-label="Background">
        <SectionBand left="Background" right="3 firms · Enterprise practice" />
        {BACKGROUND.map((row, index) => (
          <div
            key={row.title}
            className={`grid items-baseline gap-1 px-5 py-5 md:py-7 lg:grid-cols-[160px_440px_1fr] lg:px-10 ${
              index < BACKGROUND.length - 1 ? "border-b border-hairline" : ""
            }`}
          >
            <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              {row.label}
            </span>
            <h2 className="text-[18px] leading-[1.4] font-semibold md:text-[19px]">
              {row.title}
            </h2>
            <p className="text-[14px] leading-relaxed text-ink/70">
              {row.description}
            </p>
          </div>
        ))}
      </PageFrame>

      {/* The standard */}
      <PageFrame id="standard" aria-label="The standard">
        <SectionBand
          left="The standard"
          right="Measured on every engagement"
        />
        <div className="grid divide-y divide-hairline md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col px-5 py-10 md:px-10 md:py-14">
            <p className="tnum text-[72px] leading-none font-light tracking-tight md:text-[96px]">
              70
              <span className="align-top text-[36px] md:text-[48px]">%</span>
            </p>
            <p className="tnum mt-6 max-w-[38ch] text-[16px] leading-relaxed text-ink/80">
              Weekly-active adoption by{" "}
              <span className="font-semibold text-ink">day 90.</span> The bar
              every engagement is built to.
            </p>
          </div>
          <div className="flex flex-col px-5 py-10 md:px-10 md:py-14">
            <p className="tnum text-[72px] leading-none font-light tracking-tight md:text-[96px]">
              10
              <span className="font-display mx-1 text-[36px] italic md:text-[48px]">
                to
              </span>
              14
            </p>
            <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-ink/80">
              Weeks from kickoff to a{" "}
              <span className="font-semibold text-ink">
                live production system.
              </span>
            </p>
          </div>
        </div>
      </PageFrame>

      {/* How we work */}
      <PageFrame aria-label="How we work">
        <SectionBand left="How we work" right="3 steps · Priced before any build" />
        <div className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
          {HOW_WE_WORK.map((item) => (
            <div key={item.step} className="px-5 py-8 md:px-10 md:py-12">
              <span className="tnum flex items-center gap-2.5 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block size-[7px] bg-cobalt"
                />
                {item.step}
              </span>
              <p className="tnum mt-5 text-[17px] leading-[1.5] font-medium md:text-[19px]">
                {item.sentence}{" "}
                <span className="text-ink/60">{item.terms}</span>
              </p>
            </div>
          ))}
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
