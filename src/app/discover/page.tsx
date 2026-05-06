'use client';

import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Globe,
  LineChart,
  Loader2,
  Mail,
  MessageSquare,
  Printer,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/components/discover/chat-message';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface Message {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

interface CompanyIntelligence {
  domain: string;
  company: string;
  jobs: string;
  useCases: string;
  growthSignals?: string;
  sourceNotes?: string;
  sources?: SourceReference[];
  fallback?: boolean;
}

interface SourceReference {
  title?: string;
  url: string;
  publisher?: string;
}

type ActivityType = 'agent' | 'automation' | 'model' | 'copilot';
type Priority = 'must' | 'curious' | 'skip';

interface ValueChainActivity {
  name: string;
  aiImpact: string;
  type: ActivityType;
  impact: string;
}

interface ValueChainFunction {
  function: string;
  description: string;
  activities: ValueChainActivity[];
}

interface CustomValueChain {
  companyName: string;
  industry: string;
  functions: ValueChainFunction[];
  topPriorities: string[];
}

interface ActivityAnnotation {
  priority?: Priority;
  notes?: string;
}

interface AmbitionBrief {
  companyName: string;
  domain: string;
  industry: string;
  ambition: string;
  industryThesis: string;
  growthSignals: string[];
  futureState: { label: string; detail: string }[];
  financialUpside: { label: string; range: string; basis: string }[];
  firstMoves: string[];
  sources: SourceReference[];
}

interface DiscoverDraft {
  savedAt?: string;
  phase?: 'url' | 'researching' | 'brief' | 'value-chain' | 'chat';
  websiteUrl?: string;
  companyName?: string;
  workEmail?: string;
  contactName?: string;
  intelligence?: CompanyIntelligence | null;
  valueChain?: CustomValueChain | null;
  ambitionBrief?: AmbitionBrief | null;
  annotations?: Record<string, ActivityAnnotation>;
  messages?: Message[];
  reportContent?: string | null;
  reportDelivery?: 'sent' | 'not_sent' | null;
  reportName?: string;
  reportEmail?: string;
  reportCompany?: string;
}

const DISCOVER_DRAFT_KEY = 'clearforge_discover_draft_v3';

const SITUATION_CARDS = [
  {
    label: 'Revenue stall',
    detail: "Our sales team is working harder but pipeline isn't growing proportionally",
  },
  {
    label: 'AI pilots stuck',
    detail: "We've invested in AI experiments but nothing has reached production",
  },
  {
    label: 'Cost reduction needed',
    detail: 'We have manual processes that are bleeding time and money',
  },
  {
    label: 'Post-acquisition AI',
    detail: 'Our PE firm needs AI-driven value creation across portfolio companies',
  },
];

const VALUE_MAP_DELIVERABLES = [
  {
    icon: Target,
    label: 'Value-chain map',
    detail:
      'A company-specific view of where AI could move growth, speed, quality, service, or margin.',
  },
  {
    icon: BarChart3,
    label: 'Maturity read',
    detail:
      'A practical score of readiness, operating friction, adoption risk, and first-build potential.',
  },
  {
    icon: ClipboardCheck,
    label: 'First-build agenda',
    detail: 'The workflow, agents, data path, controls, and owners ClearForge would scope first.',
  },
  {
    icon: FileText,
    label: 'Executive report',
    detail:
      'A concise PDF-style report you can print, share, or use to prepare a leadership discussion.',
  },
];

const RESEARCH_PROGRESS_STEPS = [
  {
    label: 'Capture request',
    detail: 'Company, website, and email are logged so ClearForge can follow up.',
  },
  {
    label: 'Read the business',
    detail: 'Scan the site and public signals for business model, buyers, and workflow clues.',
  },
  {
    label: 'Find value-chain pressure',
    detail: 'Separate growth, service, operating, knowledge-work, and quality opportunities.',
  },
  {
    label: 'Draft first-build map',
    detail: 'Translate the signals into a practical AI value-chain and starting agenda.',
  },
  {
    label: 'Prepare results',
    detail: 'Package the map so the conversation and report stay company-specific.',
  },
];

const PROMPT_TEXT_LIMITS = {
  company: 2200,
  jobs: 1200,
  useCases: 2600,
  valueChain: 6500,
  ambition: 4200,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clampPromptText(text: string, maxChars: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, maxChars).trim()}...`;
}

function splitSignalLines(text?: string): string[] {
  if (!text) return [];

  return text
    .split(/\n|•/)
    .map((line) =>
      line
        .replace(/^[-*\d.)\s]+/, '')
        .replace(/\[[^\]]+\]/g, '')
        .trim(),
    )
    .filter((line) => line.length > 24)
    .slice(0, 4);
}

function sourceLabel(source: SourceReference): string {
  if (source.publisher) return source.publisher;
  if (source.title) return source.title;

  try {
    return new URL(source.url).hostname.replace(/^www\./, '');
  } catch {
    return 'Source';
  }
}

function sourceFromUrl(url: string): SourceReference | null {
  try {
    const parsed = new URL(url);
    return {
      url,
      publisher: parsed.hostname.replace(/^www\./, ''),
    };
  } catch {
    return null;
  }
}

function compactPriorityLabel(priority: string): string {
  return priority.split('—')[0]?.trim() || priority;
}

function buildAmbitionBrief(
  intelligence: CompanyIntelligence,
  valueChain: CustomValueChain | null,
  submittedCompanyName: string,
): AmbitionBrief {
  const companyName = submittedCompanyName || valueChain?.companyName || intelligence.domain;
  const industry = valueChain?.industry || 'Operating Company';
  const industryDescriptor =
    industry.toLowerCase() === 'operating company'
      ? 'business'
      : `${industry.toLowerCase()} operator`;
  const growthSignals = splitSignalLines(intelligence.growthSignals);
  const sourceNotes = splitSignalLines(intelligence.sourceNotes);
  const sources = [
    ...(intelligence.sources ?? []),
    ...sourceNotes
      .map((line) => sourceFromUrl(line))
      .filter((source): source is SourceReference => Boolean(source)),
  ]
    .filter((source, index, all) => all.findIndex((other) => other.url === source.url) === index)
    .slice(0, 5);

  const firstMoves = valueChain?.topPriorities?.slice(0, 3).map(compactPriorityLabel) ?? [
    'Lead Signal Scoring',
    'Exception Control Tower',
    'Knowledge Answer Agent',
  ];

  return {
    companyName,
    domain: intelligence.domain,
    industry,
    ambition: `${companyName} can become a faster-learning ${industryDescriptor}: sharper demand sensing, tighter workflow control, and a team cadence that turns AI usage into measured value.`,
    industryThesis:
      growthSignals[0] ||
      `The highest-confidence growth path is to find where demand, service quality, operational exceptions, and knowledge work already constrain ${companyName}'s speed or margin.`,
    growthSignals: growthSignals.length
      ? growthSignals
      : [
          'Public growth signals were limited in the quick scan, so the first review should validate demand sources, customer segments, workflow bottlenecks, and competitor motion.',
          'The strongest near-term AI candidates are usually the workflows with high frequency, clear owners, repeated decisions, and measurable revenue, service, speed, or margin outcomes.',
        ],
    futureState: [
      {
        label: 'Growth sensing',
        detail:
          'AI monitors account, market, service, and pipeline signals so leaders see where demand is moving before the operating plan drifts.',
      },
      {
        label: 'Operating control',
        detail:
          'Agents and automations route work, catch exceptions, prepare decisions, and keep humans in control of high-risk or high-value moments.',
      },
      {
        label: 'Benefits cadence',
        detail:
          'Usage, cycle time, quality, service, revenue, and margin metrics are reviewed together so adoption is tied to financial realization.',
      },
    ],
    financialUpside: [
      {
        label: 'Revenue momentum',
        range: '+3-8%',
        basis:
          'Qualified pipeline, speed-to-lead, win-rate hygiene, renewal risk, and next-best-action coverage to validate before forecasting.',
      },
      {
        label: 'Earnings contribution',
        range: '+1-4 pts',
        basis:
          'Gross margin, avoidable rework, exception volume, team capacity, support burden, and cycle-time reduction in the first workflow.',
      },
      {
        label: 'Capacity release',
        range: '10-25%',
        basis:
          'Manual research, handoff, documentation, triage, reporting, and follow-up hours that can be redeployed to higher-value work.',
      },
    ],
    firstMoves,
    sources,
  };
}

function buildValueChainPromptContext(
  valueChain: CustomValueChain,
  annotations: Record<string, ActivityAnnotation>,
): string {
  const lines = [
    `## Custom Value Chain Generated for ${valueChain.companyName} (${valueChain.industry})`,
  ];

  if (valueChain.topPriorities.length) {
    lines.push('### ClearForge recommended starting points');
    for (const priority of valueChain.topPriorities) {
      lines.push(`- ${priority}`);
    }
  }

  valueChain.functions.forEach((fn) => {
    lines.push(`### ${fn.function}: ${fn.description}`);
    fn.activities.forEach((activity) => {
      lines.push(
        `- ${activity.name} (${activity.type}): ${activity.aiImpact} Metric/evidence: ${activity.impact}`,
      );
    });
  });

  const must = Object.entries(annotations)
    .filter(([, a]) => a.priority === 'must')
    .map(([key, a]) => `- ${key}${a.notes ? ` (notes: ${a.notes})` : ''}`);
  const curious = Object.entries(annotations)
    .filter(([, a]) => a.priority === 'curious')
    .map(([key, a]) => `- ${key}${a.notes ? ` (notes: ${a.notes})` : ''}`);
  const skip = Object.entries(annotations)
    .filter(([, a]) => a.priority === 'skip')
    .map(([key]) => `- ${key}`);

  if (must.length || curious.length || skip.length) {
    lines.push("## User's Priorities");
    if (must.length) lines.push(`Must-have activities:\n${must.join('\n')}`);
    if (curious.length) lines.push(`Curious about:\n${curious.join('\n')}`);
    if (skip.length) lines.push(`Marked not relevant:\n${skip.join('\n')}`);
    lines.push(
      'Prioritize must-have activities in responses and reference specific activities by name.',
    );
  }

  return clampPromptText(lines.join('\n'), PROMPT_TEXT_LIMITS.valueChain);
}

export default function DiscoverPage() {
  const [phase, setPhase] = useState<'url' | 'researching' | 'brief' | 'value-chain' | 'chat'>(
    'url',
  );
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [startError, setStartError] = useState('');
  const [savedDraft, setSavedDraft] = useState<DiscoverDraft | null>(null);
  const [lastSavedLabel, setLastSavedLabel] = useState('');
  const [researchProgress, setResearchProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [intelligence, setIntelligence] = useState<CompanyIntelligence | null>(null);
  const [valueChain, setValueChain] = useState<CustomValueChain | null>(null);
  const [ambitionBrief, setAmbitionBrief] = useState<AmbitionBrief | null>(null);
  const [annotations, setAnnotations] = useState<Record<string, ActivityAnnotation>>({});
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSituations, setShowSituations] = useState(true);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [reportDelivery, setReportDelivery] = useState<'sent' | 'not_sent' | null>(null);
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportCompany, setReportCompany] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(DISCOVER_DRAFT_KEY);
      if (!stored) return;

      const draft = JSON.parse(stored) as DiscoverDraft;
      if (draft.websiteUrl || draft.messages?.length || draft.ambitionBrief) {
        setSavedDraft(draft);
      }
    } catch {
      // A corrupted draft should never block a fresh assessment.
    }
  }, []);

  useEffect(() => {
    if (phase !== 'researching') return;

    setElapsedSeconds(0);
    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'url' && !messages.length && !intelligence && !valueChain && !ambitionBrief) {
      return;
    }

    const handle = window.setTimeout(() => {
      try {
        const savedAt = new Date().toISOString();
        const draft: DiscoverDraft = {
          savedAt,
          phase,
          websiteUrl,
          companyName,
          workEmail,
          contactName,
          intelligence,
          valueChain,
          ambitionBrief,
          annotations,
          messages,
          reportContent,
          reportDelivery,
          reportName,
          reportEmail,
          reportCompany,
        };
        window.localStorage.setItem(DISCOVER_DRAFT_KEY, JSON.stringify(draft));
        setLastSavedLabel(
          new Date(savedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        );
      } catch {
        // Local autosave is a convenience, never a blocker.
      }
    }, 250);

    return () => window.clearTimeout(handle);
  }, [
    phase,
    websiteUrl,
    companyName,
    workEmail,
    contactName,
    intelligence,
    valueChain,
    ambitionBrief,
    annotations,
    messages,
    reportContent,
    reportDelivery,
    reportName,
    reportEmail,
    reportCompany,
  ]);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const restoreDraft = (draft: DiscoverDraft) => {
    setWebsiteUrl(draft.websiteUrl || '');
    setCompanyName(draft.companyName || '');
    setWorkEmail(draft.workEmail || '');
    setContactName(draft.contactName || '');
    setIntelligence(draft.intelligence || null);
    setValueChain(draft.valueChain || null);
    setAmbitionBrief(draft.ambitionBrief || null);
    setAnnotations(draft.annotations || {});
    setMessages(draft.messages || []);
    setReportContent(draft.reportContent || null);
    setReportDelivery(draft.reportDelivery || null);
    setReportName(draft.reportName || draft.contactName || '');
    setReportEmail(draft.reportEmail || draft.workEmail || '');
    setReportCompany(draft.reportCompany || draft.companyName || '');
    setSavedDraft(null);
    setPhase(draft.phase && draft.phase !== 'researching' ? draft.phase : 'url');
    trackEvent('ai_value_map_draft_resumed', {
      company: draft.companyName || 'unknown',
      has_brief: Boolean(draft.ambitionBrief),
      message_count: draft.messages?.length ?? 0,
    });
  };

  // Phase 1: Research the company → generate custom value chain
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = websiteUrl.trim();
    const trimmedCompany = companyName.trim();
    const trimmedEmail = workEmail.trim().toLowerCase();
    const trimmedName = contactName.trim();

    if (!trimmedUrl || !trimmedCompany || !trimmedEmail) {
      setStartError('Please enter your company website, company name, and work email.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setStartError('Please enter a valid work email so we can send the results.');
      return;
    }

    setStartError('');
    setReportEmail(trimmedEmail);
    setReportCompany(trimmedCompany);
    if (trimmedName) setReportName(trimmedName);
    setResearchProgress(0);
    window.setTimeout(() => setResearchProgress((step) => Math.max(step, 1)), 500);

    trackEvent('ai_value_map_started', {
      mode: 'website',
      domain: trimmedUrl,
      company: trimmedCompany,
      has_email: true,
    });
    setPhase('researching');

    try {
      // Step 1: Perplexity research
      const res = await fetch('/api/discover/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: trimmedUrl,
          company: trimmedCompany,
          email: trimmedEmail,
          name: trimmedName,
        }),
      });

      const data = await res.json();

      if (data.error && !data.domain) {
        setIntelligence(null);
        setMessages([
          {
            role: 'assistant',
            content:
              "Welcome to Forge Intelligence. I'd love to learn about your business.\n\nWhat's the biggest challenge you're facing with AI or automation right now?",
          },
        ]);
        setPhase('chat');
        return;
      }

      setIntelligence(data);
      setResearchProgress(2);

      // Step 2: Custom value chain (Claude Sonnet 4.5)
      try {
        setResearchProgress(3);
        const vcRes = await fetch('/api/discover/value-chain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const vcData = await vcRes.json();

        if (vcData.functions) {
          setValueChain(vcData);
          const brief = buildAmbitionBrief(data, vcData, trimmedCompany);
          setAmbitionBrief(brief);
          setMessages([
            {
              role: 'assistant',
              content: `I drafted a first-pass ambition brief for **${brief.companyName}** from the website and public signals. The ranges are hypotheses to validate, not a forecast.\n\nWhich assumption should we tighten first: growth, earnings, adoption, or controls?`,
            },
          ]);
          setShowSituations(false);
          setResearchProgress(4);
          setPhase('brief');
          return;
        }
      } catch {
        // value-chain generation failed — fall through to chat
      }

      // Fallback: skip value chain, go straight to chat
      setAmbitionBrief(buildAmbitionBrief(data, null, trimmedCompany));
      const openingMessage = `I've done some research on **${data.domain}** to give you a head start.\n\nBased on what I've found, I can see several areas where AI could drive significant impact for your business.\n\n**What's the single biggest operational challenge you're facing right now?**`;
      setMessages([{ role: 'assistant', content: openingMessage }]);
      setPhase('brief');
    } catch {
      setIntelligence(null);
      setMessages([
        {
          role: 'assistant',
          content:
            "Welcome to Forge Intelligence. Tell me about your business — what's the biggest challenge you're facing?",
        },
      ]);
      setPhase('chat');
    }
  };

  const handleValueChainContinue = () => {
    if (!valueChain) {
      setPhase('chat');
      return;
    }

    // Build a context summary of user priorities
    const must = Object.entries(annotations)
      .filter(([_, a]) => a.priority === 'must')
      .map(([key, a]) => ({ key, notes: a.notes }));
    const curious = Object.entries(annotations)
      .filter(([_, a]) => a.priority === 'curious')
      .map(([key, a]) => ({ key, notes: a.notes }));

    trackEvent('ai_value_chain_reviewed', {
      must_have_count: must.length,
      curious_count: curious.length,
      company: valueChain.companyName,
    });

    const summary =
      must.length === 0 && curious.length === 0
        ? `I've drafted a custom value chain for **${valueChain.companyName}**. Take a look at it — those are the activities ClearForge typically automates first for ${valueChain.industry.toLowerCase()} operators.\n\nLet's talk through your priorities. **What's the single biggest operational challenge you're facing right now?**`
        : `Got it. You flagged ${must.length} priority${must.length === 1 ? '' : ' activities'} as must-have${curious.length ? ` and ${curious.length} as curious` : ''}.\n\n${
            must.length
              ? `**Top priorities:**\n${must.map((m) => `- ${m.key}${m.notes ? `: ${m.notes}` : ''}`).join('\n')}\n\n`
              : ''
          }Let's dig in. **What's making the top priority hard to crack today?**`;

    setMessages([{ role: 'assistant', content: summary }]);
    setPhase('chat');
  };

  const updateAnnotation = (key: string, patch: Partial<ActivityAnnotation>) => {
    setAnnotations((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...patch },
    }));
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
        // Build value chain context if user annotated activities
        let vcContext = '';
        if (valueChain) {
          vcContext = `\n\n${buildValueChainPromptContext(valueChain, annotations)}`;
        }
        const ambitionContext = ambitionBrief
          ? `\n\n## Living Ambition Brief\nAmbition: ${ambitionBrief.ambition}\nIndustry thesis: ${ambitionBrief.industryThesis}\nGrowth signals:\n${ambitionBrief.growthSignals.map((signal) => `- ${signal}`).join('\n')}\nFinancial hypotheses to validate:\n${ambitionBrief.financialUpside.map((item) => `- ${item.label}: ${item.range} (${item.basis})`).join('\n')}`
          : '';

        contextMessages.unshift({
          role: 'system',
          content: `COMPANY RESEARCH CONTEXT (from live research on ${intelligence.domain}):\n\n## Company Overview:\n${clampPromptText(intelligence.company, PROMPT_TEXT_LIMITS.company)}\n\n## Current Job Postings (roles we can automate):\n${clampPromptText(intelligence.jobs, PROMPT_TEXT_LIMITS.jobs)}\n\n## AI Use Cases for This Company:\n${clampPromptText(intelligence.useCases, PROMPT_TEXT_LIMITS.useCases)}${ambitionContext}${vcContext}\n\nINSTRUCTIONS: Use this context to give highly specific, personalized recommendations. Reference their actual business, products, and operations by name. When discussing job postings, explain how AI agents could handle those roles more efficiently. Be specific to THEIR company, not generic. Treat any upside ranges as hypotheses to validate with baseline data, not as promised outcomes.`,
        });
      }

      const response = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: contextMessages.map((m) => ({
            role: m.role === 'system' ? 'user' : m.role,
            content:
              m.role === 'system'
                ? `[Research Context — use to inform responses, do not repeat verbatim]\n\n${m.content}`
                : m.content,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.content === 'string' ? data.content : 'Failed');
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting. Please try again, or reach out at james@clearforge.ai.",
        },
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

  const sendCurrentResults = async (source: 'brief' | 'chat' | 'form') => {
    if (!reportEmail.trim() || !reportCompany.trim()) return;

    trackEvent('ai_value_map_report_requested', {
      company: reportCompany.trim() || valueChain?.companyName || intelligence?.domain || 'unknown',
      message_count: messages.filter((m) => m.role !== 'system').length,
      source,
    });
    setReportLoading(true);
    setReportDelivery(null);
    try {
      const res = await fetch('/api/discover/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
          intelligence,
          valueChain,
          ambitionBrief,
          annotations,
          name: reportName.trim(),
          email: reportEmail.trim(),
          company: reportCompany.trim(),
          companyUrl: websiteUrl.trim(),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReportContent(data.report || data.content || JSON.stringify(data, null, 2));
      setReportDelivery(data.emailSent ? 'sent' : 'not_sent');
      setShowReportForm(false);
    } catch {
      setReportContent(
        'Report generation failed. Please try again or contact james@clearforge.ai for a personalized assessment.',
      );
      setReportDelivery(null);
    } finally {
      setReportLoading(false);
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendCurrentResults('form');
  };

  const renderReportMarkdown = (text: string) => {
    let offset = 0;
    return text.split('\n').map((line) => {
      const key = `${offset}-${line}`;
      offset += line.length + 1;
      if (line.startsWith('# '))
        return (
          <h1
            key={key}
            className="text-2xl font-bold text-bone mt-6 mb-3"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {line.replace('# ', '')}
          </h1>
        );
      if (line.startsWith('## '))
        return (
          <h2
            key={key}
            className="text-xl font-bold text-bone mt-5 mb-2"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {line.replace('## ', '')}
          </h2>
        );
      if (line.startsWith('### '))
        return (
          <h3 key={key} className="text-lg font-semibold text-bone mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      if (line.match(/^[-•]\s/))
        return (
          <li key={key} className="ml-4 list-disc text-sm text-stone">
            {line.replace(/^[-•]\s/, '')}
          </li>
        );
      if (line.match(/^\d+\.\s/))
        return (
          <li key={key} className="ml-4 list-decimal text-sm text-stone">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      if (line.startsWith('**') && line.endsWith('**'))
        return (
          <p key={key} className="text-sm font-semibold text-bone mt-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      if (line.trim() === '') return <br key={key} />;
      return (
        <p key={key} className="text-sm text-stone">
          {line}
        </p>
      );
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSkip = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Welcome to Forge Intelligence. I'm here to understand your business and identify where AI can drive the most impact.\n\nWhat brings you to ClearForge today?",
      },
    ]);
    setPhase('chat');
  };

  const visibleMessages = messages.filter((m) => m.role !== 'system');

  const renderReportContent = (compact = false) =>
    reportContent ? (
      <div className="border border-brass/30 bg-forge-black/80 p-5 print-report">
        <div className="flex items-start justify-between gap-3 mb-4 no-print">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
            <div>
              <h3 className="text-sm font-bold text-bone">Current AI Value Map</h3>
              {reportDelivery === 'sent' && (
                <p className="mt-0.5 text-xs text-stone">
                  Emailed to <span className="text-bone">{reportEmail}</span>.
                </p>
              )}
              {reportDelivery === 'not_sent' && (
                <p className="mt-0.5 text-xs text-stone">
                  Saved here. Email delivery did not confirm.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 border border-divider-dark px-3 py-1.5 text-xs text-stone transition-colors hover:text-bone"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <button
              type="button"
              onClick={() => setReportContent(null)}
              className="p-1 text-stone transition-colors hover:text-bone"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          className={`border-t border-divider-dark pt-4 space-y-1 ${compact ? 'max-h-[340px] overflow-y-auto pr-2' : ''}`}
        >
          {renderReportMarkdown(reportContent)}
        </div>
      </div>
    ) : null;

  const renderConversationPanel = (mode: 'brief' | 'chat') => (
    <div className="flex h-full min-h-[560px] flex-col border border-divider-dark bg-[#0d1117]/90">
      <div className="border-b border-divider-dark p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="overline text-brass-light">Forge Intelligence</p>
            <h3 className="mt-1 text-h3 text-bone">Refine the ambition.</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone">
              Ask for sharper assumptions, a better first workflow, risk controls, or the business
              case logic. Progress autosaves{lastSavedLabel ? ` at ${lastSavedLabel}` : ''}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void sendCurrentResults(mode)}
            disabled={reportLoading || !reportEmail.trim() || !reportCompany.trim()}
            className="inline-flex shrink-0 items-center gap-2 border border-brass/40 px-3 py-2 text-xs font-semibold text-brass-light transition-colors hover:border-brass-light hover:text-bone disabled:opacity-50"
          >
            {reportLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Mail className="h-3.5 w-3.5" />
            )}
            Send
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        <div className="space-y-4">
          {visibleMessages.map((msg) => (
            <ChatMessage
              key={`${msg.role}-${msg.content.slice(0, 120)}`}
              content={msg.content}
              role={msg.role as 'user' | 'assistant'}
            />
          ))}

          {showSituations && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SITUATION_CARDS.map((card) => (
                <button
                  type="button"
                  key={card.label}
                  onClick={() => sendMessage(card.detail)}
                  className="group border border-divider-dark p-4 text-left transition-colors hover:border-brass"
                >
                  <p className="text-sm font-semibold text-bone transition-colors group-hover:text-brass">
                    {card.label}
                  </p>
                  <p className="mt-1 text-xs text-stone">{card.detail}</p>
                </button>
              ))}
            </div>
          )}

          {mode === 'brief' && !isStreaming && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                'Tighten the revenue hypothesis',
                'Show the first 90-day build',
                'What controls do we need?',
                'Rewrite this for my CEO',
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="border border-divider-dark px-3 py-2 text-left text-xs text-stone transition-colors hover:border-brass/60 hover:text-bone"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {isStreaming && (
            <div className="flex justify-start">
              <div className="max-w-[85%] border border-divider-dark bg-divider-dark p-4">
                <div className="flex items-center gap-2 text-xs text-stone">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brass" />
                  Sharpening the recommendation...
                </div>
              </div>
            </div>
          )}

          {renderReportContent(true)}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-divider-dark p-3 sm:p-4">
        <form
          onSubmit={handleChatSubmit}
          data-analytics="discover_chat_submit"
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask how to improve the ambition, business case, controls, or first build..."
            className="min-w-0 flex-1 border border-divider-dark bg-forge-black px-3 py-3 text-base text-bone transition-colors placeholder:text-stone focus:border-brass focus:outline-none sm:text-sm"
            disabled={isStreaming}
          />
          <Button type="submit" disabled={isStreaming || !input.trim()} size="default">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-stone">
          <Save className="h-3.5 w-3.5" />
          Autosaved in this browser. Email the current version anytime.
        </p>
      </div>
    </div>
  );

  const renderAmbitionBrief = () =>
    ambitionBrief ? (
      <div className="space-y-8">
        <section className="border-b border-divider-dark pb-8">
          <p className="overline text-brass-light">First-pass ambition brief</p>
          <h2 className="mt-4 text-display text-bone">
            {ambitionBrief.companyName}: future state.
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-stone">{ambitionBrief.ambition}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone">
            <span className="inline-flex items-center gap-2 border border-divider-dark px-3 py-2">
              <Globe className="h-3.5 w-3.5 text-brass" /> {ambitionBrief.domain}
            </span>
            <span className="inline-flex items-center gap-2 border border-divider-dark px-3 py-2">
              <LineChart className="h-3.5 w-3.5 text-brass" /> {ambitionBrief.industry}
            </span>
            <span className="inline-flex items-center gap-2 border border-divider-dark px-3 py-2">
              <ShieldCheck className="h-3.5 w-3.5 text-brass" /> Ranges to validate
            </span>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {ambitionBrief.financialUpside.map((item) => (
            <div key={item.label} className="border border-divider-dark bg-bone/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-stone">{item.label}</p>
              <p className="metric mt-3 text-3xl text-brass-light">{item.range}</p>
              <p className="mt-3 text-xs leading-relaxed text-stone">{item.basis}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border border-divider-dark p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brass" />
              <h3 className="text-h3 text-bone">Where industry growth pressure is coming from.</h3>
            </div>
            <p className="mt-3 text-body-sm text-stone">{ambitionBrief.industryThesis}</p>
            <ul className="mt-5 space-y-3">
              {ambitionBrief.growthSignals.map((signal) => (
                <li
                  key={signal}
                  className="border-t border-divider-dark pt-3 text-body-sm text-bone"
                >
                  {signal}
                </li>
              ))}
            </ul>
            {ambitionBrief.sources.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {ambitionBrief.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-divider-dark px-3 py-1.5 text-xs text-stone transition-colors hover:border-brass/60 hover:text-bone"
                  >
                    {sourceLabel(source)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
            {ambitionBrief.sources.length === 0 && (
              <p className="mt-5 border border-divider-dark px-3 py-2 text-xs leading-relaxed text-stone">
                Live research did not return citations in this environment. The production scan
                attaches source links when the research provider returns them; otherwise the brief
                labels the assumptions to validate.
              </p>
            )}
          </div>

          <div className="border border-divider-dark p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brass" />
              <h3 className="text-h3 text-bone">The operating ambition.</h3>
            </div>
            <div className="mt-5 space-y-4">
              {ambitionBrief.futureState.map((state) => (
                <div key={state.label} className="border-t border-divider-dark pt-4">
                  <p className="text-sm font-semibold text-bone">{state.label}</p>
                  <p className="mt-1 text-body-sm text-stone">{state.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border border-divider-dark p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="overline text-brass-light">First build agenda</p>
              <h3 className="mt-2 text-h3 text-bone">
                Start where value, workflow ownership, and adoption can meet.
              </h3>
            </div>
            <Button onClick={() => void sendCurrentResults('brief')} disabled={reportLoading}>
              {reportLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                <>
                  Send Current Results <Mail className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {ambitionBrief.firstMoves.map((move, index) => (
              <div key={move} className="border border-divider-dark bg-bone/[0.03] p-4">
                <span className="metric text-xs text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-sm font-semibold text-bone">{move}</p>
              </div>
            ))}
          </div>

          {valueChain && (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {valueChain.functions.map((fn) => (
                <div key={fn.function} className="border border-divider-dark p-4">
                  <p className="text-sm font-semibold text-bone">{fn.function}</p>
                  <p className="mt-1 text-xs leading-relaxed text-stone">{fn.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    ) : null;

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
          <div className="max-w-3xl w-full text-center">
            <Sparkles className="h-10 w-10 text-brass mx-auto mb-6" />
            <h2 className="text-display text-bone">Let&apos;s analyze your business.</h2>
            <p className="mt-4 text-body-lg text-stone max-w-xl mx-auto">
              Enter your company website and Forge Intelligence will draft a value-chain map,
              maturity read, and first-build recommendation for a custom AI operating system.
            </p>

            <form
              onSubmit={handleUrlSubmit}
              data-analytics="discover_url_submit"
              className="mt-10 mx-auto max-w-2xl"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative sm:col-span-2">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="Company website, e.g. yourcompany.com"
                    className="w-full bg-divider-dark border border-divider-dark text-bone placeholder:text-stone pl-11 pr-4 py-4 text-sm focus:border-brass focus:outline-none transition-colors"
                    required
                    autoComplete="url"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name"
                    className="w-full bg-divider-dark border border-divider-dark text-bone placeholder:text-stone pl-11 pr-4 py-4 text-sm focus:border-brass focus:outline-none transition-colors"
                    required
                    autoComplete="organization"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="Work email for results"
                    className="w-full bg-divider-dark border border-divider-dark text-bone placeholder:text-stone pl-11 pr-4 py-4 text-sm focus:border-brass focus:outline-none transition-colors"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full bg-divider-dark border border-divider-dark text-bone placeholder:text-stone pl-11 pr-4 py-4 text-sm focus:border-brass focus:outline-none transition-colors"
                    autoComplete="name"
                  />
                </div>
                {startError && (
                  <p className="sm:col-span-2 text-left text-xs text-brass-light">{startError}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={!websiteUrl.trim() || !companyName.trim() || !workEmail.trim()}
                  className="w-full sm:col-span-2"
                >
                  Analyze <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone">
                We send the report to your work email and notify ClearForge so James can follow up
                with a sharper recommendation if the automated scan misses context.
              </p>
            </form>

            {savedDraft && (
              <div className="mx-auto mt-5 max-w-2xl border border-brass/30 bg-brass/5 p-4 text-left">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-bone">Resume saved value map?</p>
                    <p className="mt-1 text-xs text-stone">
                      {savedDraft.companyName || savedDraft.websiteUrl || 'Previous assessment'}
                      {savedDraft.savedAt
                        ? ` · saved ${new Date(savedDraft.savedAt).toLocaleDateString()}`
                        : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => restoreDraft(savedDraft)}
                      className="border border-brass/40 px-3 py-2 text-xs font-semibold text-brass-light transition-colors hover:border-brass-light hover:text-bone"
                    >
                      Resume
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.localStorage.removeItem(DISCOVER_DRAFT_KEY);
                        setSavedDraft(null);
                      }}
                      className="border border-divider-dark px-3 py-2 text-xs text-stone transition-colors hover:text-bone"
                    >
                      Start fresh
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSkip}
              className="mt-6 text-sm text-stone hover:text-bone transition-colors min-h-[44px]"
            >
              Skip — I&apos;ll describe my business instead
            </button>

            <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
              {VALUE_MAP_DELIVERABLES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="border border-divider-dark bg-bone/[0.03] p-4">
                    <Icon className="h-4 w-4 text-brass-light" />
                    <p className="mt-3 text-sm font-semibold text-bone">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
              {[
                { metric: '<60 sec', label: 'Typical first map' },
                { metric: 'Free', label: 'No commitment' },
                { metric: 'Email', label: 'Results delivered' },
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
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-brass/40 bg-brass/10">
              <Loader2 className="h-6 w-6 text-brass animate-spin" />
            </div>
            <h2 className="mt-6 text-h2 text-bone">
              Researching {websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}...
            </h2>
            <p className="mt-3 text-body-sm text-stone">
              Building a company-specific value map for{' '}
              <span className="text-bone">{companyName || 'your company'}</span>. Elapsed:{' '}
              {elapsedSeconds}s.
            </p>

            <div className="mt-8 h-1 w-full bg-divider-dark">
              <div
                className="h-full bg-brass transition-all duration-500"
                style={{
                  width: `${Math.min(96, ((researchProgress + 1) / RESEARCH_PROGRESS_STEPS.length) * 100)}%`,
                }}
              />
            </div>

            <div className="mt-8 space-y-3 text-left">
              {RESEARCH_PROGRESS_STEPS.map((step, i) => {
                const isComplete = i < researchProgress;
                const isCurrent = i === researchProgress;
                return (
                  <div
                    key={step.label}
                    className={`flex items-start gap-3 border border-divider-dark px-4 py-3 transition-colors ${
                      isCurrent ? 'bg-bone/[0.04] text-bone' : 'text-stone'
                    }`}
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-light" />
                    ) : isCurrent ? (
                      <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-brass" />
                    ) : (
                      <span className="mt-1.5 h-2 w-2 shrink-0 border border-stone/50" />
                    )}
                    <span>
                      <span className="block text-sm font-medium">{step.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-stone">
                        {step.detail}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>

            {elapsedSeconds > 18 && (
              <p className="mt-5 text-xs leading-relaxed text-stone">
                Still working. If live research is slow, we will fall back to a practical first map
                and keep the conversation moving.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ═══ PHASE 2.25: LIVING AMBITION BRIEF ═══ */}
      {phase === 'brief' && ambitionBrief && (
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-5 flex flex-col gap-3 border-b border-divider-dark pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-stone">
                <Save className="h-3.5 w-3.5 text-brass" />
                <span>
                  {lastSavedLabel ? `Saved at ${lastSavedLabel}` : 'Autosave is on'} · refine
                  anytime
                </span>
              </div>
              <button
                type="button"
                onClick={() => void sendCurrentResults('brief')}
                disabled={reportLoading}
                className="inline-flex items-center justify-center gap-2 border border-brass/40 px-4 py-2 text-xs font-semibold text-brass-light transition-colors hover:border-brass-light hover:text-bone disabled:opacity-50"
              >
                {reportLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Mail className="h-3.5 w-3.5" />
                )}
                Send current results
              </button>
            </div>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
              <div>{renderAmbitionBrief()}</div>
              <div className="xl:sticky xl:top-6 xl:h-[calc(100vh-8rem)]">
                {renderConversationPanel('brief')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 2.5: CUSTOM VALUE CHAIN ═══ */}
      {phase === 'value-chain' && valueChain && (
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Intro */}
            <div className="mb-8 sm:mb-10">
              <p className="overline text-brass-light">Your Custom Value Chain</p>
              <h2
                className="mt-3 text-display text-bone max-w-3xl"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                {valueChain.companyName}: where AI fits.
              </h2>
              <p className="mt-4 text-body text-stone max-w-2xl">
                Click any activity to mark priority and add notes. Your annotations carry into the
                conversation and the final report, so the next step is grounded in your operating
                reality.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {VALUE_MAP_DELIVERABLES.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-divider-dark p-4">
                      <Icon className="h-4 w-4 text-brass-light" />
                      <p className="mt-3 text-sm font-semibold text-bone">{item.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-stone">{item.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* ClearForge top priorities — anchor for visitor */}
              {valueChain.topPriorities && valueChain.topPriorities.length > 0 && (
                <div className="mt-8 border-l-2 border-brass-light pl-5">
                  <p className="text-[10px] uppercase text-brass-light font-semibold">
                    ClearForge would start here
                  </p>
                  <ul className="mt-3 space-y-2">
                    {valueChain.topPriorities.map((p, i) => (
                      <li key={p} className="text-body-sm text-bone">
                        <span className="metric text-xs text-brass mr-2">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Functions × activities */}
            <div className="space-y-10">
              {valueChain.functions.map((fn, fi) => (
                <div key={fn.function} className="border-t border-divider-dark pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="metric text-xs text-brass">
                      {String(fi + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-h3 text-bone"
                      style={{ fontFamily: 'var(--font-instrument-serif)' }}
                    >
                      {fn.function}
                    </h3>
                  </div>
                  <p className="mt-1 ml-7 text-body-sm text-stone max-w-2xl">{fn.description}</p>

                  <ul className="mt-5 space-y-2">
                    {fn.activities.map((act) => {
                      const key = `${fn.function}::${act.name}`;
                      const ann = annotations[key] || {};
                      const isExpanded = expandedActivity === key;
                      return (
                        <li
                          key={key}
                          className="border border-divider-dark hover:border-brass/40 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedActivity(isExpanded ? null : key)}
                            className="w-full text-left p-4 sm:p-5"
                          >
                            <div className="flex items-start gap-3 sm:gap-4">
                              {/* Priority indicator */}
                              <div className="shrink-0 mt-1">
                                {ann.priority === 'must' ? (
                                  <Star className="h-4 w-4 text-brass-light fill-brass-light" />
                                ) : ann.priority === 'curious' ? (
                                  <Star className="h-4 w-4 text-brass-light" />
                                ) : ann.priority === 'skip' ? (
                                  <X className="h-4 w-4 text-stone/40" />
                                ) : (
                                  <span className="block h-4 w-4 border border-stone/40 rounded-full" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                  <p className="text-body text-bone font-medium">{act.name}</p>
                                  <span className="shrink-0 text-[10px] uppercase text-stone border border-stone/30 px-2 py-0.5">
                                    {act.type === 'agent'
                                      ? 'AI agent'
                                      : act.type === 'automation'
                                        ? 'Workflow auto'
                                        : act.type === 'model'
                                          ? 'Predictive model'
                                          : 'Copilot'}
                                  </span>
                                </div>
                                <p className="mt-1.5 text-body-sm text-stone">{act.aiImpact}</p>
                                <p className="mt-1 text-[11px] text-brass-light font-medium">
                                  {act.impact}
                                </p>
                                {ann.notes && !isExpanded && (
                                  <p className="mt-2 flex items-start gap-1.5 text-[11px] text-stone italic">
                                    <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                                    <span className="line-clamp-1">{ann.notes}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="border-t border-divider-dark p-4 sm:p-5 bg-divider-dark/30">
                              <p className="text-[11px] uppercase text-stone font-semibold">
                                Mark priority
                              </p>
                              <div className="mt-2 flex gap-2 flex-wrap">
                                {[
                                  {
                                    v: 'must' as Priority,
                                    label: 'Must-have',
                                    cls: 'border-brass-light bg-brass/10 text-brass-light',
                                  },
                                  {
                                    v: 'curious' as Priority,
                                    label: 'Curious',
                                    cls: 'border-brass/40 text-brass',
                                  },
                                  {
                                    v: 'skip' as Priority,
                                    label: 'Not relevant',
                                    cls: 'border-stone/30 text-stone',
                                  },
                                ].map((opt) => (
                                  <button
                                    key={opt.v}
                                    type="button"
                                    onClick={() =>
                                      updateAnnotation(key, {
                                        priority: ann.priority === opt.v ? undefined : opt.v,
                                      })
                                    }
                                    className={`text-xs px-3 py-1.5 border transition-colors ${ann.priority === opt.v ? opt.cls : 'border-stone/30 text-stone hover:border-bone/50'}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>

                              <p className="mt-5 text-[11px] uppercase text-stone font-semibold">
                                Notes (optional)
                              </p>
                              <textarea
                                value={ann.notes || ''}
                                onChange={(e) => updateAnnotation(key, { notes: e.target.value })}
                                placeholder="Why this is interesting? Constraints? Existing work? Anything to flag for ClearForge."
                                className="mt-2 w-full bg-forge-black border border-divider-dark text-bone placeholder:text-stone/50 px-3 py-2 text-sm focus:border-brass focus:outline-none transition-colors resize-none"
                                rows={3}
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Continue + summary */}
            <div className="mt-10 sm:mt-14 border-t border-divider-dark pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-stone">
                {Object.values(annotations).filter((a) => a.priority === 'must').length} must-have ·{' '}
                {Object.values(annotations).filter((a) => a.priority === 'curious').length} curious
                · {Object.values(annotations).filter((a) => a.priority === 'skip').length} skipped
              </div>
              <Button size="lg" onClick={handleValueChainContinue}>
                Continue to Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                  Researched <span className="font-semibold text-brass">{intelligence.domain}</span>{' '}
                  — responses personalized to your business
                </p>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 lg:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages
                .filter((m) => m.role !== 'system')
                .map((msg) => (
                  <ChatMessage
                    key={`${msg.role}-${msg.content.slice(0, 120)}`}
                    content={msg.content}
                    role={msg.role as 'user' | 'assistant'}
                  />
                ))}

              {showSituations && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {SITUATION_CARDS.map((card) => (
                    <button
                      type="button"
                      key={card.label}
                      onClick={() => sendMessage(card.detail)}
                      className="border border-divider-dark p-4 text-left hover:border-brass transition-colors group"
                    >
                      <p className="text-sm font-semibold text-bone group-hover:text-brass transition-colors">
                        {card.label}
                      </p>
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
                      <div
                        className="w-2 h-2 bg-brass/60 rounded-full animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <div
                        className="w-2 h-2 bg-brass/60 rounded-full animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      />
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
                      <h3 className="text-sm font-bold text-bone">
                        Ready for your personalized AI value map?
                      </h3>
                      <p className="text-xs text-stone mt-1">
                        Based on the value chain and conversation, we&apos;ll generate a concise
                        executive report, show it here, and email it to your work inbox.
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
                        <form
                          onSubmit={handleGenerateReport}
                          data-analytics="discover_report_submit"
                          className="mt-4 space-y-3"
                        >
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                            <input
                              type="text"
                              placeholder="Your name (optional)"
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
                              required
                              placeholder="Company name"
                              value={reportCompany}
                              onChange={(e) => setReportCompany(e.target.value)}
                              className="w-full bg-forge-black border border-divider-dark text-bone placeholder:text-stone pl-10 pr-4 py-2.5 text-sm focus:border-brass focus:outline-none transition-colors"
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button type="submit" size="default" disabled={reportLoading}>
                              {reportLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...
                                </>
                              ) : (
                                <>
                                  Generate Report <FileText className="ml-2 h-4 w-4" />
                                </>
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
                      <div>
                        <h3 className="text-sm font-bold text-bone">Your AI Readiness Report</h3>
                        {reportDelivery === 'sent' && (
                          <p className="mt-0.5 text-xs text-stone">
                            Emailed to <span className="text-bone">{reportEmail}</span>.
                          </p>
                        )}
                        {reportDelivery === 'not_sent' && (
                          <p className="mt-0.5 text-xs text-stone">
                            Report generated here. Email delivery did not confirm.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 text-xs text-stone hover:text-bone border border-divider-dark px-3 py-1.5 transition-colors"
                      >
                        <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
                      </button>
                      <button
                        type="button"
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
            <form
              onSubmit={handleChatSubmit}
              data-analytics="discover_chat_submit"
              className="mx-auto max-w-3xl flex gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me about your biggest challenge..."
                className="flex-1 min-w-0 bg-divider-dark border border-divider-dark text-bone placeholder:text-stone px-3 sm:px-4 py-3 text-base sm:text-sm focus:border-brass focus:outline-none transition-colors"
                disabled={isStreaming}
              />
              <Button
                type="submit"
                disabled={isStreaming || !input.trim()}
                size="default"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mx-auto max-w-3xl mt-2 text-xs text-stone text-center hidden sm:block">
              Forge Intelligence uses AI to analyze your business. Your conversation is
              confidential.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
