"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BarChart3, Building2, Globe, Mail, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownContent } from "@/components/markdown-content";
import { ProgressBar } from "@/components/scorecard/progress-bar";
import { QuestionCard } from "@/components/scorecard/question-card";
import { getQuestionsForPillar, pillars, type Answers, type PillarKey, type ScorecardResult } from "@/lib/scorecard";
import { ASSESSMENT_REPORT_STORAGE_KEY, type AssessmentReportPayload } from "@/lib/assessment-report";

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

interface AssessmentResult {
  generatedAt: string;
  scorecard: ScorecardResult;
  closerReport: string;
  companyResearch: string;
  industryBestInClass: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
  emailSent: boolean;
  lead: {
    name: string;
    email: string;
    company: string;
    role: string;
    industry: string;
    challenge: string;
    companyUrl?: string;
    phone?: string;
  };
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function AssessmentPage() {
  const [phase, setPhase] = useState<"questions" | "details" | "loading" | "results">("questions");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const [processingIndex, setProcessingIndex] = useState(0);

  const currentPillar = pillars[currentStep];
  const currentQuestions = getQuestionsForPillar(currentPillar.key);
  const completedSteps = new Set<PillarKey>(
    pillars
      .filter((pillar) => {
        const pillarQuestions = getQuestionsForPillar(pillar.key);
        return pillarQuestions.every((question) => answers[question.id] !== undefined);
      })
      .map((pillar) => pillar.key),
  );
  const isCurrentStepComplete = currentQuestions.every((question) => answers[question.id] !== undefined);

  const challengeLength = challenge.trim().length;
  const challengeValid = challengeLength >= 20;
  const emailValid = validateEmail(email.trim());
  const companyUrlTrimmed = companyUrl.trim();
  const companyUrlValid = !companyUrlTrimmed || isHttpUrl(companyUrlTrimmed);
  const detailsValid =
    !!industry.trim() && challengeValid && !!name.trim() && !!company.trim() && !!role.trim() && emailValid && companyUrlValid;

  const processingSteps = useMemo(
    () => [
      "Scoring AI readiness across your operating pillars...",
      "Researching your company and market context...",
      "Mapping best-in-class patterns for your industry...",
      "Building your leadership strategy report...",
      "Preparing branded deliverables and email copy...",
    ],
    [],
  );

  function handleAnswer(questionId: number, value: number) {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
  }

  function goNextQuestionStep() {
    if (currentStep < pillars.length - 1) {
      setCurrentStep((value) => value + 1);
      return;
    }

    setPhase("details");
  }

  function goPreviousQuestionStep() {
    if (currentStep > 0) {
      setCurrentStep((value) => value - 1);
    }
  }

  async function runAssessment() {
    if (!detailsValid) {
      return;
    }

    setPhase("loading");
    setError("");
    setProcessingIndex(0);

    const timer = window.setInterval(() => {
      setProcessingIndex((value) => Math.min(value + 1, processingSteps.length - 1));
    }, 2000);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          industry: industry.trim(),
          challenge: challenge.trim(),
          companyUrl: companyUrlTrimmed || undefined,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          phone: phone.trim() || undefined,
        }),
      });

      const data = (await response.json()) as AssessmentResult & { error?: string };
      if (!response.ok) {
        setError(data.error || "Failed to generate your assessment.");
        setPhase("details");
        return;
      }

      setResult(data);
      setPhase("results");
    } catch {
      setError("Unable to process your assessment right now.");
      setPhase("details");
    } finally {
      window.clearInterval(timer);
    }
  }

  function openPrintableReport() {
    if (!result) {
      return;
    }

    const payload: AssessmentReportPayload = {
      generatedAt: result.generatedAt,
      clientName: result.lead.name,
      clientEmail: result.lead.email,
      clientCompany: result.lead.company,
      clientRole: result.lead.role,
      clientPhone: result.lead.phone,
      industry: result.lead.industry,
      challenge: result.lead.challenge,
      companyUrl: result.lead.companyUrl,
      scorecard: result.scorecard,
      closerReport: result.closerReport,
      companyResearch: result.companyResearch,
      industryBestInClass: result.industryBestInClass,
      suggestedSolutions: result.suggestedSolutions,
      suggestedEngagement: result.suggestedEngagement,
    };

    window.localStorage.setItem(ASSESSMENT_REPORT_STORAGE_KEY, JSON.stringify(payload));

    const reportWindow = window.open("/assessment/report", "_blank", "noopener,noreferrer");
    if (!reportWindow) {
      window.location.href = "/assessment/report";
    }
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <span className="section-label">AI Readiness & Opportunity Assessment</span>
        <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl">One assessment. One strategy. One execution path.</h1>
        <p className="mt-4 max-w-3xl text-lg text-text-secondary">
          We combine readiness scoring, company research, industry best-practice benchmarking, and a sales-ready strategy report in a
          single workflow.
        </p>
        <p className="mt-3 max-w-3xl text-base text-text-tertiary">
          We start with your real bottleneck in your own words, then translate it into an execution plan leadership can act on.
        </p>

        {phase === "questions" && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4 text-sm text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-teal" />
                18 readiness questions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal" />
                market research included
              </span>
            </div>

            <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.key}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {currentQuestions.map((question, index) => (
                  <QuestionCard key={question.id} question={question} value={answers[question.id]} onChange={handleAnswer} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={goPreviousQuestionStep} disabled={currentStep === 0} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button onClick={goNextQuestionStep} disabled={!isCurrentStepComplete} className="gap-2">
                {currentStep === pillars.length - 1 ? "Continue to business context" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {phase === "details" && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text">Add your business context</h2>
            <p className="mt-2 text-text-secondary">
              We use this to personalize the report and benchmark to your exact operating environment.
            </p>
            <p className="mt-1 text-sm text-text-tertiary">
              Use plain language in the pain-point field. We will mirror your words in the strategy report.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-text-secondary">Industry *</label>
                <select
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                >
                  <option value="">Select your industry</option>
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary">Your role *</label>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-text-secondary focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
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
                <label className="text-sm font-medium text-text-secondary">Biggest pain point AI should solve *</label>
                <Textarea
                  value={challenge}
                  onChange={(event) => setChallenge(event.target.value)}
                  placeholder="Use your own words. Example: We keep running pilots, but nothing gets adopted by operations."
                  className="mt-2 min-h-[140px]"
                />
                <p className={`mt-2 text-sm ${challengeValid ? "text-text-tertiary" : "text-amber-700"}`}>
                  {challengeLength}/20 minimum characters
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary">Name *</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Jane Smith" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Work email *</label>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="jane@company.com" className="mt-2" />
                {!!email.trim() && !emailValid && <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary">Company *</label>
                <Input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Acme Corporation"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Phone (optional)</label>
                <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 123-4567" className="mt-2" />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-secondary">Company website (recommended)</label>
                <Input
                  value={companyUrl}
                  onChange={(event) => setCompanyUrl(event.target.value)}
                  placeholder="https://yourcompany.com"
                  className="mt-2"
                />
                {!companyUrlValid && <p className="mt-2 text-sm text-red-600">Use a full URL starting with http:// or https://.</p>}
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="ghost" onClick={() => setPhase("questions")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to questions
              </Button>
              <Button onClick={runAssessment} disabled={!detailsValid} className="gap-2">
                Generate my AI assessment report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {phase === "loading" && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-text">Building your full assessment...</h2>
            <p className="mt-2 text-text-secondary">This includes scoring, company research, industry benchmarks, and your strategy report.</p>

            <div className="mt-6 space-y-3">
              {processingSteps.map((step, index) => {
                const isDone = index < processingIndex;
                const isActive = index === processingIndex;
                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                      isDone || isActive ? "border-teal/30 bg-teal/10" : "border-border bg-white"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${isDone ? "bg-teal" : isActive ? "bg-teal animate-pulse" : "bg-border-hover"}`} />
                    <p className={`text-sm ${isDone || isActive ? "text-text" : "text-text-tertiary"}`}>{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {phase === "results" && result && (
          <div className="mt-10 space-y-6">
            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-text">Your readiness score</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm text-text-tertiary">Composite score</p>
                  <p className="metric-display mt-2 text-4xl">{result.scorecard.compositeScore}</p>
                </article>
                <article className="rounded-lg border border-border bg-surface p-4 sm:col-span-3">
                  <p className="text-sm text-text-tertiary">Maturity level</p>
                  <p className="mt-2 text-lg font-semibold text-text">{result.scorecard.maturityLevel}</p>
                  <p className="mt-1 text-sm text-text-secondary">{result.scorecard.maturityDescription}</p>
                </article>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-text">Strategy report</h2>
              <div className="mt-4 rounded-lg border border-border bg-surface p-6">
                <MarkdownContent markdown={result.closerReport} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-xl font-bold text-text">Company research snapshot</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{result.companyResearch}</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-xl font-bold text-text">Best-in-class in your industry</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{result.industryBestInClass}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text">Execution path</h3>
              <p className="mt-3 text-sm text-text-secondary">
                <strong>Suggested engagement:</strong> {result.suggestedEngagement}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                {result.suggestedSolutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-teal/30 bg-teal/5 p-4">
                <p className="text-sm text-text-secondary">
                  {result.emailSent
                    ? "We emailed this report to your inbox with ClearForge branding and contact details."
                    : "Email delivery is not configured in this environment. You can still download the report below."}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={openPrintableReport}>Download / Print Report</Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Book Discovery Call</Link>
                </Button>
                <Button variant="ghost" onClick={() => window.location.reload()}>
                  Run another assessment
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-3 text-sm text-text-tertiary sm:grid-cols-3">
          <div className="inline-flex items-center gap-2">
            <User2 className="h-4 w-4 text-teal" />
            Uses your exact words for problem definition
          </div>
          <div className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4 text-teal" />
            Includes company + industry context
          </div>
          <div className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-teal" />
            Branded report for leadership review
          </div>
        </div>
      </div>
    </section>
  );
}
