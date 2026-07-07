import Reveal from "@/components/Reveal";
import { Eyebrow, SectionTitle, check } from "@/components/subUI";

const bigbagIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    <path d="M8 7.5V5.2a1.6 1.6 0 0 1 3.2 0V7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12.8 7.5V5.2a1.6 1.6 0 0 1 3.2 0V7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M5.5 8h13l-1.3 11.6a1.2 1.2 0 0 1-1.2 1.1H8a1.2 1.2 0 0 1-1.2-1.1z" fill="currentColor" />
  </svg>
);

const boxIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path d="M3 8h18l-2 10H5z" />
    <path d="M2 6h20v2H2z" />
  </svg>
);

const bigBoxIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path d="M2 8h20l-2 11H4z" />
    <path d="M1 6h22v2H1z" />
  </svg>
);

const CARDS = [
  {
    name: "Big-Bag", size: "1 m³", icon: bigbagIcon,
    rows: [
      { label: "Gruz", num: "299" },
      { label: "Zmieszane", num: "390" },
    ],
    features: ["Worek Big-Bag 1 m³", "Podstawienie i odbiór", "Wywóz i utylizacja"],
  },
  {
    name: "Kontener", size: "5 m³", icon: boxIcon, featured: true,
    rows: [
      { label: "Gruz", num: "390" },
      { label: "Zmieszane", num: "1190" },
    ],
    features: ["Kontener 5 m³", "Podstawienie i odbiór", "Wywóz i utylizacja"],
  },
  {
    name: "Kontener", size: "7 m³", icon: bigBoxIcon,
    rows: [{ label: "Zmieszane", num: "1390" }],
    features: ["Kontener 7 m³", "Podstawienie i odbiór", "Wywóz i utylizacja"],
  },
];

export default function OfferKontenery() {
  return (
    <section id="oferta" className="bg-ink-800 px-6 py-20 sm:px-[60px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal className="mb-13 flex flex-wrap items-end justify-between gap-10">
          <div>
            <Eyebrow>Nasza oferta</Eyebrow>
            <SectionTitle>
              Kontenery na <em className="not-italic text-brand-yellow">każdą</em>
              <br />
              ilość odpadów
            </SectionTitle>
          </div>
          <p className="max-w-[500px] text-[16px] leading-[1.7] text-[#cccccc]">
            Oferujemy big bagi i kontenery różnej pojemności dopasowane do skali prac — od drobnych remontów po duże budowy i wyburzenia.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-[10px] border bg-ink-600 px-[22px] pb-[22px] pt-7 transition-all hover:-translate-y-1 hover:border-brand-yellow ${
                  c.featured ? "border-brand-yellow" : "border-white/[0.07]"
                }`}
              >
                {c.featured && (
                  <span className="absolute left-1/2 top-[-13px] -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-3.5 py-1 font-display text-[11px] font-bold uppercase tracking-[2px] text-ink-black">
                    Popularny
                  </span>
                )}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border-[1.5px] border-brand-yellow bg-[linear-gradient(145deg,#1c1500,#2e2200)] text-brand-yellow">
                    {c.icon}
                  </div>
                  <div className="flex flex-col">
                    <strong className="font-display text-[17px] font-black uppercase leading-[1.1] tracking-[1px] text-white">
                      {c.name}
                    </strong>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#888]">{c.size}</span>
                  </div>
                </div>

                <div className="mb-3 flex flex-col gap-4">
                  {c.rows.map((r) => (
                    <div key={r.label} className="flex flex-col gap-1">
                      <span className="font-display text-[12px] font-bold uppercase tracking-[2px] text-[#888]">{r.label}</span>
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-[52px] font-black leading-[0.9] text-brand-yellow">{r.num}</span>
                        <span className="flex flex-col leading-[1.15]">
                          <span className="font-display text-[18px] font-bold text-white">zł</span>
                          <span className="font-display text-[12px] font-bold tracking-[1px] text-white">BRUTTO</span>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-[18px] text-[12px] italic text-[#888]">(VAT 8% wliczony)</div>
                <div className="mb-4 h-px bg-white/[0.07]" />

                <ul className="mb-[22px] flex flex-1 flex-col gap-[9px]">
                  {c.features.map((f) => (
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
                  Zamów →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
