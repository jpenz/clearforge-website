import type { Metadata } from 'next';
import Image from 'next/image';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';
import { Stat } from '@/components/ui/Stat';
import { SERVICE_STAGES } from '@/data/services';
import { FOUNDER_EMAIL, FOUNDER_LINKEDIN } from '@/data/site';
import { founderJsonLd, JsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Founder-led. James Penz, formerly of Bain's AI and Automation practice, with earlier work at EY and Capgemini. ClearForge builds AI systems your team actually uses.",
};

const BACKGROUND = [
  {
    label: 'Practice',
    title: 'Bain, AI and Automation practice',
    description: 'AI and automation programs for enterprise clients.',
  },
  {
    label: 'Earlier',
    title: 'EY',
    description: 'Advisory and technology work for large organizations.',
  },
  {
    label: 'Earlier',
    title: 'Capgemini',
    description: 'Delivery of enterprise technology programs.',
  },
];

/** The terms of each stage, from the catalog. Never a price. */
const STAGE_TERMS: Record<string, string> = {
  '01': 'Fixed fee, 2 weeks.',
  '02': 'Scoped in the Diagnostic.',
  '03': 'The Adoption Mile.',
  '04': 'Monthly, per system.',
};

export default function AboutPage() {
  return (
    <>
      <script {...JsonLdScriptProps(founderJsonLd())} />
      {/* Title block + founder headshot */}
      <PageFrame aria-label="About ClearForge">
        <SectionBand left="About" right="Founder-led · Founded by James Penz" />
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col border-b border-hairline px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-16 lg:border-r lg:border-b-0">
            <h1 className="font-display max-w-[16ch] text-balance text-[clamp(38px,4.2vw,76px)] leading-[1.05] font-medium tracking-[-0.01em]">
              One founder. One standard. Systems your team{' '}
              <em className="text-cobalt italic">actually uses.</em>
            </h1>
            <div className="mt-8 max-w-[52ch] space-y-5 md:mt-10">
              <p className="tnum text-[16px] leading-relaxed text-ink/80">
                Mid-market companies and PE operating teams get AI advice as reports. ClearForge
                exists to do the other thing. We design an AI system for a specific workflow, build
                it into production, and stay through adoption until the team actually uses it.
              </p>
              <p className="text-[16px] leading-relaxed text-ink/80">
                Pricing is scoped in the Diagnostic and agreed before any build. The deliverable is
                the working system, not a report.
              </p>
            </div>
            <div className="mt-auto pt-8 md:pt-10">
              <ArrowLink href="#standard" arrow="↓" size="sm">
                See the standard we build to
              </ArrowLink>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 py-8 md:px-10 md:py-10">
            <div className="w-full max-w-[460px]">
              {/* Founder headshot: the real photo V11 shipped, restored 2026-09-05
                  after the V12 graft dropped the file and left slot text live.
                  People never appear in the render set. */}
              <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-white">
                <Image
                  src="/images/james-penz.jpg"
                  alt="James Penz, founder of ClearForge"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  quality={72}
                  className="object-cover object-top"
                />
                <span aria-hidden="true" className="absolute top-0 left-0 h-px w-6 bg-cobalt" />
                <span aria-hidden="true" className="absolute top-0 left-0 h-6 w-px bg-cobalt" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-x border-b border-hairline px-4 py-3">
                <span className="text-[13px] font-semibold">James Penz · Founder</span>
                <span className="flex items-center gap-4 text-[13px]">
                  <a
                    href={`mailto:${FOUNDER_EMAIL}`}
                    className="text-cobalt underline decoration-ink/30 underline-offset-4 hover:text-cobalt-press"
                  >
                    {FOUNDER_EMAIL}
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cobalt underline decoration-ink/30 underline-offset-4 hover:text-cobalt-press"
                  >
                    LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageFrame>

      {/* Background ledger */}
      <PageFrame aria-label="Background">
        <SectionBand left="Background" right="Enterprise practice" />
        {BACKGROUND.map((row, index) => (
          <div
            key={row.title}
            className={`grid items-baseline gap-1 px-5 py-5 md:py-7 lg:grid-cols-[1fr_2fr_3fr] lg:px-10 ${
              index < BACKGROUND.length - 1 ? 'border-b border-hairline' : ''
            }`}
          >
            <span className="text-[12px] tracking-[0.14em] text-ink/70 uppercase">{row.label}</span>
            <h2 className="text-[18px] leading-[1.4] font-semibold md:text-[19px]">{row.title}</h2>
            <p className="text-[14px] leading-relaxed text-ink/70">{row.description}</p>
          </div>
        ))}
      </PageFrame>

      {/* The standard: the page's one dark room, where its strongest numbers are */}
      <PageFrame id="standard" aria-label="The standard" tone="dark">
        <SectionBand tone="dark" left="The standard" right="The target on every engagement" />
        <div className="grid md:grid-cols-2">
          <div className="border-b border-hairline-ghost px-5 py-10 md:border-r md:border-b-0 md:px-10 md:py-14">
            <Stat
              tone="dark"
              size="lg"
              value={
                <>
                  70<span className="align-top text-[0.5em]">%</span>
                </>
              }
              label={
                <>
                  Weekly-active adoption by{' '}
                  <span className="font-semibold text-ghost">day 90.</span> The target every
                  engagement is built to.
                </>
              }
            />
          </div>
          <div className="px-5 py-10 md:px-10 md:py-14">
            <Stat
              tone="dark"
              size="lg"
              value="10 to 14"
              label={
                <>
                  Weeks from kickoff to a{' '}
                  <span className="font-semibold text-ghost">live production system.</span>
                </>
              }
            />
          </div>
        </div>
      </PageFrame>

      {/* How we work: the catalog's four stages, the same names as /services */}
      <PageFrame aria-label="How we work">
        <SectionBand left="How we work" right="Priced before any build" />
        <div className="grid divide-y divide-hairline md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {SERVICE_STAGES.map((stage) => (
            <div key={stage.number} className="px-5 py-8 md:px-8 md:py-12">
              <span className="tnum flex items-center gap-2.5 text-[12px] tracking-[0.14em] text-ink/70 uppercase">
                <span aria-hidden="true" className="inline-block size-[7px] bg-cobalt" />
                {stage.number} · {stage.name}
              </span>
              <p className="tnum mt-5 text-[17px] leading-[1.5] font-medium md:text-[19px]">
                {stage.conclusion} <span className="text-ink/70">{STAGE_TERMS[stage.number]}</span>
              </p>
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
