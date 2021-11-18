import { prisma } from "$utils/prisma.utils";

export async function getGradesByTeacherService(teacherId: number) {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        Class: {
          some: {
            Course: {
              some: {
                teacherId: {
                  equals: teacherId,
                },
              },
            },
          },
        },
      },
      include: {
        Class: {
          where: {
            Course: {
              some: {
                teacherId: {
                  equals: teacherId,
                },
              },
            },
          },
        },
      },
    });

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
    const classes = await prisma.class.findMany({
      where: {
        Course: {
          some: {
            teacherId: {
              equals: teacherId,
            },
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

    // const courses = await prisma.course.findMany({
    //   where: {
    //     teacherId,
    //   },
    // });

    // const classes = await Promise.all(
    //   courses.map(async (course) => {
    //     const clas = await prisma.class.findMany({
    //       where: {
    //         Course: {
    //           every: {
    //             id: course.id,
    //           },
    //         },
    //         Grade: {
    //           uuid: gradeId,
    //         },
    //       },
    //       include: {
    //         Student: true,
    //       },
    //     });

    //     return clas;
    //   })
    // );

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
