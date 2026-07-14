'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * V11 header — light (paper) nav; SKU taxonomy drives the Products menu.
 * Desktop: hover/focus dropdowns. Mobile: full drawer. One ember CTA.
 */

const PRODUCTS = [
  {
    href: '/discover',
    tag: 'FORGE-INTEL',
    label: 'Forge Intelligence™',
    desc: 'Live diagnostic agent — paste a URL, get your first AI play.',
  },
  {
    href: '/scorecard',
    tag: 'FORGE-SCORE',
    label: 'Forge Scorecard™',
    desc: '20-question production-readiness score across five pillars.',
  },
  {
    href: '/blueprints',
    tag: 'FORGE-BP',
    label: 'Forge Blueprints™',
    desc: 'Deployment-ready system designs from real engagements.',
  },
  {
    href: '/pricing',
    tag: 'FORGE-METHOD',
    label: 'Forge Method™',
    desc: 'Diagnostic → Sprint → Scale. Fixed scope, published prices.',
  },
] as const;

const RESOURCES = [
  { href: '/blueprints', label: 'Blueprints' },
  { href: '/insights', label: 'Insights' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/operating-model', label: 'Operating model' },
] as const;

const TOP_LINKS = [
  { href: '/industries', label: 'Industries' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/pricing', label: 'Pricing' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-divider bg-parchment/92 backdrop-blur-xl' : 'bg-parchment/0',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex items-baseline gap-0.5">
          <span
            className="text-xl text-anthracite"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            ClearForge
          </span>
          <span className="metric text-sm text-brass">.ai</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {/* Products dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-warm-gray transition-colors hover:text-anthracite"
            >
              Products <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute left-0 top-full w-[26rem] translate-y-1 rounded-[12px] border border-divider bg-warm-white p-2 opacity-0 shadow-[0_20px_60px_-20px_rgba(20,18,16,0.25)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.href + p.tag}
                  href={p.href}
                  className="block rounded-[6px] px-3.5 py-3 transition-colors hover:bg-recessed"
                >
                  <span className="metric text-[10px] uppercase tracking-[0.14em] text-brass">
                    {p.tag}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-anthracite">
                    {p.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-warm-gray">{p.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {TOP_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-sm font-medium text-warm-gray transition-colors hover:text-anthracite"
            >
              {l.label}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-warm-gray transition-colors hover:text-anthracite"
            >
              Resources <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute right-0 top-full w-52 translate-y-1 rounded-[12px] border border-divider bg-warm-white p-2 opacity-0 shadow-[0_20px_60px_-20px_rgba(20,18,16,0.25)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {RESOURCES.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block rounded-[6px] px-3.5 py-2.5 text-sm font-medium text-anthracite transition-colors hover:bg-recessed"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/scorecard" data-analytics="nav_readiness_score">
              Get your readiness score
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center text-anthracite lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-anthracite/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto border-l border-divider bg-parchment p-6">
            <div className="flex items-center justify-between">
              <span
                className="text-lg text-anthracite"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                ClearForge<span className="metric text-sm text-brass">.ai</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-warm-gray"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="overline mt-8">Products</p>
            <div className="mt-3 space-y-1">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.href + p.tag}
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[6px] px-3 py-2.5 hover:bg-recessed"
                >
                  <span className="block text-[15px] font-semibold text-anthracite">{p.label}</span>
                  <span className="mt-0.5 block text-xs text-warm-gray">{p.desc}</span>
                </Link>
              ))}
            </div>

            <p className="overline mt-7">Explore</p>
            <div className="mt-3 space-y-1">
              {[...TOP_LINKS, ...RESOURCES].map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[6px] px-3 py-2.5 text-[15px] font-medium text-anthracite hover:bg-recessed"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Button size="lg" className="mt-8 w-full" asChild>
              <Link href="/scorecard" onClick={() => setOpen(false)}>
                Get your readiness score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="metric mt-3 text-center text-[11px] text-warm-gray">
              Free · ~4 minutes · benchmarked
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
