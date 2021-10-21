/*
  Warnings:

  - Added the required column `sekolahId` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sekolahId` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Tingkatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guru" ADD COLUMN     "sekolahId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "sekolahId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tingkatan" ADD COLUMN     "nama" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tingkatan" ADD CONSTRAINT "Tingkatan_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "Sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "Sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "Sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
