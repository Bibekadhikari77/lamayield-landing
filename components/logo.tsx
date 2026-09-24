import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src="/img/logo-mark.png" alt="" width={28} height={28} className="size-7 object-contain" />
      <span className="font-display text-xl font-medium tracking-tight">LLamaYield</span>
    </span>
  );
}
