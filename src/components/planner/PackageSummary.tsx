import { forwardRef } from "react";
import { Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlannerExtra } from "@/data/plannerConfig";
import { formatMoney, type BudgetStatus, type PricedItem, type PricedPackage } from "@/lib/planner";
import { AnimatedRange } from "./AnimatedMoney";

interface PackageSummaryProps {
  pkg: PricedPackage;
  status: BudgetStatus;
  budget: number;
  customized: boolean;
  onSetTier: (categoryId: string, tierIndex: number | null) => void;
  onRemoveExtra: (id: string) => void;
  onReset: () => void;
  onBook: () => void;
}

const statusText: Record<BudgetStatus, (budget: string) => string> = {
  within: (b) => `Within your ${b} budget`,
  "slightly-over": (b) => `A little over your ${b} budget`,
  over: (b) => `Over your ${b} budget`,
};

export const PackageSummary = forwardRef<HTMLElement, PackageSummaryProps>(function PackageSummary(
  { pkg, status, budget, customized, onSetTier, onRemoveExtra, onReset, onBook },
  ref,
) {
  const included = pkg.items.filter((i) => i.tierIndex !== null);
  const hasPackage = included.length > 0 || pkg.extras.length > 0;
  const fill = status === "within" && budget > 0 ? Math.max(0.06, pkg.high / budget) : 1;

  return (
    <section
      ref={ref}
      aria-labelledby="package-heading"
      className="scroll-mt-28 border border-border bg-background p-6 shadow-[0_24px_60px_-40px_rgba(60,40,30,0.45)] md:p-8"
    >
      <p id="package-heading" className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span aria-hidden className="h-px w-8 bg-clay/60" />
        {customized ? "Your package" : "Our suggestion"}
      </p>

      <p aria-live="polite" aria-atomic className="mt-4 font-serif text-4xl text-clay md:text-[2.75rem] leading-none">
        {hasPackage ? <AnimatedRange low={pkg.low} high={pkg.high} /> : "Let's talk"}
      </p>

      {hasPackage && (
        <>
          <div className="mt-5 h-[3px] w-full bg-border" aria-hidden>
            <div
              className={cn(
                "h-full transition-all duration-500 ease-out",
                status === "within" ? "bg-gradient-to-r from-soft-sienna to-clay" : "bg-clay",
              )}
              style={{ width: `${Math.min(fill, 1) * 100}%` }}
            />
          </div>
          <p className={cn("mt-3 text-sm", status === "within" ? "text-foreground/70" : "font-medium text-clay")}>
            {statusText[status](formatMoney(budget))}
          </p>
        </>
      )}

      {!hasPackage && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {pkg.items.length === 0 && pkg.extras.length === 0
            ? "Switch something on under “What matters most?” and we'll build a package around it."
            : "This budget is below our smallest setup for your guest count. Tap + on anything below to see what it would take, or book a call and we'll get creative together."}
        </p>
      )}

      {(pkg.items.length > 0 || pkg.extras.length > 0) && (
        <ul className="mt-6 divide-y divide-border border-t border-border">
          {pkg.items.map((item) => (
            <PackageLine key={item.category.id} item={item} onSetTier={onSetTier} />
          ))}
          {pkg.extras.map((extra) => (
            <ExtraLine key={extra.id} extra={extra} onRemove={() => onRemoveExtra(extra.id)} />
          ))}
        </ul>
      )}

      {customized && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-sm text-foreground underline decoration-clay/50 underline-offset-4 hover:decoration-clay"
        >
          Reset to our suggestion
        </button>
      )}

      <button
        type="button"
        onClick={onBook}
        className="mt-6 w-full bg-foreground px-6 py-4 font-sans text-xs uppercase tracking-[0.2em] text-background transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
      >
        Book a call about this package
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        This range is an estimate. Every design is custom, and we'll settle on an exact number together on your call.
      </p>
    </section>
  );
});

function PackageLine({
  item,
  onSetTier,
}: {
  item: PricedItem;
  onSetTier: (categoryId: string, tierIndex: number | null) => void;
}) {
  const { category, tierIndex } = item;
  const tier = tierIndex !== null ? category.tiers[tierIndex] : null;
  const image = (tier ?? category.tiers[0]).image;
  const canGoDown = tierIndex !== null;
  const canGoUp = tierIndex === null || tierIndex < category.tiers.length - 1;

  const down = () => onSetTier(category.id, tierIndex === 0 ? null : (tierIndex ?? 0) - 1);
  const up = () => onSetTier(category.id, tierIndex === null ? 0 : tierIndex + 1);

  return (
    <li className="flex gap-4 py-5">
      <img
        src={image}
        alt=""
        loading="lazy"
        className={cn("h-14 w-14 shrink-0 object-cover transition-all duration-300", !tier && "opacity-40 grayscale")}
      />
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{category.label}</p>
        {tier ? (
          <>
            <p className="mt-0.5 font-serif text-xl leading-tight text-foreground">{tier.name}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{tier.description}</p>
          </>
        ) : (
          <>
            <p className="mt-0.5 font-serif text-xl italic leading-tight text-muted-foreground">Not in this package yet</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">Tap + to add it anyway</p>
          </>
        )}

        <div className="mt-3 flex items-center gap-3">
          <StepButton onClick={down} disabled={!canGoDown} label={`Less ${category.label}`}>
            <Minus className="h-3.5 w-3.5" />
          </StepButton>
          <span role="img" className="flex gap-1.5" aria-label={tier ? `Level ${tierIndex! + 1} of ${category.tiers.length}` : "Not included"}>
            {category.tiers.map((t, i) => (
              <span
                key={t.name}
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                  tierIndex !== null && i <= tierIndex ? "bg-clay" : "bg-border",
                )}
              />
            ))}
          </span>
          <StepButton onClick={up} disabled={!canGoUp} label={`More ${category.label}`}>
            <Plus className="h-3.5 w-3.5" />
          </StepButton>
        </div>
      </div>
    </li>
  );
}

function ExtraLine({ extra, onRemove }: { extra: PlannerExtra; onRemove: () => void }) {
  return (
    <li className="flex items-start gap-4 py-5">
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Extra</p>
        <p className="mt-0.5 font-serif text-xl leading-tight text-foreground">{extra.name}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{extra.description}</p>
      </div>
      <StepButton onClick={onRemove} disabled={false} label={`Remove ${extra.name}`}>
        <X className="h-3.5 w-3.5" />
      </StepButton>
    </li>
  );
}

function StepButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-clay hover:bg-clay hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
