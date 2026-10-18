import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { LedgerRow } from '@/components/ui/LedgerRow';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';
import { CASE_STUDIES } from '@/data/case-studies';
import { RETURN_CLOSE, RETURN_MEASURES, RETURN_TITLE, VALUE_FAQS, VALUE_STEPS } from '@/data/value';
import { faqJsonLd, JsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Value Diligence and ROI Measurement',
  description:
    'Business valuation and commercial and performance diligence that find where AI adds the most earnings, a business case ranked by return, and a scoreboard that measures the return on AI after launch.',
  alternates: { canonical: '/value' },
};

/** The page's own spine, indexed in the hero. */
const REGISTER = [
  { step: '01', name: 'Value the business' },
  { step: '02', name: 'Rank the business case' },
  { step: '03', name: 'Measure the return' },
];

function Points({ points }: { points: string[] }) {
  return (
    <ul className="space-y-4">
      {points.map((point) => (
        <li key={point} className="flex max-w-[56ch] gap-3 text-[16px] leading-relaxed text-ink/80">
          <span aria-hidden="true" className="mt-[10px] size-[6px] shrink-0 bg-cobalt" />
          {point}
        </li>
      ))}
    </ul>
  );
}

export default function ValuePage() {
  const caseA = CASE_STUDIES[0];

  return (
    <>
      <script {...JsonLdScriptProps(faqJsonLd(VALUE_FAQS))} />

      {/* Hero: the governing thought, with the page's three steps indexed
          on the right so the spine is visible before the first scroll. */}
      <section aria-label="Value and return" className="cf-dark-band overflow-clip">
        <Plate
          src="/renders/value-columns.jpg"
          priority
          position="62% 50%"
          overlay="strong-right"
        />
        <div aria-hidden="true" className="cf-aurora-b" />
        <div aria-hidden="true" className="cf-scrim-right pointer-events-none absolute inset-0" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Value and return"
            right={'Diligence · Business case · Scoreboard'}
          />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[22ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                We value your business, find where AI adds the most earnings, and{' '}
                <em className="text-cobalt-bright italic">measure the return.</em>
              </h1>
              <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-ghost/80">
                You have been told to use AI. The hard part is knowing where it pays, and proving
                that it did.
              </p>
              <div className="mt-8">
                <BookCallButton size="lg" />
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-hairline-ghost px-5 py-8 md:px-10 md:py-14 lg:border-t-0">
              <p className="text-[12px] tracking-[0.16em] text-ghost uppercase">The sequence</p>
              <ol className="mt-5">
                {REGISTER.map((item) => (
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

      {/* Steps 01 and 02: the diligence and the business case */}
      <PageFrame aria-label="How the value is found">
        <SectionBand left="Before the build" right="Fixed-fee diagnostic · 2 weeks" />
        {VALUE_STEPS.map((item, index) => (
          <LedgerRow
            key={item.step}
            marker={item.step}
            eyebrow={`Step ${item.step} · ${item.name}`}
            rule={index < VALUE_STEPS.length - 1}
            title={
              <h2 className="font-display max-w-[24ch] text-balance text-[clamp(26px,2.4vw,40px)] leading-[1.15] font-medium">
                {item.title}
              </h2>
            }
          >
            <Points points={item.points} />
          </LedgerRow>
        ))}
      </PageFrame>

      {/* Step 03: the scoreboard, in the page's dark room */}
      <PageFrame id="return" aria-label="How the return is measured" tone="dark">
        <SectionBand
          tone="dark"
          left="Step 03 · Measure the return"
          right="After launch · Reviewed monthly"
        />
        <div className="border-b border-hairline-ghost px-5 py-10 md:px-10 md:py-14">
          <h2 className="font-display max-w-[28ch] text-balance text-[clamp(28px,2.8vw,48px)] leading-[1.12] font-medium">
            {RETURN_TITLE}
          </h2>
        </div>
        <dl className="grid md:grid-cols-2 xl:grid-cols-4">
          {RETURN_MEASURES.map((measure, index) => (
            <div
              key={measure.name}
              className={`border-b border-hairline-ghost px-5 py-8 md:px-10 md:py-12 xl:border-b-0 ${
                index % 2 === 0 ? 'md:border-r' : ''
              } ${index < RETURN_MEASURES.length - 1 ? 'xl:border-r' : ''} ${
                index >= RETURN_MEASURES.length - 2 ? 'md:border-b-0' : ''
              }`}
            >
              <dt>
                <span className="tnum block text-[12px] tracking-[0.16em] text-cobalt-bright uppercase">
                  {measure.name}
                </span>
                <span className="font-display mt-3 block text-[clamp(24px,2vw,32px)] leading-tight font-medium text-ghost">
                  {measure.question}
                </span>
              </dt>
              <dd className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ghost/80">
                {measure.detail}
              </dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-hairline-ghost px-5 py-8 md:px-10">
          <p className="max-w-[64ch] text-[16px] leading-relaxed text-ghost/85">{RETURN_CLOSE}</p>
        </div>
      </PageFrame>

      {/* The scoreboard on one client's system */}
      <PageFrame aria-label="One client's scoreboard" className="cf-dots">
        <SectionBand left="One client's scoreboard" right="From the client's own records" />
        <div className="relative transition-colors hover:bg-white">
          <LedgerRow
            marker="A"
            eyebrow={`Case A · ${caseA.scopeTag}`}
            rule={false}
            title={
              <h2 className="font-display max-w-[22ch] text-balance text-[clamp(26px,2.4vw,40px)] leading-[1.15] font-medium">
                {caseA.headline}
              </h2>
            }
          >
            <div className="grid grid-cols-3 gap-6">
              {caseA.metrics.map((metric) => (
                <Stat key={metric.label} size="sm" value={metric.value} label={metric.label} />
              ))}
            </div>
            <div className="mt-8">
              <ArrowLink
                href={`/proof/${caseA.slug}`}
                size="sm"
                className="after:absolute after:inset-0"
              >
                Read the case study
              </ArrowLink>
            </div>
          </LedgerRow>
        </div>
      </PageFrame>

      {/* Common questions, answered on the page */}
      <PageFrame aria-label="Common questions" tone="dark">
        <SectionBand
          tone="dark"
          left="Common questions"
          right="For owners, operators and sponsors"
        />
        <dl className="grid lg:grid-cols-2">
          {VALUE_FAQS.map((faq, index) => (
            <div
              key={faq.question}
              className={`border-b border-hairline-ghost px-5 py-8 md:px-10 md:py-10 ${
                index % 2 === 0 ? 'lg:border-r' : ''
              } ${index >= VALUE_FAQS.length - 2 ? 'lg:border-b-0' : ''}`}
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
            Bring one number you want to move.{' '}
            <em className="text-cobalt italic">We will show you where AI moves it.</em>
          </p>
          <div className="flex flex-col items-start gap-4">
            <BookCallButton size="lg" />
            <ArrowLink href="/engineering" size="sm">
              How we build
            </ArrowLink>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
