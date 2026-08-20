import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ClearForge collects, uses, and protects your information.",
};

const SECTIONS: Array<{ heading: string; paragraphs: string[]; list?: string[] }> = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect information you provide directly to us, such as when you fill out a contact form, take the scorecard, or communicate with us by email. This may include your name, email address, company name, job title, and any other information you choose to provide.",
      "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our site.",
      "We may also collect website analytics events such as page views, campaign parameters, landing pages, scroll depth, button clicks, form submissions, and time-on-page signals so we can understand which content is useful and improve the site experience.",
    ],
  },
  {
    heading: "The diagnostic tools",
    paragraphs: [
      "When you enter a company website address into Forge Intelligence (on our homepage or at /discover), we fetch publicly available pages from that address and process the extracted text with AI model providers to generate your analysis.",
      "We store the inputs you provide together with the generated output, so we can deliver the result and follow up. We never fetch anything behind a login, and we rate-limit the tools to prevent abuse.",
      "Files you attach to the contact or project forms (RFPs, briefs, process documents) are stored in a private bucket, renamed to random identifiers, used only to respond to you, and deleted when no longer required.",
    ],
  },
  {
    heading: "Service providers we use",
    paragraphs: [
      "We share information only with the service providers that run this site, each bound by its own terms limiting use of your data:",
    ],
    list: [
      "Vercel: website hosting and delivery",
      "Supabase: secure storage of form and diagnostic submissions",
      "Anthropic: AI processing for the diagnostic tools, under enterprise API terms that exclude your data from model training",
      "Resend: transactional email delivery",
      "Cal.com: meeting scheduling when you book a call, under its own privacy policy",
      "Google Analytics: website analytics",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: ["We use the information we collect for these purposes:"],
    list: [
      "To respond to your inquiries and provide requested services",
      "To send you information about our services that may interest you",
      "To improve and optimize our website and services",
      "To comply with legal obligations",
      "To protect our rights, privacy, safety, or property",
    ],
  },
  {
    heading: "Information sharing",
    paragraphs: [
      "We do not sell, trade, or rent your personal information to third parties, and we do not use your information to train AI models. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential.",
    ],
  },
  {
    heading: "Data retention and your rights",
    paragraphs: [
      "We keep submissions for as long as needed to respond to you and operate the business, and we delete or anonymize them when no longer required. You can request a copy of the information we hold about you, ask us to correct it, or ask us to delete it at any time by emailing james@clearforge.ai. We respond within one business day. You may also opt out of marketing communications at any time.",
    ],
  },
  {
    heading: "Data security",
    paragraphs: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet or electronic storage is 100 percent secure.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use cookies and similar technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      "We may use privacy-conscious analytics tools, Google Analytics, first-party event tracking, and local or session storage to connect visits with campaign attribution and website conversion activity. These tools help us measure performance; they do not change the services we provide.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this privacy policy from time to time. We will notify you of changes by posting the new policy on this page and updating the last-updated date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageFrame aria-label="Privacy policy">
        <SectionBand left="Legal" right="Last updated August 2026" />
        <div className="px-5 py-10 md:px-10 md:py-14">
          <h1 className="font-display text-[clamp(28px,4vw,44px)] leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70">
            How ClearForge collects, uses, and protects your information.
          </p>
        </div>
      </PageFrame>

      <PageFrame bottomRule={false} aria-label="Privacy policy detail">
        <div className="max-w-3xl px-5 py-10 md:px-10">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="border-t border-hairline py-8 first:border-t-0 first:pt-0">
              <h2 className="text-[13px] font-semibold tracking-[0.14em] uppercase">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-ink/70">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                      <span aria-hidden="true" className="mt-[9px] size-[5px] shrink-0 bg-cobalt" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="border-t border-hairline pt-8 text-[15px] leading-relaxed text-ink/70">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:james@clearforge.ai" className="text-cobalt underline underline-offset-4">
              james@clearforge.ai
            </a>
            . See also the{" "}
            <Link href="/terms" className="text-cobalt underline underline-offset-4">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </PageFrame>
    </>
  );
}
