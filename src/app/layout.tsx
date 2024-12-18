import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import dataOverview from "@/lib/data/dataOverview.json";
import { getOverview } from "@/lib/action";

export async function generateMetadata(): Promise<Metadata> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: "Mabica - Mari Bikin Cerita",
    description: dataOverview?.aboutDescription,
    openGraph: {
      type: "website",
      title: "Mabica - Mari Bikin Cerita",
      description: dataOverview?.aboutDescription,
      url: baseURL,
      images: [
        {
          url: dataOverview?.bannerImage || `${baseURL}/default-banner.png`,
          width: 1200,
          height: 630,
          alt: "Default banner image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mabica - Mari Bikin Cerita",
      description: dataOverview?.aboutDescription,
      images: [dataOverview?.bannerImage || `${baseURL}/default-banner.png`],
    },
    icons: {
      icon: dataOverview?.logo || `${baseURL}/favicon.ico`,
    },
    metadataBase: new URL(baseURL),
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
