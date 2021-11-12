/*
  Warnings:

  - A unique constraint covering the columns `[NISN]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_NISN_key" ON "Student"("NISN");
