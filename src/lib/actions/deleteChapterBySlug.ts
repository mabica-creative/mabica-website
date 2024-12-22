"use server";

import { redirect } from "next/navigation";

export async function deleteChapterBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    { method: "DELETE" },
  );
  return await res.json();
}
