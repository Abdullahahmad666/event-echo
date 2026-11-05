import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlannerCardProps {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PlannerCard({ step, title, description, children, className }: PlannerCardProps) {
  return (
    <section className={cn("relative border border-border bg-card/70 p-6 md:p-8", className)}>
      <span aria-hidden className="absolute right-6 top-5 font-serif text-2xl italic text-clay/60 md:right-8 md:top-7">
        {step}
      </span>
      <h2 className="pr-10 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
      {description && <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
