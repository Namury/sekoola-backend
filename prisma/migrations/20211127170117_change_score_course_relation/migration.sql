-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
