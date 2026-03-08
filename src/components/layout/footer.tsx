import Link from "next/link";

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
};

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border-subtle bg-bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span
                className="text-2xl tracking-tight text-text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ClearForge
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              AI strategy and execution for mid-market companies. One team from
              diagnosis to production — no handoffs, no slide decks that sit on
              a shelf.
            </p>
            <div className="pt-2">
              <a
                href="mailto:james@clearforge.ai"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                james@clearforge.ai
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
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

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ClearForge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-text-secondary">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-text-secondary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
