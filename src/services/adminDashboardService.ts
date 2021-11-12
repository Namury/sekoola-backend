import { prisma } from "$utils/prisma.utils";

export async function adminDashboardCountDataServices(schoolId: number) {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        schoolId: schoolId,
      },
      include: {
        Class: {
          include: {
            Student: true,
          },
        },
        RootCourse: true,
      },
    });

    let countClass = 0;
    let countStudent = 0;
    let countCourse = 0;
    for (let i = 0; i < grades.length; i++) {
      countClass += grades[i].Class.length;
      const classes = grades[i].Class;
      for (let j = 0; j < classes.length; j++) {
        countStudent += classes[j].Student.length;
      }
      countCourse += grades[i].RootCourse.length;
    }

    const countTeacher = await prisma.user.count({
      where: {
        role: "GURU",
      },
    });

    return {
      status: true,
      countStudent,
      countTeacher,
      countClass,
      countCourse,
    };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch data" };
  }
}
