/*
  Warnings:

  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileId" INTEGER;

-- DropTable
DROP TABLE "Teacher";

-- CreateTable
CREATE TABLE "ProfileTeacher" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "NIP" TEXT NOT NULL,

    CONSTRAINT "ProfileTeacher_pkey" PRIMARY KEY ("id","uuid")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "teacherId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTeacher_id_key" ON "ProfileTeacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTeacher_uuid_key" ON "ProfileTeacher"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_uuid_key" ON "Course"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProfileTeacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "ProfileTeacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
