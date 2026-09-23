import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/eyebrow";
import { Footer } from "@/components/footer";
import { GrowthStats } from "@/components/growth-stats";
import { PageHero } from "@/components/page-hero";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { WhyChooseUs } from "@/components/why-choose-us";

export const metadata: Metadata = {
  title: "Services",
  description:
    "We specialize in providing innovative software solutions that empower businesses to streamline operations.",
};

const SERVICES = [
  {
    title: "Workflow Automation",
    body: "We design intelligent workflows that automate tasks and improve business efficiency across teams.",
    image: "/img/Lama/service-automation.png",
  },
  {
    title: "AI Assistants & Copilots",
    body: "We build smart AI assistants that support teams and customers with fast responses.",
    image: "/img/Lama/service-copilots.png",
  },
  {
    title: "Business consulting",
    body: "We provide expert guidance to improve strategy, operations, and long-term business growth.",
    image: "/img/Lama/service-consulting.png",
  },
  {
    title: "AI Integration",
    body: "The tools you already use, made smarter. We connect AI directly into your stack.",
    image: "/img/Lama/service-ai-tools.png",
  },
  {
    title: "Blockchain Development",
    body: "We build secure blockchain solutions, from smart contracts and tokenization to decentralized apps, that bring transparency and trust to your business.",
    image: "/img/Lama/service-blockchain.svg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Comprehensive Innovative Software Solutions"
        lead="We specialize in providing innovative software solutions that empower businesses to streamline operations."
        image="/img/Lama/services-hero.png"
      />

      {/* ------------------------------------------------------ Services */}
      <section className="bg-ink py-[120px]">
        <div className="container-page flex flex-col gap-16">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
            <ScrollRevealText
              as="h2"
              className="text-h2 max-w-[680px] text-snow"
              text="Services Built for Business Growth"
            />
            <div className="lg:pt-3">
              <Eyebrow>Services</Eyebrow>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, i) => {
              // An odd card out sits centred on its own row at the same width.
              const last = i === SERVICES.length - 1 && SERVICES.length % 2 === 1;
              return (
                <article
                  key={service.title}
                  className={`flex flex-col gap-6 bg-void p-8 lg:p-10 ${
                    last ? "sm:col-span-2 sm:w-[calc(50%-0.5rem)] sm:justify-self-center" : ""
                  }`}
                >
                  <div className="relative mx-auto aspect-square w-full max-w-[300px]">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-h3 text-snow">{service.title}</h3>
                    <p className="text-light text-mist">{service.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* ----------------------------------------------------- Framework */}
      <section className="relative overflow-hidden bg-ink py-[120px]">
        <div className="container-page relative z-10 flex flex-col gap-16">
          {/* Centred like the footer CTA band */}
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-h2 max-w-[760px] text-balance text-snow">
              Transforming Businesses with Cutting&#8209;Edge Solutions
            </h2>
            <div className="flex max-w-[680px] flex-col gap-4">
              <p className="text-light text-mist">
                We bring deep expertise through a delivery approach built around your
                business goals. Every engagement starts with understanding how you work,
                then combines AI, automation and modern engineering to design solutions
                that fit your processes and scale with you.
              </p>
              <p className="text-light text-mist">
                Our capabilities span AI assistants and workflow automation, custom
                software and system integrations, cloud platforms and blockchain, along
                with the security, implementation and ongoing support that keep your
                critical systems running.
              </p>
            </div>
          </div>

          <Image
            src="/img/Lama/services-framework.png"
            alt=""
            width={1280}
            height={1150}
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      <section className="bg-void py-[120px]">
        <div className="container-page">
          <GrowthStats />
        </div>
      </section>

      <Footer />
    </>
  );
}
