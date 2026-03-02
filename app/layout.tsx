import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orchestra — AI Art Generator",
  description: "Generate original AI art inspired by the defining movements of modern art history.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable}`}>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
        <CookieBanner />
      </body>
    </html>
  );
}
