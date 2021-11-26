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
  try {
    const { email, password, error } = req.body;
    const { status, userDetails } = await userLoginService(email, password);
    if (status) {
      return response_success(res, userDetails);
    } else {
      return response_unauthorized(res, error);
    }
  } catch (err: any) {
    return response_internal_server_error(res, err.message);
  }
}

export async function registerSekolah(req: Request, res: Response) {
  try {
    const { user, status, token, error, school } =
      await userRegisterSekolahService(req.body);
    if (status) {
      return response_success(res, { user, token, school });
    } else {
      throw new Error(error);
    }
  } catch (err: any) {
    return response_internal_server_error(res, err.message);
  }
}

export async function registerGuru(req: Request, res: Response) {
  try {
    const schoolId = res.locals.jwtPayload.schoolId;
    const { user, status, token, error, teacher } =
      await userRegisterGuruService(req.body, schoolId);
    if (status) {
      return response_success(res, { user, token, teacher });
    } else {
      throw new Error(error);
    }
  } catch (err: any) {
    return response_internal_server_error(res, err.message);
  }
}

export async function editAdminProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = res.locals.jwtPayload.id;
  const schoolId = res.locals.jwtPayload.schoolId;
  const { name, email, password } = req.body;

  const { status, data, error } = await editAdminProfileService(
    userId,
    schoolId,
    name,
    email,
    password
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
  const { name, NIP, password } = req.body;

  const { status, data, error } = await editTeacherProfileService(
    userId,
    name,
    NIP,
    password
  );

  if (status) {
    return response_success(res, data);
  } else {
    return response_internal_server_error(res, error);
  }
}
