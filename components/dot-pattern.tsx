// The tiled halftone texture layered behind the hero and services sections.
export function DotPattern({
  className = "",
  opacity = 0.2,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: "url(/img/dot-pattern.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "3px 3px",
      }}
    />
  );
}
