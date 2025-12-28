import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
  delay?: number;
  duration?: number;
}

const animationClasses = {
  "fade-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "scale": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  "fade": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
};

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, className, animation = "fade-up", delay = 0, duration = 600 }, forwardedRef) => {
    const { ref: animationRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const classes = animationClasses[animation];

    // Combine refs
    const setRefs = (node: HTMLDivElement | null) => {
      (animationRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div
        ref={setRefs}
        className={cn(
          "transition-all ease-out",
          isVisible ? classes.visible : classes.hidden,
          className
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
