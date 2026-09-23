import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { LegalSections, LegalToc } from "@/components/legal-document";
import { PageHero } from "@/components/page-hero";
import { IMPRINT_SECTIONS, PRIVACY_CREDIT, PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Data protection / Imprint",
  description:
    "How we process personal data under the GDPR, and legal information about Swinging Lama Productions uG according to § 5 TMG.",
};

export default function DataProtectionPage() {
  return (
    <>
      <PageHero
        label={PRIVACY_UPDATED}
        title="Data protection / Imprint"
        lead="How we process your personal data, the legal bases we rely on and the rights you have under the GDPR."
      />

      <section className="bg-ink pb-[120px]">
        <div className="container-page flex flex-col gap-12 lg:max-w-[880px]">
          <LegalToc sections={[...PRIVACY_SECTIONS, IMPRINT_ANCHOR]} />
          <LegalSections sections={PRIVACY_SECTIONS} />
          <p className="text-body-sm text-dim">{PRIVACY_CREDIT}</p>

          {/* --------------------------------------------------- Imprint */}
          <div id={IMPRINT_ANCHOR.id} className="scroll-mt-28 border-t border-line pt-16">
            <h2 className="text-h2 text-snow">{IMPRINT_ANCHOR.title}</h2>
          </div>
          <LegalSections sections={IMPRINT_SECTIONS} />
        </div>
      </section>

      <Footer />
    </>
  );
}

// Table-of-contents entry pointing at the imprint heading.
const IMPRINT_ANCHOR = { id: "imprint", title: "Imprint", blocks: [] };
