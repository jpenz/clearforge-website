import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ForgeAgent } from '@/components/home/forge-agent';
import { Button } from '@/components/ui/button';
import { hero } from '@/data/homepage';

/**
 * V11 Hero — paper surface, Fraunces display with ember italic accent word,
 * and the product itself (Forge Intelligence in browser chrome) as the hero
 * object. Headline is server-rendered text (LCP); the agent is the only
 * client island.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[clamp(2.5rem,5vw,5rem)] lg:px-10 lg:pb-24 lg:pt-40">
        {/* Left — value prop */}
        <div>
          <p className="overline">{hero.eyebrow}</p>
          <h1
            className="mt-6 text-anthracite"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.022em',
              fontWeight: 550,
            }}
          >
            {hero.headlineLead} <span className="display-accent">{hero.headlineAccent}</span>.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-warm-gray">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" asChild>
              <Link href={hero.primaryCta.href} data-analytics="home_hero_primary">
                {hero.primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              href={hero.secondaryCta.href}
              data-analytics="home_hero_secondary"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-warm-gray transition-colors hover:text-brass"
            >
              {hero.secondaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right — the product, live */}
        <div className="w-full lg:max-w-[30rem] lg:justify-self-end">
          <ForgeAgent />
        </div>
      </div>
    </section>
  );
}
