'use client';

import { ArrowRight, FileText, Globe, Loader2, Mail, Printer, Send, Sparkles, User, Building2, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/discover/chat-message';

interface Message {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

interface CompanyIntelligence {
  domain: string;
  company: string;
  jobs: string;
  useCases: string;
}

const SITUATION_CARDS = [
  { label: 'Revenue stall', detail: "Our sales team is working harder but pipeline isn't growing proportionally" },
  { label: 'AI pilots stuck', detail: "We've invested in AI experiments but nothing has reached production" },
  { label: 'Cost reduction needed', detail: 'We have manual processes that are bleeding time and money' },
  { label: 'Post-acquisition AI', detail: 'Our PE firm needs AI-driven value creation across portfolio companies' },
];

export default function DiscoverPage() {
  const [phase, setPhase] = useState<'url' | 'researching' | 'chat'>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [intelligence, setIntelligence] = useState<CompanyIntelligence | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSituations, setShowSituations] = useState(true);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportCompany, setReportCompany] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Phase 1: Research the company
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setPhase('researching');

    try {
      const res = await fetch('/api/discover/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl.trim() }),
      });

      const data = await res.json();

      if (data.fallback || data.error) {
        setIntelligence(null);
        setMessages([{
          role: 'assistant',
          content: "Welcome to Forge Intelligence. I'd love to learn about your business.\n\nWhat's the biggest challenge you're facing with AI or automation right now?",
        }]);
        setPhase('chat');
        return;
      }

      setIntelligence(data);

      const openingMessage = `I've done some research on **${data.domain}** to give you a head start.\n\nBased on what I've found, I can see several areas where AI could drive significant impact for your business — from automating key workflows to scaling your revenue operations.\n\n**What's the single biggest operational challenge you're facing right now?**`;

      setMessages([{ role: 'assistant', content: openingMessage }]);
      setPhase('chat');
    } catch {
      setIntelligence(null);
      setMessages([{
        role: 'assistant',
        content: "Welcome to Forge Intelligence. Tell me about your business — what's the biggest challenge you're facing?",
      }]);
      setPhase('chat');
    }
  };

  // Phase 2: Chat with company intelligence context
  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    setShowSituations(false);
    const userMsg: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);
    scrollToBottom();

    try {
      const contextMessages = [...updatedMessages];

      if (intelligence) {
        contextMessages.unshift({
          role: 'system',
          content: `COMPANY RESEARCH CONTEXT (from live research on ${intelligence.domain}):\n\n## Company Overview:\n${intelligence.company}\n\n## Current Job Postings (roles we can automate):\n${intelligence.jobs}\n\n## AI Use Cases for This Company:\n${intelligence.useCases}\n\nINSTRUCTIONS: Use this context to give highly specific, personalized recommendations. Reference their actual business, products, and operations by name. When discussing job postings, explain how AI agents could handle those roles more efficiently. Be specific to THEIR company, not generic.`,
        });
      }

      const response = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: contextMessages.map((m) => ({
            role: m.role === 'system' ? 'user' : m.role,
            content: m.role === 'system' ? `[Research Context — use to inform responses, do not repeat verbatim]\n\n${m.content}` : m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm having trouble connecting. Please try again, or reach out at james@clearforge.ai." },
      ]);
    } finally {
      setIsStreaming(false);
      scrollToBottom();
      // Show report button after 4+ messages (user + assistant combined)
      const totalMessages = updatedMessages.length + 1; // +1 for upcoming assistant response
      if (totalMessages >= 4) {
        setShowReportButton(true);
      }
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim() || !reportEmail.trim()) return;

    setReportLoading(true);
    try {
      const res = await fetch('/api/discover/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.filter((m) => m.role !== 'system').map((m) => ({
            role: m.role,
            content: m.content,
          })),
          intelligence,
          name: reportName.trim(),
          email: reportEmail.trim(),
          company: reportCompany.trim(),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReportContent(data.report || data.content || JSON.stringify(data, null, 2));
      setShowReportForm(false);
    } catch {
      setReportContent('Report generation failed. Please try again or contact james@clearforge.ai for a personalized assessment.');
    } finally {
      setReportLoading(false);
    }
  };

  const renderReportMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-bone mt-6 mb-3" style={{ fontFamily: 'var(--font-instrument-serif)' }}>{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-bone mt-5 mb-2" style={{ fontFamily: 'var(--font-instrument-serif)' }}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-bone mt-4 mb-2">{line.replace('### ', '')}</h3>;
      if (line.match(/^[-•]\s/)) return <li key={i} className="ml-4 list-disc text-sm text-stone">{line.replace(/^[-•]\s/, '')}</li>;
      if (line.match(/^\d+\.\s/)) return <li key={i} className="ml-4 list-decimal text-sm text-stone">{line.replace(/^\d+\.\s/, '')}</li>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-sm font-semibold text-bone mt-2">{line.replace(/\*\*/g, '')}</p>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-sm text-stone">{line}</p>;
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSkip = () => {
    setMessages([{
      role: 'assistant',
      content: "Welcome to Forge Intelligence. I'm here to understand your business and identify where AI can drive the most impact.\n\nWhat brings you to ClearForge today?",
    }]);
    setPhase('chat');
  };

  return (
    <div className="min-h-screen bg-forge-black flex flex-col">
      {/* Header */}
      <div className="border-b border-divider-dark px-4 sm:px-6 py-3 sm:py-4 lg:px-10">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Sparkles className="h-5 w-5 text-brass shrink-0" />
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-bone truncate">Forge Intelligence™</h1>
              <p className="text-xs text-stone hidden sm:block">AI-Powered Discovery</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-stone hover:text-bone transition-colors shrink-0">
            ← Back
          </Link>
        </div>
      </div>

      {/* ═══ PHASE 1: URL INPUT ═══ */}
      {phase === 'url' && (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-xl w-full text-center">
            <Sparkles className="h-10 w-10 text-brass mx-auto mb-6" />
            <h2 className="text-display text-bone">Let&apos;s analyze your business.</h2>
            <p className="mt-4 text-body-lg text-stone max-w-md mx-auto">
              Enter your company website and our AI will research your value chain,
              identify automation opportunities, and find roles we can help automate.
            </p>

            <form onSubmit={handleUrlSubmit} className="mt-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="yourcompany.com"
                    className="w-full bg-divider-dark border border-divider-dark text-bone placeholder:text-stone pl-11 pr-4 py-4 text-sm focus:border-brass focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>
                <Button type="submit" size="lg" disabled={!websiteUrl.trim()} className="w-full sm:w-auto">
                  Analyze <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <button type="button" onClick={handleSkip} className="mt-6 text-sm text-stone hover:text-bone transition-colors min-h-[44px]">
              Skip — I&apos;ll describe my business instead
            </button>

            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
              {[
                { metric: '5 min', label: 'To complete' },
                { metric: 'Free', label: 'No commitment' },
                { metric: 'PDF', label: 'Personalized report' },
              ].map((item) => (
                <div key={item.label}>
                  <span className="metric text-lg text-brass">{item.metric}</span>
                  <p className="mt-1 text-xs text-stone">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 2: RESEARCHING ═══ */}
      {phase === 'researching' && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-brass mx-auto animate-spin" />
            <h2 className="mt-6 text-h2 text-bone">Researching {websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}...</h2>
            <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
              {[
                'Analyzing your business model and value chain',
                'Identifying industry-specific AI use cases',
                'Scanning for job postings and roles to automate',
                'Preparing personalized recommendations',
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-stone animate-fade-in" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="w-1.5 h-1.5 bg-brass rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 3: CHAT ═══ */}
      {phase === 'chat' && (
        <>
          {intelligence && (
            <div className="border-b border-divider-dark px-4 sm:px-6 py-3 lg:px-10 bg-brass/5">
              <div className="mx-auto max-w-3xl flex items-center gap-2 sm:gap-3">
                <Globe className="h-4 w-4 text-brass shrink-0" />
                <p className="text-xs text-bone">
                  Researched <span className="font-semibold text-brass">{intelligence.domain}</span> — responses personalized to your business
                </p>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 lg:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.filter((m) => m.role !== 'system').map((msg, i) => (
                <ChatMessage key={i} content={msg.content} role={msg.role as 'user' | 'assistant'} />
              ))}

              {showSituations && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {SITUATION_CARDS.map((card) => (
                    <button key={card.label} onClick={() => sendMessage(card.detail)} className="border border-divider-dark p-4 text-left hover:border-brass transition-colors group">
                      <p className="text-sm font-semibold text-bone group-hover:text-brass transition-colors">{card.label}</p>
                      <p className="text-xs text-stone mt-1">{card.detail}</p>
                    </button>
                  ))}
                </div>
              )}

              {isStreaming && (
                <div className="flex justify-start">
                  <div className="bg-divider-dark border border-divider-dark p-5 max-w-[85%]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-brass/60 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-brass/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-brass/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Report generation card */}
              {showReportButton && !reportContent && !isStreaming && (
                <div className="no-print border border-brass/30 bg-brass/5 p-4 sm:p-6 mt-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <FileText className="h-6 w-6 text-brass shrink-0 mt-0.5 hidden sm:block" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-bone">Ready for your personalized AI readiness report?</h3>
                      <p className="text-xs text-stone mt-1">
                        Based on our conversation, we&apos;ll generate a detailed report with specific recommendations for your business.
                      </p>

                      {!showReportForm ? (
                        <Button
                          size="default"
                          className="mt-4"
                          onClick={() => setShowReportForm(true)}
                        >
                          Get My Report <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <form onSubmit={handleGenerateReport} className="mt-4 space-y-3">
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                            <input
                              type="text"
                              required
                              placeholder="Your name"
                              value={reportName}
                              onChange={(e) => setReportName(e.target.value)}
                              className="w-full bg-forge-black border border-divider-dark text-bone placeholder:text-stone pl-10 pr-4 py-2.5 text-sm focus:border-brass focus:outline-none transition-colors"
                            />
                          </div>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                            <input
                              type="email"
                              required
                              placeholder="you@company.com"
                              value={reportEmail}
                              onChange={(e) => setReportEmail(e.target.value)}
                              className="w-full bg-forge-black border border-divider-dark text-bone placeholder:text-stone pl-10 pr-4 py-2.5 text-sm focus:border-brass focus:outline-none transition-colors"
                            />
                          </div>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                            <input
                              type="text"
                              placeholder="Company name (optional)"
                              value={reportCompany}
                              onChange={(e) => setReportCompany(e.target.value)}
                              className="w-full bg-forge-black border border-divider-dark text-bone placeholder:text-stone pl-10 pr-4 py-2.5 text-sm focus:border-brass focus:outline-none transition-colors"
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button type="submit" size="default" disabled={reportLoading}>
                              {reportLoading ? (
                                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</>
                              ) : (
                                <>Generate Report <FileText className="ml-2 h-4 w-4" /></>
                              )}
                            </Button>
                            <button
                              type="button"
                              onClick={() => setShowReportForm(false)}
                              className="text-xs text-stone hover:text-bone transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Report content display */}
              {reportContent && (
                <div className="border border-brass/30 bg-forge-black/80 p-6 mt-4 print-report">
                  <div className="flex items-center justify-between mb-4 no-print">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-brass" />
                      <h3 className="text-sm font-bold text-bone">Your AI Readiness Report</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 text-xs text-stone hover:text-bone border border-divider-dark px-3 py-1.5 transition-colors"
                      >
                        <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
                      </button>
                      <button
                        onClick={() => setReportContent(null)}
                        className="text-stone hover:text-bone transition-colors p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-divider-dark pt-4 space-y-1">
                    {renderReportMarkdown(reportContent)}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-divider-dark px-4 sm:px-6 py-3 sm:py-4 lg:px-10 pb-[env(safe-area-inset-bottom,12px)]">
            <form onSubmit={handleChatSubmit} className="mx-auto max-w-3xl flex gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me about your biggest challenge..."
                className="flex-1 min-w-0 bg-divider-dark border border-divider-dark text-bone placeholder:text-stone px-3 sm:px-4 py-3 text-base sm:text-sm focus:border-brass focus:outline-none transition-colors"
                disabled={isStreaming}
              />
              <Button type="submit" disabled={isStreaming || !input.trim()} size="default" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mx-auto max-w-3xl mt-2 text-xs text-stone text-center hidden sm:block">
              Forge Intelligence uses AI to analyze your business. Your conversation is confidential.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
