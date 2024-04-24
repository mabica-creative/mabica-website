export async function getTeam() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/team`);

  if (req.status !== 200) {
    return { status: "error" };
  }

  return req.json();
}
