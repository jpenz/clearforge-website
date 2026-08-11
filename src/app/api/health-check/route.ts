import { NextResponse } from 'next/server';

/**
 * GET /api/health-check
 *
 * Public endpoint for uptime monitoring and deployment verification.
 * Returns only a liveness signal. Runtime and deployment metadata belong in
 * authenticated observability tooling, not a public endpoint.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true }, { status: 200 });
}
