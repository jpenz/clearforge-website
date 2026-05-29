import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeAgent } from '@/components/home/forge-agent';
import { Button } from '@/components/ui/button';

const heroSteps = [
  'Strategy',
  'Operating design',
  'Custom systems',
  'Adoption',
  'Measured value',
] as const;

const outcomePaths = [
  {
    href: '/use-cases/ai-sales-pipeline-acceleration',
    label: 'Revenue growth',
    detail: 'Find demand signals and move sellers to the next best action.',
  },
  {
    href: '/use-cases/ai-customer-service-excellence',
    label: 'Service quality',
    detail: 'Reduce response variance without hiding escalation or judgment.',
  },
  {
    href: '/use-cases/ai-operations-efficiency-system',
    label: 'Operating efficiency',
    detail: 'Move approvals, coordination, and exception work into a managed flow.',
  },
  {
    href: '/use-cases/pe-portfolio-ai-value-creation',
    label: 'Enterprise value',
    detail: 'Prioritize workflows by value, feasibility, adoption, and margin path.',
  },
] as const;

function OutcomeChooser() {
  return (
    <div className="border-t border-bone/10">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[0.38fr_1fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold text-bone">What should AI move first?</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">
            Start with the business outcome, then design the machine around it.
          </p>
        </div>
        <div className="grid border-y border-bone/10 md:grid-cols-4">
          {outcomePaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group border-b border-bone/10 py-4 md:border-b-0 md:border-l md:px-5 md:first:border-l-0"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-bone">
                {path.label}
                <ArrowUpRight className="h-4 w-4 text-stone transition-colors group-hover:text-brass" />
              </span>
              <span className="mt-3 block text-xs leading-relaxed text-stone">{path.detail}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroScroll() {
  return (
    <section className="dark-section relative overflow-hidden bg-[radial-gradient(circle_at_78%_18%,rgba(11,94,87,0.2),transparent_30%),linear-gradient(180deg,#08090B_0%,#0B0D10_100%)]">
      <picture className="pointer-events-none absolute inset-0 block">
        <source media="(max-width: 767px)" srcSet="/images/hero-operating-system-v2-mobile.webp" />
        <Image
          src="/images/hero-operating-system-v2.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[72%_50%] opacity-[0.42] saturate-[0.88] md:object-center md:opacity-[0.52]"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#08090B_0%,rgba(8,9,11,0.96)_31%,rgba(8,9,11,0.72)_59%,rgba(8,9,11,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.2)_0%,rgba(8,9,11,0.72)_100%)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(242,239,232,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(242,239,232,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forge-black to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-4 pb-12 pt-28 sm:px-6 sm:pt-28 md:grid-cols-[0.95fr_0.58fr] md:items-center md:pb-14 lg:min-h-[74svh] lg:grid-cols-[0.9fr_0.72fr] lg:px-10 lg:pb-10">
        <div className="max-w-[58rem]">
          <p className="overline text-xs">AI transformation strategy and implementation</p>

          <h1 className="mt-7 max-w-[820px] !font-sans text-[3.15rem] font-semibold leading-[0.98] text-bone sm:text-[5rem] lg:text-[6.8rem]">
            Make AI operational.
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-[1.35] text-stone sm:text-2xl">
            ClearForge turns AI ambition into redesigned work, custom systems, team adoption, and
            measurable operating value.
          </p>

          <div className="mt-8 flex max-w-3xl flex-wrap gap-x-5 gap-y-3 border-y border-bone/15 py-4">
            {heroSteps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-2 text-xs font-semibold uppercase text-bone/75"
              >
                <span className="h-px w-4 bg-brass-light/70" />
                {step}
              </div>
            ))}
          </div>

          <div className="mt-9 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/contact" data-analytics="home_hero_schedule_executive_briefing">
                Schedule Executive Briefing
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" className="w-full sm:w-auto" asChild>
              <Link href="/discover" data-analytics="home_hero_generate_value_map">
                Generate AI Value Map
              </Link>
            </Button>
            <Link
              href="/case-studies"
              data-analytics="home_hero_view_operating_evidence"
              className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
            >
              See operating evidence <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-stone/50">
            Strategy to operating cadence. No platform-first agenda.
          </p>
        </div>

        <div className="w-full md:justify-self-end md:max-w-[30rem]">
          <ForgeAgent />
        </div>
      </div>
      <div className="relative z-10">
        <OutcomeChooser />
      </div>
    </section>
  );
}
