import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How ClearForge handles your data: named subprocessors, no training on your data, private storage, and an honest posture stated plainly.",
};

const SECTIONS: Array<{ heading: string; paragraphs: string[]; list?: string[] }> = [
  {
    heading: "The honest posture",
    paragraphs: [
      "ClearForge is a founder-led firm. We do not hold a SOC 2 certification today and we will not imply otherwise. What we do hold is a short, real list of practices, stated below so your security review can start from facts.",
    ],
  },
  {
    heading: "Where your data lives",
    paragraphs: [
      "Form submissions and diagnostic results are stored in Supabase with row-level security. The public site key can only read what the site needs; writes happen server-side with scoped credentials. Files you attach (RFPs, briefs) go to a private storage bucket with no public URLs, renamed to random identifiers, size-capped, and restricted to document types.",
    ],
  },
  {
    heading: "AI processing",
    paragraphs: [
      "The diagnostic tools process the text you submit and publicly available pages from the address you provide. We use enterprise API terms with our model providers that exclude your data from model training. We never fetch anything behind a login.",
    ],
  },
  {
    heading: "Subprocessors",
    paragraphs: ["The services that run this site, each bound by its own terms:"],
    list: [
      "Vercel: hosting and delivery",
      "Supabase: storage of submissions and attached files",
      "Anthropic: AI processing, enterprise API terms, no training on your data",
      "Resend: transactional email",
      "Cal.com: scheduling, under its own privacy policy",
      "Google Analytics: website analytics",
    ],
  },
  {
    heading: "Client engagements",
    paragraphs: [
      "Engagement work runs in your systems wherever possible, under your access controls. Credentials we hold are scoped to the minimum, stored in a password manager, and revoked at engagement end. Client data, processes, and engagement details are never disclosed without written consent; published case studies are anonymized and client-approved.",
      "A data processing agreement is available on request, and we will complete your vendor security questionnaire as part of any engagement.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageFrame aria-label="Security">
        <SectionBand left="Security" right="Stated plainly" />
        <div className="px-5 py-10 md:px-10 md:py-14">
          <h1 className="font-display text-[clamp(28px,4vw,44px)] leading-tight">
            Security and data handling
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70">
            What we store, where it goes, and what we never do. Written for
            the person running vendor diligence.
          </p>
        </div>
      </PageFrame>

      <PageFrame bottomRule={false} aria-label="Security detail">
        <div className="max-w-3xl px-5 py-10 md:px-10">
          {SECTIONS.map((section) => (
            <section
              key={section.heading}
              className="border-t border-hairline py-8 first:border-t-0 first:pt-0"
            >
              <h2 className="text-[13px] font-semibold tracking-[0.14em] uppercase">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 text-[15px] leading-relaxed text-ink/70"
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-relaxed text-ink/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] size-[5px] shrink-0 bg-cobalt"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="border-t border-hairline pt-8 text-[15px] leading-relaxed text-ink/70">
            Questions, or a questionnaire to complete? Email{" "}
            <a
              href="mailto:james@clearforge.ai"
              className="text-cobalt underline underline-offset-4"
            >
              james@clearforge.ai
            </a>{" "}
            or read the{" "}
            <Link href="/privacy" className="text-cobalt underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </PageFrame>
    </>
  );
}
