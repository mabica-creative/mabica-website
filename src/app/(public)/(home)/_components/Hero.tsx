import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { getOverview } from "@/lib/action";

export async function Hero() {
  const dataOverview = await getOverview();

  return (
    <main
      id="home"
      className={cn(
        "container py-5 pt-28 flex flex-col text-center justify-center items-center",
        "lg:pt-48 lg:pb-20",
      )}
    >
      <h1 className={cn("font-semibold text-lg", "lg:text-4xl")}>
        {dataOverview?.header}
      </h1>
      <p className={cn("mb-4 mt-2 opacity-80", "lg:text-xl lg:w-8/12")}>
        {dataOverview?.headerDescription}
      </p>
      <Link href={dataOverview?.headerButtonLink}>
        <Button size="lg">{dataOverview?.headerButton}</Button>
      </Link>
    </main>
  );
}
