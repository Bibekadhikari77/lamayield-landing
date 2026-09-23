"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1800;

// Splits "$4.8m" into "$", 4.8 (1 decimal) and "m". A "K" suffix counts
// through the full number instead ("2K+" runs 0 → 2,000+), since counting
// just the 2 would only ever show 0K, 1K, 2K.
function parse(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  if (/^k/i.test(suffix)) {
    const rest = suffix.slice(1);
    return {
      target: Number(number) * 1000,
      format: (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${rest}`,
    };
  }
  const decimals = number.split(".")[1]?.length ?? 0;
  return {
    target: Number(number),
    format: (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`,
  };
}

// Counts a stat up from zero the first time it scrolls into view. Renders the
// final value on the server, so it reads correctly without JavaScript. The
// text is written straight to the DOM each frame to avoid re-rendering.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    el.textContent = parsed.format(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          // Land on the authored string exactly ("2K+", not "2,000+").
          el.textContent = t < 1 ? parsed.format(parsed.target * eased) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <dt ref={ref} className={className}>
      {value}
    </dt>
  );
}
