import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.audiobook.findMany({});
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  // cek body
  if (!body.imageUrl || !body.title || !body.slug || !body.synopsis) {
    return NextResponse.json(
      {
        error:
          "Data incomplete. All fields (imageUrl, title, slug, synopsis) are required.",
      },
      { status: 400 },
    );
  }

  // cek ketersiaan audiobook/slug
  const existingAudiobook = await prisma.audiobook.findUnique({
    where: { slug: body.slug },
  });

  if (existingAudiobook) {
    return NextResponse.json(
      {
        error: "Slug already exists. Please choose another slug.",
      },
      { status: 400 },
    );
  }

  // buat audiobook
  const data = await prisma.audiobook.create({
    data: {
      imageUrl: body.imageUrl,
      title: body.title,
      slug: body.slug,
      synopsis: body.synopsis,
    },
  });

  // keluarkan hasil
  return NextResponse.json({ data });
}
