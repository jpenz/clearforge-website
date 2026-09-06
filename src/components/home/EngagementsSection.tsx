import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { offeringId, SERVICE_STAGES } from '@/data/services';

interface Figure {
  parts: Array<{ text: string; unit?: boolean; connector?: boolean }>;
  meta: string;
}

/**
 * The home figure for each stage. Every number here is in the catalog data
 * already: two weeks, ten to fourteen weeks, the 70 percent target. Run has
 * no number, so it has no display slot: a billing cadence set at 72px in a
 * numeral rail reads as a fourth measurement, and nothing is invented to
 * fill the hole. Its eyebrow carries the cadence instead.
 */
const FIGURES: Record<string, Figure> = {
  '01': { parts: [{ text: '2' }, { text: 'wks', unit: true }], meta: 'Fixed fee · one workflow' },
  '02': {
    parts: [
      { text: '10' },
      { text: 'to', connector: true },
      { text: '14' },
      { text: 'wks', unit: true },
    ],
    meta: 'Scoped in the Diagnostic',
  },
  '03': {
    parts: [{ text: '70' }, { text: '%', unit: true }],
    meta: 'Weekly-active target by day 90',
  },
  '04': { parts: [], meta: 'Monthly · Per system · After the build' },
};

function StageFigure({ parts }: { parts: Figure['parts'] }) {
  return (
    <p className="tnum mt-5 text-[clamp(48px,3.8vw,72px)] leading-none font-light tracking-tight">
      {parts.map((part) => {
        if (part.unit) {
          return (
            <span key={`u-${part.text}`} className="align-top text-[0.45em]">
              {part.text}
            </span>
          );
        }
        if (part.connector) {
          return (
            <span key={`c-${part.text}`} className="text-[0.36em] font-normal text-ink/70">
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
 * Beat (b): what you get. The catalog's four stages (Diagnose, Build, Adopt,
 * Run) as four parallel columns from the same data /services and /about
 * read, named the way /services names them (01 · Diagnose) so a reader
 * holds one four-item chunk instead of two vocabularies. Each eyebrow is
 * the path into that stage's row in the catalog; the band closes on the way
 * to the whole catalog.
 */
export function EngagementsSection() {
  return (
    <PageFrame id="services" aria-label="Services">
      <SectionBand left="Services" right="Diagnose · Build · Adopt · Run" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {SERVICE_STAGES.map((stage) => {
          const figure = FIGURES[stage.number];
          const product = stage.offerings[0].name;
          return (
            <div
              key={stage.number}
              className="border-b border-hairline px-5 py-10 md:px-10 md:odd:border-r lg:border-r lg:border-b-0 lg:py-14 lg:last:border-r-0"
            >
              <Link
                href={`/services#${offeringId(product)}`}
                className="tnum inline-block text-[12px] tracking-[0.16em] text-ink/70 uppercase transition-colors hover:text-cobalt"
              >
                {stage.number} · {stage.name}
              </Link>
              <h2 className="font-display mt-3 text-balance text-[clamp(22px,1.7vw,28px)] leading-[1.2] font-medium">
                {stage.conclusion}
              </h2>
              {figure && figure.parts.length > 0 && <StageFigure parts={figure.parts} />}
              {figure && (
                <p
                  className={`tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase ${
                    figure.parts.length > 0 ? 'mt-3' : 'mt-5'
                  }`}
                >
                  {figure.meta}
                </p>
              )}
              <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink/80">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 border-t border-hairline px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <ArrowLink href="/services">See the full catalog</ArrowLink>
        <BookCallButton size="lg" />
      </div>
    </PageFrame>
  );
}
