import "./globals.css";
import { Barlow, Barlow_Condensed } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata = {
  title: "Białgruz – Toalety przenośne & Kontenery na gruz",
  description:
    "Białgruz — wynajem toalet przenośnych oraz kontenerów i big bagów na odpady budowlane. Szybkie podstawienie, wywóz i legalna utylizacja w regionie.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-sans antialiased bg-ink-black text-white">{children}</body>
    </html>
  );
}
