import { NextResponse } from 'next/server';

/**
 * GET /api/health-check
 *
 * Public endpoint for uptime monitoring and deployment verification.
 * Returns the current timestamp, Node.js runtime version, and deployment environment.
 *
 * Example response:
 * {
 *   "timestamp": "2025-01-15T12:00:00.000Z",
 *   "nodeVersion": "v20.11.0",
 *   "environment": "production"
 * }
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV ?? 'development',
    },
    { status: 200 },
  );
}
