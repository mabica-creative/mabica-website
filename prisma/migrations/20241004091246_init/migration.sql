/*
  Warnings:

  - You are about to drop the column `audiobookId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `audiobookId` on the `DetailAudiobook` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `DetailChapter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[audiobookSlug]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[audiobookSlug]` on the table `DetailAudiobook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterSlug]` on the table `DetailChapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `audiobookSlug` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audiobookSlug` to the `DetailAudiobook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterSlug` to the `DetailChapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_audiobookId_fkey";

-- DropForeignKey
ALTER TABLE "DetailAudiobook" DROP CONSTRAINT "DetailAudiobook_audiobookId_fkey";

-- DropForeignKey
ALTER TABLE "DetailChapter" DROP CONSTRAINT "DetailChapter_chapterId_fkey";

-- DropIndex
DROP INDEX "Chapter_audiobookId_key";

-- DropIndex
DROP INDEX "DetailAudiobook_audiobookId_key";

-- DropIndex
DROP INDEX "DetailChapter_chapterId_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "audiobookId",
ADD COLUMN     "audiobookSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetailAudiobook" DROP COLUMN "audiobookId",
ADD COLUMN     "audiobookSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetailChapter" DROP COLUMN "chapterId",
ADD COLUMN     "chapterSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_audiobookSlug_key" ON "Chapter"("audiobookSlug");

-- CreateIndex
CREATE UNIQUE INDEX "DetailAudiobook_audiobookSlug_key" ON "DetailAudiobook"("audiobookSlug");

-- CreateIndex
CREATE UNIQUE INDEX "DetailChapter_chapterSlug_key" ON "DetailChapter"("chapterSlug");

-- AddForeignKey
ALTER TABLE "DetailAudiobook" ADD CONSTRAINT "DetailAudiobook_audiobookSlug_fkey" FOREIGN KEY ("audiobookSlug") REFERENCES "Audiobook"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_audiobookSlug_fkey" FOREIGN KEY ("audiobookSlug") REFERENCES "Audiobook"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailChapter" ADD CONSTRAINT "DetailChapter_chapterSlug_fkey" FOREIGN KEY ("chapterSlug") REFERENCES "Chapter"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
