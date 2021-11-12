import {
  login,
  registerSekolah,
  registerGuru,
} from "$controllers/userController";
import express from "express";
import {
  validateLoginRequest,
  validateRegisterSekolahRequest,
  validateRegisterGuruRequest,
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
export default userRoutes;
