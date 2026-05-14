-- CreateTable
CREATE TABLE "public"."ReviewCard" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "nextReview" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ReviewCard" ADD CONSTRAINT "ReviewCard_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
