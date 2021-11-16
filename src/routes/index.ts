import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import dbManagementRoutes from "./dbManagementRoutes";
import userRoutes from "./userRoutes";
import adminScoreRoutes from "./adminScoreRoutes";
import adminStudentRoutes from "./adminStudentRoutes";
import adminTeacherRoutes from "./adminTeacherRoutes";
import adminCourseRoutes from "./adminCourseRoutes";
import adminDashboardRoutes from "./adminDashboardRoutes";
import teacherScoreRoutes from "./teacherScoreRoutes";
import teacherPageRoutes from "./teacherPageRoutes";

export default function routes(app: Express) {
  app.use("/user", userRoutes);
  app.use("/admin/dbmanagement/", dbManagementRoutes);
  app.use("/admin/score/", adminScoreRoutes);
  app.use("/admin/students", adminStudentRoutes);
  app.use("/admin/teachers", adminTeacherRoutes);
  app.use("/admin/courses", adminCourseRoutes);
  app.use("/admin/dashboard", adminDashboardRoutes);
  app.use("/teacher/page", teacherPageRoutes);
  app.use("/teacher/score", teacherScoreRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
