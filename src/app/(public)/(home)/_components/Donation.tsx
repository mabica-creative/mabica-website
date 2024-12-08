import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export async function Donation({dataOverview}: any) {

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
          {dataOverview?.donationHeading &&
            dataOverview?.donationHeading
              .split("\n")
              .map((item: string, index: number) => (
                <>
                  <p key={index}>{item}</p>
                </>
              ))}
        </h2>
        <Link href={dataOverview?.donationButtonLink}>
          <Button size="lg">{dataOverview?.donationButton}</Button>
        </Link>
      </div>
      <hr />
    </section>
  );
}
