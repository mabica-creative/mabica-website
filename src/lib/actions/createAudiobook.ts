"use server";

import { redirect } from "next/navigation";

export async function createAudiobook(data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
    },
  );
  const result = await res.json();
  // console.log(result)
  return redirect(`/dashboard/audiobooks/${result?.slug}`);
}

