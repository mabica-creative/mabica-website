"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, PieChart, Users, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); // Mendapatkan URL aktif
  console.log();

  const links = [
    { href: "/profile", label: "Profile", Icon: User },
    { href: "/overview", label: "Overview", Icon: PieChart },
    { href: "/user", label: "User", Icon: Users },
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  ];

  return (
    <aside className="container flex justify-center items-center pt-24 gap-4">
      {links.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 hover:text-primary transition duration-300 ${
            pathname === href ? "text-foreground" : " text-foreground/60"
          }`}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
