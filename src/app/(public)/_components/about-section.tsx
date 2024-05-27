import { SocialMedia } from "@/components/social-media";
import Link from "next/link";

export function AboutSection() {
  return (
    <section
      id="about"
      className="flex items-center justify-between gap-6 min-h-screen max-w-screen-xl w-screen mx-auto px-[7%]"
    >
      <div className="bg-[var(--primary)] w-full aspect-[6/4] rounded-lg"></div>
      <div className=" flex flex-col gap-2 ">
        <span className="font-medium text-xl text-white/50">We are</span>
        <h1 className="text-6xl -mt-4 ">Mabica</h1>
        <p className="font-medium text-white/50 w-3/4">
          “Happiness will always come in the midst of togetherness.
          Whatever it is, do it together. Life is cheerful and happy when you
          smile together”.
        </p>
        <div className="flex gap-2">
          <Link href="/about">
            <button className="border border-white rounded py-1 px-4">
              See More
            </button>
          </Link>
          <SocialMedia />
        </div>
      </div>
    </section>
  );
}
