'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * V7.1 Hero — McKinsey-level editorial layout.
 *
 * Asymmetric split: bold headline left, featured case study card right.
 * Dense above-the-fold content. Rich imagery. No empty space.
 *
 * Research: 0.05s credibility judgment. 94% design-driven.
 * McKinsey pattern: headline + 3-4 content cards above the fold.
 */
export function HeroScroll() {
  return (
    <section className="dark-section relative min-h-[100svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-transparent to-forge-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-28 pb-16 lg:pt-32 lg:pb-20">
        {/* Asymmetric grid: headline left, featured card right */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

          {/* LEFT: Headline + CTA (7 cols) */}
          <div className="lg:col-span-7 lg:pt-8">
            <p className="overline animate-fade-in text-xs">
              Production AI for Mid-Market & Growth-Stage Companies
            </p>

            <h1 className="mt-6 text-bone animate-fade-in-up delay-1" style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}>
              Stuck in AI pilot purgatory?{' '}
              <em className="italic text-brass-light">We build production systems in 10 weeks.</em>
            </h1>

            <p className="mt-6 text-body-lg text-stone max-w-lg animate-fade-in-up delay-2">
              No enterprise budgets. No strategy decks collecting dust.
              Your AI system, live in your business, in 10 weeks flat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-3">
              <Button size="lg" asChild>
                <Link href="/discover">Get My Free AI Readiness Score</Link>
              </Button>
              <Link
                href="#results"
                className="inline-flex items-center gap-2 text-sm font-medium text-bone/60 hover:text-bone transition-colors h-12 px-4"
              >
                See our work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-3 text-xs text-stone/60 animate-fade-in delay-4">
              Free · 5 minutes · No sales call required
            </p>
          </div>

          {/* RIGHT: Featured case study card (5 cols) */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 animate-fade-in-up delay-3">
            <Link href="/case-studies/industrial-manufacturer" className="group block">
              <div className="relative overflow-hidden bg-gradient-to-b from-brass/10 to-forge-black border border-divider-dark">
                {/* Card image */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <Image
                    src="/images/featured-case-study.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forge-black to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light bg-forge-black/60 px-2 py-1">
                    Case Study
                  </span>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-xl text-bone font-medium leading-snug group-hover:text-brass-light transition-colors" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                    How a $4B industrial conglomerate identified 1,181 qualified opportunities in 6 months
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-stone">
                    Read the case study <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom row: 3 content cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-4">
          {/* Card 1: Report */}
          <Link href="/insights" className="group relative overflow-hidden h-52 md:h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80" />
            <Image src="/images/card-finance.jpg" alt="" fill className="object-cover opacity-30" />
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Research</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                The AI value gap: why 87% of pilots never reach production
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Read more <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Card 2: Assessment */}
          <Link href="/discover" className="group relative overflow-hidden h-52 md:h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-teal-900/60" />
            <Image src="/images/card-healthcare.jpg" alt="" fill className="object-cover opacity-20" />
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Interactive Tool</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                AI Readiness Assessment — get your personalized report in 5 minutes
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Start now <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Card 3: Forge Method */}
          <Link href="/services" className="group relative overflow-hidden h-52 md:h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-gray-900/80" />
            <Image src="/images/card-manufacturing.jpg" alt="" fill className="object-cover opacity-20" />
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">The Forge Method</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                From diagnosis to production in 90 days — transparent timelines, transparent investment
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                How it works <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
