import {
  addTeacherToCourse,
  createClass,
  createCourse,
  createGrade,
  createMassStudent,
  deleteClass,
  deleteCourse,
  deleteGrade,
  editClass,
  editCourse,
  editGrade,
  getAllClasses,
  getAllCourse,
  getAllGrades,
  getCourseById,
  getStudentByClass,
} from "$controllers/dbManagementController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import {
  validateClassRequest,
  validateCourseRequest,
  validateGradeRequest,
  validateMassStudentRequest,
} from "$validations/dbManagementValidation";
import express from "express";
import { upload } from "$utils/multer.utils";
const dbManagementRoutes = express.Router();

dbManagementRoutes.post(
  "/grade",
  [checkJwt, checkRole("ADMIN")],
  validateGradeRequest,
  createGrade
);
dbManagementRoutes.get("/grade", [checkJwt, checkRole("ADMIN")], getAllGrades);
dbManagementRoutes.put(
  "/grade/:gradeId",
  [checkJwt, checkRole("ADMIN")],
  validateGradeRequest,
  editGrade
);
dbManagementRoutes.delete(
  "/grade/:gradeId",
  [checkJwt, checkRole("ADMIN")],
  deleteGrade
);

dbManagementRoutes.get("/course", [checkJwt, checkRole("ADMIN")], getAllCourse);
dbManagementRoutes.get(
  "/course/:courseId",
  [checkJwt, checkRole("ADMIN")],
  getCourseById
);
dbManagementRoutes.post(
  "/course",
  [checkJwt, checkRole("ADMIN")],
  validateCourseRequest,
  createCourse
);
dbManagementRoutes.post(
  "/course/:courseId",
  [checkJwt, checkRole("ADMIN")],
  addTeacherToCourse
);
dbManagementRoutes.put(
  "/course/:courseId",
  [checkJwt, checkRole("ADMIN")],
  editCourse
);
dbManagementRoutes.delete(
  "/course/:courseId",
  [checkJwt, checkRole("ADMIN")],
  deleteCourse
);

dbManagementRoutes.get(
  "/class/:gradeId",
  [checkJwt, checkRole("ADMIN")],
  getAllClasses
);
dbManagementRoutes.post(
  "/class",
  [checkJwt, checkRole("ADMIN")],
  validateClassRequest,
  createClass
);
dbManagementRoutes.put(
  "/class/:classId",
  [checkJwt, checkRole("ADMIN")],
  validateClassRequest,
  editClass
);
dbManagementRoutes.delete(
  "/class/:classId",
  [checkJwt, checkRole("ADMIN")],
  deleteClass
);

dbManagementRoutes.get(
  "/student/class/:classId",
  [checkJwt, checkRole("ADMIN")],
  getStudentByClass
);

dbManagementRoutes.post(
  "/student/mass",
  [checkJwt, checkRole("ADMIN")],
  upload.single("studentCsv"),
  validateMassStudentRequest,
  createMassStudent
);

export default dbManagementRoutes;
