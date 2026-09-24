import Link from "next/link";
import { ButtonPrimary } from "./button-primary";
import { DotPattern } from "./dot-pattern";
import { Logo } from "./logo";
import { LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from "./site-nav";

// The project's Footer component: a CTA band, a short company line and the
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
           Build smarter. Move faster. Grow further.
          </h2>
          <p className="text-light max-w-[620px] text-mist">
            LLamaYield combines AI, automation, and modern software engineering to transform ambitious ideas into practical digital solutions.
          </p>
          <ButtonPrimary href="/contact">Get in Touch</ButtonPrimary>
        </div>

        {/* Company line + link columns */}
        <div className="flex flex-col gap-14 border-t border-line py-16 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="LLamaYield home" className="text-snow">
              <Logo />
            </Link>

            <p className="text-body-sm mt-6 text-mist/70">
              AI-powered software that helps businesses work smarter and grow faster. From
              strategy and design to development, integration and ongoing support, we deliver
              tailored solutions that fit the way you work and scale as you grow.
            </p>
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
          <p className="text-body-sm text-dim">©2026 LLamaYield.</p>
          <p className="text-body-sm flex items-center gap-3 text-dim">
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms-of-use" className="transition-colors hover:text-accent">
              Terms of use
            </Link>
          </p>
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
