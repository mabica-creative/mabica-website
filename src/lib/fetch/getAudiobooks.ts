export async function getAudiobooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  const result = await res.json();
  return result;
}

