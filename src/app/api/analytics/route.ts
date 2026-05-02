import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isRateLimited } from '@/lib/rate-limit';
import { saveAnalyticsEvent } from '@/lib/supabase';

const jsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ]),
);

const analyticsEventSchema = z.object({
  name: z.string().min(1).max(120),
  event_id: z.string().max(120).optional(),
  session_id: z.string().max(140).optional(),
  timestamp: z.string().datetime().optional(),
  page_path: z.string().max(700).optional(),
  page_url: z.string().url().max(1200).optional(),
  page_title: z.string().max(300).optional(),
  referrer: z.string().max(1200).optional(),
  landing_page: z.string().max(700).optional(),
  attribution: z.record(z.string(), jsonValueSchema).optional(),
  properties: z.record(z.string(), jsonValueSchema).optional(),
});

export async function POST(request: Request) {
  if (isRateLimited(request.headers, 'analytics-event', 400, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: true, stored: false }, { status: 202 });
  }

  try {
    const payload = analyticsEventSchema.parse(await request.json());
    const stored = await saveAnalyticsEvent({
      event_name: payload.name,
      event_id: payload.event_id,
      session_id: payload.session_id,
      path: payload.page_path,
      url: payload.page_url,
      title: payload.page_title,
      referrer: payload.referrer,
      landing_page: payload.landing_page,
      attribution: payload.attribution,
      properties: payload.properties,
      user_agent: request.headers.get('user-agent') ?? undefined,
      created_at: payload.timestamp ?? new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, stored }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
