import { prisma } from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/utils/auth"; // Import fungsi autentikasi

// Fungsi untuk menghasilkan string acak
function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const values = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < values.length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.chapter.findUnique({
      where: { slug, deleted: false },
      include: { detail: true },
    });

    return data
      ? NextResponse.json(data)
      : NextResponse.json({ error: "Chapter not found." }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.chapter.update({
      where: { slug },
      data: { deleted: true, slug: `${slug}-${generateRandomString(32)}` },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Chapter not found or already deleted." },
      { status: 404 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { slug: chapterSlug } }: { params: { slug: string } },
) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { chapterId, audiobookId, chapterNumber, slug, content, audioUrl } =
      body;

    if (!chapterId || !audiobookId) {
      return NextResponse.json(
        { error: "Chapter ID and Audiobook ID are required." },
        { status: 400 },
      );
    }

    const updatedChapter =
      chapterNumber || slug || audiobookId
        ? await prisma.chapter.update({
            where: { slug: chapterSlug, deleted: false },
            data: {
              ...(chapterNumber && { chapterNumber }),
              ...(slug && { slug }),
              ...(audiobookId && { audiobookId: +audiobookId }),
            },
          })
        : null;

    const updatedDetailChapter =
      content || audioUrl
        ? await prisma.detailChapter.upsert({
            where: { chapterId: +chapterId },
            update: {
              ...(content && { content }),
              ...(audioUrl && { audioUrl }),
            },
            create: {
              content: content || null,
              audioUrl: audioUrl || null,
              chapterId: +chapterId,
            },
          })
        : null;

    const data = {
      ...(updatedChapter && { chapter: updatedChapter }),
      ...(updatedDetailChapter && { detail: updatedDetailChapter }),
    };

    return NextResponse.json(data || { message: "No data updated." });
  } catch {
    return NextResponse.json(
      { error: "Update failed or Chapter not found or already deleted." },
      { status: 400 },
    );
  }
}
