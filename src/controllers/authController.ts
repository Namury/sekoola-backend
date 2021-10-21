import { Request, Response} from "express";
import { authService } from '../services';

export class authController {
  private AuthService: authService;
  
    constructor() {
      this.AuthService = new authService();
    }
  
    public login = async(req: Request, res: Response) => {
      const {email, password} = req.body
      if (!(email && password)) {
        res.status(400).send();
      }
  
      try {
        const response = await this.AuthService.login({email, password})
        res.send(response)
      } catch (error) {
        res.status(401).send();
      }

    }
  
    public register = async(req: Request, res: Response) => {
      try {
        const {email, password, nama} = req.body
      
        res.send(await this.AuthService.register({email, password, nama}));
      } catch (error) {
        res.status(401).send();
      }
      
    }
  }