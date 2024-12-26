import { prisma } from "@/lib/utils/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/utils/auth"; // Import fungsi autentikasi

export async function POST(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { chapterNumber, slug, audiobookId } = body;

    if (!chapterNumber || !slug || !audiobookId) {
      return NextResponse.json(
        { error: "chapterNumber, slug, and audiobookId are required." },
        { status: 400 },
      );
    }

    const existingChapter = await prisma.chapter.findUnique({
      where: { slug },
    });
    if (existingChapter) {
      return NextResponse.json(
        { error: "Slug already exists." },
        { status: 400 },
      );
    }

    const upChapter = await prisma.chapter.create({
      data: {
        chapterNumber: +chapterNumber,
        slug,
        audiobookId: +audiobookId,
      },
    });

    return NextResponse.json(upChapter);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
