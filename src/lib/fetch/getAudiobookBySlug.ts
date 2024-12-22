export async function getAudiobookBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    { cache: "no-cache" },
  );
  return await res.json();
}

