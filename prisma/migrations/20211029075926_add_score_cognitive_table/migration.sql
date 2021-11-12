-- CreateTable
CREATE TABLE "CognitiveScore" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "minimumScore" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CognitiveScore_id_key" ON "CognitiveScore"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CognitiveScore_uuid_key" ON "CognitiveScore"("uuid");

-- AddForeignKey
ALTER TABLE "CognitiveScore" ADD CONSTRAINT "CognitiveScore_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
