import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

/**
 * What sits under every stage of the catalog: where the value is found,
 * how the system is built, and how the return is measured. Each column is
 * the front door to the page that carries the detail, so the home page
 * states all three in one screen without repeating either page.
 */
const FOUNDATIONS = [
  {
    eyebrow: 'Where it pays',
    title: 'Commercial and performance diligence ranks every AI opportunity by value and return.',
    href: '/value',
    link: 'How we find the value',
  },
  {
    eyebrow: 'How it is built',
    title:
      'Forward-deployed engineers build each system inside your team, to a production standard you can inspect.',
    href: '/engineering',
    link: 'The engineering standard',
  },
  {
    eyebrow: 'What it returned',
    title: 'A scoreboard built into each system reports use, quality, results and running cost.',
    href: '/value#return',
    link: 'How the return is measured',
  },
];

export function FoundationsBand() {
  return (
    <PageFrame aria-label="Under every engagement" className="cf-dots">
      <SectionBand left="Under every engagement" right="Value · Engineering · Return" />
      <div className="grid lg:grid-cols-3">
        {FOUNDATIONS.map((item, index) => (
          <div
            key={item.href}
            className={`flex flex-col border-b border-hairline px-5 py-10 md:px-10 lg:border-b-0 lg:py-14 ${
              index < FOUNDATIONS.length - 1 ? 'lg:border-r' : ''
            }`}
          >
            <p className="tnum text-[12px] tracking-[0.16em] text-ink/70 uppercase">
              {item.eyebrow}
            </p>
            <h2 className="font-display mt-3 max-w-[26ch] grow text-balance text-[clamp(22px,1.7vw,28px)] leading-[1.2] font-medium">
              {item.title}
            </h2>
            <ArrowLink href={item.href} size="sm" className="mt-6">
              {item.link}
            </ArrowLink>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
