-- CreateTable
CREATE TABLE "metadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT 'Mabica',
    "description" TEXT DEFAULT 'Mabica (Mari Bikin Cerita) adalah perkumpulan orang gabut yang mungkin membuat cerita supaya tidak ''rin udah makan'' atau ''sehat?'' saat bermain discord.',
    "icon" TEXT DEFAULT '/favicon.ico',
    "color" TEXT DEFAULT '#6AD4DD',

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);
