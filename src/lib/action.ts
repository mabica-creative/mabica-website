"use server"

// import { Audiobook } from "@prisma/client";
// import { redirect } from "next/navigation";

export async function getAllAudiobooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`,
    { cache: "no-cache" },
  );

  return await res.json();
}

export async function getOneAudiobook(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    { cache: "no-cache" },
  );
  return await res.json();
}

export async function deleteAudiobook(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    { method: "DELETE" },
  );
  return await res.json();
}

export async function getOneChapter(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    { cache: "no-cache" },
  );
  return await res.json();
}

export async function deleteChapter(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    { method: "DELETE" },
  );
  return await res.json();
}
