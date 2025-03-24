
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slide" | "scale";
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 0,
  animation = "fade",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide":
        return "animate-slide-in";
      case "scale":
        return "animate-scale-in";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      className={cn(
        isVisible ? getAnimationClass() : "opacity-0",
        "transition-all duration-500 ease-out",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
