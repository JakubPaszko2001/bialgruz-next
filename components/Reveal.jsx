"use client";

import { motion } from "framer-motion";

/**
 * Fade + rise on scroll into view. Wraps children in a motion element.
 * Usage: <Reveal delay={0.1}>...</Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className = "",
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
