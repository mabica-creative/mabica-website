"use server"

export async function createChapter(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_SECRET}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
