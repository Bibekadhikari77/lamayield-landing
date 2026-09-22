"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDots } from "./arrow-dots";

// Framer's published HTML only carries the Yearly variant's figures, so the
// Monthly tab reuses them until the monthly prices are confirmed.
const PLANS = [
  {
    audience: "For individuals",
    name: "Basic",
    note: "Suitable for individuals",
    price: "$99",
    features: [
      "All analytics features",
      "Up to 250,000 tracked visits",
      "Normal support",
      "Up to 3 team members",
    ],
    popular: false,
  },
  {
    audience: "For startups",
    name: "Pro",
    note: "Suitable for teams size of 2-49 people",
    price: "$199",
    features: [
      "All analytics features",
      "Up to 1,000,000 tracked visits",
      "Premium support",
      "Up to 10 team members",
    ],
    popular: true,
  },
  {
    audience: "For big companies",
    name: "Enterprise",
    note: "Suitable for teams size of 50+ people",
    price: "$399",
    features: [
      "All analytics features",
      "Up to 5,000,000 tracked visits",
      "Dedicated support",
      "Up to 50 team members",
    ],
    popular: false,
  },
];

export function PricingPlans() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="flex flex-col gap-12">
      <div className="mx-auto inline-flex items-center gap-1 rounded-[50px] border border-line p-1.5">
        {(["monthly", "yearly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setCycle(option)}
            aria-pressed={cycle === option}
            className={`rounded-[50px] px-6 py-2 text-base capitalize transition-colors ${
              cycle === option
                ? "bg-cream text-[rgb(25,25,26)]"
                : "text-mist/70 hover:text-snow"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-1 flex-col gap-8 rounded-[16px] border p-8 lg:p-10 ${
              plan.popular ? "border-accent/40 bg-void" : "border-line bg-void/50"
            }`}
          >
            <div className="flex flex-col gap-3">
              <p className="text-body-sm text-dim">{plan.audience}</p>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl font-normal text-snow">{plan.name}</h3>
                {plan.popular && (
                  <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
                    🔖Popular
                  </span>
                )}
              </div>
              <p className="text-light text-mist">{plan.note}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="font-num text-5xl font-medium text-snow">{plan.price}</span>
              <span className="text-body-sm text-dim">/{cycle}</span>
            </div>

            <div className="flex flex-1 flex-col gap-4 border-t border-line pt-8">
              <p className="text-body-sm font-medium text-snow">What&rsquo;s included</p>
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <ArrowDots className="mt-1 shrink-0 text-accent" />
                    <span className="text-body-sm text-mist">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className={`inline-flex items-center justify-center rounded-[50px] px-6 py-3 text-base font-medium transition-colors ${
                plan.popular
                  ? "bg-cream text-[rgb(25,25,26)] hover:bg-[rgb(239,236,228)]"
                  : "border border-line text-snow hover:border-accent/40 hover:text-accent"
              }`}
            >
              Get started
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
