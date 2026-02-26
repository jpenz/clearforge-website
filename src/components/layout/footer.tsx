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
    <footer role="contentinfo" className="border-t border-border-subtle bg-bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-end gap-0.5" aria-label="ClearForge home">
              <span className="text-2xl text-text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                ClearForge
              </span>
              <span className="text-xl text-blue">.ai</span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-text-secondary">
              Strategy that ships. AI that performs.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base text-text-secondary transition-colors hover:text-text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} ClearForge.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-text-muted hover:text-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-text-muted hover:text-text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
