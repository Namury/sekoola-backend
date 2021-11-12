import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";

export function validateScoreRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) return response_bad_request(res, "name is required");
  if (!req.body.courseId)
    return response_bad_request(res, "courseId is required");
  if (!req.body.classId)
    return response_bad_request(res, "classId is required");
  if (!req.body.scoreConfigId)
    return response_bad_request(res, "scoreConfigId is required");
  next();
}

export function validateScoreConfigRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.type) return response_bad_request(res, "type is required");
  if (!req.body.category)
    return response_bad_request(res, "category is required");
  if (!req.body.weight) return response_bad_request(res, "weight is required");
  if (!req.body.minimumScore)
    return response_bad_request(res, "minimumScore is required");
  next();
}

export function validateStudentScoreRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.score) return response_bad_request(res, "score is required");
  if (!req.body.studentId)
    return response_bad_request(res, "studentId is required");
  if (!req.body.scoreId)
    return response_bad_request(res, "scoreId is required");
  next();
}
