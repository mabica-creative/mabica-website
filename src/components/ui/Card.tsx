import Link from "next/link";
import Image from "next/image";
import { audiobookTypes } from "@/lib/firebase/getAudiobooks";

export function Card({ audiobook }: { audiobook: audiobookTypes }) {
  return (
    <Link href={`/audiobooks/${audiobook?.slug}`}>
      <div className="overflow-hidden rounded-xl mb-2 relative">
        <Image
          className="w-full"
          src="/audiobook.png"
          alt="Audiobook image"
          width="600"
          height="350"
        />
      </div>
      <h3 className="font-medium">The Book Of Cemy</h3>
      <p className="line-clamp-1 opacity-80 -mt-1">
        maka dia memulai petualangannya kembali dan menjadi seorang pahlawan
      </p>
    </Link>
  );
}
