"use server";

import { redirect } from "next/navigation";

export async function deleteAudiobook(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    { method: "DELETE" },
  );
  return await res.json();
}

