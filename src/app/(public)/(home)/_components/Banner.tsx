import Image from "next/image";
import Link from "next/link";
import { getOverview } from "@/lib/action";

export async function Banner() {
  const dataOverview = await getOverview();

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
          />
        </Link>
      </div>
    </section>
  );
}
