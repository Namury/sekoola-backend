import {
  addTeacherCourseService,
  deleteTeacherService,
  getAllTeacherBySchoolService,
  getTeacherProfileService,
  teacherSubjectsService,
} from "$services/adminTeacherService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function getAllTeacherBySchoolId(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, teachers, error } = await getAllTeacherBySchoolService(
    Number(schoolId)
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { teachers });
}

export async function deleteTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  const { teacherUUID } = req.params;
  const { status, error } = await deleteTeacherService(teacherUUID);
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, "Success");
}

export async function getTeacherSubject(
  req: Request,
  res: Response
): Promise<Response> {
  const { teacherUUID } = req.params;
  const { status, courses, error } = await teacherSubjectsService(teacherUUID);
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { courses });
}

export async function addTeacherCourseController(
  req: Request,
  res: Response
): Promise<Response> {
  const { teacherUUID } = req.params;

  const { rootCourseId, classId, day, timeStart, timeEnd, teacherId } =
    req.body;
  const courseData = {
    rootCourseId,
    classId,
    day,
    timeStart,
    timeEnd,
    teacherId,
  };
  const { status, course, error } = await addTeacherCourseService(
    courseData,
    teacherUUID
  );

  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { course });
}

export async function getTeacherProfileController(
  req: Request,
  res: Response
): Promise<Response> {
  const { teacherUUID } = req.params;
  const { status, teacher, error } = await getTeacherProfileService(
    teacherUUID
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { teacher });
}
