import { cn } from "@/lib/utils/cn";
import { getAudiobookBySlug } from "@/lib/fetch/getAudiobookBySlug";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { AudiobookNav } from "@/components/page/audiobooks/AudiobookNav";
import { ChaptersContainer } from "@/components/page/audiobooks/ChaptersContainer";

export default async function AudiobookPage({
  params: { audiobookSlug },
}: {
  params: { audiobookSlug: string };
}) {
  const data = await getAudiobookBySlug(audiobookSlug);
  if (data.error) {
    return (
      <h1 className="container h-screen flex justify-center items-center">
        {data.error}
      </h1>
    );
  }
 // console.log(data);

  return (
    <>
      <div
        className={cn(
          "pt-16 space-y-2 scroll-mt-14",
          "lg:space-y-4 lg:py-10 lg:pt-28",
        )}
      >
        <AudiobookNav audiobook={data?.title} />

        <main className="container">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-2 lg:w-4/12">
              <Image
                className="w-full aspect-[9/12] object-cover rounded-xl"
                src={data?.imageUrl}
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
                  <li>Status: {data?.detail?.status}</li>
                  <li>Gendre: {data?.detail?.genre}</li>
                </ul>
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-xl lg:text-2xl">
                  Related Party
                </h2>
                <ul className="text-base text-muted-foreground lg:text-lg">
                  <li>Author: {data?.detail?.author}</li>
                  <li>Editor: {data?.detail?.editor}</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-xl lg:text-2xl">Synopsis</h2>
                <div className="text-base text-muted-foreground lg:text-lg">
                  {data?.synopsis &&
                    data?.synopsis
                      .split("\\n")
                      .map((item: string, index: number) => (
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
        <ChaptersContainer
          chapters={data?.chapters}
          audiobookSlug={audiobookSlug}
        />
      </div>
    </>
  );
}
