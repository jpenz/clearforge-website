import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  blueprintSummary,
  carnegieAppeal,
  crowdstrikeFY2026,
  functionAnalysis,
  transformationMethod,
  whyJames,
} from '@/data/cybersecurity-blueprint';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Cyber Security Technology Company AI Transformation Blueprint — ClearForge',
  description:
    'A specific, data-grounded view of where AI agents create value across every function of a $5B+ ARR Cyber Security Technology Company. ~4,200 FTE-equivalent capacity freed. ~$631M annual run-rate. Real role examples, real from-state and to-state.',
  path: '/blueprints/cybersecurity-technology-company',
});

const fmt = (n: number) => n.toLocaleString('en-US');
const fmtMoney = (n: number) => `$${n.toLocaleString('en-US')}M`;

export default function CybersecurityBlueprintPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-dataflow.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.18] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/85 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Blueprint · For a Cyber Security Leader</p>
          <h1 className="mt-6 text-display max-w-4xl text-bone">
            The Enterprise AI Transformation Blueprint for a $5B+ ARR Cyber Security Technology Company.
          </h1>
          <p className="mt-8 max-w-3xl text-body-lg text-stone">
            A specific, function-by-function view of where AI agents create
            value across this Cyber Security Technology Company — grounded in the FY2026 10-K, a
            thousand-person sample of current titles, and the same
            opportunity-identification methodology that delivered $150 to
            $200M in G&A automation value at Dell.
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-3 lg:gap-20 max-w-3xl">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone">
                FTE-Equivalent Freed
              </p>
              <p className="mt-3 text-display text-bone">
                ~{fmt(blueprintSummary.totalFTEEquivalentFreed)}
              </p>
              <p className="mt-1 text-body-sm text-stone">
                {blueprintSummary.pctOfTotalWorkforceCapacity}% of workforce capacity
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone">
                Annual OpEx Run-Rate
              </p>
              <p className="mt-3 text-display text-bone">
                ~${blueprintSummary.estimatedAnnualOpExSavingsM}M
              </p>
              <p className="mt-1 text-body-sm text-stone">
                Blended ${blueprintSummary.blendedLoadedCostKUSD}K loaded cost
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone">
                Functions Analyzed
              </p>
              <p className="mt-3 text-display text-bone">
                {functionAnalysis.length}
              </p>
              <p className="mt-1 text-body-sm text-stone">
                Across {fmt(crowdstrikeFY2026.totalEmployees)} employees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why this exists (Carnegie influence) ── */}
      <section className="bg-warm-white py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Why This Exists</p>
              <h2 className="mt-6 text-h1">Genuine interest, with skin in the game.</h2>
            </div>
            <div className="lg:col-span-8 lg:pt-2">
              <p className="text-body-lg text-warm-gray">
                {carnegieAppeal.geninuneInterest}
              </p>
              <p className="mt-6 text-body-lg text-warm-gray">
                {carnegieAppeal.whatTheyDoAlready}
              </p>
              <div className="mt-10 border-t border-divider pt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">
                  The Reference Quote
                </p>
                <p className="mt-3 text-h3 text-anthracite">
                  &ldquo;AI is not optional. It is the dividing line between those who can adapt and those who will be left behind.&rdquo;
                </p>
                <p className="mt-2 text-body-sm text-warm-gray">
                  A senior leader at the Company
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Baseline ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">FY2026 Baseline</p>
          <h2 className="mt-6 text-display max-w-3xl">
            Starting where you are, not where I imagine you to be.
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            Sourced from the Company&apos;s FY2026 10-K (filed March 2026, fiscal year ended January 31, 2026).
          </p>

          <div className="mt-16 grid gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Revenue', value: fmtMoney(crowdstrikeFY2026.totalRevenueM) },
              { label: 'Annual Recurring Revenue', value: fmtMoney(crowdstrikeFY2026.arrM) },
              { label: 'Net New ARR (FY26)', value: fmtMoney(crowdstrikeFY2026.netNewArrM) },
              { label: 'Free Cash Flow', value: fmtMoney(crowdstrikeFY2026.freeCashFlowM) },
              { label: 'Total Employees', value: fmt(crowdstrikeFY2026.totalEmployees) },
              { label: 'S&M Spend', value: fmtMoney(crowdstrikeFY2026.smSpendM) },
              { label: 'R&D Spend', value: fmtMoney(crowdstrikeFY2026.rdSpendM) },
              { label: 'G&A Spend', value: fmtMoney(crowdstrikeFY2026.gaSpendM) },
            ].map((m) => (
              <div key={m.label} className="border-t border-divider pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">
                  {m.label}
                </p>
                <p className="mt-3 text-h2 text-anthracite">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Dashboard: per-function automation ── */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">The Opportunity</p>
          <h2 className="mt-6 text-display max-w-4xl text-bone">
            Where AI agents create value, by function.
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Sorted by FTE-equivalent capacity freed. Click into any function for the from-state, to-state, agent archetype, and a real real example.
          </p>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-divider-dark">
                  <th className="py-4 text-left font-mono text-xs uppercase tracking-widest text-stone">
                    Function
                  </th>
                  <th className="py-4 text-right font-mono text-xs uppercase tracking-widest text-stone">
                    Est. HC
                  </th>
                  <th className="py-4 text-right font-mono text-xs uppercase tracking-widest text-stone">
                    Auto %
                  </th>
                  <th className="py-4 text-right font-mono text-xs uppercase tracking-widest text-stone">
                    FTE-Equiv Freed
                  </th>
                  <th className="py-4 text-right font-mono text-xs uppercase tracking-widest text-stone">
                    Annual Hours Freed
                  </th>
                </tr>
              </thead>
              <tbody>
                {functionAnalysis.map((f) => (
                  <tr key={f.function} className="border-b border-divider-dark/50">
                    <td className="py-5 pr-6 text-body text-bone">
                      <a
                        href={`#fn-${f.function.replace(/[^a-z]+/gi, '-').toLowerCase()}`}
                        className="hover:text-brass-light transition-colors"
                      >
                        {f.function}
                      </a>
                    </td>
                    <td className="py-5 text-right font-mono text-sm text-stone tabular-nums">
                      {fmt(f.estimatedHeadcount)}
                    </td>
                    <td className="py-5 text-right font-mono text-sm text-bone tabular-nums">
                      <span className="inline-block min-w-[3.5em]">
                        {f.aiAutomationPct.toFixed(0)}%
                      </span>
                      <span className="ml-3 inline-block h-1 w-20 bg-divider-dark/50 align-middle">
                        <span
                          className="block h-1 bg-brass-light"
                          style={{ width: `${f.aiAutomationPct}%` }}
                        />
                      </span>
                    </td>
                    <td className="py-5 text-right font-mono text-sm text-bone tabular-nums">
                      ~{fmt(f.fteEquivalentFreed)}
                    </td>
                    <td className="py-5 text-right font-mono text-sm text-stone tabular-nums">
                      {fmt(f.annualHoursFreed)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-brass-light">
                  <td className="py-6 pr-6 text-body font-medium text-bone">
                    Enterprise Total
                  </td>
                  <td className="py-6 text-right font-mono text-base text-bone tabular-nums">
                    {fmt(crowdstrikeFY2026.totalEmployees)}
                  </td>
                  <td className="py-6 text-right font-mono text-base text-brass-light tabular-nums">
                    {blueprintSummary.pctOfTotalWorkforceCapacity}%
                  </td>
                  <td className="py-6 text-right font-mono text-base text-brass-light tabular-nums">
                    ~{fmt(blueprintSummary.totalFTEEquivalentFreed)}
                  </td>
                  <td className="py-6 text-right font-mono text-base text-stone tabular-nums">
                    {fmt(
                      functionAnalysis.reduce(
                        (s, f) => s + f.annualHoursFreed,
                        0,
                      ),
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-body-sm text-stone">
            Methodology: Headcount triangulated from FY26 OpEx allocation, Apollo n=1,000 title sample, and cybersecurity-industry benchmarks. AI-automation % grounded in the Bain Dell Automation Ambition opportunity-sizing methodology and the GenAI Foundation Model use-case taxonomy. FTE-equivalent freed = HC × auto %. Annual hours freed = FTE × 2,080.
          </p>
        </div>
      </section>

      {/* ── Per-function deep-dive (from/to state) ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Function Deep-Dive</p>
          <h2 className="mt-6 text-display max-w-3xl">
            From-state to to-state, with the agent that does the work.
          </h2>

          <div className="mt-16 space-y-0">
            {functionAnalysis.map((f, i) => (
              <div
                key={f.function}
                id={`fn-${f.function.replace(/[^a-z]+/gi, '-').toLowerCase()}`}
                className={`border-t border-divider py-12 lg:py-16 ${
                  i === functionAnalysis.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-brass">
                      {f.aiAutomationPct.toFixed(0)}% automatable · ~{fmt(f.fteEquivalentFreed)} FTE freed
                    </p>
                    <h3 className="mt-3 text-h2">{f.function}</h3>
                    <p className="mt-3 text-body text-warm-gray">
                      Est. {fmt(f.estimatedHeadcount)} employees · {f.shareOfTotalHCPct}% of total
                    </p>
                    <p className="mt-2 text-body-sm text-warm-gray italic">
                      {f.derivationNote}
                    </p>
                    {f.sampleApolloTitles.length > 0 && (
                      <div className="mt-6">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                          Real titles found in Apollo sample
                        </p>
                        <ul className="mt-2 space-y-1">
                          {f.sampleApolloTitles.slice(0, 5).map((t) => (
                            <li
                              key={t}
                              className="text-body-sm text-anthracite"
                            >
                              · {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 lg:col-span-8 lg:mt-0">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="border-l-2 border-divider pl-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                          From-state (today)
                        </p>
                        <p className="mt-3 text-body text-anthracite">
                          {f.fromTo.fromState}
                        </p>
                      </div>
                      <div className="border-l-2 border-brass pl-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brass">
                          To-state (with agents)
                        </p>
                        <p className="mt-3 text-body text-anthracite">
                          {f.fromTo.toState}
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 border-t border-divider pt-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        Agent archetype
                      </p>
                      <p className="mt-2 text-body font-medium text-anthracite">
                        {f.fromTo.agentArchetype}
                      </p>
                    </div>
                    <div className="mt-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        Real real example
                      </p>
                      <p className="mt-2 text-body italic text-warm-gray">
                        {f.fromTo.exampleOutput}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ClearForge Transformation Method (replaces Paradosi buy/build) ── */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">The ClearForge Transformation Method</p>
          <h2 className="mt-6 text-display max-w-4xl text-bone">
            Identify · Size · Sequence · Sprint.
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            The same playbook used to deliver $150 to $200M in G&A automation value at Dell — adapted for the Company&apos;s scale, GTM motion, and 33-module unified security platform.
          </p>

          <div className="mt-16 space-y-0">
            {transformationMethod.map((p, i) => (
              <div
                key={p.phase}
                className={`border-t border-divider-dark py-10 lg:py-14 ${
                  i === transformationMethod.length - 1
                    ? 'border-b border-divider-dark'
                    : ''
                }`}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-brass-light">
                      Phase {p.phase} · weeks {p.weeks}
                    </p>
                    <h3 className="mt-3 text-h1 text-bone">{p.name}</h3>
                  </div>
                  <div className="mt-6 lg:col-span-8 lg:mt-0">
                    <p className="text-body-lg text-stone">{p.description}</p>
                    <div className="mt-6 border-l-2 border-brass-light pl-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-brass-light">
                        Deliverable
                      </p>
                      <p className="mt-2 text-body text-bone">
                        {p.deliverable}
                      </p>
                    </div>
                    <div className="mt-4 border-l-2 border-divider-dark pl-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                        At this Company specifically
                      </p>
                      <p className="mt-2 text-body text-stone">
                        {p.crowdstrikeSpecific}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why James (JD-by-JD proof) ── */}
      <section className="bg-warm-white py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Why I Can Lead This</p>
          <h2 className="mt-6 text-display max-w-3xl">
            Each line in the JD, with the proof point underneath.
          </h2>

          <div className="mt-16 space-y-0">
            {whyJames.experienceMatches.map((m, i) => (
              <div
                key={m.jdRequirement}
                className={`border-t border-divider py-8 ${
                  i === whyJames.experienceMatches.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">
                      JD Requirement
                    </p>
                    <p className="mt-2 text-body font-medium text-anthracite">
                      {m.jdRequirement}
                    </p>
                  </div>
                  <div className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-brass">
                      Proof Point
                    </p>
                    <p className="mt-2 text-body text-anthracite">{m.proof}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="overline">Next Step</p>
          <h2 className="mt-6 text-display text-bone">
            15 minutes. The blueprint, the operating model, the first sprint.
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            {carnegieAppeal.callToAction}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/contact?ref=crowdstrike-blueprint">
                Schedule the Conversation{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href="mailto:james@clearforge.ai?subject=a $5B+ ARR Cyber Security Technology Company%20VP%20Enterprise%20AI%20Strategy">
                james@clearforge.ai
              </a>
            </Button>
          </div>
          <p className="mt-12 text-body-sm text-stone">
            James Penz · Founder, ClearForge.AI · Ex-Bain Automation Center of
            Excellence · a $5B+ ARR Cyber Security Technology Company shareholder since 2020
          </p>
        </div>
      </section>
    </>
  );
}
