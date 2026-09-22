import Image from "next/image";
import { ArrowDots } from "@/components/arrow-dots";
import { ButtonPrimary } from "@/components/button-primary";
import { DotPattern } from "@/components/dot-pattern";
import { Eyebrow } from "@/components/eyebrow";
import { Faq } from "@/components/faq";
import { Globe } from "@/components/globe";
import { Marquee, MarqueeVertical } from "@/components/marquee";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { ServicesScroll } from "@/components/services-scroll";
import { SupportingCard } from "@/components/supporting-card";
import { Footer } from "@/components/footer";
import { PartnerCard } from "@/components/partner-card";
import {
  FAQ_ITEMS,
  INDUSTRIES,
  METRICS,
  PARTNER_LOGOS,
  SERVICE_CARDS,
  TESTIMONIALS,
} from "@/lib/content";

const APPROACH = [
  {
    title: "Identify",
    body: "We works to clearly define the problem within the context of the broader system, understanding constraints, data, dependencies, and real world pressures before anything is built.",
    image: "/img/approach-identify.png",
  },
  {
    title: "Solution",
    body: "An experienced team designs and delivers the solution end to end, from architecture through to integrations ensuring it works within existing systems and real operating conditions.",
    image: "/img/approach-solution.png",
  },
  {
    title: "Outcome",
    body: "We ensure the solution delivers measurable results in the real world, optimising, iterating, and embedding it into operations so value is realised and sustained.",
    image: "/img/approach-outcome.png",
  },
];

const SUPPORTING = [
  {
    title: "Intelligence",
    body: "Support smarter automated workflows and faster decision making.",
  },
  {
    title: "Strategy",
    body: "Move from idea to execution with fewer delays and faster implementations.",
  },
  {
    title: "Deliver",
    body: "Launch experiences built to perform and scale quicker and super faster.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* ---------------------------------------------------------- Hero */}
      <section className="home-hero relative flex flex-col overflow-hidden">
        <DotPattern opacity={0.2} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[278px] bg-gradient-to-t from-ink to-transparent"
        />

        <div className="container-page relative z-10 flex items-end">
          <div className="flex flex-col items-start gap-12">
            <div className="flex flex-col items-start gap-2.5">
              <Eyebrow>Decade of industry experience</Eyebrow>
              <h1 className="text-display max-w-[778px] text-snow">
                Softgent provides technical leadership and delivery of quality software.
              </h1>
            </div>
            <ButtonPrimary href="/about">Learn more</ButtonPrimary>
          </div>
        </div>

        <div className="relative z-10 py-2">
          <div className="container-page">
            <p className="text-body-sm text-mist">Trusted by some of the biggest companies</p>
          </div>
          <div className="container-page mt-4 flex justify-start">
            <Marquee duration={28} gap={68} className="h-[78px] max-w-[1050px] items-center">
              {PARTNER_LOGOS.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className="h-[27px] w-auto opacity-55 transition-opacity hover:opacity-100"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Metrics */}
      <section className="home-metrics relative overflow-hidden py-[120px]">
        <div className="container-page relative">
          <Globe className="metrics-globe" />

          <div className="metrics-content relative z-10 flex flex-col gap-16">
            <div className="metrics-heading flex flex-col">
              <Eyebrow>In number</Eyebrow>
              <ScrollRevealText
                as="h2"
                initialOpacity={0.4}
                className="text-h1 text-snow"
                text="At Softgent, we are dedicated to providing innovative software solutions and IT services that empower businesses."
              />
            </div>

            <dl className="metrics-list flex w-[95%] gap-8">
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex items-start gap-5">
                  <ArrowDots className="mt-1.5 shrink-0 text-accent" />
                  <div className="flex w-[221px] max-w-full flex-col gap-[5px]">
                    <dt className="font-num text-5xl font-medium text-snow">{metric.value}</dt>
                    <dd className="text-light text-mist">{metric.label}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Bento */}
      <section className="bg-ink py-[120px]">
        <div className="container-page flex flex-col gap-[15px]">
          <div className="flex flex-col items-stretch gap-[15px] lg:flex-row">
            <div className="flex flex-col justify-between gap-10 px-5 py-9 lg:w-[43%]">
              <h2 className="text-h2 text-snow">
                Providing technical leadership and design software solutions, including
                architecture, integrations, and Machine learning.
              </h2>
              <div className="flex flex-col items-start gap-8">
                <p className="text-light text-mist">
                  Designing and building systems with a stable senior team, so context
                  compounds and decisions improve over time.
                </p>
                <ButtonPrimary href="/contact">Get in Touch</ButtonPrimary>
              </div>
            </div>

            <div className="relative h-[420px] flex-1 overflow-hidden lg:h-[744px]">
              <Image
                src="/img/bento-main.png"
                alt="Softgent delivery workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-[15px] lg:flex-row">
            {SUPPORTING.map((card) => (
              <SupportingCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Approach */}
      <section className="bg-ink py-[120px]">
        <div className="container-page flex flex-col gap-20">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-16">
            <ScrollRevealText
              as="h2"
              className="text-h2 text-snow"
              text="THINK OUTSIDE THE BOX"
            />
            <div className="flex w-full flex-col gap-8 lg:w-[35%] lg:items-end lg:text-right">
              <Eyebrow>Our approach</Eyebrow>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {APPROACH.map((step) => (
              <article
                key={step.title}
                className="flex flex-1 flex-col gap-6 bg-void px-8 py-8 lg:px-12"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[335px]">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="335px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-h3 text-snow">{step.title}</h3>
                  <p className="text-light text-mist">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Industries */}
      <section className="relative z-[2] overflow-hidden px-6 py-[120px] lg:px-12">
        <div className="container-page flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex flex-1 flex-col justify-between gap-24">
            <div className="flex flex-col gap-1">
              <Eyebrow>Industries</Eyebrow>
              <h2 className="text-h2 mt-4 text-snow">
                Trusted by clients in key industries from energy to healthcare
              </h2>
            </div>

            <figure className="flex flex-col gap-6 border-l border-hairline pl-9">
              <blockquote className="text-light max-w-[520px] text-mist">
                &ldquo;Good advisory work starts with seeing what&apos;s coming before others
                do. That&apos;s what we give our clients — the right read, at the right
                time.&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Image
                  src="/img/industries-author.png"
                  alt=""
                  width={54}
                  height={54}
                  className="size-[54px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-light text-snow">Ralf Jen</span>
                  <span className="text-body-sm text-dim">Senior Consultant</span>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="relative h-[527px] w-full flex-1 overflow-hidden">
            <Image
              src="/img/industries-bg.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <MarqueeVertical duration={24} gap={10} className="h-[460px] w-[400px] max-w-full">
                {INDUSTRIES.map((industry) => (
                  <div
                    key={industry}
                    className="flex items-center justify-center border border-line bg-void/70 px-6 py-5 text-center backdrop-blur-[5px]"
                  >
                    <span className="font-display text-xl text-snow">{industry}</span>
                  </div>
                ))}
              </MarqueeVertical>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- About */}
      <section className="relative overflow-hidden bg-void py-[120px]">
        <Image
          src="/img/about-lines.png"
          alt=""
          width={1440}
          height={402}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[125px] z-0 w-full opacity-60"
        />
        <div className="container-page relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="lg:w-1/3">
              <Eyebrow>Innovate</Eyebrow>
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="text-h1 text-snow">
                Transforming Businesses with
                <br />
                Cutting-Edge Solutions
              </h2>
              <p className="text-h4 text-mist">
                At Softgent, we specialize in providing innovative software solutions that
                empower businesses to streamline operations, enhance productivity, and
                achieve their goals efficiently. Discover how our solutions can transform
                your business today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Services */}
      <ServicesScroll cards={SERVICE_CARDS} />

      {/* --------------------------------------------------- Testimonials */}
      <section className="relative z-10 bg-void px-[30px] pb-[120px]">
        <div className="container-page flex flex-col gap-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <Eyebrow>Reviews</Eyebrow>
            <ScrollRevealText
              as="h2"
              className="text-h2 mt-3 text-snow"
              text="Real Results, Trusted Partnerships"
            />
          </div>

          <PartnerCard />

          <div className="flex flex-col gap-2.5">
            {[false, true].map((reverse, row) => (
              <Marquee key={row} duration={45} reverse={reverse} gap={10}>
                {TESTIMONIALS.map((item) => (
                  <figure
                    key={`${row}-${item.handle}`}
                    className="flex h-[215px] w-[420px] max-w-[85vw] flex-col justify-between rounded-[10px] border border-line bg-ink p-6"
                  >
                    <Image
                      src="/img/logos/testimonial-logo.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 opacity-70"
                    />
                    <blockquote className="text-body-sm text-mist">{item.quote}</blockquote>
                    <figcaption className="text-body-sm text-dim">{item.handle}</figcaption>
                  </figure>
                ))}
              </Marquee>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="relative z-10 bg-ink px-[30px] py-[120px]">
        <div className="container-page flex flex-col gap-20">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[42%]">
              <Eyebrow>Frequently asked question</Eyebrow>
              <ScrollRevealText as="h2" className="text-h2 text-snow" text="Faqs" />
            </div>
            <div className="w-full lg:w-[52%]">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
