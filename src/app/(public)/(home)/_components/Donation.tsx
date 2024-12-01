import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Donation() {
  return (
    <section id="donation" className="container py-5 scroll-mt-14">
      <hr />
      <div className="overflow-hidden rounded-xl  w-full flex flex-col items-center gap-3 lg:gap-6 lg:py-16 py-5">
        <h2
          className={cn(
            "opacity-80 p-2 text-center font-semibold text-lg ",
            "lg:text-3xl",
          )}
        >
          Support Our Stories! <br /> Your donation helps us create and inspire.
          Donate now!
        </h2>
        <Link href="/audiobook">
          <Button size="lg">Donate Now</Button>
        </Link>
      </div>
      <hr />
    </section>
  );
}
