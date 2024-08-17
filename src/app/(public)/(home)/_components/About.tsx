import Image from "next/image";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="scroll-mt-14 container py-5">
      <div className={cn("overflow-hidden rounded-xl", "lg:rounded-3xl")}>
        <div className={cn("flex flex-col gap-4", "lg:flex-row-reverse")}>
          <div className={cn("flex-1 space-y-2", "lg:space-y-4 lg:pt-20")}>
            <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>#About Us</h2>
            <p className={cn("opacity-80", "lg:text-2xl")}>
              Use custom emoji, stickers, soundboard effects and more to add
              your personality to your voice, video, or text chat. Set your
              avatar and a custom status, and write your own profile to show up
              in chat your way.
            </p>
          </div>
          <div className="lg:w-6/12">
            <Image
              className="w-full h-full"
              src="/about-us.png"
              alt="Image About"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
