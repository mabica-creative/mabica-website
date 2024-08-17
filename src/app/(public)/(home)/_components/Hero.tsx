import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <main
      id="home"
      className={cn(
        "container py-5 pt-28 flex flex-col text-center justify-center items-center",
        "lg:pt-48 lg:pb-20",
      )}
    >
      <h1 className={cn("font-semibold text-lg", "lg:text-4xl")}>
        Lazy to read? Just Listen, Stories Await.
      </h1>
      <p className={cn("mb-4 mt-2 opacity-80", "lg:text-xl lg:w-8/12")}>
        Listening to stories as a practical way to enjoy the world of
        literature. Discover adventure through the sound of words.
      </p>
      <Link href="/audiobooks">
        <Button size="lg">Heard Story Now</Button>
      </Link>
    </main>
  );
}
