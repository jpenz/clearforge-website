import { describe, expect, it } from 'vitest';
import {
  createDryRunIdempotencyKey,
  DryRunCrmConnector,
  prepareDryRunCrmHandoff,
} from '@/lib/revenue-ops/connector';
import type { ApprovalRecord } from '@/lib/revenue-ops/policy';
import {
  ACTIVATION_POLICY_VERSION,
  buildCrmReadyHandoffPayload,
  createApprovalContextFingerprint,
  evaluateActivationReadiness,
} from '@/lib/revenue-ops/policy';
import type { Opportunity, Playbook, Signal } from '@/lib/revenue-ops/types';

const now = new Date('2026-08-08T12:00:00Z');

const signal: Signal = {
  id: 'signal-1',
  title: 'Validated expansion event',
  type: 'capital project',
  affectedEntity: 'Example Manufacturing',
  segment: 'Industrial',
  source: 'approved source',
  observedAt: '2026-08-07T09:00:00Z',
  decayAt: '2026-08-15T09:00:00Z',
  confidence: 0.9,
  businessRelevance: 0.9,
  reviewStatus: 'validated',
  evidence: [
    {
      id: 'evidence-1',
      label: 'Primary source',
      capturedAt: '2026-08-07T09:00:00Z',
      detail: 'An evidence record that can be reviewed by a human.',
      kind: 'synthetic_demo',
    },
  ],
  limitations: [],
};

const playbook: Playbook = {
  id: 'playbook-1',
  name: 'Expansion readiness',
  shortName: 'Expansion',
  trigger: 'Validated signal',
  eligibleWhen: 'Fit and signal verified',
  buyer: 'Operations leader',
  valueProposition: 'Value hypothesis',
  researchRequired: 'Account research',
  owner: 'Enterprise seller',
  sla: 'One business day',
  stopConditions: ['Signal becomes stale'],
  successCriteria: ['Human approves a handoff'],
  guardrail: 'No CRM mutation without approval.',
  steps: [],
};

const opportunity: Opportunity = {
  id: 'opportunity-1',
  title: 'Example Manufacturing expansion',
  account: 'Example Manufacturing',
  segment: 'Industrial',
  geography: 'Midwest',
  owner: 'Maya Chen',
  ownerRole: 'Enterprise seller',
  sla: 'Manager review within two business days',
  stage: 'approved',
  signalIds: ['signal-1'],
  whyNow: 'A recent, validated capital project may create an operating constraint.',
  buyingHypothesis: 'The plant leader is accountable for launch readiness.',
  recommendedMotion: 'Review a research brief with the account owner.',
  nextAction: 'Owner reviews the human-approved brief.',
  playbookId: 'playbook-1',
  crmState: 'Not connected',
  relationshipState: 'Unknown',
  expectedValue: {
    low: 100000,
    high: 250000,
    currency: 'USD',
    basis: 'Illustrative annual contract value range',
  },
  scoreInputs: {
    icpFit: 0.8,
    timing: 0.8,
    expectedValue: 0.8,
    reachability: 0.7,
    confidence: 0.8,
    strategicAlignment: 0.8,
  },
  risks: [],
  exclusions: [],
  dueAt: '2026-08-10T17:00:00Z',
};

const approvalContext = { now, opportunity, playbook, signals: [signal] };

const approval: ApprovalRecord = {
  id: 'approval-1',
  opportunityId: opportunity.id,
  playbookId: playbook.id,
  status: 'approved',
  approvedBy: 'Sales Manager',
  decidedAt: '2026-08-08T10:00:00Z',
  expiresAt: '2026-08-09T10:00:00Z',
  contextFingerprint: createApprovalContextFingerprint(approvalContext),
  policyVersion: ACTIVATION_POLICY_VERSION,
};

function validInput() {
  return { approval, ...approvalContext };
}

describe('revenue activation policy', () => {
  it('allows a complete, fresh, manager-approved handoff', () => {
    const readiness = evaluateActivationReadiness(validInput());

    expect(readiness.eligible).toBe(true);
    expect(readiness.issues).toEqual([]);
  });

  it('blocks incomplete governance controls before preparation', () => {
    const readiness = evaluateActivationReadiness({
      ...validInput(),
      approval: { ...approval, status: 'pending' },
      opportunity: { ...opportunity, owner: '', sla: '', stage: 'validated' },
      playbook: undefined,
    });

    expect(readiness.eligible).toBe(false);
    expect(readiness.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining([
        'owner_missing',
        'sla_missing',
        'playbook_missing',
        'stage_not_approved',
        'approval_not_approved',
      ]),
    );
  });

  it('blocks stale, unvalidated, or unevidenced signals', () => {
    const readiness = evaluateActivationReadiness({
      ...validInput(),
      signals: [
        {
          ...signal,
          decayAt: '2026-08-01T09:00:00Z',
          evidence: [],
          reviewStatus: 'needs_review',
        },
      ],
    });

    expect(readiness.eligible).toBe(false);
    expect(readiness.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['signal_not_validated', 'signal_stale', 'evidence_missing']),
    );
  });

  it('requires a non-expired approval', () => {
    const readiness = evaluateActivationReadiness({
      ...validInput(),
      approval: { ...approval, expiresAt: '2026-08-08T11:00:00Z' },
    });

    expect(readiness.eligible).toBe(false);
    expect(readiness.issues.map((issue) => issue.code)).toContain('approval_expired');
  });

  it('invalidates approval when the reviewed opportunity, playbook, or evidence changes', () => {
    const changedContexts = [
      { opportunity: { ...opportunity, nextAction: 'A materially different next action.' } },
      { playbook: { ...playbook, guardrail: 'Updated guardrail requires a new review.' } },
      {
        signals: [
          {
            ...signal,
            evidence: [{ ...signal.evidence[0], detail: 'Evidence was revised after approval.' }],
          },
        ],
      },
    ];

    for (const changedContext of changedContexts) {
      const readiness = evaluateActivationReadiness({ ...validInput(), ...changedContext });
      expect(readiness.eligible).toBe(false);
      expect(readiness.issues.map((issue) => issue.code)).toContain('approval_context_changed');
    }
  });

  it('creates an evidence-linked, deterministic dry-run packet without dispatching it', () => {
    const first = prepareDryRunCrmHandoff(validInput());
    const second = prepareDryRunCrmHandoff(validInput());

    expect(first.status).toBe('prepared');
    expect(second.status).toBe('prepared');
    if (first.status !== 'prepared' || second.status !== 'prepared') return;

    expect(first.dispatched).toBe(false);
    expect(first.destination).toBe('local_preview_only');
    expect(first.idempotencyKey).toBe(second.idempotencyKey);
    expect(first.payload.sourceEvidenceIds).toEqual(['evidence-1']);
    expect(first.payload.approval.approvedBy).toBe('Sales Manager');
  });

  it('rejects payload tampering in the dry-run adapter', () => {
    const payload = buildCrmReadyHandoffPayload(validInput());
    expect(payload).toBeDefined();
    if (!payload) return;

    const result = new DryRunCrmConnector().prepare({
      ...payload,
      sourceEvidenceIds: [],
    });

    expect(result.status).toBe('blocked');
    expect(result.dispatched).toBe(false);
    if (result.status !== 'blocked') return;
    expect(result.issues.map((issue) => issue.code)).toContain('payload_invalid');
  });

  it('uses the entire normalized payload to derive idempotency', () => {
    const payload = buildCrmReadyHandoffPayload(validInput());
    expect(payload).toBeDefined();
    if (!payload) return;

    expect(createDryRunIdempotencyKey(payload)).not.toBe(
      createDryRunIdempotencyKey({ ...payload, nextAction: 'A materially different action.' }),
    );
  });
});
