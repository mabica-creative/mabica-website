import { prisma } from "@/lib/utils/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/utils/auth"; // Import fungsi autentikasi

export async function GET(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.audiobook.findMany({
      where: { deleted: false },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    if (!body.imageUrl || !body.title || !body.slug || !body.synopsis) {
      return NextResponse.json(
        {
          error:
            "Data incomplete. All fields (imageUrl, title, slug, synopsis) are required.",
        },
        { status: 400 },
      );
    }

    const existingAudiobook = await prisma.audiobook.findUnique({
      where: { slug: body.slug },
    });

    if (existingAudiobook) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose another slug." },
        { status: 400 },
      );
    }

    const data = await prisma.audiobook.create({
      data: {
        imageUrl: body.imageUrl,
        title: body.title,
        slug: body.slug,
        synopsis: body.synopsis,
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON format." },
      { status: 400 },
    );
  }
}
