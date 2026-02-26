import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services", label: "All Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/case-studies", label: "Case Studies" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/scorecard", label: "AI Readiness Scorecard" },
    { href: "/insights/continuous-ai-agents", label: "Continuous AI Systems" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-fog bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-end gap-0.5" aria-label="ClearForge home">
              <span className="text-2xl text-midnight" style={{ fontFamily: "var(--font-libre-bodoni)" }}>
                ClearForge
              </span>
              <span className="text-xl text-brass">.ai</span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-slate">
              Strategy that ships. AI that performs.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base text-slate transition-colors hover:text-midnight">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-fog pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-stone">&copy; {new Date().getFullYear()} ClearForge.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-stone hover:text-midnight">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-stone hover:text-midnight">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
