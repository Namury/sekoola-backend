/*
  Warnings:

  - You are about to drop the column `gradeId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rootCourseId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeEnd` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStart` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `teacherId` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "gradeId",
DROP COLUMN "name",
ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "rootCourseId" INTEGER NOT NULL,
ADD COLUMN     "timeEnd" TEXT NOT NULL,
ADD COLUMN     "timeStart" TEXT NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- CreateTable
CREATE TABLE "RootCourse" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RootCourse_id_key" ON "RootCourse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RootCourse_uuid_key" ON "RootCourse"("uuid");

-- AddForeignKey
ALTER TABLE "RootCourse" ADD CONSTRAINT "RootCourse_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_rootCourseId_fkey" FOREIGN KEY ("rootCourseId") REFERENCES "RootCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
