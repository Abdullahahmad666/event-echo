import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { PlannerExtra } from "@/data/plannerConfig";

interface ExtrasListProps {
  extras: PlannerExtra[];
  selected: string[];
  onToggle: (id: string, on: boolean) => void;
}

export function ExtrasList({ extras, selected, onToggle }: ExtrasListProps) {
  return (
    <ul className="space-y-3">
      {extras.map((extra) => {
        const on = selected.includes(extra.id);
        const id = `extra-${extra.id}`;
        return (
          <li key={extra.id} className="flex items-center gap-3 border border-border bg-background px-4 py-3.5">
            <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
              <span className={cn("block font-serif text-lg leading-tight transition-colors", on ? "text-foreground" : "text-foreground/70")}>
                {extra.name}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{extra.description}</span>
            </label>
            <Switch
              id={id}
              checked={on}
              onCheckedChange={(checked) => onToggle(extra.id, checked)}
              className="data-[state=checked]:bg-clay"
            />
          </li>
        );
      })}
    </ul>
  );
}
