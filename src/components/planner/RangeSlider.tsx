import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  valueText: string;
  minLabel: string;
  maxLabel: string;
  className?: string;
}

export function RangeSlider({
  value,
  min,
  max,
  step,
  onChange,
  label,
  valueText,
  minLabel,
  maxLabel,
  className,
}: RangeSliderProps) {
  return (
    <div className={className}>
      <SliderPrimitive.Root
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="relative flex w-full h-8 touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-border">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-soft-sienna to-clay" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={label}
          aria-valuetext={valueText}
          className={cn(
            "block h-6 w-6 rounded-full border-2 border-clay bg-background shadow-md",
            "transition-transform duration-150 hover:scale-110 active:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        />
      </SliderPrimitive.Root>
      <div className="mt-2 flex justify-between font-sans text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
