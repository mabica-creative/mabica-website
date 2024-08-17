import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";

// Define the types
export interface Chapter {
  chapterSlug?: string;
  title: string;
  delete?: boolean; // Optional field to indicate if the chapter is deleted
}

export interface DetailCh {
  slug: string;
  ch: number;
}

// Function to fetch a single chapter by its slug
export async function getChapter(slug: string): Promise<Chapter | false> {
  const docRef = doc(db, "chapters", slug);

  try {
    const docSnapshot: DocumentSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log(`Chapter with slug '${slug}' not found.`);
      return false;
    }

    const data = docSnapshot.data() as Chapter;

    if (data.delete) {
      return false;
    }

    return { chapterSlug: docSnapshot.id, ...data };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return false;
  }
}

// Custom hook to fetch and manage chapter data
export function useChapter(chapterId: string) {
  const [chapter, setChapter] = useState<Chapter | false>(false);
  const [detailCh, setDetailCh] = useState<DetailCh | false>(false);
  const [availableCh, setAvailableCh] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);
      try {
        const chapterData = await getChapter(chapterId);

        if (chapterData) {
          const chapterArray = chapterId.split("-");
          const chapterNumber = parseInt(chapterArray.pop() || "0", 10);
          const chapterSlug = chapterArray.join("-");

          setDetailCh({ slug: chapterSlug, ch: chapterNumber });
          setChapter(chapterData);
        } else {
          setAvailableCh(false);
        }
      } catch (error) {
        setError("Error fetching chapter: " + (error instanceof Error ? error.message : "Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId]);

  return { chapter, detailCh, availableCh, loading, error };
}
