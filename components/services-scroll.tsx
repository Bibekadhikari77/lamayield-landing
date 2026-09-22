"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DotPattern } from "./dot-pattern";

export type ServiceCard = { title: string; image: string };

// The project's sticky "ServicesSection": the headline pins to the viewport
// while four trigger blocks scroll past, dealing the service cards in one by one.
export function ServicesScroll({ cards }: { cards: ServiceCard[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return setProgress(1);
      setProgress(Math.min(1, Math.max(0, -rect.top / scrollable)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `calc(100vh + ${cards.length * 700}px)` }}>
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-void">
        {/* Light effects behind the headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[479px] w-[1026px] max-w-[126vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.46]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(60,208,119,0.45) 0%, rgba(60,208,119,0.12) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[519px] w-[1026px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[rgba(60,208,119,0.24)] opacity-30 blur-[120px]"
        />
        <DotPattern opacity={0.14} />

        <h2 className="pointer-events-none absolute font-display text-[clamp(3rem,12vw,10rem)] font-light leading-none tracking-tight text-snow/90">
          Our Services
        </h2>

        <div className="relative z-10 flex w-full items-center justify-center gap-4 px-4 lg:gap-6">
          {cards.map((card, i) => {
            const local = Math.min(1, Math.max(0, (progress - i * 0.2) / 0.28));
            const tilt = (i - (cards.length - 1) / 2) * 3;
            return (
              <article
                key={card.title}
                className="relative aspect-[300/380] w-[min(300px,22vw)] shrink-0 overflow-hidden bg-void ring-1 ring-line"
                style={{
                  opacity: local,
                  transform: `translateY(${(1 - local) * 140}px) scale(${0.92 + local * 0.08}) rotate(${tilt * local}deg)`,
                  transition: "opacity 120ms linear",
                }}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-contain object-top p-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                <p className="absolute inset-x-[30px] bottom-[30px] text-center font-display text-lg font-normal text-snow">
                  {card.title}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
