import Image from "next/image";
import { Eyebrow } from "./eyebrow";
import { ScrollRevealText } from "./scroll-reveal-text";
import { WHY_US } from "@/lib/content";

// Shared between /about and /services.
export function WhyChooseUs() {
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
          {WHY_US.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-1 flex-col justify-between gap-10 bg-ink p-8 lg:p-10"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-h3 text-snow">{card.title}</h3>
                <p className="text-light max-w-[520px] text-mist">{card.body}</p>
              </div>
              {/* Same frame for every card so the artwork lines up. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
