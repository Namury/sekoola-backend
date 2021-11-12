import {
  deleteTeacher,
  getAllTeacherBySchoolId,
} from "$controllers/adminTeacherController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";
const adminTeacherRoutes = express.Router();

adminTeacherRoutes.get(
  "/",
  [checkJwt, checkRole("ADMIN")],
  getAllTeacherBySchoolId
);

adminTeacherRoutes.get("/courses/:teacherUUID", [checkJwt, checkRole("ADMIN")]);
adminTeacherRoutes.delete(
  "/:teacherUUID",
  [checkJwt, checkRole("ADMIN")],
  deleteTeacher
);

export default adminTeacherRoutes;
