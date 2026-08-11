-- Opt-in hardening for an existing ClearForge Supabase project.
--
-- Review in the Supabase SQL editor before applying. This script does not run
-- automatically and intentionally removes anonymous/authenticated access to
-- lead and analytics data. Current application writes use the service-role
-- client on the server, which bypasses RLS.

BEGIN;

ALTER TABLE IF EXISTS assessment_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON assessment_leads;
REVOKE ALL ON TABLE assessment_leads FROM anon, authenticated;

ALTER TABLE IF EXISTS analytics_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON analytics_events;
REVOKE ALL ON TABLE analytics_events FROM anon, authenticated;

COMMIT;
