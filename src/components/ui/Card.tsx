import Link from "next/link";
import Image from "next/image";
import type { Card } from "@/lib/interface/Card";

export function Card({ heading, href, image, subHeading }: Card) {
  return (
    <Link href={href}>
      <div className="overflow-hidden aspect-[4/6] rounded-xl mb-2 relative">
        <Image
          className="h-full w-full object-cover"
          src={image}
          alt="Audiobook image"
          width="400"
          height="400"
        />
      </div>
      <h3 className="font-medium  line-clamp-1 ">{heading}</h3>
      <p className="line-clamp-1 opacity-80 -mt-1">{subHeading}</p>
    </Link>
  );
}
