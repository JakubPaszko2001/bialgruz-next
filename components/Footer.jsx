import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/1CfuwctQBm/?mibextid=wwXIfr" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/bialgruz?igsh=MXR3anZpN2F1eHd6OQ==" },
  { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@bialgruz?_r=1&_t=ZN-97hsQbrEjli" },
];

export default function Footer({ copy }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.06] bg-ink-800 px-6 py-10 sm:px-[60px]">
      <Link href="/">
        <Image src="/logo.png" alt="BIOLGRUZ" width={140} height={38} className="h-[38px] w-auto" />
      </Link>
      <p className="text-[13px] text-[#888]">
        {copy || "© 2025 BIOLGRUZ. Toalety przenośne i kontenery na odpady budowlane."}
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[15px] text-[#888] transition-all hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink-black"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
