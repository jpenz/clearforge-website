# Samuel Revenue OS demo

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/revenue-ops](http://localhost:3000/revenue-ops).

The route is deliberately `noindex` and entirely local/demo-mode. It does not read a CRM, send outreach, call enrichment, or persist opportunity state.

## What the demo proves

1. Evidence-backed, deduplicated signals become a transparent opportunity score.
2. An opportunity includes why-now logic, value assumptions, owner, SLA, playbook, risks, exclusions, and source freshness.
3. A human approval is required before a CRM-ready handoff can be prepared; the approval is time-bound and freezes the reviewed opportunity, play, signal, and evidence context.
4. A post-approval change to that context blocks preparation until a fresh approval is recorded.
5. The apparent CRM handoff uses a deterministic, local-only dry-run packet and explicitly confirms that no external mutation occurred.
6. Market/whitespace, initiative portfolio, playbook, and growth-review views remain connected to the same safe fixture.

## Main implementation points

- `src/data/revenue-ops-demo.ts` — fully labelled synthetic fixture.
- `src/lib/revenue-ops/types.ts` — core product object contracts.
- `src/lib/revenue-ops/scoring.ts` — exposed weighted-geometric priority calculation.
- `src/lib/revenue-ops/policy.ts` — pure activation guard for ownership, SLA, fresh evidence, approval expiry, and frozen review context.
- `src/lib/revenue-ops/connector.ts` — deterministic dry-run adapter; it has no endpoint, credentials, or network send method.
- `src/components/revenue-ops/revenue-command-center.tsx` — interactive client workspace.
- `e2e/revenue-ops.spec.ts` — workflow, desktop/mobile, and Axe coverage.
- `supabase/revenue_ops_schema.sql` — unapplied tenant/RLS/audit/approval schema for a staged live-product build.

## Database and security foundations

`supabase/revenue_ops_schema.sql` is intentionally **not applied** and the app does not yet read or write it. It adds tenant isolation, role checks, source/evidence provenance, durable approvals, idempotent activation records, outcomes, retention fields, and immutable audit events for a future authenticated workspace. It must first be reviewed and exercised in a non-production Supabase project.

The schema allows authenticated clients to create **dry-run** activation previews only. A trusted server adapter is required for every live CRM write: it must canonicalize the connector payload, calculate its cryptographic hash, and persist that hash as `request_payload_hash`. The database guard requires it to match the immutable approval `payload_hash` before a live activation record can be created.

For the existing marketing tables, `supabase/harden_existing_public_tables.sql` is an opt-in script that removes old permissive RLS policies and anonymous/authenticated table access. Review it before applying to an existing Supabase project.

## Verification

```bash
npm run typecheck
npm test
npm run lint
npm run build
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- e2e/revenue-ops.spec.ts
npm audit
```

## Before live data

Do not attach real customer or CRM data until the product has a separate authenticated workspace, tenant isolation/RLS, RBAC, source authorization, retention/deletion controls, an audit model, and a server-enforced approval/write adapter. CRM remains the system of record; start with a read-only connector and a dry-run handoff. The demo fingerprint is deliberately non-cryptographic and must never be used as a production authorization mechanism.
