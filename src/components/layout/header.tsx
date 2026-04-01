'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, Menu, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_SECTIONS = [
  {
    title: 'Industries',
    links: [
      { href: '/industries/manufacturing', label: 'Manufacturing & Industrial' },
      { href: '/industries/financial-services', label: 'Financial Services' },
      { href: '/industries/healthcare', label: 'Healthcare & Life Sciences' },
      { href: '/industries/saas', label: 'SaaS & Technology' },
      { href: '/industries/private-equity', label: 'Private Equity' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { href: '/services/ai-revenue-operations', label: 'AI Revenue Operations' },
      { href: '/services/performance-improvement', label: 'Performance Improvement' },
      { href: '/services/pe-value-creation', label: 'PE Value Creation' },
      { href: '/services/custom-ai-agents', label: 'Custom AI Agents' },
    ],
  },
  {
    title: 'The Forge Method',
    links: [
      { href: '/services', label: 'How We Work' },
      { href: '/pricing', label: 'Investment & Timeline' },
      { href: '/discover', label: 'AI Readiness Assessment' },
    ],
  },
  {
    title: 'About',
    links: [
      { href: '/about', label: 'Our Story' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/insights', label: 'Insights & Research' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

const TOP_NAV = [
  { href: '/industries/manufacturing', label: 'Industries', hasDropdown: true },
  { href: '/services', label: 'Capabilities', hasDropdown: true },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About Us' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const onHero = !pastHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-divider/30 bg-forge-black/90 backdrop-blur-xl' : 'bg-transparent',
          scrolled ? 'h-14' : 'h-16',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center text-bone/70 hover:text-bone transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center">
              <span className="text-lg font-semibold text-bone tracking-tight">
                ClearForge
              </span>
            </Link>
          </div>

          {/* Center: top nav links (desktop) */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {TOP_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-bone/60 hover:text-bone transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + search */}
          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" className="hidden sm:inline-flex text-xs" asChild>
              <Link href="/discover">Get My AI Score</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ══════ SIDEBAR OVERLAY ══════ */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-[480px] bg-forge-black border-r border-divider-dark overflow-y-auto"
            style={{ animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-divider-dark">
              <Link href="/" onClick={() => setSidebarOpen(false)} className="text-lg font-semibold text-bone tracking-tight">
                ClearForge
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="h-10 w-10 inline-flex items-center justify-center text-stone hover:text-bone transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation sections */}
            <div className="px-8 py-6 space-y-8">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-stone mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setSidebarOpen(false)}
                          className="group flex items-center justify-between py-2.5 text-[15px] text-bone/80 hover:text-bone transition-colors"
                        >
                          {link.label}
                          <ChevronRight className="h-4 w-4 text-stone opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sidebar CTA */}
            <div className="px-8 py-6 border-t border-divider-dark">
              <Button className="w-full" size="lg" asChild>
                <Link href="/discover" onClick={() => setSidebarOpen(false)}>
                  Get My AI Score <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 text-xs text-stone text-center">
                Free · 5 minutes · AI-powered analysis
              </p>
            </div>

            {/* Sidebar footer */}
            <div className="px-8 py-6 border-t border-divider-dark">
              <div className="space-y-3">
                <a href="mailto:james@clearforge.ai" className="block text-sm text-stone hover:text-bone transition-colors">
                  james@clearforge.ai
                </a>
                <p className="text-xs text-stone/60">
                  Based in Southeast Michigan · Serving clients nationally
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in animation */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
