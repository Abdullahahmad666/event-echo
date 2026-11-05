import { cn } from "@/lib/utils";
import { AnimatedRange } from "./AnimatedMoney";

interface StickyPackageBarProps {
  low: number;
  high: number;
  hasPackage: boolean;
  visible: boolean;
  onView: () => void;
}

/** Mobile/tablet only: keeps the live price on screen while the visitor edits. */
export function StickyPackageBar({ low, high, hasPackage, visible, onView }: StickyPackageBarProps) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 lg:hidden transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3 bg-deep-espresso py-3 pl-5 pr-3 text-cream shadow-[0_18px_40px_-18px_rgba(30,20,15,0.7)]">
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">Your package</span>
        <span className="min-w-0 flex-1 truncate font-serif text-xl">
          {hasPackage ? <AnimatedRange low={low} high={high} /> : "Let's talk"}
        </span>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={onView}
          className="bg-cream px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-sienna"
        >
          View
        </button>
      </div>
    </div>
  );
}
