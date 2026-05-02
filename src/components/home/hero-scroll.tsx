import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSignalOverlay } from './hero-signal-overlay';
import { HeroVideoBackground } from './hero-video-background';

/**
 * V8.18 Editorial Hero with ambient video background.
 *
 * Scroll-scrub was tried in V8.17 but pinning the user for 120% viewport
 * scroll felt wrong for a consulting site — enterprise buyers want to scan
 * quickly, not wait through a forced animation. Reverted to a plain
 * autoplay loop: the video adds motion without interrupting scroll.
 *
 * The background media is now isolated in HeroVideoBackground so accessibility,
 * reduced-motion behavior, and future generated video assets stay in one place.
 */
export function HeroScroll() {
  return (
    <section className="dark-section relative min-h-[86svh] overflow-hidden">
      <HeroVideoBackground />
      <HeroSignalOverlay />

      {/* Gradient — keeps headline legible */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,30,0.92)_0%,rgba(10,15,30,0.74)_46%,rgba(10,15,30,0.38)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forge-black to-transparent pointer-events-none" />

      {/* Process rail — text in the scene, not a separate card. */}
      <div className="absolute bottom-0 left-0 right-0 hidden border-t border-bone/10 lg:block">
        <div className="mx-auto grid max-w-[1400px] grid-cols-4 px-10">
          {[
            ['01', 'Find the constraint'],
            ['02', 'Design the workflow'],
            ['03', 'Ship the system'],
            ['04', 'Run the cadence'],
          ].map(([step, label]) => (
            <div key={step} className="border-l border-bone/10 px-6 py-5 last:border-r">
              <p className="metric text-xs text-brass-light">{step}</p>
              <p className="mt-1 text-sm text-bone/70">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[86svh] w-full max-w-[1400px] flex-col justify-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pb-40">
        <p className="overline text-xs animate-fade-in">Custom AI systems for operators</p>

        <h1 className="mt-7 max-w-[980px] text-[2.7rem] leading-[1.02] text-bone sm:text-[4rem] lg:text-[5.2rem]">
          Find the work that moves the numbers. Build the AI system that makes it repeatable.
        </h1>
        <p className="mt-3 max-w-[900px] font-display text-[2.25rem] italic leading-[1.05] text-brass-light sm:text-[3.4rem] lg:text-[4.2rem]">
          With your people in control.
        </p>

        <p className="mt-8 max-w-2xl text-body-lg text-stone animate-fade-in-up delay-3">
          ClearForge maps the revenue, service, quality, cost, and decision workflows where better
          execution would matter, then builds the agents, integrations, dashboards, controls, and
          team routines to run them.
        </p>

        <div className="mt-7 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-5 animate-fade-in-up delay-3">
          {['Growth', 'Speed', 'Quality', 'Service', 'Margin'].map((advantage) => (
            <div key={advantage} className="border-t border-bone/15 pt-3">
              <p className="text-xs font-semibold text-bone/80">{advantage}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up delay-4">
          <Button size="lg" asChild>
            <Link href="/discover" data-analytics="home_hero_generate_value_map">
              Generate My AI Value Map
            </Link>
          </Button>
          <Link
            href="#results"
            data-analytics="home_hero_see_proof"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
          >
            See proof <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-xs text-stone/50 animate-fade-in delay-5">
          Five minutes. Company-specific first read. No template deck.
        </p>
      </div>
    </section>
  );
}
