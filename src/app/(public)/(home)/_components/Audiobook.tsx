"use client";

import { cn } from "@/lib/utils";
import { useAudiobooks } from "@/hooks/useAudiobooks";

import { CardContainer } from "@/components/layout/CardContainer";

import type { Audiobook as AudiobookType } from "@/lib/interface/Audiobook";
import type { Card as CardType } from "@/lib/interface/Card";
export function Audiobook() {
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
        <h1 className="container h-96 flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-96 flex justify-center items-center">
          Error: {error.message}
        </h1>
      ) : !!data.length ? (
        <section
          id="audiobook"
          className={cn(
            "container py-5 lg:py-10 space-y-2 scroll-mt-14",
            "lg:space-y-4",
          )}
        >
          <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>
            #Audiobooks
          </h2>
          <CardContainer cards={cards} />
        </section>
      ) : (
        <h1 className="container h-96 flex justify-center items-center">
          No Audiobooks Found
        </h1>
      )}
    </>
  );
}
