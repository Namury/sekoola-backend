import {
  getClassesByTeacher,
  getCoursesByTeacher,
  getGradesByTeacher,
} from "$controllers/teacherPageController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";

const teacherPageRoutes = express.Router();

teacherPageRoutes.get(
  "/grade",
  [checkJwt, checkRole("GURU")],
  getGradesByTeacher
);

teacherPageRoutes.get(
  "/class/:gradeId",
  [checkJwt, checkRole("GURU")],
  getClassesByTeacher
);

teacherPageRoutes.get(
  "/course",
  [checkJwt, checkRole("GURU")],
  getCoursesByTeacher
);

export default teacherPageRoutes;
