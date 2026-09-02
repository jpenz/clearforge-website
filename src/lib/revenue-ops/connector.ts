import {
  type ActivationIssue,
  type ActivationPolicyInput,
  type ActivationReadiness,
  buildCrmReadyHandoffPayload,
  type CrmReadyHandoffPayload,
  createDeterministicDemoFingerprint,
  evaluateActivationReadiness,
  validateCrmReadyHandoffPayload,
} from './policy';

export interface PreparedDryRunHandoff {
  status: 'prepared';
  mode: 'dry_run';
  dispatched: false;
  destination: 'local_preview_only';
  idempotencyKey: string;
  readiness: ActivationReadiness;
  payload: CrmReadyHandoffPayload;
}

export interface BlockedDryRunHandoff {
  status: 'blocked';
  mode: 'dry_run';
  dispatched: false;
  destination: 'local_preview_only';
  readiness: ActivationReadiness;
  issues: ActivationIssue[];
}

export type DryRunHandoffResult = PreparedDryRunHandoff | BlockedDryRunHandoff;

export interface CrmHandoffConnector {
  prepare(payload: CrmReadyHandoffPayload): PreparedDryRunHandoff | BlockedDryRunHandoff;
}

/** A small deterministic hash for an idempotency key, not a security primitive. */
export function createDryRunIdempotencyKey(payload: CrmReadyHandoffPayload): string {
  return `dryrun_${createDeterministicDemoFingerprint(payload)}`;
}

/**
 * This adapter deliberately has no endpoint, credentials, or send method. It
 * creates a deterministic local preview so an approved human can inspect an
 * idempotent CRM handoff packet before a real connector is authorized.
 */
export class DryRunCrmConnector implements CrmHandoffConnector {
  prepare(payload: CrmReadyHandoffPayload): PreparedDryRunHandoff | BlockedDryRunHandoff {
    const issues = validateCrmReadyHandoffPayload(payload);
    const readiness: ActivationReadiness = {
      eligible: issues.length === 0,
      checkedAt: payload.approval.decidedAt,
      policyVersion: payload.policyVersion,
      issues,
    };

    if (issues.length > 0) {
      return {
        status: 'blocked',
        mode: 'dry_run',
        dispatched: false,
        destination: 'local_preview_only',
        readiness,
        issues,
      };
    }

    return {
      status: 'prepared',
      mode: 'dry_run',
      dispatched: false,
      destination: 'local_preview_only',
      idempotencyKey: createDryRunIdempotencyKey(payload),
      readiness,
      payload,
    };
  }
}

export function prepareDryRunCrmHandoff(input: ActivationPolicyInput): DryRunHandoffResult {
  const readiness = evaluateActivationReadiness(input);
  const payload = buildCrmReadyHandoffPayload(input);

  if (!readiness.eligible || !payload) {
    return {
      status: 'blocked',
      mode: 'dry_run',
      dispatched: false,
      destination: 'local_preview_only',
      readiness,
      issues: readiness.issues,
    };
  }

  return new DryRunCrmConnector().prepare(payload);
}
