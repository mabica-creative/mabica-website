import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  const data = await prisma.chapter.findUnique({
    where: {
      slug,
      deleted: false,
    },
    include: {
      detail: true,
    },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "Chapter is not found",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  const data = await prisma.chapter.update({
    where: {
      slug,
    },
    data: { deleted: true },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "chapter is not found",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params: { slug: chapterSlug } }: { params: { slug: string } },
) {
  try {
    const body = await request.json();

    // Validasi: cek jika ID tidak tersedia
    if (!body.chapterId && !body.audiobookId) {
      return NextResponse.json(
        { error: "Chapter ID and Audiobook ID are required" },
        { status: 400 },
      );
    }

    try {
      const upChapter = await prisma.chapter.update({
        where: { slug: chapterSlug, deleted: false },
        data: {
          ...(body.chapterNumber && { chapterNumber: body.chapterNumber }),
          ...(body.slug && { slug: body.slug }),
          ...(body.audiobookId && { audiobookId: +body.audiobookId }),
        },
      });

      const upDetailChapter = await prisma.detailChapter.upsert({
        where: { chapterId: +body.chapterId },
        update: {
          ...(body.content && { content: body.content }),
          ...(body.audioUrl && { audioUrl: body.audioUrl }),
        },
        create: {
          content: body.content || null,
          audioUrl: body.audioUrl || null,
          chapterId: +body.chapterId,
        },
      });

      const data = { ...upChapter, detail: upDetailChapter };
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        {
          error: "Update failed or Chapter not found or already eleted.",
          details: error,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return NextResponse.json(
      { error: "Invalid JSON format or Absulutly error" },
      { status: 400 },
    );
  }
}
