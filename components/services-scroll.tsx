"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DotPattern } from "./dot-pattern";

export type ServiceCard = { title: string; image: string };

// Resting rotation of each card in the pile, from the Framer reference.
const CARD_TILTS = [4, -4, -12, -20];

// Height of each scroll trigger block after the pinned section, as in the reference.
const TRIGGER_HEIGHT = 700;

// Where a card springs to once its trigger has scrolled fully into view.
const FLOWN = "translateY(-800px) rotate(-70deg)";
const SPRING = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";

// The reference "Services section": the stack of cards is pinned in view and each
// trigger block that scrolls past sends the top card flying off; the last one also
// fades out the headline and glow. Scrolling back up returns them.
export function ServicesScroll({ cards }: { cards: ServiceCard[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Number of triggers that have fully entered the viewport.
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const scrolled = -wrap.getBoundingClientRect().top;
      setPassed(Math.min(cards.length, Math.max(0, Math.floor(scrolled / TRIGGER_HEIGHT))));
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
  }, [cards.length]);

  const finished = passed >= cards.length;
  const fade = { opacity: finished ? 0 : undefined, transition: "opacity 400ms ease" };

  return (
    <div ref={wrapRef} className="relative" style={{ height: `calc(100vh + ${cards.length * TRIGGER_HEIGHT}px)` }}>
      <section className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-void">
        {/* Light effects behind the headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[479px] w-[1026px] max-w-[126vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.46]"
          style={{
            ...fade,
            background:
              "radial-gradient(ellipse at center, rgba(111,155,239,0.45) 0%, rgba(111,155,239,0.12) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[519px] w-[1026px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[rgba(111,155,239,0.24)] opacity-30 blur-[120px]"
          style={fade}
        />
        <DotPattern opacity={0.14} />

        <h2
          className="pointer-events-none absolute font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-none tracking-tight text-snow/90"
          style={fade}
        >
          Our Services
        </h2>

        {/* The first card sits on top of the stack and is the first to fly off. */}
        <div className="relative z-10 aspect-[300/380] w-[min(300px,70vw)]">
          {cards.map((card, i) => {
            const tilt = CARD_TILTS[i % CARD_TILTS.length];
            const flown = passed > i;
            return (
              <article
                key={card.title}
                className="absolute inset-0 overflow-hidden bg-void ring-1 ring-accent shadow-[0_0_40px_6px_rgba(59,130,246,0.45)]"
                style={{
                  zIndex: cards.length - i,
                  transform: flown ? FLOWN : `rotate(${tilt}deg)`,
                  transition: SPRING,
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
