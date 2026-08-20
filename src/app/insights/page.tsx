import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { ARTICLES } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Long reads on AI systems, adoption, and what they cost. Written by the founder. No filler.",
};

export default function InsightsPage() {
  const featured = ARTICLES.find((article) => article.featured);
  const rest = ARTICLES.filter((article) => !article.featured);

  return (
    <>
      {/* Intro band */}
      <PageFrame aria-label="Insights introduction">
        <SectionBand left="Insights" right="Long-form, written by the founder" />
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display max-w-[24ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            Notes from the build floor.{" "}
            <em className="text-cobalt italic">What actually ships.</em>
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/80">
            Long reads on AI systems, adoption, and what they cost. No filler.
          </p>
        </div>
      </PageFrame>

      {/* Featured article */}
      {featured && (
        <PageFrame aria-label="Featured article">
          <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
            <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
              Featured · {featured.topic}
            </p>
            <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
              Our own numbers
            </span>
          </div>
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid items-end gap-6 px-5 py-10 md:grid-cols-[1fr_auto] md:gap-10 md:px-10 md:py-14"
          >
            <div>
              <h2 className="font-display max-w-[32ch] text-[32px] leading-[1.1] font-medium transition-colors group-hover:text-cobalt motion-reduce:transition-none md:text-[44px]">
                {featured.title} {featured.titleEmphasis}
              </h2>
              <p className="tnum mt-5 max-w-[64ch] text-[16px] leading-relaxed text-ink/80">
                {featured.summary}
              </p>
            </div>
            <span className="inline-block pb-1 text-[15px] font-semibold whitespace-nowrap text-cobalt">
              Read the article{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </span>
          </Link>
        </PageFrame>
      )}

      {/* The index */}
      <PageFrame aria-label="Article index">
        <SectionBand left="The index" right={`${rest.length} articles`} />
        {rest.map((article, index) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className={`group grid items-center gap-4 px-5 py-8 md:grid-cols-[140px_1fr_auto] md:gap-10 md:px-10 md:py-10 ${
              index < rest.length - 1 ? "border-b border-hairline" : ""
            }`}
          >
            <span className="tnum text-[40px] leading-none font-light text-ink/60 md:text-[56px]">
              0{index + 1}
            </span>
            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
                {article.topic}
              </p>
              <h3 className="tnum mt-2 text-[18px] leading-snug font-semibold transition-colors group-hover:text-cobalt motion-reduce:transition-none md:text-[20px]">
                {article.title} {article.titleEmphasis}
              </h3>
              <p className="tnum mt-2 max-w-[68ch] text-[15px] leading-relaxed text-ink/70">
                {article.summary}
              </p>
            </div>
            <span className="inline-block text-[15px] font-semibold whitespace-nowrap text-cobalt">
              Read{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed price · 2 weeks" />
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
