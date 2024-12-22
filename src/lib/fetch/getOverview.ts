export async function getOverview(cache = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/overview`,
    cache,
  );
  return await res.json();
}
