import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SecretProvider } from "@/lib/SecretContext";
import Navbar from "@/components/view/Navbar";
import Footer from "@/components/view/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import ConsoleGame from "@/components/ui/ConsoleGame";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evan Quinchon - Développeur Full Stack",
  description:
    "Portfolio d'Evan Quinchon, développeur web Full Stack passionné par React, Next.js et les expériences web modernes.",
  authors: [{ name: "Evan Quinchon" }],
  keywords: [
    "développeur",
    "full stack",
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
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((t||d)==='dark')document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SecretProvider>
              <ConsoleGame />
              <KeyboardShortcuts />
              <LoadingScreen />
              <CustomCursor />
              <ScrollProgress />
              <Navbar />
              {children}
              <BackToTop />
              <Footer />
            </SecretProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
