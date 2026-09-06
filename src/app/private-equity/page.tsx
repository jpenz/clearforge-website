import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { GapPair } from '@/components/ui/GapPair';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';
import { CASE_STUDIES } from '@/data/case-studies';
import { PE_FAQS } from '@/data/faqs';
import { PE_PACK } from '@/data/services';
import { faqJsonLd, JsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI for PE Portfolio Companies',
  description:
    'One diagnostic model across the portfolio, systems built into the companies that need them, and weekly-active adoption reported to the sponsor. Built for PE operating teams.',
  alternates: { canonical: '/private-equity' },
};

const SEQUENCE = [
  {
    step: '01',
    name: 'Portfolio scan',
    detail:
      'Every company you choose, assessed on one model, so the outputs are comparable instead of a stack of unrelated reports.',
  },
  {
    step: '02',
    name: 'Diagnostic multipack',
    detail:
      'A fixed-fee two-week diagnostic per company. Each one ends with a scoped, priced build plan.',
  },
  {
    step: '03',
    name: 'Build where it pays',
    detail:
      '10 to 14 weeks from kickoff to a system running inside the workflow the operating team already uses.',
  },
  {
    step: '04',
    name: 'Sponsor scoreboard',
    detail:
      'Weekly-active adoption per company, reported to the operating team. The target is 70 percent by day 90.',
  },
];

export default function PrivateEquityPage() {
  const caseC = CASE_STUDIES[2];

  return (
    <>
      <script {...JsonLdScriptProps(faqJsonLd(PE_FAQS))} />

      {/* Hero: full-bleed dark title block (pe-monoliths.jpg plate) */}
      <section aria-label="AI for private equity" className="cf-dark-band overflow-clip">
        <Plate src="/renders/pe-monoliths.jpg" position="55% 50%" overlay="strong-right" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand tone="dark" left="Private equity" right="Portfolio-wide · Sponsor-visible" />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[20ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                AI across the portfolio, not a{' '}
                <em className="text-cobalt-bright italic">pilot graveyard.</em>
              </h1>
              <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-ghost/80">
                One diagnostic model across the companies you choose, systems built where they pay,
                and weekly-active adoption reported back to the operating team.
              </p>
            </div>
            <div className="flex flex-col justify-end px-5 py-8 md:px-10 md:py-14">
              <p className="text-[12px] tracking-[0.16em] text-ghost/75 uppercase">Start here</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ghost/80">
                Thirty minutes with the founder. Bring one portfolio company and we will map where a
                system would pay first.
              </p>
              <BookCallButton size="lg" className="mt-6 self-start" />
            </div>
          </div>
        </Container>
      </section>

      {/* The sequence */}
      <PageFrame aria-label="How portfolio work runs">
        <SectionBand left="How it runs" right="One model · Pricing scoped with the sponsor" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {SEQUENCE.map((item) => (
            <div
              key={item.step}
              className="border-b border-hairline px-5 py-8 md:px-8 md:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <p className="tnum text-[12px] tracking-[0.16em] text-cobalt uppercase">
                {item.step}
              </p>
              <h2 className="font-display mt-3 text-[22px] md:text-[24px]">{item.name}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{item.detail}</p>
            </div>
          ))}
        </div>
      </PageFrame>

      {/* The sponsor gap: the sourced, citable anchor, in the page's one dark room */}
      <PageFrame aria-label="The sponsor gap" tone="dark">
        <SectionBand tone="dark" left="The gap" right="Third-party research" />
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-hairline-ghost px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
            <GapPair tone="dark" eyebrow={false} />
          </div>
          <div className="flex flex-col justify-center px-5 py-10 md:px-10 md:py-14">
            <p className="tnum max-w-[62ch] text-[17px] leading-relaxed text-ghost/85">
              {PE_PACK.stat.text}
            </p>
            <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-ghost/75">
              The mandate is not the constraint. Execution inside the operating companies is. That
              is the gap this work closes.
            </p>
          </div>
        </div>
      </PageFrame>

      {/* Proof: Case C, the same three scope figures /proof shows */}
      <PageFrame aria-label="Portfolio proof">
        <SectionBand left="Proof" right="Scope · Anonymized client" />
        <div className="grid lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-10 md:px-10 lg:border-r lg:border-b-0">
            <p className="tnum text-[12px] tracking-[0.16em] text-ink/70 uppercase">
              Case C · A PE operating team
            </p>
            <h2 className="font-display mt-3 max-w-[24ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.1]">
              {caseC.headline} <em className="text-cobalt italic">{caseC.headlineEmphasis}</em>
            </h2>
            <div className="mt-auto pt-6">
              <ArrowLink href={`/proof/${caseC.slug}`} size="sm">
                Read the case study
              </ArrowLink>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1">
            {caseC.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`px-5 py-6 md:px-8 ${index > 0 ? 'lg:border-t lg:border-hairline' : ''}`}
              >
                <Stat size="sm" value={metric.value} label={metric.label} />
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* Common questions, at full width */}
      <PageFrame aria-label="Common questions">
        <SectionBand left="Common questions" right="For sponsors and operating partners" />
        <div className="px-5 py-8 md:px-10">
          <FaqAccordion items={PE_FAQS} />
        </div>
      </PageFrame>

      {/* Close */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="30 minutes · No preparation" />
        <div className="flex flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-display max-w-[30ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.1]">
            Bring one portfolio company.{' '}
            <em className="text-cobalt italic">We will map it live.</em>
          </p>
          <BookCallButton size="lg" />
        </div>
      </PageFrame>
    </>
  );
}
