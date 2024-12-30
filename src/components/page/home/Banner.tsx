import Image from "next/image";
import Link from "next/link";

export async function Banner({ dataOverview }: any) {
  return (
    <section id="banner" className="container py-5">
      <div className="overflow-hidden rounded-xl w-full">
        <Link href={dataOverview?.bannerLink}>
          <Image
            className="w-full object-cover aspect-[12/6]"
            src={dataOverview?.bannerImage}
            alt="audiobook banner"
            width="1200"
            height="600"
            loading="eager"
          />
        </Link>
      </div>
    </section>
  );
}
