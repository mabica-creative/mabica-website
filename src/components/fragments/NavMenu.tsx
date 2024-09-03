"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { dataNavbar } from "@/lib/data/dataNavbar";

interface NavMenuProps {
  sessionImage?: string;
}

const NavMenu = ({ sessionImage }: NavMenuProps) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`${isNavMenuOpen ? "absolute w-screen h-screen " : "hidden"} lg:block -z-40 top-0 left-0 right-0 bg-background lg:bg-transparent	`}
      >
        <div className="container flex flex-col lg:flex-row justify-between gap-4 lg:items-center h-full lg:py-4 pt-28 pb-10 ">
          <nav className="flex flex-col lg:flex-row justify-center gap-4">
            {dataNavbar.map(({ title, href }) => (
              <Link
                className="font-medium opacity-80 hover:opacity-100"
                href={href}
                key={href}
              >
                {title}
              </Link>
            ))}
          </nav>
          {sessionImage ? (
            <Link href="/profile">
              <Image
                className="rounded-full border-2 border-primary"
                src={sessionImage}
                alt="Picture of the author"
                width={36}
                height={36}
              />
            </Link>
          ) : (
            <Link href="/signin">
              <Button className="w-full self-end">Sign in</Button>
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
