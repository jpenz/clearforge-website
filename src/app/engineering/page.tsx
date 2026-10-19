import type { Metadata } from 'next';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { LedgerRow } from '@/components/ui/LedgerRow';
import { PageFrame } from '@/components/ui/PageFrame';
import { Plate } from '@/components/ui/Plate';
import { SectionBand } from '@/components/ui/SectionBand';
import {
  DEPLOYED_STEPS,
  DEPLOYED_TITLE,
  ENGINEERING_FAQS,
  STANDARD_QUESTIONS,
} from '@/data/engineering';
import { faqJsonLd, JsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Agentic AI Engineering Standard',
  description:
    'Forward-deployed engineers build each AI system inside your team: durable workflows, scoped access, human sign-off, source-checked output, provider failover and daily output checks.',
  alternates: { canonical: '/engineering' },
};

export default function EngineeringPage() {
  return (
    <>
      <script {...JsonLdScriptProps(faqJsonLd(ENGINEERING_FAQS))} />

      {/* Hero: the governing thought, with the five reviewer questions
          indexed on the right as the page's spine. */}
      <section aria-label="Engineering" className="cf-dark-band overflow-clip">
        <Plate
          src="/renders/engineering-lattice.jpg"
          priority
          position="66% 50%"
          overlay="strong-right"
        />
        <div aria-hidden="true" className="cf-aurora-b" />
        <div aria-hidden="true" className="cf-scrim-right pointer-events-none absolute inset-0" />
        <Container gutter="cells" className="relative">
          <SectionBand
            tone="dark"
            left="Engineering"
            right={'Forward‑deployed · Production standard'}
          />
          <div className="grid lg:grid-cols-[2fr_1fr]">
            <div className="border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
              <h1 className="font-display max-w-[22ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
                Forward-deployed engineers build each system inside your team, to a standard{' '}
                <em className="text-cobalt-bright italic">you can inspect.</em>
              </h1>
              <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed text-ghost/80">
                Production agents fail in ways a demo hides: lost work, loose access, wrong answers,
                runaway cost. Each answer below is a practice running in client systems today.
              </p>
              <div className="mt-8">
                <BookCallButton size="lg" />
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-hairline-ghost px-5 py-8 md:px-10 md:py-14 lg:border-t-0">
              <p className="text-[12px] tracking-[0.16em] text-ghost uppercase">Five questions</p>
              <ol className="mt-5">
                {STANDARD_QUESTIONS.map((item) => (
                  <li key={item.id} className="border-b border-hairline-ghost py-3 last:border-b-0">
                    <a
                      href={`#${item.id}`}
                      className="flex items-baseline gap-4 transition-colors hover:text-cobalt-bright"
                    >
                      <span className="tnum text-[12px] tracking-[0.16em] text-cobalt-bright">
                        {item.step}
                      </span>
                      <span className="text-[13px] tracking-[0.1em] text-ghost uppercase">
                        {item.question}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Who builds it: the forward-deployed model, in time order */}
      <PageFrame aria-label="Who builds it">
        <SectionBand left="Who builds it" right="Forward-deployed engineers" />
        <div className="grid lg:grid-cols-[1fr_2fr]">
          <div className="border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[18ch] text-balance text-[clamp(28px,2.6vw,44px)] leading-[1.12] font-medium">
              {DEPLOYED_TITLE}
            </h2>
          </div>
          <ol>
            {DEPLOYED_STEPS.map((item, index) => (
              <li
                key={item.when}
                className={`grid gap-2 px-5 py-8 md:grid-cols-[200px_1fr] md:gap-8 md:px-10 md:py-10 ${
                  index < DEPLOYED_STEPS.length - 1 ? 'border-b border-hairline' : ''
                }`}
              >
                <p className="tnum text-[12px] tracking-[0.16em] text-ink/70 uppercase md:pt-1">
                  {item.when}
                </p>
                <p className="max-w-[52ch] text-[17px] leading-relaxed text-ink/85">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </PageFrame>

      {/* The standard: one ledger row per reviewer question */}
      <PageFrame aria-label="The standard" className="cf-dots">
        <SectionBand left="The standard" right="Five questions a technical reviewer asks" />
        {STANDARD_QUESTIONS.map((item, index) => (
          <LedgerRow
            key={item.id}
            id={item.id}
            marker={item.step}
            eyebrow={`Question ${item.step} · ${item.question}`}
            rule={index < STANDARD_QUESTIONS.length - 1}
            title={
              <h2 className="font-display max-w-[24ch] text-balance text-[clamp(24px,2.2vw,36px)] leading-[1.18] font-medium">
                {item.answer}
              </h2>
            }
          >
            <ul className="space-y-4">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex max-w-[56ch] gap-3 text-[16px] leading-relaxed text-ink/80"
                >
                  <span aria-hidden="true" className="mt-[10px] size-[6px] shrink-0 bg-cobalt" />
                  {point}
                </li>
              ))}
            </ul>
            {item.link && (
              <ArrowLink href={item.link.href} size="sm" className="mt-6">
                {item.link.label}
              </ArrowLink>
            )}
          </LedgerRow>
        ))}
      </PageFrame>

      {/* For systems already built elsewhere */}
      <PageFrame aria-label="Already built an agent" tone="dark">
        <SectionBand tone="dark" left="Already built an agent?" right="Fixed fee · 2 weeks" />
        <div className="flex flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <p className="font-display max-w-[32ch] text-balance text-[clamp(26px,2.6vw,44px)] leading-[1.12] font-medium">
            The Eval and Reliability Audit holds a system you already run to this standard in two
            weeks.
          </p>
          <ArrowLink href="/services#eval-and-reliability-audit" tone="dark">
            See the audit
          </ArrowLink>
        </div>
      </PageFrame>

      {/* Close */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="30 minutes · No preparation" />
        <div className="flex flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-display max-w-[30ch] text-balance text-[clamp(30px,3vw,56px)] leading-[1.1]">
            Bring one workflow you want an agent to run.{' '}
            <em className="text-cobalt italic">We will show you how it would be built.</em>
          </p>
          <div className="flex flex-col items-start gap-4">
            <BookCallButton size="lg" />
            <ArrowLink href="/discover" size="sm">
              Map the Workflow
            </ArrowLink>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
