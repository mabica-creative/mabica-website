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

    // Validasi ID
    if (!body.id) {
      return NextResponse.json(
        { error: "Audiobook ID is required" },
        { status: 400 },
      );
    }

    // Log data yang akan dikirim ke Prisma
    console.log("Updating audiobook with slug:", audiobookSlug);
    console.log("Audiobook data:", body);

    let updatedAudiobook = null;
    let updatedDetailAudiobook = null;

    // Perbarui data di tabel audiobook
    if (body.title || body.slug || body.imageUrl || body.synopsis) {
      updatedAudiobook = await prisma.audiobook.update({
        where: { slug: audiobookSlug, deleted: false },
        data: {
          ...(body.title && { title: body.title }),
          ...(body.slug && { slug: body.slug }),
          ...(body.imageUrl && { imageUrl: body.imageUrl }),
          ...(body.synopsis && { synopsis: body.synopsis }),
        },
      });
    }

    // Perbarui atau buat data di tabel detailAudiobook
    if (
      body.author ||
      body.editor ||
      body.genre ||
      body.status ||
      body.voiceActor
    ) {
      updatedDetailAudiobook = await prisma.detailAudiobook.upsert({
        where: { audiobookId: Number(body.id) },
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
    }

    if (!updatedAudiobook && !updatedDetailAudiobook) {
      return NextResponse.json(
        { error: "Update failed or Audiobook not found or already deleted." },
        { status: 400 },
      );
    }

    return NextResponse.json({ updatedAudiobook, updatedDetailAudiobook });
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return NextResponse.json(
      { error: "Update failed or invalid request.", details: error },
      { status: 400 },
    );
  }
}
