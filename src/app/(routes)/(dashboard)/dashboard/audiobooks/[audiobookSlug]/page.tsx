import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DialogUpdateAudiobook } from "./../_components/DialogUpdateAudiobook";
import { DialogUpdateDetailAudiobook } from "./../_components/DialogUpdateDetailAudiobook";
import { DialogCreateChapter } from "./../_components/DialogCreateChapter";

import { Audiobook, DetailAudiobook, Chapter } from "@prisma/client";
import { getAudiobookBySlug } from "@/lib/fetch/getAudiobookBySlug";
import { deleteAudiobookBySlug } from "@/lib/actions/deleteAudiobookBySlug";

interface DataInterfaceAudiobook extends Audiobook {
  detail: DetailAudiobook;
  chapters?: Chapter[];
  error?: string;
}

export const dynamic = "force-dynamic";
export default async function DetailAudiobookPage({
  params: { audiobookSlug: slug },
}: {
  params: { audiobookSlug: string };
}) {
  const data: DataInterfaceAudiobook = await getAudiobookBySlug(slug);
  if (data.error) {
    return redirect("/404");
  }

  return (
    <section className="container min-h-screen py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">{`Detail for ${data?.title}`}</h1>

        {/* Buttons */}
        <div className="flex space-x-2">
          <Link href={`/audiobooks/${data.slug}`}>
            <Button variant="outline" className="py-2 px-4">
              Overview
            </Button>
          </Link>
          <DialogUpdateAudiobook data={data} />
          <form
            action={async () => {
              "use server";
              await deleteAudiobookBySlug(data?.slug);
              return redirect("/dashboard/audiobooks");
            }}
          >
            <Button variant="outline" type="submit" className="py-2 px-4">
              Delete
            </Button>
          </form>
        </div>
      </div>

      {/* Audiobook Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Image
          src={data?.imageUrl}
          alt={data?.title}
          width={300}
          height={300}
          className="rounded-lg object-cover mb-4"
        />
        <h2 className="text-3xl font-bold">{data?.title}</h2>
        <p className="text-lg text-muted-foreground mt-2">{data?.synopsis}</p>
      </div>

      {/* Audiobook Info */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Audiobook Details</h2>
          <DialogUpdateDetailAudiobook
            audiobookSlug={data?.slug}
            audiobookId={data?.id}
            data={data?.detail}
          />
        </div>
        <div className="space-y-2">
          <p>
            <strong>Author:</strong> {data?.detail?.author}
          </p>
          <p>
            <strong>Editor:</strong> {data?.detail?.editor}
          </p>
          <p>
            <strong>Genre:</strong> {data?.detail?.genre}
          </p>
          <p>
            <strong>Voice Actor:</strong> {data?.detail?.voiceActor}
          </p>
          <p>
            <strong>Status:</strong> {data?.detail?.status}
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
      </div>

      {/* Chapters List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Chapters</h2>
          <DialogCreateChapter
            audiobookSlug={data?.slug}
            audiobookId={data?.id}
          />
        </div>

        <ul className="space-y-4">
          {data?.chapters?.map((chapter) => (
            <li
              key={chapter?.id}
              className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <p className="font-semibold">Chapter {chapter?.chapterNumber}</p>
              <p>
                <strong>Slug:</strong> {chapter?.slug}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(chapter?.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(chapter?.updatedAt).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="flex space-x-2 mt-4">
                <Link
                  href={`/dashboard/audiobooks/${data?.slug}/${chapter?.slug}`}
                >
                  <Button variant="outline" className="py-2 px-4">
                    Detail
                  </Button>
                </Link>
                <Link href={`/audiobooks/${data?.slug}/${chapter?.slug}`}>
                  <Button variant="outline" className="py-2 px-4">
                    Overview
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
