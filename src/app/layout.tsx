import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import dataOverview from "@/lib/data/dataOverview.json";

export const metadata: Metadata = {
  title: {
    default: "Mabica Creative Studio",
    template: "%s - Mabica Creative Studio",
  },
  description: dataOverview?.aboutDescription,
  twitter: {
    card: "summary_large_image",
  },
  icons: { icon: dataOverview?.logo },
};

export const viewport: Viewport = {
  themeColor: dataOverview?.color,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
