import {
  createScore,
  createStudentScore,
  deleteScore,
  deleteStudentScore,
  editScore,
  editStudentScore,
  getAffectiveScore,
  getCognitiveScore,
  getPsychomotorScore,
  getScoreDetailByClassId,
  getScoreDetailByScoreId,
} from "$controllers/scoreController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import {
  validateScoreRequest,
  validateStudentScoreRequest,
} from "$validations/scoreValidation";
import express from "express";

const teacherScoreRoutes = express.Router();

teacherScoreRoutes.post(
  "/",
  [checkJwt, checkRole("GURU")],
  validateScoreRequest,
  createScore
);

teacherScoreRoutes.post(
  "/student",
  [checkJwt, checkRole("GURU")],
  validateStudentScoreRequest,
  createStudentScore
);

teacherScoreRoutes.put(
  "/student",
  [checkJwt, checkRole("GURU")],
  validateStudentScoreRequest,
  editStudentScore
);

teacherScoreRoutes.delete(
  "/student",
  [checkJwt, checkRole("GURU")],
  deleteStudentScore
);

teacherScoreRoutes.put(
  "/:scoreId",
  [checkJwt, checkRole("GURU")],
  validateScoreRequest,
  editScore
);

teacherScoreRoutes.get(
  "/cognitive",
  [checkJwt, checkRole("GURU")],
  getCognitiveScore
);

teacherScoreRoutes.get(
  "/affective",
  [checkJwt, checkRole("GURU")],
  getAffectiveScore
);

teacherScoreRoutes.get(
  "/psychomotor",
  [checkJwt, checkRole("GURU")],
  getPsychomotorScore
);

teacherScoreRoutes.get(
  "/:scoreId",
  [checkJwt, checkRole("GURU")],
  getScoreDetailByScoreId
);

teacherScoreRoutes.get(
  "/class/:classId/:courseId",
  [checkJwt, checkRole("GURU")],
  getScoreDetailByClassId
);

teacherScoreRoutes.delete(
  "/:scoreId",
  [checkJwt, checkRole("GURU")],
  deleteScore
);

export default teacherScoreRoutes;
