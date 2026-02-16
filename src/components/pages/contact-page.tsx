"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          revenue: data.get("revenue"),
          message: data.get("message"),
        }),
      });
    } catch {
      // Non-blocking
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px] text-molten-amber">
              Contact
            </p>
            <h1 className="mt-6 font-serif text-4xl text-forge-navy sm:text-5xl">
              Let&apos;s talk about
              <br />
              what&apos;s possible
            </h1>
            <p className="mt-6 text-text-secondary leading-relaxed">
              Book a 30-minute discovery call. We&apos;ll learn about your
              business, discuss your challenges, and give you an honest
              assessment of whether AI can help.
            </p>

            <div className="mt-10 space-y-6 border-t border-border-subtle pt-8">
              {[
                {
                  icon: Clock,
                  title: "30-minute call",
                  text: "No pitch decks. Just a conversation.",
                },
                {
                  icon: Shield,
                  title: "No pressure",
                  text: "Honest assessment. If AI isn't right for you, we'll say so.",
                },
                {
                  icon: Mail,
                  title: "24-hour response",
                  text: "We respond to every inquiry within one business day.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-molten-amber"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-forge-navy">
                      {title}
                    </p>
                    <p className="text-sm text-text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-border-subtle pt-8">
              <p className="text-sm text-text-muted">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@clearforge.ai"
                  className="amber-underline text-molten-amber"
                >
                  hello@clearforge.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex min-h-[400px] items-center justify-center border border-border-subtle bg-canvas p-12 text-center">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-molten-amber/10">
                    <Mail className="h-6 w-6 text-molten-amber" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-forge-navy">
                    Message received
                  </h3>
                  <p className="mt-3 text-text-secondary">
                    We&apos;ll get back to you within 24 hours. Looking forward
                    to the conversation.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border border-border-subtle bg-canvas p-8 sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-text-muted"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-text-muted"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-text-muted"
                    >
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="revenue"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-text-muted"
                    >
                      Annual Revenue
                    </label>
                    <Input
                      id="revenue"
                      name="revenue"
                      placeholder="e.g. $10M-$50M"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-text-muted"
                  >
                    What are you looking to solve?
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your business challenge..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-xs text-text-muted">
                  No spam. No newsletters. We&apos;ll only use your information
                  to respond to your inquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
