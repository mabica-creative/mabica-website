"use server";

export async function deleteAudiobookBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
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
