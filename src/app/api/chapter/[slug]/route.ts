export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const headers = request.headers;
  console.log(headers.get("Authorization"));

  const res = await fetch(
    "https://strapi-one-zou3.onrender.com/api/chapters?filters[slug][$eq]=" +
      slug,
  );
  const data = await res.json();

  return Response.json({ data });
}
