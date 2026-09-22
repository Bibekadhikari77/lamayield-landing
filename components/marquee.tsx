import type { ReactNode } from "react";

// CSS marquee standing in for the project's Ticker component.
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  gap = 68,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={`mask-edges flex w-full items-center overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-[marquee-x_linear_infinite] hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          gap: `${gap}px`,
          paddingRight: `${gap}px`,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MarqueeVertical({
  children,
  duration = 30,
  reverse = false,
  gap = 10,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={`mask-edges-y overflow-hidden ${className}`}>
      <div
        className="flex h-max flex-col animate-[marquee-y_linear_infinite]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          gap: `${gap}px`,
          paddingBottom: `${gap}px`,
        }}
      >
        <div className="flex shrink-0 flex-col" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 flex-col" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
