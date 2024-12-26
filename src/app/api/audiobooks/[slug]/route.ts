import { prisma } from "@/lib/utils/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/utils/auth"; // Import fungsi autentikasi

export async function GET(
  request,
  { params: { slug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

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
        { error: "Audiobook is not found" },
        { status: 400 },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(
  request,
  { params: { slug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.audiobook.update({
      where: { slug },
      data: { deleted: true },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Audiobook is not found" },
        { status: 400 },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function PATCH(
  request,
  { params: { slug: audiobookSlug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Audiobook ID is required" },
        { status: 400 },
      );
    }

    let updatedAudiobook = null;
    let updatedDetailAudiobook = null;

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
  } catch {
    return NextResponse.json(
      { error: "Update failed or invalid request." },
      { status: 400 },
    );
  }
}
