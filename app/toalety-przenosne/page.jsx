import PageNav from "@/components/PageNav";
import Footer from "@/components/Footer";
import { Hero, WhySection, StepsSection, Contact } from "@/components/subUI";
import OfferToilets from "@/components/OfferToilets";
import OfferTransition from "@/components/OfferTransition";
import Locations from "@/components/Locations";
import ContactInfo from "@/components/ContactInfo";

export const metadata = {
  title: "Toalety przenośne – BIALGRUZ",
  description: "Wynajem toalet przenośnych na budowy, imprezy i eventy. Szybka dostawa, regularny serwis, ekologiczne rozwiązania.",
};

const phoneBlock = (
  <a href="tel:799093000" className="group mt-6 flex items-center gap-3.5 border-t border-white/[0.08] pt-6">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-[18px] text-ink-black">📞</span>
    <span>
      <span className="block text-[12px] uppercase tracking-[1px] text-[#888]">Zadzwoń do nas</span>
      <span className="block font-display text-[26px] font-bold tracking-[1px] text-white transition-colors group-hover:text-brand-yellow">
        799 093 000
      </span>
    </span>
  </a>
);

export default function ToaletyPage() {
  return (
    <>
      <PageNav />
      <OfferTransition from="right">
        <Hero
          activePage="toalety"
          titleTop="Toalety"
          titleBottom="Przenośne"
          desc="Nowoczesne toalety przenośne na każdą budowę, imprezę i inwestycję. Kompleksowa obsługa, terminowość i pełne zaplecze sanitarne w całym regionie."
          badges={[
            { icon: "✓", label: <>Natychmiastowa<br />dostawa</> },
            { icon: "↺", label: <>Regularny<br />serwis</> },
            { icon: "◉", label: <>Ekologiczne<br />rozwiązania</> },
          ]}
          primary={{ label: "Wybierz toaletę →", href: "#oferta" }}
          secondary={{ label: "Jak to działa", href: "#jak" }}
          phone={phoneBlock}
          image={{ src: "/toaleta-bialgruz.png", alt: "Toaleta przenośna BIALGRUZ", w: 440, h: 600 }}
          stats={[
            { num: "500+", label: "Zadowolonych klientów", pos: "a" },
            { num: "12h", label: "Czas dostawy", pos: "b" },
          ]}
        />

        <OfferToilets />

        <WhySection
          title={
            <>
              Doświadczenie
              <br />i <em className="not-italic text-brand-yellow">rzetelność</em>
            </>
          }
          features={[
            { title: "Szybka dostawa", text: "Dostarczamy toaletę w uzgodnionym terminie na terenie całego regionu. Weekendy i święta nie stanowią przeszkody." },
            { title: "Regularny serwis", text: "Zapewniamy czyszczenie, dezynfekcję i uzupełnianie środków według ustalonego harmonogramu — bez niespodzianek." },
            { title: "Ekologiczne środki", text: "Używamy certyfikowanych biologicznych środków rozkładających odpady, bezpiecznych dla środowiska." },
            { title: "Pełna obsługa", text: "Dostawa, montaż, serwis i odbiór — wszystko w jednej cenie. Nie musisz się o nic martwić." },
          ]}
          image={{ src: "/toaleta-bialgruz.png", hoverSrc: "/kibel-otwarty.png", alt: "Toaleta BIALGRUZ" }}
        />

        <StepsSection
          sub="Prosty proces online — od formularza do gotowej toalety na miejscu."
          steps={[
            { title: "Formularz online", text: "Wypełnij krótki formularz na stronie — wybierz model toalety, czas wynajmu i termin." },
            { title: "Automatyczna wycena", text: "Cenę zobaczysz od razu na stronie — wyliczana automatycznie, bez czekania na kontakt." },
            { title: "Dostawa", text: "Dostarczamy i montujemy toaletę we wskazanym miejscu w ustalonym terminie." },
            { title: "Serwis", text: "Regularnie serwisujemy i na koniec odbieramy sprzęt — bez Twojego zaangażowania." },
          ]}
        />

        <Contact mode="toalety" />
        <Locations />
        <ContactInfo />
        <Footer copy="© 2025 BIALGRUZ. Wynajem toalet przenośnych." />
      </OfferTransition>
    </>
  );
}
