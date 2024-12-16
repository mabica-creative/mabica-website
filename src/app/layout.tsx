import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import dataOverview from "@/lib/data/dataOverview.json";

import { getOverview } from "@/lib/action";
export async function generateMetadata(): Promise<Metadata> {

  return {
    title: {
      default: "Mabica Creative",
      template: "%s - Mabica Creative",
    },
    description: dataOverview?.aboutDescription,
    openGraph: {
      images: [dataOverview?.bannerImage], // Atau URL gambar yang sesuai
    },
    twitter: {
      card: "summary_large_image",
      images: [dataOverview?.bannerImage], // Atau URL gambar yang sesuai
    },
    icons: { icon: dataOverview?.logo },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    ), // Menggunakan env variable di sini
  };
}

export async function generateViewport(): Promise<Viewport> {
  const dataOverview = await getOverview();
  return {
    themeColor: dataOverview?.color, // Sudah benar di sini
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
