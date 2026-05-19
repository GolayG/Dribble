import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Dribble Soccer Complex",
    template: "%s | Dribble Soccer Complex",
  },
  description:
    "Premier soccer & pickleball facility. Book fields, reserve training, build your game.",
  keywords: ["soccer", "pickleball", "sports facility", "field booking", "training"],
  openGraph: {
    title: "Dribble Soccer Complex",
    description: "WHERE THE GAME BEGINS. Premier soccer & pickleball facility.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
