import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroOperatingScene } from './hero-operating-scene';

/**
 * Editorial hero with an operator-grade dashboard scene.
 * The motion is CSS-native and subtle, avoiding the grain and distraction of
 * autoplay video while keeping the first viewport visually specific.
 */
export function HeroScroll() {
  return (
    <section className="dark-section relative min-h-[86svh] overflow-hidden">
      <HeroOperatingScene />

      {/* Gradient keeps headline legible. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,30,0.92)_0%,rgba(10,15,30,0.74)_46%,rgba(10,15,30,0.38)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forge-black to-transparent pointer-events-none" />

      {/* Process rail: text in the scene, not a separate card. */}
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
        <p className="overline text-xs animate-fade-in">AI strategy and build for operators</p>

        <h1 className="mt-7 max-w-[800px] text-[2.35rem] leading-[1.03] text-bone sm:text-[3.6rem] lg:text-[4.9rem]">
          Turn one important workflow into a working AI operating system.
        </h1>
        <p className="mt-3 max-w-[760px] font-display text-[2rem] italic leading-[1.05] text-brass-light sm:text-[3rem] lg:text-[3.7rem]">
          Then scale from proof.
        </p>

        <p className="mt-7 max-w-xl text-body-lg text-stone animate-fade-in-up delay-3">
          ClearForge finds the constraint, builds the custom AI around your systems and people, and
          installs the controls, dashboard, and cadence that make performance measurable.
        </p>

        <div className="mt-7 hidden max-w-3xl grid-cols-2 gap-x-5 gap-y-3 sm:grid sm:grid-cols-4 animate-fade-in-up delay-3">
          {['Workflow first', 'Custom build', 'Human controlled', 'Measured weekly'].map(
            (advantage) => (
              <div key={advantage} className="border-t border-bone/15 pt-3">
                <p className="text-xs font-semibold text-bone/80">{advantage}</p>
              </div>
            ),
          )}
        </div>

        <div className="mt-9 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 animate-fade-in-up delay-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/discover" data-analytics="home_hero_generate_value_map">
              Generate AI Value Map
            </Link>
          </Button>
          <Button size="lg" variant="outline-light" className="w-full sm:w-auto" asChild>
            <Link href="/contact" data-analytics="home_hero_book_diagnostic">
              Book Diagnostic Call
            </Link>
          </Button>
          <Link
            href="/case-studies"
            data-analytics="home_hero_view_proof"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
          >
            View proof <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-xs text-stone/50 animate-fade-in delay-5">
          Five-minute first read. No template deck.
        </p>
      </div>
    </section>
  );
}
