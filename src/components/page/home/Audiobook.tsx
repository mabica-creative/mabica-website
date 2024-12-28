import { cn } from "@/lib/utils/cn";
import { getAudiobooks } from "@/lib/fetch/getAudiobooks";
import { CardContainer } from "@/components/layout/CardContainer";

import type { Audiobook as AudiobookType } from "@prisma/client";
import type { Card as CardType } from "@/lib/interface/Card";

export async function Audiobook() {
  const data = await getAudiobooks();
  const cards: CardType[] = data.map(
    ({ slug, imageUrl, title, synopsis }: AudiobookType) => {
      return {
        href: `/audiobooks/${slug}`,
        image: imageUrl,
        heading: title,
        subHeading: synopsis,
      };
    },
  );

  return (
    <section className="container flex flex-col gap-4 py-10" id="audiobooks">
      <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>
        #Audiobooks
      </h2>
      <CardContainer cards={cards} />
    </section>
  );
}
