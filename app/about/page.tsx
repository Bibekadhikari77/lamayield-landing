import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/eyebrow";
import { Footer } from "@/components/footer";
import { GrowthStats } from "@/components/growth-stats";
import { PageHero } from "@/components/page-hero";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { WhyChooseUs } from "@/components/why-choose-us";

export const metadata: Metadata = {
  title: "About",
  description:
    "At LamaYield, we specialize in providing innovative software solutions and IT services.",
};

const HOW_IT_WORKS = [
  {
    no: "01.",
    title: "Efficiency",
    body: "Designed for your team, see for yourself and manage your time with LamaYield.",
  },
  {
    no: "02.",
    title: "Reliability",
    body: "This template is not merely a design; it's a comprehensive solution.",
  },
  {
    no: "03.",
    title: "Innovative",
    body: "Tailored to elevate the online presence of AI, Technology, SaaS businesses.",
  },
  {
    no: "04.",
    title: "Integrates",
    body: "Integrates with your workflow do need to change.",
  },
];

const TEAM = [
  { name: "Evan Mercer", role: "AI Lead Engineer", image: "/img/team-1.png" },
  { name: "Collins Taeed", role: "DevOps Engineer", image: "/img/team-2.png" },
  { name: "Daniel Wu", role: "Chief Technology Officer", image: "/img/team-3.png" },
  { name: "Jim Callies", role: "Full-Stack Developer", image: "/img/team-4.png" },
  { name: "Daniel Whitmore", role: "Back-End Developer", image: "/img/team-5.png" },
  { name: "Jack Will", role: "Technical Lead", image: "/img/team-6.png" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Empowering Businesses Through Technology"
        lead="At LamaYield, we specialize in providing innovative software solutions and IT services."
        image="/img/about-hero.png"
      />

      {/* --------------------------------------------------- How it works */}
      <section className="relative overflow-hidden bg-ink py-[120px]">
        <Image
          src="/img/Lama/about-lines.png"
          alt=""
          width={1440}
          height={402}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full opacity-50"
        />
        <div className="container-page relative z-10 flex flex-col gap-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-col gap-4 lg:w-1/2">
              <Eyebrow>How it works</Eyebrow>
              <ScrollRevealText
                as="h2"
                className="text-h2 text-snow"
                text="Our Journey Towards Technological Excellence"
              />
            </div>
            <p className="text-h4 flex-1 text-mist">
              At LamaYield, we specialize in providing innovative software solutions that
              empower businesses to streamline operations, enhance productivity, and
              achieve their goals efficiently.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <li key={step.no} className="flex flex-col gap-4 bg-void p-8">
                <span className="font-num text-body-sm text-accent">{step.no}</span>
                <h3 className="text-h4 text-snow">{step.title}</h3>
                <p className="text-light text-mist">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhyChooseUs />

      {/* --------------------------------------------------------- People */}
      <section className="bg-ink py-[120px]">
        <div className="container-page flex flex-col gap-16">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-4 lg:w-[55%]">
              <Eyebrow>People</Eyebrow>
              <ScrollRevealText as="h2" className="text-h2 text-snow" text="Meet The Team" />
            </div>
            <p className="text-h4 max-w-[420px] text-mist">
              Our team brings together creativity, innovation, and experience
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <li key={member.name} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/5] overflow-hidden bg-void">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl text-snow">{member.name}</span>
                  <span className="text-body-sm text-dim">{member.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- Grow with us */}
      <section className="relative overflow-hidden bg-void py-[120px]">
        <div className="container-page relative z-10 flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image src="/img/grow-icon.svg" alt="" width={35} height={35} className="size-[35px]" />
              <Eyebrow>Grow with us</Eyebrow>
            </div>
            <h2 className="text-h2 max-w-[820px] text-snow">
              We Transforming Businesses with Cutting-Edge Solutions
            </h2>
          </div>
          <GrowthStats />
        </div>
      </section>

      <Footer />
    </>
  );
}
