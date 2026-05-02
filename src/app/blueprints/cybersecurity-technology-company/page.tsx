import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Compass,
  Gauge,
  LineChart,
  type LucideIcon,
  Network,
  Route,
  ShieldCheck,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  blueprintSummary,
  carnegieAppeal,
  cybersecurityCompanyFY2026,
  functionAnalysis,
  futureStateUseCases,
  proposalRoadmap,
  strategicProposal,
  transformationMethod,
  valueChainFutureState,
  whyJames,
} from '@/data/cybersecurity-blueprint';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Cybersecurity Technology Company AI Strategy Proposal | ClearForge',
  description:
    'A ClearForge AI strategy proposal for a $5B+ ARR cybersecurity technology company: value-chain future state, use-case portfolio, function-by-function automation math, and 90-day production path.',
  path: '/blueprints/cybersecurity-technology-company',
});

const fmt = (n: number) => n.toLocaleString('en-US');
const fmtMoney = (n: number) => `$${n.toLocaleString('en-US')}M`;

const proposalIcons: LucideIcon[] = [Target, Workflow, Gauge, Network];
const valueChainIcons: LucideIcon[] = [
  Compass,
  BarChart3,
  ShieldCheck,
  Brain,
  LineChart,
  Route,
  Users,
  Gauge,
];
const useCaseIcons: LucideIcon[] = [Compass, LineChart, ShieldCheck, Brain, Users, Network];

export default function CybersecurityBlueprintPage() {
  return (
    <>
      <section className="dark-section noise-texture relative overflow-hidden py-28 lg:py-40">
        <Image
          src="/images/abstract-dataflow.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="pointer-events-none object-cover opacity-[0.2]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/88 to-forge-black/45" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">ClearForge blueprint - cybersecurity technology</p>
          <h1 className="mt-6 max-w-5xl text-display text-bone">
            A James-led AI strategy proposal for a $5B+ ARR cybersecurity technology company.
          </h1>
          <p className="mt-8 max-w-3xl text-body-lg text-stone">
            Find the growth spots in the market. Build the machine around AI and the company&apos;s
            people. Become faster, higher quality, more customer-obsessed, more efficient, and more
            profitable than the rest of the category.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?ref=cybersecurity-blueprint">
                Discuss the Blueprint <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="#value-chain">See the Future State</Link>
            </Button>
          </div>

          <div className="mt-16 grid max-w-4xl gap-10 border-t border-divider-dark pt-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone">
                FTE-equivalent freed
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
                Annual OpEx run-rate
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
                Functions analyzed
              </p>
              <p className="mt-3 text-display text-bone">{functionAnalysis.length}</p>
              <p className="mt-1 text-body-sm text-stone">
                Across {fmt(cybersecurityCompanyFY2026.totalEmployees)} employees
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">The proposal</p>
              <h2 className="mt-6 text-h1">Not a pile of AI pilots. A company operating system.</h2>
            </div>
            <div className="lg:col-span-8 lg:pt-2">
              <p className="text-body-lg text-warm-gray">{carnegieAppeal.genuineInterest}</p>
              <p className="mt-6 text-body-lg text-warm-gray">{carnegieAppeal.whatTheyDoAlready}</p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {strategicProposal.map((pillar, index) => {
              const Icon = proposalIcons[index] ?? Target;

              return (
                <div key={pillar.label} className="border-t border-divider pt-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-divider bg-parchment text-brass">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-brass">
                        {pillar.label}
                      </p>
                      <h3 className="mt-3 text-h3 text-anthracite">{pillar.headline}</h3>
                      <p className="mt-4 text-body text-warm-gray">{pillar.body}</p>
                      <p className="mt-4 border-l-2 border-brass pl-4 text-body-sm text-anthracite">
                        {pillar.proof}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="value-chain" className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="max-w-4xl">
            <p className="overline">Future-state value chain</p>
            <h2 className="mt-6 text-display text-bone">
              The whole company becomes a learning system.
            </h2>
            <p className="mt-6 text-body-lg text-stone">
              The value is not trapped in one function. The future state connects market signal,
              product insight, threat intelligence, engineering delivery, sales execution, customer
              experience, and enterprise operations into one compounding loop.
            </p>
          </div>

          <div className="mt-16">
            {valueChainFutureState.map((stage, index) => {
              const Icon = valueChainIcons[index] ?? Workflow;

              return (
                <div key={stage.stage} className="border-t border-divider-dark py-9 last:border-b">
                  <div className="grid gap-8 lg:grid-cols-[280px_1fr_260px] lg:items-start">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-divider-dark bg-white/5 text-brass-light">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                            Stage {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3 className="mt-2 text-h4 text-bone">{stage.stage}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-body-sm text-stone">{stage.owner}</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                          Current friction
                        </p>
                        <p className="mt-3 text-body text-stone">{stage.today}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brass-light">
                          Future state
                        </p>
                        <p className="mt-3 text-body text-bone">{stage.futureState}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                        First agent systems
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stage.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="border border-divider-dark px-3 py-1 font-mono text-[11px] text-bone"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                      <p className="mt-5 text-body-sm text-brass-light">{stage.metric}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Future-state use cases</p>
          <h2 className="mt-6 max-w-4xl text-display">
            Six wedge systems that make the strategy real.
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg text-warm-gray">
            These are the highest-leverage places to prove the machine: growth, revenue execution,
            threat intelligence, engineering, customer time-to-value, and executive governance.
          </p>

          <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-2">
            {futureStateUseCases.map((useCase, index) => {
              const Icon = useCaseIcons[index] ?? Target;

              return (
                <article key={useCase.name} className="border-t border-divider pt-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-divider bg-warm-white text-brass">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-h3 text-anthracite">{useCase.name}</h3>
                      <p className="mt-3 text-body text-warm-gray">{useCase.strategicRole}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-body text-anthracite">{useCase.agentSystem}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        First data sources
                      </p>
                      <ul className="mt-3 space-y-2">
                        {useCase.firstDataSources.map((source) => (
                          <li key={source} className="flex gap-2 text-body-sm text-warm-gray">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                            <span>{source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        Business outcomes
                      </p>
                      <ul className="mt-3 space-y-2">
                        {useCase.businessOutcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-2 text-body-sm text-warm-gray">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">FY2026 baseline</p>
          <h2 className="mt-6 max-w-3xl text-display">
            Starting from public-company math, then refining with internal data.
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-warm-gray">
            Baseline sourced from public FY2026 reporting for a cybersecurity technology company
            that ended its fiscal year on {cybersecurityCompanyFY2026.fiscalYearEnded}. Internal
            validation would replace estimates with actual system-of-record data.
          </p>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total revenue', value: fmtMoney(cybersecurityCompanyFY2026.totalRevenueM) },
              {
                label: 'Annual recurring revenue',
                value: fmtMoney(cybersecurityCompanyFY2026.arrM),
              },
              { label: 'Net new ARR', value: fmtMoney(cybersecurityCompanyFY2026.netNewArrM) },
              {
                label: 'Free cash flow',
                value: fmtMoney(cybersecurityCompanyFY2026.freeCashFlowM),
              },
              { label: 'Total employees', value: fmt(cybersecurityCompanyFY2026.totalEmployees) },
              { label: 'S&M spend', value: fmtMoney(cybersecurityCompanyFY2026.smSpendM) },
              { label: 'R&D spend', value: fmtMoney(cybersecurityCompanyFY2026.rdSpendM) },
              { label: 'G&A spend', value: fmtMoney(cybersecurityCompanyFY2026.gaSpendM) },
            ].map((metric) => (
              <div key={metric.label} className="border-t border-divider pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">
                  {metric.label}
                </p>
                <p className="mt-3 text-h2 text-anthracite">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Function-level value map</p>
          <h2 className="mt-6 max-w-4xl text-display text-bone">
            Where AI agents create value, by function.
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg text-stone">
            This is the quantitative layer behind the strategy: estimated headcount, automation fit,
            FTE-equivalent capacity freed, and hours returned to higher-value work.
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
                    FTE-equiv freed
                  </th>
                  <th className="py-4 text-right font-mono text-xs uppercase tracking-widest text-stone">
                    Annual hours freed
                  </th>
                </tr>
              </thead>
              <tbody>
                {functionAnalysis.map((fn) => (
                  <tr key={fn.function} className="border-b border-divider-dark/50">
                    <td className="py-5 pr-6 text-body text-bone">
                      <a
                        href={`#fn-${fn.function.replace(/[^a-z]+/gi, '-').toLowerCase()}`}
                        className="transition-colors hover:text-brass-light"
                      >
                        {fn.function}
                      </a>
                    </td>
                    <td className="py-5 text-right font-mono text-sm tabular-nums text-stone">
                      {fmt(fn.estimatedHeadcount)}
                    </td>
                    <td className="py-5 text-right font-mono text-sm tabular-nums text-bone">
                      <span className="inline-block min-w-[3.5em]">
                        {fn.aiAutomationPct.toFixed(0)}%
                      </span>
                      <span className="ml-3 inline-block h-1 w-20 bg-divider-dark/50 align-middle">
                        <span
                          className="block h-1 bg-brass-light"
                          style={{ width: `${fn.aiAutomationPct}%` }}
                        />
                      </span>
                    </td>
                    <td className="py-5 text-right font-mono text-sm tabular-nums text-bone">
                      ~{fmt(fn.fteEquivalentFreed)}
                    </td>
                    <td className="py-5 text-right font-mono text-sm tabular-nums text-stone">
                      {fmt(fn.annualHoursFreed)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-brass-light">
                  <td className="py-6 pr-6 text-body font-medium text-bone">Enterprise total</td>
                  <td className="py-6 text-right font-mono text-base tabular-nums text-bone">
                    {fmt(cybersecurityCompanyFY2026.totalEmployees)}
                  </td>
                  <td className="py-6 text-right font-mono text-base tabular-nums text-brass-light">
                    {blueprintSummary.pctOfTotalWorkforceCapacity}%
                  </td>
                  <td className="py-6 text-right font-mono text-base tabular-nums text-brass-light">
                    ~{fmt(blueprintSummary.totalFTEEquivalentFreed)}
                  </td>
                  <td className="py-6 text-right font-mono text-base tabular-nums text-stone">
                    {fmt(functionAnalysis.reduce((sum, fn) => sum + fn.annualHoursFreed, 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-body-sm text-stone">
            Methodology: headcount triangulated from public OpEx allocation, Apollo title sample,
            and cybersecurity-industry benchmarks. AI-automation percentages are grounded in the
            Bain/Dell Automation Ambition opportunity-sizing method. FTE-equivalent freed = HC x
            auto %. Annual hours freed = FTE x 2,080.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Function deep-dive</p>
          <h2 className="mt-6 max-w-3xl text-display">
            From-state to future-state, with the agent system that does the work.
          </h2>

          <div className="mt-16">
            {functionAnalysis.map((fn, index) => (
              <div
                key={fn.function}
                id={`fn-${fn.function.replace(/[^a-z]+/gi, '-').toLowerCase()}`}
                className="border-t border-divider py-12 last:border-b lg:py-16"
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-brass">
                      {String(index + 1).padStart(2, '0')} / {fn.aiAutomationPct.toFixed(0)}%
                      automatable / ~{fmt(fn.fteEquivalentFreed)} FTE freed
                    </p>
                    <h3 className="mt-3 text-h2">{fn.function}</h3>
                    <p className="mt-3 text-body text-warm-gray">
                      Est. {fmt(fn.estimatedHeadcount)} employees / {fn.shareOfTotalHCPct}% of total
                    </p>
                    <p className="mt-2 text-body-sm italic text-warm-gray">{fn.derivationNote}</p>
                    {fn.sampleApolloTitles.length > 0 && (
                      <div className="mt-6">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                          Roles found in title sample
                        </p>
                        <ul className="mt-2 space-y-1">
                          {fn.sampleApolloTitles.slice(0, 5).map((title) => (
                            <li key={title} className="text-body-sm text-anthracite">
                              - {title}
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
                          From-state today
                        </p>
                        <p className="mt-3 text-body text-anthracite">{fn.fromTo.fromState}</p>
                      </div>
                      <div className="border-l-2 border-brass pl-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brass">
                          Future-state with agents
                        </p>
                        <p className="mt-3 text-body text-anthracite">{fn.fromTo.toState}</p>
                      </div>
                    </div>
                    <div className="mt-8 border-t border-divider pt-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        Agent archetype
                      </p>
                      <p className="mt-2 text-body font-medium text-anthracite">
                        {fn.fromTo.agentArchetype}
                      </p>
                    </div>
                    <div className="mt-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">
                        Example output
                      </p>
                      <p className="mt-2 text-body italic text-warm-gray">
                        {fn.fromTo.exampleOutput}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Execution path</p>
          <h2 className="mt-6 max-w-4xl text-display text-bone">
            A 30-day diagnostic, a 90-day proof, then a permanent AI transformation engine.
          </h2>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {proposalRoadmap.map((phase) => (
              <div key={phase.window} className="border-t border-divider-dark pt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-brass-light">
                  {phase.window}
                </p>
                <h3 className="mt-3 text-h2 text-bone">{phase.name}</h3>
                <p className="mt-4 text-body text-stone">{phase.promise}</p>
                <ul className="mt-6 space-y-3">
                  {phase.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3 text-body-sm text-bone">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-divider-dark pt-12">
            <p className="overline">ClearForge transformation method</p>
            <h3 className="mt-5 max-w-3xl text-h1 text-bone">
              Identify, size, sequence, sprint - with business metrics attached.
            </h3>
            <div className="mt-12">
              {transformationMethod.map((phase) => (
                <div key={phase.phase} className="border-t border-divider-dark py-10 last:border-b">
                  <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-4">
                      <p className="font-mono text-xs uppercase tracking-widest text-brass-light">
                        Phase {phase.phase} / weeks {phase.weeks}
                      </p>
                      <h4 className="mt-3 text-h2 text-bone">{phase.name}</h4>
                    </div>
                    <div className="mt-6 lg:col-span-8 lg:mt-0">
                      <p className="text-body-lg text-stone">{phase.description}</p>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div className="border-l-2 border-brass-light pl-5">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-brass-light">
                            Deliverable
                          </p>
                          <p className="mt-2 text-body text-bone">{phase.deliverable}</p>
                        </div>
                        <div className="border-l-2 border-divider-dark pl-5">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
                            Company-specific application
                          </p>
                          <p className="mt-2 text-body text-stone">{phase.companySpecific}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Why James + ClearForge</p>
              <h2 className="mt-6 text-display">Builder, operator, and AI transformation lead.</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-lg text-warm-gray">{whyJames.appreciation}</p>
              <div className="mt-12">
                {whyJames.experienceMatches.map((match) => (
                  <div
                    key={match.jdRequirement}
                    className="border-t border-divider py-8 last:border-b"
                  >
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                      <div className="lg:col-span-5">
                        <p className="font-mono text-xs uppercase tracking-widest text-warm-gray">
                          What the role needs
                        </p>
                        <p className="mt-2 text-body font-medium text-anthracite">
                          {match.jdRequirement}
                        </p>
                      </div>
                      <div className="mt-4 lg:col-span-7 lg:mt-0">
                        <p className="font-mono text-xs uppercase tracking-widest text-brass">
                          ClearForge proof
                        </p>
                        <p className="mt-2 text-body text-anthracite">{match.proof}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-section py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="overline">Next step</p>
          <h2 className="mt-6 text-display text-bone">
            Fifteen minutes to pressure-test the blueprint and pick the first sprint.
          </h2>
          <p className="mt-6 text-body-lg text-stone">{carnegieAppeal.callToAction}</p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/contact?ref=cybersecurity-blueprint">
                Schedule the Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <a href="mailto:james@clearforge.ai?subject=Cybersecurity%20AI%20Strategy%20Blueprint">
                james@clearforge.ai
              </a>
            </Button>
          </div>
          <p className="mt-12 text-body-sm text-stone">
            James Penz / Founder, ClearForge.AI / Ex-Bain Automation Center of Excellence / builder
            of production multi-agent operating systems
          </p>
        </div>
      </section>
    </>
  );
}
