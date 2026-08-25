'use client';

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Globe,
  LineChart,
  Save,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  DEMO_GROWTH_METRICS,
  DEMO_GROWTH_RECOMMENDATIONS,
  DEMO_INITIATIVES,
  DEMO_MARKETS,
  DEMO_OPPORTUNITIES,
  DEMO_OUTCOMES,
  DEMO_PLAYBOOKS,
  DEMO_SIGNALS,
  DEMO_WORKSPACE,
} from '@/data/revenue-ops-demo';
import { type PreparedDryRunHandoff, prepareDryRunCrmHandoff } from '@/lib/revenue-ops/connector';
import {
  ACTIVATION_POLICY_VERSION,
  type ApprovalRecord,
  createApprovalContextFingerprint,
} from '@/lib/revenue-ops/policy';
import {
  calculateOpportunityPriority,
  DEFAULT_PRIORITY_WEIGHTS,
  formatCurrencyRange,
  isSignalStale,
  PRIORITY_LABELS,
  priorityBand,
} from '@/lib/revenue-ops/scoring';
import type {
  Opportunity,
  OpportunityScoreKey,
  OpportunityStage,
  Playbook,
  Signal,
} from '@/lib/revenue-ops/types';
import { cn } from '@/lib/utils';

type View = 'overview' | 'market' | 'plays' | 'review';
type OpportunityFilter = 'all' | 'review' | 'approved' | 'activated';

const VIEW_ITEMS: Array<{ id: View; label: string; icon: typeof Target; detail: string }> = [
  { id: 'overview', label: 'Opportunity desk', icon: Target, detail: 'Triage what matters now' },
  { id: 'market', label: 'Market map', icon: Globe, detail: 'Fund the right growth bets' },
  {
    id: 'plays',
    label: 'Playbook library',
    icon: ClipboardCheck,
    detail: 'Make the motion repeatable',
  },
  { id: 'review', label: 'Growth review', icon: LineChart, detail: 'Learn what to change next' },
];

const OWNER_OPTIONS = ['Maya Chen', 'Jordan Patel', 'Elena Torres', 'Unassigned'];
const DEMO_APPROVAL_TTL_MS = 24 * 60 * 60 * 1000;
const UTC_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function demoPolicyTime(): Date {
  return new Date(DEMO_WORKSPACE.lastRefreshed);
}

function createDemoApproval(
  opportunity: Opportunity,
  playbook: Playbook,
  signals: Signal[],
): ApprovalRecord {
  const approvedOpportunity = { ...opportunity, stage: 'approved' as const };
  const decidedAt = DEMO_WORKSPACE.lastRefreshed;
  const expiresAt = new Date(demoPolicyTime().getTime() + DEMO_APPROVAL_TTL_MS).toISOString();
  const context = {
    opportunity: approvedOpportunity,
    playbook,
    signals,
    now: demoPolicyTime(),
  };

  return {
    id: `demo-approval-${opportunity.id}`,
    opportunityId: opportunity.id,
    playbookId: playbook.id,
    status: 'approved',
    approvedBy: 'Demo manager',
    decidedAt,
    expiresAt,
    contextFingerprint: createApprovalContextFingerprint(context),
    policyVersion: ACTIVATION_POLICY_VERSION,
  };
}

function formatDate(value: string): string {
  const date = new Date(value);
  return `${UTC_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function formatTime(value: string): string {
  const date = new Date(value);
  const hour = date.getUTCHours();
  const displayHour = hour % 12 || 12;
  const minute = String(date.getUTCMinutes()).padStart(2, '0');
  const period = hour >= 12 ? 'PM' : 'AM';
  return `${UTC_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${displayHour}:${minute} ${period} UTC`;
}

function stageLabel(stage: OpportunityStage): string {
  return {
    needs_review: 'Needs review',
    validated: 'Validated',
    approved: 'Approved',
    activated: 'CRM-ready',
    deferred: 'Deferred',
    rejected: 'Rejected',
  }[stage];
}

function stageClass(stage: OpportunityStage): string {
  return {
    needs_review: 'border-amber-700/20 bg-amber-50 text-amber-900',
    validated: 'border-brass/20 bg-brass/5 text-brass-hover',
    approved: 'border-success/20 bg-success/10 text-success',
    activated: 'border-success/20 bg-success/10 text-success',
    deferred: 'border-divider bg-recessed text-warm-gray',
    rejected: 'border-error/20 bg-error/5 text-error',
  }[stage];
}

function confidenceClass(value: number): string {
  if (value >= 0.75) return 'text-success';
  if (value >= 0.5) return 'text-brass';
  return 'text-amber-800';
}

function StatusPill({ stage }: { stage: OpportunityStage }) {
  return (
    <span
      className={cn(
        'metric inline-flex items-center border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em]',
        stageClass(stage),
      )}
    >
      {stageLabel(stage)}
    </span>
  );
}

function ConfidencePill({ value }: { value: number }) {
  const label =
    value >= 0.75 ? 'High confidence' : value >= 0.5 ? 'Medium confidence' : 'Low confidence';
  return (
    <span className={cn('metric text-[11px] font-medium', confidenceClass(value))}>
      {label} · {Math.round(value * 100)}%
    </span>
  );
}

function ScoreBar({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn('h-1.5 overflow-hidden rounded-full bg-divider/70', className)}
      aria-hidden="true"
    >
      <div
        className="h-full rounded-full bg-brass"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

function PanelTitle({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  return (
    <div>
      <p className="metric text-[10px] uppercase tracking-[0.14em] text-brass">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-semibold text-anthracite">{title}</h2>
      {detail ? <p className="mt-1 text-sm leading-relaxed text-warm-gray">{detail}</p> : null}
    </div>
  );
}

function OpportunityScore({
  opportunity,
  compact = false,
}: {
  opportunity: Opportunity;
  compact?: boolean;
}) {
  const calculated = calculateOpportunityPriority(opportunity.scoreInputs);
  const score = opportunity.scoreOverride?.value ?? calculated;
  const band = priorityBand(score);

  return (
    <div className={cn('border border-divider bg-warm-white', compact ? 'p-3' : 'p-4')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="metric text-[10px] uppercase tracking-[0.14em] text-warm-gray">Priority</p>
          <p
            className={cn(
              'metric mt-1 text-3xl tracking-[-0.04em]',
              band === 'High' ? 'text-brass' : 'text-anthracite',
            )}
          >
            {score}
            <span className="text-sm text-warm-gray">/100</span>
          </p>
        </div>
        <span className="metric border border-divider px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-warm-gray">
          {band}
        </span>
      </div>
      {!compact ? (
        <p className="mt-2 text-xs leading-relaxed text-warm-gray">
          Weighted, explainable commercial priority — not an autonomous decision.
        </p>
      ) : null}
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'metric border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] transition-colors',
        active
          ? 'border-brass bg-brass text-white'
          : 'border-divider bg-warm-white text-warm-gray hover:border-brass hover:text-brass',
      )}
    >
      {children}
    </button>
  );
}

export function RevenueCommandCenter() {
  const [activeView, setActiveView] = useState<View>('overview');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [approvals, setApprovals] = useState<Record<string, ApprovalRecord>>(() => {
    const demoApprovals = DEMO_OPPORTUNITIES.flatMap((opportunity) => {
      if (opportunity.stage !== 'approved') return [];
      const playbook = DEMO_PLAYBOOKS.find((item) => item.id === opportunity.playbookId);
      const signals = DEMO_SIGNALS.filter((signal) => opportunity.signalIds.includes(signal.id));
      return playbook
        ? [[opportunity.id, createDemoApproval(opportunity, playbook, signals)] as const]
        : [];
    });

    return Object.fromEntries(demoApprovals);
  });
  const [handoffPreviews, setHandoffPreviews] = useState<Record<string, PreparedDryRunHandoff>>({});
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(DEMO_OPPORTUNITIES[0].id);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState(DEMO_PLAYBOOKS[0].id);
  const [opportunityFilter, setOpportunityFilter] = useState<OpportunityFilter>('all');
  const [ownerDraft, setOwnerDraft] = useState(DEMO_OPPORTUNITIES[0].owner);
  const [scoreDraft, setScoreDraft] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [showScoreDetails, setShowScoreDetails] = useState(false);
  const [notice, setNotice] = useState('');
  const [growthFilters, setGrowthFilters] = useState({
    segment: 'All segments',
    territory: 'All territories',
    play: 'All plays',
    owner: 'All owners',
  });

  const selectedOpportunity = useMemo(
    () =>
      opportunities.find((opportunity) => opportunity.id === selectedOpportunityId) ??
      opportunities[0]!,
    [opportunities, selectedOpportunityId],
  );
  const selectedPlaybook = useMemo(
    () =>
      DEMO_PLAYBOOKS.find((playbook) => playbook.id === selectedPlaybookId) ?? DEMO_PLAYBOOKS[0],
    [selectedPlaybookId],
  );

  useEffect(() => {
    setOwnerDraft(selectedOpportunity.owner);
    setScoreDraft(
      String(
        selectedOpportunity.scoreOverride?.value ??
          calculateOpportunityPriority(selectedOpportunity.scoreInputs),
      ),
    );
    setOverrideReason('');
    setShowScoreDetails(false);
  }, [
    selectedOpportunity.owner,
    selectedOpportunity.scoreInputs,
    selectedOpportunity.scoreOverride?.value,
  ]);

  const selectedScore =
    selectedOpportunity.scoreOverride?.value ??
    calculateOpportunityPriority(selectedOpportunity.scoreInputs);
  const selectedSignals = DEMO_SIGNALS.filter((signal) =>
    selectedOpportunity.signalIds.includes(signal.id),
  );
  const selectedOpportunityPlaybook = useMemo(
    () =>
      DEMO_PLAYBOOKS.find((playbook) => playbook.id === selectedOpportunity.playbookId) ??
      DEMO_PLAYBOOKS[0],
    [selectedOpportunity.playbookId],
  );
  const selectedApproval = approvals[selectedOpportunity.id];
  const selectedHandoffPreview = handoffPreviews[selectedOpportunity.id];

  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (opportunityFilter === 'all') return true;
    if (opportunityFilter === 'review') {
      return opportunity.stage === 'needs_review' || opportunity.stage === 'validated';
    }
    return opportunity.stage === opportunityFilter;
  });

  const filteredGrowthOpportunities = opportunities.filter((opportunity) => {
    const playbook = DEMO_PLAYBOOKS.find((item) => item.id === opportunity.playbookId);
    return (
      (growthFilters.segment === 'All segments' || opportunity.segment === growthFilters.segment) &&
      (growthFilters.territory === 'All territories' ||
        opportunity.geography === growthFilters.territory) &&
      (growthFilters.play === 'All plays' || playbook?.shortName === growthFilters.play) &&
      (growthFilters.owner === 'All owners' || opportunity.owner === growthFilters.owner)
    );
  });
  const growthOpportunityIds = new Set(
    filteredGrowthOpportunities.map((opportunity) => opportunity.id),
  );
  const filteredOutcomes = DEMO_OUTCOMES.filter((outcome) =>
    growthOpportunityIds.has(outcome.opportunityId),
  );

  function updateOpportunity(id: string, updater: (opportunity: Opportunity) => Opportunity) {
    setOpportunities((current) =>
      current.map((opportunity) => (opportunity.id === id ? updater(opportunity) : opportunity)),
    );
  }

  function changeStage(stage: OpportunityStage, message: string) {
    updateOpportunity(selectedOpportunity.id, (opportunity) => ({ ...opportunity, stage }));
    setNotice(message);
  }

  function saveOwner() {
    updateOpportunity(selectedOpportunity.id, (opportunity) => ({
      ...opportunity,
      owner: ownerDraft,
      ownerRole: ownerDraft === 'Elena Torres' ? 'Customer success manager' : opportunity.ownerRole,
    }));
    setNotice(
      approvals[selectedOpportunity.id]
        ? `Owner updated locally to ${ownerDraft}. The frozen approval context changed, so a fresh approval is required before handoff.`
        : `Owner updated locally to ${ownerDraft}. No CRM assignment was changed.`,
    );
  }

  function saveOverride() {
    const value = Number(scoreDraft);
    if (!Number.isFinite(value) || value < 0 || value > 100 || !overrideReason.trim()) return;
    updateOpportunity(selectedOpportunity.id, (opportunity) => ({
      ...opportunity,
      scoreOverride: {
        value: Math.round(value),
        reason: overrideReason.trim(),
        by: 'Demo manager',
      },
    }));
    setNotice(
      approvals[selectedOpportunity.id]
        ? 'Priority override recorded locally with its rationale. The source score is preserved, and the changed approval context now requires re-approval.'
        : 'Priority override recorded locally with its rationale. It did not change the source score.',
    );
  }

  function resetOverride() {
    updateOpportunity(selectedOpportunity.id, (opportunity) => {
      const { scoreOverride: _scoreOverride, ...withoutOverride } = opportunity;
      return withoutOverride;
    });
    setNotice(
      approvals[selectedOpportunity.id]
        ? 'Priority override cleared. The transparent calculated score is active again, and the changed approval context now requires re-approval.'
        : 'Priority override cleared. The transparent calculated score is active again.',
    );
  }

  function openOpportunity(opportunity: Opportunity) {
    setSelectedOpportunityId(opportunity.id);
    setSelectedPlaybookId(opportunity.playbookId);
    setActiveView('overview');
  }

  function approveSelectedOpportunity() {
    const approvedOpportunity = { ...selectedOpportunity, stage: 'approved' as const };
    const approval = createDemoApproval(
      approvedOpportunity,
      selectedOpportunityPlaybook,
      selectedSignals,
    );

    setApprovals((current) => ({ ...current, [approvedOpportunity.id]: approval }));
    updateOpportunity(approvedOpportunity.id, () => approvedOpportunity);
    setNotice(
      `Play approval is frozen locally through ${formatTime(approval.expiresAt!)}. Any edit to the opportunity, play, or evidence requires re-approval; no external action has occurred.`,
    );
  }

  function prepareSelectedHandoff() {
    const result = prepareDryRunCrmHandoff({
      opportunity: selectedOpportunity,
      playbook: selectedOpportunityPlaybook,
      signals: selectedSignals,
      approval: selectedApproval,
      now: demoPolicyTime(),
    });

    if (result.status === 'blocked') {
      setNotice(
        `Handoff blocked locally: ${result.issues[0]?.message ?? 'Policy requirements are incomplete.'}`,
      );
      return;
    }

    setHandoffPreviews((current) => ({ ...current, [selectedOpportunity.id]: result }));
    updateOpportunity(selectedOpportunity.id, (opportunity) => ({
      ...opportunity,
      stage: 'activated',
    }));
    setNotice(
      `CRM-ready dry-run packet ${result.idempotencyKey} prepared locally. No CRM API was invoked and no customer was contacted.`,
    );
  }

  return (
    <div className="min-h-screen bg-parchment pt-16">
      <section className="border-b border-divider bg-warm-white">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="metric border border-brass/20 bg-brass/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-brass">
                  {DEMO_WORKSPACE.label}
                </span>
                <span className="metric text-[10px] uppercase tracking-[0.12em] text-anthracite">
                  {DEMO_WORKSPACE.name}
                </span>
                <span className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                  Snapshot · {formatDate(DEMO_WORKSPACE.lastRefreshed)}
                </span>
              </div>
              <h1 data-testid="revenue-ops-title" className="mt-4 text-display text-anthracite">
                Revenue decisions, <span className="display-accent">with evidence.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-body-lg text-warm-gray">
                A governed market-to-action workspace for focused industrial account plays. It turns
                a signal into a reviewable commercial decision — not an unranked alert stream.
              </p>
            </div>
            <div className="border-l-2 border-brass pl-4 xl:max-w-sm">
              <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
                Operating promise
              </p>
              <p className="mt-1 text-sm leading-relaxed text-anthracite">
                Sense → interpret → decide → approve → hand off → learn. Every external action stays
                human-controlled.
              </p>
            </div>
          </div>

          <div
            data-testid="demo-safety-notice"
            className="mt-7 flex items-start gap-3 border border-brass/20 bg-brass/[0.045] p-4 text-sm text-anthracite"
            role="note"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
            <p>
              <strong>Safe demonstration:</strong> {DEMO_WORKSPACE.note} Every company, signal,
              value, source, and outcome below is fictional and clearly marked as such.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-20 xl:h-fit" aria-label="Revenue OS sections">
            <div className="border border-divider bg-warm-white p-2">
              {VIEW_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      'flex w-full items-start gap-3 p-3 text-left transition-colors',
                      active
                        ? 'bg-brass text-white'
                        : 'text-warm-gray hover:bg-recessed hover:text-anthracite',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span
                        className={cn(
                          'mt-0.5 block text-xs leading-relaxed',
                          active ? 'text-white/80' : 'text-warm-gray',
                        )}
                      >
                        {item.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 border border-divider bg-recessed p-4">
              <p className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                Start in minutes
              </p>
              <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-warm-gray">
                {[
                  'Load an authorized source or safe fixture',
                  'Set ICP, territory, and account capabilities',
                  'Review the first high-confidence opportunities',
                  'Select a play, assign an owner, and approve',
                  'Measure the action with an agreed outcome record',
                ].map((step, index) => (
                  <li key={step} className="flex gap-2.5">
                    <span className="metric text-brass">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div>
            {notice ? (
              <div
                className={cn(
                  'mb-5 flex items-start justify-between gap-3 border px-4 py-3',
                  notice.startsWith('Handoff blocked')
                    ? 'border-error/25 bg-error/5'
                    : 'border-success/25 bg-success/10',
                )}
                role="status"
                aria-live="polite"
              >
                <div
                  className={cn(
                    'flex gap-2 text-sm',
                    notice.startsWith('Handoff blocked') ? 'text-error' : 'text-success',
                  )}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{notice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice('')}
                  className={cn(
                    'text-xs font-semibold underline underline-offset-2',
                    notice.startsWith('Handoff blocked') ? 'text-error' : 'text-success',
                  )}
                >
                  Dismiss
                </button>
              </div>
            ) : null}

            {activeView === 'overview' ? (
              <OpportunityDesk
                opportunities={filteredOpportunities}
                selectedOpportunity={selectedOpportunity}
                selectedSignals={selectedSignals}
                selectedScore={selectedScore}
                filter={opportunityFilter}
                onFilterChange={setOpportunityFilter}
                onSelect={openOpportunity}
                ownerDraft={ownerDraft}
                onOwnerChange={setOwnerDraft}
                onSaveOwner={saveOwner}
                showScoreDetails={showScoreDetails}
                onToggleScoreDetails={() => setShowScoreDetails((current) => !current)}
                scoreDraft={scoreDraft}
                onScoreDraftChange={setScoreDraft}
                overrideReason={overrideReason}
                onOverrideReasonChange={setOverrideReason}
                onSaveOverride={saveOverride}
                onResetOverride={resetOverride}
                onChangeStage={changeStage}
                playbook={selectedOpportunityPlaybook}
                approval={selectedApproval}
                handoffPreview={selectedHandoffPreview}
                onApprove={approveSelectedOpportunity}
                onPrepareHandoff={prepareSelectedHandoff}
              />
            ) : null}

            {activeView === 'market' ? <MarketMap onOpenOpportunity={openOpportunity} /> : null}
            {activeView === 'plays' ? (
              <PlaybookLibrary
                selectedPlaybook={selectedPlaybook}
                onSelect={setSelectedPlaybookId}
              />
            ) : null}
            {activeView === 'review' ? (
              <GrowthReview
                filters={growthFilters}
                onFilterChange={(key, value) =>
                  setGrowthFilters((current) => ({ ...current, [key]: value }))
                }
                opportunities={filteredGrowthOpportunities}
                outcomes={filteredOutcomes}
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

function OpportunityDesk({
  opportunities,
  selectedOpportunity,
  selectedSignals,
  selectedScore,
  filter,
  onFilterChange,
  onSelect,
  ownerDraft,
  onOwnerChange,
  onSaveOwner,
  showScoreDetails,
  onToggleScoreDetails,
  scoreDraft,
  onScoreDraftChange,
  overrideReason,
  onOverrideReasonChange,
  onSaveOverride,
  onResetOverride,
  onChangeStage,
  playbook,
  approval,
  handoffPreview,
  onApprove,
  onPrepareHandoff,
}: {
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity;
  selectedSignals: typeof DEMO_SIGNALS;
  selectedScore: number;
  filter: OpportunityFilter;
  onFilterChange: (filter: OpportunityFilter) => void;
  onSelect: (opportunity: Opportunity) => void;
  ownerDraft: string;
  onOwnerChange: (owner: string) => void;
  onSaveOwner: () => void;
  showScoreDetails: boolean;
  onToggleScoreDetails: () => void;
  scoreDraft: string;
  onScoreDraftChange: (value: string) => void;
  overrideReason: string;
  onOverrideReasonChange: (value: string) => void;
  onSaveOverride: () => void;
  onResetOverride: () => void;
  onChangeStage: (stage: OpportunityStage, message: string) => void;
  playbook: Playbook;
  approval?: ApprovalRecord;
  handoffPreview?: PreparedDryRunHandoff;
  onApprove: () => void;
  onPrepareHandoff: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <PanelTitle
          eyebrow="01 · Decide"
          title="Opportunity desk"
          detail="A deduplicated, accountable queue. Select a record to inspect evidence, assumptions, score, play, owner, SLA, and approval status."
        />
        <fieldset className="flex flex-wrap gap-1.5">
          <legend className="sr-only">Opportunity filters</legend>
          <FilterButton active={filter === 'all'} onClick={() => onFilterChange('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'review'} onClick={() => onFilterChange('review')}>
            Review
          </FilterButton>
          <FilterButton active={filter === 'approved'} onClick={() => onFilterChange('approved')}>
            Approved
          </FilterButton>
          <FilterButton active={filter === 'activated'} onClick={() => onFilterChange('activated')}>
            CRM-ready
          </FilterButton>
        </fieldset>
      </div>

      <div className="grid gap-5 2xl:grid-cols-[minmax(290px,0.78fr)_minmax(0,1.35fr)]">
        <section
          className="border border-divider bg-warm-white"
          aria-labelledby="opportunity-queue-title"
        >
          <div className="flex items-center justify-between border-b border-divider px-4 py-3">
            <div>
              <h2 id="opportunity-queue-title" className="text-sm font-semibold text-anthracite">
                Priority queue
              </h2>
              <p className="mt-0.5 text-xs text-warm-gray">
                {opportunities.length} explainable{' '}
                {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
              </p>
            </div>
            <Target className="h-4 w-4 text-brass" aria-hidden="true" />
          </div>
          <div className="divide-y divide-divider">
            {opportunities.map((opportunity) => {
              const selected = opportunity.id === selectedOpportunity.id;
              const score =
                opportunity.scoreOverride?.value ??
                calculateOpportunityPriority(opportunity.scoreInputs);
              return (
                <button
                  key={opportunity.id}
                  data-testid={`opportunity-${opportunity.id}`}
                  type="button"
                  onClick={() => onSelect(opportunity)}
                  className={cn(
                    'w-full p-4 text-left transition-colors',
                    selected ? 'bg-brass/[0.055]' : 'hover:bg-recessed/70',
                  )}
                  aria-pressed={selected}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug text-anthracite">
                        {opportunity.title}
                      </p>
                      <p className="mt-1 text-xs text-warm-gray">
                        {opportunity.segment} · {opportunity.geography}
                      </p>
                    </div>
                    <span className="metric shrink-0 text-lg tracking-[-0.04em] text-brass">
                      {score}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusPill stage={opportunity.stage} />
                    <span className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                      {opportunity.owner}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-warm-gray">
                    {opportunity.nextAction}
                  </p>
                </button>
              );
            })}
            {opportunities.length === 0 ? (
              <div className="p-6 text-sm text-warm-gray">
                No opportunities match this local filter. Switch to “All” to inspect the full
                synthetic fixture.
              </div>
            ) : null}
          </div>
        </section>

        <OpportunityWorkspace
          opportunity={selectedOpportunity}
          score={selectedScore}
          signals={selectedSignals}
          playbook={playbook}
          ownerDraft={ownerDraft}
          onOwnerChange={onOwnerChange}
          onSaveOwner={onSaveOwner}
          showScoreDetails={showScoreDetails}
          onToggleScoreDetails={onToggleScoreDetails}
          scoreDraft={scoreDraft}
          onScoreDraftChange={onScoreDraftChange}
          overrideReason={overrideReason}
          onOverrideReasonChange={onOverrideReasonChange}
          onSaveOverride={onSaveOverride}
          onResetOverride={onResetOverride}
          onChangeStage={onChangeStage}
          approval={approval}
          handoffPreview={handoffPreview}
          onApprove={onApprove}
          onPrepareHandoff={onPrepareHandoff}
        />
      </div>

      <SignalLedger />
    </div>
  );
}

function OpportunityWorkspace({
  opportunity,
  score,
  signals,
  playbook,
  ownerDraft,
  onOwnerChange,
  onSaveOwner,
  showScoreDetails,
  onToggleScoreDetails,
  scoreDraft,
  onScoreDraftChange,
  overrideReason,
  onOverrideReasonChange,
  onSaveOverride,
  onResetOverride,
  onChangeStage,
  approval,
  handoffPreview,
  onApprove,
  onPrepareHandoff,
}: {
  opportunity: Opportunity;
  score: number;
  signals: typeof DEMO_SIGNALS;
  playbook: Playbook;
  ownerDraft: string;
  onOwnerChange: (owner: string) => void;
  onSaveOwner: () => void;
  showScoreDetails: boolean;
  onToggleScoreDetails: () => void;
  scoreDraft: string;
  onScoreDraftChange: (value: string) => void;
  overrideReason: string;
  onOverrideReasonChange: (value: string) => void;
  onSaveOverride: () => void;
  onResetOverride: () => void;
  onChangeStage: (stage: OpportunityStage, message: string) => void;
  approval?: ApprovalRecord;
  handoffPreview?: PreparedDryRunHandoff;
  onApprove: () => void;
  onPrepareHandoff: () => void;
}) {
  const scoreWithoutOverride = calculateOpportunityPriority(opportunity.scoreInputs);
  const canApprove = opportunity.stage === 'validated';
  const canPrepareHandoff = opportunity.stage === 'approved';

  return (
    <section
      className="border border-divider bg-warm-white"
      aria-labelledby="opportunity-workspace-title"
    >
      <div className="border-b border-divider p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill stage={opportunity.stage} />
              <span className="metric text-[10px] uppercase tracking-[0.11em] text-warm-gray">
                Synthetic demonstration record
              </span>
            </div>
            <h2 id="opportunity-workspace-title" className="mt-3 text-h3 text-anthracite">
              {opportunity.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-warm-gray">
              {opportunity.whyNow}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:min-w-[280px]">
            <OpportunityScore opportunity={opportunity} compact />
            <div className="border border-divider bg-recessed p-3">
              <p className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                Value range
              </p>
              <p className="metric mt-1 text-base tracking-[-0.03em] text-anthracite">
                {formatCurrencyRange(opportunity.expectedValue.low, opportunity.expectedValue.high)}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-warm-gray">
                {opportunity.expectedValue.basis}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-b border-divider lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.75fr)]">
        <div className="border-b border-divider p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Why this might matter
          </p>
          <dl className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                Buying hypothesis
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-anthracite">
                {opportunity.buyingHypothesis}
              </dd>
            </div>
            <div>
              <dt className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                Recommended motion
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-anthracite">
                {opportunity.recommendedMotion}
              </dd>
            </div>
            <div>
              <dt className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                Account context
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-anthracite">
                {opportunity.relationshipState}
              </dd>
            </div>
            <div>
              <dt className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                Current CRM state
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-anthracite">
                {opportunity.crmState}
              </dd>
            </div>
          </dl>

          <div className="mt-5 border-l-2 border-brass bg-brass/[0.035] px-4 py-3">
            <p className="metric text-[10px] uppercase tracking-[0.12em] text-brass">
              Next best action
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-anthracite">
              {opportunity.nextAction}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Ownership &amp; SLA
          </p>
          <label
            htmlFor="opportunity-owner"
            className="mt-3 block text-xs font-semibold text-anthracite"
          >
            Accountable owner
          </label>
          <select
            id="opportunity-owner"
            value={ownerDraft}
            onChange={(event) => onOwnerChange(event.target.value)}
            className="mt-1 h-10 w-full border border-divider bg-warm-white px-3 text-sm text-anthracite"
          >
            {OWNER_OPTIONS.map((owner) => (
              <option key={owner}>{owner}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={onSaveOwner}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brass hover:text-brass-hover"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" /> Save local assignment
          </button>
          <div className="mt-4 border-t border-divider pt-4">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">SLA</p>
            <p className="mt-1 text-sm text-anthracite">{opportunity.sla}</p>
          </div>
          <div className="mt-4 border-t border-divider pt-4">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Play guardrail
            </p>
            <p className="mt-1 text-xs leading-relaxed text-warm-gray">{playbook.guardrail}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-b border-divider lg:grid-cols-2">
        <div className="border-b border-divider p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
                Evidence &amp; freshness
              </p>
              <p className="mt-1 text-xs text-warm-gray">
                Every claim must retain its source, timestamp, confidence, and limitations.
              </p>
            </div>
            <span className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              {signals.length} linked
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {signals.map((signal) => {
              const stale = isSignalStale(signal.decayAt, demoPolicyTime());
              return (
                <article key={signal.id} className="border border-divider bg-recessed/50 p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-anthracite">{signal.title}</p>
                      <p className="mt-0.5 text-xs text-warm-gray">
                        {signal.type} · observed {formatTime(signal.observedAt)}
                      </p>
                    </div>
                    <ConfidencePill value={signal.confidence} />
                  </div>
                  <p
                    className={cn(
                      'mt-2 metric text-[10px] uppercase tracking-[0.1em]',
                      stale ? 'text-error' : 'text-success',
                    )}
                  >
                    {stale
                      ? 'Stale — activation blocked'
                      : `Fresh through ${formatDate(signal.decayAt)}`}
                  </p>
                  {signal.evidence.map((evidence) => (
                    <div key={evidence.id} className="mt-2 border-l border-brass/40 pl-3">
                      {evidence.url ? (
                        <a
                          href={evidence.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brass underline underline-offset-2"
                        >
                          {evidence.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <p className="text-xs font-semibold text-anthracite">{evidence.label}</p>
                      )}
                      <p className="mt-0.5 text-xs leading-relaxed text-warm-gray">
                        {evidence.detail}
                      </p>
                    </div>
                  ))}
                  <p className="mt-2 text-xs leading-relaxed text-warm-gray">
                    <strong className="text-anthracite">Limits:</strong>{' '}
                    {signal.limitations.join(' ')}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <button
            type="button"
            onClick={onToggleScoreDetails}
            aria-expanded={showScoreDetails}
            className="flex w-full items-start justify-between gap-3 text-left"
          >
            <span>
              <span className="metric block text-[10px] uppercase tracking-[0.13em] text-brass">
                Transparent scoring
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-warm-gray">
                Why this ranks {score}/100, where uncertainty sits, and how a manager can challenge
                it.
              </span>
            </span>
            <span className="metric text-xs font-semibold text-brass">
              {showScoreDetails ? 'Hide' : 'Inspect'}
            </span>
          </button>

          {showScoreDetails ? (
            <div className="mt-4 space-y-3">
              {(Object.entries(PRIORITY_LABELS) as Array<[OpportunityScoreKey, string]>).map(
                ([key, label]) => {
                  const value = opportunity.scoreInputs[key];
                  const weight = DEFAULT_PRIORITY_WEIGHTS[key];
                  return (
                    <div key={key}>
                      <div className="flex justify-between gap-3 text-xs">
                        <span className="text-anthracite">{label}</span>
                        <span className="metric text-warm-gray">
                          {Math.round(value * 100)}% × {Math.round(weight * 100)}%
                        </span>
                      </div>
                      <ScoreBar value={value} className="mt-1.5" />
                    </div>
                  );
                },
              )}
              <div className="border-t border-divider pt-3 text-xs leading-relaxed text-warm-gray">
                <p>
                  <strong className="text-anthracite">Formula:</strong> weighted geometric mean. A
                  weak constraint (for example, access or evidence) meaningfully lowers the priority
                  instead of being hidden by a high value estimate.
                </p>
                <p className="mt-2">
                  <strong className="text-anthracite">Version:</strong> Demo scoring v1.0. Weights
                  are visible here; live changes should require a versioned policy approval.
                </p>
              </div>

              <div className="border border-divider bg-recessed p-3">
                <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  Manager override
                </p>
                <p className="mt-1 text-xs leading-relaxed text-warm-gray">
                  Use only with a reason. The calculated score ({scoreWithoutOverride}) remains
                  visible in the audit record.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-[92px_1fr]">
                  <label className="text-xs font-semibold text-anthracite">
                    Score
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scoreDraft}
                      onChange={(event) => onScoreDraftChange(event.target.value)}
                      className="mt-1 h-9 w-full border border-divider bg-warm-white px-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-anthracite">
                    Rationale
                    <input
                      value={overrideReason}
                      onChange={(event) => onOverrideReasonChange(event.target.value)}
                      placeholder="e.g. named sponsor verified"
                      className="mt-1 h-9 w-full border border-divider bg-warm-white px-2 text-sm placeholder:text-stone"
                    />
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onSaveOverride}
                    disabled={!overrideReason.trim() || !scoreDraft}
                    className="text-xs font-semibold text-brass enabled:hover:text-brass-hover disabled:cursor-not-allowed disabled:text-stone"
                  >
                    Save reasoned override
                  </button>
                  {opportunity.scoreOverride ? (
                    <button
                      type="button"
                      onClick={onResetOverride}
                      className="text-xs font-semibold text-warm-gray underline underline-offset-2 hover:text-anthracite"
                    >
                      Restore calculated score
                    </button>
                  ) : null}
                </div>
                {opportunity.scoreOverride ? (
                  <p className="mt-2 text-xs leading-relaxed text-warm-gray">
                    Override by {opportunity.scoreOverride.by}: “{opportunity.scoreOverride.reason}”
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div className="border-b border-divider p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Recommended play · {playbook.shortName}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-anthracite">{playbook.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-warm-gray">{playbook.valueProposition}</p>
          <div className="mt-4 space-y-3">
            {playbook.steps.map((step, index) => (
              <div key={step.id} className="flex gap-3">
                <span className="metric flex h-6 w-6 shrink-0 items-center justify-center border border-brass/20 bg-brass/5 text-[10px] text-brass">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-anthracite">{step.title}</p>
                  <p className="mt-0.5 text-xs text-warm-gray">
                    {step.ownerRole} · {step.channel} · {step.timing}
                    {step.approvalRequired ? ' · human approval required' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Human approval gate
          </p>
          <p className="mt-2 text-sm leading-relaxed text-warm-gray">
            This local fixture models the sequence. It cannot send a message or create, alter, or
            sync a CRM record.
          </p>
          <div className="mt-4 border border-divider bg-recessed p-3">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Frozen approval record
            </p>
            {approval ? (
              <p className="mt-1 text-xs leading-relaxed text-anthracite">
                {approval.approvedBy} approved the current opportunity, play, and evidence context
                through{' '}
                {approval.expiresAt ? formatTime(approval.expiresAt) : 'an invalid expiry date'}.{' '}
                Edits invalidate this local approval packet.
              </p>
            ) : (
              <p className="mt-1 text-xs leading-relaxed text-warm-gray">
                No frozen approval record exists yet. A CRM-ready packet cannot be prepared until a
                manager approves the exact reviewed context.
              </p>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {opportunity.stage === 'needs_review' ? (
              <button
                type="button"
                onClick={() =>
                  onChangeStage(
                    'validated',
                    'Opportunity validated locally. Manager approval is now required before any CRM-ready handoff.',
                  )
                }
                className="flex w-full items-center justify-between border border-brass bg-brass px-4 py-3 text-left text-sm font-semibold text-white hover:bg-brass-hover"
              >
                Validate opportunity <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
            {opportunity.stage === 'validated' ? (
              <button
                data-testid="approve-opportunity"
                type="button"
                onClick={onApprove}
                className="flex w-full items-center justify-between border border-brass bg-brass px-4 py-3 text-left text-sm font-semibold text-white hover:bg-brass-hover"
              >
                Approve play &amp; handoff <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
            {canPrepareHandoff ? (
              <button
                data-testid="prepare-crm-handoff"
                type="button"
                onClick={onPrepareHandoff}
                className="flex w-full items-center justify-between border border-brass bg-brass px-4 py-3 text-left text-sm font-semibold text-white hover:bg-brass-hover"
              >
                Prepare CRM-ready handoff <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
            {opportunity.stage === 'activated' ? (
              <div className="border border-success/30 bg-success/10 p-3 text-sm text-success">
                <p>
                  Handoff packet is ready for a future approved adapter. The system still has not
                  performed an external mutation.
                </p>
                {handoffPreview ? (
                  <p className="mt-1 text-xs leading-relaxed">
                    Local idempotency key: {handoffPreview.idempotencyKey} · destination:{' '}
                    {handoffPreview.destination.replaceAll('_', ' ')}
                  </p>
                ) : null}
              </div>
            ) : null}
            {!canApprove &&
            !canPrepareHandoff &&
            opportunity.stage !== 'needs_review' &&
            opportunity.stage !== 'activated' ? (
              <div className="border border-divider bg-recessed p-3 text-xs leading-relaxed text-warm-gray">
                This workflow is paused because its stage does not meet the current approval policy.
              </div>
            ) : null}
          </div>
          <ul className="mt-4 space-y-2 border-t border-divider pt-4 text-xs leading-relaxed text-warm-gray">
            {opportunity.exclusions.map((exclusion) => (
              <li key={exclusion}>• {exclusion}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SignalLedger() {
  const activeSignals = DEMO_SIGNALS.filter((signal) => signal.reviewStatus !== 'dismissed');
  return (
    <section
      className="border border-divider bg-warm-white p-5 sm:p-6"
      aria-labelledby="signal-ledger-title"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <PanelTitle
          eyebrow="Signal quality control"
          title="Signal ledger"
          detail="The workspace groups duplicate evidence, preserves source freshness, and suppresses stale records before they turn into seller work."
        />
        <p className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
          {activeSignals.length} active · 1 stale suppressed
        </p>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {DEMO_SIGNALS.map((signal) => {
          const stale = isSignalStale(signal.decayAt, demoPolicyTime());
          const isGrouped = signal.reviewStatus === 'grouped';
          return (
            <article
              key={signal.id}
              className={cn(
                'border p-4',
                stale ? 'border-divider bg-recessed' : 'border-divider bg-warm-white',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-anthracite">{signal.title}</p>
                  <p className="mt-1 text-xs text-warm-gray">
                    {signal.affectedEntity} · {signal.source}
                  </p>
                </div>
                <span
                  className={cn(
                    'metric text-[10px] uppercase tracking-[0.1em]',
                    stale ? 'text-error' : isGrouped ? 'text-brass' : 'text-success',
                  )}
                >
                  {stale
                    ? 'Suppressed'
                    : isGrouped
                      ? 'Grouped'
                      : signal.reviewStatus.replace('_', ' ')}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 border-t border-divider pt-3 text-xs">
                <div>
                  <span className="metric block text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                    Observed
                  </span>
                  <span className="mt-1 block text-anthracite">
                    {formatDate(signal.observedAt)}
                  </span>
                </div>
                <div>
                  <span className="metric block text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                    Freshness
                  </span>
                  <span className={cn('mt-1 block', stale ? 'text-error' : 'text-success')}>
                    {stale ? 'Expired' : `to ${formatDate(signal.decayAt)}`}
                  </span>
                </div>
                <div>
                  <span className="metric block text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                    Confidence
                  </span>
                  <span className="mt-1 block text-anthracite">
                    {Math.round(signal.confidence * 100)}%
                  </span>
                </div>
              </div>
              {signal.groupLabel ? (
                <p className="mt-3 text-xs text-warm-gray">
                  Group: <span className="font-medium text-anthracite">{signal.groupLabel}</span>
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MarketMap({
  onOpenOpportunity,
}: {
  onOpenOpportunity: (opportunity: Opportunity) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PanelTitle
          eyebrow="02 · Fund"
          title="Market Opportunity Command Center"
          detail="A leader’s view of where to focus: market hypotheses, reachable whitespace, account-cluster coverage, and initiative decisions — all clearly marked as synthetic assumptions in this fixture."
        />
        <div className="border-l-2 border-brass pl-3 text-sm text-warm-gray">
          Use it to choose what to fund, test, stop, or reassign — not to admire a TAM chart.
        </div>
      </div>

      <section className="border border-divider bg-warm-white" aria-labelledby="market-map-title">
        <div className="flex items-center justify-between border-b border-divider p-5 sm:px-6">
          <div>
            <h2 id="market-map-title" className="text-lg font-semibold text-anthracite">
              Market map &amp; whitespace
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-warm-gray">
              Account-universe, penetration, attractiveness, and access values are synthetic for
              safe workflow review.
            </p>
          </div>
          <Globe className="h-5 w-5 text-brass" aria-hidden="true" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full text-left">
            <thead className="border-b border-divider bg-recessed text-[10px] uppercase tracking-[0.11em] text-warm-gray">
              <tr>
                <th className="px-5 py-3 font-medium">Market / geography</th>
                <th className="px-4 py-3 font-medium">Universe / coverage</th>
                <th className="px-4 py-3 font-medium">Penetration</th>
                <th className="px-4 py-3 font-medium">Attractiveness</th>
                <th className="px-4 py-3 font-medium">Access</th>
                <th className="px-4 py-3 font-medium">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {DEMO_MARKETS.map((market) => (
                <tr key={market.id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-anthracite">{market.name}</p>
                    <p className="mt-1 max-w-sm text-xs leading-relaxed text-warm-gray">
                      {market.growthHypothesis}
                    </p>
                    <p className="mt-2 text-[11px] text-warm-gray">
                      <span className="font-semibold text-anthracite">Evidence:</span>{' '}
                      {market.evidence}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-anthracite">
                    <span className="metric">{market.accountUniverse}</span> /{' '}
                    <span className="metric">{market.coveredAccounts}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="metric text-sm text-anthracite">
                      {Math.round(market.customerPenetration * 100)}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="metric text-sm text-anthracite">{market.attractiveness}</span>
                    <ScoreBar value={market.attractiveness / 100} className="mt-1.5 w-24" />
                  </td>
                  <td className="px-4 py-4">
                    <span className="metric text-sm text-anthracite">{market.access}</span>
                    <ScoreBar value={market.access / 100} className="mt-1.5 w-24" />
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        'metric border px-2 py-1 text-[10px] uppercase tracking-[0.1em]',
                        market.status === 'fund'
                          ? 'border-success/20 bg-success/10 text-success'
                          : market.status === 'test'
                            ? 'border-brass/20 bg-brass/5 text-brass'
                            : 'border-divider bg-recessed text-warm-gray',
                      )}
                    >
                      {market.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div className="border border-divider bg-warm-white p-5 sm:p-6">
          <PanelTitle
            eyebrow="Initiative portfolio"
            title="Fund the focused agenda"
            detail="Each initiative remains traceable to a market insight, confidence level, accountable owner, and a decision or dependency."
          />
          <div className="mt-5 space-y-3">
            {DEMO_INITIATIVES.map((initiative) => (
              <article key={initiative.id} className="border border-divider p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-anthracite">{initiative.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-warm-gray">
                      {initiative.marketInsight}
                    </p>
                  </div>
                  <span className="metric shrink-0 border border-divider bg-recessed px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                    {initiative.stage}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-divider pt-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="metric text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                      Impact
                    </dt>
                    <dd className="mt-1 text-anthracite">{initiative.expectedImpact}</dd>
                  </div>
                  <div>
                    <dt className="metric text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                      Readiness
                    </dt>
                    <dd className="mt-1 text-anthracite">{initiative.readiness}</dd>
                  </div>
                  <div>
                    <dt className="metric text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                      Owner
                    </dt>
                    <dd className="mt-1 text-anthracite">{initiative.owner}</dd>
                  </div>
                  <div>
                    <dt className="metric text-[9px] uppercase tracking-[0.1em] text-warm-gray">
                      Confidence
                    </dt>
                    <dd className="mt-1 capitalize text-anthracite">{initiative.confidence}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-warm-gray">
                  <span className="font-semibold text-anthracite">Decision / dependency:</span>{' '}
                  {initiative.dependency}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="border border-divider bg-recessed p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            From market to account
          </p>
          <h2 className="mt-1 text-xl font-semibold text-anthracite">The chain stays intact.</h2>
          <ol className="mt-5 space-y-3">
            {[
              ['Market thesis', 'A focused, evidence-rated investment hypothesis'],
              ['Account cluster', 'Named coverage and reachable whitespace'],
              ['Opportunity', 'Deduplicated signal plus commercial context'],
              ['Play run', 'Owner, SLA, approval, and stop conditions'],
              ['Outcome', 'Observed result with an attribution caveat'],
            ].map(([label, detail], index) => (
              <li key={label} className="flex gap-3">
                <span className="metric flex h-6 w-6 shrink-0 items-center justify-center bg-brass text-[10px] text-white">
                  {index + 1}
                </span>
                <span>
                  <strong className="block text-sm text-anthracite">{label}</strong>
                  <span className="block text-xs leading-relaxed text-warm-gray">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => onOpenOpportunity(DEMO_OPPORTUNITIES[0])}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-brass-hover"
          >
            Inspect the linked opportunity <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function PlaybookLibrary({
  selectedPlaybook,
  onSelect,
}: {
  selectedPlaybook: Playbook;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <PanelTitle
        eyebrow="03 · Activate"
        title="Reusable playbook library"
        detail="Playbooks provide eligibility, research requirements, ownership, approval, stop conditions, CRM mapping, and measures — rather than hiding execution logic in an alert."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {DEMO_PLAYBOOKS.map((playbook) => {
          const selected = playbook.id === selectedPlaybook.id;
          return (
            <button
              key={playbook.id}
              type="button"
              onClick={() => onSelect(playbook.id)}
              className={cn(
                'border p-5 text-left transition-colors',
                selected
                  ? 'border-brass bg-brass/[0.04]'
                  : 'border-divider bg-warm-white hover:border-brass/50',
              )}
              aria-pressed={selected}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="metric text-[10px] uppercase tracking-[0.12em] text-brass">
                  {playbook.shortName}
                </span>
                {selected ? (
                  <CheckCircle2 className="h-4 w-4 text-brass" aria-label="Selected" />
                ) : null}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-anthracite">{playbook.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">{playbook.trigger}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                <span className="border border-divider px-2 py-1">{playbook.owner}</span>
                <span className="border border-divider px-2 py-1">
                  {playbook.steps.length} steps
                </span>
                <span className="border border-divider px-2 py-1">Approval gate</span>
              </div>
            </button>
          );
        })}
      </div>

      <section
        className="border border-divider bg-warm-white"
        aria-labelledby="playbook-detail-title"
      >
        <div className="border-b border-divider p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Selected playbook
          </p>
          <h2 id="playbook-detail-title" className="mt-1 text-h3 text-anthracite">
            {selectedPlaybook.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-warm-gray">
            {selectedPlaybook.valueProposition}
          </p>
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="border-b border-divider p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Eligibility
            </p>
            <p className="mt-2 text-sm leading-relaxed text-anthracite">
              {selectedPlaybook.eligibleWhen}
            </p>
            <p className="mt-5 metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Research required
            </p>
            <p className="mt-2 text-sm leading-relaxed text-anthracite">
              {selectedPlaybook.researchRequired}
            </p>
          </div>
          <div className="border-b border-divider p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Owner &amp; SLA
            </p>
            <p className="mt-2 text-sm text-anthracite">{selectedPlaybook.owner}</p>
            <p className="mt-1 text-sm leading-relaxed text-warm-gray">{selectedPlaybook.sla}</p>
            <p className="mt-5 metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Success criteria
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-anthracite">
              {selectedPlaybook.successCriteria.map((criteria) => (
                <li key={criteria}>• {criteria}</li>
              ))}
            </ul>
          </div>
          <div className="p-5 sm:p-6">
            <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
              Stop conditions
            </p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-anthracite">
              {selectedPlaybook.stopConditions.map((condition) => (
                <li key={condition}>• {condition}</li>
              ))}
            </ul>
            <div className="mt-5 border-l-2 border-brass bg-brass/[0.04] px-3 py-2">
              <p className="text-xs leading-relaxed text-warm-gray">{selectedPlaybook.guardrail}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-divider p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
            Sequence of accountable work
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {selectedPlaybook.steps.map((step, index) => (
              <article key={step.id} className="border border-divider bg-recessed/50 p-3">
                <span className="metric text-[10px] text-brass">0{index + 1}</span>
                <p className="mt-2 text-sm font-semibold text-anthracite">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-warm-gray">
                  {step.ownerRole} · {step.channel}
                </p>
                <p className="mt-2 metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  {step.timing}
                  {step.approvalRequired ? ' · approval' : ''}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GrowthReview({
  filters,
  onFilterChange,
  opportunities,
  outcomes,
}: {
  filters: { segment: string; territory: string; play: string; owner: string };
  onFilterChange: (key: 'segment' | 'territory' | 'play' | 'owner', value: string) => void;
  opportunities: Opportunity[];
  outcomes: typeof DEMO_OUTCOMES;
}) {
  const validated = opportunities.filter(
    (opportunity) => opportunity.stage !== 'needs_review',
  ).length;
  const approved = opportunities.filter(
    (opportunity) => opportunity.stage === 'approved' || opportunity.stage === 'activated',
  ).length;
  const activated = opportunities.filter((opportunity) => opportunity.stage === 'activated').length;
  const funnel = [
    { label: 'Found', value: opportunities.length },
    { label: 'Validated', value: validated },
    { label: 'Approved', value: approved },
    { label: 'CRM-ready', value: activated },
    { label: 'Observed outcome', value: outcomes.length },
  ];

  const playOptions = ['All plays', ...DEMO_PLAYBOOKS.map((playbook) => playbook.shortName)];
  const segmentOptions = [
    'All segments',
    ...Array.from(new Set(DEMO_OPPORTUNITIES.map((opportunity) => opportunity.segment))),
  ];
  const territoryOptions = [
    'All territories',
    ...Array.from(new Set(DEMO_OPPORTUNITIES.map((opportunity) => opportunity.geography))),
  ];
  const ownerOptions = ['All owners', ...OWNER_OPTIONS.filter((owner) => owner !== 'Unassigned')];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PanelTitle
          eyebrow="04 · Learn"
          title="Weekly growth review"
          detail="Review the operating chain — found, validated, approved, action-ready, and observed outcome — then decide what to scale, stop, test, or reassign."
        />
        <p className="max-w-sm border-l-2 border-brass pl-3 text-sm leading-relaxed text-warm-gray">
          These fixture results illustrate the measurement design only. They do not represent
          pipeline, revenue, or causal impact.
        </p>
      </div>

      <section
        className="border border-divider bg-warm-white p-5 sm:p-6"
        aria-labelledby="growth-filter-title"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="growth-filter-title" className="text-lg font-semibold text-anthracite">
              Scope the review
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-warm-gray">
              Filters change the local demo funnel and learning records; source data remains
              synthetic.
            </p>
          </div>
          <span className="metric text-[10px] uppercase tracking-[0.12em] text-warm-gray">
            {opportunities.length} opportunities in view
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Segment"
            value={filters.segment}
            options={segmentOptions}
            onChange={(value) => onFilterChange('segment', value)}
          />
          <FilterSelect
            label="Territory"
            value={filters.territory}
            options={territoryOptions}
            onChange={(value) => onFilterChange('territory', value)}
          />
          <FilterSelect
            label="Play"
            value={filters.play}
            options={playOptions}
            onChange={(value) => onFilterChange('play', value)}
          />
          <FilterSelect
            label="Owner"
            value={filters.owner}
            options={ownerOptions}
            onChange={(value) => onFilterChange('owner', value)}
          />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {DEMO_GROWTH_METRICS.map((metric) => (
          <article key={metric.label} className="border border-divider bg-warm-white p-4">
            <p className="metric text-[10px] uppercase tracking-[0.11em] text-warm-gray">
              {metric.label}
            </p>
            <p
              className={cn(
                'metric mt-2 text-2xl tracking-[-0.04em]',
                metric.tone === 'positive'
                  ? 'text-success'
                  : metric.tone === 'attention'
                    ? 'text-amber-800'
                    : 'text-anthracite',
              )}
            >
              {metric.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-warm-gray">{metric.detail}</p>
            <p className="mt-3 metric text-[10px] uppercase tracking-[0.1em] text-brass">
              {metric.trend}
            </p>
          </article>
        ))}
      </section>

      <section className="border border-divider bg-warm-white" aria-labelledby="funnel-title">
        <div className="flex items-center justify-between border-b border-divider p-5 sm:px-6">
          <div>
            <h2 id="funnel-title" className="text-lg font-semibold text-anthracite">
              Governed operating funnel
            </h2>
            <p className="mt-1 text-xs text-warm-gray">
              Counts reconcile against the filtered synthetic opportunity records; no commercial
              outcome is implied.
            </p>
          </div>
          <BarChart3 className="h-5 w-5 text-brass" aria-hidden="true" />
        </div>
        <div className="grid divide-y divide-divider md:grid-cols-5 md:divide-x md:divide-y-0">
          {funnel.map((item, index) => (
            <div key={item.label} className="p-4 sm:p-5">
              <p className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                {index + 1}. {item.label}
              </p>
              <p className="metric mt-2 text-3xl tracking-[-0.04em] text-anthracite">
                {item.value}
              </p>
              <ScoreBar
                value={opportunities.length ? item.value / opportunities.length : 0}
                className="mt-3"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <div className="border border-divider bg-warm-white p-5 sm:p-6">
          <PanelTitle
            eyebrow="Learning record"
            title="What the fixture says to change"
            detail="Outcomes include a reason, timing, play version, and explicit attribution caveat. Production needs linked CRM events and a valid measurement design."
          />
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[670px] w-full text-left text-sm">
              <thead className="border-b border-divider text-[10px] uppercase tracking-[0.11em] text-warm-gray">
                <tr>
                  <th className="pb-3 pr-4 font-medium">Opportunity</th>
                  <th className="pb-3 pr-4 font-medium">Outcome</th>
                  <th className="pb-3 pr-4 font-medium">Response</th>
                  <th className="pb-3 font-medium">Reason / caveat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {outcomes.map((outcome) => {
                  const opportunity = DEMO_OPPORTUNITIES.find(
                    (item) => item.id === outcome.opportunityId,
                  );
                  return (
                    <tr key={outcome.id} className="align-top">
                      <td className="py-3 pr-4 font-medium text-anthracite">
                        {opportunity?.account ?? 'Unknown'}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="metric border border-divider bg-recessed px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-anthracite">
                          {outcome.outcome}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-warm-gray">
                        {outcome.responseHours === null ? '—' : `${outcome.responseHours}h`}
                      </td>
                      <td className="py-3 text-xs leading-relaxed text-warm-gray">
                        <span className="block text-anthracite">{outcome.reason}</span>
                        <span className="mt-1 block">{outcome.attributionNote}</span>
                      </td>
                    </tr>
                  );
                })}
                {outcomes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-sm text-warm-gray">
                      No synthetic outcomes match this filter combination.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border border-divider bg-recessed p-5 sm:p-6">
          <p className="metric text-[10px] uppercase tracking-[0.13em] text-brass">
            Weekly decision agenda
          </p>
          <h2 className="mt-1 text-xl font-semibold text-anthracite">
            Scale, improve, stop, test.
          </h2>
          <ul className="mt-5 space-y-4">
            {DEMO_GROWTH_RECOMMENDATIONS.map((recommendation, index) => (
              <li key={recommendation} className="flex gap-3">
                <span className="metric flex h-6 w-6 shrink-0 items-center justify-center border border-brass/20 bg-warm-white text-[10px] text-brass">
                  0{index + 1}
                </span>
                <p className="text-sm leading-relaxed text-warm-gray">{recommendation}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-divider pt-5">
            <p className="text-xs leading-relaxed text-warm-gray">
              <strong className="text-anthracite">Causal caveat:</strong> associate pipeline with an
              approved play run until a controlled or matched measurement design supports an
              incremental-revenue claim.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const id = `growth-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label htmlFor={id} className="block">
      <span className="metric text-[10px] uppercase tracking-[0.1em] text-warm-gray">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-10 w-full border border-divider bg-warm-white px-3 text-sm text-anthracite"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
