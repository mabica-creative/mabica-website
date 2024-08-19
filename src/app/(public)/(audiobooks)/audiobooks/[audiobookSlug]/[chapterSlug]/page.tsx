"use client";

import { useChapter } from "@/hooks/useChapter";

export default function AudiobookPage({
  params: { chapterSlug },
}: {
  params: { chapterSlug: string };
}) {
  const { data, loading, error } = useChapter(chapterSlug);

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-screen flex justify-center items-center">
          Error: {error}
        </h1>
      ) : data ? (
        <div className="container p-4">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobook Found
        </h1>
      )}
    </>
  );
}
