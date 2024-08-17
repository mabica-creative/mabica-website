"use client";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { useChapter } from "@/hooks/useChapter";

export default function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const { chapter, detailCh, availableCh, loading, error } = useChapter(
    params?.chapter,
  );

  if (!availableCh) {
    return <h1 className="text-center">Ongoing Chapter</h1>;
  }

  return (
    <>
      {loading ? (
        <h1 className="container h-screen flex justify-center items-center">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="container h-screen flex justify-center items-center">
          {error}
        </h1>
      ) : (
        <main
          id="audiobook"
          className={cn("container pt-20 pb-28 scroll-mt-14")}
        >
          {chapter && detailCh ? (
            <>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/audiobooks">
                      Audiobooks
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/audiobooks/${detailCh?.slug}`}>
                      {detailCh?.slug}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{chapter?.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h2
                className={cn(
                  "text-lg mb-2 font-semibold",
                  "lg:mb-4 lg:text-3xl",
                )}
              >
                #Chapter
              </h2>

              {/* Display chapter details and detailCh */}
              <div>
                <h3>Chapter Details:</h3>
                <pre>{JSON.stringify(chapter, null, 2)}</pre>
              </div>

              <div>
                <h3>Chapter Information:</h3>
                <pre>{JSON.stringify(detailCh, null, 2)}</pre>
              </div>
            </>
          ) : (
            <p>No chapter details available.</p>
          )}
        </main>
      )}
    </>
  );
}
