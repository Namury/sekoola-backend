import {
  createGradeService,
  getAllGradesService,
  getAllCourseService,
  getCourseByIdService,
  createCourseService,
  editCourseService,
  deleteCourseService,
  addTeacherToCourseService,
  editGradeService,
  deleteGradeService,
  getAllClassesService,
  createClassService,
  editClassService,
  deleteClassService,
  createMassStudentService,
  getStudentsByClassService,
} from "$services/dbManagementService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function createGrade(
  req: Request,
  res: Response
): Promise<Response> {
  const { name } = req.body;
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, grade, error } = await createGradeService(name, schoolId);
  if (status) {
    return response_success(res, grade);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getAllGrades(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, grades, error } = await getAllGradesService(schoolId);
  if (status) {
    return response_success(res, { grades });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editGrade(
  req: Request,
  res: Response
): Promise<Response> {
  const { gradeId } = req.params;
  const { name } = req.body;
  const { status, grade, error } = await editGradeService(
    Number(gradeId),
    name
  );
  if (status) {
    return response_success(res, { grade });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteGrade(
  req: Request,
  res: Response
): Promise<Response> {
  const { gradeId } = req.params;
  const { status, error } = await deleteGradeService(Number(gradeId));
  if (status) {
    return response_success(res, "Success!");
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getAllCourse(
  req: Request,
  res: Response
): Promise<Response> {
  const { status, courses, error } = await getAllCourseService();
  if (status) {
    return response_success(res, { courses });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getCourseById(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = Number(req.params.courseId);
  const { status, course, error } = await getCourseByIdService(courseId);
  if (status) {
    return response_success(res, { course });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createCourse(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, gradeId } = req.body;
  const { status, course, error } = await createCourseService(name, gradeId);
  if (status) {
    return response_success(res, { course });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editCourse(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, gradeId } = req.body;
  const courseId = Number(req.params.courseId);
  const { status, course, error } = await editCourseService(
    courseId,
    name,
    gradeId
  );
  if (status) {
    return response_success(res, { course });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteCourse(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = Number(req.params.courseId);
  const { status, message, error } = await deleteCourseService(courseId);
  if (status) {
    return response_success(res, { message });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function addTeacherToCourse(
  req: Request,
  res: Response
): Promise<Response> {
  const { teacherId, classId, day, timeStart, timeEnd } = req.body;
  const courseId = Number(req.params.courseId);

  const { status, course, error } = await addTeacherToCourseService(
    courseId,
    teacherId,
    classId,
    day,
    timeStart,
    timeEnd
  );

  if (status) {
    return response_success(res, { course });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getAllClasses(
  req: Request,
  res: Response
): Promise<Response> {
  const { gradeId } = req.params;
  const { status, classes, error } = await getAllClassesService(
    Number(gradeId)
  );
  if (status) {
    return response_success(res, { classes });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createClass(
  req: Request,
  res: Response
): Promise<Response> {
  const { gradeId, name } = req.body;
  const { status, createdClass, error } = await createClassService(
    name,
    gradeId
  );
  if (status) {
    return response_success(res, { class: createdClass });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editClass(
  req: Request,
  res: Response
): Promise<Response> {
  const { classId } = req.params;
  const { name, gradeId } = req.body;
  const { status, updatedClass, error } = await editClassService(
    Number(classId),
    name,
    gradeId
  );
  if (status) {
    return response_success(res, { class: updatedClass });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteClass(
  req: Request,
  res: Response
): Promise<Response> {
  const { classId } = req.params;
  const { status, error } = await deleteClassService(Number(classId));

  if (status) {
    return response_success(res, "Success!");
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createMassStudent(
  req: Request,
  res: Response
): Promise<Response> {
  const { classId } = req.body;
  const studentCsv = req.file;
  const { status, error, createdStudent } = await createMassStudentService(
    Number(classId),
    studentCsv
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { createdStudent });
}

export async function getStudentByClass(
  req: Request,
  res: Response
): Promise<Response> {
  const { classId } = req.params;

  const { status, error, students } = await getStudentsByClassService(
    Number(classId)
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { students });
}
