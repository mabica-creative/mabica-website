import { prisma } from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/utils/auth"; // Import fungsi autentikasi

// GET untuk mendapatkan data overview
export async function GET(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.dataOverview.findUnique({ where: { id: 1 } });
    return data
      ? NextResponse.json(data)
      : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// PATCH untuk memperbarui atau membuat data overview
export async function PATCH(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const data = await prisma.dataOverview.upsert({
      where: { id: 1 },
      update: { ...body, updatedAt: new Date() },
      create: { ...body, createdAt: new Date() },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
