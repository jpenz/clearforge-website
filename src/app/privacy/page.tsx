import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "ClearForge.ai privacy policy. How we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 prose-content">
        <h1 className="text-3xl font-bold text-text sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Privacy Policy</h1>
        <p className="mt-2 text-sm text-text-tertiary">Last updated: February 2025</p>

        <h2>Information We Collect</h2>
        <p>When you interact with ClearForge.ai, we may collect information you provide directly, such as your name, email address, company name, and message content when you submit our contact form or take the AI Readiness Scorecard.</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to respond to your inquiries, provide our services, improve our website, and communicate with you about our services. We do not sell your personal information to third parties.</p>

        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>Cookies</h2>
        <p>We use essential cookies to ensure our website functions properly. We may also use analytics cookies to understand how visitors interact with our website. You can control cookie settings through your browser preferences.</p>

        <h2>Third-Party Services</h2>
        <p>We may use third-party services for analytics and communication. These services have their own privacy policies governing the use of your information.</p>

        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You may also opt out of communications at any time. Contact us at hello@clearforge.ai for any privacy-related requests.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this privacy policy, please contact us at <a href="mailto:hello@clearforge.ai" className="text-teal hover:text-teal-light">hello@clearforge.ai</a>.</p>
      </div>
    </section>
  );
}
