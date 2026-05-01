import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * V8.18 Editorial Hero with ambient video background.
 *
 * Scroll-scrub was tried in V8.17 but pinning the user for 120% viewport
 * scroll felt wrong for a consulting site — enterprise buyers want to scan
 * quickly, not wait through a forced animation. Reverted to a plain
 * autoplay loop: the video adds motion without interrupting scroll.
 *
 * Mobile gets the same video (now only 271KB, down from 4.8MB in V8.4),
 * so we no longer need a separate static image fallback for mobile.
 */
export function HeroScroll() {
  return (
    <section className="dark-section relative min-h-[86svh] overflow-hidden">
      {/* Ambient video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-bg.webp"
        className="absolute inset-0 h-full w-full object-cover opacity-52 motion-reduce:hidden"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Mobile-only static fallback for reduced-motion users */}
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover opacity-50 motion-reduce:block hidden pointer-events-none"
      />

      {/* Gradient — keeps headline legible */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,30,0.92)_0%,rgba(10,15,30,0.74)_46%,rgba(10,15,30,0.38)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forge-black to-transparent pointer-events-none" />

      {/* Process rail — text in the scene, not a separate card. */}
      <div className="absolute bottom-0 left-0 right-0 hidden border-t border-bone/10 lg:block">
        <div className="mx-auto grid max-w-[1400px] grid-cols-4 px-10">
          {[
            ['01', 'Find the value'],
            ['02', 'Build the system'],
            ['03', 'Deploy with operators'],
            ['04', 'Measure and improve'],
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
        <p className="overline text-xs animate-fade-in">Production AI for operators</p>

        <h1 className="mt-7 max-w-[980px] text-[3rem] leading-[1.02] text-bone sm:text-[4.5rem] lg:text-[5.8rem]">
          AI strategy that becomes operating capacity.
        </h1>
        <p className="mt-3 max-w-[900px] font-display text-[2.4rem] italic leading-[1.05] text-brass-light sm:text-[3.8rem] lg:text-[4.8rem]">
          Not another deck.
        </p>

        <p className="mt-8 max-w-2xl text-body-lg text-stone animate-fade-in-up delay-3">
          ClearForge maps where AI can move revenue, cost, or throughput, then builds the production
          systems and trains your team to run them. One senior team from first brief to measurable
          value.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up delay-4">
          <Button size="lg" asChild>
            <Link href="/discover">Generate My AI Value Map</Link>
          </Button>
          <Link
            href="#results"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
          >
            See proof <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-xs text-stone/50 animate-fade-in delay-5">
          Five minutes. Website-based analysis. No sales call required.
        </p>
      </div>
    </section>
  );
}
