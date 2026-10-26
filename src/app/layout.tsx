import type { Metadata } from "next";
import { Chakra_Petch, Dela_Gothic_One, JetBrains_Mono, Tektur } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SecretProvider } from "@/lib/SecretContext";
import Navbar from "@/components/view/Navbar";
import Footer from "@/components/view/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import ConsoleGame from "@/components/ui/ConsoleGame";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";
import MotionProvider from "@/components/ui/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/Intro";
import { INTRO_SKIP_SCRIPT } from "@/lib/introScript";
import { PageTransitionProvider } from "@/components/motion/PageTransition";
import { XRayProvider } from "@/components/xray/XRayContext";

// Tektur is variable (weight + width): the hero name reacts to the cursor on both axes.
const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
  axes: ["wdth"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// Decorative katakana: loaded on demand (unicode ranges), never preloaded.
const dela = Dela_Gothic_One({
  variable: "--font-dela",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Evan Quinchon - Développeur Front-End",
  description:
    "Portfolio d'Evan Quinchon, développeur front-end React / Next.js / TypeScript basé à Paris.",
  authors: [{ name: "Evan Quinchon" }],
  keywords: [
    "développeur",
    "front-end",
    "react",
    "next.js",
    "typescript",
    "portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if((t||'dark')==='dark')document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />
      </head>
      <body
        className={`${tektur.variable} ${chakra.variable} ${jetbrains.variable} ${dela.variable} font-sans antialiased bg-paper text-ink`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SecretProvider>
              <SmoothScroll>
                <MotionProvider>
                  <IntroProvider>
                    <PageTransitionProvider>
                      <XRayProvider>
                        <ConsoleGame />
                        <KeyboardShortcuts />
                        <ScrollProgress />
                        <Navbar />
                        {children}
                        <BackToTop />
                        <Footer />
                      </XRayProvider>
                    </PageTransitionProvider>
                  </IntroProvider>
                </MotionProvider>
              </SmoothScroll>
            </SecretProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
