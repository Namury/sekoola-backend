import {
  deleteTeacherService,
  getAllTeacherBySchoolService,
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
