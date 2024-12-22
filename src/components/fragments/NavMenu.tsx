"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/fragments/ThemeToggle";

interface links {
  title: string;
  href: string;
}

const dataNavbar: links[] = [
  { title: "Home", href: "/#" },
  { title: "About Us", href: "/#about" },
  { title: "Previews", href: "/#audiobooks" },
  { title: "Audiobooks", href: "/audiobooks" },
  { title: "Donation", href: "/#donation" },
];

interface NavMenuProps {
  sessionImage?: string;
}

const NavMenu = ({ sessionImage }: NavMenuProps) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`${isNavMenuOpen ? "absolute w-screen h-[100dvh] " : "hidden"} lg:block -z-40 top-0 left-0 right-0 bg-background lg:bg-transparent	`}
      >
        <div className="container flex flex-col lg:flex-row justify-between gap-4 lg:items-center h-full lg:py-4 pt-28 pb-10 ">
          <nav className="flex items-center flex-col lg:flex-row justify-center gap-4">
            {dataNavbar.map(({ title, href }) => (
              <Link
                className="font-medium opacity-80 hover:opacity-100"
                href={href}
                key={href}
              >
                {title}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
          {sessionImage ? (
            <Link href="/dashboard" className="flex">
              <Button
                variant="outline"
                size="icon"
                className="m-auto border-primary border-[3px] aspect-square scale-110"
              >
                <Image
                  className="rounded-full w-full"
                  src={sessionImage}
                  alt="Picture of the author"
                  width={60}
                  height={60}
                />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" className="w-full self-end">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
      <button
        className="lg:hidden"
        onClick={() => {
          setIsNavMenuOpen(!isNavMenuOpen);
        }}
      >
        {isNavMenuOpen ? <X size={32} /> : <AlignRight size={32} />}
      </button>
    </div>
  );
};

export { NavMenu };
