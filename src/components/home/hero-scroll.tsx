'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * V8 Hero — Pinned scroll experience.
 *
 * Desktop: Pins for 2.5x viewport height with a GSAP timeline:
 *   0–40%  : Headline words reveal one-by-one, background parallax
 *   40–70% : Case study card slides in from right, trust metrics appear
 *   70–100%: Three content cards slide up from bottom, section unpins
 *
 * Mobile (<768px): Static stack with CSS fade-in classes (no pin).
 */
export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 768;
      if (isMobile) return; // Mobile uses CSS animations, no GSAP pin

      const bg = bgRef.current;
      const headline = headlineRef.current;
      const subtext = subtextRef.current;
      const cta = ctaRef.current;
      const overline = overlineRef.current;
      const caseStudy = caseStudyRef.current;
      const trust = trustRef.current;
      const cards = cardsRef.current;

      if (!bg || !headline || !subtext || !cta || !overline || !caseStudy || !trust || !cards) return;

      const headlineWords = headline.querySelectorAll<HTMLElement>('.hero-word-inner');
      const trustItems = trust.querySelectorAll<HTMLElement>('.trust-item');
      const cardItems = cards.querySelectorAll<HTMLElement>('.hero-card');

      // Set initial states
      gsap.set(headlineWords, { y: '110%', opacity: 0 });
      gsap.set(overline, { opacity: 0, y: 12 });
      gsap.set(subtext, { opacity: 0, y: 20 });
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.set(caseStudy, { x: 80, opacity: 0 });
      gsap.set(trustItems, { opacity: 0, y: 16 });
      gsap.set(cardItems, { opacity: 0, y: 60 });

      // Master timeline pinned to 2.5x viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
        },
      });

      // ── Phase 1: 0–40% — Headline reveal + background parallax ──
      tl.to(overline, { opacity: 1, y: 0, duration: 0.05, ease: 'power3.out' }, 0);

      tl.to(headlineWords, {
        y: '0%',
        opacity: 1,
        stagger: 0.02,
        duration: 0.25,
        ease: 'power3.out',
      }, 0.03);

      tl.to(bg, { y: -60, duration: 1, ease: 'none' }, 0);

      tl.to(subtext, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.2);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.25);

      // ── Phase 2: 40–70% — Case study + trust metrics ──
      tl.to(caseStudy, {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: 'power3.out',
      }, 0.4);

      tl.to(trustItems, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.12,
        ease: 'power3.out',
      }, 0.5);

      // ── Phase 3: 70–100% — Content cards slide up ──
      tl.to(cardItems, {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.2,
        ease: 'power3.out',
      }, 0.7);
    },
    { scope: sectionRef },
  );

  // Split headline into words for animation
  const headlineText1 = 'Stuck in AI pilot purgatory?';
  const headlineText2 = 'We build production systems in 10 weeks.';

  const renderWords = (text: string, italic = false) =>
    text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
        <span
          className={`hero-word-inner inline-block will-change-transform ${italic ? 'italic text-brass-light' : ''}`}
        >
          {word}
        </span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="dark-section relative min-h-[100svh] overflow-hidden"
    >
      {/* Background with parallax target */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-transparent to-forge-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        {/* Asymmetric grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

          {/* LEFT: Headline + CTA */}
          <div className="lg:col-span-7 lg:pt-8">
            <p
              ref={overlineRef}
              className="overline text-xs md:animate-fade-in"
            >
              Production AI for Mid-Market &amp; Growth-Stage Companies
            </p>

            <h1
              ref={headlineRef}
              className="mt-6 text-bone md:animate-fade-in-up"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              {renderWords(headlineText1)}{' '}
              {renderWords(headlineText2, true)}
            </h1>

            <div ref={subtextRef} className="md:animate-fade-in-up">
              <p className="mt-6 text-body-lg text-stone max-w-lg">
                No enterprise budgets. No strategy decks collecting dust.
                Your AI system, live in your business, in 10 weeks flat.
              </p>
            </div>

            <div ref={ctaRef} className="md:animate-fade-in-up">
              <div className="mt-8 flex flex-wrap gap-4">
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
              <p className="mt-3 text-xs text-stone/60">
                Free · 5 minutes · No sales call required
              </p>
            </div>

            {/* Trust metrics (phase 2) */}
            <div ref={trustRef} className="mt-8 flex flex-wrap gap-6 md:animate-fade-in-up">
              {[
                { value: '89%', label: 'Production rate' },
                { value: '3.2x', label: 'Avg ROI' },
                { value: '<90 days', label: 'To first ROI' },
              ].map((m) => (
                <div key={m.label} className="trust-item will-change-transform">
                  <span className="metric text-lg text-brass-light">{m.value}</span>
                  <p className="text-xs text-stone/70">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured case study card (phase 2) */}
          <div ref={caseStudyRef} className="lg:col-span-5 mt-12 lg:mt-0 will-change-transform md:animate-fade-in-up">
            <Link href="/case-studies/industrial-manufacturer" className="group block">
              <div className="relative overflow-hidden bg-gradient-to-b from-brass/10 to-forge-black border border-divider-dark">
                <div className="relative h-48 lg:h-56 img-zoom">
                  <Image
                    src="/images/featured-case-study.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forge-black to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light bg-forge-black/60 px-2 py-1">
                    Case Study
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl text-bone font-medium leading-snug group-hover:text-brass-light transition-colors"
                    style={{ fontFamily: 'var(--font-instrument-serif)' }}
                  >
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

        {/* Bottom row: 3 content cards (phase 3) */}
        <div ref={cardsRef} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:animate-fade-in-up">
          <Link href="/insights" className="hero-card group relative overflow-hidden h-52 md:h-48 will-change-transform card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-finance.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-30" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Research</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                The AI value gap: why 87% of pilots never reach production
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Read more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>

          <Link href="/discover" className="hero-card group relative overflow-hidden h-52 md:h-48 will-change-transform card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-teal-900/60" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-healthcare.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-20" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">Interactive Tool</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                AI Readiness Assessment — get your personalized report in 5 minutes
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                Start now <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>

          <Link href="/services" className="hero-card group relative overflow-hidden h-52 md:h-48 will-change-transform card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-gray-900/80" />
            <div className="img-zoom absolute inset-0">
              <Image src="/images/card-manufacturing.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-20" />
            </div>
            <div className="relative h-full p-5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brass-light">The Forge Method</span>
              <h4 className="mt-2 text-bone text-sm font-medium leading-snug group-hover:text-brass-light transition-colors">
                From diagnosis to production in 90 days — transparent timelines, transparent investment
              </h4>
              <span className="mt-2 inline-flex items-center text-xs text-stone group-hover:text-bone transition-colors">
                How it works <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
