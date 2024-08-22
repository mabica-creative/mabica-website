"use client";

import { cn } from "@/lib/utils";
import { useChapter } from "@/hooks/useChapter";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChapterNav } from "./_components/ChapterNav";
import { ChaptersNav } from "./_components/ChaptersNav";
import { ChapterHeading } from "./_components/ChapterHeading";
import { ChapterAudio } from "./_components/ChapterAudio";
import { ChapterScript } from "./_components/ChapterScript";

export default function AudiobookPage({
  params: { chapterSlug },
}: {
  params: { chapterSlug: string };
}) {
  const { data, loading, error } = useChapter(chapterSlug);

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <main className="container h-screen flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl font-medium">Error: {error}</h1>
          <Link
            href={`/audiobooks/${chapterSlug.split("-").slice(0, -1).join("-")}`}
          >
            <Button>Back to Audiobook</Button>
          </Link>
        </main>
      ) : data ? (
        <main
          className={cn(
            "pt-16 space-y-2 scroll-mt-14",
            "lg:space-y-4 lg:py-10 lg:pt-28",
          )}
        >
          <ChapterNav audiobook={data?.audiobook_id} />
          <ChapterHeading chapter={data?.chapter} />
          <ChaptersNav audiobook={data?.audiobook_id} chapter={data?.chapter} />
          <ChapterAudio audio={data?.audio} />
          <ChapterScript script={data?.script} />
          <ChaptersNav audiobook={data?.audiobook_id} chapter={data?.chapter} />
        </main>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobook Found
        </h1>
      )}
    </>
  );
}
