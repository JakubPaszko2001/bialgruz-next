import Reveal from "@/components/Reveal";
import { Eyebrow, SectionTitle, check } from "@/components/subUI";

const personIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
  </svg>
);

const twoPersonIcon = (
  <svg viewBox="0 0 30 24" fill="currentColor" className="h-7 w-7">
    <circle cx="8" cy="6" r="3.5" />
    <path d="M1 22c0-3.9 3.1-7 7-7s7 3.1 7 7z" />
    <circle cx="22" cy="6" r="3.5" />
    <path d="M15 22c0-3.9 3.1-7 7-7s7 3.1 7 7z" />
  </svg>
);

const PACKAGES = [
  {
    period: "7 Dni", note: "z 1 serwisem", price: "199", netto: "184,26 zł netto", icon: personIcon,
    features: ["Wynajem na 7 dni", "1 serwis w cenie", "Transport w obie strony"],
  },
  {
    period: "1 Miesiąc", note: "z 1 serwisem", price: "249", netto: "230,56 zł netto", icon: personIcon, featured: true,
    features: ["Wynajem na 1 miesiąc", "1 serwis w cenie", "Transport w obie strony"],
  },
  {
    period: "1 Miesiąc", note: "z 2 serwisami", price: "349", netto: "323,15 zł netto", icon: twoPersonIcon,
    features: ["Wynajem na 1 miesiąc", "2 serwisy w cenie", "Transport w obie strony"],
  },
  {
    period: "1 Miesiąc", note: "z 4 serwisami", price: "479", netto: "443,52 zł netto", icon: twoPersonIcon,
    features: ["Wynajem na 1 miesiąc", "4 serwisy w cenie", "Transport w obie strony"],
  },
];

export default function OfferToilets() {
  return (
    <section id="oferta" className="bg-ink-800 px-6 py-20 sm:px-[60px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal className="mb-13 flex flex-wrap items-end justify-between gap-10">
          <div>
            <Eyebrow>Nasza oferta</Eyebrow>
            <SectionTitle>
              Toalety na <em className="not-italic text-brand-yellow">każdą</em>
              <br />
              potrzebę
            </SectionTitle>
          </div>
          <p className="max-w-[500px] text-[16px] leading-[1.7] text-[#cccccc]">
            Oferujemy szeroki wybór pakietów wynajmu dopasowanych do różnych zastosowań — od małych budów po duże eventy.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-[10px] border bg-ink-600 px-[22px] pb-[22px] pt-7 transition-all hover:-translate-y-1 hover:border-brand-yellow ${
                  p.featured ? "border-brand-yellow" : "border-white/[0.07]"
                }`}
              >
                {p.featured && (
                  <span className="absolute left-1/2 top-[-13px] -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-3.5 py-1 font-display text-[11px] font-bold uppercase tracking-[2px] text-ink-black">
                    Popularny
                  </span>
                )}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border-[1.5px] border-brand-yellow bg-[linear-gradient(145deg,#1c1500,#2e2200)] text-brand-yellow">
                    {p.icon}
                  </div>
                  <div className="flex flex-col">
                    <strong className="font-display text-[17px] font-black uppercase leading-[1.1] tracking-[1px] text-white">
                      {p.period}
                    </strong>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#888]">{p.note}</span>
                  </div>
                </div>

                <div className="mb-1 flex items-baseline gap-1.5">
                  <div className="font-display text-[60px] font-black leading-none text-brand-yellow">{p.price}</div>
                  <div className="flex flex-col leading-[1.2]">
                    <span className="font-display text-[18px] font-bold text-white">zł</span>
                    <span className="font-display text-[13px] font-bold tracking-[1px] text-white">BRUTTO</span>
                  </div>
                </div>
                <div className="mb-5 text-[12px] text-[#888]">{p.netto}</div>
                <div className="mb-4 h-px bg-white/[0.07]" />

                <ul className="mb-[22px] flex flex-1 flex-col gap-[9px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/75">
                      {check}
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className="flex items-center justify-center gap-2.5 rounded-md bg-brand-yellow px-5 py-3.5 font-display text-[13px] font-bold uppercase tracking-[2px] text-ink-black transition-colors hover:bg-brand-yellowDark"
                >
                  Wybierz pakiet →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
