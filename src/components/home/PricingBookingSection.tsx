import Image from 'next/image';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { PageFrame } from '@/components/ui/PageFrame';

/**
 * Label, how it is billed, then how long it runs. The two were one column
 * before, so "2 weeks" and "Monthly" answered different questions on one
 * alignment; the term column now holds durations only.
 */
const PRICE_ROWS = [
  { label: 'Forge Diagnostic', description: 'Fixed fee, the first step', term: '2 weeks' },
  {
    label: 'Eval and Reliability Audit',
    description: 'Fixed fee, for AI systems you already built',
    term: '2 weeks',
  },
  { label: 'Forge Sprint', description: 'Scoped in the Diagnostic', term: '10 to 14 weeks' },
  {
    label: 'Forge Scale',
    description: 'Adoption retainer, monthly, weekly cadence',
    term: 'Ongoing',
  },
  {
    label: 'Forge Run',
    description: 'Managed operations, monthly per system',
    term: 'Ongoing',
  },
];

const EXPECT = [
  'We look at one workflow together, live.',
  'You leave knowing what we would build and how it gets adopted.',
  'No preparation needed. MS Teams, 30 minutes.',
];

/**
 * Beat (f): the engagement ledger plus the booking column. This is the last
 * room on the page, so the commitment is the last thing read; the FAQ that
 * used to trail it now sits in its own band above. The band opens on the
 * display statement, not a label rail, and the booking column carries the
 * founder (photo, name, lineage) so the reader meets the person before the
 * commitment.
 */
export function PricingBookingSection() {
  return (
    <PageFrame id="book" aria-label="Engagement and booking" bottomRule={false}>
      <div className="grid lg:grid-cols-[2fr_1fr]">
        <div className="border-hairline lg:border-r">
          <div className="px-5 pt-8 pb-8 md:px-10 md:pt-12 md:pb-10">
            <h2 className="font-display max-w-[24ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.08]">
              The first step is a <span className="whitespace-nowrap">fixed-fee</span> diagnostic.
              Everything after it is scoped before you commit.
            </h2>
            <div className="mt-8 border-t border-hairline">
              <div className="grid gap-1 border-b border-hairline py-3 md:grid-cols-[200px_1fr_auto] md:gap-4">
                <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                  Engagement
                </span>
                <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                  Fee basis
                </span>
                <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase md:text-right">
                  Term
                </span>
              </div>
              {PRICE_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid items-baseline gap-1 border-b border-hairline py-3 md:grid-cols-[200px_1fr_auto] md:gap-4"
                >
                  <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                    {row.label}
                  </span>
                  <span className="tnum text-[14px] text-ink/70">{row.description}</span>
                  <span className="tnum text-[16px] font-semibold md:text-right">{row.term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col border-t border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-t-0">
          <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">Book</p>
          <h3 className="font-display mt-3 max-w-[16ch] text-balance text-[28px] leading-tight md:text-[32px]">
            30 minutes with the founder.
          </h3>
          <div className="mt-6 flex items-center gap-4">
            <div className="relative aspect-[4/5] w-[72px] shrink-0 overflow-hidden border border-hairline bg-white">
              <Image
                src="/images/james-penz.jpg"
                alt="James Penz, founder of ClearForge"
                fill
                sizes="72px"
                quality={72}
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-[15px] font-semibold">James Penz</p>
              <p className="mt-1 text-[14px] leading-snug text-ink/70">
                Founder. Bain AI and Automation practice, EY, Capgemini.
              </p>
            </div>
          </div>
          <BookCallButton size="lg" className="mt-6 self-start" />
          <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-[14px] leading-relaxed text-ink/70">
            {EXPECT.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-[7px] size-[6px] shrink-0 bg-cobalt" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-ink/70">
            Prefer a calendar view first?{' '}
            <a href="/contact" className="text-cobalt underline underline-offset-4">
              Pick a time on the contact page.
            </a>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
