"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const PhoneIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M2 2.5C2 2.5 4 1 5.5 3.5L6.5 5.5C6.5 5.5 7 6.5 6 7.5L5 8.5C5 8.5 6.5 11 8.5 13L9.5 12C10.5 11 11.5 11.5 11.5 11.5L13.5 12.5C16 14 14.5 16 14.5 16S4 15 2 5 2 2.5 2 2.5Z"
      fill="currentColor"
    />
  </svg>
);

const NAV_LINKS = [
  { label: "Toalety przenośne", href: "/toalety-przenosne" },
  { label: "Kontenery na gruz", href: "/kontenery" },
  { label: "O firmie", href: "/#o-firmie" },
  { label: "Kontakt", href: "tel:799093000" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[300] flex h-16 items-center justify-between border-b border-white/10 bg-[rgba(10,10,10,0.97)] px-5 backdrop-blur-md sm:px-10">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.png" alt="BIOLGRUZ" width={140} height={40} className="h-10 w-auto" priority />
      </Link>

      <ul className="hidden items-center gap-7 md:flex">
        {NAV_LINKS.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-[11px] font-semibold uppercase tracking-[1.8px] text-white/50 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="group relative">
          <a
            href="tel:799093000"
            className="flex items-center gap-2 rounded-[3px] bg-brand-yellow px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[2px] text-white transition-colors hover:bg-brand-yellowDk"
          >
            <PhoneIcon />
            Zadzwoń
          </a>
          <div className="pointer-events-none absolute right-0 top-full z-[200] translate-y-[-4px] pt-2.5 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <div className="min-w-[230px] overflow-hidden rounded border border-white/10 bg-ink-600">
              <div className="border-b border-white/10 px-[18px] pb-3.5 pt-3">
                <span className="mb-2 block text-[9px] font-bold uppercase tracking-[1.5px] text-brand-yellow">
                  Kontenery na gruz
                </span>
                <a href="tel:799091000" className="block py-[5px] text-[15px] font-semibold text-white transition-colors hover:text-brand-yellow">
                  799 091 000
                </a>
                <a href="tel:799092000" className="block py-[5px] text-[15px] font-semibold text-white transition-colors hover:text-brand-yellow">
                  799 092 000
                </a>
              </div>
              <div className="px-[18px] pb-3.5 pt-3">
                <span className="mb-2 block text-[9px] font-bold uppercase tracking-[1.5px] text-brand-yellow">
                  Toalety przenośne
                </span>
                <a href="tel:799093000" className="block py-[5px] text-[15px] font-semibold text-white transition-colors hover:text-brand-yellow">
                  799 093 000
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded border border-white/15 text-white md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-white/10 bg-ink-950 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
