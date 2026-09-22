import type { FaqItem } from "@/components/faq";
import type { ServiceCard } from "@/components/services-scroll";

export const METRICS = [
  { value: "12", label: "Years of Experience" },
  { value: "50+", label: "Countries in Services" },
  { value: "80%", label: "Increase in Productivity" },
  { value: "$124B", label: "Revenue Generated" },
];

// Client wordmarks lifted from the published hero ticker.
export const PARTNER_LOGOS = [
  { src: "/img/logos/brand-1.svg", width: 89, height: 27 },
  { src: "/img/logos/brand-2.svg", width: 110, height: 27 },
  { src: "/img/logos/brand-3.svg", width: 127, height: 27 },
  { src: "/img/logos/brand-4.svg", width: 117, height: 27 },
  { src: "/img/logos/brand-5.svg", width: 91, height: 27 },
];

export const INDUSTRIES = [
  "Generative AI Integration",
  "Cognitive Commerce",
  "Energy & Climate",
  "Secure FinTech Ecosystems",
  "Digital Healthcare",
  "Software & Cloud Computing",
  "Retail & E-commerce",
];

export const SERVICE_CARDS: ServiceCard[] = [
  { title: "Workflow Automation", image: "/img/service-automation.png" },
  { title: "AI Assistants & Copilots", image: "/img/service-copilots.png" },
  { title: "Business consulting", image: "/img/service-consulting.png" },
  { title: "AI & Tools Integration", image: "/img/service-ai-tools.png" },
];

// The two slides in the featured partner card.
export const PARTNER_QUOTES = [
  "From the initial call through delivery, the workflow was smooth and stress-free. We now have a brand that truly matches our identity",
  "From the first call to final delivery, the process was seamless. We now have a brand that truly reflects who we are",
];

export const PARTNER_AUTHOR = { name: "Mike Green", role: "Director of Operations" };

export const TESTIMONIALS = [
  {
    quote:
      "Softgent has been an amazing investment partner for me. Their investment management services are easy to use.",
    handle: "@ Yury",
  },
  {
    quote:
      "I never realized how much money I was wasting on unnecessary expenses until I started using Softgent.",
    handle: "@Aryan",
  },
  {
    quote: "Such a clean, beautiful template and so easy to customise. Would highly recommend.",
    handle: "@Arim",
  },
  {
    quote:
      "I accidentally stumbled upon Softgent while looking for another tool but I am very glad I did!",
    handle: "@ Sam",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What services does Softgent provide?",
    answer:
      "We provide AI workflow automation, intelligent assistants, and strategic consulting to help businesses scale efficiently.",
  },
  {
    question: "Do you implement AI and automation directly?",
    answer:
      "We provide AI workflow automation, intelligent assistants, and strategic consulting to help businesses scale efficiently.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Project timelines depend on complexity, but most AI systems are delivered within four to eight weeks.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Security is a top priority. Softgent uses enterprise-grade encryption, secure access controls, and compliance standards to ensure your data remains protected at all times.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "You can get started in just a few minutes. With intuitive setup, pre-built templates, and seamless integrations, most teams launch their first workflow the same day.",
  },
];

// Shared by /about and /services.
export const WHY_US = {
  eyebrow: "WHY US",
  heading: "Why Choose Us",
  cards: [
    {
      title: "Innovation as a Collective Mindset",
      body: "Quality in software development comes from truly understanding the client's niche, industry and specifics. In doing so, we strive to intentionally act with the client at core.",
      image: "/img/why-us-1.png",
    },
    { title: "Customer Centricity", body: "", image: "/img/why-us-2.png" },
  ],
};

export const GROWTH_STATS = [
  { value: "$4.8m", label: "In pure profits for our clients" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "30+", label: "Agents working for you" },
  { value: "2K+", label: "Business boost with AI" },
];
