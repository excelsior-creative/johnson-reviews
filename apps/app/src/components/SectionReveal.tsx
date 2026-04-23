"use client";

import { m, useReducedMotion } from "framer-motion";
import React from "react";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** ms before the animation starts */
  delay?: number;
  /** translate distance in px */
  distance?: number;
  /** "rise" (translateY) or "fade" (opacity only) */
  variant?: "rise" | "fade";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const SectionReveal = ({
  children,
  className,
  delay = 0,
  distance = 14,
  variant = "rise",
}: SectionRevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === "fade"
      ? { opacity: 0 }
      : { opacity: 0, y: distance };
  const animate = variant === "fade" ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <m.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
};
