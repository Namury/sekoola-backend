import { baseRouter } from "./baseRouter"
import { Application } from "express"
import { authController } from "../controllers"

const AuthController = new authController();

export class authRouter extends baseRouter {

  constructor(app: Application) {
    super(app, "authRoute")
  }

  configureRoutes() {
    this.app.route(`/login`).post([AuthController.login])
    this.app.route(`/register`).post([AuthController.register])
    return this.app
  }
}



// import { Router } from "express";
// import { authController } from "../controllers"

// const AuthController = new authController();

// export class authRouter {
//   public router: Router

//   constructor() {
//     this.router = Router();
//   }

//   // Router.route(`/login`).post([AuthController.login])
//   // Router.route(`/register`).post([AuthController.register])


//   public Router() {
//     this.router.route(`/login`).post([AuthController.login])
//     this.router.route(`/register`).post([AuthController.register])
//     return this.router
//   }
  
// }
