import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";

import { Chapter, DetailChapter } from "@prisma/client";
import { getOneChapter, deleteChapter } from "@/lib/action";

interface DataInterfaceChapter extends Chapter {
  detail: DetailChapter;
}

export default async function DetailChapterPage({
  params: { chapterSlug: slug },
}: {
  params: { chapterSlug: string };
}) {
  const data: DataInterfaceChapter = await getOneChapter(slug);
  if (!data || !data.slug) {
    return redirect("/404");
  }
  const audiobookSlug = data.slug.split("-").slice(0, -1).join("-");

  return (
    <section className="container min-h-screen">
      <div className="flex justify-between items-center pb-4">
        <h1>Detail for Chapter {data?.chapterNumber}</h1>
        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <Link href={`/audiobooks/${audiobookSlug}/${data.slug}`}>
            <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
              Overview
            </button>
          </Link>
          <button className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition">
            Edit
          </button>
          <form
            action={async () => {
              "use server";
              await deleteChapter(data?.slug);
              return redirect(`/dashboard/audiobooks`);
            }}
          >
            <button
              type="submit"
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        {/* Chapter Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Chapter {data.chapterNumber}
          </h1>
          <p>
            <strong>Slug:</strong> {data.slug}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(data.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Audio Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Audio</h2>
          <audio controls className="w-full">
            <source src={data.detail.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Chapter Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Chapter Content</h2>
          <p>{data.detail.content}</p>
        </div>
      </div>
    </section>
  );
}
