import Link from "next/link";
import Image from "next/image";

export default function Footer({ copy }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.06] bg-ink-800 px-6 py-10 sm:px-[60px]">
      <Link href="/">
        <Image src="/logo.png" alt="BIOLGRUZ" width={140} height={38} className="h-[38px] w-auto" />
      </Link>
      <p className="text-[13px] text-[#888]">
        {copy || "© 2025 BIOLGRUZ. Toalety przenośne i kontenery na odpady budowlane."}
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-[13px] text-[#888] transition-colors hover:text-brand-yellow">
          Polityka prywatności
        </a>
        <a href="#" className="text-[13px] text-[#888] transition-colors hover:text-brand-yellow">
          Regulamin
        </a>
        <a href="#kontakt" className="text-[13px] text-[#888] transition-colors hover:text-brand-yellow">
          Kontakt
        </a>
      </div>
    </footer>
  );
}
