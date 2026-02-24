import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services", label: "All Services" },
    { href: "/services#growth-strategy-diagnosis", label: "Growth Strategy & Diagnosis" },
    { href: "/services#managed-ai-operations", label: "Managed AI Operations" },
    { href: "/services/ai-marketing-agent", label: "AI Marketing & Revenue Operations" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/pricing", label: "Pricing" },
    { href: "/scorecard", label: "AI Readiness Scorecard" },
    { href: "/insights", label: "Insights" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                ClearForge<span className="text-teal">.ai</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">We find where your business should be winning, then build and run the AI to get you there.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-inter)" }}>{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-teal">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} ClearForge.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-teal">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-teal">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
