import { Router } from "express"
import { mataPelajaranController } from "../controllers";

export class mataPelajaranRouter {
  public router: Router;
  private mataPelajaranController: mataPelajaranController;
  
  constructor(){
    this.mataPelajaranController = new mataPelajaranController();
    this.router = Router()
    this.routes();
  }
  
  public routes(){
    this.router.get('/:tingkatanId', this.mataPelajaranController.getAll)
    this.router.get('/:tingkatanId/:uuid', this.mataPelajaranController.getById)
    this.router.post('/add', this.mataPelajaranController.add)
    this.router.put('/edit/:uuid', this.mataPelajaranController.edit)
    this.router.delete('/delete/:uuid', this.mataPelajaranController.delete)
  }
}