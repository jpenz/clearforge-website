import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { CASE_STUDIES } from '@/data/case-studies';

/** Case A's own records: opportunities found per month. */
const BARS = [
  { label: 'Month 1', value: 19 },
  { label: 'Month 6', value: 613 },
  { label: 'Sep 2026', value: 1482 },
];
const MAX = 1482;

/** What the agents do each week, in the order a sales leader would tell it. */
const WEEK = [
  'Find companies that just showed a reason to buy: a plant expansion, a contract award, a new line.',
  'Pick the best person to call, and check their direct phone number and email.',
  'Hand each salesperson a one-page brief: what happened, why it matters, what to say.',
  'Feed marketing the same signals for email, ad and LinkedIn campaigns.',
];

/**
 * Beat (b): one real example, straight after the hero says what we do.
 * Case A is told as AI agents running revenue operations, with the result
 * first (the client's biggest new customer, found eight months in) and the
 * weekly work in four plain lines. The exhibit is one series on a zero
 * baseline, every bar labelled with its value, the message in the title.
 * The client and its business lines are never named.
 */
export function ProofSection() {
  const [, caseB] = CASE_STUDIES;

  return (
    <PageFrame id="proof" aria-label="A real example">
      <SectionBand left="A real example" right="A $4B+ industrial supplier, 100+ years old" />
      <div className="grid border-b border-hairline lg:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
          <h2 className="font-display max-w-[24ch] text-balance text-[clamp(28px,2.6vw,46px)] leading-[1.12] font-medium">
            Our AI agents run revenue operations for a{' '}
            <span className="whitespace-nowrap">100-year-old</span> industrial supplier.{' '}
            <em className="text-cobalt italic">
              Eight months in, they found its biggest new customer.
            </em>
          </h2>
          <p className="mt-6 text-[13px] tracking-[0.14em] text-ink/70 uppercase">
            What the agents do every week
          </p>
          <ol className="mt-4 max-w-[58ch] space-y-3">
            {WEEK.map((line, index) => (
              <li key={line} className="flex gap-4 text-[16px] leading-relaxed text-ink/80">
                <span className="tnum shrink-0 font-semibold text-cobalt">{index + 1}</span>
                {line}
              </li>
            ))}
          </ol>
          <ArrowLink href="/proof/industrial-conglomerate" size="sm" className="mt-8">
            Read the full story
          </ArrowLink>
        </div>

        <figure className="px-5 py-10 md:px-10 md:py-14">
          <figcaption>
            <p className="text-[17px] leading-snug font-semibold">
              Opportunities found per month grew from 19 to 1,482.
            </p>
            <p className="mt-1 text-[14px] text-ink/70">
              An opportunity is a company that just showed a reason to buy what the client sells.
            </p>
          </figcaption>
          <div
            className="mt-8 grid h-[220px] grid-cols-3 gap-6 border-b border-ink/40"
            role="img"
            aria-label="Month 1: 19. Month 6: 613. September 2026: 1,482."
          >
            {BARS.map((bar) => (
              <div key={bar.label} className="flex h-full flex-col items-center justify-end">
                <span className="tnum mb-2 text-[20px] font-semibold">
                  {bar.value.toLocaleString('en-US')}
                </span>
                <div
                  className={`w-full max-w-[96px] ${bar.value === MAX ? 'bg-cobalt' : 'bg-ink/25'}`}
                  style={{ height: `max(3px, ${(bar.value / MAX) * 80}%)` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-6 text-center">
            {BARS.map((bar) => (
              <span key={bar.label} className="tnum text-[14px] text-ink/70">
                {bar.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-ink/70">
            Source: the client&apos;s own system records, across three divisions.
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
