import Image from "next/image";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="scroll-mt-14 container py-5">
      <div className={cn("overflow-hidden rounded-xl", "lg:rounded-3xl")}>
        <div className={cn("flex flex-col gap-4", "lg:flex-row-reverse")}>
          <div className={cn("flex-1 space-y-2", "lg:space-y-4 lg:pt-20")}>
            <h2 className={cn("text-lg font-semibold", "lg:text-3xl")}>
              #About Us
            </h2>
            <p className={cn("opacity-80", "lg:text-2xl")}>
              Welcome to Mabica (Mari Bikin Cerita), a community of creative
              minds who turn idle moments into captivating stories. <br />
              We’re here to escape the mundane—because, really, there’s more to
              life than just asking, &quot;Rin, have you eaten?&quot; <br />{" "}
              <br />
              At Mabica, we believe in the magic of storytelling as a gateway to
              the vast world of literature. <br />
              By listening to stories, you can embark on extraordinary
              adventures, explore uncharted emotions, and see the world through
              the vibrant tapestry of words. <br /> <br />
              So, lean back, hit play, and let your imagination soar. <br />
              <strong>Just Listen—Stories Await.</strong>
            </p>
          </div>
          <div className="lg:w-4/12">
            <Image
              className="w-full aspect-square"
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
