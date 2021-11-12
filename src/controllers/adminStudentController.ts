import {
  getAllStudentsByClassService,
  getStudentByUuidService,
  updateStudentByUuidService,
} from "$services/studentService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function getAllStudentsByClass(
  req: Request,
  res: Response
): Promise<Response> {
  const { classId } = req.params;

  const { status, students, error } = await getAllStudentsByClassService(
    Number(classId)
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { students });
}

export async function getStudentByUuidController(req: Request, res: Response) {
  const { studentUUID } = req.params;

  const { status, error, student } = await getStudentByUuidService(studentUUID);

  if (!status) {
    return response_internal_server_error(res, error);
  }
  return response_success(res, { student });
}

export async function updateStudentByUuidController(
  req: Request,
  res: Response
) {
  const { studentUUID } = req.params;
  const { name, NISN } = req.body;

  const { status, error, student } = await updateStudentByUuidService(
    studentUUID,
    name,
    NISN
  );
  if (!status) {
    return response_internal_server_error(res, error);
  }

  return response_success(res, { student });
}
