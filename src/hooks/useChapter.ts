import { db } from "@/lib/firebase";
import { Chapter } from "@/lib/interface/Chapter";
import {
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function getChapter(chapterSlug: string): Promise<Chapter | null> {
  try {
    const docRef = doc(db, "chapters", chapterSlug);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (!docSnap.exists() || docSnap.data().deleted) {
      return null;
    }

    return docSnap.data() as Chapter;
  } catch (error) {
    console.error("Error fetching audiobook: ", error);
    return null;
  }
}

function useChapter(chapterSlug: string) {
  const [data, setData] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getChapter(chapterSlug);
        if (result) {
          setData(result);
        } else {
          setError("Chapter not found.");
        }
      } catch (err) {
        setError("Error fetching audiobook: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [chapterSlug]);

  return { data, loading, error };
}

export { useChapter };
