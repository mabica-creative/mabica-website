export async function getTeam() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/team`)
   
  return req.json()
}
