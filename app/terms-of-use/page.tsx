import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { LegalSections } from "@/components/legal-document";
import { PageHero } from "@/components/page-hero";
import { ALEXA_TERMS_SECTIONS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the Alexa Skills by Swinging Lama Productions.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        label="Alexa Skills"
        title="Terms of Use"
        lead="The agreement between you and Swinging Lama Productions when you use any of our Alexa Skills."
      />

      <section className="bg-ink pb-[120px]">
        <div className="container-page flex flex-col gap-12 lg:max-w-[880px]">
          <LegalSections sections={ALEXA_TERMS_SECTIONS} />
        </div>
      </section>

      <Footer />
    </>
  );
}
