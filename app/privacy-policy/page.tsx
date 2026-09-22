import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "We are uncompromising about trust, respect and integrity and process your Personal Data in accordance with the following principles.",
};

const SECTIONS = [
  {
    title: "Collection of Your Personal Data",
    body: "The types of Personal Data we collect about you depend on how you interact with us. “Personal Data” refers to data that identifies, relates to, describes, or can be associated with you. The following are categories and specific types of Personal Data we may collect about you.",
  },
  {
    title: "How We Collect Your Personal Data",
    body: "We may use the information we collect from you for various purposes, including:",
    list: [
      "When you purchase our services, register for an account",
      "Personalizing your experience on our website",
      "Communicating with you about your account and any updates or promotions",
      "Analyzing website traffic and user behavior to enhance our offerings",
    ],
  },
  {
    title: "Legal Basis of Processing Your Personal Data",
    body: "We take data security seriously and employ industry-standard measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Linking to Third Party Sites",
    body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided that they agree to keep your information confidential.",
  },
  {
    title: "Cookies",
    body: "Our website may use cookies to enhance your browsing experience and collect information about how you interact with our site. You can adjust your browser settings to refuse cookies or alert you when cookies are being sent, but some features of the site may not function properly without cookies.",
  },
  {
    title: "Security and Retention",
    body: "We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this Privacy Policy periodically for any updates.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Updated on Sep 13 2026"
        title="Privacy Policy"
        lead="We are uncompromising about trust, respect and integrity and process your Personal Data in accordance with the following principles."
      />

      <section className="bg-ink pb-[120px]">
        <div className="container-page flex flex-col gap-12 lg:max-w-[880px]">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4 border-t border-line pt-10">
              <h2 className="text-h4 text-snow">{section.title}</h2>
              <p className="text-light text-mist">{section.body}</p>
              {section.list && (
                <ul className="flex list-disc flex-col gap-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item} className="text-light text-mist">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-4 border-t border-line pt-10">
            <h2 className="text-h4 text-snow">Contact Us</h2>
            <p className="text-light text-mist">
              If you have any questions or concerns about our privacy practices relating to
              your Personal Data, or would like to submit a request related to your Personal
              Data, please let us know by contacting us at{" "}
              <a href="mailto:help@framer.com" className="text-accent hover:underline">
                help@framer.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
