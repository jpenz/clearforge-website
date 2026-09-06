import type { Metadata } from 'next';
import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { Container } from '@/components/ui/Container';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
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
      'Weekly-active adoption per company, reported to the operating team. The bar is 70 percent by day 90.',
  },
];

export default function PrivateEquityPage() {
  return (
    <>
      <script {...JsonLdScriptProps(faqJsonLd(PE_FAQS))} />

      {/* Hero: full-bleed dark title block (pe-monoliths.jpg plate) */}
      <section aria-label="AI for private equity" className="cf-dark-band overflow-hidden">
        {/* Plate slot: next/image back plate + legibility overlay go here, before the aurora. */}
        <div aria-hidden="true" className="cf-aurora-b" />
        <Container gutter="cells" className="relative">
          <SectionBand tone="dark" left="Private equity" right="Portfolio-wide - Sponsor-visible" />
          <div className="grid lg:grid-cols-[1fr_420px]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[20ch] text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                AI across the portfolio,{' '}
                <em className="text-cobalt-bright italic">not a pilot graveyard.</em>
              </h1>
              <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-ghost/80">
                One diagnostic model across the companies you choose, systems built where they pay,
                and weekly-active adoption reported back to the operating team.
              </p>
            </div>
            <div className="flex flex-col justify-end px-5 py-8 md:px-10 md:py-14">
              <p className="text-[11px] tracking-[0.18em] text-ghost/55 uppercase">Start here</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ghost/80">
                Thirty minutes with the founder. Bring one portfolio company and we will map where a
                system would pay first.
              </p>
              <BookCallButton size="lg" className="mt-6 self-start" />
            </div>
          </div>
        </Container>
      </section>

      {/* The sponsor gap: the sourced, citable anchor */}
      <PageFrame aria-label="The sponsor gap">
        <SectionBand left="The gap" right="Third-party research" />
        <div className="grid lg:grid-cols-[380px_1fr]">
          <div className="flex items-center border-b border-hairline px-5 py-10 md:px-10 lg:border-r lg:border-b-0">
            <p className="font-display text-[clamp(86px,7vw,130px)] leading-none">
              {PE_PACK.stat.value}
              <span className="align-top text-[0.42em]">%</span>
            </p>
          </div>
          <div className="px-5 py-10 md:px-10">
            <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink/80">
              {PE_PACK.stat.text}
            </p>
            <p className="tnum mt-5 text-[11px] tracking-[0.14em] text-ink/50 uppercase">
              {PE_PACK.stat.source}
            </p>
            <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-ink/70">
              The mandate is not the constraint. Execution inside the operating companies is. That
              is the gap this work closes.
            </p>
          </div>
        </div>
      </PageFrame>

      {/* The sequence */}
      <PageFrame aria-label="How portfolio work runs">
        <SectionBand left="How it runs" right="4 steps - one model" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {SEQUENCE.map((item) => (
            <div
              key={item.step}
              className="border-b border-hairline px-5 py-8 md:px-8 lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <p className="tnum text-[11px] tracking-[0.18em] text-cobalt uppercase">
                {item.step}
              </p>
              <h2 className="font-display mt-3 text-[22px] md:text-[24px]">{item.name}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{item.detail}</p>
            </div>
          ))}
        </div>
      </PageFrame>

      {/* Proof */}
      <PageFrame aria-label="Portfolio proof">
        <SectionBand left="Proof" right="Anonymized client, real numbers" />
        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="border-hairline px-5 py-10 md:px-10 lg:border-r">
            <p className="tnum text-[11px] tracking-[0.18em] text-ink/50 uppercase">
              Case C - a PE operating team
            </p>
            <h2 className="font-display mt-3 max-w-[24ch] text-[clamp(30px,3vw,56px)] leading-[1.1]">
              A portfolio-wide AI diagnostic. They left with{' '}
              <em className="text-cobalt italic">a prioritized execution plan.</em>
            </h2>
            <Link
              href="/proof/pe-portfolio-diagnostic"
              className="mt-6 inline-block text-[14px] font-semibold text-cobalt underline underline-offset-4"
            >
              Read the case study
            </Link>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1">
            {[
              { n: '3', l: 'Companies assessed on one model' },
              { n: '8', l: 'Priority plays selected' },
              { n: '12', l: 'Month execution plan' },
            ].map((m) => (
              <div
                key={m.l}
                className="border-t border-hairline px-5 py-6 md:px-8 lg:border-t lg:first:border-t-0"
              >
                <p className="font-display text-[40px] leading-none md:text-[46px]">{m.n}</p>
                <p className="mt-2 text-[12px] leading-snug text-ink/60">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </PageFrame>

      {/* What the sponsor gets */}
      <PageFrame aria-label="The PE Portfolio Pack">
        <SectionBand left={PE_PACK.title} right="Scoped with the sponsor" />
        <div className="grid lg:grid-cols-2">
          <div className="border-hairline px-5 py-10 md:px-10 lg:border-r">
            <ul>
              {PE_PACK.points.map((point, index) => (
                <li
                  key={point}
                  className="flex items-baseline gap-5 border-b border-hairline py-4 last:border-b-0"
                >
                  <span className="tnum text-[12px] text-cobalt">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[16px] text-ink/85">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-ink/60">{PE_PACK.priceNote}</p>
          </div>
          <div className="px-5 py-10 md:px-10">
            <p className="text-[11px] tracking-[0.18em] text-ink/50 uppercase">Common questions</p>
            <div className="mt-4">
              <FaqAccordion items={PE_FAQS} />
            </div>
          </div>
        </div>
      </PageFrame>

      {/* Close */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="30 minutes - no preparation" />
        <div className="flex flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-display max-w-[30ch] text-[clamp(30px,3vw,56px)] leading-[1.1]">
            Bring one portfolio company.{' '}
            <em className="text-cobalt italic">We will map it live.</em>
          </p>
          <BookCallButton size="lg" />
        </div>
      </PageFrame>
    </>
  );
}
