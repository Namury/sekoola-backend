import { adminDashboardDataCountController } from "$controllers/adminDashboardController";
import { checkJwt, checkRole } from "$middlewares/authMiddleware";
import express from "express";

const adminDashboardRoutes = express.Router();

adminDashboardRoutes.get(
  "/dataCount",
  [checkJwt, checkRole("ADMIN")],
  adminDashboardDataCountController
);

export default adminDashboardRoutes;
