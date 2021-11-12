import { prisma } from "$utils/prisma.utils";
import { v4 as uuidv4 } from "uuid";
// import { createReadStream } from "fs";
import csv from "csvtojson";

export async function createGradeService(
  name: string,
  schoolId: number
): Promise<any> {
  try {
    const countGrades = await prisma.grade.count();
    let orderCount = 1;
    if (countGrades != 0) {
      orderCount = countGrades + 1;
    }

    const createdGrade = await prisma.grade.create({
      data: {
        name,
        schoolId,
        uuid: uuidv4(),
        orderCount,
      },
    });

    return { status: true, grade: createdGrade };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to create Grade" };
  }
}

export async function getAllGradesService(schoolId: number) {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        schoolId,
      },
    });
    return { status: true, grades };
  } catch (err: any) {
    return { status: false, error: "Unable to get grades data" };
  }
}

export async function editGradeService(gradeId: number, name: string) {
  try {
    const updatedGrade = await prisma.grade.update({
      where: {
        id: gradeId,
      },
      data: {
        name,
      },
    });
    return { status: true, grade: updatedGrade };
  } catch (err: any) {
    return { status: false, error: "Unable to update grade data" };
  }
}

export async function deleteGradeService(gradeId: number) {
  try {
    await prisma.grade.delete({
      where: { id: gradeId },
    });
    return { status: true };
  } catch (err: any) {
    return { status: false, error: "Unable to delete grade" };
  }
}

export async function getAllCourseService() {
  try {
    const courses = await prisma.rootCourse.findMany();
    return { status: true, courses };
  } catch (err: any) {
    return { status: false, error: "Unable to get courses data" };
  }
}

export async function getCourseByIdService(courseId: number) {
  try {
    const course = await prisma.rootCourse.findUnique({
      where: { id: courseId },
    });
    return { status: true, course };
  } catch (err: any) {
    return { status: false, error: "Unable to get course data" };
  }
}

export async function createCourseService(
  name: string,
  gradeId: number
): Promise<any> {
  try {
    const createdCourse = await prisma.rootCourse.create({
      data: {
        name,
        gradeId,
        uuid: uuidv4(),
      },
    });
    return { status: true, course: createdCourse };
  } catch (err: any) {
    return { status: false, error: "Unable to get create Course" };
  }
}

export async function editCourseService(
  courseId: number,
  name: string,
  gradeId: number
): Promise<any> {
  try {
    const editedCourse = await prisma.rootCourse.update({
      where: { id: courseId },
      data: {
        name,
        gradeId,
      },
    });
    return { status: true, course: editedCourse };
  } catch (err: any) {
    return { status: false, error: "Unable to update Course" };
  }
}

export async function deleteCourseService(courseId: number): Promise<any> {
  try {
    await prisma.course.delete({
      where: { id: courseId },
    });
    return { status: true, message: "course deleted successfuly" };
  } catch (err: any) {
    return { status: false, error: "Unable to delete Course" };
  }
}

export async function addTeacherToCourseService(
  courseId: number,
  teacherId: number,
  classId: number,
  day: string,
  timeStart: string,
  timeEnd: string
): Promise<any> {
  try {
    const course = await prisma.course.create({
      data: {
        rootCourseId: courseId,
        classId: classId,
        teacherId: teacherId,
        day: day,
        timeStart: timeStart,
        timeEnd: timeEnd,
      },
    });
    return { status: true, course: course };
  } catch (err: any) {
    return { status: false, error: "Unable to add Teacher to Course" };
  }
}

export async function getAllClassesService(gradeId: number) {
  try {
    const classes = await prisma.class.findMany({
      where: {
        gradeId,
      },
    });
    return { status: true, classes };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch class data" };
  }
}

export async function createClassService(name: string, gradeId: number) {
  try {
    const countClasses = await prisma.class.count();
    let orderCount = 1;
    if (countClasses != 0) {
      orderCount = countClasses + 1;
    }
    const createdClass = await prisma.class.create({
      data: {
        name,
        orderCount,
        uuid: uuidv4(),
        gradeId,
      },
    });
    return { status: true, createdClass };
  } catch (err: any) {
    return { status: false, error: "Unable to create class" };
  }
}

export async function editClassService(
  classId: number,
  name: string,
  gradeId: number
) {
  try {
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        name,
        gradeId,
      },
    });
    return { status: true, updatedClass };
  } catch (err: any) {
    return { status: false, error: "Unable to update class data" };
  }
}

export async function deleteClassService(classId: number) {
  try {
    await prisma.class.delete({
      where: {
        id: classId,
      },
    });
    return { status: true };
  } catch (err: any) {
    return { status: false, error: "Unable to delete class" };
  }
}

interface StudentData {
  NISN: string;
  name: string;
  uuid: string;
  id: number;
  classId: number;
}

export async function createMassStudentService(
  classId: number,
  studentCsv: any
) {
  try {
    const csvParsed = await csv().fromString(studentCsv.buffer.toString());
    const createdStudent: StudentData[] = [];
    if (csvParsed.length > 0) {
      csvParsed.forEach(async (student) => {
        const usedNISN = await prisma.student.count({
          where: {
            NISN: student.nisn,
          },
        });
        if (usedNISN == 0) {
          const singleCreated: StudentData = await prisma.student.create({
            data: {
              classId: classId,
              name: student.name,
              NISN: student.nisn,
            },
          });
          createdStudent.push(singleCreated);
        }
      });
      return { status: true, createdStudent };
    } else {
      throw new Error("Student data is empty");
    }
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to upload student data" };
  }
}

export async function getStudentsByClassService(classId: number) {
  try {
    const students = await prisma.student.findMany({
      where: {
        classId,
      },
    });
    return { status: true, students };
  } catch (err: any) {
    return { status: false, error: "Unable to fetch student data" };
  }
}
