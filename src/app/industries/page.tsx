import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import {
  industries,
  industryCategories,
  getIndustriesByCategory,
} from '@/data/industries-value-chains';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Industries — AI Agents & Automation | ClearForge',
  description:
    'AI agents and automation for every industry. Full operating value chains across financial services, manufacturing, healthcare, retail, logistics, energy, and more — with the specific activities ClearForge ships in production.',
  path: '/industries',
  keywords: [
    'AI consulting industries',
    'AI agents value chain',
    'industry AI automation',
    'AI consulting by industry',
  ],
});

export default function IndustriesIndexPage() {
  const grouped = getIndustriesByCategory();
  const totalActivities = industries.reduce(
    (acc, ind) => acc + ind.valueChain.reduce((a, fn) => a + fn.activities.length, 0),
    0,
  );

  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-network.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeIn>
            <p className="overline">Industries</p>
            <h1
              className="mt-6 text-display max-w-4xl text-bone"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              Production AI for every operating value chain.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-xl text-body-lg text-stone">
              {industries.length} industries. {totalActivities}+ addressable activities. Each one mapped
              to a specific AI agent, predictive model, copilot, or workflow automation we ship in
              production.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* — Industries by Category — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {industryCategories
            .filter((cat) => grouped[cat] && grouped[cat].length > 0)
            .map((category, ci) => (
              <div key={category} className={ci === 0 ? '' : 'mt-24 lg:mt-32'}>
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-baseline border-t border-divider pt-10">
                  <div className="lg:col-span-4">
                    <p className="overline">{String(ci + 1).padStart(2, '0')} · {category}</p>
                    <h2
                      className="mt-4 text-h1"
                      style={{ fontFamily: 'var(--font-instrument-serif)' }}
                    >
                      {category}
                    </h2>
                  </div>

                  <Stagger className="lg:col-span-8 mt-8 lg:mt-0" stagger={0.06}>
                    {grouped[category].map((ind) => {
                      const totalCount = ind.valueChain.reduce((a, fn) => a + fn.activities.length, 0);
                      return (
                        <StaggerItem key={ind.slug}>
                          <Link
                            href={`/industries/${ind.slug}`}
                            className="group block border-t border-divider py-8 lg:py-10 transition-colors hover:bg-warm-white -mx-6 px-6 lg:-mx-10 lg:px-10"
                          >
                            <div className="lg:flex lg:items-baseline lg:justify-between gap-8">
                              <div className="flex-1 min-w-0">
                                <h3
                                  className="text-h3 group-hover:text-brass transition-colors"
                                  style={{ fontFamily: 'var(--font-instrument-serif)' }}
                                >
                                  {ind.name}
                                </h3>
                                <p className="mt-2 text-body text-warm-gray max-w-xl">{ind.oneLiner}</p>
                              </div>
                              <div className="mt-3 lg:mt-0 flex items-baseline gap-6 shrink-0">
                                <div className="text-right">
                                  <span
                                    className="metric text-base text-warm-gray"
                                    style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                                  >
                                    {totalCount} activities
                                  </span>
                                  <p className="text-[10px] text-warm-gray uppercase tracking-widest mt-0.5">
                                    {ind.valueChain.length} functions
                                  </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-warm-gray group-hover:text-brass group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </Link>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              </div>
            ))}
          <div className="border-t border-divider mt-12" />
        </div>
      </section>

      {/* — Don't see your industry CTA — */}
      <section className="bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-baseline">
            <div className="lg:col-span-5">
              <p className="overline">Custom Value Chain</p>
              <h2 className="mt-6 text-display">
                Don&apos;t see your industry? Get a custom one.
              </h2>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                Forge Intelligence™ generates a personalized AI value chain from your company website —
                every function, every activity in your operating model, with the specific AI agents
                and automations ClearForge would ship first.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/discover">
                    Generate My Custom Value Chain <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Schedule a Discussion</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Final CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            Where would AI move your P&amp;L first?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            Most companies leave 3-7 points of margin on the table because AI initiatives stall in
            pilot. The Forge Diagnostic identifies exactly where AI ships in 90 days.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
