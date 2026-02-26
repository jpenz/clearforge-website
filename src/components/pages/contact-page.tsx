"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueRanges = [
  "Under $5M",
  "$5M – $25M",
  "$25M – $50M",
  "$50M – $100M",
  "$100M – $250M",
  "$250M – $500M",
  "$500M+",
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  revenue: z.string().min(1, "Please select a revenue range"),
  message: z.string().min(10, "Please provide a bit more detail"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPageClient() {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-blue">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary sm:text-5xl">
            Let&apos;s Talk Results
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Book a free discovery call or send us a message. We respond within
            24 hours.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl border border-border-subtle bg-bg-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-text-primary">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Tell us about your business and what you&apos;re looking to
                achieve.
              </p>

              {submitState === "success" ? (
                <div className="mt-8 flex flex-col items-center rounded-xl border border-emerald/30 bg-emerald/5 p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald" />
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    We&apos;ll get back to you within 24 hours. Looking forward
                    to the conversation.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setSubmitState("idle")}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-6 space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Acme Corp"
                        {...register("company")}
                      />
                      {errors.company && (
                        <p className="text-xs text-red-400">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Annual Revenue</Label>
                      <Controller
                        name="revenue"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger id="revenue">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              {revenueRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.revenue && (
                        <p className="text-xs text-red-400">
                          {errors.revenue.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      How Can We Help?
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business challenges and what you're hoping to achieve with AI..."
                      rows={5}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitState === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/5 p-3">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-sm text-red-400">
                        Something went wrong. Please try again or email us
                        directly.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={submitState === "loading"}
                  >
                    {submitState === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Calendly Placeholder */}
            <div className="rounded-xl border border-border-subtle bg-bg-card p-6">
              <Calendar className="h-6 w-6 text-blue" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                Book a Discovery Call
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                30 minutes to discuss your business, challenges, and whether
                ClearForge is the right fit.
              </p>
              <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-border-medium bg-bg-elevated">
                <p className="text-sm text-text-muted">
                  Calendly embed coming soon
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl border border-border-subtle bg-bg-card p-6">
              <Clock className="h-6 w-6 text-emerald" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                We Respond Within 24 Hours
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                No automated replies. You&apos;ll hear directly from a senior
                operator who can speak to your specific situation.
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-border-subtle bg-bg-card p-6">
              <Mail className="h-6 w-6 text-blue" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                Email Us Directly
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Prefer email? Reach us at{" "}
                <a
                  href="mailto:hello@clearforge.ai"
                  className="text-blue hover:underline"
                >
                  hello@clearforge.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
