import { getAllRootCourseByGrade } from "$controllers/adminCourseController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";

const adminCourseRoutes = express.Router();

adminCourseRoutes.get(
  "/grade/:gradeId",
  [checkJwt, checkRole("ADMIN")],
  getAllRootCourseByGrade
);

export default adminCourseRoutes;
