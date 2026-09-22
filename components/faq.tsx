"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

// The project's "FAQs" / "FAQ Row" pair.
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              >
                <span className="font-display text-xl font-normal md:text-2xl">
                  {item.question}
                </span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-accent text-accent" : ""
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-light max-w-2xl pb-6 text-mist">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
