import Link from "next/link";
import { SocialMedia } from "@/components/social-media";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 ">
        <nav className="flex py-5 max-w-screen-xl bg-[var(--background)]/50 backdrop-blur-md  w-screen mx-auto px-[7%] justify-between items-center">
          <Link href="/" className="text-xl">
            Mabica
          </Link>
          <div className="hidden md:block space-x-14 font-medium text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/team" className="hover:text-white">Team</Link>
            <Link href="/gallery" className="hover:text-white">Galerry</Link>
          </div>
          <SocialMedia />
        </nav>
    </header>
  );
}
