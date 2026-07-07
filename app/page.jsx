import SiteNav from "@/components/SiteNav";
import HomePanels from "@/components/HomePanels";
import Reveal from "@/components/Reveal";

const bottomItems = [
  {
    title: "Doświadczenie",
    sub: "Lata sprawdzonej pracy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M17 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Profesjonalna obsługa",
    sub: "Doradzimy i pomożemy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Szybkość działania",
    sub: "Działamy na czas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Uczciwe zasady",
    sub: "Przejrzyste warunki współpracy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <div className="flex min-h-screen flex-col pt-16">
        <HomePanels />

        <div id="o-firmie" className="grid grid-cols-2 border-t border-white/10 bg-ink-950 md:grid-cols-4">
          {bottomItems.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="flex items-center gap-4 border-r border-white/10 px-6 py-6 last:border-r-0 sm:px-8 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
            >
              <span className="shrink-0 text-brand-yellow">{item.icon}</span>
              <span>
                <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-[2px] text-white">
                  {item.title}
                </span>
                <span className="block text-[12px] text-white/40">{item.sub}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
