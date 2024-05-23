import Link from "next/link";
import { SiWattpad } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { SiSpotify } from "react-icons/si";

export function SocialMedia() {
  return (
    <div className="flex text-xl gap-1 items-center text-white/50">
      <Link className="hover:text-white duration-300" href="https://watppad.com">
        <SiWattpad />
      </Link>
      <Link className="hover:text-white duration-300" href="https://instagram.com">
        <AiFillInstagram />
      </Link>
      <Link className="hover:text-white duration-300" href="https://spotify.com">
        <SiSpotify />
      </Link>
    </div>
  );
}
