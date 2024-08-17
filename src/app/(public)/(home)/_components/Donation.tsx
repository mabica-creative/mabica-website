import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Donation() {
  return (
    <section id="donation" className="container py-5 scroll-mt-14">
      <div className="overflow-hidden rounded-xl bg-primary w-full flex flex-col items-center gap-3 lg:gap-6 lg:py-16 py-5">
        <h2
          className={cn(
            "opacity-80 text-center font-semibold text-lg text-primary-foreground",
            "lg:text-3xl",
          )}
        >
          Your Donation, Our Future.
        </h2>
        <Link href="/audiobook">
          <Button variant="secondary" size="lg">
            Donation
          </Button>
        </Link>
      </div>
    </section>
  );
}
