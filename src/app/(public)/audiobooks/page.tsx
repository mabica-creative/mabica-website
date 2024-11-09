import { cn } from "@/lib/utils";

import { CardContainer } from "@/components/layout/CardContainer";
import { AudiobooksNav } from "./_components/AudiobooksNav";
import { getAllAudiobooks } from "@/lib/action";

import { Audiobook } from "@prisma/client";
import type { Card as CardType } from "@/lib/interface/Card";

export default async function AudiobooksPage() {
  const data = await getAllAudiobooks();
  const cards: CardType[] = data.map(
    ({ slug, imageUrl, title, synopsis }: Audiobook) => {
      return {
        href: `/audiobooks/${slug}`,
        image: imageUrl,
        heading: title,
        subHeading: synopsis,
      };
    },
  );

  return (
    <>
      <div
        className={cn(
          "pt-16 space-y-2 scroll-mt-14",
          "lg:space-y-4 lg:py-10 lg:pt-28",
        )}
      >
        <AudiobooksNav />
        <main className="container">
          <h1
            className={cn("text-lg font-semibold mb-2", "lg:text-3xl lg:mb-4")}
          >
            #Audiobooks
          </h1>
          <CardContainer cards={cards} />
        </main>
      </div>
    </>
  );
}
