import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: '#060B14',
        borderRadius: '36px',
      }}
    >
      <svg
        aria-label="ClearForge icon"
        role="img"
        viewBox="0 0 32 32"
        fill="none"
        width="120"
        height="120"
      >
        <path d="M8 22V10l4-2v16l-4-2Z" fill="#00E5C3" opacity="0.9" />
        <path d="M14 20V12l4-2v12l-4-2Z" fill="#00E5C3" opacity="0.7" />
        <path d="M20 18V14l4-2v8l-4-2Z" fill="#00E5C3" opacity="0.5" />
      </svg>
    </div>,
    { ...size },
  );
}
