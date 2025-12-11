import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  duration?: number; // in ms
}

const Animation: React.FC<AnimationProps> = ({
  children,
  duration = 20,
}) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
      >
        {children}
        {/* Duplicate content for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
};

export default Animation;
