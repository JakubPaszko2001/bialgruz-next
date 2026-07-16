"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  { name: "Białystok", img: "/Białystok.png" },
  { name: "Wasilków", img: "/Wasilków.png" },
  { name: "Czarna Białostocka", img: "/Czarna-białostocka.png" },
  { name: "Sokółka", img: "/Sokółka.png" },
];

const INTERVAL = 4000;

export default function Locations() {
  const [active, setActive] = useState(0);

  // Auto-zmiana co kilka sekund; timer resetuje się przy każdej zmianie (też po najechaniu)
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % LOCATIONS.length), INTERVAL);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section id="lokalizacje" className="flex min-h-screen items-center overflow-hidden bg-ink-black px-6 py-16 sm:px-[60px]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Lewa strona — napisy */}
        <div>
          <div className="mb-8 font-display text-[12px] font-bold uppercase tracking-[4px] text-brand-yellow">
            Lokalizacje
          </div>
          <ul className="flex flex-col gap-2">
            {LOCATIONS.map((loc, i) => {
              const isActive = i === active;
              return (
                <li key={loc.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`text-left font-display text-[clamp(34px,6vw,68px)] font-black uppercase leading-[1.02] tracking-[-1px] transition-colors duration-300 ${
                      isActive ? "text-brand-yellow" : "text-white/25 hover:text-white/60"
                    }`}
                  >
                    {loc.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 max-w-[420px] text-[15px] leading-[1.65] text-[#cccccc]">
            Działamy w Białymstoku i okolicznych miejscowościach — podstawiamy i odbieramy w całym regionie.
          </p>
        </div>

        {/* Prawa strona — plakat lokalizacji */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px]">
          <AnimatePresence>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={LOCATIONS[active].img}
                alt={`Mapa lokalizacji — ${LOCATIONS[active].name}`}
                fill
                sizes="(max-width: 768px) 100vw, 440px"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
