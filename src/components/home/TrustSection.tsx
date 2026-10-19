import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

/**
 * Why trust it, in three plain promises, each with one sentence on how.
 * Each is a practice running in client systems today (claim check, 18
 * October 2026) and links to the page with the detail. This band replaces
 * the lineage strip and the "under every engagement" band; the background
 * line now sits in the start band, beside the booking button.
 */
const PROMISES = [
  {
    title: 'A person approves anything that goes to a customer.',
    how: 'The AI drafts. Your salesperson reads it and decides what to send.',
    href: '/engineering#control',
    link: 'How people stay in charge',
  },
  {
    title: "The AI's work is checked every day.",
    how: 'Each day a check confirms it produced what it should, and flags anything missing.',
    href: '/engineering#operate',
    link: 'How it is checked',
  },
  {
    title: 'Each month you see what it cost and what it brought in.',
    how: 'One report: how much it was used, what it found, what came of it, and what it cost to run.',
    href: '/value#return',
    link: 'How the return is measured',
  },
];

export function TrustSection() {
  return (
    <PageFrame aria-label="Why you can trust it" className="cf-dots">
      <SectionBand left="Why you can trust it" right="In charge · Checked · Measured" />
      <div className="px-5 pt-10 md:px-10 md:pt-14">
        <h2 className="font-display max-w-[24ch] text-balance text-[clamp(28px,2.6vw,46px)] leading-[1.12] font-medium">
          People stay in charge, and you see{' '}
          <em className="text-cobalt italic">the results every month.</em>
        </h2>
      </div>
      <div className="mt-8 grid border-t border-hairline lg:grid-cols-3">
        {PROMISES.map((item, index) => (
          <div
            key={item.href}
            className={`flex flex-col border-b border-hairline px-5 py-8 last:border-b-0 md:px-10 lg:border-b-0 lg:py-10 ${
              index < PROMISES.length - 1 ? 'lg:border-r' : ''
            }`}
          >
            <p className="font-display text-balance text-[clamp(21px,1.6vw,26px)] leading-[1.25] font-medium">
              {item.title}
            </p>
            <p className="mt-3 grow text-[16px] leading-relaxed text-ink/75">{item.how}</p>
            <ArrowLink href={item.href} size="sm" className="mt-6">
              {item.link}
            </ArrowLink>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
