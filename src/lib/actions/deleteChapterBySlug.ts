"use server";

export async function deleteChapterBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  const result = await res.json();
  return result;
}
