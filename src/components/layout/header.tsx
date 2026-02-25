"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm" : "bg-white",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight text-slate-navy" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            ClearForge<span className="text-teal">.ai</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-base font-medium text-slate-500 transition-colors hover:text-slate-navy"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/scorecard">AI Scorecard</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/advisor">Get Your AI Recommendation</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
