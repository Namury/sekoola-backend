/*
  Warnings:

  - Added the required column `classId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentScore" DROP CONSTRAINT "StudentScore_scoreId_fkey";

-- DropForeignKey
ALTER TABLE "StudentScore" DROP CONSTRAINT "StudentScore_studentId_fkey";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StudentScore" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ScoreRange" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "letter" CHAR(1) NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "scoreConfigId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ScoreRange_id_key" ON "ScoreRange"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreRange_uuid_key" ON "ScoreRange"("uuid");

-- AddForeignKey
ALTER TABLE "ScoreRange" ADD CONSTRAINT "ScoreRange_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentScore" ADD CONSTRAINT "StudentScore_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentScore" ADD CONSTRAINT "StudentScore_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;
