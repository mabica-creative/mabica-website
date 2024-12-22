import { prisma } from "@/lib/utils/prisma";
import { NextResponse } from "next/server";

function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const values = crypto.getRandomValues(new Uint8Array(length)); // Menggunakan Node.js crypto
  for (let i = 0; i < values.length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

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
    data: { deleted: true, slug: generateRandomString(32) },
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
    if (!body.chapterId || !body.audiobookId) {
      return NextResponse.json(
        { error: "Chapter ID and Audiobook ID are required" },
        { status: 400 },
      );
    }

    // Validasi nilai lainnya
    if (body.chapterNumber && typeof body.chapterNumber !== "number") {
      return NextResponse.json(
        { error: "Chapter number must be a number" },
        { status: 400 },
      );
    }
    if (body.slug && typeof body.slug !== "string") {
      return NextResponse.json(
        { error: "Slug must be a string" },
        { status: 400 },
      );
    }
    if (body.audiobookId && typeof body.audiobookId !== "number") {
      return NextResponse.json(
        { error: "Audiobook ID must be a number" },
        { status: 400 },
      );
    }

    try {
      let updatedChapter, updatedDetailChapter;

      // Update chapter jika terdapat data yang relevan
      if (body.chapterNumber || body.slug || body.audiobookId) {
        updatedChapter = await prisma.chapter.update({
          where: { slug: chapterSlug, deleted: false },
          data: {
            ...(body.chapterNumber && { chapterNumber: body.chapterNumber }),
            ...(body.slug && { slug: body.slug }),
            ...(body.audiobookId && { audiobookId: +body.audiobookId }),
          },
        });
      }

      // Upsert detailChapter jika terdapat data yang relevan
      if (body.content || body.audioUrl) {
        updatedDetailChapter = await prisma.detailChapter.upsert({
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
      }

      // Menggabungkan data hasil update untuk dikembalikan sebagai respons
      const data = {
        ...(updatedChapter && { chapter: updatedChapter }),
        ...(updatedDetailChapter && { detail: updatedDetailChapter }),
      };

      return NextResponse.json(data || { message: "No data updated" });
    } catch (error) {
      console.error("Database operation failed:", error);
      return NextResponse.json(
        {
          error: "Update failed or Chapter not found or already deleted.",
          details: error,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return NextResponse.json(
      { error: "Invalid JSON format or other error occurred" },
      { status: 400 },
    );
  }
}
