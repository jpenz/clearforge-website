import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * V11 footer — charcoal, SKU-taxonomy columns, DM Mono details.
 */

const columns = [
  {
    title: 'Products',
    links: [
      { href: '/discover', label: 'Forge Intelligence™' },
      { href: '/scorecard', label: 'Forge Scorecard™' },
      { href: '/blueprints', label: 'Forge Blueprints™' },
      { href: '/pricing', label: 'Forge Method™' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/use-cases', label: 'Use cases' },
      { href: '/industries', label: 'Industries' },
      { href: '/operating-model', label: 'Operating model' },
      { href: '/services', label: 'Services' },
    ],
  },
  {
    title: 'Evidence',
    links: [
      { href: '/case-studies', label: 'Case studies' },
      { href: '/insights', label: 'Insights' },
      { href: '/blueprints', label: 'Blueprint library' },
    ],
  },
  {
    title: 'Firm',
    links: [
      { href: '/about', label: 'About' },
      { href: '/how-we-work', label: 'How we work' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/security', label: 'Security' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="dark-section">
      {/* CTA band */}
      <div className="border-b border-divider-dark">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="overline">Next step</p>
            <h2 className="mt-4 text-display text-bone">
              Sixty seconds to your first <span className="display-accent">play</span>.
            </h2>
            <p className="mt-4 text-body-lg text-stone">
              Run Forge Intelligence™ on your own website — free, no signup.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/discover" data-analytics="footer_run_agent">
                Run the agent <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/scorecard">Take the scorecard</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <span className="font-display text-xl font-semibold text-bone">
              ClearForge<span className="metric text-sm text-brass-light">.ai</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              AI strategy, production systems, and benefits realization for mid-market and PE-backed
              companies. The person who scopes it builds it.
            </p>
            <a
              href="mailto:james@clearforge.ai"
              className="metric block text-xs text-stone transition-colors hover:text-brass-light"
            >
              james@clearforge.ai
            </a>
          </div>
          <div className="grid gap-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="metric mb-4 text-[11px] uppercase tracking-[0.16em] text-stone">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone/70 transition-colors hover:text-brass-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-divider-dark pt-7 sm:flex-row">
          <p className="metric text-center text-[11px] leading-relaxed text-stone sm:text-left">
            © {new Date().getFullYear()} ClearForge AI · Sterling Heights, MI · All rights reserved
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/jamespenz/"
              target="_blank"
              rel="noreferrer"
              className="metric text-[11px] text-stone transition-colors hover:text-bone"
            >
              LinkedIn
            </a>
            <Link
              href="/privacy"
              className="metric text-[11px] text-stone transition-colors hover:text-bone"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="metric text-[11px] text-stone transition-colors hover:text-bone"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
