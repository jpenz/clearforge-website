import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { HeroScroll } from '@/components/home/hero-scroll';
import { MetricCounter } from '@/components/home/metric-counter';
import { Button } from '@/components/ui/button';
import { caseStudies } from '@/data/case-studies';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ClearForge — Production AI in 10 Weeks. Not a Strategy Deck.',
  description:
    'We build production AI systems for mid-market and growth-stage companies. From pilot purgatory to deployed systems in 10 weeks. No enterprise budgets required.',
  path: '',
});

const featured = caseStudies.find((cs) => cs.slug === 'industrial-manufacturer');
const secondary = caseStudies.find((cs) => cs.slug === 'metro-detroit-services-company');

/*
 * V7.2 HOMEPAGE — CELLCOG COPY AUDIT APPLIED
 *
 * Changes from V7.1:
 * - Headline: problem-focused, not capability-focused (122% conversion lift)
 * - Overline: "Mid-Market" identity, not revenue range
 * - CTA: "Get My Free AI Readiness Score" (specificity + value)
 * - Metrics: contextualized with denominators + industry comparison
 * - Risk reversal: guarantee added (addresses #1 purchase objection)
 * - Pricing removed from hero subline (value before price)
 * - Timelines updated: 4 weeks diagnostic, 10-14 weeks sprint
 * - Both mid-market AND enterprise case studies shown
 */

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO — CLARIFY (problem → outcome)
          CellCog: "Problem-focused headlines outperform
          capability headlines by 122%"
          ══════════════════════════════════════════ */}
      <HeroScroll />

      {/* ══════════════════════════════════════════
          2. TRUST BAR — Contextualized proof
          CellCog: "59% of buyers distrust unverified claims"
          ══════════════════════════════════════════ */}
      <section className="border-y border-divider bg-parchment py-6">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-8 lg:gap-16 text-sm text-warm-gray text-center">
            <span className="flex items-center gap-2">
              <span className="metric text-brass font-semibold">89%</span> of projects reach production
              <span className="text-xs text-warm-gray/60">(industry avg: ~20%)</span>
            </span>
            <span className="hidden sm:inline text-divider">|</span>
            <span>Manufacturing · Healthcare · SaaS · PE-Backed</span>
            <span className="hidden sm:inline text-divider">|</span>
            <span className="flex items-center gap-2">
              <span className="metric text-brass font-semibold">&lt;90 days</span> to first ROI
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CASE STUDIES — SELL THE VACATION
          Show BOTH mid-market AND enterprise to demonstrate range.
          CellCog: "Dedicated case study pages convert at 10.7%"
          ══════════════════════════════════════════ */}
      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline text-center">Proven Results</p>
          <h2 className="mt-4 text-display text-center max-w-2xl mx-auto">
            From mid-market to enterprise. Real outcomes.
          </h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {(caseStudies || []).slice(0, 3).map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group border border-divider bg-surface p-5 sm:p-8 transition-all hover:border-brass hover:-translate-y-1"
              >
                <p className="overline text-xs">{cs.industry}</p>
                <div className="mt-4">
                  <MetricCounter value={cs.heroMetric} className="metric-lg text-brass" />
                </div>
                <p className="mt-2 text-body-sm text-warm-gray">{cs.heroMetricLabel}</p>
                <h3 className="mt-4 text-h4 group-hover:text-brass transition-colors">{cs.title}</h3>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                  Read the full story <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. THE FORGE METHOD™ — Updated timelines + deliverables
          CellCog: "Named methodology creates perceived value"
          Added bullet deliverables per CellCog recommendation
          ══════════════════════════════════════════ */}
      <section className="dark-section noise-texture relative py-16 sm:py-24 lg:py-40 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline">Our Approach</p>
          <h2 className="mt-6 text-display text-bone max-w-2xl">
            The Forge Method™
          </h2>
          <p className="mt-4 text-body-lg text-stone max-w-xl">
            A repeatable framework for turning AI ambition into production systems.
            Clear timelines. Transparent investment. Guaranteed deliverables.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: 'Forge Diagnostic™',
                timeline: '4 weeks',
                price: 'From $15K',
                desc: 'We map your value chain, score your AI readiness across 5 pillars, and deliver a prioritized roadmap with ROI projections for each opportunity.',
                deliverables: ['AI readiness score across 5 dimensions', 'Prioritized opportunity roadmap with ROI', 'Enterprise-grade tech stack recommendation', 'Executive presentation for your leadership team'],
                cta: 'Start with a Diagnostic',
              },
              {
                name: 'Forge Sprint™',
                timeline: '10–14 weeks',
                price: '$75K–$200K',
                desc: 'We redesign workflows, deploy AI agents with human-in-the-loop controls, and establish KPI baselines. Working systems in production — not proofs of concept.',
                deliverables: ['Production AI system deployed in your environment', 'Workflow redesign with human-in-the-loop controls', 'KPI baselines and measurement dashboard', 'Team training and handover documentation'],
                featured: true,
                cta: 'Build with a Sprint',
              },
              {
                name: 'Forge Scale™',
                timeline: 'Ongoing',
                price: '$5K–$15K/mo',
                desc: 'Managed AI operations with continuous optimization, team upskilling, and expansion to new use cases. Your AI advantage compounds every month.',
                deliverables: ['Monthly optimization and performance review', 'Expansion to new departments and use cases', 'Team training on human-plus-agent workflows', 'Governance rhythm and executive reporting'],
                cta: 'Scale with us',
              },
            ].map((product) => (
              <div
                key={product.name}
                className={`p-5 sm:p-8 ${product.featured ? 'border-2 border-brass bg-brass/5' : 'border border-divider-dark'}`}
              >
                {product.featured && (
                  <span className="inline-block bg-brass text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-h3 text-bone">{product.name}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="metric text-lg text-brass-light">{product.price}</span>
                  <span className="text-xs text-stone uppercase tracking-wider">{product.timeline}</span>
                </div>
                <p className="mt-4 text-body-sm text-stone">{product.desc}</p>
                <ul className="mt-4 space-y-2">
                  {product.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-stone">
                      <span className="text-brass-light mt-0.5">✓</span> {d}
                    </li>
                  ))}
                </ul>
                <Button variant={product.featured ? 'default' : 'outline-light'} className="mt-6 w-full" asChild>
                  <Link href="/contact">{product.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* RISK REVERSAL — CellCog P0 recommendation */}
          <div className="mt-12 sm:mt-16 border border-brass/20 bg-brass/5 p-5 sm:p-8 max-w-2xl mx-auto text-center">
            <Shield className="h-6 w-6 text-brass-light mx-auto mb-4" />
            <h3 className="text-h4 text-bone">The ClearForge Guarantee</h3>
            <p className="mt-3 text-body text-stone">
              If our Forge Diagnostic doesn&apos;t identify at least 3 actionable AI opportunities
              with clear ROI projections, we refund your investment. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. METRICS WALL — Contextualized per CellCog
          Added denominators, timeframes, industry comparisons
          ══════════════════════════════════════════ */}
      <section className="border-y border-divider bg-parchment py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-6 sm:gap-12 lg:grid-cols-4 lg:gap-8">
            {[
              { value: '$47M+', label: 'Client revenue influenced across 15 engagements' },
              { value: '3.2x', label: 'Average ROI — median payback in <90 days' },
              { value: '89%', label: 'Projects reach production (industry avg: ~20%)' },
              { value: '10', label: 'Weeks from kickoff to deployment, on average' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <MetricCounter value={stat.value} className="metric-lg text-anthracite" />
                <p className="mt-3 text-body-sm text-warm-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5b. PAIN/SOLUTION CARDS — LABEL THE PROBLEM
          ══════════════════════════════════════════ */}
      <section className="bg-parchment py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="overline text-center">Your Situation</p>
          <h2 className="mt-4 text-display text-center max-w-2xl mx-auto">
            Which of these sounds like you?
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                situation: 'Stuck in Pilot Purgatory',
                problem: "You've invested in AI experiments but nothing reaches production.",
                metric: '89% of our projects ship to production',
                link: '/services/custom-ai-agents',
              },
              {
                situation: 'Revenue Growth Has Stalled',
                problem: "Your sales team is working harder but pipeline isn't growing proportionally.",
                metric: '30% avg pipeline increase',
                link: '/services/ai-revenue-operations',
              },
              {
                situation: 'Post-Acquisition AI Integration',
                problem: 'Your PE firm needs AI-driven value creation across portfolio companies.',
                metric: '10% avg EBITDA improvement in 90 days',
                link: '/services/pe-value-creation',
              },
              {
                situation: 'Manual Processes Bleeding Cost',
                problem: 'Your team spends hours on work that should take minutes.',
                metric: '$240K avg annual savings per engagement',
                link: '/services/performance-improvement',
              },
            ].map((card) => (
              <Link
                key={card.situation}
                href={card.link}
                className="group border border-divider bg-surface p-5 sm:p-8 transition-all hover:border-brass hover:-translate-y-1"
              >
                <p className="overline">{card.situation}</p>
                <p className="mt-3 text-h4">{card.problem}</p>
                <p className="mt-4 metric text-sm text-brass">{card.metric}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                  See how we solve this <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TESTIMONIAL + FORGE INTELLIGENCE CTA
          ══════════════════════════════════════════ */}
      <section className="dark-section py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
          <span className="block text-[60px] sm:text-[100px] leading-none text-brass/20" aria-hidden>&ldquo;</span>
          <p className="text-h1 text-bone -mt-8 italic" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            They didn&apos;t just hand us a strategy deck. They built the systems,
            trained the team, and stayed until the numbers moved.
          </p>
          <p className="mt-8 text-body text-stone">
            <span className="font-semibold text-bone">VP of Operations</span> — Industrial Manufacturer, $180M Revenue
          </p>

          <div className="mt-16 border-t border-divider-dark pt-12">
            <p className="text-body-lg text-stone">Not ready to talk to a human yet?</p>
            <h3 className="mt-2 text-h2 text-bone">Let our AI analyze your situation.</h3>
            <p className="mt-4 text-body text-stone max-w-md mx-auto">
              Answer a few questions and get a personalized AI readiness report with
              tech stack recommendations — free, no sales call required.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/discover">Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6b. FOUNDER CREDIBILITY — CellCog: "Named team
          is HIGH IMPACT missing element. B2B buyers want
          to know WHO does the work."
          ══════════════════════════════════════════ */}
      <section className="bg-parchment py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="overline">Who Does the Work</p>
              <h2 className="mt-6 text-display">
                Built by operators. Not outsourced to juniors.
              </h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                ClearForge was founded by James Penz — a senior consultant who spent
                15 years at Bain, EY, and Capgemini before building ClearForge to solve
                the problem he saw everywhere: brilliant strategy that never became a
                working system.
              </p>
              <p className="mt-4 text-body text-warm-gray">
                The people on your discovery call are the people who do the work.
                No leverage model. No offshore handoffs. Senior operators from
                diagnosis to production.
              </p>
              <div className="mt-8">
                <Button variant="secondary" asChild>
                  <Link href="/about">Learn more about our team <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="border border-divider bg-surface p-3 sm:p-6 text-center">
                  <span className="metric-lg text-brass">15+</span>
                  <p className="mt-2 text-body-sm text-warm-gray">Years in consulting & AI</p>
                </div>
                <div className="border border-divider bg-surface p-3 sm:p-6 text-center">
                  <span className="metric-lg text-brass">Bain</span>
                  <p className="mt-2 text-body-sm text-warm-gray">AI Automation practice</p>
                </div>
                <div className="border border-divider bg-surface p-3 sm:p-6 text-center">
                  <span className="metric-lg text-brass">EY</span>
                  <p className="mt-2 text-body-sm text-warm-gray">Digital transformation</p>
                </div>
              </div>
              <div className="mt-4 border border-brass/20 bg-brass/5 p-6">
                <p className="text-body text-anthracite italic" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                  &ldquo;I built ClearForge because I was tired of watching $200K strategy decks
                  sit on shelves. The gap between what gets recommended and what gets built
                  is where most AI programs die. We close that gap.&rdquo;
                </p>
                <p className="mt-3 text-body-sm text-warm-gray">— James Penz, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. OBJECTIONS + FINAL CTA
          CellCog: "74% of objections are predictable"
          ══════════════════════════════════════════ */}
      <section className="bg-recessed py-16 sm:py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Common Questions</p>
              <h2 className="mt-6 text-display">
                What you&apos;re probably thinking.
              </h2>
              <div className="mt-8 hidden lg:block">
                <Button size="lg" asChild>
                  <Link href="/discover">Get My Free AI Readiness Score</Link>
                </Button>
                <p className="mt-4 text-body-sm text-warm-gray">
                  Or email directly:{' '}
                  <a href="mailto:james@clearforge.ai" className="text-brass hover:underline">james@clearforge.ai</a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              {[
                { q: "We're not big enough for this.", a: "We work with companies from $25M to $4B+. Our Forge Diagnostic starts at $15K — less than one month of a mid-level hire. If AI can move the needle for your business, you're big enough." },
                { q: "We tried AI and it didn't work.", a: "It probably wasn't tied to a business metric. Every system we deploy is measured against revenue, cost, or throughput. If it doesn't move a named KPI, we don't build it. 89% of our projects reach production — the industry average is about 20%." },
                { q: "Why not just buy a platform like DataRobot?", a: "Platforms are tools. You still need someone who understands your business to deploy them effectively. We're the expert guide who maximizes what platforms can deliver — and builds what they can't." },
                { q: "This sounds expensive.", a: "A Forge Diagnostic starts at $15K for 4 weeks. And here's our guarantee: if we don't identify at least 3 actionable AI opportunities with clear ROI, you get a full refund. The real question: what does it cost to wait 12 more months?" },
              ].map((o, i, arr) => (
                <div key={o.q}>
                  <div className="py-8">
                    <p className="text-h2">&ldquo;{o.q}&rdquo;</p>
                    <p className="mt-4 text-body text-warm-gray">{o.a}</p>
                  </div>
                  {i < arr.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center lg:hidden">
            <Button size="lg" asChild>
              <Link href="/discover">Get My Free AI Readiness Score</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final close */}
      <section className="dark-section py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">One conversation to find out.</h2>
          <p className="mt-4 text-body-lg text-stone">
            We&apos;ll be honest about whether we can help. No pitch decks. No pressure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Confidential Discussion</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
