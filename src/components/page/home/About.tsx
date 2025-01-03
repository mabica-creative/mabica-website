import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export async function About({ dataOverview }: any) {
  return (
    <section id="about" className="scroll-mt-14 container py-5">
      <div className={cn("overflow-hidden rounded-xl", "lg:rounded-3xl")}>
        <div className={cn(" flex-col-reverse gap-4", "lg:flex-row-reverse")}>
          <div className={cn("flex-1 space-y-2", "lg:space-y-4")}>
            <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>
              #About Us
            </h2>
            <div className={cn("opacity-80", "lg:text-2xl")}>
              <div className=" float-right w-4/12 md:w-3/12">
                <Image
                  className="w-full aspect-square"
                  src={dataOverview?.aboutImage}
                  alt="Image About"
                  width={500}
                  height={500}
                />
              </div>
              {dataOverview?.aboutDescription &&
                dataOverview?.aboutDescription
                  .split("\n")
                  .map((item: string, index: number) => (
                    <>
                      <p key={index}>{item}</p>
                      <br />
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
