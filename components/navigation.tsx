"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "./button-primary";
import { Logo } from "./logo";
import { NAV_LINKS } from "./site-nav";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6">
      <nav
        className={`container-page flex items-center justify-between rounded-[50px] border py-2.5 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-line bg-[rgb(22,22,26)]/70 backdrop-blur-[15px]"
            : "border-transparent"
        }`}
      >
        <Link href="/" aria-label="LLamaYield home" className="text-snow">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-base transition-colors ${
                    active ? "text-snow" : "text-mist/70 hover:text-snow"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonPrimary href="/contact">Get IN Touch</ButtonPrimary>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="flex size-10 items-center justify-center rounded-full border border-line text-snow md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M2 5.5h14M2 12.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="container-page mt-2 rounded-3xl border border-line bg-[rgb(22,22,26)]/90 p-4 backdrop-blur-[15px] md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-lg text-mist transition-colors hover:bg-white/5 hover:text-snow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center rounded-[50px] bg-cream px-5 py-3 font-medium text-[rgb(25,25,26)]"
          >
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}
