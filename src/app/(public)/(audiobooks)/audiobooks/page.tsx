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
import { CardContainer } from "@/components/layout/CardContainer";

import { useAudiobooks } from "@/hooks/useAudiobooks";

export default function AudiobooksPage() {
  // Use the custom hook to get audiobooks data
  const { audiobooks, loading, error } = useAudiobooks();

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
                <BreadcrumbPage>Audiobooks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className={cn("text-lg mb-2 font-semibold", "lg:mb-4 lg:text-3xl")}>
            #Audiobooks
          </h2>
          <CardContainer audiobooks={audiobooks} />
        </main>
      )}
    </>
  );
}
