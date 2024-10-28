import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";

import { Audiobook, DetailAudiobook, Chapter } from "@prisma/client";
import { getOneAudiobook, deleteAudiobook } from "@/lib/action";

interface DataInterfaceAudiobook extends Audiobook {
  detail: DetailAudiobook;
  chapters?: Chapter[];
}

export const dynamic = "force-dynamic";
export default async function DetailAudiobookPage({
  params: { audiobookSlug: slug },
}: {
  params: { audiobookSlug: string };
}) {
  const data: DataInterfaceAudiobook = await getOneAudiobook(slug);
  if (!data || !data.detail || !data.chapters) {
    return redirect("/404");
  }

  return (
    <section className="container min-h-screen">
      <div className="flex justify-between items-center pb-4">
        <h1>Detail for {data?.title}</h1>
        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <Link href={`/audiobooks/${data.slug}`}>
            <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
              Details
            </button>
          </Link>
          <button className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition">
            Edit
          </button>
          <form
            action={async () => {
              "use server";
              await deleteAudiobook(data?.slug);
              return redirect("/dashboard/audiobooks");
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
      <div className=" mx-auto p-4">
        {/* Audiobook Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <div className="mx-auto rounded-lg shadow-md">{data.imageUrl}</div>
          <p className="mt-4 text-gray-600">{data.synopsis}</p>
        </div>

        {/* Audiobook Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Audiobook Details</h2>
          <p>
            <strong>Author:</strong> {data.detail.author}
          </p>
          <p>
            <strong>Editor:</strong> {data.detail.editor}
          </p>
          <p>
            <strong>Genre:</strong> {data.detail.genre}
          </p>
          <p>
            <strong>Voice Actor:</strong> {data.detail.voiceActor}
          </p>
          <p>
            <strong>Status:</strong> {data.detail.status}
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

        {/* Chapters List */}
        <div>
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
            <Button>Create Chapter</Button>
          </div>

          <ul className="space-y-4">
            {data.chapters?.map((chapter) => (
              <li
                key={chapter.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold">Chapter {chapter.chapterNumber}</p>
                <p>
                  <strong>Slug:</strong> {chapter.slug}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(chapter.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(chapter.updatedAt).toLocaleString()}
                </p>

                {/* Buttons */}
                <div className="flex space-x-2 mt-4">
                  <Link
                    href={`/dashboard/audiobooks/${data.slug}/${chapter.slug}`}
                  >
                    <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
                      Deatails
                    </button>
                  </Link>
                  <button className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
