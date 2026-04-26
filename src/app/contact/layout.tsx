import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Contact ClearForge — Book a 15-Min Diagnostic Call',
  description:
    'Get in touch with ClearForge to discuss your AI transformation. Schedule a confidential discussion with our senior team.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
