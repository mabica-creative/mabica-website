import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(className, "flex gap-1 items-center")}>
      <div className="w-10 lg:w-10">
        <Image
          src="/logo.svg"
          width="64"
          height="64"
          alt="mabica logo"
          className="w-full h-full"
        />
      </div>
      <p className={cn("text-lg font-semibold")}>Mabica</p>
    </Link>
  );
}
