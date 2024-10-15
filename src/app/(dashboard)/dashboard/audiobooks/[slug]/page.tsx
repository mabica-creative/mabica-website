import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { Audiobook, DetailAudiobook, Chapter } from "@prisma/client";
import { getOneAudiobook } from "@/lib/action";

interface DataInterfaceAudiobook extends Audiobook {
  detail: DetailAudiobook;
  chapters?: Chapter;
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data: DataInterfaceAudiobook = await getOneAudiobook(slug);

  return (
    <section className="container min-h-screen">
      <div className="flex justify-between items-center pb-4">
        <h1>Detail for {data?.title}</h1>
        <Button>Create Chapter</Button>
      </div>
      <div className="flex gap-2">
        <div className="w-4/12">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}
