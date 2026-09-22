import Image from "next/image";
import { DotPattern } from "./dot-pattern";

// Inner-page hero: art on the right, plain uppercase label, display headline.
export function PageHero({
  label,
  title,
  lead,
  image,
}: {
  label: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-[196px]">
      <DotPattern opacity={0.2} />
      {image && (
        <Image
          src={image}
          alt=""
          width={900}
          height={900}
          priority
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-24 hidden w-[520px] max-w-[45vw] opacity-80 lg:block"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-ink to-transparent"
      />

      <div className="container-page relative z-10 flex flex-col items-start gap-4">
        <p className="eyebrow uppercase">{label}</p>
        <h1 className="text-display max-w-[760px] text-snow">{title}</h1>
        {lead && <p className="text-light mt-2 max-w-[560px] text-mist">{lead}</p>}
      </div>
    </section>
  );
}
