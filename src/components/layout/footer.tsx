import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Services: [
    { href: "/services#strategy", label: "Growth Strategy & Diagnosis" },
    { href: "/services#build", label: "AI Design & Build" },
    { href: "/services#operations", label: "Managed AI Operations" },
    { href: "/services#modernization", label: "Legacy Modernization" },
  ],
  Company: [
    { href: "/case-studies", label: "Case Studies" },
    { href: "/assessment", label: "AI Readiness Assessment" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Industries: [
    { href: "/case-studies/industrial-manufacturer", label: "Industrial Manufacturing" },
    { href: "/case-studies/metro-detroit-services-company", label: "Home & Commercial Services" },
    { href: "/case-studies/pe-portfolio-diagnostic-plan", label: "Private Equity" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="relative bg-bg-deep overflow-hidden">
      {/* ── Pre-footer CTA band ── */}
      <div className="border-y border-border-subtle bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p
                className="text-2xl lg:text-3xl text-text-primary tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to turn AI into a growth engine?
              </p>
              <p className="mt-3 text-base text-text-secondary">
                One conversation to find out if we&apos;re the right partner.
                No pitch decks. No pressure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/assessment">Free AI Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative signal line ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* ── Main footer content ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span
                className="text-2xl tracking-tight text-text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ClearForge
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              AI strategy and execution for mid-market companies.
              One team from diagnosis to production — no handoffs,
              no slide decks that sit on a shelf.
            </p>

            {/* Contact info */}
            <div className="space-y-2 pt-2">
              <a
                href="mailto:james@clearforge.ai"
                className="block text-sm text-text-secondary hover:text-accent transition-colors"
              >
                james@clearforge.ai
              </a>
              <p className="text-xs text-text-muted">
                Based in Southeast Michigan · Serving clients nationally
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-text-primary"
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

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ClearForge AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* ── Ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-accent/[0.03] blur-[100px] pointer-events-none" />
    </footer>
  );
}
