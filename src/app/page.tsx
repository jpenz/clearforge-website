import { ArrowRight, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeMethodDiagram } from '@/components/home/forge-method-diagram';
import { HeroScroll } from '@/components/home/hero-scroll';
import { PinnedSection, ScrubMarquee, SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';
import { GsapTextReveal } from '@/components/ui/gsap-text-reveal';
import { caseStudies } from '@/data/case-studies';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge — Production AI in 10 Weeks. Not a Strategy Deck.',
  description:
    'ClearForge builds production AI systems for mid-market and growth-stage operators. One senior team diagnoses, builds, and deploys — in ten weeks, measured against revenue, cost, or throughput.',
  path: '',
});

const featured = caseStudies.find((cs) => cs.slug === 'industrial-manufacturer');

/*
 * V8 HOMEPAGE — EDITORIAL LAYOUT (NO CARDS)
 *
 * Design principles:
 * - Ruled lines instead of card borders
 * - Full-width sections with asymmetric text layouts
 * - Large typography AS the design element
 * - Whitespace and thin dividers, not boxes
 * - Overlap and layering, not rigid grids
 * - "Barely There UI" — content does the talking
 */

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <HeroScroll />

      {/* ═══ TRUST LINE — single ruled line with proof ═══ */}
      <div className="border-b border-divider">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-warm-gray">
          <span>89% of projects reach production <span className="text-warm-gray/50">(industry avg: ~20%)</span></span>
          <span className="hidden sm:inline text-divider">·</span>
          <span>Manufacturing · Healthcare · SaaS · PE-Backed Companies</span>
          <span className="hidden sm:inline text-divider">·</span>
          <span>&lt;90 days to first ROI</span>
        </div>
      </div>

      {/* ═══ RESULTS — Editorial ruled-line list, slide-left entrance ═══ */}
      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="slide-left">
            <p className="overline">Proven Results</p>
            <h2 className="mt-6 text-display max-w-2xl">
              Real outcomes. Not promises.
            </h2>
          </SectionReveal>

          {/* Editorial list — ruled lines, no cards */}
          <div className="mt-16">
            {(caseStudies || []).slice(0, 3).map((cs, i) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group block border-t border-divider"
              >
                <div className="py-8 sm:py-10 lg:py-12 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4">
                  <div className="flex-1">
                    <span className="overline text-[10px]">{cs.industry}</span>
                    <h3 className="mt-2 text-h2 group-hover:text-brass transition-colors duration-300">
                      {cs.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-8 lg:gap-12 shrink-0">
                    <div>
                      <span className="metric text-2xl sm:text-3xl text-brass">{cs.heroMetric}</span>
                      <p className="text-xs text-warm-gray mt-1">{cs.heroMetricLabel}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-warm-gray group-hover:text-brass group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
            <div className="border-t border-divider" />
          </div>
        </div>
      </section>

      {/* ═══ SCROLL-SCRUBBED MARQUEE — moves with scroll, not time ═══ */}
      <ScrubMarquee
        text="AI THAT SHIPS  ·  FORGE DIAGNOSTIC  ·  FORGE SPRINT  ·  FORGE SCALE  ·  PRODUCTION IN 10 WEEKS  ·  <90 DAYS TO ROI  ·  "
        className="dark-section py-8 sm:py-12"
      />

      {/* ═══ METRICS — Large typography as design, atmospheric abstract bg ═══ */}
      <section className="dark-section relative py-20 sm:py-32 lg:py-40 overflow-hidden">
        {/* Atmospheric particle field — dim, behind everything */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/abstract-dataflow.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forge-black/60 via-transparent to-forge-black/80" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-16">
            {[
              { value: '$47M+', label: 'Client revenue influenced across 15 engagements' },
              { value: '3.2x', label: 'Average ROI — median payback in <90 days' },
              { value: '89%', label: 'Projects reach production (industry avg: ~20%)' },
              { value: '10', label: 'Weeks from kickoff to deployment, on average' },
            ].map((stat) => (
              <div key={stat.label}>
                <MetricCounter value={stat.value} className="metric-xl text-brass-light" />
                <p className="mt-4 text-body-sm text-stone leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE FORGE METHOD — native diagram component ═══ */}
      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* Section intro */}
          <SectionReveal animation="scale-up">
            <p className="overline">Our Approach</p>
            <h2 className="mt-6 text-display max-w-3xl">The Forge Method™</h2>
            <p className="mt-6 text-body-lg text-warm-gray max-w-2xl">
              Clear timelines. Transparent investment. Guaranteed deliverables.
              Three phases from opportunity to production, and onward.
            </p>
          </SectionReveal>

          {/* Native editorial diagram — giant serif numbers, thin rules, GSAP reveal */}
          <ForgeMethodDiagram />

          {/* Guarantee — ruled, not boxed */}
          <div className="mt-20 pt-10 border-t border-brass/20">
            <div className="flex items-start gap-4 max-w-2xl">
              <Shield className="h-5 w-5 text-brass shrink-0 mt-1" />
              <div>
                <p className="text-h4">The ClearForge Guarantee</p>
                <p className="mt-2 text-body text-warm-gray">
                  If our Forge Diagnostic doesn&apos;t identify at least 3 actionable AI opportunities
                  with clear ROI projections, we refund your investment. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SITUATIONS — slide-right entrance ═══ */}
      <section className="bg-recessed py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionReveal animation="slide-right">
            <p className="overline">Your Situation</p>
            <h2 className="mt-6 text-display max-w-xl">Which of these sounds like you?</h2>
          </SectionReveal>

          <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-x-20">
            {[
              { situation: 'AI Pilots That Never Ship', problem: 'You have invested in AI experiments but nothing reaches production.', metric: '89% of our projects ship', link: '/services/custom-ai-agents' },
              { situation: 'Revenue Growth Has Stalled', problem: 'Sales teams work harder while pipeline stays flat. The commercial model has not evolved with the market.', metric: '1,181 qualified opps surfaced', link: '/services/ai-revenue-operations' },
              { situation: 'Portfolio Value Creation', problem: 'PE operating teams need repeatable AI plays tied to EBITDA — not innovation theater.', metric: 'Portfolio playbook in 90 days', link: '/services/pe-value-creation' },
              { situation: 'Manual Work Bleeding Margin', problem: 'Skilled teams spend hours on work that should take minutes. The cost compounds monthly.', metric: '$240K avg annual savings', link: '/services/performance-improvement' },
            ].map((item) => (
              <Link
                key={item.situation}
                href={item.link}
                className="group block border-t border-divider py-8 sm:py-10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-0.5 h-12 bg-divider group-hover:bg-brass transition-colors duration-300 shrink-0 mt-1" />
                  <div>
                    <p className="text-h4 group-hover:text-brass transition-colors duration-300">{item.situation}</p>
                    <p className="mt-2 text-body text-warm-gray">{item.problem}</p>
                    <p className="mt-3 metric text-sm text-brass">{item.metric}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL — Full-width editorial quote ═══ */}
      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
          <GsapTextReveal
            text="They didn't just hand us a strategy deck. They built the systems, trained the team, and stayed until the numbers moved."
            tag="h2"
            className="text-display text-bone leading-snug"
            scrub
          />
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-px bg-brass-light" />
            <p className="text-body text-stone">
              <span className="font-semibold text-bone">VP of Operations</span> — Industrial Manufacturer, $180M Revenue
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER — clip-reveal entrance ═══ */}
      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-start">
            <SectionReveal animation="clip-reveal" className="lg:col-span-5">
              <p className="overline">Who Does the Work</p>
              <h2 className="mt-6 text-display">Built by operators. Not outsourced.</h2>
            </SectionReveal>
            <div className="lg:col-span-7 mt-10 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                ClearForge was founded by James Penz — 15 years at Bain, EY, and Capgemini
                before building ClearForge to solve the problem he saw everywhere: brilliant
                strategy that never became a working system.
              </p>
              <p className="mt-4 text-body text-warm-gray">
                The people on your discovery call are the people who do the work.
                No leverage model. No offshore handoffs.
              </p>

              <div className="mt-10 flex gap-12">
                {[
                  { label: 'Bain', sub: 'AI Automation' },
                  { label: 'EY', sub: 'Digital' },
                  { label: 'Capgemini', sub: 'Consulting' },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="metric text-xl text-brass">{item.label}</span>
                    <p className="text-xs text-warm-gray mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-divider pt-8">
                <p className="text-body text-anthracite italic" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                  &ldquo;I built ClearForge because I was tired of watching $200K strategy decks
                  sit on shelves. The gap between what gets recommended and what gets built
                  is where most AI programs die.&rdquo;
                </p>
                <p className="mt-3 text-xs text-warm-gray">— James Penz, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FORGE INTELLIGENCE CTA — clean, not boxed ═══ */}
      <section className="dark-section py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10 text-center">
          <p className="overline">Not ready to talk to a human?</p>
          <h2 className="mt-6 text-display text-bone">Let our AI analyze your situation.</h2>
          <p className="mt-6 text-body-lg text-stone max-w-lg mx-auto">
            Enter your website. Get a personalized AI readiness report with
            tech stack recommendations — free, no sales call.
          </p>
          <Button size="lg" className="mt-10" asChild>
            <Link href="/discover">Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ═══ OBJECTIONS — Editorial Q&A, ruled lines ═══ */}
      <section className="bg-parchment py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Honest Answers</p>
              <h2 className="mt-6 text-display">What you&apos;re probably thinking.</h2>
            </div>
            <div className="lg:col-span-8 mt-10 lg:mt-0">
              {[
                { q: "We're not big enough for this.", a: "We work with companies from $25M to $4B+. Our Forge Diagnostic starts at $15K — less than one month of a mid-level hire." },
                { q: "We tried AI and it didn't work.", a: "It probably wasn't tied to a business metric. Every system we deploy is measured against revenue, cost, or throughput. 89% of our projects reach production — the industry average is about 20%." },
                { q: "Why not just buy a platform?", a: "Platforms are tools. You still need someone who understands your business to deploy them effectively. We build what platforms can't." },
                { q: "This sounds expensive.", a: "A Forge Diagnostic starts at $15K for 4 weeks. And if we don't identify at least 3 actionable AI opportunities with clear ROI, you get a full refund." },
              ].map((o, i, arr) => (
                <div key={o.q} className={`py-8 sm:py-10 ${i < arr.length - 1 ? 'border-b border-divider' : ''}`}>
                  <p className="text-h2">&ldquo;{o.q}&rdquo;</p>
                  <p className="mt-4 text-body text-warm-gray">{o.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — Minimal, editorial ═══ */}
      <section className="dark-section py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-display text-bone">One conversation to find out.</h2>
          <p className="mt-6 text-body-lg text-stone">
            We&apos;ll be honest about whether we can help. No pitch decks. No pressure.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Confidential Discussion</Link>
            </Button>
            <Link href="mailto:james@clearforge.ai" className="inline-flex items-center text-sm text-stone hover:text-bone transition-colors h-12 px-4">
              Or email directly <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
