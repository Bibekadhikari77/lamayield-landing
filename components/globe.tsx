"use client";

import { useEffect, useRef } from "react";

// Stand-in for the project's WebGL Globe: a dotted sphere with the
// Color Secondary glow, rotating on its own axis.

const R = 99; // sphere radius in SVG units (viewBox 0 0 200 200)
const REVOLUTION_SECONDS = 40;

// Meridians every 30°: each projected ellipse covers a longitude and its opposite.
const MERIDIANS = [0, 30, 60, 90, 120, 150].map((deg) => (deg * Math.PI) / 180);

// Marker positions as [latitude, longitude] in degrees, spread all the way
// round so a few are always on the visible side.
const MARKERS: [number, number][] = [
  [32, -30],
  [12, 20],
  [-8, -38],
  [-22, 5],
  [-16, 48],
  [26, 95],
  [-12, 140],
  [38, 185],
  [4, 225],
  [-28, 270],
];

const rad = (deg: number) => (deg * Math.PI) / 180;

function meridianRx(lon: number, spin: number) {
  return R * Math.abs(Math.sin(lon + spin));
}

// Orthographic projection of a marker; hidden while it is on the far side.
function markerStyle([lat, lon]: [number, number], spin: number) {
  const phi = rad(lat);
  const lambda = rad(lon) + spin;
  const depth = Math.cos(phi) * Math.cos(lambda);
  // Rounded so the server-rendered style matches the client's first render.
  return {
    left: `${(50 + (R / 2) * Math.cos(phi) * Math.sin(lambda)).toFixed(2)}%`,
    top: `${(50 - (R / 2) * Math.sin(phi)).toFixed(2)}%`,
    opacity: Math.min(1, Math.max(0, depth * 4)).toFixed(2),
  };
}

export function Globe({ className = "" }: { className?: string }) {
  const meridianRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const spin = (((now - start) / 1000) / REVOLUTION_SECONDS) * Math.PI * 2;
      MERIDIANS.forEach((lon, i) => {
        meridianRefs.current[i]?.setAttribute("rx", meridianRx(lon, spin).toFixed(2));
      });
      MARKERS.forEach((marker, i) => {
        const el = markerRefs.current[i];
        if (!el) return;
        const style = markerStyle(marker, spin);
        el.style.left = style.left;
        el.style.top = style.top;
        el.style.opacity = style.opacity;
      });
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
      {/* Outer atmosphere */}
      <div className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl" />

      <div className="relative size-full overflow-hidden rounded-full">
        {/* Dotted surface, panning with the rotation */}
        <div
          className="absolute inset-0 animate-[marquee-x_40s_linear_infinite] opacity-70"
          style={{
            width: "200%",
            backgroundImage: "url(/img/dot-pattern.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "5px 5px",
          }}
        />

        {/* Spherical shading */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(111,155,239,0.55) 0%, rgba(111,155,239,0.12) 38%, rgba(3,8,20,0.85) 68%, rgb(2,2,2) 100%)",
          }}
        />

        {/* Wireframe */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-accent/25">
          <circle cx="100" cy="100" r={R} fill="none" stroke="currentColor" strokeWidth="0.6" />
          {MERIDIANS.map((lon, i) => (
            <ellipse
              key={lon}
              ref={(el) => {
                meridianRefs.current[i] = el;
              }}
              cx="100"
              cy="100"
              rx={meridianRx(lon, 0).toFixed(2)}
              ry={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          ))}
          {[-66, -33, 0, 33, 66].map((dy) => (
            <ellipse
              key={dy}
              cx="100"
              cy={100 + dy}
              rx={Math.sqrt(Math.max(0, R * R - dy * dy))}
              ry="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Terminator */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_75%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />

        {/* Markers */}
        {MARKERS.map((marker, i) => (
          <span
            key={marker.join()}
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
            className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-snow shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]"
            style={markerStyle(marker, 0)}
          />
        ))}
      </div>
    </div>
  );
}
