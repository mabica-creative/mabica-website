import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import type { Card as CardType } from "@/lib/interface/Card";

export function CardContainer({ cards }: { cards: CardType[] }) {
  return (
    <div
      className={cn(
        "grid gap-x-2 gap-y-4 grid-cols-2",
        "lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8",
      )}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          href={card?.href}
          image={card?.image}
          heading={card?.heading}
          subHeading={card?.subHeading}
        />
      ))}
    </div>
  );
}
