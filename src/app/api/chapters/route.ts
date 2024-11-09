import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi: cek jika body kosong atau ada field yang tidak terisi
    const requiredFields = ["chapterNumber", "slug"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    // Cek ketersediaan slug
    const existingChapter = await prisma.chapter.findUnique({
      where: { slug: body.slug },
    });

    if (existingChapter) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose another slug." },
        { status: 400 },
      );
    }

    // Buat chapter baru dan detail chapter
    const upChapter = await prisma.chapter.create({
      data: {
        chapterNumber: +body.chapterNumber,
        slug: body.slug,
        audiobookId: +body.audiobookId,
      },
    });

    // Keluarkan hasil
    return NextResponse.json(upChapter);
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return NextResponse.json(
      { error: "Invalid JSON format or Absulutly error" },
      { status: 400 },
    );
  }
}
