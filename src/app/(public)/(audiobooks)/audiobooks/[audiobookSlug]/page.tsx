"use client";

import { cn } from "@/lib/utils";
import { useAudiobook } from "@/hooks/useAudiobook";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { AudiobookNav } from "./_components/AudiobookNav";
import { ChaptersContainer } from "./_components/ChaptersContainer";

export default function AudiobookPage({
  params: { audiobookSlug },
}: {
  params: { audiobookSlug: string };
}) {
  const { data, loading, error } = useAudiobook(audiobookSlug);

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-screen flex justify-center items-center">
          Error: {error}
        </h1>
      ) : data ? (
        <div
          className={cn(
            "pt-16 lg:py-10 space-y-2 scroll-mt-14",
            "lg:space-y-4",
          )}
        >
          <AudiobookNav audiobook={data?.title} />

          <main className="container">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col gap-2 lg:w-4/12">
                <Image
                  className="w-full h-full aspect-[9/12] object-cover rounded-xl"
                  src={data?.image}
                  alt="Audiobook image"
                  width="400"
                  height="600"
                />
                <Link href={`/audiobooks/${audiobookSlug}/${audiobookSlug}-1`}>
                  <Button className="w-full">Start Read</Button>
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-2xl lg:text-3xl">
                    {data?.title}
                  </h1>
                  <ul className="text-base text-muted-foreground lg:text-lg">
                    <li>Status: {data?.status}</li>
                    <li>Posted: {data?.posted}</li>
                    <li>Gendre: {data?.genre}</li>
                  </ul>
                </div>

                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl lg:text-2xl">
                    Related Party
                  </h2>
                  <ul className="text-base text-muted-foreground lg:text-lg">
                    <li>Art: {data?.art}</li>
                    <li>Author: {data?.author}</li>
                    <li>Editor: {data?.editor}</li>
                  </ul>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl lg:text-2xl">
                    Synopsis
                  </h2>
                  <div className="text-base text-muted-foreground lg:text-lg">
                    {data?.synopsis.split("\\n").map((item, index) => (
                      <p key={index}>
                        {item}
                        <br />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <ChaptersContainer audiobookSlug={audiobookSlug} />
        </div>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobook Found
        </h1>
      )}
    </>
  );
}
