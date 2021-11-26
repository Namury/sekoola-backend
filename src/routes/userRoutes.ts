import {
  login,
  registerSekolah,
  registerGuru,
  editAdminProfile,
  editTeacherProfile,
} from "$controllers/userController";
import express from "express";
import {
  validateLoginRequest,
  validateRegisterSekolahRequest,
  validateRegisterGuruRequest,
  validateEditAdminProfileRequest,
  validateEditTeacherProfileRequest,
} from "$validations/userValidation";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/login", validateLoginRequest, login);
userRoutes.post(
  "/register/sekolah",
  validateRegisterSekolahRequest,
  registerSekolah
);

userRoutes.post(
  "/register/guru",
  [checkJwt, checkRole("ADMIN")],
  validateRegisterGuruRequest,
  registerGuru
);

userRoutes.put(
  "/edit/admin",
  [checkJwt, checkRole("ADMIN")],
  validateEditAdminProfileRequest,
  editAdminProfile
);

userRoutes.put(
  "/edit/teacher",
  [checkJwt, checkRole("GURU")],
  validateEditTeacherProfileRequest,
  editTeacherProfile
);

export default userRoutes;
