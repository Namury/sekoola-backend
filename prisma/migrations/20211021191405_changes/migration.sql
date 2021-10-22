/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Guru` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Kelas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `MataPelajaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Sekolah` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Tingkatan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guru_uuid_key" ON "Guru"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_uuid_key" ON "Kelas"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "MataPelajaran_uuid_key" ON "MataPelajaran"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Sekolah_uuid_key" ON "Sekolah"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_uuid_key" ON "Siswa"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tingkatan_uuid_key" ON "Tingkatan"("uuid");
