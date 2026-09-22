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
    image: "/img/service-automation.png",
  },
  {
    title: "AI Assistants & Copilots",
    body: "We build smart AI assistants that support teams and customers with fast responses.",
    image: "/img/service-copilots.png",
  },
  {
    title: "Business consulting",
    body: "We provide expert guidance to improve strategy, operations, and long-term business growth.",
    image: "/img/service-consulting.png",
  },
  {
    title: "AI Integration",
    body: "The tools you already use, made smarter. We connect AI directly into your stack.",
    image: "/img/service-ai-tools.png",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Comprehensive Innovative Software Solutions"
        lead="We specialize in providing innovative software solutions that empower businesses to streamline operations."
        image="/img/services-hero.png"
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
            {SERVICES.map((service) => (
              <article key={service.title} className="flex flex-col gap-6 bg-void p-8 lg:p-10">
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
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* ----------------------------------------------------- Framework */}
      <section className="relative overflow-hidden bg-ink py-[120px]">
        <div className="container-page relative z-10 flex flex-col gap-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <h2 className="text-h1 text-snow lg:w-[45%]">
              Transforming Businesses with
              <br />
              Cutting-Edge Solutions
            </h2>
            <div className="flex flex-1 flex-col gap-6">
              <p className="text-h4 text-mist">
                We offer extensive expertise through our proprietary framework called
                Business Driven Architecture. This framework empowers us to deliver
                comprehensive solutions in process and development, establishing the basis
                for our leadership across a wide range of Microsoft technologies.
              </p>
              <p className="text-h4 text-mist">
                Our capabilities span from CRM and ERP to Low-code/No-code development,
                Azure cloud platform, security, as well as the implementation and
                maintenance of crucial IT solutions.
              </p>
            </div>
          </div>

          <Image
            src="/img/services-framework.png"
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
