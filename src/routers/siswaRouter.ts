import { Router } from "express"
import { siswaController } from "../controllers"

export class siswaRouter {
  public router: Router;
  private SiswaController: siswaController;
  
  constructor(){
    this.SiswaController = new siswaController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.get('/:kelasId', this.SiswaController.getAll)
    this.router.get('/:kelasId/:uuid', this.SiswaController.getById)
    this.router.post('/add', this.SiswaController.add)
    this.router.put('/edit/:uuid', this.SiswaController.edit)
    this.router.delete('/delete/:uuid', this.SiswaController.delete)
  }
}