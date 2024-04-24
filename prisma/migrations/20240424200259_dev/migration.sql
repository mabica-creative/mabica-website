/*
  Warnings:

  - You are about to drop the `metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "metadata";

-- CreateTable
CREATE TABLE "overview" (
    "id" SERIAL NOT NULL,
    "title" TEXT DEFAULT 'Mabica',
    "description" TEXT DEFAULT 'Mabica (Mari Bikin Cerita) adalah perkumpulan orang gabut yang mungkin membuat cerita supaya tidak ''rin udah makan'' atau ''sehat?'' saat bermain discord.',
    "icon" TEXT DEFAULT '/favicon.ico',
    "color" TEXT DEFAULT '#6AD4DD',
    "image" TEXT DEFAULT '/image.jpg',

    CONSTRAINT "overview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "color" TEXT DEFAULT '#6AD4DD',

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);
