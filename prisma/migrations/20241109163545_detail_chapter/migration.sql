/*
  Warnings:

  - Made the column `author` on table `DetailAudiobook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `editor` on table `DetailAudiobook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `DetailAudiobook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `voiceActor` on table `DetailAudiobook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `DetailAudiobook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DetailAudiobook" ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "editor" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "voiceActor" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
