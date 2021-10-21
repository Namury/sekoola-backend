/*
  Warnings:

  - You are about to drop the column `jenis` on the `Sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi` on the `Sekolah` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Sekolah` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sekolah` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Sekolah` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_sekolahId_fkey";

-- AlterTable
ALTER TABLE "Sekolah" DROP COLUMN "jenis",
DROP COLUMN "lokasi",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "Tingkatan" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "sekolahId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tingkatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tingkatanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "NISN" TEXT NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataPelajaran" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tingkatanId" INTEGER NOT NULL,
    "guruId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MataPelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "NIP" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sekolah_email_key" ON "Sekolah"("email");

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_tingkatanId_fkey" FOREIGN KEY ("tingkatanId") REFERENCES "Tingkatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataPelajaran" ADD CONSTRAINT "MataPelajaran_tingkatanId_fkey" FOREIGN KEY ("tingkatanId") REFERENCES "Tingkatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataPelajaran" ADD CONSTRAINT "MataPelajaran_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
