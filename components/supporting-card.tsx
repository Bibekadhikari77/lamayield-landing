import { ArrowDots } from "./arrow-dots";

// The project's "Supporting card" component.
export function SupportingCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article className="flex flex-1 flex-col gap-4 bg-void p-8 transition-colors hover:bg-void/80">
      <ArrowDots className="text-accent" />
      <h3 className="font-display text-2xl font-normal text-snow">{title}</h3>
      <p className="text-light text-mist">{body}</p>
    </article>
  );
}
