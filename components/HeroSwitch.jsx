"use client";

import Link from "next/link";

const OFFERS = {
  kontenery: { label: "Kontenery", href: "/kontenery", icon: "📦" },
  toalety: { label: "Toalety", href: "/toalety-przenosne", icon: "🚻" },
};

export default function HeroSwitch({ active }) {
  const otherKey = active === "kontenery" ? "toalety" : "kontenery";
  const other = OFFERS[otherKey];

  return (
    <Link
      href={other.href}
      aria-label={`Przejdź do oferty: ${other.label}`}
      className="group absolute right-0 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-l-full border border-r-0 border-white/15 bg-white/[0.07] py-2.5 pl-3 pr-2.5 backdrop-blur transition-all duration-300 hover:gap-3 hover:bg-brand-yellow sm:gap-2.5 sm:py-3 sm:pl-5 sm:pr-4"
    >
      <span className="text-right leading-tight">
        <span className="hidden text-[9px] font-semibold uppercase tracking-[2px] text-white/50 transition-colors group-hover:text-ink-black/70 sm:block">
          Zobacz też
        </span>
        <span className="flex items-center justify-end gap-1.5 font-display text-[11px] font-bold uppercase tracking-[1px] text-white transition-colors group-hover:text-ink-black sm:text-[15px]">
          <span className="text-[13px] sm:text-[15px]">{other.icon}</span>
          {other.label}
        </span>
      </span>
      <span className="text-[15px] leading-none text-brand-yellow transition-all group-hover:translate-x-0.5 group-hover:text-ink-black sm:text-[18px]">
        →
      </span>
    </Link>
  );
}
