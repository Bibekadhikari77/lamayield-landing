// Stand-in for the project's WebGL Globe: a dotted sphere with the
// Color Secondary glow, rotating on its own axis.
export function Globe({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
      {/* Outer atmosphere */}
      <div className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl" />

      <div className="relative size-full overflow-hidden rounded-full">
        {/* Dotted surface, panning to read as rotation */}
        <div
          className="absolute inset-0 animate-[marquee-x_28s_linear_infinite] opacity-70"
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
          <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {[20, 45, 70, 95].map((r) => (
            <ellipse
              key={r}
              cx="100"
              cy="100"
              rx={r}
              ry="99"
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
              rx={Math.sqrt(Math.max(0, 99 * 99 - dy * dy))}
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
        {[
          [38, 34],
          [58, 44],
          [46, 62],
          [70, 56],
          [30, 55],
        ].map(([left, top]) => (
          <span
            key={`${left}-${top}`}
            className="absolute size-1.5 rounded-full bg-snow shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
    </div>
  );
}
