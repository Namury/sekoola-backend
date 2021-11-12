-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "NISN" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_uuid_key" ON "Student"("uuid");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
