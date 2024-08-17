import { cn } from "@/lib/utils";
import { CardContainer } from "@/components/layout/CardContainer";

export function Audiobook() {
  return (
    <section
      id="audiobook"
      className={cn("container py-5 lg:py-10 space-y-2 scroll-mt-14","lg:space-y-4")}
    >
      <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>#Audiobooks</h2>
    </section>
  );
}
