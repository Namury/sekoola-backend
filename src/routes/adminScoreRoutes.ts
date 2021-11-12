import {
  createScore,
  createScoreConfig,
  deleteScore,
  deleteScoreConfig,
  editScore,
  editScoreConfig,
  getAffectiveScore,
  getCognitiveScore,
  getPsychomotorScore,
  getScoreConfig,
} from "$controllers/scoreController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import {
  validateScoreRequest,
  validateScoreConfigRequest,
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

export default adminScoreRoutes;
