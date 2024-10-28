"use server";

export async function getAllAudiobooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`);
  return await res.json();
}

export async function getOneAudiobook(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`);
  return await res.json()
}

export async function deleteAudiobook(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`, {method: "DELETE"});
  return await res.json()
}
export async function getOneChapter(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`);
  return await res.json()
}

