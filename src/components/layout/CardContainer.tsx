import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Audiobook } from "@/lib/interface/Audiobook";

export function CardContainer({ audiobooks }: { audiobooks: Audiobook[] }) {
  return (
    <div
      className={cn(
        "grid gap-x-2 gap-y-4 grid-cols-2",
        "lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8",
      )}
    >
      {audiobooks.map((audiobook, index) => (
        <Card key={index} audiobook={audiobook}/>
      ))}
    </div>
  );
}
