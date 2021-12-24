/*
  Warnings:

  - A unique constraint covering the columns `[NIP]` on the table `ProfileTeacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfileTeacher_NIP_key" ON "ProfileTeacher"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");
