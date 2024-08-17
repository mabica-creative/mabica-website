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
import { AudiobookChapters } from "./_components/AudiobookChapters";
import { useAudiobook } from "@/hooks/useAudiobook";

export default function Book({ params }: { params: { audiobook: string } }) {
  const { book, loading, error } = useAudiobook(params?.audiobook);

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/audiobooks">Audiobooks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{book?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h2
            className={cn("text-lg mb-2 font-semibold", "lg:mb-4 lg:text-3xl")}
          >
            #Audiobook
          </h2>
          {book && (
            <>
             <pre>{JSON.stringify(book, null, 2)}</pre>
              <AudiobookChapters id={+book?.id} slug={params?.audiobook} />
            </>
          )}
        </main>
      )}
    </>
  );
}
