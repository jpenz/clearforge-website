import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services/ai-revenue-operations", label: "AI Revenue Operations" },
    { href: "/services/performance-improvement", label: "Performance Improvement" },
    { href: "/services/pe-value-creation", label: "PE Value Creation" },
    { href: "/services/custom-ai-agents", label: "Custom AI Agents" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/pricing", label: "Pricing" },
    { href: "/insights", label: "Insights" },
  ],
  Tools: [
    { href: "/scorecard", label: "AI Readiness Scorecard" },
    { href: "/roi-calculator", label: "ROI Calculator" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border-subtle bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl text-forge-navy">
                ClearForge<span className="text-molten-amber">.ai</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-muted">
              Strategy that ships. AI that performs. Combining management
              consulting rigor with hands-on AI engineering.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1.5px] text-text-muted">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="amber-underline text-sm text-text-secondary transition-colors hover:text-forge-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} ClearForge.ai. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-text-muted transition-colors hover:text-forge-navy"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-text-muted transition-colors hover:text-forge-navy"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
