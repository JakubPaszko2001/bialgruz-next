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
  title: "BIALGRUZ - wynajem kontenerów - big-bagów - przenośnych toalet",
  description:
    "Białgruz — wynajem toalet przenośnych oraz kontenerów i big bagów na odpady budowlane. Szybkie podstawienie, wywóz i legalna utylizacja w regionie.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-sans antialiased bg-ink-black text-white">{children}</body>
    </html>
  );
}
