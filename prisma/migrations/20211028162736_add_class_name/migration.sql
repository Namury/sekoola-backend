/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_id_key" ON "Class"("id");
