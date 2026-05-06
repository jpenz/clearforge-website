import { Resend } from 'resend';

let resendClient: Resend | null | undefined;

export function getResendClient(): Resend | null {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  resendClient = apiKey ? new Resend(apiKey) : null;
  return resendClient;
}

export function getLeadRecipients(): string[] {
  const recipients = process.env.CLEARFORGE_LEAD_EMAIL?.split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  return recipients?.length ? recipients : ['james@clearforge.ai'];
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function markdownToEmailHtml(markdown: string): string {
  const safe = escapeHtml(markdown);

  return safe
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith('## ')) {
        return `<h2 style="font-size:18px;line-height:1.3;margin:24px 0 10px;color:#0f172a;">${block.slice(3)}</h2>`;
      }

      if (block.startsWith('### ')) {
        return `<h3 style="font-size:15px;line-height:1.4;margin:18px 0 8px;color:#0f172a;">${block.slice(4)}</h3>`;
      }

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .filter((line) => line.startsWith('- '))
          .map((line) => `<li style="margin:4px 0;">${line.slice(2)}</li>`)
          .join('');
        return `<ul style="padding-left:20px;color:#334155;line-height:1.65;">${items}</ul>`;
      }

      return `<p style="margin:10px 0;color:#334155;line-height:1.75;">${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
}
