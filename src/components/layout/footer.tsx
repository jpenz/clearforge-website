import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { industries } from '@/data/industries-value-chains';
import { useCases } from '@/data/use-cases';

const footerLinks = {
  Services: [
    { href: '/operating-model', label: 'AI Operating Model' },
    { href: '/use-cases', label: 'AI Use Cases' },
    { href: '/services/ai-revenue-operations', label: 'AI Revenue Operations' },
    { href: '/services/performance-improvement', label: 'Performance Improvement' },
    { href: '/services/pe-value-creation', label: 'PE Value Creation' },
    { href: '/services/custom-ai-agents', label: 'Custom AI Agents' },
  ],
  'Use Cases': [
    { href: '/use-cases/ai-sales-pipeline-acceleration', label: 'AI Sales Pipeline' },
    { href: '/use-cases/ai-customer-service-excellence', label: 'Customer Service AI' },
    { href: '/use-cases/ai-operations-efficiency-system', label: 'Operations Efficiency' },
    { href: '/use-cases', label: `View all ${useCases.length} →` },
  ],
  Company: [
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/scorecard', label: 'AI Readiness Scorecard' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Industries: [
    { href: '/industries/manufacturing', label: 'Manufacturing & Industrial' },
    { href: '/industries/financial-services', label: 'Financial Services' },
    { href: '/industries/healthcare', label: 'Healthcare' },
    { href: '/industries/saas', label: 'SaaS & Technology' },
    { href: '/industries/private-equity', label: 'Private Equity' },
    { href: '/industries', label: `View all ${industries.length} →` },
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
              <p className="overline">Ready to find the value?</p>
              <h2 className="mt-4 text-display text-bone">Start with the operating map.</h2>
              <p className="mt-4 text-body-lg text-stone">
                See which workflow could improve revenue, cost, or throughput before you commit to a
                build.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="shadow-lg hover:shadow-xl" asChild>
                <Link href="/discover">
                  Generate AI Value Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-light" asChild>
                <Link href="/contact">Book a Diagnostic Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[13px] font-bold uppercase text-bone">ClearForge</span>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              Production AI strategy, build, and managed operations for mid-market and growth-stage
              companies.
            </p>
            <a
              href="mailto:james@clearforge.ai"
              className="block text-sm text-bone/60 hover:text-brass transition-colors"
            >
              james@clearforge.ai
            </a>
          </div>
          <div className="lg:col-span-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-5 overline">{title}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center min-h-[44px] text-sm text-bone/50 hover:text-brass transition-colors link-underline"
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-divider-dark pt-8 sm:flex-row">
          <p className="text-xs text-stone">
            &copy; {new Date().getFullYear()} ClearForge AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-stone hover:text-bone transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-stone hover:text-bone transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
