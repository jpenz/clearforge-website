import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { INDUSTRIES } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where ClearForge builds: the workflow patterns we see by industry, what we would build first, and the benchmark ranges that apply.",
};

export default function IndustriesIndexPage() {
  return (
    <>
      <PageFrame aria-label="Industries introduction">
        <SectionBand
          left="Industries"
          right={`${INDUSTRIES.length} workflow patterns`}
        />
        <div className="px-5 py-10 md:px-10 md:py-14">
          <h1 className="font-display text-[clamp(28px,4vw,44px)] leading-tight">
            The same workflow drag, industry by industry.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70">
            Each page maps one industry's revenue workflow, the manual steps
            that slow it, the system we would build first, and clearly labeled
            benchmark ranges for the pattern. Pick yours.
          </p>
        </div>
      </PageFrame>

      <PageFrame aria-label="Industry index">
        <SectionBand left="The index" right="A to Z" />
        <ul>
          {[...INDUSTRIES]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((industry, index) => (
              <li key={industry.slug} className="border-b border-hairline last:border-b-0">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex items-baseline justify-between gap-4 px-5 py-5 transition-colors hover:bg-ghost md:px-10"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="tnum text-[11px] text-ink/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-medium group-hover:text-cobalt">
                      {industry.name}
                    </span>
                  </span>
                  <span className="hidden text-[13px] text-ink/50 md:block">
                    {industry.system.name}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </PageFrame>

      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed fee · 2 weeks" />
        <div className="flex flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink/70">
            Not sure which pattern is yours? The fixed-fee Diagnostic maps your
            workflow in two weeks and prices the build before you commit.
          </p>
          <BookCallButton size="lg" />
        </div>
      </PageFrame>
    </>
  );
}
