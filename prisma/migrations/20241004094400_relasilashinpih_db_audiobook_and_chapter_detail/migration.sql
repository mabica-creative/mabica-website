/*
  Warnings:

  - You are about to drop the column `audiobookSlug` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `audiobookSlug` on the `DetailAudiobook` table. All the data in the column will be lost.
  - You are about to drop the column `chapterSlug` on the `DetailChapter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[audiobookId]` on the table `DetailAudiobook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId]` on the table `DetailChapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `audiobookId` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audiobookId` to the `DetailAudiobook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterId` to the `DetailChapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_audiobookSlug_fkey";

-- DropForeignKey
ALTER TABLE "DetailAudiobook" DROP CONSTRAINT "DetailAudiobook_audiobookSlug_fkey";

-- DropForeignKey
ALTER TABLE "DetailChapter" DROP CONSTRAINT "DetailChapter_chapterSlug_fkey";

-- DropIndex
DROP INDEX "Chapter_audiobookSlug_key";

-- DropIndex
DROP INDEX "DetailAudiobook_audiobookSlug_key";

-- DropIndex
DROP INDEX "DetailChapter_chapterSlug_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "audiobookSlug",
ADD COLUMN     "audiobookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DetailAudiobook" DROP COLUMN "audiobookSlug",
ADD COLUMN     "audiobookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DetailChapter" DROP COLUMN "chapterSlug",
ADD COLUMN     "chapterId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DetailAudiobook_audiobookId_key" ON "DetailAudiobook"("audiobookId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailChapter_chapterId_key" ON "DetailChapter"("chapterId");

-- AddForeignKey
ALTER TABLE "DetailAudiobook" ADD CONSTRAINT "DetailAudiobook_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailChapter" ADD CONSTRAINT "DetailChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
