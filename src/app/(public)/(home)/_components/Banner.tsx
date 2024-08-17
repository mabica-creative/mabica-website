import Image from "next/image";

export function Banner() {
  return (
    <section id="banner" className="container py-5">
      <div className="overflow-hidden rounded-xl w-full">
        <Image
          className="w-full lg:aspect-[12/4] object-fit"
          src="/banner.png"
          alt="audiobook banner"
          width="1200"
          height="600"
        />
      </div>
    </section>
  );
}
