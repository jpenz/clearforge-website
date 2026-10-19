import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { CASE_STUDIES } from '@/data/case-studies';

/** Case A's own record: monthly leads in month one and month six. */
const BARS = [
  { label: 'Month 1', value: 19 },
  { label: 'Month 6', value: 613 },
];
const MAX = 613;

/**
 * Beat (b): one real example, told so a reader with no business background
 * can picture it, straight after the hero says what we do. Three cold
 * readers could not say what the AI does day to day; this band answers
 * that before the steps. The exhibit is one before-and-after on a zero
 * baseline, every bar labelled with its value, the message in the title.
 */
export function ProofSection() {
  const [caseA, caseB] = CASE_STUDIES;

  return (
    <PageFrame id="proof" aria-label="A real example">
      <SectionBand left="A real example" right="A $4 billion manufacturer · 6 months" />
      <div className="grid border-b border-hairline lg:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
          <h2 className="font-display max-w-[22ch] text-balance text-[clamp(28px,2.6vw,46px)] leading-[1.12] font-medium">
            For one manufacturer, our AI finds the next customer and tells the salesperson{' '}
            <em className="text-cobalt italic">what to say.</em>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink/80">
            Every day it reads news of new plants, expansions and building projects, picks the ones
            that need what the company sells, and hands each salesperson a one-page brief: who to
            call and what to say.
          </p>
          <ArrowLink href={`/proof/${caseA.slug}`} size="sm" className="mt-8">
            Read the full story
          </ArrowLink>
        </div>

        <figure className="px-5 py-10 md:px-10 md:py-14">
          <figcaption>
            <p className="text-[17px] leading-snug font-semibold">
              Leads found per month rose from 19 to 613 in six months.
            </p>
            <p className="mt-1 text-[14px] text-ink/70">
              A lead is a business likely to buy what the company sells.
            </p>
          </figcaption>
          <div
            className="mt-8 grid h-[220px] grid-cols-2 gap-8 border-b border-ink/40"
            role="img"
            aria-label="Month 1: 19 leads. Month 6: 613 leads."
          >
            {BARS.map((bar) => (
              <div key={bar.label} className="flex h-full flex-col items-center justify-end">
                <span className="tnum mb-2 text-[22px] font-semibold">{bar.value}</span>
                <div
                  className={`w-full max-w-[120px] ${bar.value === MAX ? 'bg-cobalt' : 'bg-ink/25'}`}
                  style={{ height: `max(3px, ${(bar.value / MAX) * 80}%)` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-8 text-center">
            {BARS.map((bar) => (
              <span key={bar.label} className="tnum text-[14px] text-ink/70">
                {bar.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-ink/70">
            Source: the client&apos;s own system records. 1,181 leads in all across three divisions.
          </p>
        </figure>
      </div>

      {/* Case B in one plain line, then the way to the rest */}
      <div className="flex flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10">
        <p className="tnum max-w-[72ch] text-[15px] leading-relaxed text-ink/80">
          <span className="font-semibold text-ink">Another example:</span> for a home and commercial
          services firm, our AI found 42 businesses to approach. 31 were contacted, 18 asked for a
          quote, and 7 became regular customers.{' '}
          <ArrowLink href={`/proof/${caseB.slug}`} size="sm" className="inline-flex">
            Read it
          </ArrowLink>
        </p>
        <ArrowLink href="/proof" size="sm" className="shrink-0 whitespace-nowrap">
          See all results
        </ArrowLink>
      </div>
    </PageFrame>
  );
}
