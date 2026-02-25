"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";

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

  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="section-label">Contact</span>
              <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
                Let&apos;s talk about <span className="gradient-text">your business.</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary">
                30-minute discovery call. No pitch decks, no pressure.
                Just a straightforward conversation about what&apos;s possible.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-teal">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">Book a Call</h3>
                    <p className="text-lg text-text-secondary">Schedule directly on our calendar.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-teal">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">Email</h3>
                    <a href="mailto:hello@clearforge.ai" className="text-sm text-teal hover:text-teal-light">hello@clearforge.ai</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              {submitted ? (
                <div className="rounded-lg border border-teal/20 bg-teal/5 p-8 text-center">
                  <h3 className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Thank you.</h3>
                  <p className="mt-2 text-lg text-text-secondary">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface p-8 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium text-text-secondary mb-1.5">Name</label>
                    <input type="text" id="name" name="name" required className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-lg text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-text-secondary mb-1.5">Email</label>
                    <input type="email" id="email" name="email" required className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-lg text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-base font-medium text-text-secondary mb-1.5">Company</label>
                    <input type="text" id="company" name="company" className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-lg text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" />
                  </div>
                  <div>
                    <label htmlFor="revenue" className="block text-base font-medium text-text-secondary mb-1.5">Annual Revenue (approx)</label>
                    <select id="revenue" name="revenue" className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-lg text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal">
                      <option value="">Select range</option>
                      <option value="<5M">&lt;$5M</option>
                      <option value="5M-25M">$5M-$25M</option>
                      <option value="25M-100M">$25M-$100M</option>
                      <option value="100M-500M">$100M-$500M</option>
                      <option value="500M+">$500M+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-base font-medium text-text-secondary mb-1.5">How can we help?</label>
                    <textarea id="message" name="message" rows={4} className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-lg text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal resize-none" />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
