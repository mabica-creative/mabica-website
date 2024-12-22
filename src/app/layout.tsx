import type { Metadata, Viewport } from "next";
import dataOverview from "@/lib/data/dataOverview.json";

export const metadata: Metadata = {
  title: dataOverview.header || "Mabica Creative - Mari Bikin Cerita",
  description:
    dataOverview.aboutDescription ||
    "Listening to stories as a practical way to enjoy the world of literature. Discover adventure through the sound of words.",
  openGraph: {
    type: "website",
    title: dataOverview.header || "Mabica Creative - Mari Bikin Cerita",
    description:
      dataOverview.aboutDescription ||
      "Listening to stories as a practical way to enjoy the world of literature. Discover adventure through the sound of words.",
    url:
      dataOverview.bannerLink ||
      "https://mabica.vercel.app/audiobooks/occult-of-catalyst-shrouded-soul-teaser",
    siteName: "Mabica Creative",
    images: [
      {
        url: dataOverview.bannerImage || "/banner.png",
        width: 800,
        height: 600,
        alt: "Banner utama Mabica Creative",
      },
      {
        url: dataOverview.bannerImage || "/banner.png",
        width: 1800,
        height: 1600,
        alt: "Banner besar Mabica Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dataOverview.header || "Mabica Creative - Mari Bikin Cerita",
    description:
      dataOverview.aboutDescription ||
      "Listening to stories as a practical way to enjoy the world of literature. Discover adventure through the sound of words.",
    siteId: "1234567890123456789",
    creator: "@MabicaCreative",
    creatorId: "1234567890123456789",
    images: [dataOverview.bannerImage || "/banner.png"],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://mabica.vercel.app",
  ),
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
