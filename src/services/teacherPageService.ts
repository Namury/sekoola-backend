import { prisma } from "$utils/prisma.utils";

export async function getGradesByTeacherService(teacherId: number) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        teacherId,
      },
    });

    const grades = await Promise.all(
      courses.map(async (course) => {
        const grade = await prisma.grade.findMany({
          where: {
            Class: {
              every: {
                id: course.classId,
              },
            },
          },
          include: {
            Class: true,
          },
        });
        return grade;
      })
    );

    return { status: true, grades };
  } catch (err: any) {
    return { status: false, error: "Unable to get grades data" };
  }
}

export async function getClassesByTeacherService(
  teacherId: number,
  gradeId: string
) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        teacherId,
      },
    });

    const classes = await Promise.all(
      courses.map(async (course) => {
        const clas = await prisma.class.findMany({
          where: {
            Course: {
              every: {
                id: course.id,
              },
            },
            Grade: {
              uuid: gradeId,
            },
          },
          include: {
            Student: true,
          },
        });

        return clas;
      })
    );

    return { status: true, classes };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch class data" };
  }
}

export async function getCoursesByTeacherService(teacherId: number) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        teacherId,
      },
      include: {
        RootCourse: true,
        Class: true,
      },
    });
    return { status: true, courses };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch course data" };
  }
}
