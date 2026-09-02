import type { Opportunity, Playbook, Signal } from './types';

export const ACTIVATION_POLICY_VERSION = '2026-08-08';

export type ActivationIssueCode =
  | 'owner_missing'
  | 'sla_missing'
  | 'playbook_missing'
  | 'playbook_mismatch'
  | 'stage_not_approved'
  | 'signal_missing'
  | 'signal_not_validated'
  | 'signal_stale'
  | 'evidence_missing'
  | 'evidence_invalid'
  | 'approval_missing'
  | 'approval_mismatch'
  | 'approval_not_approved'
  | 'approval_invalid'
  | 'approval_expired'
  | 'approval_context_changed'
  | 'payload_invalid';

export interface ActivationIssue {
  code: ActivationIssueCode;
  message: string;
  signalId?: string;
  field?: string;
}

export interface ApprovalRecord {
  id: string;
  opportunityId: string;
  playbookId: string;
  status: 'approved' | 'pending' | 'rejected';
  approvedBy?: string;
  decidedAt?: string;
  expiresAt?: string;
  contextFingerprint?: string;
  policyVersion: string;
}

export interface ActivationPolicyInput {
  opportunity: Opportunity;
  playbook?: Playbook;
  signals: Signal[];
  approval?: ApprovalRecord;
  now?: Date;
  policyVersion?: string;
}

export interface ActivationReadiness {
  eligible: boolean;
  checkedAt: string;
  policyVersion: string;
  issues: ActivationIssue[];
}

export interface CrmReadyHandoffPayload {
  version: 1;
  policyVersion: string;
  opportunityId: string;
  opportunityTitle: string;
  account: string;
  owner: string;
  ownerRole: string;
  playbookId: string;
  playbookName: string;
  sourceSignalIds: string[];
  sourceEvidenceIds: string[];
  whyNow: string;
  buyingHypothesis: string;
  recommendedMotion: string;
  nextAction: string;
  expectedValue: Opportunity['expectedValue'];
  dueAt: string;
  approval: {
    id: string;
    approvedBy: string;
    decidedAt: string;
    expiresAt: string;
    contextFingerprint: string;
    policyVersion: string;
  };
}

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function isValidDate(value: string | undefined): value is string {
  return Boolean(value && Number.isFinite(new Date(value).getTime()));
}

function signalIsValidated(signal: Signal): boolean {
  return signal.reviewStatus === 'validated' || signal.reviewStatus === 'grouped';
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function nowFor(input: ActivationPolicyInput): Date {
  return input.now ?? new Date();
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

/**
 * Produces a deterministic, browser-safe fingerprint for the synthetic demo.
 * It detects review-context drift but is not cryptographic. Production must
 * calculate and store a cryptographic hash on the server with the immutable
 * approval record; client-supplied fingerprints must never be authoritative.
 */
export function createDeterministicDemoFingerprint(value: unknown): string {
  const source = stableSerialize(value);
  let hash = 0x811c9dc5;

  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, '0');
}

function normalizedApprovalContext(input: ActivationPolicyInput): Record<string, unknown> {
  const signalIds = unique(input.opportunity.signalIds).sort();
  const signalsById = new Map(input.signals.map((signal) => [signal.id, signal]));
  const selectedSignals = signalIds.map((signalId) => {
    const signal = signalsById.get(signalId);
    if (!signal) return { id: signalId, missing: true };

    return {
      ...signal,
      evidence: [...signal.evidence].sort((left, right) => compareText(left.id, right.id)),
      limitations: [...signal.limitations].sort(),
    };
  });

  return {
    opportunity: {
      ...input.opportunity,
      exclusions: [...input.opportunity.exclusions].sort(),
      risks: [...input.opportunity.risks].sort(),
      signalIds,
    },
    playbook: input.playbook
      ? {
          ...input.playbook,
          steps: [...input.playbook.steps].sort((left, right) => compareText(left.id, right.id)),
          stopConditions: [...input.playbook.stopConditions].sort(),
          successCriteria: [...input.playbook.successCriteria].sort(),
        }
      : undefined,
    signals: selectedSignals,
  };
}

/**
 * Binds an approval to the commercial facts and evidence the approver saw.
 * Input ordering is normalized so equivalent records have the same fingerprint.
 */
export function createApprovalContextFingerprint(input: ActivationPolicyInput): string {
  return `democtx_${createDeterministicDemoFingerprint(normalizedApprovalContext(input))}`;
}

function addOpportunityContentIssues(opportunity: Opportunity, issues: ActivationIssue[]): void {
  const fields: Array<[keyof Opportunity, string]> = [
    ['title', 'opportunity title'],
    ['account', 'account'],
    ['ownerRole', 'owner role'],
    ['whyNow', 'why-now rationale'],
    ['buyingHypothesis', 'buying hypothesis'],
    ['recommendedMotion', 'recommended motion'],
    ['nextAction', 'next action'],
  ];

  for (const [field, label] of fields) {
    const value = opportunity[field];
    if (typeof value !== 'string' || !hasText(value)) {
      issues.push({
        code: 'payload_invalid',
        field,
        message: `A ${label} is required for a CRM-ready handoff.`,
      });
    }
  }

  if (
    !Number.isFinite(opportunity.expectedValue.low) ||
    !Number.isFinite(opportunity.expectedValue.high) ||
    opportunity.expectedValue.low < 0 ||
    opportunity.expectedValue.high < opportunity.expectedValue.low ||
    !hasText(opportunity.expectedValue.basis)
  ) {
    issues.push({
      code: 'payload_invalid',
      field: 'expectedValue',
      message: 'Expected value must be a non-negative, ordered range with a stated basis.',
    });
  }

  if (!isValidDate(opportunity.dueAt)) {
    issues.push({
      code: 'payload_invalid',
      field: 'dueAt',
      message: 'A valid handoff due date is required.',
    });
  }
}

/**
 * Evaluates the non-negotiable controls before a human-approved opportunity can
 * be prepared for a CRM handoff. It is intentionally pure: this code performs
 * no persistence, enrichment, outreach, or CRM mutation.
 */
export function evaluateActivationReadiness(input: ActivationPolicyInput): ActivationReadiness {
  const issues: ActivationIssue[] = [];
  const now = nowFor(input);
  const policyVersion = input.policyVersion ?? ACTIVATION_POLICY_VERSION;
  const { approval, opportunity, playbook, signals } = input;

  if (!hasText(opportunity.owner)) {
    issues.push({ code: 'owner_missing', message: 'Assign a named owner before handoff.' });
  }

  if (!hasText(opportunity.sla)) {
    issues.push({ code: 'sla_missing', message: 'Set an explicit SLA before handoff.' });
  }

  if (!playbook) {
    issues.push({
      code: 'playbook_missing',
      message: 'Select a governed playbook before handoff.',
    });
  } else if (playbook.id !== opportunity.playbookId) {
    issues.push({
      code: 'playbook_mismatch',
      message: 'The selected playbook must match the opportunity playbook.',
    });
  }

  if (opportunity.stage !== 'approved') {
    issues.push({
      code: 'stage_not_approved',
      message: 'A CRM-ready handoff requires the opportunity to be manager-approved.',
    });
  }

  const distinctSignalIds = unique(opportunity.signalIds);
  if (distinctSignalIds.length === 0) {
    issues.push({
      code: 'signal_missing',
      message: 'Link at least one source signal before handoff.',
    });
  }

  const signalsById = new Map(signals.map((signal) => [signal.id, signal]));
  for (const signalId of distinctSignalIds) {
    const signal = signalsById.get(signalId);
    if (!signal) {
      issues.push({
        code: 'signal_missing',
        signalId,
        message: `The linked signal “${signalId}” is unavailable.`,
      });
      continue;
    }

    if (!signalIsValidated(signal)) {
      issues.push({
        code: 'signal_not_validated',
        signalId,
        message: `Signal “${signal.title}” must be validated or grouped before handoff.`,
      });
    }

    if (!isValidDate(signal.decayAt) || new Date(signal.decayAt).getTime() < now.getTime()) {
      issues.push({
        code: 'signal_stale',
        signalId,
        message: `Signal “${signal.title}” is stale or has no valid freshness date.`,
      });
    }

    if (signal.evidence.length === 0) {
      issues.push({
        code: 'evidence_missing',
        signalId,
        message: `Signal “${signal.title}” needs at least one evidence item.`,
      });
      continue;
    }

    const invalidEvidence = signal.evidence.some(
      (evidence) =>
        !hasText(evidence.id) ||
        !hasText(evidence.label) ||
        !hasText(evidence.detail) ||
        !isValidDate(evidence.capturedAt) ||
        new Date(evidence.capturedAt).getTime() > now.getTime(),
    );
    if (invalidEvidence) {
      issues.push({
        code: 'evidence_invalid',
        signalId,
        message: `Signal “${signal.title}” contains incomplete, invalid, or future-dated evidence.`,
      });
    }
  }

  if (!approval) {
    issues.push({
      code: 'approval_missing',
      message: 'A named human approval is required before handoff.',
    });
  } else {
    if (
      approval.opportunityId !== opportunity.id ||
      approval.playbookId !== opportunity.playbookId
    ) {
      issues.push({
        code: 'approval_mismatch',
        message: 'Approval must reference this opportunity and its selected playbook.',
      });
    }
    if (approval.status !== 'approved') {
      issues.push({
        code: 'approval_not_approved',
        message: 'The current approval decision is not approved.',
      });
    }
    const approvalDecisionTime = isValidDate(approval.decidedAt)
      ? new Date(approval.decidedAt).getTime()
      : Number.NaN;
    const approvalExpiryTime = isValidDate(approval.expiresAt)
      ? new Date(approval.expiresAt).getTime()
      : Number.NaN;
    const approvalHasRequiredFields =
      !hasText(approval.id) ||
      !hasText(approval.approvedBy) ||
      !Number.isFinite(approvalDecisionTime) ||
      !Number.isFinite(approvalExpiryTime) ||
      !hasText(approval.contextFingerprint) ||
      !hasText(approval.policyVersion) ||
      approval.policyVersion !== policyVersion;

    if (approvalHasRequiredFields) {
      issues.push({
        code: 'approval_invalid',
        message:
          'Approval needs an approver, decision and expiry timestamps, context fingerprint, ' +
          'and current policy version.',
      });
    } else if (approvalExpiryTime <= approvalDecisionTime) {
      issues.push({
        code: 'approval_invalid',
        message: 'Approval expiry must be after the approval decision.',
      });
    } else {
      if (approvalExpiryTime <= now.getTime()) {
        issues.push({
          code: 'approval_expired',
          message: 'Approval has expired; refresh the evidence and request re-approval.',
        });
      }
      if (approval.contextFingerprint !== createApprovalContextFingerprint(input)) {
        issues.push({
          code: 'approval_context_changed',
          message: 'Approval context changed; a fresh human approval is required before handoff.',
        });
      }
    }
  }

  addOpportunityContentIssues(opportunity, issues);

  return {
    eligible: issues.length === 0,
    checkedAt: now.toISOString(),
    policyVersion,
    issues,
  };
}

export function buildCrmReadyHandoffPayload(
  input: ActivationPolicyInput,
): CrmReadyHandoffPayload | undefined {
  const readiness = evaluateActivationReadiness(input);
  const approval = input.approval;
  if (
    !readiness.eligible ||
    !input.playbook ||
    !approval?.approvedBy ||
    !approval.decidedAt ||
    !approval.expiresAt ||
    !approval.contextFingerprint
  ) {
    return undefined;
  }

  const signalsById = new Map(input.signals.map((signal) => [signal.id, signal]));
  const sourceSignalIds = unique(input.opportunity.signalIds).sort();
  const sourceEvidenceIds = unique(
    sourceSignalIds.flatMap((signalId) =>
      (signalsById.get(signalId)?.evidence ?? []).map((evidence) => evidence.id),
    ),
  ).sort();

  return {
    version: 1,
    policyVersion: readiness.policyVersion,
    opportunityId: input.opportunity.id,
    opportunityTitle: input.opportunity.title.trim(),
    account: input.opportunity.account.trim(),
    owner: input.opportunity.owner.trim(),
    ownerRole: input.opportunity.ownerRole.trim(),
    playbookId: input.playbook.id,
    playbookName: input.playbook.name.trim(),
    sourceSignalIds,
    sourceEvidenceIds,
    whyNow: input.opportunity.whyNow.trim(),
    buyingHypothesis: input.opportunity.buyingHypothesis.trim(),
    recommendedMotion: input.opportunity.recommendedMotion.trim(),
    nextAction: input.opportunity.nextAction.trim(),
    expectedValue: { ...input.opportunity.expectedValue },
    dueAt: input.opportunity.dueAt,
    approval: {
      id: approval.id,
      approvedBy: approval.approvedBy.trim(),
      decidedAt: approval.decidedAt,
      expiresAt: approval.expiresAt,
      contextFingerprint: approval.contextFingerprint,
      policyVersion: approval.policyVersion,
    },
  };
}

export function validateCrmReadyHandoffPayload(payload: CrmReadyHandoffPayload): ActivationIssue[] {
  const issues: ActivationIssue[] = [];
  const requiredText: Array<[keyof CrmReadyHandoffPayload, string]> = [
    ['policyVersion', 'policy version'],
    ['opportunityId', 'opportunity ID'],
    ['opportunityTitle', 'opportunity title'],
    ['account', 'account'],
    ['owner', 'owner'],
    ['ownerRole', 'owner role'],
    ['playbookId', 'playbook ID'],
    ['playbookName', 'playbook name'],
    ['whyNow', 'why-now rationale'],
    ['buyingHypothesis', 'buying hypothesis'],
    ['recommendedMotion', 'recommended motion'],
    ['nextAction', 'next action'],
  ];

  for (const [field, label] of requiredText) {
    const value = payload[field];
    if (typeof value !== 'string' || !hasText(value)) {
      issues.push({
        code: 'payload_invalid',
        field,
        message: `CRM handoff payload is missing ${label}.`,
      });
    }
  }

  if (payload.version !== 1) {
    issues.push({
      code: 'payload_invalid',
      field: 'version',
      message: 'CRM handoff payload has an unsupported version.',
    });
  }

  if (payload.sourceSignalIds.length === 0 || payload.sourceEvidenceIds.length === 0) {
    issues.push({
      code: 'payload_invalid',
      field: 'sourceSignalIds',
      message: 'CRM handoff payload requires source signals and evidence identifiers.',
    });
  }

  if (
    !isValidDate(payload.dueAt) ||
    !isValidDate(payload.approval.decidedAt) ||
    !isValidDate(payload.approval.expiresAt) ||
    new Date(payload.approval.expiresAt).getTime() <= new Date(payload.approval.decidedAt).getTime()
  ) {
    issues.push({
      code: 'payload_invalid',
      field: 'dueAt',
      message: 'CRM handoff payload requires valid due, approval, and approval-expiry timestamps.',
    });
  }

  if (
    !hasText(payload.approval.id) ||
    !hasText(payload.approval.approvedBy) ||
    !hasText(payload.approval.contextFingerprint) ||
    payload.approval.policyVersion !== payload.policyVersion
  ) {
    issues.push({
      code: 'payload_invalid',
      field: 'approval',
      message: 'CRM handoff payload contains an invalid approval record.',
    });
  }

  if (
    !Number.isFinite(payload.expectedValue.low) ||
    !Number.isFinite(payload.expectedValue.high) ||
    payload.expectedValue.low < 0 ||
    payload.expectedValue.high < payload.expectedValue.low ||
    !hasText(payload.expectedValue.basis)
  ) {
    issues.push({
      code: 'payload_invalid',
      field: 'expectedValue',
      message: 'CRM handoff payload contains an invalid expected-value range.',
    });
  }

  return issues;
}
