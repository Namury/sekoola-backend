import { prisma } from "$utils/prisma.utils";

export async function getAllStudentsByClassService(classId: number) {
  try {
    const students = await prisma.student.findMany({
      where: {
        classId,
      },
    });

    return { status: true, students };
  } catch (err: any) {
    return { status: false, error: err };
  }
}

export async function getStudentByUuidService(studentUUID: string) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        uuid: studentUUID,
      },
    });
    return { status: true, student };
  } catch (err: any) {
    return { status: false, error: "Could not fetch student data" };
  }
}

export async function updateStudentByUuidService(
  studentUUID: string,
  name: string,
  NISN: string
) {
  try {
    const student = await prisma.student.update({
      where: {
        uuid: studentUUID,
      },
      data: {
        name,
        NISN,
      },
    });
    return { status: true, student };
  } catch (err) {
    return { status: false, error: "Could not fetch data" };
  }
}
