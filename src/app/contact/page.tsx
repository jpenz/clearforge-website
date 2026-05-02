'use client';

import { ArrowRight, Clock, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const revenueOptions = ['Under $5M', '$5M - $25M', '$25M - $100M', '$100M - $500M', '$500M+'];

const expectations = [
  'We respond within one business day — usually same day.',
  'A 30-minute confidential discovery call to understand your business.',
  'An honest assessment of whether AI can help and which engagement fits.',
  'If we are not the right fit, we will tell you and recommend who is.',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    challenge: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('contact_form_submit', {
      revenue: form.revenue || 'not_provided',
      has_company: Boolean(form.company.trim()),
    });
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // silent — we still show confirmation
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-parchment py-32 lg:py-48">
        <div className="mx-auto max-w-xl px-6 text-center lg:px-10">
          <h1 className="text-display">Thank you.</h1>
          <p className="mt-6 text-body-lg text-warm-gray">
            We will be in touch within one business day. If it is urgent, call or email us directly.
          </p>
          <div className="mt-4 space-y-1">
            <a
              href="mailto:james@clearforge.ai"
              className="block text-body text-brass hover:text-brass-hover transition-colors"
            >
              james@clearforge.ai
            </a>
          </div>
          <div className="mt-10">
            <Button asChild>
              <Link href="/">
                Back to Home <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* — Hero with atmospheric bg — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-network.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Get in Touch</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">Book a 15-Min Diagnostic Call</h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            No pitch decks. No pressure. A straightforward conversation about where AI can drive
            measurable results for your company.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            {/* Left — Info */}
            <div className="lg:col-span-5">
              <p className="overline">How We Engage</p>
              <h2 className="mt-6 text-display">
                Direct access. Senior team. One business-day response.
              </h2>

              <div className="mt-12 space-y-8">
                <div className="flex items-start gap-4 border-t border-divider pt-6">
                  <Mail className="mt-0.5 h-5 w-5 text-brass shrink-0" />
                  <div>
                    <h3 className="text-h4">Direct Email</h3>
                    <a
                      href="mailto:james@clearforge.ai"
                      className="mt-1 block text-body text-brass hover:text-brass-hover transition-colors"
                    >
                      james@clearforge.ai
                    </a>
                    <p className="mt-1 text-body-sm text-warm-gray">
                      Replies from the founder, not a gatekeeper.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-divider pt-6">
                  <MapPin className="mt-0.5 h-5 w-5 text-brass shrink-0" />
                  <div>
                    <h3 className="text-h4">Based in Southeast Michigan</h3>
                    <p className="mt-1 text-body text-warm-gray">
                      Serving clients nationally. On-site engagements available for Forge Sprint and
                      Forge Scale relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-divider pt-6">
                  <Clock className="mt-0.5 h-5 w-5 text-brass shrink-0" />
                  <div>
                    <h3 className="text-h4">What to Expect</h3>
                    <ol className="mt-3 space-y-3">
                      {expectations.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-body-sm text-warm-gray"
                        >
                          <span className="metric text-sm text-brass shrink-0">{i + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="mt-16 lg:col-span-7 lg:mt-0">
              <form
                onSubmit={handleSubmit}
                data-analytics="contact_form_submit"
                className="space-y-8"
              >
                <div>
                  <label htmlFor="name" className="block text-body-sm font-medium text-anthracite">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body-sm font-medium text-anthracite">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="revenue"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Annual Revenue
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite focus:border-brass focus:outline-none focus:ring-0"
                  >
                    <option value="">Select range</option>
                    {revenueOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="challenge"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Biggest Challenge
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={4}
                    required
                    value={form.challenge}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0 resize-none"
                    placeholder="What is the biggest operational challenge you are trying to solve with AI?"
                  />
                </div>

                <Button type="submit" size="lg">
                  Send My Request <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
