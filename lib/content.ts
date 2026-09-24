import type { FaqItem } from "@/components/faq";
import type { ServiceCard } from "@/components/services-scroll";

export const METRICS = [
  { value: "25+", label: "Years of Experience" },
  { value: "500+", label: "Successful Projects" },
  { value: "100%", label: "Accomplish Mission" },
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
  "Generative AI",
  "AI Agents & Automation",
  "Machine Learning",
  "FinTech",
  "Healthcare AI",
  "Cloud & Software",
  "Retail & E-commerce",
];

export const SERVICE_CARDS: ServiceCard[] = [
  { title: "Workflow Automation", image: "/img/Lama/service-automation.png" },
  { title: "AI Assistants & Copilots", image: "/img/Lama/service-copilots.png" },
  { title: "Business consulting", image: "/img/Lama/service-consulting.png" },
  { title: "AI & Tools Integration", image: "/img/Lama/service-ai-tools.png" },
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
      "LLamaYield has been an amazing investment partner for me. Their investment management services are easy to use.",
    handle: "@ Yury",
  },
  {
    quote:
      "I never realized how much money I was wasting on unnecessary expenses until I started using LLamaYield.",
    handle: "@Aryan",
  },
  {
    quote: "Such a clean, beautiful template and so easy to customise. Would highly recommend.",
    handle: "@Arim",
  },
  {
    quote:
      "I accidentally stumbled upon LLamaYield while looking for another tool but I am very glad I did!",
    handle: "@ Sam",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What services does LLamaYield provide?",
    answer:
      "LLamaYield provides AI workflow automation, AI assistants and copilots, AI consulting, and technology integration to help businesses work smarter and scale efficiently.",
  },
  {
    question: "Do you build and implement AI solutions?",
    answer:
      "Yes. We design, develop, and integrate AI solutions tailored to your business needs, from intelligent assistants and automation to custom AI-powered applications.",
  },
  {
    question: "How long does an AI project typically take?",
    answer:
      "Project timelines depend on the scope and complexity. Smaller solutions can be delivered quickly, while larger AI systems may require several weeks or longer.",
  },
  {
    question: "How do you keep our data secure?",
    answer:
      "We prioritize security throughout development by using secure architectures, controlled access, data protection practices, and appropriate security measures for each project.",
  },
  {
    question: "How can we get started with LLamaYield?",
    answer:
      "Simply get in touch with our team and tell us about your idea, challenge, or business process. We will help identify the right AI or software solution and plan the next steps.",
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
      image: "/img/Lama/why-us-1.png",
    },
    {
      title: "Customer Centricity",
      body: "We put our clients at the heart of every decision, listening closely, communicating openly and shaping each solution around your goals so every project delivers real value.",
      image: "/img/Lama/why-us-2.png",
    },
  ],
};

export const GROWTH_STATS = [
  { value: "$4.8m", label: "In pure profits for our clients" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "30+", label: "Agents working for you" },
  { value: "2K+", label: "Business boost with AI" },
];
