-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Creates the assessment_leads table for capturing website leads

CREATE TABLE IF NOT EXISTS assessment_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  challenge TEXT DEFAULT '',
  company_url TEXT,
  phone TEXT,
  composite_score SMALLINT DEFAULT 0,
  maturity_level TEXT DEFAULT '',
  pillar_scores JSONB DEFAULT '{}',
  suggested_solutions TEXT[] DEFAULT '{}',
  suggested_engagement TEXT DEFAULT '',
  closer_report TEXT DEFAULT '',
  company_research TEXT DEFAULT '',
  industry_best_in_class TEXT DEFAULT '',
  source TEXT NOT NULL DEFAULT 'assessment',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessment_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API routes use service role key)
CREATE POLICY "service_role_all" ON assessment_leads
  FOR ALL USING (true) WITH CHECK (true);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_assessment_leads_email ON assessment_leads(email);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_created_at ON assessment_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_source ON assessment_leads(source);
