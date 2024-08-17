
import { db } from "@/lib/firebase";
import { Audiobook } from "./useAudiobooks"; // Ensure the correct path for the Audiobook type
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

// Function to fetch a single audiobook by its slug
async function getAudiobook(slug: string): Promise<Audiobook | false> {
  try {
    const docRef = doc(db, "audiobooks", slug);
    const docSnap: DocumentSnapshot = await getDoc(docRef);

    if (!docSnap.exists()) {
      return false;
    }

    return docSnap.data() as Audiobook;
  } catch (error) {
    console.error("Error fetching audiobook: ", error);
    return false;
  }
}

// Custom hook to fetch and manage audiobook data
export function useAudiobook(audiobookId: string) {
  const [book, setBook] = useState<Audiobook | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAudiobook(audiobookId);
        if (data) {
          setBook(data);
        } else {
          setError("Audiobook not found.");
        }
      } catch (error) {
        setError("Error fetching audiobook: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [audiobookId]);

  return { book, loading, error };
}

export { getAudiobook };

