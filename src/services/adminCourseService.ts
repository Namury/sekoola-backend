import { prisma } from "$utils/prisma.utils";

export async function getAllRootCourseByGradeService(gradeId: number) {
  try {
    const courses = await prisma.rootCourse.findMany({
      where: {
        gradeId,
      },
    });
    return { status: true, courses };
  } catch (err: any) {
    return { status: false, error: err };
  }
}
