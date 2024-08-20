"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { useChapters } from "@/hooks/useChapters";

interface ChaptersContainer {
  audiobookSlug: string;
}

export function ChaptersContainer({ audiobookSlug }: ChaptersContainer) {
  const { data, loading, error } = useChapters(audiobookSlug);

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-screen flex justify-center items-center">
          Error: {error.message}
        </h1>
      ) : !!data.length ? (
        <section id="about" className="container space-y-4 py-5">
          <h2 className="text-xl font-semibold"># Chapters</h2>
          <div className="grid gap-2 lg:gap-4 grid-cols-2 lg:grid-cols-4">
            {data.map((chapter) => (
              <Link
                href={`/audiobooks/${chapter?.audiobook_id}`}
                key={chapter?.slug}
              >
                <Button
                  variant="outline"
                  className="lg:px-4 w-full lg:text-lg "
                >{`Chapter - ${chapter?.chapter}`}</Button>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobooks Found
        </h1>
      )}
    </>
  );
}
