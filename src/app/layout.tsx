import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: "Mabica Creative Studio",
    template: "%s - Mabica Creative Studio",
  },
  description:
    "Listening to stories as a practical way to enjoy the world of literature. Discover adventure through the sound of words.",
  twitter: {
    card: "summary_large_image",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
