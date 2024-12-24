import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DialogUpdateChapter } from "@/components/page/dashboard/DialogUpdateChapter";
import { DialogUpdateDetailChapter } from "@/components/page/dashboard/DialogUpdateDetailChapter";
import { getChapterBySlug } from "@/lib/fetch/getChapterBySlug";
import { deleteChapterBySlug } from "@/lib/actions/deleteChapterBySlug";

import { Chapter, DetailChapter } from "@prisma/client";

interface DataInterfaceChapter extends Chapter {
  detail: DetailChapter;
}

export default async function DetailChapterPage({
  params: { chapterSlug: slug },
}: {
  params: { chapterSlug: string };
}) {
  const data: DataInterfaceChapter = await getChapterBySlug(slug);
  if (!data || !data.slug) {
    return redirect("/404");
  }
  const audiobookSlug = data?.slug.split("-").slice(0, -1).join("-");

  return (
    <main className="pt-16 space-y-4 lg:py-10 lg:pt-28">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-3xl font-bold mb-4">
            Chapter {data?.chapterNumber} Details
          </h1>
          <div className="flex space-x-2 mt-4">
            <Link href={`/audiobooks/${audiobookSlug}/${data?.slug}`}>
              <Button variant="outline">Overview</Button>
            </Link>
            <DialogUpdateChapter
              audiobookSlug={audiobookSlug}
              chapterId={data?.id}
              audiobookId={data?.audiobookId}
              data={data}
            />
            <form
              action={async () => {
                "use server";
                await deleteChapterBySlug(data?.slug);
                return redirect(`/dashboard/audiobooks`);
              }}
            >
              <Button variant="outline" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </div>

        {/* Chapter Header */}
        <div className="max-w-4xl mx-auto p-4 text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Chapter {data?.chapterNumber}
          </h1>
          <p>
            <strong>Slug:</strong> {data?.slug}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(data?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(data?.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Audio Section */}
        <div className="mb-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Audio</h2>
            <DialogUpdateDetailChapter
              chapterId={data?.id}
              data={data.detail}
              audiobookId={data?.audiobookId}
              chapterSlug={data?.slug}
            />
          </div>
          <div className="w-full overflow-clip rounded-2xl">
            <iframe
              width="100%"
              height="100"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${data?.detail?.audioUrl}&color=%23b9ff66&auto_play=true&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`}
            ></iframe>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Chapter Content</h2>
          <p>{data?.detail?.content}</p>
        </div>
      </div>
    </main>
  );
}
