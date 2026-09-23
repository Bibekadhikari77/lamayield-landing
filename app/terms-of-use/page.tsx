import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply when you use the LamaYield website and engage us for software and IT services.",
};

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the LamaYield website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the website.",
  },
  {
    title: "Use of the Website",
    body: "You may use this website for lawful purposes only. When using the website, you agree not to:",
    list: [
      "Attempt to gain unauthorized access to the website, its servers or any connected systems",
      "Interfere with or disrupt the operation or security of the website",
      "Copy, reproduce or redistribute website content without our written permission",
      "Use the website to transmit any unlawful, harmful or misleading material",
    ],
  },
  {
    title: "Services",
    body: "Information on this website describes the services LamaYield offers in general terms. The scope, deliverables, fees and timelines of any engagement are set out in a separate written agreement, which takes precedence over these terms.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website, including text, graphics, logos and images, is the property of LamaYield or its licensors and is protected by applicable intellectual property laws. Nothing in these terms grants you a licence to use it beyond viewing the website for your own reference.",
  },
  {
    title: "Third Party Links",
    body: "The website may link to websites operated by third parties. We do not control and are not responsible for the content, policies or practices of those websites, and a link does not imply our endorsement.",
  },
  {
    title: "Limitation of Liability",
    body: "The website is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, LamaYield is not liable for any indirect, incidental or consequential loss arising from your use of, or inability to use, the website.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these Terms of Use from time to time. Any changes will be posted on this page with an updated date, and continued use of the website after a change means you accept the revised terms.",
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        label="Updated on Sep 23 2026"
        title="Terms of Use"
        lead="Please read these terms carefully. They apply to everyone who visits or uses the LamaYield website."
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
              If you have any questions about these Terms of Use, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                get in touch with us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
