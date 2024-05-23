import Link from "next/link";
import { SocialMedia } from "@/components/social-media";

export function Header(): React.ReactNode {
  return (
    <header className="fixed top-0 left-0 right-0">
        <nav className="flex py-5 max-w-screen-xl w-screen mx-auto px-[7%] justify-between items-center">
          <Link href="/" className="text-xl">
            Mabica
          </Link>
          <div className="space-x-14 font-medium text-white/50">
            <Link href="#">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#team">Team</Link>
            <Link href="#gallery">Galerry</Link>
          </div>
          <SocialMedia />
        </nav>
    </header>
  );
}
