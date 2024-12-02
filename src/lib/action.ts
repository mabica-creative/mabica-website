"use server";

import { redirect } from "next/navigation";

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
  return redirect(`/dashboard/audiobooks/${result?.slug}`);
}

export async function updateAudiobook(slug: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
    },
  );
  await res.json();
  return redirect("/dashboard/audiobooks/");
}

export async function updateDetailAudiobook(slug: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/audiobooks/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
    },
  );
  const result = await res.json();
  console.log(result);
  return redirect("/dashboard/audiobooks/");
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

export async function createChapter(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
  });
  const result = await res.json();
  console.log(result);
  redirect("/dashboard/audiobooks/");
}

export async function updateChapter(slug: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
    },
  );
  const result = await res.json();
  console.log(result);
  redirect("/dashboard/audiobooks/");
}

export async function updateDetailChapter(slug: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters/${slug}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
    },
  );
  const result = await res.json();
  console.log(result);
  redirect("/dashboard/audiobooks/");
}

export async function getOverview(cache = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/overview`,
    cache,
  );
  return await res.json();
}

export async function updateOverview(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/overview`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Mengirim data dalam bentuk JSON
  });
  const result = await res.json();
  redirect("/dashboard/");
}
