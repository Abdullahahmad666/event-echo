import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  delay?: number; // in ms
}

const Animation: React.FC<AnimationProps> = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}          // 👈 Start left
      whileInView={{ opacity: 1, x: 0 }}        // 👈 End at normal position
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: delay / 1000,   // convert ms → seconds
      }}
      viewport={{ once: true, amount: 0.3 }}     // animate only once
    >
      {children}
    </motion.div>
  );
};

export default Animation;
