import {
  getAllStudentsByClass,
  getStudentByUuidController,
} from "$controllers/adminStudentController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";
const adminStudentRoutes = express.Router();

adminStudentRoutes.get(
  "/class/:classId",
  [checkJwt, checkRole("ADMIN")],
  getAllStudentsByClass
);

adminStudentRoutes.get(
  "/:studentUUID",
  [checkJwt, checkRole("ADMIN")],
  getStudentByUuidController
);

adminStudentRoutes.put("/:studentUUID", [checkJwt, checkRole("ADMIN")]);

export default adminStudentRoutes;
