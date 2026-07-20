'use client';

import { ArrowRight, Clock, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BookingInline } from '@/components/booking/book-call';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const revenueOptions = ['Under $5M', '$5M - $25M', '$25M - $100M', '$100M - $500M', '$500M+'];
const workflowAreaOptions = [
  'Revenue growth',
  'Customer service quality',
  'Operations efficiency',
  'Knowledge work',
  'Quality exceptions',
  'PE portfolio value creation',
  'Enterprise AI governance',
];
const urgencyOptions = [
  'Exploring options',
  'Need a diagnostic this month',
  'Need a sprint scoped',
  'Active executive priority',
];

const expectations = [
  'A confidential 30-minute working session — with James, not an SDR.',
  'We pressure-test one workflow: owner, data path, baseline, control points.',
  'An honest read on whether it is worth building, and what it would take.',
  'If we are not the right fit, we will tell you and recommend who is.',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    role: '',
    workflowArea: '',
    urgency: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const eventProperties = {
      revenue: form.revenue || 'not_provided',
      workflow_area: form.workflowArea || 'not_provided',
      urgency: form.urgency || 'not_provided',
      has_company: Boolean(form.company.trim()),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      trackEvent(response.ok ? 'contact_form_submit_success' : 'contact_form_submit_error', {
        ...eventProperties,
        status: response.status,
      });
      if (!response.ok) {
        setError(
          'Something did not send. Please check the required fields or email James directly.',
        );
        setIsSubmitting(false);
        return;
      }
    } catch {
      trackEvent('contact_form_submit_error', {
        ...eventProperties,
        status: 'network_error',
      });
      setError('Network issue. Please try again or email James directly.');
      setIsSubmitting(false);
      return;
    }
    trackEvent('generate_lead', { method: 'contact_form' });
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
      {/* Hero with atmospheric bg */}
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
          <p className="overline">Bring One Stuck Workflow</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            Let us pressure-test whether it is worth building.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            No sales theater. No pressure. Pick a time below — a straightforward 30-minute
            conversation about the workflow, owner, data path, baseline, and control points you
            would need before custom AI belongs in production.
          </p>
        </div>
      </section>

      {/* Primary conversion — book directly, zero back-and-forth */}
      <section id="book" className="bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Step 1 — Pick a Time</p>
              <h2 className="mt-6 text-h1">Book the 30-minute intro.</h2>
              <p className="mt-5 text-body text-warm-gray">
                Direct with James — a Microsoft Teams invite lands in your inbox the moment you
                book. Bring the one workflow that should run faster, cleaner, or with less manual
                coordination.
              </p>
              <ol className="mt-8 space-y-3 border-t border-divider pt-6">
                {expectations.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-warm-gray">
                    <span className="metric text-sm text-brass shrink-0">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-8">
              <BookingInline className="min-h-[620px] w-full border border-divider bg-surface" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-parchment py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            {/* Left - Info */}
            <div className="lg:col-span-5">
              <p className="overline">Prefer to Write First?</p>
              <h2 className="mt-6 text-display">
                Send the workflow. Same honest read, in writing.
              </h2>
              <p className="mt-5 text-body text-warm-gray">
                James responds within one business day, usually same day.
              </p>

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
                    <h3 className="text-h4">Rather Talk Now?</h3>
                    <p className="mt-1 text-body text-warm-gray">
                      Skip the form —{' '}
                      <a
                        href="#book"
                        className="text-brass underline decoration-brass/40 underline-offset-4 hover:text-brass-hover transition-colors"
                      >
                        grab a time on the calendar above
                      </a>{' '}
                      and the Teams invite is sent instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="mt-16 lg:col-span-7 lg:mt-0">
              <form
                onSubmit={handleSubmit}
                data-analytics="contact_form_submit_attempt"
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
                    required
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
                    required
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
                  <label htmlFor="role" className="block text-body-sm font-medium text-anthracite">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={form.role}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0"
                    placeholder="CEO, COO, CRO, operating partner, founder..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="workflowArea"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Workflow Area
                  </label>
                  <select
                    id="workflowArea"
                    name="workflowArea"
                    value={form.workflowArea}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite focus:border-brass focus:outline-none focus:ring-0"
                  >
                    <option value="">Select the closest area</option>
                    {workflowAreaOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Preferred Next Step
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={form.urgency}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite focus:border-brass focus:outline-none focus:ring-0"
                  >
                    <option value="">Select timing</option>
                    {urgencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-body-sm font-medium text-anthracite"
                  >
                    Workflow To Pressure-Test
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 block w-full border-0 border-b border-divider bg-transparent px-0 py-3 text-anthracite placeholder:text-warm-gray/50 focus:border-brass focus:outline-none focus:ring-0 resize-none"
                    placeholder="Which workflow should run faster, cleaner, or with less manual coordination?"
                  />
                </div>

                {error && (
                  <p className="border-l border-brass bg-warm-white px-4 py-3 text-body-sm text-anthracite">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send the Workflow'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
