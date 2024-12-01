import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DialogUpdateAudiobook } from "./../_components/DialogUpdateAudiobook";
import { DialogUpdateDetailAudiobook } from "./../_components/DialogUpdateDetailAudiobook";
import { DialogCreateChapter } from "./../_components/DialogCreateChapter";

import { Audiobook, DetailAudiobook, Chapter } from "@prisma/client";
import { getOneAudiobook, deleteAudiobook } from "@/lib/action";

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
  const data: DataInterfaceAudiobook = await getOneAudiobook(slug);
  if (data.error) {
    return redirect("/404");
  }

  return (
    <section className="container min-h-screen">
      <div className="flex justify-between items-center pb-4">
        <h1>Detail for {data?.title}</h1>
        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <Link href={`/audiobooks/${data.slug}`}>
            <Button variant="outline">Overview</Button>
          </Link>
          <DialogUpdateAudiobook data={data} />
          <form
            action={async () => {
              "use server";
              await deleteAudiobook(data?.slug);
              return redirect("/dashboard/audiobooks");
            }}
          >
            <Button variant="outline" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <div className=" mx-auto p-4">
        {/* Audiobook Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
          <div className="flex mt-4 gap-4 ">
            <Image
              src={data?.imageUrl}
              alt={data?.title}
              width={300}
              height={300}
              className="bg-green-500 aspect-[9/12]"
            />
            <p className="text-gray-600">{data?.synopsis}</p>
          </div>
        </div>

        {/* Audiobook Info */}
        <div className="mb-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Audiobook Details</h2>
            <DialogUpdateDetailAudiobook
              audiobookSlug={data?.slug}
              audiobookId={data?.id}
              data={data?.detail}
            />
          </div>
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

        {/* Chapters List */}
        <div>
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
            <DialogCreateChapter
              audiobookSlug={data?.slug}
              audiobookId={data?.id}
            />
          </div>

          <ul className="space-y-4">
            {data?.chapters?.map((chapter) => (
              <li
                key={chapter?.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold">
                  Chapter {chapter?.chapterNumber}
                </p>
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
                    <Button variant="outline">Detail</Button>
                  </Link>
                  <Link href={`/audiobooks/${data?.slug}/${chapter?.slug}`}>
                    <Button variant="outline">Overview</Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
