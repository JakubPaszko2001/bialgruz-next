"use client";

import { motion } from "framer-motion";

/**
 * Wjazd treści oferty „w bok" przy wejściu na podstronę.
 * from="right" — wjeżdża z prawej (toalety), from="left" — z lewej (kontenery).
 */
export default function OfferTransition({ from = "right", children }) {
  const x = from === "right" ? 80 : -80;
  return (
    <motion.div
      className="overflow-x-hidden"
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
