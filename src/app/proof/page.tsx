import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';
import { BLUEPRINTS } from '@/data/blueprints';
import { CASE_STUDIES } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Proof',
  description:
    'Case studies with real numbers and anonymized clients: 1,181 qualified opportunities across 3 divisions in 6 months, a commercial pipeline rebuilt from zero, a portfolio-wide AI diagnostic.',
};

const FUNNEL = [
  { stage: 'Stage 1', value: 42, label: 'Targets identified' },
  { stage: 'Stage 2', value: 31, label: 'Contacted' },
  { stage: 'Stage 3', value: 18, label: 'Quoted' },
  { stage: 'Stage 4', value: 7, label: 'Recurring accounts won', accent: true },
];

export default function ProofPage() {
  const [caseA, caseB, caseC] = CASE_STUDIES;
  const [primary, ...secondary] = caseA.metrics;

  return (
    <>
      {/* Intro: full-bleed dark title block (proof-threads.jpg plate, braid to the right) */}
      <section aria-label="Proof introduction" className="cf-dark-band overflow-clip">
        <Plate src="/renders/proof-threads.jpg" position="88% 45%" overlay="strong-right" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand tone="dark" left="Proof" right="Real numbers · Anonymized clients" />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[22ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                The numbers are the <em className="text-cobalt-bright italic">case study.</em>
              </h1>
              <p className="mt-5 text-[16px] leading-relaxed text-ghost/80">
                Client names are anonymized. The results are not.
              </p>
            </div>
            <div className="flex flex-col justify-end border-t border-hairline-ghost px-5 py-8 md:px-10 md:py-14 lg:border-t-0">
              <p className="text-[12px] tracking-[0.16em] text-ghost/75 uppercase">Three cases</p>
              <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ghost/80">
                A commercial pipeline built from signals, one rebuilt from zero, and a portfolio
                diagnostic for a sponsor.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Case A */}
      <PageFrame id="case-studies" aria-label="Case A">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="tnum text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case A · $4B industrial conglomerate
          </p>
          <span className="tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase">6 months</span>
        </div>
        <div className="grid lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <Stat size="lg" value={primary.value} label={primary.label} />
            <div className="mt-auto pt-8">
              <ArrowLink href={`/proof/${caseA.slug}`}>Read the case study</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-hairline px-5 py-4 md:px-8">
              <span className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">
                Secondary figures
              </span>
            </div>
            {secondary.map((metric, index) => (
              <div
                key={metric.label}
                className={`flex grow flex-col justify-center px-5 py-6 md:px-8 md:py-8 ${
                  index < secondary.length - 1 ? 'border-b border-hairline' : ''
                }`}
              >
                <Stat size="sm" value={metric.value} label={metric.label} />
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Case B */}
      <PageFrame aria-label="Case B">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case B · Home and commercial services firm
          </p>
          <span className="tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase">
            {caseB.scopeTag}
          </span>
        </div>
        <div className="grid lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[16ch] text-balance text-[28px] leading-[1.2] font-medium md:text-[34px]">
              Commercial pipeline rebuilt from zero.
            </h2>
            <div className="mt-auto pt-8">
              <ArrowLink href={`/proof/${caseB.slug}`}>Read the case study</ArrowLink>
            </div>
          </div>
          <div className="grid md:grid-cols-4 md:divide-x md:divide-hairline">
            {FUNNEL.map((item) => (
              <div
                key={item.stage}
                className="flex flex-col justify-between gap-6 border-b border-hairline px-5 py-6 md:gap-8 md:border-b-0 md:px-7 md:py-12"
              >
                <p className="tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                  {item.stage}
                </p>
                <div>
                  <Stat value={String(item.value)} label={item.label} accent={item.accent} />
                  <div aria-hidden="true" className="mt-4 h-[3px] w-full bg-hairline">
                    <div
                      className={`h-full ${item.accent ? 'bg-cobalt' : 'bg-ink'}`}
                      style={{ width: `${(item.value / FUNNEL[0].value) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Case C */}
      <PageFrame aria-label="Case C">
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:px-10">
          <p className="text-[12px] font-medium tracking-[0.14em] text-ink/70 uppercase">
            Case C · PE operating team
          </p>
          <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
            Scope · {caseC.scopeTag}
          </span>
        </div>
        <div className="grid lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <p className="font-display max-w-[30ch] text-balance text-[28px] leading-[1.3] font-medium md:text-[34px]">
              {caseC.headline} <em className="text-cobalt italic">{caseC.headlineEmphasis}</em>
            </p>
            <div className="mt-auto pt-8">
              <ArrowLink href={`/proof/${caseC.slug}`}>Read the case study</ArrowLink>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1">
            {caseC.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`px-5 py-6 md:px-8 lg:py-6 ${
                  index > 0 ? 'lg:border-t lg:border-hairline' : ''
                }`}
              >
                <Stat size="sm" value={metric.value} label={metric.label} />
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Build patterns */}
      <PageFrame id="build-patterns" aria-label="Build patterns">
        <SectionBand left="Build patterns" right="Illustrative names, not delivered systems" />
        <div className="grid md:grid-cols-2">
          {BLUEPRINTS.map((blueprint, index) => (
            <div
              key={blueprint.name}
              className={`px-5 py-5 md:px-10 md:py-6 ${
                index % 2 === 0 ? 'md:border-r md:border-hairline' : ''
              } ${
                index < BLUEPRINTS.length - (BLUEPRINTS.length % 2 === 0 ? 2 : 1)
                  ? 'border-b border-hairline'
                  : 'max-md:border-b max-md:border-hairline max-md:last:border-b-0'
              }`}
            >
              <p className="text-[14px] font-semibold">{blueprint.name}</p>
              <p className="mt-1 text-[13px] text-ink/70">{blueprint.description}</p>
            </div>
          ))}
        </div>
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed fee · 2 weeks" />
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="font-display text-balance text-[clamp(30px,3vw,56px)] leading-[1.1] font-medium">
            Start with the fixed-fee <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
