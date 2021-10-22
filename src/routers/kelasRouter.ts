import { Router } from "express"
import { kelasController } from "../controllers"

export class kelasRouter {
  public router: Router;
  private KelasController: kelasController;
  
  constructor(){
    this.KelasController = new kelasController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.get('/:tingkatanId', this.KelasController.getAll)
    this.router.get('/:tingkatanId/:uuid', this.KelasController.getById)
    this.router.post('/add', this.KelasController.add)
    this.router.put('/edit/:uuid', this.KelasController.edit)
    this.router.delete('/delete/:uuid', this.KelasController.delete)
  }
}