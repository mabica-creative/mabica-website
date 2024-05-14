import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#3a31d8",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://acme.com'),
  title: "Mabica",
  description:
    'Mabica (Mari Bikin Cerita) adalah perkumpulan orang gabut yang mungkin membuat cerita supaya tidak "rin udah makan" atau "sehat?" saat bermain discord.',
  openGraph: {
    title: "Mabica",
    description:
      'Mabica (Mari Bikin Cerita) adalah perkumpulan orang gabut yang mungkin membuat cerita supaya tidak "rin udah makan" atau "sehat?" saat bermain discord.',
    siteName: "Mabica",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text `}>
        {children}
      </body>
    </html>
  );
}
