-- CreateTable
CREATE TABLE "Audiobook" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audiobook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailAudiobook" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "editor" TEXT,
    "genre" TEXT,
    "voiceActor" TEXT,
    "status" TEXT,
    "audiobookId" INTEGER NOT NULL,

    CONSTRAINT "DetailAudiobook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "audiobookId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailChapter" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "DetailChapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_slug_key" ON "Audiobook"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DetailAudiobook_audiobookId_key" ON "DetailAudiobook"("audiobookId");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_audiobookId_key" ON "Chapter"("audiobookId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailChapter_chapterId_key" ON "DetailChapter"("chapterId");

-- AddForeignKey
ALTER TABLE "DetailAudiobook" ADD CONSTRAINT "DetailAudiobook_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailChapter" ADD CONSTRAINT "DetailChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
