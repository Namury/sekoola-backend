import {
  createScoreConfigService,
  createScoreRangeService,
  createScoreService,
  createStudentScoreService,
  deleteScoreConfigService,
  deleteScoreRangeService,
  deleteScoreService,
  deleteStudentScoreService,
  editScoreConfigService,
  editScoreRangeService,
  editScoreService,
  editStudentScoreService,
  getAffectiveScoreService,
  getCognitiveScoreService,
  getPsychomotorScoreService,
  getScoreConfigService,
  getScoreDetailByClassIdService,
  getScoreDetailByScoreIdService,
  getScoreRangeService,
} from "$services/scoreService";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function createScoreConfig(
  req: Request,
  res: Response
): Promise<Response> {
  const { type, category, weight, minimumScore } = req.body;
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, score, error } = await createScoreConfigService(
    type,
    category,
    weight,
    minimumScore,
    schoolId
  );

  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editScoreConfig(
  req: Request,
  res: Response
): Promise<Response> {
  const { type, category, weight, minimumScore } = req.body;
  const scoreConfigId = req.params.scoreConfigId;
  const { status, score, error } = await editScoreConfigService(
    scoreConfigId,
    type,
    category,
    weight,
    minimumScore
  );

  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteScoreConfig(
  req: Request,
  res: Response
): Promise<Response> {
  const scoreConfigId = req.params.scoreConfigId;
  const { status, score, error } = await deleteScoreConfigService(
    scoreConfigId
  );

  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getScoreConfig(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, scores, error } = await getScoreConfigService(schoolId);

  if (status) {
    return response_success(res, scores);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createScore(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, date, classId, courseId, scoreConfigId } = req.body;
  const { status, score, error } = await createScoreService(
    name,
    date,
    classId,
    courseId,
    scoreConfigId
  );
  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editScore(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, date, classId, courseId, scoreConfigId } = req.body;
  const scoreId = req.params.scoreId;
  const { status, score, error } = await editScoreService(
    scoreId,
    name,
    date,
    classId,
    courseId,
    scoreConfigId
  );
  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getCognitiveScore(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, scores, error } = await getCognitiveScoreService(schoolId);
  if (status) {
    return response_success(res, { scores });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getAffectiveScore(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, scores, error } = await getAffectiveScoreService(schoolId);
  if (status) {
    return response_success(res, { scores });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getPsychomotorScore(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, scores, error } = await getPsychomotorScoreService(schoolId);
  if (status) {
    return response_success(res, { scores });
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteScore(
  req: Request,
  res: Response
): Promise<Response> {
  const scoreId = req.params.scoreId;
  const { status, score, error } = await deleteScoreService(scoreId);

  if (status) {
    return response_success(res, score);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createStudentScore(
  req: Request,
  res: Response
): Promise<Response> {
  const { score, studentId, scoreId } = req.body;
  const { status, scoreResult, error } = await createStudentScoreService(
    score,
    scoreId,
    studentId
  );

  if (status) {
    return response_success(res, scoreResult);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editStudentScore(
  req: Request,
  res: Response
): Promise<Response> {
  const { score, studentId, scoreId } = req.body;
  const { status, scoreResult, error } = await editStudentScoreService(
    score,
    scoreId,
    studentId
  );

  if (status) {
    return response_success(res, scoreResult);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteStudentScore(
  req: Request,
  res: Response
): Promise<Response> {
  const { studentId, scoreId } = req.body;
  const { status, scoreResult, error } = await deleteStudentScoreService(
    scoreId,
    studentId
  );

  if (status) {
    return response_success(res, scoreResult);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getScoreDetailByScoreId(
  req: Request,
  res: Response
): Promise<Response> {
  const scoreId = req.params.scoreId;
  const { status, scoreDetail, error } = await getScoreDetailByScoreIdService(
    scoreId
  );

  if (status) {
    return response_success(res, scoreDetail);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getScoreDetailByClassId(
  req: Request,
  res: Response
): Promise<Response> {
  const classId = req.params.classId;
  const courseId = req.params.courseId;
  const { status, scoreDetail, error } = await getScoreDetailByClassIdService(
    classId,
    courseId
  );

  if (status) {
    return response_success(res, scoreDetail);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function createScoreRange(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { letter, from, to } = req.body;
  const { status, scoreRange, error } = await createScoreRangeService(
    schoolId,
    letter,
    from,
    to
  );

  if (status) {
    return response_success(res, scoreRange);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function editScoreRange(
  req: Request,
  res: Response
): Promise<Response> {
  const scoreRangeId = req.params.scoreRangeId;
  const schoolId = res.locals.jwtPayload.schoolId;
  const { letter, from, to } = req.body;
  const { status, scoreRange, error } = await editScoreRangeService(
    scoreRangeId,
    schoolId,
    letter,
    from,
    to
  );

  if (status) {
    return response_success(res, scoreRange);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function deleteScoreRange(
  req: Request,
  res: Response
): Promise<Response> {
  const scoreRangeId = req.params.scoreRangeId;
  const { status, scoreRange, error } = await deleteScoreRangeService(
    scoreRangeId
  );

  if (status) {
    return response_success(res, scoreRange);
  } else {
    return response_internal_server_error(res, error);
  }
}

export async function getScoreRange(
  req: Request,
  res: Response
): Promise<Response> {
  const schoolId = res.locals.jwtPayload.schoolId;
  const { status, scoreRange, error } = await getScoreRangeService(schoolId);

  if (status) {
    return response_success(res, scoreRange);
  } else {
    return response_internal_server_error(res, error);
  }
}
