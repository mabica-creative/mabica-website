import { cn } from "@/lib/utils/cn";
import { getChapterBySlug } from "@/lib/fetch/getChapterBySlug";

import { ChapterNav } from "@/components/page/audiobooks/ChapterNav";
import { ChaptersNav } from "@/components/page/audiobooks/ChaptersNav";
import { ChapterHeading } from "@/components/page/audiobooks/ChapterHeading";
import { ChapterAudio } from "@/components/page/audiobooks/ChapterAudio";
import { ChapterScript } from "@/components/page/audiobooks/ChapterScript";

export default async function ChapterPage({
  params: { chapterSlug },
}: {
  params: { chapterSlug: string };
}) {
  const data = await getChapterBySlug(chapterSlug);
  if (data.error) {
    return (
      <h1 className="container h-screen flex justify-center items-center">
        No Audiobook Found
      </h1>
    );
  }
  const audiobookSlug = data.slug.replace(/-\d+$/, "");

  return (
    <main
      className={cn(
        "pt-16 space-y-2 scroll-mt-14",
        "lg:space-y-4 lg:py-10 lg:pt-28",
      )}
    >
      <ChapterNav audiobook={audiobookSlug} />
      <ChapterHeading chapter={data?.chapterNumber} />
      <ChaptersNav audiobook={audiobookSlug} chapter={data?.chapterNumber} />
      {data?.detail?.audioUrl !== "none" && (
        <ChapterAudio audio={data?.detail?.audioUrl} />
      )}
      <ChapterScript script={data?.detail?.content} />
      <ChaptersNav audiobook={audiobookSlug} chapter={data?.chapterNumber} />
    </main>
  );
}
