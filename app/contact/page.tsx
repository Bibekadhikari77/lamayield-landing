import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/eyebrow";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { FAQ_ITEMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "We're all ears! Talk to us about your needs, and we'll provide the best possible solution.",
};

const STEPS = [
  {
    title: "Identify",
    body: "We works to clearly define the problem within the context of the broader system, understanding constraints, data, dependencies, and real world pressures before anything is built.",
    image: "/img/Lama/approach-identify.png",
  },
  {
    title: "Solution",
    body: "An experienced team designs and delivers the solution end to end, from architecture through to integrations ensuring it works within existing systems and real operating conditions.",
    image: "/img/Lama/approach-solution.png",
  },
  {
    title: "Outcome",
    body: "We ensure the solution delivers measurable results in the real world, optimising, iterating, and embedding it into operations so value is realised and sustained.",
    image: "/img/Lama/approach-outcome.png",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Get in touch for any support and inquiries"
        lead="We're all ears! Talk to us about your needs, and we'll provide the best possible solution."
        image="/img/Lama/contact-hero.png"
      />

      {/* --------------------------------------------------- Get in touch */}
      <section className="bg-ink py-[120px]">
        <div className="container-page flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <Eyebrow>Get in touch</Eyebrow>
            <ScrollRevealText
              as="h2"
              className="text-h2 max-w-[720px] text-snow"
              text="Reach out to us for any help and inquires"
            />
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="flex flex-col gap-8 lg:w-[38%]">
              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <Image src="/img/icon-phone.svg" alt="" width={28} height={28} className="size-7" />
                <p className="text-body-sm text-dim">Phone</p>
                <a href="tel:+1234567890" className="text-body text-snow transition-colors hover:text-accent">
                  +1 234 567 890
                </a>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <Image src="/img/icon-email.svg" alt="" width={28} height={28} className="size-7" />
                <p className="text-body-sm text-dim">Email</p>
                <a href="mailto:customer@gmail.com" className="text-body text-snow transition-colors hover:text-accent">
              team@swinging-lama.de       
         </a>
              </div>
            </div>

            <form className="flex flex-1 flex-col gap-6 bg-void p-8 lg:p-10">
              <Field id="name" label="Name" type="text" autoComplete="name" />
              <Field id="email" label="Email" type="email" autoComplete="email" />
              <Field id="company" label="Company name" type="text" autoComplete="organization" required={false} />

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-display text-xl text-snow">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="resize-y border border-line bg-transparent px-4 py-3 text-base text-snow outline-none transition-colors focus:border-accent/60"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center self-start rounded-[50px] bg-cream px-7 py-3 text-base font-medium text-[rgb(25,25,26)] transition-colors hover:bg-[rgb(239,236,228)]"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Approach */}
      <section className="bg-void py-[120px]">
        <div className="container-page flex flex-col gap-4 lg:flex-row">
          {STEPS.map((step) => (
            <article key={step.title} className="flex flex-1 flex-col gap-6 bg-ink px-8 py-8 lg:px-12">
              <div className="relative mx-auto aspect-square w-full max-w-[335px]">
                <Image src={step.image} alt="" fill sizes="335px" className="object-contain" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-h3 text-snow">{step.title}</h3>
                <p className="text-light text-mist">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="bg-ink px-[30px] py-[120px]">
        <div className="container-page flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[42%]">
            <Eyebrow>Frequently asked question</Eyebrow>
            <ScrollRevealText as="h2" className="text-h2 text-snow" text="Our Faqs" />
          </div>
          <div className="w-full lg:w-[52%]">
            <Faq items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-xl text-snow">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="border border-line bg-transparent px-4 py-3 text-base text-snow outline-none transition-colors focus:border-accent/60"
      />
    </div>
  );
}
