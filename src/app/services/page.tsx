import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { BookingStrip } from '@/components/ui/BookingStrip';
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
        <Plate src="/renders/services-anvil.jpg" position="60% 62%" overlay="strong-right" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Services"
            right="The journey: Diagnose, Build, Adopt, Run"
          />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[18ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                One catalog. Four stages. Scoped{' '}
                <em className="text-cobalt-bright italic">before you commit.</em>
              </h1>
            </div>
            <div className="flex flex-col border-t border-hairline-ghost lg:border-t-0">
              <div className="flex grow items-center border-b border-hairline-ghost px-5 py-8 md:px-10 md:py-10">
                <p className="text-[16px] leading-relaxed text-ghost/80">
                  Every engagement starts with a{' '}
                  <span className="font-semibold text-ghost">fixed-fee diagnostic</span> and ends
                  with a system your team uses every week.
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
            className={`grid lg:grid-cols-[1fr_2fr] ${
              stageIndex < SERVICE_STAGES.length - 1 ? 'border-b border-hairline' : ''
            }`}
          >
            <div className="border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
              <p className="tnum flex items-center gap-3 text-[12px] tracking-[0.16em] text-ink/70 uppercase">
                <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
                Stage {stage.number} · {stage.name}
              </p>
              <h2 className="font-display mt-3 max-w-[18ch] text-balance text-[clamp(26px,2.2vw,40px)] leading-[1.15] font-medium">
                {stage.conclusion}
              </h2>
              <p className="tnum mt-4 max-w-[32ch] text-[15px] leading-relaxed text-ink/70">
                {stage.description}
              </p>
              {stage.link && (
                <div className="mt-6">
                  <p className="text-[12px] tracking-[0.16em] text-ink/70 uppercase">Free tool</p>
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
                  className={`grid gap-2 px-5 py-6 md:gap-6 md:px-10 md:py-8 lg:grid-cols-[1fr_240px_160px] ${
                    offeringIndex < stage.offerings.length - 1 ? 'border-b border-hairline' : ''
                  }`}
                >
                  <div>
                    <h3 className="text-[17px] font-semibold">{offering.name}</h3>
                    <p className="tnum mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
                      {offering.description}
                    </p>
                  </div>
                  <p className="tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase lg:pt-1.5">
                    {offering.meta}
                  </p>
                  <p className="tnum text-[18px] font-semibold lg:pt-0.5 lg:text-right">
                    {offering.price}
                  </p>
                </div>
              ))}
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
                  <span className="tnum pt-0.5 text-[13px] text-ghost/70">0{index + 1}</span>
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
            <p className="tnum mt-8 max-w-[62ch] text-[15px] leading-relaxed text-ghost/85">
              {PE_PACK.stat.text}
            </p>
          </div>
        </div>
      </PageFrame>

      {/* Closing strip */}
      <BookingStrip
        headline={
          <>
            The first step is a fixed fee. <em className="text-cobalt italic">2 weeks.</em>
          </>
        }
      />
    </>
  );
}
