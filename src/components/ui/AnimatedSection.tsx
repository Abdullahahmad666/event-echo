import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-in",
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    "fade-in": "translate-y-8 opacity-0",
    "slide-up": "translate-y-12 opacity-0",
    "slide-left": "-translate-x-12 opacity-0",
    "slide-right": "translate-x-12 opacity-0",
    "scale-in": "scale-95 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100" : animationClasses[animation]
      } ${className}`}
    >
      {children}
    </div>
  );
}
