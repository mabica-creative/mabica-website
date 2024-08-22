import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Audiobook } from "@/lib/interface/Audiobook";
import { useState, useEffect } from "react";

async function getAudiobooks(): Promise<Audiobook[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "audiobooks"));
    const audiobooks: Audiobook[] = querySnapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        ...(doc.data() as Audiobook),
      }))
      .filter((audiobook: Audiobook) => !audiobook.deleted)
      .sort((a, b) => {
        // Pastikan 'a' dan 'b' didefinisikan
        if (!a || !b || !a.posted || !b.posted) {
          return 0; // Tidak melakukan perubahan urutan jika salah satu tidak didefinisikan
        }

        return a.posted - b.posted;
      });

    // console.log(audiobooks);
    return audiobooks;
  } catch (error) {
    console.error("Error fetching audiobooks: ", error);
    throw error;
  }
}

function useAudiobooks() {
  const [data, setData] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAudiobooks();
        setData(data);
      } catch (error) {
        setError(error as Error); // Type assertion to Error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export { useAudiobooks };
