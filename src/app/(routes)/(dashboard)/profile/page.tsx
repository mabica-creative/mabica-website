import { auth } from "@/lib/utils/auth";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { CardContainer } from "@/components/layout/CardContainer";

import type { Audiobook as AudiobookType } from "@prisma/client";
import type { Card as CardType } from "@/lib/interface/Card";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user || !session.expires) {
    return <div>Unauthorized</div>;
  }

  // Define the type of data to ensure type safety
  const data: AudiobookType[] = []; // Replace with actual fetch logic if needed

  // Map data to CardType
  const cards: CardType[] = data.map((audiobook) => ({
    href: `/audiobooks/${audiobook.slug}`,
    image: audiobook.imageUrl,
    heading: audiobook.title,
    subHeading: audiobook.synopsis,
  }));

  return (
    <>
      {/* Profile Section */}
      <section className="container flex flex-col items-center md:flex-row md:gap-8 md:items-start pt-16 md:pt-24">
        {session.user.image && (
          <Image
            className="rounded-full border-primary border-4 object-cover aspect-square w-32 h-32 md:w-48 md:h-48"
            src={session.user.image}
            alt={session.user.name || "User"}
            width="200"
            height="200"
          />
        )}
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-3xl font-bold md:text-5xl">
            {session.user.name || "Anonymous"}
          </h2>
          <p className="opacity-80 text-sm md:text-base">
            {session.user.email || "No email provided"}
          </p>
          <Link href="/sign-out" className="pt-4">
            <Button>Sign out</Button>
          </Link>
        </div>
      </section>

      {/* Audiobooks Section */}
      <section className="container flex flex-col gap-4 py-10 md:py-24" id="audiobooks">
        <hr />
        <h2 className="text-xl font-semibold lg:text-3xl text-center md:text-left">
          #Bookmark
        </h2>
        <CardContainer cards={cards} />
      </section>
    </>
  );
}
