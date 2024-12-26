"use server";

export async function updateAudiobookBySlug(slug: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
      body: JSON.stringify(data),
    },
  );
  const result = await res.json();
  return result
}
