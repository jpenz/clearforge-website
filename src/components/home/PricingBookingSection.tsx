import Image from 'next/image';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { PageFrame } from '@/components/ui/PageFrame';
import { HOME_FAQS } from '@/data/faqs';

/** Label, the pricing basis, then the one real variable per row: the term. */
const PRICE_ROWS = [
  { label: 'Forge Diagnostic', description: 'Fixed fee, the first step', term: '2 weeks' },
  {
    label: 'Eval and Reliability Audit',
    description: 'Fixed fee, for AI systems you already built',
    term: '2 weeks',
  },
  { label: 'Forge Sprint', description: 'Scoped in the Diagnostic', term: '10 to 14 weeks' },
  { label: 'Forge Scale', description: 'The Adoption Mile, a retainer', term: 'Monthly' },
  {
    label: 'Forge Run',
    description: 'Managed operations, a retainer',
    term: 'Monthly, per system',
  },
];

const EXPECT = [
  'We look at one workflow together, live.',
  'You leave knowing what we would build and how it gets adopted.',
  'No preparation needed. MS Teams, 30 minutes.',
];

/**
 * Beat (e): the engagement ledger plus the booking column, with the FAQ
 * accordion below for AI-search visibility. The band opens on the display
 * statement, not a label rail. The booking column carries the founder
 * (photo, name, lineage) so the reader meets the person before the
 * commitment, and it is sticky within the band so it never leaves an
 * empty cell beside the accordion.
 */
export function PricingBookingSection() {
  return (
    <PageFrame id="book" aria-label="Engagement and booking" bottomRule={false}>
      <div className="grid lg:grid-cols-[2fr_1fr]">
        <div className="border-hairline lg:border-r">
          <div className="border-b border-hairline px-5 pt-8 pb-8 md:px-10 md:pt-12 md:pb-10">
            <h2 className="font-display max-w-[22ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.08]">
              The first step is a fixed-fee diagnostic. Everything after it is scoped before you
              commit.
            </h2>
            <div className="mt-8 border-t border-hairline text-[14px]">
              {PRICE_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid items-baseline gap-1 border-b border-hairline py-3 md:grid-cols-[200px_1fr_auto] md:gap-4"
                >
                  <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                    {row.label}
                  </span>
                  <span className="tnum text-ink/70">{row.description}</span>
                  <span className="tnum text-[16px] font-semibold">{row.term}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-8 md:px-10">
            <p className="mb-2 text-[12px] tracking-[0.16em] text-ink/70 uppercase">
              Common questions
            </p>
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>

        <div className="flex flex-col border-t border-hairline px-5 py-8 md:px-10 md:py-12 lg:sticky lg:top-24 lg:self-start lg:border-t-0">
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
              <p className="mt-1 text-[13px] leading-snug text-ink/70">
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
          <p className="mt-6 text-[13px] text-ink/70">
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
