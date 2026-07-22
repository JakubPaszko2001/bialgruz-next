"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover/cta:translate-x-1.5">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Chip({ children }) {
  return (
    <span className="rounded-[2px] border border-brand-yellow px-3 py-1 font-display text-[13px] font-bold tracking-[1px] text-brand-yellow">
      {children}
    </span>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5 border-r border-white/10 px-3 text-center last:border-r-0">
      <span className="text-brand-yellow">{icon}</span>
      <span className="text-[10px] font-bold uppercase leading-[1.4] tracking-[1.5px] text-white/75">{label}</span>
    </div>
  );
}

function Panel({ eyebrowless, title1, title2, chips, features, desc, href, img, imgAlt, imgClass, index }) {
  return (
    <motion.div
      className="bg-diagonal group relative grid grid-rows-[1fr_auto] overflow-hidden p-6 sm:p-[52px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <span
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "80px 80px 0 0",
          borderColor: "rgba(255,255,255,0.03) transparent transparent transparent",
        }}
      />

      <div className="relative z-[2] flex max-w-[380px] flex-col">
        <h2 className="mb-7 font-display font-black uppercase leading-[0.88] tracking-[-1px]">
          <span className="block text-[clamp(40px,9vw,80px)] text-white">{title1}</span>
          <span className="block text-[clamp(40px,9vw,80px)] text-brand-yellow">{title2}</span>
        </h2>

        <div className="mb-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>

        <div className="mb-7 flex border-y border-white/10 py-[18px]">
          {features.map((f) => (
            <Feature key={f.label} icon={f.icon} label={f.label} />
          ))}
        </div>

        <p className="mb-9 text-[14px] leading-[1.75] text-white/55">{desc}</p>

        <Link
          href={href}
          className="group/cta inline-flex w-fit items-center gap-2.5 rounded-[3px] bg-brand-yellow px-7 py-[15px] font-display text-[13px] font-bold uppercase tracking-[2px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-yellowDk"
        >
          Wybierz katalog
          <ArrowIcon />
        </Link>
      </div>

      <div className={`pointer-events-none absolute z-[1] opacity-20 sm:opacity-100 ${imgClass}`}>
        <Image
          src={img}
          alt={imgAlt}
          width={600}
          height={800}
          className="w-full drop-shadow-[0_24px_56px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-2.5 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

const shieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[22px] w-[22px]">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function HomePanels() {
  return (
    <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
      <Panel
        index={0}
        title1="Toalety"
        title2="przenośne"
        chips={["Plac budowy", "Eventy", "Serwis"]}
        features={[
          { icon: shieldIcon, label: "Nowoczesne i higieniczne" },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[22px] w-[22px]">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            ),
            label: "Kompleksowy serwis",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[22px] w-[22px]">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            ),
            label: "Terminowy transport",
          },
        ]}
        desc="Nowoczesne kabiny na place budowy i eventy plenerowe. Kompleksowy serwis, terminowy transport."
        href="/toalety-przenosne"
        img="/toaleta-bialgruz.png"
        imgAlt="Toaleta przenośna Białgruz"
        imgClass="right-[-10px] top-1/2 w-[42%] -translate-y-1/2"
      />

      <Panel
        index={1}
        title1="Kontenery"
        title2="na odpady"
        chips={["1 m³", "5 m³", "7 m³"]}
        features={[
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[22px] w-[22px]">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
            ),
            label: "Różne pojemności",
          },
          { icon: shieldIcon, label: "Szybki odbiór i dostawa" },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[22px] w-[22px]">
                <path d="M23 7l-7 5-7-5V5l7 5 7-5v2zM1 7l7 5-7 5V7z" />
                <path d="M1 7h22v10H1z" />
              </svg>
            ),
            label: "Uczciwość i terminowość",
          },
        ]}
        desc="Big Bag 1 m³, kontenery 5 m³ i 7 m³ na odpady budowlane. Szybki odbiór, doświadczenie, uczciwość, terminowość."
        href="/kontenery"
        img="/kontener-bialgruz.png"
        imgAlt="Kontener na gruz Białgruz"
        imgClass="right-[-20px] bottom-[15%] w-[56%]"
      />
    </div>
  );
}
