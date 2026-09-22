"use client";

import { useEffect, useRef } from "react";

// Mirrors the project's "TextScrollReveal" layer: characters fade up to full
// brightness as the block travels through the viewport.
export function ScrollRevealText({
  text,
  as: Tag = "h2",
  className = "",
  initialOpacity = 0.18,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  initialOpacity?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const chars = Array.from(
      host.querySelectorAll<HTMLSpanElement>("[data-reveal-char]"),
    );
    if (chars.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((char) => {
        char.style.opacity = "1";
      });
      return;
    }

    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 when the block enters at 85% of the viewport, 1 once it clears 35%.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      const reach = progress * (chars.length + 8);
      for (let i = 0; i < chars.length; i++) {
        const local = Math.min(1, Math.max(0, reach - i));
        chars[i].style.opacity = String(initialOpacity + local * (1 - initialOpacity));
      }
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
  }, [text, initialOpacity]);

  return (
    <div ref={hostRef}>
      <Tag className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {text.split(" ").map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`}>
              {wordIndex > 0 ? " " : null}
              <span className="inline-block">
                {Array.from(word).map((char, charIndex) => (
                  <span
                    key={charIndex}
                    data-reveal-char=""
                    style={{ opacity: initialOpacity, transition: "opacity 120ms linear" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    </div>
  );
}
