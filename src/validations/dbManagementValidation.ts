import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";

export function validateGradeRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) return response_bad_request(res, "Name is required");
  next();
}

export function validateCourseRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) return response_bad_request(res, "Name is required");
  if (!req.body.gradeId)
    return response_bad_request(res, "gradeId is required");
  next();
}

export function validateClassRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) return response_bad_request(res, "Name is required");
  if (!req.body.gradeId)
    return response_bad_request(res, "gradeId is required");
  next();
}

export function validateMassStudentRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
