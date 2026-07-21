import Reveal from "@/components/Reveal";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/1CfuwctQBm/?mibextid=wwXIfr" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/bialgruz?igsh=MXR3anZpN2F1eHd6OQ==" },
  { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@bialgruz?_r=1&_t=ZN-97hsQbrEjli" },
];

const items = [
  {
    icon: FaPhoneAlt,
    title: "Telefon",
    content: (
      <div className="flex flex-col gap-1">
        <a href="tel:+48799091000" className="transition-colors hover:text-brand-yellow">+48 799 091 000</a>
        <a href="tel:+48799092000" className="transition-colors hover:text-brand-yellow">+48 799 092 000</a>
        <a href="tel:+48799093000" className="transition-colors hover:text-brand-yellow">+48 799 093 000</a>
      </div>
    ),
  },
  {
    icon: FaClock,
    title: "Godziny otwarcia",
    content: (
      <div className="text-[#888]">
        <p><span className="font-semibold text-white">Pon–Pt:</span> 07:00 – 20:00</p>
        <p><span className="font-semibold text-white">Sobota:</span> 08:00 – 15:00</p>
      </div>
    ),
  },
  {
    icon: FaEnvelope,
    title: "Email",
    content: (
      <div>
        <a href="mailto:biuro@bialgruz.pl" className="block transition-colors hover:text-brand-yellow">biuro@bialgruz.pl</a>
        <p className="text-[13px] text-[#888]">Odpowiadamy w ciągu 12h</p>
      </div>
    ),
  },
  {
    icon: FaMapMarkerAlt,
    title: "Adres",
    content: (
      <div className="text-[#cccccc]">
        <p>Porosły-Kolonia 12M</p>
        <p>16-070 Choroszcz</p>
      </div>
    ),
  },
];

export default function ContactInfo() {
  return (
    <section id="kontakt" className="bg-ink-800 px-6 py-20 sm:px-[60px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal className="mb-12 text-center">
          <div className="mb-3 font-display text-[12px] font-bold uppercase tracking-[4px] text-brand-yellow">Kontakt</div>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-black uppercase leading-[1.05] text-white">
            Skontaktuj się <span className="text-brand-yellow">z nami</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Dane kontaktowe */}
          <Reveal className="flex flex-col gap-5">
            {items.map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-lg border border-white/[0.04] bg-ink-600 px-5 py-4 transition-colors hover:border-[rgba(207,220,0,0.2)]"
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-[16px] text-ink-black">
                  <Icon />
                </span>
                <div className="text-[15px] text-white">
                  <p className="mb-1 font-display text-[18px] font-bold uppercase tracking-[1px]">{title}</p>
                  {content}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-1">
              <span className="text-[13px] font-semibold uppercase tracking-[1px] text-[#888]">Obserwuj nas</span>
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-[16px] text-ink-black transition-all hover:-translate-y-0.5 hover:bg-brand-yellowDark"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal delay={0.15} className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.8971640945156!2d23.16911897705842!3d53.139464990182304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ffd51c770b797%3A0xe59d18894bcdea76!2sBIALGRUZ%20-%20wyw%C3%B3z%20gruzu%20i%20odpad%C3%B3w%20zmieszanych%20%7C%20Wynajem%20kontener%C3%B3w%20i%20big%20bag%C3%B3w.%20BIA%C5%81YSTOK%20I%20OKOLICE!5e1!3m2!1spl!2spl!4v1751318501910!5m2!1spl!2spl"
              width="100%"
              height="460"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Mapa lokalizacji firmy BIALGRUZ"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
