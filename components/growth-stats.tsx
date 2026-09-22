import { ArrowDots } from "./arrow-dots";
import { GROWTH_STATS } from "@/lib/content";

export function GrowthStats() {
  return (
    <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {GROWTH_STATS.map((stat) => (
        <div key={stat.label} className="flex items-start gap-5">
          <ArrowDots className="mt-1.5 shrink-0 text-accent" />
          <div className="flex flex-col gap-[5px]">
            <dt className="font-num text-5xl font-medium text-snow">{stat.value}</dt>
            <dd className="text-light text-mist">{stat.label}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
