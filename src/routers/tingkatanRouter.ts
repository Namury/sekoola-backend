import { Router } from "express"
import { tingkatanController } from "../controllers"

// const AuthController = new authController();

export class tingkatanRouter {
  public router: Router;
  private TingkatanController: tingkatanController;
  
  constructor(){
    this.TingkatanController = new tingkatanController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.get('/:sekolahId', this.TingkatanController.getAll)
    this.router.get('/:sekolahId/:uuid', this.TingkatanController.getById)
    this.router.post('/add', this.TingkatanController.add)
    this.router.put('/edit/:uuid', this.TingkatanController.edit)
    this.router.delete('/delete/:uuid', this.TingkatanController.delete)
  }
}