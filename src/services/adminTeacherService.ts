import { prisma } from "$utils/prisma.utils";

export async function getAllTeacherBySchoolService(schoolId: number) {
  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: "GURU",
        schoolId,
      },
      include: {
        profile: true,
      },
    });
    return { status: true, teachers };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function deleteTeacherService(teacherUUID: string) {
  try {
    await prisma.user.delete({
      where: {
        uuid: teacherUUID,
      },
    });
    return { status: true };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function teacherSubjectsService(teacherUUID: string) {
  try {
    const teacher = await prisma.user.findUnique({
      where: {
        uuid: teacherUUID,
      },
    });

    const courses = await prisma.course.findMany({
      where: {
        teacherId: teacher?.id,
      },
      include: {
        RootCourse: true,
        Class: true,
      },
    });

    return { status: true, courses };
  } catch (err: any) {
    return {
      status: false,
      error: "Could not fetch teacher's subject",
    };
  }
}
