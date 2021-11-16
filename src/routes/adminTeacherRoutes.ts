import {
  addTeacherCourseController,
  deleteTeacher,
  getAllTeacherBySchoolId,
  getTeacherProfileController,
  getTeacherSubject,
} from "$controllers/adminTeacherController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";
const adminTeacherRoutes = express.Router();

adminTeacherRoutes.get(
  "/",
  [checkJwt, checkRole("ADMIN")],
  getAllTeacherBySchoolId
);

adminTeacherRoutes.get(
  "/courses/:teacherUUID",
  [checkJwt, checkRole("ADMIN")],
  getTeacherSubject
);
adminTeacherRoutes.delete(
  "/:teacherUUID",
  [checkJwt, checkRole("ADMIN")],
  deleteTeacher
);

adminTeacherRoutes.post(
  "/courses/:teacherUUID",
  [checkJwt, checkRole("ADMIN")],
  addTeacherCourseController
);

adminTeacherRoutes.get(
  "/:teacherUUID",
  [checkJwt, checkRole("ADMIN")],
  getTeacherProfileController
);

export default adminTeacherRoutes;
