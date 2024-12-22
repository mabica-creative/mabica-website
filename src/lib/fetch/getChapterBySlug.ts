export async function getChapterBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    { cache: "no-cache" },
  );
  return await res.json();
}
