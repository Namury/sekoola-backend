import {
  userLoginService,
  userRegisterSekolahService,
  userRegisterGuruService,
  editAdminProfileService,
  editTeacherProfileService,
} from "$services/userServices";
import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password, error } = req.body;
  const { status, userDetails } = await userLoginService(email, password);
  if (status) {
    return response_success(res, userDetails);
  } else {
    return response_unauthorized(res, error);
  }
}

export async function registerSekolah(req: Request, res: Response) {
  const { user, status, token, error, school } =
    await userRegisterSekolahService(req.body);

  if (status) {
    return response_success(res, { user, token, school });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function registerGuru(req: Request, res: Response) {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { user, status, token, error, teacher } =
    await userRegisterGuruService(req.body, schoolId);
  if (status) {
    return response_success(res, { user, token, teacher });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editAdminProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = res.locals.jwtPayload.id;
  const schoolId = res.locals.jwtPayload.schoolId;
  const { name, email, password, oldPassword } = req.body;

  const { status, data, error } = await editAdminProfileService(
    userId,
    schoolId,
    name,
    email,
    password,
    oldPassword
  );

  if (status) {
    return response_success(res, data);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editTeacherProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = res.locals.jwtPayload.id;
  const { name, NIP, password, oldPassword } = req.body;

  const { status, data, error } = await editTeacherProfileService(
    userId,
    name,
    NIP,
    password,
    oldPassword
  );

  if (status) {
    return response_success(res, data);
  } else {
    return response_internal_server_error(res, error);
  }
}
