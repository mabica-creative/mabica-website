"use server";

export async function getAllAudiobook() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`);
  return await res.json();
}

export async function deleteAudiobook(slug: string) {
  // belum di cek
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`, {method : "DELETE"});
  return await res.json()
}
