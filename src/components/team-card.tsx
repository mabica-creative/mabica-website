import Link from "next/link";
import Image from "next/image";

interface CardInterface {
  link?: string | undefined;
  image?: string | undefined;
  name: string;
  heading: string;
}

export function TeamCard({ link = "/", image = "/profile.png", name, heading }: CardInterface ) {
  return (
    <Link href={link}>
      <Image src={image} alt={name} width={200} height={200} className="bg-pink-100/20 rounded-lg" />
      <h3 className=" mt-1 font-regular text-xl">{name}</h3>
      <span className="text-white/50">{heading}</span>
    </Link>
  );
}
