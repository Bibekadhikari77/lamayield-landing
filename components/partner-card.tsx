"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PARTNER_AUTHOR, PARTNER_QUOTES } from "@/lib/content";

// The featured partner testimonial, which cycles through its two slides.
export function PartnerCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PARTNER_QUOTES.length),
      7000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <article className="overflow-hidden rounded-[10px] bg-ink p-[30px]">
      <div className="flex flex-col items-stretch gap-[30px] lg:flex-row">
        <div className="relative flex h-[370px] w-full shrink-0 items-center justify-center overflow-hidden lg:w-[300px]">
          <Image
            src="/img/Lama/testimonial-photo.png"
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
          <Image
            src="/img/logos/testimonial-logo.svg"
            alt=""
            width={34}
            height={34}
            className="relative size-[34px]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-[50px] border-line pl-0 lg:border-l lg:pl-[30px]">
          <blockquote className="text-body-lg max-w-[97%] text-mist">
            &ldquo;{PARTNER_QUOTES[index]}&bdquo;
          </blockquote>

          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-3.5">
              <Image
                src="/img/testimonial-avatar.png"
                alt=""
                width={70}
                height={70}
                className="size-[70px] rounded-[10px] object-cover"
              />
              <div className="flex flex-col">
                <span className="text-body font-semibold text-snow">
                  {PARTNER_AUTHOR.name}
                </span>
                <span className="text-body-sm text-dim">{PARTNER_AUTHOR.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {PARTNER_QUOTES.map((quote, i) => (
                <button
                  key={quote}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
