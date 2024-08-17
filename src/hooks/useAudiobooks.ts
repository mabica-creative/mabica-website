import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface Audiobook {
  slug?: string;
  id: number;
  name: string;
  image: string;
  delete?: boolean;
}

async function getAudiobooks(): Promise<Audiobook[]> {
  try {
    // Fetch audiobooks collection
    const querySnapshot = await getDocs(collection(db, "audiobooks"));

    // Extract and filter audiobooks
    const audiobooks = querySnapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const { id, name, image, delete: deleted } = doc.data();
        return { slug: doc.id, id, name, image, delete: deleted };
      })
      .filter((audiobook: Audiobook) => !audiobook.delete)
      .sort((a, b) => a.id - b.id);

    // Log and return the array of audiobooks
    console.log(audiobooks);
    return audiobooks;
  } catch (error) {
    console.error("Error fetching audiobooks: ", error);
    throw error;
  }
}

export function useAudiobooks() {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAudiobooks();
        setAudiobooks(data);
      } catch (error) {
        setError("Error fetching audiobooks: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { audiobooks, loading, error };
}

export { getAudiobooks };
export type { Audiobook };
