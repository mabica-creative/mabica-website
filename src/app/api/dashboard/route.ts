export async function GET() {
  const data = "GET";

  return Response.json({ data });
}

export async function POST() {
  const data = "POST";

  return Response.json(data);
}

export async function PATCH() {
  const data = "PATCH";

  return Response.json(data);
}

export async function DELETE() {
  const data = "DELETE";

  return Response.json(data);
}
