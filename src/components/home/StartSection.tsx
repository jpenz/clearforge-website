import Image from 'next/image';
import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { PageFrame } from '@/components/ui/PageFrame';
import { SHOW_FOUNDER_IDENTITY } from '@/data/site';

const EXPECT = [
  'We look at that job together, live.',
  'You leave knowing what we would build, what it would take, and whether it is worth it.',
  'No preparation needed. 30 minutes on Microsoft Teams.',
];

/**
 * The last band: how to start, and nothing else. The engagement table that
 * used to sit here repeated the four steps; the steps band now carries
 * them. The founder (photo, name, lineage) shows only when the identity
 * switch is on; otherwise the band names the background, not the person.
 */
export function StartSection() {
  return (
    <PageFrame id="book" aria-label="How to start" bottomRule={false}>
      <div className="grid lg:grid-cols-[2fr_1fr]">
        <div className="border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
          <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">How to start</p>
          <h2 className="font-display mt-4 max-w-[22ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.08]">
            Start with a 30-minute call.{' '}
            <em className="text-cobalt italic">Bring one job you wish took less time.</em>
          </h2>
          <ul className="mt-8 max-w-[60ch] space-y-3 text-[16px] leading-relaxed text-ink/80">
            {EXPECT.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-[10px] size-[6px] shrink-0 bg-cobalt" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col px-5 py-10 md:px-10 md:py-14">
          {SHOW_FOUNDER_IDENTITY ? (
            <div className="flex items-center gap-4">
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
          ) : (
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink/75">
              You talk with someone who did this work at Bain, EY and Capgemini.
            </p>
          )}
          <BookCallButton size="lg" className="mt-6 self-start" />
          <p className="mt-6 text-[14px] text-ink/70">
            Prefer to see a calendar first?{' '}
            <Link href="/contact" className="text-cobalt underline underline-offset-4">
              Pick a time on the contact page.
            </Link>
          </p>
          <p className="mt-8 border-t border-hairline pt-6 text-[14px] leading-relaxed text-ink/70">
            Not ready to talk? Answer 10 short questions and get a score for how ready your company
            is for AI.{' '}
            <Link href="/scorecard" className="text-cobalt underline underline-offset-4">
              Take the scorecard
            </Link>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
