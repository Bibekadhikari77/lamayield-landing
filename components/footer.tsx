import Link from "next/link";
import { ButtonPrimary } from "./button-primary";
import { DotPattern } from "./dot-pattern";
import { Logo } from "./logo";
import { LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from "./site-nav";

// The project's Footer component: a CTA band, the newsletter block and the
// Navigation / Legal / Socials columns.
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void">
      <DotPattern opacity={0.12} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-[110vw] -translate-x-1/2 rounded-[50%] bg-accent/15 blur-[120px]"
      />

      <div className="container-page relative z-10">
        {/* CTA band */}
        <div className="flex flex-col items-center gap-8 py-[120px] text-center">
          <h2 className="text-h2 max-w-[820px] text-snow">
            Softgent has the full types of potential for your start-up business.
          </h2>
          <p className="text-light max-w-[620px] text-mist">
            Softgent helps teams build chatbots, voice agents, and workflow automations -
            all in one intelligent platform.
          </p>
          <ButtonPrimary href="/contact">Get in Touch</ButtonPrimary>
        </div>

        {/* Newsletter + link columns */}
        <div className="flex flex-col gap-14 border-t border-line py-16 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="Softgent home" className="text-snow">
              <Logo />
            </Link>

            <form className="mt-8">
              <p className="text-body font-medium text-snow">Newsletter</p>
              <label htmlFor="newsletter" className="text-body-sm mt-1 block text-dim">
                Updated you with our services.
              </label>
              <div className="mt-4 flex items-center gap-2 rounded-[50px] border border-line p-1.5 focus-within:border-accent/60">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-2 text-base text-snow outline-none placeholder:text-dim"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-[50px] bg-cream px-5 py-2 text-base font-medium text-[rgb(25,25,26)] transition-colors hover:bg-[rgb(239,236,228)]"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <FooterColumn title="Navigation">
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Socials">
              {SOCIAL_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href} external>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-body-sm text-dim">©2026 Softgent.</p>
          <p className="text-body-sm text-dim">Built in Framer</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-body-sm font-medium text-snow">{title}</p>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "text-body-sm text-mist/70 transition-colors hover:text-accent";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}
