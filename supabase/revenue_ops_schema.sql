-- Revenue Ops durable data foundation (UNAPPLIED)
--
-- This is a new, tenant-scoped schema foundation for the Revenue Ops command
-- center. It is intentionally not invoked by the web application and should
-- be reviewed and applied through a staged Supabase migration before real
-- customer data is connected.
--
-- Preconditions:
--   1. Supabase Auth is enabled; all human users have an auth.users record.
--   2. This file is run by a database owner in a non-production environment
--      first, then promoted through the normal migration process.
--   3. Connector access tokens and secrets stay in a vault. `connection_ref`
--      is an opaque reference only; no credential column exists in this schema.
--   4. Live CRM writes are performed only by a trusted server-side adapter.
--      Authenticated clients can create and manage dry-run activation records,
--      but RLS never permits a client to set `dry_run = false`.
--   5. The trusted adapter computes and verifies each approval `payload_hash`
--      from its canonical action context before any live activation.
--
-- This file is idempotent for a clean adoption path, but it is not a substitute
-- for a data migration plan if a prior Revenue Ops schema already exists.

BEGIN;

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_workspace_member_role'
  ) THEN
    CREATE TYPE public.revenue_workspace_member_role AS ENUM (
      'owner', 'admin', 'operator', 'reviewer', 'viewer'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_data_classification'
  ) THEN
    CREATE TYPE public.revenue_data_classification AS ENUM (
      'internal', 'confidential', 'restricted'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_signal_status'
  ) THEN
    CREATE TYPE public.revenue_signal_status AS ENUM (
      'active', 'suppressed', 'dismissed', 'expired'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_opportunity_stage'
  ) THEN
    CREATE TYPE public.revenue_opportunity_stage AS ENUM (
      'draft', 'triaged', 'in_review', 'approved', 'handoff_ready',
      'activated', 'closed_won', 'closed_lost', 'expired', 'archived'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_playbook_status'
  ) THEN
    CREATE TYPE public.revenue_playbook_status AS ENUM (
      'draft', 'published', 'archived'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_play_run_status'
  ) THEN
    CREATE TYPE public.revenue_play_run_status AS ENUM (
      'draft', 'awaiting_approval', 'approved', 'blocked', 'handoff_ready',
      'activated', 'completed', 'cancelled'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_approval_status'
  ) THEN
    CREATE TYPE public.revenue_approval_status AS ENUM (
      'pending', 'approved', 'rejected', 'cancelled', 'expired'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_activation_status'
  ) THEN
    CREATE TYPE public.revenue_activation_status AS ENUM (
      'dry_run', 'ready', 'sent', 'succeeded', 'failed', 'cancelled'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_outcome_status'
  ) THEN
    CREATE TYPE public.revenue_outcome_status AS ENUM (
      'observed', 'won', 'lost', 'no_decision', 'invalidated'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typname = 'revenue_initiative_status'
  ) THEN
    CREATE TYPE public.revenue_initiative_status AS ENUM (
      'proposed', 'active', 'paused', 'completed', 'cancelled'
    );
  END IF;
END
$$;

-- ---------------------------------------------------------------------------
-- Tenant and membership model
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.revenue_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 140),
  slug TEXT NOT NULL UNIQUE CHECK (
    slug = lower(slug)
    AND slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'
  ),
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.revenue_workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.revenue_organizations(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 160),
  slug TEXT NOT NULL CHECK (
    slug = lower(slug)
    AND slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'
  ),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(settings) = 'object'),
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, slug)
);

CREATE TABLE IF NOT EXISTS public.revenue_workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  role public.revenue_workspace_member_role NOT NULL DEFAULT 'viewer',
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, user_id),
  UNIQUE (workspace_id, id)
);

-- ---------------------------------------------------------------------------
-- Evidence, signals, opportunity, and market data
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.revenue_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 160),
  provider TEXT NOT NULL CHECK (char_length(btrim(provider)) BETWEEN 2 AND 80),
  source_kind TEXT NOT NULL CHECK (source_kind IN (
    'crm', 'intent', 'product', 'website', 'support', 'review', 'manual', 'other'
  )),
  connection_ref TEXT,
  sync_state TEXT NOT NULL DEFAULT 'disconnected' CHECK (sync_state IN (
    'disconnected', 'authorized', 'read_only', 'paused', 'error'
  )),
  authorization_scopes JSONB NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(authorization_scopes) = 'array'),
  config JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(config) = 'object'),
  data_classification public.revenue_data_classification NOT NULL DEFAULT 'internal',
  last_synced_at TIMESTAMPTZ,
  retention_until TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id)
);

CREATE TABLE IF NOT EXISTS public.revenue_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 240),
  canonical_domain TEXT CHECK (
    canonical_domain IS NULL OR canonical_domain = lower(canonical_domain)
  ),
  external_ids JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(external_ids) = 'object'),
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(attributes) = 'object'),
  data_classification public.revenue_data_classification NOT NULL DEFAULT 'internal',
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id)
);

CREATE TABLE IF NOT EXISTS public.revenue_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  source_id UUID,
  account_id UUID,
  external_reference TEXT,
  evidence_kind TEXT NOT NULL CHECK (char_length(btrim(evidence_kind)) BETWEEN 2 AND 80),
  summary TEXT NOT NULL CHECK (char_length(btrim(summary)) BETWEEN 1 AND 4000),
  normalized_payload JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(normalized_payload) = 'object'),
  content_hash TEXT,
  data_classification public.revenue_data_classification NOT NULL DEFAULT 'internal',
  observed_at TIMESTAMPTZ NOT NULL,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  freshness_expires_at TIMESTAMPTZ,
  retention_until TIMESTAMPTZ,
  redacted_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, source_id)
    REFERENCES public.revenue_sources(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, account_id)
    REFERENCES public.revenue_accounts(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_signal_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  account_id UUID,
  canonical_key TEXT NOT NULL CHECK (char_length(btrim(canonical_key)) BETWEEN 2 AND 255),
  signal_type TEXT NOT NULL CHECK (char_length(btrim(signal_type)) BETWEEN 2 AND 100),
  status public.revenue_signal_status NOT NULL DEFAULT 'active',
  suppression_reason TEXT,
  first_observed_at TIMESTAMPTZ NOT NULL,
  latest_observed_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ,
  evidence_count INTEGER NOT NULL DEFAULT 0 CHECK (evidence_count >= 0),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  UNIQUE (workspace_id, canonical_key),
  FOREIGN KEY (workspace_id, account_id)
    REFERENCES public.revenue_accounts(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  source_id UUID,
  signal_group_id UUID NOT NULL,
  account_id UUID,
  evidence_id UUID,
  signal_type TEXT NOT NULL CHECK (char_length(btrim(signal_type)) BETWEEN 2 AND 100),
  signal_subtype TEXT,
  status public.revenue_signal_status NOT NULL DEFAULT 'active',
  confidence NUMERIC(4, 3) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  impact_score NUMERIC(5, 2) CHECK (impact_score >= 0 AND impact_score <= 100),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(payload) = 'object'),
  dedupe_key TEXT,
  observed_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, source_id)
    REFERENCES public.revenue_sources(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, signal_group_id)
    REFERENCES public.revenue_signal_groups(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, account_id)
    REFERENCES public.revenue_accounts(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, evidence_id)
    REFERENCES public.revenue_evidence(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_market_slices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 160),
  definition JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(definition) = 'object'),
  sizing JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(sizing) = 'object'),
  assumptions JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(assumptions) = 'object'),
  data_classification public.revenue_data_classification NOT NULL DEFAULT 'internal',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  UNIQUE (workspace_id, name)
);

CREATE TABLE IF NOT EXISTS public.revenue_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  account_id UUID,
  primary_signal_group_id UUID,
  market_slice_id UUID,
  title TEXT NOT NULL CHECK (char_length(btrim(title)) BETWEEN 2 AND 240),
  stage public.revenue_opportunity_stage NOT NULL DEFAULT 'draft',
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  priority_score NUMERIC(5, 2) CHECK (priority_score >= 0 AND priority_score <= 100),
  scoring_version TEXT,
  why_now JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(why_now) = 'object'),
  value_hypothesis JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(value_hypothesis) = 'object'),
  risk_summary JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(risk_summary) = 'object'),
  exclusions JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(exclusions) = 'array'),
  next_action TEXT,
  next_sla_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  human_approval_required BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, account_id)
    REFERENCES public.revenue_accounts(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, primary_signal_group_id)
    REFERENCES public.revenue_signal_groups(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, market_slice_id)
    REFERENCES public.revenue_market_slices(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_score_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  opportunity_id UUID NOT NULL,
  algorithm_version TEXT NOT NULL CHECK (char_length(btrim(algorithm_version)) BETWEEN 1 AND 120),
  score NUMERIC(5, 2) NOT NULL CHECK (score >= 0 AND score <= 100),
  component_scores JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(component_scores) = 'object'),
  weights JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(weights) = 'object'),
  input_hash TEXT,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  calculated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, opportunity_id)
    REFERENCES public.revenue_opportunities(workspace_id, id) ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------------
-- Playbooks, approvals, activation, learning, and audit trail
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.revenue_playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 160),
  description TEXT,
  status public.revenue_playbook_status NOT NULL DEFAULT 'draft',
  trigger_definition JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(trigger_definition) = 'object'),
  action_preview JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(action_preview) = 'object'),
  requires_human_approval BOOLEAN NOT NULL DEFAULT TRUE,
  activation_mode TEXT NOT NULL DEFAULT 'dry_run' CHECK (activation_mode IN (
    'dry_run', 'human_approval', 'server_only'
  )),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  UNIQUE (workspace_id, name, version)
);

CREATE TABLE IF NOT EXISTS public.revenue_play_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  opportunity_id UUID NOT NULL,
  playbook_id UUID NOT NULL,
  run_key TEXT NOT NULL CHECK (char_length(btrim(run_key)) BETWEEN 8 AND 255),
  status public.revenue_play_run_status NOT NULL DEFAULT 'draft',
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approval_required BOOLEAN NOT NULL DEFAULT TRUE,
  input_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(input_snapshot) = 'object'),
  output_preview JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(output_preview) = 'object'),
  blocked_reason TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  UNIQUE (workspace_id, run_key),
  FOREIGN KEY (workspace_id, opportunity_id)
    REFERENCES public.revenue_opportunities(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, playbook_id)
    REFERENCES public.revenue_playbooks(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  opportunity_id UUID NOT NULL,
  play_run_id UUID NOT NULL,
  playbook_id UUID NOT NULL,
  playbook_version INTEGER NOT NULL CHECK (playbook_version > 0),
  score_snapshot_id UUID NOT NULL,
  score_algorithm_version TEXT NOT NULL
    CHECK (char_length(btrim(score_algorithm_version)) BETWEEN 1 AND 120),
  score_input_hash TEXT,
  approval_kind TEXT NOT NULL DEFAULT 'crm_handoff'
    CHECK (char_length(btrim(approval_kind)) BETWEEN 2 AND 100),
  action_context JSONB NOT NULL
    CHECK (jsonb_typeof(action_context) = 'object' AND action_context <> '{}'::jsonb),
  payload_hash TEXT NOT NULL CHECK (char_length(btrim(payload_hash)) BETWEEN 16 AND 255),
  status public.revenue_approval_status NOT NULL DEFAULT 'pending',
  requested_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE RESTRICT,
  requested_reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  request_reason TEXT,
  decision_reason TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, opportunity_id)
    REFERENCES public.revenue_opportunities(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, play_run_id)
    REFERENCES public.revenue_play_runs(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, playbook_id)
    REFERENCES public.revenue_playbooks(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, score_snapshot_id)
    REFERENCES public.revenue_score_snapshots(workspace_id, id) ON DELETE RESTRICT,
  CHECK (expires_at > requested_at)
);

CREATE TABLE IF NOT EXISTS public.revenue_activations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  opportunity_id UUID NOT NULL,
  play_run_id UUID NOT NULL,
  approval_id UUID,
  external_system TEXT NOT NULL CHECK (char_length(btrim(external_system)) BETWEEN 2 AND 100),
  action_type TEXT NOT NULL CHECK (char_length(btrim(action_type)) BETWEEN 2 AND 100),
  idempotency_key TEXT NOT NULL CHECK (char_length(btrim(idempotency_key)) BETWEEN 8 AND 255),
  dry_run BOOLEAN NOT NULL DEFAULT TRUE,
  status public.revenue_activation_status NOT NULL DEFAULT 'dry_run',
  request_preview JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(request_preview) = 'object'),
  -- Set only by the trusted adapter after hashing the canonical connector
  -- payload. A live handoff must match the immutable approval payload hash.
  request_payload_hash TEXT
    CHECK (request_payload_hash IS NULL OR char_length(btrim(request_payload_hash)) BETWEEN 16 AND 255),
  response_summary JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(response_summary) = 'object'),
  external_record_reference TEXT,
  attempted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  UNIQUE (workspace_id, idempotency_key),
  FOREIGN KEY (workspace_id, opportunity_id)
    REFERENCES public.revenue_opportunities(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, play_run_id)
    REFERENCES public.revenue_play_runs(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, approval_id)
    REFERENCES public.revenue_approvals(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  opportunity_id UUID NOT NULL,
  play_run_id UUID,
  status public.revenue_outcome_status NOT NULL DEFAULT 'observed',
  outcome_summary TEXT NOT NULL CHECK (char_length(btrim(outcome_summary)) BETWEEN 1 AND 4000),
  value_impact NUMERIC(14, 2),
  attribution JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(attribution) = 'object'),
  observed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, opportunity_id)
    REFERENCES public.revenue_opportunities(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, play_run_id)
    REFERENCES public.revenue_play_runs(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  market_slice_id UUID,
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 200),
  status public.revenue_initiative_status NOT NULL DEFAULT 'proposed',
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  objective TEXT,
  success_metrics JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(success_metrics) = 'object'),
  risks JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(risks) = 'array'),
  starts_at TIMESTAMPTZ,
  target_end_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  UNIQUE (workspace_id, id),
  FOREIGN KEY (workspace_id, market_slice_id)
    REFERENCES public.revenue_market_slices(workspace_id, id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS public.revenue_audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.revenue_workspaces(id) ON DELETE RESTRICT,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_kind TEXT NOT NULL CHECK (actor_kind IN ('user', 'system')),
  entity_type TEXT NOT NULL CHECK (char_length(btrim(entity_type)) BETWEEN 2 AND 100),
  entity_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
  correlation_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes and tenant-safe relationship integrity
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_revenue_workspaces_organization
  ON public.revenue_workspaces(organization_id);
CREATE INDEX IF NOT EXISTS idx_revenue_workspace_members_user
  ON public.revenue_workspace_members(user_id, workspace_id);
CREATE INDEX IF NOT EXISTS idx_revenue_sources_workspace_state
  ON public.revenue_sources(workspace_id, sync_state, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_evidence_workspace_observed
  ON public.revenue_evidence(workspace_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_evidence_retention
  ON public.revenue_evidence(retention_until)
  WHERE retention_until IS NOT NULL AND redacted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_revenue_evidence_source_hash
  ON public.revenue_evidence(workspace_id, source_id, content_hash)
  WHERE source_id IS NOT NULL AND content_hash IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_revenue_accounts_domain
  ON public.revenue_accounts(workspace_id, canonical_domain)
  WHERE canonical_domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_revenue_signal_groups_workspace_latest
  ON public.revenue_signal_groups(workspace_id, status, latest_observed_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_revenue_signals_dedupe
  ON public.revenue_signals(workspace_id, dedupe_key)
  WHERE dedupe_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_revenue_signals_workspace_observed
  ON public.revenue_signals(workspace_id, status, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_opportunities_priority
  ON public.revenue_opportunities(workspace_id, stage, priority_score DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_revenue_opportunities_owner_sla
  ON public.revenue_opportunities(workspace_id, owner_user_id, next_sla_at);
CREATE INDEX IF NOT EXISTS idx_revenue_score_snapshots_opportunity
  ON public.revenue_score_snapshots(workspace_id, opportunity_id, calculated_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_playbooks_workspace_status
  ON public.revenue_playbooks(workspace_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_play_runs_workspace_status
  ON public.revenue_play_runs(workspace_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_approvals_workspace_status
  ON public.revenue_approvals(workspace_id, status, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_activations_workspace_status
  ON public.revenue_activations(workspace_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_outcomes_opportunity
  ON public.revenue_outcomes(workspace_id, opportunity_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_initiatives_workspace_status
  ON public.revenue_initiatives(workspace_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_audit_events_workspace_time
  ON public.revenue_audit_events(workspace_id, occurred_at DESC);

-- ---------------------------------------------------------------------------
-- Timestamping, authorization helpers, and invariant-enforcing triggers
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.revenue_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_touch_version()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$;

-- SECURITY DEFINER avoids recursive RLS evaluation for membership checks. The
-- functions expose only boolean authorization facts and require an auth user.
CREATE OR REPLACE FUNCTION public.revenue_is_workspace_member(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = target_workspace_id
        AND member.user_id = auth.uid()
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_is_workspace_owner(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = target_workspace_id
        AND member.user_id = auth.uid()
        AND member.role = 'owner'::public.revenue_workspace_member_role
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_is_workspace_admin(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = target_workspace_id
        AND member.user_id = auth.uid()
        AND member.role IN (
          'owner'::public.revenue_workspace_member_role,
          'admin'::public.revenue_workspace_member_role
        )
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_can_operate_workspace(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = target_workspace_id
        AND member.user_id = auth.uid()
        AND member.role IN (
          'owner'::public.revenue_workspace_member_role,
          'admin'::public.revenue_workspace_member_role,
          'operator'::public.revenue_workspace_member_role
        )
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_can_review_workspace(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = target_workspace_id
        AND member.user_id = auth.uid()
        AND member.role IN (
          'owner'::public.revenue_workspace_member_role,
          'admin'::public.revenue_workspace_member_role,
          'reviewer'::public.revenue_workspace_member_role
        )
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_is_organization_member(target_organization_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      INNER JOIN public.revenue_workspaces AS workspace
        ON workspace.id = member.workspace_id
      WHERE workspace.organization_id = target_organization_id
        AND member.user_id = auth.uid()
    );
$$;

CREATE OR REPLACE FUNCTION public.revenue_is_organization_admin(target_organization_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      INNER JOIN public.revenue_workspaces AS workspace
        ON workspace.id = member.workspace_id
      WHERE workspace.organization_id = target_organization_id
        AND member.user_id = auth.uid()
        AND member.role IN (
          'owner'::public.revenue_workspace_member_role,
          'admin'::public.revenue_workspace_member_role
        )
    );
$$;

REVOKE ALL ON FUNCTION public.revenue_is_workspace_member(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_is_workspace_owner(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_is_workspace_admin(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_can_operate_workspace(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_can_review_workspace(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_is_organization_member(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revenue_is_organization_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.revenue_is_workspace_member(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_is_workspace_owner(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_is_workspace_admin(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_can_operate_workspace(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_can_review_workspace(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_is_organization_member(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revenue_is_organization_admin(UUID) TO authenticated, service_role;

-- Creating an organization creates exactly one primary workspace, then grants
-- its creator owner membership. This is the only bootstrap path; subsequent
-- workspaces require an organization admin through RLS.
CREATE OR REPLACE FUNCTION public.revenue_bootstrap_workspace_for_organization()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.revenue_workspaces (
    organization_id, name, slug, settings, created_by
  )
  VALUES (
    NEW.id, NEW.name || ' workspace', 'primary', '{}'::jsonb, NEW.created_by
  )
  ON CONFLICT (organization_id, slug) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_grant_workspace_creator_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.revenue_workspace_members (
    workspace_id, user_id, role, created_by
  )
  VALUES (NEW.id, NEW.created_by, 'owner', NEW.created_by)
  ON CONFLICT (workspace_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_protect_workspace_membership()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id
      OR NEW.user_id IS DISTINCT FROM OLD.user_id
      OR NEW.created_by IS DISTINCT FROM OLD.created_by THEN
      RAISE EXCEPTION 'workspace_id, user_id, and created_by are immutable for membership records';
    END IF;

    IF OLD.role = 'owner'::public.revenue_workspace_member_role
      AND NEW.role <> 'owner'::public.revenue_workspace_member_role
      AND NOT EXISTS (
        SELECT 1
        FROM public.revenue_workspace_members AS member
        WHERE member.workspace_id = OLD.workspace_id
          AND member.id <> OLD.id
          AND member.role = 'owner'::public.revenue_workspace_member_role
      ) THEN
      RAISE EXCEPTION 'a workspace must retain at least one owner';
    END IF;
  ELSIF TG_OP = 'DELETE'
    AND OLD.role = 'owner'::public.revenue_workspace_member_role
    AND NOT EXISTS (
      SELECT 1
      FROM public.revenue_workspace_members AS member
      WHERE member.workspace_id = OLD.workspace_id
        AND member.id <> OLD.id
        AND member.role = 'owner'::public.revenue_workspace_member_role
    ) THEN
    RAISE EXCEPTION 'a workspace must retain at least one owner';
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$;

-- Tenant identity is never editable through normal application operations.
-- Moving a row between workspaces must be an explicit, reviewed migration so a
-- user who belongs to two tenants cannot accidentally mix their data.
CREATE OR REPLACE FUNCTION public.revenue_protect_workspace_scope()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN
    RAISE EXCEPTION 'workspace_id is immutable for Revenue Ops records';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_protect_organization_scope()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.created_by IS DISTINCT FROM OLD.created_by THEN
    RAISE EXCEPTION 'created_by is immutable for organization records';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_protect_workspace_tenant()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.organization_id IS DISTINCT FROM OLD.organization_id
    OR NEW.created_by IS DISTINCT FROM OLD.created_by THEN
    RAISE EXCEPTION 'organization_id and created_by are immutable for workspace records';
  END IF;

  RETURN NEW;
END;
$$;

-- Approval scope cannot be changed after a request is created. Reviewers can
-- decide a pending request and requesters can cancel one; a material change
-- needs a new approval request and leaves the original in the audit trail.
CREATE OR REPLACE FUNCTION public.revenue_protect_approval_decision()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF OLD.status <> 'pending'::public.revenue_approval_status THEN
    RAISE EXCEPTION 'a decided or cancelled approval record is immutable';
  END IF;

  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id
    OR NEW.opportunity_id IS DISTINCT FROM OLD.opportunity_id
    OR NEW.play_run_id IS DISTINCT FROM OLD.play_run_id
    OR NEW.playbook_id IS DISTINCT FROM OLD.playbook_id
    OR NEW.playbook_version IS DISTINCT FROM OLD.playbook_version
    OR NEW.score_snapshot_id IS DISTINCT FROM OLD.score_snapshot_id
    OR NEW.score_algorithm_version IS DISTINCT FROM OLD.score_algorithm_version
    OR NEW.score_input_hash IS DISTINCT FROM OLD.score_input_hash
    OR NEW.approval_kind IS DISTINCT FROM OLD.approval_kind
    OR NEW.action_context IS DISTINCT FROM OLD.action_context
    OR NEW.payload_hash IS DISTINCT FROM OLD.payload_hash
    OR NEW.requested_by IS DISTINCT FROM OLD.requested_by
    OR NEW.requested_reviewer_id IS DISTINCT FROM OLD.requested_reviewer_id
    OR NEW.request_reason IS DISTINCT FROM OLD.request_reason
    OR NEW.requested_at IS DISTINCT FROM OLD.requested_at
    OR NEW.expires_at IS DISTINCT FROM OLD.expires_at
    OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'approval request scope is immutable; create a new request instead';
  END IF;

  IF NEW.status IN (
    'approved'::public.revenue_approval_status,
    'rejected'::public.revenue_approval_status
  ) THEN
    IF NEW.reviewer_id IS NULL OR NEW.decided_at IS NULL THEN
      RAISE EXCEPTION 'an approval decision requires reviewer_id and decided_at';
    END IF;
    IF NEW.decided_at >= NEW.expires_at THEN
      RAISE EXCEPTION 'an approval cannot be decided at or after its expiry';
    END IF;
  ELSIF NEW.status = 'cancelled'::public.revenue_approval_status THEN
    IF NEW.reviewer_id IS NOT NULL
      OR NEW.decided_at IS NOT NULL
      OR NEW.decision_reason IS NOT NULL THEN
      RAISE EXCEPTION 'a cancelled approval cannot contain a reviewer decision';
    END IF;
  ELSE
    RAISE EXCEPTION 'pending approvals may only be approved, rejected, or cancelled';
  END IF;

  RETURN NEW;
END;
$$;

-- At creation, snapshot the exact playbook and score context being approved.
-- The frozen context remains valid as historical evidence even if a later
-- playbook or score implementation changes; an activation guard verifies the
-- referenced run/opportunity relationship before any live handoff.
CREATE OR REPLACE FUNCTION public.revenue_validate_approval_context()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NOT EXISTS (
      SELECT 1
      FROM public.revenue_play_runs AS run
      INNER JOIN public.revenue_playbooks AS playbook
        ON playbook.workspace_id = run.workspace_id
        AND playbook.id = run.playbook_id
      WHERE run.workspace_id = NEW.workspace_id
        AND run.id = NEW.play_run_id
        AND run.opportunity_id = NEW.opportunity_id
        AND run.playbook_id = NEW.playbook_id
        AND playbook.version = NEW.playbook_version
    ) THEN
      RAISE EXCEPTION 'approval must freeze the current playbook and a run for the same opportunity';
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM public.revenue_score_snapshots AS snapshot
      WHERE snapshot.workspace_id = NEW.workspace_id
        AND snapshot.id = NEW.score_snapshot_id
        AND snapshot.opportunity_id = NEW.opportunity_id
        AND snapshot.algorithm_version = NEW.score_algorithm_version
        AND snapshot.input_hash IS NOT DISTINCT FROM NEW.score_input_hash
    ) THEN
      RAISE EXCEPTION 'approval score metadata must match an opportunity score snapshot';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- A live activation needs an approved decision that applies to the same play
-- run and opportunity. The trigger applies even to trusted service-role writes;
-- RLS separately prevents browser clients from making a live activation.
CREATE OR REPLACE FUNCTION public.revenue_enforce_activation_guard()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.dry_run THEN
    IF NEW.status NOT IN (
      'dry_run'::public.revenue_activation_status,
      'ready'::public.revenue_activation_status,
      'failed'::public.revenue_activation_status,
      'cancelled'::public.revenue_activation_status
    ) THEN
      RAISE EXCEPTION 'a dry-run activation cannot be marked as %', NEW.status;
    END IF;
  ELSE
    IF NEW.approval_id IS NULL THEN
      RAISE EXCEPTION 'a live activation requires an approved approval record';
    END IF;

    IF NEW.request_preview = '{}'::jsonb
      OR NEW.request_payload_hash IS NULL
      OR char_length(btrim(NEW.request_payload_hash)) < 16 THEN
      RAISE EXCEPTION 'a live activation requires a non-empty canonical request preview and payload hash';
    END IF;

    IF NEW.status NOT IN (
      'ready'::public.revenue_activation_status,
      'sent'::public.revenue_activation_status,
      'succeeded'::public.revenue_activation_status,
      'failed'::public.revenue_activation_status,
      'cancelled'::public.revenue_activation_status
    ) THEN
      RAISE EXCEPTION 'a live activation cannot be marked as %', NEW.status;
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM public.revenue_approvals AS approval
      INNER JOIN public.revenue_play_runs AS run
        ON run.workspace_id = approval.workspace_id
        AND run.id = approval.play_run_id
      INNER JOIN public.revenue_score_snapshots AS snapshot
        ON snapshot.workspace_id = approval.workspace_id
        AND snapshot.id = approval.score_snapshot_id
      WHERE approval.id = NEW.approval_id
        AND approval.workspace_id = NEW.workspace_id
        AND approval.opportunity_id = NEW.opportunity_id
        AND approval.play_run_id = NEW.play_run_id
        AND approval.status = 'approved'::public.revenue_approval_status
        AND approval.expires_at > now()
        AND jsonb_typeof(approval.action_context) = 'object'
        AND approval.action_context <> '{}'::jsonb
        AND char_length(btrim(approval.payload_hash)) >= 16
        AND approval.payload_hash = NEW.request_payload_hash
        AND run.opportunity_id = approval.opportunity_id
        AND run.playbook_id = approval.playbook_id
        AND snapshot.opportunity_id = approval.opportunity_id
        AND snapshot.algorithm_version = approval.score_algorithm_version
        AND snapshot.input_hash IS NOT DISTINCT FROM approval.score_input_hash
    ) THEN
      RAISE EXCEPTION 'activation must retain an unexpired approval and exact frozen playbook, score, action context, and payload hash';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revenue_changed_columns(old_row JSONB, new_row JSONB)
RETURNS TEXT[]
LANGUAGE sql
IMMUTABLE
SET search_path = public, pg_temp
AS $$
  SELECT COALESCE(array_agg(keys.key ORDER BY keys.key), ARRAY[]::TEXT[])
  FROM jsonb_object_keys(old_row || new_row) AS keys(key)
  WHERE old_row -> keys.key IS DISTINCT FROM new_row -> keys.key;
$$;

-- The audit event stores record identity and changed field names, not a copy of
-- customer payloads. Sensitive evidence stays in its source table and follows
-- the workspace's retention/redaction controls.
CREATE OR REPLACE FUNCTION public.revenue_write_audit_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  event_workspace_id UUID;
  event_entity_id UUID;
  changed_fields TEXT[];
BEGIN
  IF TG_OP = 'INSERT' THEN
    event_workspace_id := NEW.workspace_id;
    event_entity_id := NEW.id;
    changed_fields := public.revenue_changed_columns('{}'::jsonb, to_jsonb(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    event_workspace_id := NEW.workspace_id;
    event_entity_id := NEW.id;
    changed_fields := public.revenue_changed_columns(to_jsonb(OLD), to_jsonb(NEW));
  ELSE
    event_workspace_id := OLD.workspace_id;
    event_entity_id := OLD.id;
    changed_fields := public.revenue_changed_columns(to_jsonb(OLD), '{}'::jsonb);
  END IF;

  INSERT INTO public.revenue_audit_events (
    workspace_id,
    actor_id,
    actor_kind,
    entity_type,
    entity_id,
    action,
    metadata
  )
  VALUES (
    event_workspace_id,
    auth.uid(),
    CASE WHEN auth.uid() IS NULL THEN 'system' ELSE 'user' END,
    TG_TABLE_NAME,
    event_entity_id,
    lower(TG_OP),
    jsonb_build_object('changed_fields', to_jsonb(changed_fields))
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$;

-- Bootstrap and immutable membership safeguards.
DROP TRIGGER IF EXISTS revenue_organizations_bootstrap_workspace
  ON public.revenue_organizations;
CREATE TRIGGER revenue_organizations_bootstrap_workspace
  AFTER INSERT ON public.revenue_organizations
  FOR EACH ROW EXECUTE FUNCTION public.revenue_bootstrap_workspace_for_organization();

DROP TRIGGER IF EXISTS revenue_workspaces_grant_creator_owner
  ON public.revenue_workspaces;
CREATE TRIGGER revenue_workspaces_grant_creator_owner
  AFTER INSERT ON public.revenue_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.revenue_grant_workspace_creator_owner();

DROP TRIGGER IF EXISTS revenue_workspace_members_protect_owner
  ON public.revenue_workspace_members;
CREATE TRIGGER revenue_workspace_members_protect_owner
  BEFORE UPDATE OR DELETE ON public.revenue_workspace_members
  FOR EACH ROW EXECUTE FUNCTION public.revenue_protect_workspace_membership();

DROP TRIGGER IF EXISTS revenue_organizations_protect_scope
  ON public.revenue_organizations;
CREATE TRIGGER revenue_organizations_protect_scope
  BEFORE UPDATE ON public.revenue_organizations
  FOR EACH ROW EXECUTE FUNCTION public.revenue_protect_organization_scope();

DROP TRIGGER IF EXISTS revenue_workspaces_protect_tenant
  ON public.revenue_workspaces;
CREATE TRIGGER revenue_workspaces_protect_tenant
  BEFORE UPDATE ON public.revenue_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.revenue_protect_workspace_tenant();

DO $$
DECLARE
  scoped_table TEXT;
BEGIN
  FOREACH scoped_table IN ARRAY ARRAY[
    'revenue_sources',
    'revenue_accounts',
    'revenue_evidence',
    'revenue_signal_groups',
    'revenue_signals',
    'revenue_market_slices',
    'revenue_opportunities',
    'revenue_score_snapshots',
    'revenue_playbooks',
    'revenue_play_runs',
    'revenue_approvals',
    'revenue_activations',
    'revenue_outcomes',
    'revenue_initiatives'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS revenue_protect_workspace_scope ON public.%I', scoped_table);
    EXECUTE format(
      'CREATE TRIGGER revenue_protect_workspace_scope BEFORE UPDATE ON public.%I '
      || 'FOR EACH ROW EXECUTE FUNCTION public.revenue_protect_workspace_scope()',
      scoped_table
    );
  END LOOP;
END
$$;

DROP TRIGGER IF EXISTS revenue_approvals_protect_decision ON public.revenue_approvals;
CREATE TRIGGER revenue_approvals_protect_decision
  BEFORE UPDATE ON public.revenue_approvals
  FOR EACH ROW EXECUTE FUNCTION public.revenue_protect_approval_decision();

DROP TRIGGER IF EXISTS revenue_approvals_validate_context ON public.revenue_approvals;
CREATE TRIGGER revenue_approvals_validate_context
  BEFORE INSERT OR UPDATE ON public.revenue_approvals
  FOR EACH ROW EXECUTE FUNCTION public.revenue_validate_approval_context();

DROP TRIGGER IF EXISTS revenue_activations_enforce_guard
  ON public.revenue_activations;
CREATE TRIGGER revenue_activations_enforce_guard
  BEFORE INSERT OR UPDATE ON public.revenue_activations
  FOR EACH ROW EXECUTE FUNCTION public.revenue_enforce_activation_guard();

-- Standard `updated_at` maintenance for records without optimistic versions.
DROP TRIGGER IF EXISTS revenue_organizations_touch_updated_at
  ON public.revenue_organizations;
CREATE TRIGGER revenue_organizations_touch_updated_at
  BEFORE UPDATE ON public.revenue_organizations
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_updated_at();

DROP TRIGGER IF EXISTS revenue_workspaces_touch_updated_at
  ON public.revenue_workspaces;
CREATE TRIGGER revenue_workspaces_touch_updated_at
  BEFORE UPDATE ON public.revenue_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_updated_at();

DROP TRIGGER IF EXISTS revenue_workspace_members_touch_updated_at
  ON public.revenue_workspace_members;
CREATE TRIGGER revenue_workspace_members_touch_updated_at
  BEFORE UPDATE ON public.revenue_workspace_members
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_updated_at();

-- Versioned records use optimistic concurrency. Application writes should
-- include the expected `version` and retry if an update affects zero rows.
DROP TRIGGER IF EXISTS revenue_sources_touch_version ON public.revenue_sources;
CREATE TRIGGER revenue_sources_touch_version
  BEFORE UPDATE ON public.revenue_sources
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_accounts_touch_version ON public.revenue_accounts;
CREATE TRIGGER revenue_accounts_touch_version
  BEFORE UPDATE ON public.revenue_accounts
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_evidence_touch_version ON public.revenue_evidence;
CREATE TRIGGER revenue_evidence_touch_version
  BEFORE UPDATE ON public.revenue_evidence
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_signal_groups_touch_version ON public.revenue_signal_groups;
CREATE TRIGGER revenue_signal_groups_touch_version
  BEFORE UPDATE ON public.revenue_signal_groups
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_signals_touch_version ON public.revenue_signals;
CREATE TRIGGER revenue_signals_touch_version
  BEFORE UPDATE ON public.revenue_signals
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_market_slices_touch_version ON public.revenue_market_slices;
CREATE TRIGGER revenue_market_slices_touch_version
  BEFORE UPDATE ON public.revenue_market_slices
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_opportunities_touch_version ON public.revenue_opportunities;
CREATE TRIGGER revenue_opportunities_touch_version
  BEFORE UPDATE ON public.revenue_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_playbooks_touch_version ON public.revenue_playbooks;
CREATE TRIGGER revenue_playbooks_touch_version
  BEFORE UPDATE ON public.revenue_playbooks
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_play_runs_touch_version ON public.revenue_play_runs;
CREATE TRIGGER revenue_play_runs_touch_version
  BEFORE UPDATE ON public.revenue_play_runs
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_approvals_touch_version ON public.revenue_approvals;
CREATE TRIGGER revenue_approvals_touch_version
  BEFORE UPDATE ON public.revenue_approvals
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_activations_touch_version ON public.revenue_activations;
CREATE TRIGGER revenue_activations_touch_version
  BEFORE UPDATE ON public.revenue_activations
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_outcomes_touch_version ON public.revenue_outcomes;
CREATE TRIGGER revenue_outcomes_touch_version
  BEFORE UPDATE ON public.revenue_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

DROP TRIGGER IF EXISTS revenue_initiatives_touch_version ON public.revenue_initiatives;
CREATE TRIGGER revenue_initiatives_touch_version
  BEFORE UPDATE ON public.revenue_initiatives
  FOR EACH ROW EXECUTE FUNCTION public.revenue_touch_version();

-- Audit the high-value state changes. There is intentionally no audit trigger
-- on `revenue_audit_events` itself.
DO $$
DECLARE
  audited_table TEXT;
BEGIN
  FOREACH audited_table IN ARRAY ARRAY[
    'revenue_workspace_members',
    'revenue_sources',
    'revenue_accounts',
    'revenue_evidence',
    'revenue_signal_groups',
    'revenue_signals',
    'revenue_market_slices',
    'revenue_opportunities',
    'revenue_score_snapshots',
    'revenue_playbooks',
    'revenue_play_runs',
    'revenue_approvals',
    'revenue_activations',
    'revenue_outcomes',
    'revenue_initiatives'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS revenue_audit_change ON public.%I', audited_table);
    EXECUTE format(
      'CREATE TRIGGER revenue_audit_change AFTER INSERT OR UPDATE OR DELETE ON public.%I '
      || 'FOR EACH ROW EXECUTE FUNCTION public.revenue_write_audit_event()',
      audited_table
    );
  END LOOP;
END
$$;

-- ---------------------------------------------------------------------------
-- RLS and least-privilege data access
-- ---------------------------------------------------------------------------

ALTER TABLE public.revenue_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_signal_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_market_slices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_score_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_play_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_audit_events ENABLE ROW LEVEL SECURITY;

-- No anonymous role can access Revenue Ops data. Service role retains database
-- access for reviewed server-side jobs; browser clients use authenticated RLS.
REVOKE ALL ON TABLE
  public.revenue_organizations,
  public.revenue_workspaces,
  public.revenue_workspace_members,
  public.revenue_sources,
  public.revenue_accounts,
  public.revenue_evidence,
  public.revenue_signal_groups,
  public.revenue_signals,
  public.revenue_market_slices,
  public.revenue_opportunities,
  public.revenue_score_snapshots,
  public.revenue_playbooks,
  public.revenue_play_runs,
  public.revenue_approvals,
  public.revenue_activations,
  public.revenue_outcomes,
  public.revenue_initiatives,
  public.revenue_audit_events
FROM anon;

GRANT SELECT, INSERT, UPDATE ON TABLE
  public.revenue_organizations,
  public.revenue_workspaces,
  public.revenue_workspace_members,
  public.revenue_sources,
  public.revenue_accounts,
  public.revenue_evidence,
  public.revenue_signal_groups,
  public.revenue_signals,
  public.revenue_market_slices,
  public.revenue_opportunities,
  public.revenue_score_snapshots,
  public.revenue_playbooks,
  public.revenue_play_runs,
  public.revenue_approvals,
  public.revenue_activations,
  public.revenue_outcomes,
  public.revenue_initiatives
TO authenticated;
GRANT DELETE ON TABLE public.revenue_workspace_members TO authenticated;
GRANT SELECT ON TABLE public.revenue_audit_events TO authenticated;
GRANT ALL ON TABLE
  public.revenue_organizations,
  public.revenue_workspaces,
  public.revenue_workspace_members,
  public.revenue_sources,
  public.revenue_accounts,
  public.revenue_evidence,
  public.revenue_signal_groups,
  public.revenue_signals,
  public.revenue_market_slices,
  public.revenue_opportunities,
  public.revenue_score_snapshots,
  public.revenue_playbooks,
  public.revenue_play_runs,
  public.revenue_approvals,
  public.revenue_activations,
  public.revenue_outcomes,
  public.revenue_initiatives,
  public.revenue_audit_events
TO service_role;

-- Organization and workspace bootstrap.
DROP POLICY IF EXISTS revenue_organizations_select ON public.revenue_organizations;
CREATE POLICY revenue_organizations_select ON public.revenue_organizations
  FOR SELECT TO authenticated
  USING (
    created_by = auth.uid()
    OR public.revenue_is_organization_member(id)
  );

DROP POLICY IF EXISTS revenue_organizations_insert ON public.revenue_organizations;
CREATE POLICY revenue_organizations_insert ON public.revenue_organizations
  FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS revenue_organizations_update ON public.revenue_organizations;
CREATE POLICY revenue_organizations_update ON public.revenue_organizations
  FOR UPDATE TO authenticated
  USING (public.revenue_is_organization_admin(id))
  WITH CHECK (public.revenue_is_organization_admin(id));

DROP POLICY IF EXISTS revenue_workspaces_select ON public.revenue_workspaces;
CREATE POLICY revenue_workspaces_select ON public.revenue_workspaces
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(id));

DROP POLICY IF EXISTS revenue_workspaces_insert ON public.revenue_workspaces;
CREATE POLICY revenue_workspaces_insert ON public.revenue_workspaces
  FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND public.revenue_is_organization_admin(organization_id)
  );

DROP POLICY IF EXISTS revenue_workspaces_update ON public.revenue_workspaces;
CREATE POLICY revenue_workspaces_update ON public.revenue_workspaces
  FOR UPDATE TO authenticated
  USING (public.revenue_is_workspace_admin(id))
  WITH CHECK (public.revenue_is_workspace_admin(id));

-- Membership administration: owners can manage every role; admins cannot
-- create, modify, or delete an owner record. A trigger prevents last-owner loss.
DROP POLICY IF EXISTS revenue_workspace_members_select ON public.revenue_workspace_members;
CREATE POLICY revenue_workspace_members_select ON public.revenue_workspace_members
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS revenue_workspace_members_insert ON public.revenue_workspace_members;
CREATE POLICY revenue_workspace_members_insert ON public.revenue_workspace_members
  FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND (
      public.revenue_is_workspace_owner(workspace_id)
      OR (
        public.revenue_is_workspace_admin(workspace_id)
        AND role <> 'owner'::public.revenue_workspace_member_role
      )
    )
  );

DROP POLICY IF EXISTS revenue_workspace_members_update ON public.revenue_workspace_members;
CREATE POLICY revenue_workspace_members_update ON public.revenue_workspace_members
  FOR UPDATE TO authenticated
  USING (
    public.revenue_is_workspace_owner(workspace_id)
    OR (
      public.revenue_is_workspace_admin(workspace_id)
      AND role <> 'owner'::public.revenue_workspace_member_role
    )
  )
  WITH CHECK (
    public.revenue_is_workspace_owner(workspace_id)
    OR (
      public.revenue_is_workspace_admin(workspace_id)
      AND role <> 'owner'::public.revenue_workspace_member_role
    )
  );

DROP POLICY IF EXISTS revenue_workspace_members_delete ON public.revenue_workspace_members;
CREATE POLICY revenue_workspace_members_delete ON public.revenue_workspace_members
  FOR DELETE TO authenticated
  USING (
    public.revenue_is_workspace_owner(workspace_id)
    OR (
      public.revenue_is_workspace_admin(workspace_id)
      AND role <> 'owner'::public.revenue_workspace_member_role
    )
  );

-- Standard workspace reads and operator writes. No DELETE policy or DELETE
-- grant exists for retained Revenue Ops records; use an explicit retention or
-- redaction workflow instead of hard-deleting operational history.
DO $$
DECLARE
  managed_table TEXT;
BEGIN
  FOREACH managed_table IN ARRAY ARRAY[
    'revenue_sources',
    'revenue_accounts',
    'revenue_evidence',
    'revenue_signal_groups',
    'revenue_signals',
    'revenue_market_slices',
    'revenue_opportunities',
    'revenue_playbooks',
    'revenue_play_runs',
    'revenue_outcomes',
    'revenue_initiatives'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS revenue_workspace_select ON public.%I', managed_table);
    EXECUTE format(
      'CREATE POLICY revenue_workspace_select ON public.%I FOR SELECT TO authenticated '
      || 'USING (public.revenue_is_workspace_member(workspace_id))',
      managed_table
    );
    EXECUTE format('DROP POLICY IF EXISTS revenue_workspace_insert ON public.%I', managed_table);
    EXECUTE format(
      'CREATE POLICY revenue_workspace_insert ON public.%I FOR INSERT TO authenticated '
      || 'WITH CHECK (public.revenue_can_operate_workspace(workspace_id))',
      managed_table
    );
    EXECUTE format('DROP POLICY IF EXISTS revenue_workspace_update ON public.%I', managed_table);
    EXECUTE format(
      'CREATE POLICY revenue_workspace_update ON public.%I FOR UPDATE TO authenticated '
      || 'USING (public.revenue_can_operate_workspace(workspace_id)) '
      || 'WITH CHECK (public.revenue_can_operate_workspace(workspace_id))',
      managed_table
    );
  END LOOP;
END
$$;

-- Score snapshots are append-only inputs to explainable scoring. They are not
-- editable by browser clients once recorded.
DROP POLICY IF EXISTS revenue_score_snapshots_select ON public.revenue_score_snapshots;
CREATE POLICY revenue_score_snapshots_select ON public.revenue_score_snapshots
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS revenue_score_snapshots_insert ON public.revenue_score_snapshots;
CREATE POLICY revenue_score_snapshots_insert ON public.revenue_score_snapshots
  FOR INSERT TO authenticated
  WITH CHECK (public.revenue_can_operate_workspace(workspace_id));

-- Operators request a pending approval; only a reviewer, administrator, or
-- owner can decide it. Both paths are append-preserving (no client deletion).
DROP POLICY IF EXISTS revenue_approvals_select ON public.revenue_approvals;
CREATE POLICY revenue_approvals_select ON public.revenue_approvals
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS revenue_approvals_insert ON public.revenue_approvals;
CREATE POLICY revenue_approvals_insert ON public.revenue_approvals
  FOR INSERT TO authenticated
  WITH CHECK (
    public.revenue_can_operate_workspace(workspace_id)
    AND requested_by = auth.uid()
    AND reviewer_id IS NULL
    AND decided_at IS NULL
    AND decision_reason IS NULL
    AND status = 'pending'::public.revenue_approval_status
  );

DROP POLICY IF EXISTS revenue_approvals_reviewer_decide ON public.revenue_approvals;
CREATE POLICY revenue_approvals_reviewer_decide ON public.revenue_approvals
  FOR UPDATE TO authenticated
  USING (
    status = 'pending'::public.revenue_approval_status
    AND public.revenue_can_review_workspace(workspace_id)
  )
  WITH CHECK (
    public.revenue_can_review_workspace(workspace_id)
    AND reviewer_id = auth.uid()
    AND status IN (
      'approved'::public.revenue_approval_status,
      'rejected'::public.revenue_approval_status
    )
    AND decided_at IS NOT NULL
  );

DROP POLICY IF EXISTS revenue_approvals_requester_cancel ON public.revenue_approvals;
CREATE POLICY revenue_approvals_requester_cancel ON public.revenue_approvals
  FOR UPDATE TO authenticated
  USING (
    status = 'pending'::public.revenue_approval_status
    AND requested_by = auth.uid()
  )
  WITH CHECK (
    requested_by = auth.uid()
    AND reviewer_id IS NULL
    AND decided_at IS NULL
    AND decision_reason IS NULL
    AND status = 'cancelled'::public.revenue_approval_status
  );

-- Client-side activation records are previews only. A trusted server adapter
-- may use service_role to create a non-dry-run record, but the activation guard
-- trigger above still requires a matching approved decision.
DROP POLICY IF EXISTS revenue_activations_select ON public.revenue_activations;
CREATE POLICY revenue_activations_select ON public.revenue_activations
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS revenue_activations_insert_dry_run ON public.revenue_activations;
CREATE POLICY revenue_activations_insert_dry_run ON public.revenue_activations
  FOR INSERT TO authenticated
  WITH CHECK (
    public.revenue_can_operate_workspace(workspace_id)
    AND dry_run IS TRUE
    AND status IN (
      'dry_run'::public.revenue_activation_status,
      'ready'::public.revenue_activation_status
    )
  );

DROP POLICY IF EXISTS revenue_activations_update_dry_run ON public.revenue_activations;
CREATE POLICY revenue_activations_update_dry_run ON public.revenue_activations
  FOR UPDATE TO authenticated
  USING (
    public.revenue_can_operate_workspace(workspace_id)
    AND dry_run IS TRUE
  )
  WITH CHECK (
    public.revenue_can_operate_workspace(workspace_id)
    AND dry_run IS TRUE
    AND status IN (
      'dry_run'::public.revenue_activation_status,
      'ready'::public.revenue_activation_status,
      'failed'::public.revenue_activation_status,
      'cancelled'::public.revenue_activation_status
    )
  );

-- Audit events are immutable for browser clients. The security-definer trigger
-- records retained changes; members can read only their own workspace history.
DROP POLICY IF EXISTS revenue_audit_events_select ON public.revenue_audit_events;
CREATE POLICY revenue_audit_events_select ON public.revenue_audit_events
  FOR SELECT TO authenticated
  USING (public.revenue_is_workspace_member(workspace_id));

-- Schema documentation available in the Supabase dashboard.
COMMENT ON TABLE public.revenue_organizations IS
  'Revenue Ops tenant grouping. Inserting one organization bootstraps a primary workspace and owner membership.';
COMMENT ON TABLE public.revenue_sources IS
  'Connector metadata only. Store vault references in connection_ref; never store API keys, refresh tokens, or raw secrets.';
COMMENT ON TABLE public.revenue_evidence IS
  'Source-backed evidence with freshness, classification, retention, and redaction fields.';
COMMENT ON TABLE public.revenue_score_snapshots IS
  'Append-only explainable score inputs and outputs for an opportunity.';
COMMENT ON TABLE public.revenue_approvals IS
  'Human decision with frozen playbook, score, action-context, and payload-hash metadata. A live activation needs an unexpired approved matching record.';
COMMENT ON TABLE public.revenue_activations IS
  'Idempotent activation/handoff record. Authenticated clients are restricted to dry-run entries by RLS.';
COMMENT ON TABLE public.revenue_audit_events IS
  'Append-only audit metadata. Trigger records changed field names, not copied evidence payloads.';

COMMIT;
