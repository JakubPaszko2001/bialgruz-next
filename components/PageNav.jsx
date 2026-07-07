"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const LINKS = [
  { label: "Oferta", href: "#oferta" },
  { label: "Dlaczego My", href: "#dlaczego" },
  { label: "Jak To Działa", href: "#jak" },
];

export default function PageNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[300] flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[rgba(13,13,13,0.92)] px-6 backdrop-blur-md sm:px-[60px]">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="BIOLGRUZ" width={160} height={46} className="h-[46px] w-auto" priority />
      </Link>

      <ul className="hidden items-center gap-9 md:flex">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[14px] font-medium uppercase tracking-[1px] text-[#cccccc] transition-colors hover:text-brand-yellow"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#kontakt"
            className="rounded bg-brand-yellow px-[22px] py-2.5 text-[14px] font-bold uppercase tracking-[1px] text-ink-black transition-colors hover:bg-brand-yellowDark"
          >
            Zamów Teraz
          </a>
        </li>
      </ul>

      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded border border-white/15 text-white md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[72px] border-b border-white/10 bg-ink-black px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-widest text-[#cccccc] hover:text-brand-yellow"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded bg-brand-yellow px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-ink-black"
              >
                Zamów Teraz
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
