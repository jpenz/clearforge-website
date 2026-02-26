"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Contact</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              Let&apos;s evaluate your highest-value AI opportunity.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              30-minute discovery call for CEOs, PE operating partners, and owner-led companies. No pressure,
              no generic pitch. Just a direct assessment of operating priorities, value creation, and succession
              readiness.
            </p>

            <div className="mt-10 space-y-6 border-t border-fog pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-fog bg-ivory text-midnight">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-stone">Discovery Call</p>
                  <p className="mt-1 text-sm text-slate">
                    Booked around leadership cadence, board calendars, and owner transition timelines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-fog bg-ivory text-midnight">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-stone">Email</p>
                  <a href="mailto:hello@clearforge.ai" className="mt-1 inline-block text-sm text-midnight underline">
                    hello@clearforge.ai
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="border border-fog bg-ivory p-8 text-center">
                <h2 className="text-3xl text-midnight">Thank you.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  We&apos;ll respond within one business day with next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-fog bg-ivory p-7 space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-midnight">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full border border-fog bg-white px-3 py-2.5 text-sm text-midnight focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-midnight">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full border border-fog bg-white px-3 py-2.5 text-sm text-midnight focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="text-sm font-medium text-midnight">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="mt-2 w-full border border-fog bg-white px-3 py-2.5 text-sm text-midnight focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                  />
                </div>

                <div>
                  <label htmlFor="revenue" className="text-sm font-medium text-midnight">
                    Annual Revenue (approx)
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    className="mt-2 w-full border border-fog bg-white px-3 py-2.5 text-sm text-midnight focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                  >
                    <option value="">Select range</option>
                    <option value="<5M">&lt;$5M</option>
                    <option value="2M-15M-seller-earnings">$2M-$15M seller earnings (owner-led)</option>
                    <option value="5M-25M">$5M-$25M</option>
                    <option value="25M-100M">$25M-$100M</option>
                    <option value="100M-500M">$100M-$500M</option>
                    <option value="500M+">$500M+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-midnight">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none border border-fog bg-white px-3 py-2.5 text-sm text-midnight focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                  />
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
  );
}
