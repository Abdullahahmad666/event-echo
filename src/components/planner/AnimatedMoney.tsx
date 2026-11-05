import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { formatMoney } from "@/lib/planner";

/** A dollar amount that counts smoothly to its new value. */
export function AnimatedMoney({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const text = useTransform(motionValue, (v) => formatMoney(Math.round(v / 50) * 50));

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 0.45, ease: "easeOut" });
    return () => controls.stop();
  }, [value, reduceMotion, motionValue]);

  return <motion.span>{text}</motion.span>;
}

export function AnimatedRange({ low, high }: { low: number; high: number }) {
  return (
    <span className="whitespace-nowrap tabular-nums">
      <AnimatedMoney value={low} />
      <span className="mx-1.5 opacity-60">–</span>
      <AnimatedMoney value={high} />
    </span>
  );
}
