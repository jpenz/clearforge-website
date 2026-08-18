import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { CountUp } from "@/components/ui/CountUp";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proof/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `Case ${study.letter}: ${study.client}`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/proof/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = CASE_STUDIES.filter((cs) => cs.slug !== study.slug);
  const sectionCount = study.sections.length;

  return (
    <>
      {/* Breadcrumb + title block */}
      <PageFrame aria-label="Case study title">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-5 md:px-10">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] tracking-[0.18em] text-ink/60 uppercase"
          >
            <Link href="/proof" className="hover:text-cobalt">
              Proof
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span aria-current="page" className="text-ink/70">
              Case {study.letter}
            </span>
          </nav>
          <span className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            {study.scopeTag}
          </span>
        </div>
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display tnum max-w-[24ch] text-[34px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            {study.headline}{" "}
            <em className="text-cobalt italic">{study.headlineEmphasis}</em>
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-ink/80">
            {study.intro}
          </p>
        </div>
      </PageFrame>

      {/* At a glance */}
      <PageFrame aria-label="At a glance">
        <SectionBand left="At a glance" right={study.glanceNote} />
        <div
          className={`grid divide-y divide-hairline md:divide-x md:divide-y-0 ${
            study.glance.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {study.glance.map((figure) => (
            <div key={figure.label} className="px-5 py-8 md:px-10 md:py-12">
              <p className="tnum text-[48px] leading-none font-light tracking-tight md:text-[72px]">
                {figure.count != null ? (
                  <CountUp
                    value={figure.count}
                    suffix={figure.suffix}
                    format={figure.format ?? false}
                  />
                ) : (
                  figure.display
                )}
              </p>
              <p className="tnum mt-4 text-[13px] leading-relaxed text-ink/70">
                {figure.label}
              </p>
            </div>
          ))}
        </div>
      </PageFrame>

      {/* Narrative sections */}
      {study.sections.map((section, index) => (
        <PageFrame key={section.label} aria-label={section.label}>
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
              <p className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
                0{index + 1} / 0{sectionCount}
              </p>
              <p className="mt-2 text-[11px] font-medium tracking-[0.18em] text-ink uppercase">
                {section.label}
              </p>
              <p className="tnum mt-6 text-[40px] leading-none font-light md:mt-10">
                {section.figure}
              </p>
              <p className="tnum mt-3 text-[13px] text-ink/70">
                {section.figureLabel}
              </p>
            </div>
            <div>
              <div className="px-5 py-8 md:px-10 md:py-12">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="tnum mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-ink/80 first:mt-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.label === "Results" && study.resultsTable && (
                <table className="w-full border-t border-hairline text-left">
                  <caption className="sr-only">
                    Case {study.letter} results by metric
                  </caption>
                  <thead>
                    <tr className="border-b border-hairline">
                      <th
                        scope="col"
                        className="px-5 py-3 text-[11px] font-medium tracking-[0.14em] text-ink/70 uppercase md:px-10"
                      >
                        Metric
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-right text-[11px] font-medium tracking-[0.14em] text-ink/70 uppercase md:px-10"
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.resultsTable.map((row) => (
                      <tr
                        key={row.metric}
                        className="border-b border-hairline-faint last:border-b-0"
                      >
                        <td className="px-5 py-4 text-[14px] text-ink/80 md:px-10">
                          {row.metric}
                        </td>
                        <td
                          className={`tnum px-5 py-4 text-right text-[16px] font-semibold md:px-10 ${
                            row.accent ? "text-cobalt" : ""
                          }`}
                        >
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </PageFrame>
      ))}

      {/* More proof */}
      <PageFrame aria-label="More proof">
        <SectionBand
          left="More proof"
          right={`${others.length} more case studies`}
        />
        {others.map((other, index) => (
          <div
            key={other.slug}
            className={`grid items-baseline gap-3 px-5 py-5 md:grid-cols-[140px_1fr_auto] md:gap-8 md:px-10 md:py-7 ${
              index < others.length - 1 ? "border-b border-hairline-faint" : ""
            }`}
          >
            <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
              Case {other.letter}
            </p>
            <p className="tnum max-w-[62ch] text-[15px] leading-relaxed text-ink/80">
              {other.summary}
            </p>
            <Link
              href={`/proof/${other.slug}`}
              className="group text-[14px] font-semibold whitespace-nowrap text-cobalt"
            >
              Read the case study{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </div>
        ))}
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
