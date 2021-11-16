/*
  Warnings:

  - You are about to drop the column `scoreConfigId` on the `ScoreRange` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `ScoreRange` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScoreRange" DROP CONSTRAINT "ScoreRange_scoreConfigId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_fkey";

-- AlterTable
ALTER TABLE "ScoreRange" DROP COLUMN "scoreConfigId",
ADD COLUMN     "schoolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProfileTeacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreRange" ADD CONSTRAINT "ScoreRange_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
