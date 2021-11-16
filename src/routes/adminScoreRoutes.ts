import {
  createScore,
  createScoreConfig,
  createScoreRange,
  deleteScore,
  deleteScoreConfig,
  deleteScoreRange,
  editScore,
  editScoreConfig,
  editScoreRange,
  getAffectiveScore,
  getCognitiveScore,
  getPsychomotorScore,
  getScoreConfig,
  getScoreRange,
} from "$controllers/scoreController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import {
  validateScoreRequest,
  validateScoreConfigRequest,
  validateScoreRangeRequest,
} from "$validations/scoreValidation";
import express from "express";

const adminScoreRoutes = express.Router();

adminScoreRoutes.post(
  "/config",
  [checkJwt, checkRole("ADMIN")],
  validateScoreConfigRequest,
  createScoreConfig
);

adminScoreRoutes.put(
  "/config/:scoreConfigId",
  [checkJwt, checkRole("ADMIN")],
  validateScoreConfigRequest,
  editScoreConfig
);

adminScoreRoutes.delete(
  "/config/:scoreConfigId",
  [checkJwt, checkRole("ADMIN")],
  deleteScoreConfig
);

adminScoreRoutes.get("/config", [checkJwt, checkRole("ADMIN")], getScoreConfig);

adminScoreRoutes.post(
  "/",
  [checkJwt, checkRole("ADMIN")],
  validateScoreRequest,
  createScore
);

adminScoreRoutes.put(
  "/:scoreId",
  [checkJwt, checkRole("ADMIN")],
  validateScoreRequest,
  editScore
);

adminScoreRoutes.get(
  "/cognitive",
  [checkJwt, checkRole("ADMIN")],
  getCognitiveScore
);

adminScoreRoutes.get(
  "/affective",
  [checkJwt, checkRole("ADMIN")],
  getAffectiveScore
);

adminScoreRoutes.get(
  "/psychomotor",
  [checkJwt, checkRole("ADMIN")],
  getPsychomotorScore
);

adminScoreRoutes.delete(
  "/:scoreId",
  [checkJwt, checkRole("ADMIN")],
  deleteScore
);

adminScoreRoutes.get("/range", [checkJwt, checkRole("ADMIN")], getScoreRange);

adminScoreRoutes.post(
  "/range",
  [checkJwt, checkRole("ADMIN")],
  validateScoreRangeRequest,
  createScoreRange
);

adminScoreRoutes.delete(
  "/range/:scoreRangeId",
  [checkJwt, checkRole("ADMIN")],
  deleteScoreRange
);

adminScoreRoutes.put(
  "/range/:scoreRangeId",
  [checkJwt, checkRole("ADMIN")],
  validateScoreRangeRequest,
  editScoreRange
);

export default adminScoreRoutes;
