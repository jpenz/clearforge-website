import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgeAgent } from '@/components/home/forge-agent';
import { Button } from '@/components/ui/button';
import { hero } from '@/data/homepage';

/**
 * V11 cinematic hero — Bain-register: near-black navy canvas with a luminous
 * cobalt render (generated in-house), white Newsreader display with a
 * cobalt-light italic accent, and the live Forge Intelligence agent as a
 * crisp light product card floating against the dark. Content renders
 * instantly; the only client island is the agent.
 */
export function Hero() {
  return (
    <section className="dark-section relative overflow-hidden">
      {/* Luminous render — the HDR layer */}
      <Image
        src="/images/hero-forge-threads.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={65}
        className="pointer-events-none object-cover"
      />
      {/* Legibility gradients — left-weighted like Bain */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,24,38,0.94)_0%,rgba(8,24,38,0.78)_38%,rgba(8,24,38,0.35)_70%,rgba(8,24,38,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081826] to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[clamp(2.5rem,5vw,5rem)] lg:px-10 lg:pb-28 lg:pt-40">
        {/* Left — value prop, white on dark */}
        <div>
          <p className="overline">{hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,6.6vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.015em] text-bone">
            {hero.headlineLead} <span className="display-accent">{hero.headlineAccent}</span>.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">{hero.sub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" asChild>
              <Link href={hero.primaryCta.href} data-analytics="home_hero_primary">
                {hero.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              href={hero.secondaryCta.href}
              data-analytics="home_hero_secondary"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-bone"
            >
              <span className="whitespace-nowrap">
                {hero.secondaryCta.label} <ArrowRight className="inline h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right — the product, live: light card glowing against the dark */}
        <div className="w-full lg:max-w-[30rem] lg:justify-self-end">
          <ForgeAgent />
        </div>
      </div>
    </section>
  );
}
