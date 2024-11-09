import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { Chapter } from "@prisma/client";

export async function ChaptersContainer({
  chapters,
  audiobookSlug,
}: {
  chapters?: Chapter[];
  audiobookSlug: string;
}) {
  if (!chapters) {
    return (
      <>
        <h1 className="container h-screen flex justify-center items-center">
          Have no chapter, Sorry!!
        </h1>
      </>
    );
  }
  return (
    <section id="about" className="container space-y-4 py-5">
      <h2 className="text-xl font-semibold"># Chapters</h2>
      <div className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-4">
        {chapters.map((chapter: Chapter) => (
          <Link
            href={`/audiobooks/${audiobookSlug}/${chapter?.slug}`}
            key={chapter?.slug}
          >
            <Button
              variant="outline"
              className="lg:px-4 w-full lg:text-lg "
            >{`Chapter - ${chapter?.chapterNumber}`}</Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
