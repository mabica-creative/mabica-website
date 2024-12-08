import { cn } from "@/lib/utils";
import { getAllAudiobooks } from "@/lib/action";
import { CardContainer } from "@/components/layout/CardContainer";

import { Audiobook } from "@prisma/client";
import type { Card as CardType } from "@/lib/interface/Card";

export async function Audiobook() {
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
    <section className="container flex flex-col gap-4 py-10" id="audiobooks">
      <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>
        #Audiobooks
      </h2>
      <CardContainer cards={cards} />
    </section>
  );
}
