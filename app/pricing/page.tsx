import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/eyebrow";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { PricingPlans } from "@/components/pricing-plans";
import { ScrollRevealText } from "@/components/scroll-reveal-text";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "At LamaYield, we specialize in providing innovative software solutions and IT services.",
};

// Pricing is hidden for now: /pricing renders the 404 page. Set to true to bring it back
// (and uncomment the Pricing link in components/site-nav.ts).
const PRICING_ENABLED = false;

const TIERS = [
  { name: "Startup", price: "$59/mo" },
  { name: "Efficient", price: "$89/mo" },
  { name: "Enterprise", price: "$189/mo" },
];

const GROUPS = [
  {
    title: "Core features",
    rows: [
      { label: "Creation", values: [true, true, true] },
      { label: "Cloud Storage", values: ["50GB", "100GB", "500GB"] },
      { label: "Ads Management", values: [false, true, true] },
      { label: "Instant Data Refresh", values: [false, true, true] },
      { label: "Creative Tools", values: ["2", "5", "10"] },
    ],
  },
  {
    title: "Reporting",
    rows: [
      { label: "Weekly Reporting", values: [true, true, true] },
      { label: "Live Editing", values: [false, true, true] },
      { label: "Email Storage", values: ["10GB", "Unlimited", "Unlimited"] },
      { label: "Advanced Reporting", values: [false, false, true] },
    ],
  },
  {
    title: "Collaboration",
    rows: [
      { label: "Team Management", values: [true, true, true] },
      { label: "Instant Commenting", values: [false, true, true] },
      { label: "Team Members", values: ["2", "5", "10"] },
    ],
  },
];

export default function PricingPage() {
  if (!PRICING_ENABLED) notFound();

  return (
    <>
      <PageHero
        label="Pricing"
        title="Straightforward Costing designed to grow"
        lead="At LamaYield, we specialize in providing innovative software solutions and IT services."
        image="/img/Lama/pricing-hero.png"
      />

      <section className="bg-ink py-[120px]">
        <div className="container-page">
          <PricingPlans />
        </div>
      </section>

      {/* ------------------------------------------------- Compare plans */}
      <section className="bg-void py-[120px]">
        <div className="container-page flex flex-col gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow>Simple pricing</Eyebrow>
            <ScrollRevealText
              as="h2"
              className="text-h2 text-snow"
              text="Compare All Plans & Features"
            />
          </div>

          {/* relative keeps positioned cells inside the scroller on mobile */}
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-6 pr-6 align-bottom">
                    <span className="text-body font-medium text-snow">Basic Tools</span>
                  </th>
                  {TIERS.map((tier) => (
                    <th key={tier.name} scope="col" className="px-4 py-6 align-bottom">
                      <div className="flex flex-col gap-3">
                        <span className="text-body-sm text-dim">{tier.name}</span>
                        <span className="font-display text-2xl text-snow">{tier.price}</span>
                        <Link
                          href="/contact"
                          className="inline-flex w-fit items-center justify-center rounded-[50px] border border-line px-4 py-2 text-sm font-medium text-snow transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          Get started
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {GROUPS.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="pb-4 pt-10 text-left text-body-sm font-medium uppercase tracking-wide text-accent"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line">
                      <th scope="row" className="py-4 pr-6 text-left font-normal">
                        <span className="text-body-sm text-mist">{row.label}</span>
                      </th>
                      {row.values.map((value, i) => (
                        <td key={`${row.label}-${i}`} className="px-4 py-4">
                          {typeof value === "boolean" ? (
                            <Mark on={value} />
                          ) : (
                            <span className="text-body-sm text-snow">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Mark({ on }: { on: boolean }) {
  return (
    <span className="inline-flex items-center">
      <span className="sr-only">{on ? "Included" : "Not included"}</span>
      {on ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-accent">
          <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-dim">
          <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
