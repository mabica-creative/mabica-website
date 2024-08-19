"use client";

import { useAudiobook } from "@/hooks/useAudiobook";
import { ChaptersContainer } from "./_components/ChaptersContainer";

export default function AudiobookPage({
  params: { audiobookSlug },
}: {
  params: { audiobookSlug: string };
}) {
  const { data, loading, error } = useAudiobook(audiobookSlug);

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
          <ChaptersContainer audiobookSlug={audiobookSlug} />
        </div>
      ) : (
        <h1 className="container h-screen flex justify-center items-center">
          No Audiobook Found
        </h1>
      )}
    </>
  );
}
