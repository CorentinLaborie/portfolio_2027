import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Gabriela, Inter, JetBrains_Mono } from "next/font/google";
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

const gabriela = Gabriela({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gabriela",
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
    <html lang="en" className={`${inter.variable} ${gabriela.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
