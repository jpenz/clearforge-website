'use client';

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
    <section className="dark-section relative min-h-screen flex items-end overflow-hidden">
      {/* Ambient video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-bg.webp"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
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
        className="object-cover opacity-40 motion-reduce:block hidden pointer-events-none"
      />

      {/* Gradient — keeps headline legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/35 to-forge-black/25 pointer-events-none" />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-28 pt-32 sm:pt-40">
        <p className="overline text-xs animate-fade-in">
          Production AI for Mid-Market &amp; Growth-Stage Companies
        </p>

        <h1
          className="mt-8 max-w-[1050px] text-bone animate-fade-in-up delay-1"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          AI strategy that ends in a working system.
        </h1>
        <p
          className="mt-2 max-w-[1050px] text-brass-light animate-fade-in-up delay-2"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          Not a deck on a shelf.
        </p>

        <p className="mt-8 text-body-lg text-stone max-w-xl animate-fade-in-up delay-3">
          We diagnose, build, and deploy AI systems for mid-market
          operators — in ten weeks, measured against revenue, cost, or
          throughput. The same senior team stays from first brief to
          production.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up delay-4">
          <Button size="lg" asChild>
            <Link href="/discover">Get My Free AI Readiness Score</Link>
          </Button>
          <Link
            href="#results"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-bone transition-colors link-underline"
          >
            See the work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-xs text-stone/50 animate-fade-in delay-5">
          Five minutes. No sales call. AI-powered readiness report.
        </p>
      </div>
    </section>
  );
}
