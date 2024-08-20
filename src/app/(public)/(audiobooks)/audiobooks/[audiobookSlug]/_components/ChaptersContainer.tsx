"use client";

import { useChapters } from "@/hooks/useChapters";
import React from "react";

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
      ) : (
        !!data.length ? (
          <div className="container p-4">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <h1 className="container h-screen flex justify-center items-center">
            No Audiobooks Found
          </h1>
        )
      )}
    </>
  );
}
