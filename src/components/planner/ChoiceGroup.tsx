import { cn } from "@/lib/utils";

interface ChoiceGroupProps<T extends string> {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** "segmented" = equal-width bar, "chips" = wrapping pills. */
  variant?: "segmented" | "chips";
}

export function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  variant = "segmented",
}: ChoiceGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        variant === "segmented" ? "grid gap-1 bg-muted p-1" : "flex flex-wrap gap-2",
      )}
      style={variant === "segmented" ? { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` } : undefined}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "font-sans text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay",
              variant === "segmented"
                ? cn(
                    "py-2.5",
                    selected ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )
                : cn(
                    "rounded-full border px-4 py-1.5",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  ),
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
