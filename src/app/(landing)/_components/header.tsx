"use client";

import Link from "next/link";
import { useState } from "react";
import { SocialMedia } from "@/components/social-media";
import { HiOutlineMenu } from "react-icons/hi";
import { FiX } from "react-icons/fi";

export function Header() {
  const [navbar, setNavbar] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 ">
      <nav className="flex py-5 max-w-screen-xl backdrop-blur-lg w-screen mx-auto px-[7%] justify-between items-center">
        <Link href="/" className="text-xl">
          Mabica
        </Link>


        <div className="hidden md:flex gap-14 font-medium">
          <Link href="/" className="hover:opacity-100 opacity-50">
            Home
          </Link>
          <Link href="/about" className="hover:opacity-100 opacity-50">
            About
          </Link>
          <Link href="/team" className="hover:opacity-100 opacity-50">
            Team
          </Link>
          <Link href="/gallery" className="hover:opacity-100 opacity-50">
            Galerry
          </Link>
        </div>

        <div className="flex gap-2">
          <SocialMedia />
          <button
            onClick={() => {
              setNavbar(!navbar);
            }}
          >
            <HiOutlineMenu className="text-2xl hover:text-text hover:opacity-50 duration-300 md:hidden" />
          </button>
        </div>

        <div
          className={`${navbar ? "block" : "hidden"} md:hidden absolute top-0 left-0 z-50 w-screen h-[100dvh] bg-background flex flex-col p-[7%]`}
        >
          <button
            onClick={() => {
              setNavbar(!navbar);
            }}
            className="self-end"
          >
            <FiX className="text-2xl hover:text-text hover:opacity-50 duration-300 md:hidden" />
          </button>
          <div className=" md:block flex items-center flex-col gap-14 m-auto font-medium ">
            <Link href="/" className="hover:opacity-100 opacity-50">
              Home
            </Link>
            <Link href="/about" className="hover:opacity-100 opacity-50">
              About
            </Link>
            <Link href="/team" className="hover:opacity-100 opacity-50">
              Team
            </Link>
            <Link href="/gallery" className="hover:opacity-100 opacity-50">
              Galerry
            </Link>
          </div>
        </div>

      </nav>
    </header>
  );
}
