"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownContent } from "@/components/markdown-content";
import { ADVISOR_REPORT_STORAGE_KEY, AdvisorReportPayload } from "@/lib/advisor-report";

const industries = [
  "Manufacturing",
  "Professional Services",
  "Financial Services",
  "Healthcare",
  "Distribution",
  "Technology",
  "PE Portfolio Company",
  "Other",
];

const roles = ["CEO/Owner", "COO/Operations", "CTO/IT", "CMO/Marketing", "PE Operating Partner", "Other"];

interface AdvisorResponse {
  recommendation: string;
  companyResearch: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function AdvisorPage() {
  const [step, setStep] = useState(1);

  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const [processingIndex, setProcessingIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AdvisorResponse | null>(null);

  const challengeLength = challenge.trim().length;
  const challengeValid = challengeLength >= 20;
  const companyUrlTrimmed = companyUrl.trim();
  const companyUrlValid = !companyUrlTrimmed || isHttpUrl(companyUrlTrimmed);

  const leadDetailsValid =
    !!name.trim() && !!email.trim() && !!company.trim() && !!role.trim() && validateEmail(email.trim());

  const processingSteps = useMemo(
    () => [
      `Researching ${company.trim() || "your company"}...`,
      "Analyzing your industry landscape...",
      "Building your strategic recommendation...",
    ],
    [company],
  );

  const progressStep = step === 4 ? 4 : step;

  useEffect(() => {
    if (step !== 4 || !submitting) {
      return;
    }

    setProcessingIndex(0);
    const timer = window.setInterval(() => {
      setProcessingIndex((value) => Math.min(value + 1, processingSteps.length - 1));
    }, 2400);

    return () => window.clearInterval(timer);
  }, [step, submitting, processingSteps.length]);

  async function submitAdvisor() {
    if (!industry || !challengeValid || !leadDetailsValid || !companyUrlValid) {
      return;
    }

    setError("");
    setStep(4);
    setSubmitting(true);

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          challenge: challenge.trim(),
          companyUrl: companyUrlTrimmed,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role,
          phone: phone.trim(),
        }),
      });

      const data = (await response.json()) as AdvisorResponse & { error?: string };

      if (!response.ok) {
        setError(data.error || "Something went wrong while generating your recommendation.");
        setStep(3);
        return;
      }

      setResult(data);
      setStep(5);
    } catch {
      setError("Unable to generate recommendation right now.");
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    setStep(1);
    setIndustry("");
    setChallenge("");
    setCompanyUrl("");
    setName("");
    setEmail("");
    setCompany("");
    setRole("");
    setPhone("");
    setSubmitting(false);
    setProcessingIndex(0);
    setError("");
    setResult(null);
  }

  function openReport() {
    if (!result) {
      return;
    }

    const payload: AdvisorReportPayload = {
      generatedAt: new Date().toISOString(),
      clientName: name.trim(),
      clientEmail: email.trim(),
      clientCompany: company.trim(),
      clientRole: role,
      clientPhone: phone.trim() || undefined,
      industry,
      challenge: challenge.trim(),
      companyUrl: companyUrlTrimmed || undefined,
      recommendation: result.recommendation,
      companyResearch: result.companyResearch,
      suggestedSolutions: result.suggestedSolutions,
      suggestedEngagement: result.suggestedEngagement,
    };

    localStorage.setItem(ADVISOR_REPORT_STORAGE_KEY, JSON.stringify(payload));

    const reportWindow = window.open("/advisor/report", "_blank", "noopener,noreferrer");
    if (!reportWindow) {
      window.location.href = "/advisor/report";
    }
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <span className="section-label">AI Advisor</span>
        <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl">Get your AI recommendation in five guided steps.</h1>
        <p className="mt-4 text-lg text-slate-600">Structured input, consultant-level output, and a printable strategy report.</p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-teal transition-all duration-300" style={{ width: `${(progressStep / 5) * 100}%` }} />
        </div>

        <div className="mt-8 rounded-xl glass p-6 sm:p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 1: Let&apos;s start with your business.</h2>
              <p className="mt-2 text-base text-slate-600">Select your industry.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {industries.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setIndustry(item);
                      setStep(2);
                    }}
                    className="rounded-lg glass glass-hover px-4 py-3 text-left text-sm font-medium text-slate-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 2: Describe your challenge.</h2>
              <p className="mt-2 text-base text-slate-600">Describe your biggest AI challenge in a few sentences.</p>

              <Textarea
                className="mt-5 min-h-[160px] border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                placeholder="Example: We have 15 salespeople manually prospecting and our CRM data is a mess. We know AI could help but every vendor just wants to sell us chatbots."
                value={challenge}
                onChange={(event) => setChallenge(event.target.value)}
              />
              <p className={`mt-2 text-sm ${challengeValid ? "text-slate-500" : "text-amber-700"}`}>
                {challengeLength}/20 minimum characters
              </p>

              <div className="mt-6">
                <label htmlFor="company-url" className="text-sm font-medium text-slate-700">
                  Your company website
                </label>
                <Input
                  id="company-url"
                  className="mt-2 border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                  placeholder="https://yourcompany.com"
                  value={companyUrl}
                  onChange={(event) => setCompanyUrl(event.target.value)}
                />
                <p className="mt-2 text-sm text-slate-500">We&apos;ll research your market to give a better recommendation.</p>
                {!companyUrlValid && (
                  <p className="mt-2 text-sm text-red-600">Please enter a full URL starting with http:// or https://</p>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!challengeValid || !companyUrlValid}>
                  Continue
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 3: Tell us where to send your strategy report.</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name *
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Jane Smith"
                    className="mt-2 border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Work email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="jane@company.com"
                    className="mt-2 border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">
                    Company name *
                  </label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Acme Corp"
                    className="mt-2 border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="text-sm font-medium text-slate-700">
                    Your role *
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="mt-2 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-slate-700 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  >
                    <option value="">Select your role</option>
                    {roles.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-2 border-gray-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-teal focus:ring-teal"
                  />
                </div>
              </div>

              {!!email.trim() && !validateEmail(email.trim()) && (
                <p className="mt-3 text-sm text-red-600">Please enter a valid email address.</p>
              )}

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={submitAdvisor} disabled={!leadDetailsValid || submitting || !challengeValid || !companyUrlValid}>
                  {submitting ? "Building Recommendation..." : "Generate Recommendation"}
                </Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 4: Building your recommendation.</h2>
              <p className="mt-2 text-base text-slate-600">We are analyzing your inputs and preparing your strategy report.</p>

              <div className="mt-6 space-y-3">
                {processingSteps.map((item, index) => {
                  const isComplete = index < processingIndex;
                  const isActive = index === processingIndex;

                  return (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                        isComplete || isActive ? "glass-teal" : "glass"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isComplete ? "bg-teal" : isActive ? "bg-teal animate-pulse" : "bg-gray-300"
                        }`}
                      />
                      <p className={`text-sm ${isComplete || isActive ? "text-slate-800" : "text-slate-500"}`}>{item}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-sm text-slate-500">This usually takes 10 to 20 seconds.</p>
            </>
          )}

          {step === 5 && result && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 5: Your personalized recommendation.</h2>
              <div className="mt-5 rounded-lg glass p-6">
                <MarkdownContent markdown={result.recommendation} />
              </div>

              <div className="mt-5 rounded-lg glass p-5">
                <h3 className="text-lg font-semibold text-slate-navy">Recommended solutions</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {result.suggestedSolutions.map((item) => (
                    <li key={item} className="text-base text-slate-700">{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  <strong>Suggested engagement:</strong> {result.suggestedEngagement}
                </p>
              </div>

              {result.companyResearch && result.companyResearch !== "No company URL provided." && (
                <div className="mt-5 rounded-lg glass p-5">
                  <h3 className="text-lg font-semibold text-slate-navy">Company research snapshot</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">{result.companyResearch}</p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={openReport}>Download Report</Button>
                <Button asChild variant="outline">
                  <a href="/contact">Book a Discovery Call</a>
                </Button>
                <Button variant="ghost" onClick={startOver}>
                  Start Over
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
