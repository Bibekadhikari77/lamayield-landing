import Link from "next/link";

export function ButtonPrimary({ href, children, variant = "solid" }: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  return (
    <Link href={href} className={`button-primary button-primary--${variant}`}>
      <span>{children}</span>
      <span aria-hidden="true" className="button-primary-corners" />
    </Link>
  );
}
