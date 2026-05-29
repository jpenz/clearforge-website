import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ClearForge — AI Strategy & Execution for Mid-Market Companies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(145deg, #060B14 0%, #0A0F1A 50%, #111827 100%)',
        padding: '60px 80px',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00E5C3, #059E87, transparent)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '3px',
            background: '#00E5C3',
            borderRadius: '2px',
          }}
        />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: 0,
            textTransform: 'uppercase',
            color: '#00E5C3',
          }}
        >
          AI Strategy & Execution
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: '72px',
          fontWeight: 700,
          color: '#F1F5F9',
          lineHeight: 1.0,
          letterSpacing: 0,
          margin: 0,
          maxWidth: '800px',
        }}
      >
        ClearForge
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '24px',
          color: '#94A3B8',
          lineHeight: 1.5,
          marginTop: '20px',
          maxWidth: '600px',
        }}
      >
        One team from diagnosis to production. Strategy that ships. AI that performs.
      </p>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          position: 'absolute',
          bottom: '60px',
          left: '80px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            color: '#475569',
            fontWeight: 500,
          }}
        >
          clearforge.ai
        </span>
        <div style={{ width: '1px', height: '16px', background: '#334155' }} />
        <span style={{ fontSize: '16px', color: '#475569' }}>Mid-Market AI Transformation</span>
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background:
            'radial-gradient(circle at bottom right, rgba(0,229,195,0.08), transparent 70%)',
        }}
      />
    </div>,
    { ...size },
  );
}
