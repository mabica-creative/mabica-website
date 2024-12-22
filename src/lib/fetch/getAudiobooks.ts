export async function getAudiobooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`,
    { cache: "no-cache" },
  );

  return await res.json();
}

