import { Button } from "./_components/button";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return notFound();
  }

  return (
    <div className="h-[100dvh] px-[7%] max-w-screen-sm m-auto flex flex-col justify-center items-center gap-4 ">
      <div className="flex gap-2">
        <Image
          className="w-20 h-20 row-span-2 rounded-full aspect-square"
          src="/profile.png"
          width={500}
          height={500}
          alt={params?.slug}
        />

        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-2xl underline underline-offset-4 decoration-[var(--secondary)] ">
            @{params?.slug}
          </h1>
          <p>{`Konnichiwa. I can learn Japanese better thanks to Tanaka-san.`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button link="/">Wattdap</Button>
        <Button link="/">Instagram</Button>
        <Button link="/">Youtibe</Button>
        <Button link="/">Tiktik</Button>
      </div>
    </div>
  );
}
