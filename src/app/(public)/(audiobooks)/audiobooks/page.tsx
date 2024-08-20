"use client";

import { cn } from "@/lib/utils";
import { useAudiobooks } from "@/hooks/useAudiobooks";

import { CardContainer } from "@/components/layout/CardContainer";
import { AudiobooksNav } from "./_components/AudiobooksNav";

import type { Audiobook as AudiobookType } from "@/lib/interface/Audiobook";
import type { Card as CardType } from "@/lib/interface/Card";

export default function AudiobooksPage() {
  const { data, loading, error } = useAudiobooks();
  const cards: CardType[] = data.map(
    ({ slug, image, title, synopsis }: AudiobookType) => {
      return {
        href: `/audiobooks/${slug}`,
        image,
        heading: title,
        subHeading: synopsis,
      };
    },
  );

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-screen flex justify-center items-center">
          Error: {error.message}
        </h1>
      ) : !!data.length ? (
        <div
          className={cn(
            "pt-16 lg:py-10 space-y-2 scroll-mt-14",
            "lg:space-y-4",
          )}
        >
          <AudiobooksNav />
          <main className="container">
            <h1
              className={cn(
                "text-lg font-semibold mb-2",
                "lg:text-3xl lg:mb-4",
              )}
            >
              #Audiobooks
            </h1>
            <CardContainer cards={cards} />
          </main>
        </div>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobooks Found
        </h1>
      )}
    </>
  );
}
