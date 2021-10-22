import { Router } from "express"
import { guruController } from "../controllers";

export class guruRouter {
  public router: Router;
  private guruController: guruController;
  
  constructor(){
    this.guruController = new guruController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.get('/:sekolahId', this.guruController.getAll)
    this.router.get('/:sekolahId/:uuid', this.guruController.getById)
    this.router.post('/add', this.guruController.add)
    this.router.put('/edit/:uuid', this.guruController.edit)
    this.router.delete('/delete/:uuid', this.guruController.delete)
  }
}