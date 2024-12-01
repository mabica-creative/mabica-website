import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Filter untuk menampilkan data yang `deleted` bernilai `false`
  const data = await prisma.audiobook.findMany({
    where: {
      deleted: false,
    },
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
