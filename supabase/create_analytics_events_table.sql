-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Creates a lightweight event table for conversion analytics and attribution

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_id TEXT,
  session_id TEXT,
  path TEXT,
  url TEXT,
  title TEXT,
  referrer TEXT,
  landing_page TEXT,
  attribution JSONB DEFAULT '{}',
  properties JSONB DEFAULT '{}',
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- The public website uses the server-side service role client for writes.
-- Service-role requests bypass RLS, so do not add an open policy here: an
-- `USING (true)` policy could expose analytics records to anon/authenticated roles.
DROP POLICY IF EXISTS "service_role_all" ON analytics_events;
REVOKE ALL ON TABLE analytics_events FROM anon, authenticated;

-- Indexes for funnel, campaign, and page-performance analysis
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON analytics_events(path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_landing_page ON analytics_events(landing_page);
CREATE INDEX IF NOT EXISTS idx_analytics_events_attribution ON analytics_events USING GIN(attribution);
