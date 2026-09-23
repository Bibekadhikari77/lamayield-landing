"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DotPattern } from "./dot-pattern";

export type ServiceCard = { title: string; image: string };

// Resting rotation of each card in the pile, from the Framer reference.
const CARD_TILTS = [4, -4, -12, -20];

// Scroll distance each card gets to travel in; larger = slower.
const SCROLL_PER_CARD = 1200;

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
    <div ref={wrapRef} className="relative" style={{ height: `calc(100vh + ${cards.length * SCROLL_PER_CARD}px)` }}>
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-void">
        {/* Light effects behind the headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[479px] w-[1026px] max-w-[126vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.46]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(111,155,239,0.45) 0%, rgba(111,155,239,0.12) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[519px] w-[1026px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[rgba(111,155,239,0.24)] opacity-30 blur-[120px]"
        />
        <DotPattern opacity={0.14} />

        <h2 className="pointer-events-none absolute font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-none tracking-tight text-snow/90">
          Our Services
        </h2>

        {/* The cards pile up in the centre, each landing on top at its own tilt. */}
        <div className="relative z-10 aspect-[300/380] w-[min(300px,70vw)]">
          {cards.map((card, i) => {
            // Each card owns its own slice of the scroll and lands before the next moves.
            const slice = 1 / cards.length;
            const local = Math.min(1, Math.max(0, (progress - i * slice) / (slice * 0.85)));
            const tilt = CARD_TILTS[i % CARD_TILTS.length];
            return (
              <article
                key={card.title}
                className="absolute inset-0 overflow-hidden bg-void ring-1 ring-accent shadow-[0_0_40px_6px_rgba(59,130,246,0.45)]"
                style={{
                  opacity: local,
                  transform: `translateY(${(1 - local) * 110}vh) rotate(${tilt * local}deg)`,
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
