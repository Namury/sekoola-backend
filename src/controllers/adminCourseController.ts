import { Request, Response } from "express";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { getAllRootCourseByGradeService } from "$services/adminCourseService";

export async function getAllRootCourseByGrade(
  req: Request,
  res: Response
): Promise<Response> {
  const { gradeId } = req.params;
  const { status, error, courses } = await getAllRootCourseByGradeService(
    Number(gradeId)
  );

  if (!status) {
    response_internal_server_error(res, error);
  }

  return response_success(res, { courses });
}
