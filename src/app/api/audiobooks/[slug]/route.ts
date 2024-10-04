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
      chapters: true,
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

export async function PUT(
  request: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  let data, body;
  try {
    body = await request.json();
  } catch (err) {
    // Cek apakah body kosong
    return NextResponse.json(
      { error: "Request body is empty." },
      { status: 400 },
    );
  }
  // Cek apakah salah satu field wajib kosong
  if (!body.imageUrl && !body.title && !body.slug && !body.synopsis) {
    return NextResponse.json(
      {
        error:
          "Data incomplete. At least one field (imageUrl, title, slug, synopsis) must be present.",
      },
      { status: 400 },
    );
  }

  try {
    data = await prisma.audiobook.update({
      where: {
        slug,
        deleted: false,
      },
      include: {
        detail: true,
      },
      data: {
        imageUrl: body.imageUrl || undefined, // Update jika ada
        title: body.title || undefined,
        slug: body.slug || undefined,
        synopsis: body.synopsis || undefined,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Audiobook is not found",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ data, slug, body });
}
