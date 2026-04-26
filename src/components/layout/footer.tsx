import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const footerLinks = {
  Services: [
    { href: '/services/ai-revenue-operations', label: 'AI Revenue Operations' },
    { href: '/services/performance-improvement', label: 'Performance Improvement' },
    { href: '/services/pe-value-creation', label: 'PE Value Creation' },
    { href: '/services/custom-ai-agents', label: 'Custom AI Agents' },
  ],
  Company: [
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/scorecard', label: 'AI Readiness Assessment' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Industries: [
    { href: '/industries/manufacturing', label: 'Manufacturing & Industrial' },
    { href: '/industries/financial-services', label: 'Financial Services' },
    { href: '/industries/healthcare', label: 'Healthcare' },
    { href: '/industries/saas', label: 'SaaS & Technology' },
    { href: '/industries/private-equity', label: 'Private Equity' },
    { href: '/industries', label: 'View all 17 →' },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="dark-section">
      {/* CTA band */}
      <div className="border-b border-divider-dark">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 lg:px-10 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-xl">
              <p className="overline">Ready?</p>
              <h2 className="mt-4 text-display text-bone">
                Let&apos;s build something that works.
              </h2>
              <p className="mt-4 text-body-lg text-stone">
                One conversation to find out if we&apos;re the right partner.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="shadow-lg hover:shadow-xl" asChild>
                <Link href="/contact">Book a 15-Min Diagnostic Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href="/scorecard">Take AI Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-bone">ClearForge</span>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              AI strategy and execution for mid-market companies. One team from diagnosis to production.
            </p>
            <a href="mailto:james@clearforge.ai" className="block text-sm text-bone/60 hover:text-brass transition-colors">
              james@clearforge.ai
            </a>
          </div>
          <div className="lg:col-span-8 grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-5 overline">{title}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center min-h-[44px] text-sm text-bone/50 hover:text-brass transition-colors link-underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-divider-dark pt-8 sm:flex-row">
          <p className="text-xs text-stone">&copy; {new Date().getFullYear()} ClearForge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-stone hover:text-bone transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-stone hover:text-bone transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
