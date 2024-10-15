"use server";

export async function getAllAudiobooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`);
  return await res.json();
}

export async function getOneAudiobook(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`);
  return await res.json()
}
