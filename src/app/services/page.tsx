import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { GapPair } from '@/components/ui/GapPair';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import { offeringId, PE_PACK, SERVICE_STAGES } from '@/data/services';
import { JsonLdScriptProps, servicesJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'One catalog, four stages: Diagnose, Build, Adopt, Run. Engagements start with a fixed-fee two-week diagnostic and are scoped before any build.',
};

export default function ServicesPage() {
  return (
    <>
      <script {...JsonLdScriptProps(servicesJsonLd())} />
      {/* Intro band: full-bleed dark title block (services-anvil.jpg plate) */}
      <section aria-label="Services introduction" className="cf-dark-band overflow-clip">
        <Plate src="/renders/services-anvil.jpg" position="55% 40%" overlay="strong-right" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Services"
            right="One catalog · Four stages · Scoped before you commit"
          />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[20ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                Every engagement starts with a <span className="whitespace-nowrap">fixed-fee</span>{' '}
                diagnostic and ends with a system your team{' '}
                <em className="text-cobalt-bright italic">uses every week.</em>
              </h1>
            </div>
            <div className="flex flex-col border-t border-hairline-ghost lg:border-t-0">
              <div className="flex grow items-center border-b border-hairline-ghost px-5 py-8 md:px-10 md:py-10">
                <p className="text-[16px] leading-relaxed text-ghost">
                  Diagnose, Build, Adopt, Run. Four stages, one catalog, priced before any build.
                </p>
              </div>
              <div className="px-5 py-6 md:px-10 md:py-8">
                <BookCallButton size="lg" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The journey */}
      <PageFrame aria-label="The journey">
        <SectionBand left="The journey" right="Fixed-fee start" />
        {SERVICE_STAGES.map((stage, stageIndex) => (
          <div
            key={stage.number}
            className={`${stageIndex % 2 === 1 ? 'cf-dots' : ''} ${
              stageIndex < SERVICE_STAGES.length - 1 ? 'border-b border-hairline' : ''
            }`}
          >
            {/* Below md the four stages read as one sequence on a cobalt rail:
                a continuous 1px line with a filled station at each stage and
                the stage's own duration riding the rail. At md and up the
                rail disappears and the two-column journey layout returns. */}
            <div className="relative pr-5 pl-11 md:p-0">
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[27px] w-px bg-cobalt/30 md:hidden"
              />
              <div className="relative flex items-center pt-8 md:hidden">
                <span
                  aria-hidden="true"
                  className="absolute -left-[20px] size-[9px] shrink-0 bg-cobalt"
                />
                <span className="tnum text-[12px] font-semibold tracking-[0.16em] text-ink uppercase">
                  {stage.offerings[0].term}
                </span>
              </div>
              <div className="grid lg:grid-cols-[1fr_2fr]">
                <div className="border-b border-hairline py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
                  <p className="tnum flex items-center gap-3 text-[12px] tracking-[0.16em] text-ink/70 uppercase">
                    <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
                    Stage {stage.number} · {stage.name}
                  </p>
                  <h2 className="font-display mt-3 max-w-[18ch] text-balance text-[clamp(28px,2.2vw,40px)] leading-[1.15] font-medium">
                    {stage.conclusion}
                  </h2>
                  {stage.link && (
                    <div className="mt-6">
                      <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">
                        Free tool
                      </p>
                      <ArrowLink href={stage.link.href} size="sm" className="mt-2">
                        {stage.link.label}
                      </ArrowLink>
                    </div>
                  )}
                </div>
                <div>
                  {stage.offerings.map((offering, offeringIndex) => (
                    <div
                      key={offering.name}
                      id={offeringId(offering.name)}
                      className={`grid grid-cols-2 gap-3 py-6 md:gap-6 md:px-10 md:py-8 lg:grid-cols-[1fr_180px_180px] ${
                        offeringIndex < stage.offerings.length - 1 ? 'border-b border-hairline' : ''
                      }`}
                    >
                      <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-[18px] font-semibold">{offering.name}</h3>
                        <p className="tnum mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
                          {offering.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">Term</p>
                        <p className="tnum mt-1 text-[18px] font-semibold">{offering.term}</p>
                      </div>
                      <div>
                        <p className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                          Fee basis
                        </p>
                        <p className="tnum mt-1 text-[18px] font-semibold">{offering.feeBasis}</p>
                        <p className="mt-1 text-[14px] leading-snug text-ink/70">
                          {offering.feeNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </PageFrame>

      {/* PE Portfolio Pack */}
      <PageFrame id="pe-portfolio-pack" aria-label="For sponsors" tone="dark">
        <SectionBand tone="dark" left="For sponsors" right="Scoped with the sponsor" />
        <div className="grid lg:grid-cols-2">
          <div className="border-hairline-ghost px-5 py-10 md:px-10 md:py-14 lg:border-r">
            <h2 className="font-display text-balance text-[clamp(30px,3vw,56px)] leading-[1.1] font-medium">
              {PE_PACK.title}
            </h2>
            <div className="mt-8 max-w-[560px] border-t border-hairline-ghost">
              {PE_PACK.points.map((point, index) => (
                <div
                  key={point}
                  className="grid grid-cols-[40px_1fr] gap-4 border-b border-hairline-ghost py-4"
                >
                  <span className="tnum pt-0.5 text-[14px] text-ghost/70">0{index + 1}</span>
                  <p className="text-[15px] text-ghost/85">{point}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px] text-ghost/85">{PE_PACK.priceNote}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <BookCallButton size="lg" />
              <ArrowLink href="/private-equity" tone="dark" size="sm">
                How portfolio work runs
              </ArrowLink>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-hairline-ghost px-5 py-10 md:px-10 md:py-14 lg:border-t-0">
            <GapPair tone="dark" />
          </div>
        </div>
      </PageFrame>

      {/* Closing room */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed fee · 2 weeks" />
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="font-display text-balance text-[clamp(30px,3vw,56px)] leading-[1.1] font-medium">
            Start with the <span className="whitespace-nowrap">fixed-fee</span>{' '}
            <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
