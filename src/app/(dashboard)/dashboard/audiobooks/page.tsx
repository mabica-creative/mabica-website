import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { getAllAudiobooks } from "@/lib/action";
import { Audiobook } from "@prisma/client";
import { DialogCreateAudiobook } from "./_components/DialogCreateAudiobook";

export default async function AudibooksPage() {
  const audiobooks: Audiobook[] = await getAllAudiobooks();

  return (
    <section className="container min-h-screen">
      <div className="flex justify-between items-center pb-4">
        <h1>Audiobooks</h1>

        <DialogCreateAudiobook />
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Synopsis</th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {audiobooks.map((data: Audiobook) => (
            <tr key={data?.id} className="bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {data?.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data?.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data?.imageUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data?.synopsis}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right space-x-2">
                <Link href={`/dashboard/audiobooks/${data?.slug}`}>
                  <Button variant="outline">Details</Button>
                </Link>
                <Button variant="outline">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
