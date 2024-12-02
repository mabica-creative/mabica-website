import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DataOverview } from "@prisma/client";

/**
 * Fungsi untuk memperbarui isi file dataOverview.json
 * @param newData - Data baru yang akan ditambahkan atau diperbarui
 */
const updateDataOverviewFile = (newData: Partial<DataOverview>): void => {
  const filePath = path.join(process.cwd(), "src/lib/data/dataOverview.json");

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File dataOverview.json tidak ditemukan di ${filePath}`);
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData: DataOverview = JSON.parse(fileData);

    const updatedData = { ...jsonData, ...newData };

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
    console.log("File dataOverview.json berhasil diperbarui!");
  } catch (error) {
    console.error("Gagal memperbarui file dataOverview.json:", error);
  }
};

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

    // Setelah berhasil, sinkronkan ke file JSON lokal
    updateDataOverviewFile(body);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error upserting DataOverview:", error);
    return NextResponse.json(
      { error: "Failed to upsert DataOverview." },
      { status: 500 },
    );
  }
}
