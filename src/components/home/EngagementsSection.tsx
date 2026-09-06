import { BookCallButton } from '@/components/functional/BookCallButton';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

interface Engagement {
  index: string;
  product: string;
  stage: string;
  price: Array<{ text: string; unit?: boolean; connector?: boolean }>;
  meta: string;
  description: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    index: '01',
    product: 'Forge Diagnostic',
    stage: 'Diagnose',
    price: [{ text: '2' }, { text: 'wks', unit: true }],
    meta: 'Fixed fee · one workflow',
    description:
      'Two weeks to map the workflow, size the opportunity, and prove the system is viable before you build.',
  },
  {
    index: '02',
    product: 'Forge Sprint',
    stage: 'Build',
    price: [
      { text: '10' },
      { text: 'to', connector: true },
      { text: '14' },
      { text: 'wks', unit: true },
    ],
    meta: 'Scoped in the Diagnostic',
    description:
      'From kickoff to a live production system, built into the workflow your team already runs.',
  },
  {
    index: '03',
    product: 'Forge Scale · Forge Run',
    stage: 'Run',
    price: [{ text: '70' }, { text: '%', unit: true }],
    meta: 'Weekly-active bar by day 90 · monthly',
    description:
      'A named operator, a weekly working cadence, and a live adoption scoreboard. After the build, managed operations run as a monthly retainer, scoped to the system.',
  },
];

function PriceFigure({ price }: { price: Engagement['price'] }) {
  return (
    <p className="tnum mt-5 text-[clamp(56px,4.6vw,88px)] leading-none font-light tracking-tight">
      {price.map((part) => {
        if (part.unit) {
          return (
            <span key={`u-${part.text}`} className="align-top text-[0.45em]">
              {part.text}
            </span>
          );
        }
        if (part.connector) {
          return (
            <span key={`c-${part.text}`} className="text-[0.36em] font-normal text-ink/60">
              {' '}
              {part.text}{' '}
            </span>
          );
        }
        return <span key={`n-${part.text}`}>{part.text}</span>;
      })}
    </p>
  );
}

/**
 * Beat (b): what you get. Diagnose, Build, Run as three parallel columns so
 * the whole offer is visible in one view, with the stage metric as the hero
 * figure. Replaces the earlier full-height alternating layout, which spent
 * roughly three screen-heights on three short paragraphs and carried no CTA.
 * V13: the watermark numerals are cobalt light at 6 percent, not ink at 4.5.
 */
export function EngagementsSection() {
  return (
    <PageFrame id="services" aria-label="What you get">
      <SectionBand left="What you get" right="Diagnose · Build · Run" />
      <div className="grid lg:grid-cols-3">
        {ENGAGEMENTS.map((engagement) => (
          <div
            key={engagement.index}
            className="relative overflow-hidden border-b border-hairline px-5 py-10 last:border-b-0 md:px-8 lg:border-r lg:border-b-0 lg:py-14 lg:last:border-r-0"
          >
            <span
              aria-hidden="true"
              data-num={engagement.index}
              className="font-display tnum pointer-events-none absolute -top-2 right-2 text-[clamp(150px,9vw,190px)] leading-none text-cobalt/6 select-none before:content-[attr(data-num)]"
            />
            <div className="relative">
              <p className="tnum text-[12px] tracking-[0.18em] text-ink/60 uppercase">
                {engagement.index} / {engagement.product}
              </p>
              <h2 className="font-display mt-2 text-[28px] md:text-[32px]">{engagement.stage}</h2>
              <PriceFigure price={engagement.price} />
              <p className="tnum mt-3 text-[12px] tracking-[0.14em] text-ink/60 uppercase">
                {engagement.meta}
              </p>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/80">
                {engagement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 border-t border-hairline px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
          Every engagement starts the same way: a fixed-fee diagnostic that maps one workflow and
          prices the build before you commit.
        </p>
        <BookCallButton size="lg" />
      </div>
    </PageFrame>
  );
}
