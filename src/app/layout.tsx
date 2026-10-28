import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/ui/styles/tokens.css";
import "@/ui/styles/globals.css";
import { commonEn } from "../content/en/common";
import { siteUrl } from "../lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const alteHaasGrotesk = localFont({
  src: [
    { path: "../ui/fonts/alte-haas-grotesk/AlteHaasGroteskRegular.ttf", weight: "400", style: "normal" },
    { path: "../ui/fonts/alte-haas-grotesk/AlteHaasGroteskBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-alte-haas-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: commonEn.brandName,
  description: commonEn.metaDescription,
  robots: { index: true, follow: true },
  openGraph: {
    title: commonEn.brandName,
    description: commonEn.metaDescription,
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${alteHaasGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
