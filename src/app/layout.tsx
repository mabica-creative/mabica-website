import type { Metadata, Viewport } from "next";
import dataOverview from "@/lib/data/dataOverview.json";

export const metadata: Metadata = {
  title: {
    template: "%s | Mabica Creative - Mari Bikin Cerita",
    default: "Mabica Creative - Mari Bikin Cerita",
  },
  description: dataOverview.aboutDescription,
  openGraph: {
    type: "website",
    title: dataOverview.header,
    description: dataOverview.aboutDescription,
    url: dataOverview.bannerLink,
    siteName: "Mabica Creative - Mari Bikin Cerita",
    images: [
      {
        url: dataOverview.bannerImage,
        width: 800,
        height: 600,
        alt: "Banner utama Mabica Creative",
      },
      {
        url: dataOverview.bannerImage,
        width: 1800,
        height: 1600,
        alt: "Banner besar Mabica Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dataOverview.header,
    description: dataOverview.aboutDescription,
    siteId: "1234567890123456789",
    creator: "@c.emy",
    creatorId: "1234567890123456789",
    images: [dataOverview.bannerImage],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
};

export const viewport: Viewport = {
  themeColor: dataOverview.color,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
