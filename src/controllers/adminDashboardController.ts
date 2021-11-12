import { adminDashboardCountDataServices } from "$services/adminDashboardService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function adminDashboardDataCountController(
  req: Request,
  res: Response
) {
  const schoolId = res.locals.jwtPayload.id;
  const { status, countTeacher, countStudent, countCourse, countClass, error } =
    await adminDashboardCountDataServices(Number(schoolId));

  if (!status) {
    return response_internal_server_error(res, error);
  }

  return response_success(res, {
    countTeacher,
    countStudent,
    countCourse,
    countClass,
  });
}
