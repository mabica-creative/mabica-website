import { db } from "@/lib/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Chapter } from "@/lib/interface/Chapter";
import { useState, useEffect } from "react";

async function getChapters(audiobookSlug: string): Promise<Chapter[]> {
  try {
    const q = query(
      collection(db, "chapters"),
      where("audiobook_id", "==", audiobookSlug),
    );
    const querySnapshot = await getDocs(q);

    const chapters: Chapter[] = querySnapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        ...(doc.data() as Chapter),
      }))
      .filter((chapter: Chapter) => !chapter.deleted)
      .sort((a, b) => a.posted - b.posted);

    return chapters;
  } catch (error) {
    console.error("Error fetching audiobooks: ", error);
    throw error;
  }
}

function useChapters(audiobookSlug: string) {
  const [data, setData] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getChapters(audiobookSlug);
        setData(data);
      } catch (error) {
        setError(error as Error); // Type assertion to Error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [audiobookSlug]);

  return { data, loading, error };
}

export { useChapters };
