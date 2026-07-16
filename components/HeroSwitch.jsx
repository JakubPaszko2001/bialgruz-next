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
      className="group absolute right-0 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2.5 rounded-l-full border border-r-0 border-white/15 bg-white/[0.07] py-3 pl-4 pr-3 backdrop-blur transition-all duration-300 hover:gap-3 hover:bg-brand-yellow sm:pl-5 sm:pr-4"
    >
      <span className="text-right leading-tight">
        <span className="block text-[9px] font-semibold uppercase tracking-[2px] text-white/50 transition-colors group-hover:text-ink-black/70">
          Zobacz też
        </span>
        <span className="flex items-center justify-end gap-1.5 font-display text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors group-hover:text-ink-black sm:text-[15px]">
          <span className="text-[15px]">{other.icon}</span>
          {other.label}
        </span>
      </span>
      <span className="text-[18px] leading-none text-brand-yellow transition-all group-hover:translate-x-0.5 group-hover:text-ink-black">
        →
      </span>
    </Link>
  );
}
