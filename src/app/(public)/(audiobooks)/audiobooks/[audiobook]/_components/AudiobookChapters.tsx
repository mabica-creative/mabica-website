import Link from 'next/link';
import { useChapters } from '@/hooks/useChapters';

export function AudiobookChapters({ id, slug }: { id: number, slug: string }) {
  const { chapters, loading, error } = useChapters(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ul>
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <li key={chapter.slug}>
              <Link href={`/audiobooks/${slug}/${chapter.slug}`}>
                {index + 1} - {chapter.title}
              </Link>
            </li>
          ))
        ) : (
          <li>Have no chapter</li>
        )}
      </ul>
    </div>
  );
}
