"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full border-0 border-b border-border-default bg-transparent px-0 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-0 transition-colors";

  return (
    <section className="min-h-screen bg-bg-deep pt-32 pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">Request a Proposal</p>
            <h1
              className="mt-4 text-4xl text-text-primary sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let&apos;s talk about your business.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Tell us about your company and what you&apos;re trying to
              accomplish. We&apos;ll respond within 24 hours with an honest
              assessment of whether we can help — and if so, how.
            </p>

            <div className="mt-12 space-y-6 border-t border-border-subtle pt-8">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-accent" />
                <a
                  href="mailto:james@clearforge.ai"
                  className="text-base text-text-secondary hover:text-text-primary transition-colors"
                >
                  james@clearforge.ai
                </a>
              </div>
            </div>

            <div className="mt-12 border border-border-subtle p-6">
              <p className="text-sm font-semibold text-text-primary">
                What to expect
              </p>
              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                <li className="flex gap-3">
                  <span className="metric text-xs mt-0.5">01</span>
                  We review your submission and research your company
                </li>
                <li className="flex gap-3">
                  <span className="metric text-xs mt-0.5">02</span>
                  You get an honest reply — can we help or not
                </li>
                <li className="flex gap-3">
                  <span className="metric text-xs mt-0.5">03</span>
                  If yes, a 30-minute call to scope the engagement
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex min-h-[400px] items-center justify-center border border-accent/20 bg-accent/5 p-12">
                <div className="text-center">
                  <h3
                    className="text-2xl text-text-primary"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Thank you.
                  </h3>
                  <p className="mt-3 text-base text-text-secondary">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Company name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="revenue" className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                    Annual Revenue
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="">Select range</option>
                    <option value="<5M">&lt;$5M</option>
                    <option value="5M-25M">$5M – $25M</option>
                    <option value="25M-100M">$25M – $100M</option>
                    <option value="100M-500M">$100M – $500M</option>
                    <option value="500M+">$500M+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                    How can we help? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your business, the challenge you're facing, and what you're hoping to accomplish."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Sending..." : (
                    <>
                      Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
