/*
  Warnings:

  - You are about to drop the `CognitiveScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CognitiveScore" DROP CONSTRAINT "CognitiveScore_schoolId_fkey";

-- DropTable
DROP TABLE "CognitiveScore";

-- CreateTable
CREATE TABLE "ScoreConfig" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "orderCount" INTEGER,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "minimumScore" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "scoreConfigId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StudentScore" (
    "studentId" INTEGER NOT NULL,
    "scoreId" INTEGER NOT NULL,

    CONSTRAINT "StudentScore_pkey" PRIMARY KEY ("studentId","scoreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScoreConfig_id_key" ON "ScoreConfig"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreConfig_uuid_key" ON "ScoreConfig"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Score_id_key" ON "Score"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Score_uuid_key" ON "Score"("uuid");

-- AddForeignKey
ALTER TABLE "ScoreConfig" ADD CONSTRAINT "ScoreConfig_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "RootCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_scoreConfigId_fkey" FOREIGN KEY ("scoreConfigId") REFERENCES "ScoreConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentScore" ADD CONSTRAINT "StudentScore_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentScore" ADD CONSTRAINT "StudentScore_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
