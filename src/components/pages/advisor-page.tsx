"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const baseChallenges = [
  "We know AI matters but do not know where to start",
  "We have tried AI but could not get past pilot stage",
  "Our systems are outdated and holding us back",
  "We need to grow revenue faster",
  "We cannot find or keep enough qualified people",
  "Something else",
];

const industryChallengeTweaks: Record<string, string[]> = {
  Manufacturing: ["We need better planning and throughput decisions"],
  "Financial Services": ["We need faster operations while keeping controls and compliance"],
  "PE Portfolio Company": ["We need repeatable AI value creation across portfolio companies"],
};

const companySizes = ["1-50", "51-200", "201-1000", "1000+"];
const roles = ["CEO/Owner", "COO/Operations", "CTO/IT", "CMO/Marketing", "PE Operating Partner", "Other"];
const timelines = ["ASAP", "3-6 months", "6-12 months", "Just exploring"];

interface AdvisorResponse {
  recommendation: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
}

export function AdvisorPage() {
  const [step, setStep] = useState(1);

  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [challengeOther, setChallengeOther] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [role, setRole] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AdvisorResponse | null>(null);

  const challengeOptions = useMemo(() => {
    const tweak = industryChallengeTweaks[industry] ?? [];
    return [...baseChallenges.slice(0, 5), ...tweak, "Something else"];
  }, [industry]);

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          challenge: challenge === "Something else" ? challengeOther : challenge,
          companySize,
          role,
          timeline,
          name,
          email,
          company,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult(data);
      setStep(5);
    } catch {
      setError("Unable to generate recommendation right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <span className="section-label">AI Advisor</span>
        <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl">Get your AI recommendation in five guided steps.</h1>
        <p className="mt-4 text-lg text-slate-600">Structured input, consultant-level output. No chatbot detours.</p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-teal transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
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
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-teal hover:text-teal"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 2: What is your biggest AI challenge right now?</h2>
              <div className="mt-5 space-y-3">
                {challengeOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setChallenge(item)}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      challenge === item ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-slate-700 hover:border-teal"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {challenge === "Something else" && (
                <Textarea
                  className="mt-4 bg-white"
                  placeholder="Tell us about your specific challenge"
                  value={challengeOther}
                  onChange={(e) => setChallengeOther(e.target.value)}
                />
              )}
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} disabled={!challenge || (challenge === "Something else" && !challengeOther.trim())}>Continue</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 3: A bit more about your business.</h2>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm font-medium text-slate-700">Company size</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {companySizes.map((item) => (
                      <button key={item} onClick={() => setCompanySize(item)} className={`rounded-md border px-3 py-2 text-sm ${companySize === item ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-slate-700"}`}>{item}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Your role</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {roles.map((item) => (
                      <button key={item} onClick={() => setRole(item)} className={`rounded-md border px-3 py-2 text-sm ${role === item ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-slate-700"}`}>{item}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">When do you need results?</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {timelines.map((item) => (
                      <button key={item} onClick={() => setTimeline(item)} className={`rounded-md border px-3 py-2 text-sm ${timeline === item ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-slate-700"}`}>{item}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} disabled={!companySize || !role || !timeline}>Continue</Button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Step 4: Where should we send your recommendation?</h2>
              <div className="mt-5 grid gap-3">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email *" type="email" />
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name *" />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" />
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={submit} disabled={!name || !email || !company || submitting}>{submitting ? "Generating..." : "Generate Recommendation"}</Button>
              </div>
            </>
          )}

          {step === 5 && result && (
            <>
              <h2 className="text-2xl font-bold text-slate-navy">Your personalized recommendation</h2>
              <div className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
                <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">{result.recommendation}</p>
              </div>
              <div className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-navy">Recommended solutions</h3>
                <ul className="mt-3 space-y-2">
                  {result.suggestedSolutions.map((item) => (
                    <li key={item} className="text-base text-slate-700">• {item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-slate-600"><strong>Suggested engagement:</strong> {result.suggestedEngagement}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild><a href="/contact">Book a Discovery Call</a></Button>
                <Button variant="outline" onClick={() => { setStep(1); setResult(null); }}>Start Over</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
