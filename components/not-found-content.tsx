import Image from "next/image";
import { ButtonPrimary } from "./button-primary";
import { DotPattern } from "./dot-pattern";

export function NotFoundContent() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pb-[120px] pt-[196px]">
      <DotPattern opacity={0.2} />
      <Image
        src="/img/Lama/hero-bg.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none object-cover opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[278px] bg-gradient-to-t from-ink to-transparent"
      />

      <div className="container-page relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-[clamp(6rem,22vw,16rem)] font-light leading-none text-snow">
          404
        </h1>
        <h2 className="text-h4 text-snow">Oops page not found</h2>
        <p className="text-light max-w-[560px] text-mist">
          We&apos;re sorry to announce that the page you&apos;re seeking appears to be out
          of our reach. We apologize for any discomfort this may provoke.
        </p>
        <ButtonPrimary href="/">back to home</ButtonPrimary>
      </div>
    </section>
  );
}
