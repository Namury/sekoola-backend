import {
  getClassesByTeacherService,
  getCoursesByTeacherService,
  getGradesByTeacherService,
} from "$services/teacherPageService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";

import { Request, Response } from "express";

export async function getGradesByTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  const teacherId = res.locals.jwtPayload.id;
  const { status, grades, error } = await getGradesByTeacherService(teacherId);
  if (status) {
    return response_success(res, grades);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getClassesByTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  const teacherId = res.locals.jwtPayload.id;
  const gradeId = req.params.gradeId;
  const { status, classes, error } = await getClassesByTeacherService(
    teacherId,
    gradeId
  );
  if (status) {
    return response_success(res, classes);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getCoursesByTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  const teacherId = res.locals.jwtPayload.id;
  const { status, courses, error } = await getCoursesByTeacherService(
    teacherId
  );
  if (status) {
    return response_success(res, courses);
  } else {
    return response_internal_server_error(res, error);
  }
}
