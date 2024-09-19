export const dynamic = "force-static";

export async function GET() {
  const res = await fetch("https://strapi-one-zou3.onrender.com/api/audiobook");
  const data = await res.json();

  return Response.json({ data });
}
