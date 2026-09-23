import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

// Clash Grotesk is the display face used by every heading style in the project.
const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "../public/fonts/ClashGrotesk-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ClashGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashGrotesk-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashGrotesk-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "LamaYield — Technical leadership and delivery of quality software",
    template: "%s — LamaYield",
  },
  description:
    "LamaYield provides technical leadership and delivery of quality software, from architecture and integrations through to machine learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${inter.variable} ${schibsted.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-snow">
        <Navigation />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
