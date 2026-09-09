import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { GapPair } from '@/components/ui/GapPair';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';
import { CASE_STUDIES } from '@/data/case-studies';
import { PE_FAQS } from '@/data/faqs';
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
    eyebrow: 'Every company on one model',
    detail:
      'Every company you choose, assessed on one model, so the outputs are comparable instead of a stack of unrelated reports.',
  },
  {
    step: '02',
    name: 'Diagnostic multipack',
    eyebrow: 'Fixed fee per company',
    detail:
      'A fixed-fee two-week diagnostic per company. Each one ends with a scoped, priced build plan.',
  },
  {
    step: '03',
    name: 'Build where it pays',
    eyebrow: '10 to 14 weeks per build',
    detail:
      '10 to 14 weeks from kickoff to a system running inside the workflow the operating team already uses.',
  },
  {
    step: '04',
    name: 'Sponsor scoreboard',
    eyebrow: 'Reported to the operating team',
    detail:
      'Weekly-active adoption per company, reported to the operating team. The target is 70 percent by day 90.',
  },
];

interface LedgerRowProps {
  /** The ledger mark. Decorative: the eyebrow beside it already names the step. */
  marker: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  /** Omit the bottom rule on the last row of a run. */
  rule?: boolean;
}

/**
 * One row of the register: the ledger mark set large and quiet on the
 * left, the step and its conclusion in the middle, the detail across a
 * vertical hairline on the right. The mark is aria-hidden because the
 * eyebrow beside it carries the same step number as real text.
 */
function LedgerRow({ marker, eyebrow, title, children, rule = true }: LedgerRowProps) {
  return (
    <div
      className={`grid items-start gap-x-8 gap-y-5 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[minmax(120px,0.55fr)_1.45fr_2fr] lg:gap-x-12 ${
        rule ? 'border-b border-hairline' : ''
      }`}
    >
      <p
        aria-hidden="true"
        className="font-display tnum text-[clamp(64px,7vw,110px)] leading-[0.85] font-medium text-ink/15 select-none"
      >
        {marker}
      </p>
      <div>
        <p className="tnum text-[12px] tracking-[0.16em] text-ink/70 uppercase">{eyebrow}</p>
        <div className="mt-3">{title}</div>
      </div>
      <div className="lg:border-l lg:border-hairline lg:pl-12">{children}</div>
    </div>
  );
}

export default function PrivateEquityPage() {
  const caseC = CASE_STUDIES[2];

  return (
    <>
      <script {...JsonLdScriptProps(faqJsonLd(PE_FAQS))} />

      {/* Hero: full-bleed dark title block (pe-monoliths.jpg plate), with the
          register indexed on the right so the page announces its own spine. */}
      <section aria-label="AI for private equity" className="cf-dark-band overflow-clip">
        <Plate src="/renders/pe-monoliths.jpg" position="55% 50%" overlay="strong-right" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <div aria-hidden="true" className="cf-scrim-right pointer-events-none absolute inset-0" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Private equity"
            right={'Portfolio‑wide · Sponsor‑visible'}
          />
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
            <div className="flex flex-col justify-center border-t border-hairline-ghost px-5 py-8 md:px-10 md:py-14 lg:border-t-0">
              <p className="text-[12px] tracking-[0.16em] text-ghost uppercase">The register</p>
              <ol className="mt-5">
                {SEQUENCE.map((item) => (
                  <li
                    key={item.step}
                    className="flex items-baseline gap-4 border-b border-hairline-ghost py-3 last:border-b-0"
                  >
                    <span className="tnum text-[12px] tracking-[0.16em] text-cobalt-bright">
                      {item.step}
                    </span>
                    <span className="text-[13px] tracking-[0.1em] text-ghost uppercase">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* The register opens: steps 01 and 02 */}
      <PageFrame aria-label="How portfolio work runs">
        <SectionBand left="How it runs" right="One model · Pricing scoped with the sponsor" />
        {SEQUENCE.slice(0, 2).map((item) => (
          <LedgerRow
            key={item.step}
            marker={item.step}
            eyebrow={`Step ${item.step} · ${item.eyebrow}`}
            title={
              <h2 className="font-display text-balance text-[clamp(26px,2.4vw,40px)] leading-[1.15] font-medium">
                {item.name}
              </h2>
            }
          >
            <p className="max-w-[52ch] text-[16px] leading-relaxed text-ink/75">{item.detail}</p>
          </LedgerRow>
        ))}
      </PageFrame>

      {/* The interruption: the sourced sponsor gap, in the page's dark room */}
      <PageFrame aria-label="The sponsor gap" tone="dark">
        <SectionBand tone="dark" left="The gap" right="Third-party research" />
        <div className="grid lg:grid-cols-[1fr_minmax(260px,0.42fr)]">
          <div className="border-b border-hairline-ghost px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
            <GapPair tone="dark" size="lg" eyebrow={false} />
            <p className="mt-9 max-w-[54ch] text-[16px] leading-relaxed text-ghost/85">
              The mandate is already in place across the industry. Execution inside the operating
              companies is where it stalls. That is the gap this work closes.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1">
            <div className="border-r border-hairline-ghost px-5 py-8 md:px-10 md:py-10 lg:border-r-0 lg:border-b">
              <Stat
                tone="dark"
                size="sm"
                value={
                  <>
                    70<span className="align-top text-[0.5em]">%</span>
                  </>
                }
                label="Weekly-active adoption target by day 90, reported per company"
              />
            </div>
            <div className="px-5 py-8 md:px-10 md:py-10">
              <Stat
                tone="dark"
                size="sm"
                value={
                  <>
                    2<span className="ml-1 align-top text-[0.34em] tracking-normal">wks</span>
                  </>
                }
                label="Fixed-fee diagnostic per company, scoped build plan at the end"
              />
            </div>
          </div>
        </div>
      </PageFrame>

      {/* The register resumes: steps 03 and 04, then the case that ran it */}
      <PageFrame aria-label="The register, continued" className="cf-dots">
        <SectionBand left="The register, continued" right="Through to the scoreboard" />
        {SEQUENCE.slice(2).map((item) => (
          <LedgerRow
            key={item.step}
            marker={item.step}
            eyebrow={`Step ${item.step} · ${item.eyebrow}`}
            title={
              <h2 className="font-display text-balance text-[clamp(26px,2.4vw,40px)] leading-[1.15] font-medium">
                {item.name}
              </h2>
            }
          >
            <p className="max-w-[52ch] text-[16px] leading-relaxed text-ink/75">{item.detail}</p>
          </LedgerRow>
        ))}

        <div className="relative transition-colors hover:bg-white">
          <LedgerRow
            marker="C"
            eyebrow={`Case C · A PE operating team · ${caseC.scopeTag}`}
            rule={false}
            title={
              <h2 className="font-display max-w-[22ch] text-balance text-[clamp(26px,2.4vw,40px)] leading-[1.15] font-medium">
                {caseC.headline}
              </h2>
            }
          >
            <div className="grid grid-cols-3 gap-6">
              {caseC.metrics.map((metric) => (
                <Stat key={metric.label} size="sm" value={metric.value} label={metric.label} />
              ))}
            </div>
            <div className="mt-8">
              <ArrowLink
                href={`/proof/${caseC.slug}`}
                size="sm"
                className="after:absolute after:inset-0"
              >
                Read the case study
              </ArrowLink>
            </div>
          </LedgerRow>
        </div>
      </PageFrame>

      {/* Common questions: the second dark room, answers on the page rather
          than behind a disclosure, so a sponsor can scan all six at once. */}
      <PageFrame aria-label="Common questions" tone="dark">
        <SectionBand
          tone="dark"
          left="Common questions"
          right="For sponsors and operating partners"
        />
        <dl className="grid lg:grid-cols-2">
          {PE_FAQS.map((faq, index) => (
            <div
              key={faq.question}
              className={`border-b border-hairline-ghost px-5 py-8 md:px-10 md:py-10 ${
                index % 2 === 0 ? 'lg:border-r' : ''
              } ${index >= PE_FAQS.length - 2 ? 'lg:border-b-0' : ''}`}
            >
              <dt className="max-w-[46ch] text-[17px] leading-snug font-semibold text-ghost">
                {faq.question}
              </dt>
              <dd className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ghost/80">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
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
