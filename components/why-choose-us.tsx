import Image from "next/image";
import { Eyebrow } from "./eyebrow";
import { ScrollRevealText } from "./scroll-reveal-text";
import { WHY_US } from "@/lib/content";

// Shared between /about and /services.
export function WhyChooseUs() {
  const [primary, secondary] = WHY_US.cards;

  return (
    <section className="bg-void py-[120px]">
      <div className="container-page flex flex-col gap-16">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <ScrollRevealText as="h2" className="text-h2 text-snow" text={WHY_US.heading} />
          <div className="lg:pt-3">
            <Eyebrow>{WHY_US.eyebrow}</Eyebrow>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <article className="flex flex-1 flex-col justify-between gap-10 bg-ink p-8 lg:p-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-h3 text-snow">{primary.title}</h3>
              <p className="text-light max-w-[520px] text-mist">{primary.body}</p>
            </div>
            <Image
              src={primary.image}
              alt=""
              width={1156}
              height={900}
              className="h-auto w-full object-contain"
            />
          </article>

          <article className="flex flex-1 flex-col justify-between gap-10 bg-ink p-8 lg:p-10">
            <h3 className="text-h3 text-snow">{secondary.title}</h3>
            <Image
              src={secondary.image}
              alt=""
              width={772}
              height={532}
              className="h-auto w-full object-contain"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
