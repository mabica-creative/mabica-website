// Navbar of AudioBook 
// Client Side Rendering

"use client"

import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export function AudioNavbar() {
  return (
    <header className="sticky top-0">
      <nav className="pt-5 pb-3 px-5 flex gap-2">
        <button type="button" onClick={() => history.back()}><FiArrowLeft /></button>
        <Link href="/audiobook"><FiHome /></Link>
      </nav>
    </header>
  )
}
