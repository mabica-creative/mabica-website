import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  const data = await prisma.audiobook.findUnique({
    where: {
      slug,
      deleted: false,
    },
    include: {
      detail: true,
      chapters: {
        where: { deleted: false },
        orderBy: {
          chapterNumber: "asc", // urutkan berdasarkan chapterNumber dari yang terkecil
        },
      },
    },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "Audiobook is not found",
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
  const data = await prisma.audiobook.update({
    where: {
      slug,
    },
    data: { deleted: true },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "Audiobook is not found",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params: { slug: audiobookSlug } }: { params: { slug: string } },
) {
  try {
    const body = await request.json();

    // Validasi: cek jika ID tidak tersedia
    if (!body.id) {
      return NextResponse.json(
        { error: "Audiobook ID is required" },
        { status: 400 },
      );
    }

    try {
      const upAudiobook = await prisma.audiobook.update({
        where: { slug: audiobookSlug, deleted: false },
        data: {
          ...(body.title && { title: body.title }),
          ...(body.slug && { slug: body.slug }),
          ...(body.imageUrl && { imageUrl: body.imageUrl }),
          ...(body.synopsis && { synopsis: body.synopsis }),
        },
      });

      const upDetailAudiobook = await prisma.detailAudiobook.upsert({
        where: { audiobookId: +body.id },
        update: {
          ...(body.author && { author: body.author }),
          ...(body.editor && { editor: body.editor }),
          ...(body.genre && { genre: body.genre }),
          ...(body.status && { status: body.status }),
          ...(body.voiceActor && { voiceActor: body.voiceActor }),
        },
        create: {
          author: body.author || null,
          editor: body.editor || null,
          genre: body.genre || null,
          status: body.status || null,
          voiceActor: body.voiceActor || null,
          audiobookId: +body.id,
        },
      });
      const data = { ...upAudiobook, detail: upDetailAudiobook };
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        {
          error: "Update failed or Audiobook not found or already deleted.",
          details: error,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
