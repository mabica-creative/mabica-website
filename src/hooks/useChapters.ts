import { useState, useEffect } from 'react';
import { db } from "@/lib/firebase"; // Adjust the import path as needed
import {
  query,
  where,
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// Define chapter types
export interface ChapterTypes {
  slug?: string;
  id: number;
  title: string;
  script: string;
  audio: string;
  delete?: boolean;
  audiobook_id?: number;
}

// Custom hook to fetch and manage chapter data
export function useChapters(id: number) {
  const [chapters, setChapters] = useState<ChapterTypes[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);

      try {
        const chapters: ChapterTypes[] = [];
        const q = query(
          collection(db, "chapters"),
          where("audiobook_id", "==", id)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as Omit<ChapterTypes, 'slug'>;
          if (!data.delete) {
            chapters.push({
              slug: doc.id,
              ...data
            });
          }
        });

        chapters.sort((a, b) => a.id - b.id);

        setChapters(chapters);
      } catch (error) {
        setError('Error fetching chapters: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [id]);

  return { chapters, loading, error };
}

