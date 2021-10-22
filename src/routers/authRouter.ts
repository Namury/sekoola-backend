// import { baseRouter } from "./baseRouter"
import { Router } from "express"
import { authController } from "../controllers"


export class authRouter {
  public router: Router;
  private AuthController: authController;
  
  constructor(){
    this.AuthController = new authController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.post('/login', this.AuthController.login)
    this.router.post('/register', this.AuthController.register)
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
