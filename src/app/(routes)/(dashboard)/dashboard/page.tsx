import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getAudiobooks } from "@/lib/fetch/getAudiobooks";
import { Audiobook } from "@prisma/client";
import { DialogCreateAudiobook } from "@/components/page/dashboard/DialogCreateAudiobook";

export default async function AudiobooksPage() {
  const audiobooks: Audiobook[] = await getAudiobooks();

  return (
    <section className="container min-h-screen py-6  ">
      <div className="flex justify-between items-center sm:items-center pb-4">
        <h1 className="text-2xl font-semibold">Audiobooks</h1>
        <DialogCreateAudiobook />
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-foreground/20 ">
            <tr className="text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Synopsis</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {audiobooks.map((data: Audiobook) => (
              <tr
                key={data?.id}
                className="even:bg-gray-50 dark:even:bg-gray-800"
              >
                <td className="px-4 py-2 text-center">{data?.id}</td>
                <td className="px-4 py-2">{data?.title}</td>
                <td className="px-4 py-2 text-center">
                  <Image
                    src={data?.imageUrl}
                    alt={data?.title}
                    width={100}
                    height={100}
                    className="m-auto aspect-[9/12] rounded-lg shadow-md"
                  />
                </td>
                <td className="px-4 py-2 truncate max-w-xs lg:max-w-sm">
                  {data?.synopsis}
                </td>
                <td className="px-4 py-2 text-right flex space-x-2">
                  <Link href={`/dashboard/${data?.slug}`}>
                    <Button variant="outline">Details</Button>
                  </Link>
                  <Link href={`/audiobooks/${data?.slug}`}>
                    <Button variant="outline">Overview</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
