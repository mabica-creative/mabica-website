import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Ambil DataOverview dengan id=1
export async function GET() {
  try {
    const data = await prisma.dataOverview.findUnique({
      where: { id: 1 },
    });

    if (!data) {
      return NextResponse.json(
        { error: "DataOverview with id=1 not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching DataOverview:", error);
    return NextResponse.json(
      { error: "Failed to fetch DataOverview." },
      { status: 500 },
    );
  }
}

// PUT: Upsert DataOverview dengan id=1
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    // Lakukan upsert pada database Prisma
    const data = await prisma.dataOverview.upsert({
      where: { id: 1 },
      update: {
        ...body,
        updatedAt: new Date(), // Perbarui waktu
      },
      create: {
        ...body,
        createdAt: new Date(),
      },
    });

    console.log(data)
    return NextResponse.json({ ...data });
  } catch (error) {
    console.error("Error upserting DataOverview:", error);
    return NextResponse.json(
      { error: "Failed to upsert DataOverview." },
      { status: 500 },
    );
  }
}
