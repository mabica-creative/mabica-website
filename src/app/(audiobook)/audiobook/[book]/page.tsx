// show a detail of a singel book

import Image from "next/image";
import { BookChapter } from "./_components/BookChapter";

export default function Page({ params }: { params: { book: string } }) {
  return (
    <main className="flex gap-20 max-w-screen-2xl w-screen flex-1 m-auto">
      <section className="h-fit sticky top-12">
        <div className="overflow-hidden border border-text rounded-lg border-2 w-80 aspect-[3/4]">
          <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="h-full object-cover"
          />
        </div>
        <h1 className="mt-3 mb-1 font-medium text-xl">{params.book}</h1>
        <div className="opacity-80 flex gap-2">
          <span className="px-2 bg-secondary rounded-md">Ongoing</span>
          <span className="px-2 bg-accent rounded-md">3 Chapter</span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-medium text-lg underline decoration-primary">Sinopsisi</h2>
          <p>Sinopsisi Lorem insum dolor sit amet aksjdhuaj jlhas laiuhefbahs </p>
        </div>
        <div>
          <h2 className="font-medium text-lg underline decoration-primary">Story</h2>
          <div className="flex flex-col gap-2">
            {
              ["1 - Cookies", "2 - Tea", "3 - Coffee"].map((title, index) => (
                <BookChapter slugBook={params.book} slugChapter={`chapter-${index}`} title={title} key={index} />
              ))
            }
          </div>
        </div>
      </section>

    </main>)
}
