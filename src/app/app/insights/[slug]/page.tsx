import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { ARTICLES, getArticle, getReadNext } from "@/data/insights";

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} ${article.titleEmphasis ?? ""}`.trim(),
    description: article.standfirst,
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const readNext = getReadNext(article.slug);

  return (
    <>
      {/* Label band */}
      <PageFrame aria-label="Article context">
        <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-10">
          <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            <Link href="/insights" className="hover:text-cobalt">
              Insights
            </Link>{" "}
            / {article.topic}
          </span>
          <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            By James Penz
          </span>
        </div>
      </PageFrame>

      {/* Title block */}
      <PageFrame aria-label="Article title">
        <div className="flex flex-col items-center px-5 pt-12 pb-10 text-center md:px-10 md:pt-20 md:pb-16">
          <h1 className="font-display tnum max-w-[18ch] text-[38px] leading-[1.08] font-medium tracking-[-0.01em] md:text-[64px] md:leading-[1.06]">
            {article.title}{" "}
            {article.titleEmphasis && (
              <em className="text-cobalt italic">{article.titleEmphasis}</em>
            )}
          </h1>
          <p className="mt-6 max-w-[42ch] text-[18px] leading-[1.55] text-ink/80 md:mt-7 md:text-[21px]">
            {article.standfirst}
          </p>
          <p className="mt-7 text-[11px] tracking-[0.18em] text-ink/60 uppercase md:mt-9">
            James Penz · Founder
          </p>
        </div>
      </PageFrame>

      {/* Body */}
      <article className="mx-auto max-w-[1360px] border-b border-hairline md:border-x">
        <ArticleBody blocks={article.blocks} />
      </article>

      {/* Read next */}
      <PageFrame aria-label="Read next">
        <SectionBand left="Read next" right={`${readNext.length} articles`} />
        {readNext.map((next, index) => (
          <Link
            key={next.slug}
            href={`/insights/${next.slug}`}
            className={`group flex flex-col justify-between gap-3 px-5 py-6 md:flex-row md:items-baseline md:gap-8 md:px-10 md:py-7 ${
              index < readNext.length - 1 ? "border-b border-hairline" : ""
            }`}
          >
            <span className="flex items-baseline gap-4 md:gap-6">
              <span className="tnum shrink-0 text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                0{index + 1}
              </span>
              <span className="tnum text-[17px] leading-snug font-semibold transition-colors group-hover:text-cobalt motion-reduce:transition-none md:text-[19px]">
                {next.title} {next.titleEmphasis}
              </span>
            </span>
            <span className="text-[15px] font-semibold whitespace-nowrap text-cobalt">
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
            Start with the <span className="tnum">$15K</span>{" "}
            <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
