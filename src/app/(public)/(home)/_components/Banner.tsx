import Image from "next/image";
import Link from "next/link";

export function Banner() {
  return (
    <section id="banner" className="container py-5">
      <div className="overflow-hidden rounded-xl w-full">
        <Link href="audiobooks/occult-of-catalyst-shrouded-soul-teaser">
          <Image
            className="w-full object-cover aspect-[12/6]"
            src="/banner.png"
            alt="audiobook banner"
            width="1200"
            height="600"
          />
        </Link>
      </div>
    </section>
  );
}
