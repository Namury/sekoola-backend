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

    return { status: true, classes };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch class data" };
  }
}

export async function getCoursesByTeacherService(teacherId: number) {
  try {
    const courses = await prisma.class.findMany({
      where: {
        Course: {
          some: {
            teacherId,
          },
        },
      },
      include: {
        Course: {
          include: {
            RootCourse: true,
          },
        },
        Grade: true,
      },
    });

    const formattedCourses = courses.map((classes) => {
      const course = classes.Course.map((course) => {
        return {
          courseId: course.id,
          courseUuid: course.uuid,
          nama: course.RootCourse.name,
        };
      });
      return {
        classId: classes.id,
        classUuid: classes.uuid,
        gradeId: classes.Grade.id,
        gradeUuid: classes.Grade.uuid,
        course: course,
      };
    });
    return { status: true, courses: formattedCourses };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch course data" };
  }
}
