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

    const returnTeachers = teachers.map((teacher) => {
      return {
        id: teacher.id,
        uuid: teacher.uuid,
        name: teacher.name,
        email: teacher.email,
        schoolId: teacher.schoolId,
        NIP: teacher.profile?.NIP,
        role: teacher.role,
      };
    });

    return { status: true, teachers: returnTeachers };
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
        Class: { include: { Grade: true } },
      },
    });

    const formattedCourses = courses.map((course) => {
      return {
        id: course.id,
        matpel: course.RootCourse.name,
        tingkatan: course.Class.Grade.name,
        kelas: course.Class.name,
        day: course.day,
        time: String(course.timeStart) + " - " + String(course.timeEnd)
      };
    });

    return { status: true, courses: formattedCourses };
  } catch (err: any) {
    return {
      status: false,
      error: "Could not fetch teacher's subject",
    };
  }
}

interface CourseData {
  rootCourseId: number;
  classId: number;
  day: string;
  timeStart: string;
  timeEnd: string;
  teacherId: number;
}

export async function addTeacherCourseService(
  course: CourseData,
  teacherUUID: string
) {
  try {
    const teacher = await prisma.user.findUnique({
      where: {
        uuid: teacherUUID,
      },
    });
    course.teacherId = teacher?.id || 0;
    const createdCourse = await prisma.course.create({ data: course });
    return { status: true, course: createdCourse };
  } catch (err: any) {
    return { status: false, error: "Could not add subject to teacher" };
  }
}

export async function getTeacherProfileService(teacherUUID: string) {
  try {
    const teacher = await prisma.user.findUnique({
      where: { uuid: teacherUUID },
    });
    return { status: true, teacher };
  } catch (err: any) {
    return { status: false, error: "Could not fetch teacher profile data" };
  }
}
