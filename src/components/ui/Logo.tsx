import Link from "next/link";
import Image from "next/image";

import { getOverview } from "@/lib/fetch/getOverview";
import { cn } from "@/lib/utils/cn"

interface LogoProps {
  className?: string;
}

export async function Logo({ className }: LogoProps) {
  const dataOverview = await getOverview();

  return (
    <Link href="/" className={cn(className, "flex gap-1 items-center")}>
      <div className="w-10 h-10  flex justify-center items-center rounded-full border-primary border-[3px] overflow-clip">
        <Image
          src={dataOverview?.logo}
          width="100"
          height="100"
          alt="mabica logo"
          className="w-full h-full scale-125"
        />
      </div>
      <p className={cn("text-lg font-semibold")}>Mabica</p>
    </Link>
  );
}
