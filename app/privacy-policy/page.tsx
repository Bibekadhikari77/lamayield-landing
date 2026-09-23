import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { LegalBlocks, LegalSections } from "@/components/legal-document";
import { PageHero } from "@/components/page-hero";
import { ALEXA_PRIVACY_INTRO, ALEXA_PRIVACY_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we protect your privacy and your data when you use our Alexa Skills.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Alexa Skills"
        title="Privacy Policy"
        lead="How we protect your privacy and your data when you use any of our Alexa Skills."
      />

      <section className="bg-ink pb-[120px]">
        <div className="container-page flex flex-col gap-12 lg:max-w-[880px]">
          <div className="flex flex-col gap-4">
            <LegalBlocks blocks={ALEXA_PRIVACY_INTRO} />
          </div>
          <LegalSections sections={ALEXA_PRIVACY_SECTIONS} />
        </div>
      </section>

      <Footer />
    </>
  );
}
