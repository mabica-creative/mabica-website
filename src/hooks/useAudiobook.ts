import { db } from "@/lib/firebase";
import { Audiobook } from "@/lib/interface/Audiobook";
import {
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useState, useEffect } from "react";

async function getAudiobook(audiobookSlug: string): Promise<Audiobook | null> {
  try {
    const docRef = doc(db, "audiobooks", audiobookSlug);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (!docSnap.exists() || docSnap.data().deleted) {
      return null;
    }

    return docSnap.data() as Audiobook;
  } catch (error) {
    console.error("Error fetching audiobook: ", error);
    return null;
  }
}

function useAudiobook(audiobookSlug: string) {
  const [data, setData] = useState<Audiobook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAudiobook(audiobookSlug);
        if (result) {
          setData(result);
        } else {
          setError("Audiobook not found.");
        }
      } catch (err) {
        setError("Error fetching audiobook: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [audiobookSlug]);

  return { data, loading, error };
}

export { useAudiobook };
