import { useState, type KeyboardEvent } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { getCategory, type Priority } from "@/lib/planner";

interface PriorityListProps {
  priorities: Priority[];
  onChange: (priorities: Priority[]) => void;
}

export function PriorityList({ priorities, onChange }: PriorityListProps) {
  const [announcement, setAnnouncement] = useState("");
  const byId = new Map(priorities.map((p) => [p.id, p]));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= priorities.length) return;
    const next = [...priorities];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
    setAnnouncement(`${getCategory(item.id)?.label} moved to position ${target + 1} of ${next.length}`);
  };

  const toggle = (id: string, enabled: boolean) =>
    onChange(priorities.map((p) => (p.id === id ? { ...p, enabled } : p)));

  return (
    <>
      <Reorder.Group
        as="ol"
        axis="y"
        values={priorities.map((p) => p.id)}
        onReorder={(ids: string[]) => onChange(ids.map((id) => byId.get(id)!))}
        className="space-y-3"
      >
        {priorities.map((priority, index) => (
          <PriorityRow
            key={priority.id}
            priority={priority}
            index={index}
            total={priorities.length}
            onMove={(delta) => move(index, delta)}
            onToggle={(enabled) => toggle(priority.id, enabled)}
          />
        ))}
      </Reorder.Group>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>
  );
}

interface PriorityRowProps {
  priority: Priority;
  index: number;
  total: number;
  onMove: (delta: number) => void;
  onToggle: (enabled: boolean) => void;
}

function PriorityRow({ priority, index, total, onMove, onToggle }: PriorityRowProps) {
  const controls = useDragControls();
  const category = getCategory(priority.id);
  if (!category) return null;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onMove(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onMove(1);
    }
  };

  return (
    <Reorder.Item
      as="li"
      value={priority.id}
      dragListener={false}
      dragControls={controls}
      className="relative flex items-center gap-3 border border-border bg-background py-3.5 pl-2 pr-4"
      whileDrag={{ scale: 1.02, boxShadow: "0 12px 28px -12px rgba(60, 40, 30, 0.35)", borderColor: "hsl(var(--clay))", zIndex: 10 }}
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        onKeyDown={onKeyDown}
        aria-label={`Reorder ${category.label}, priority ${index + 1} of ${total}. Use the up and down arrow keys to move.`}
        className="cursor-grab touch-none p-1.5 text-muted-foreground/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span
        aria-hidden
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-serif text-sm transition-colors",
          priority.enabled ? "border-clay/50 text-clay" : "border-border text-muted-foreground/50",
        )}
      >
        {index + 1}
      </span>
      <div className={cn("min-w-0 flex-1 transition-opacity", !priority.enabled && "opacity-45")}>
        <p className="font-serif text-lg leading-tight text-foreground">{category.label}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{category.blurb}</p>
      </div>
      <Switch
        checked={priority.enabled}
        onCheckedChange={onToggle}
        aria-label={`Include ${category.label}`}
        className="data-[state=checked]:bg-clay"
      />
    </Reorder.Item>
  );
}
