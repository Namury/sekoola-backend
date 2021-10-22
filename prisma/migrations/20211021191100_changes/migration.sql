/*
  Warnings:

  - Added the required column `urutan` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urutan` to the `Tingkatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kelas" ADD COLUMN     "urutan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tingkatan" ADD COLUMN     "urutan" INTEGER NOT NULL;
