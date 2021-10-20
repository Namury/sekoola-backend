import { Request, Response, Router } from "express";
import { authService } from '../services';

export class authController {
    public router: Router;
    private AuthService: authService;
  
    constructor() {
      this.AuthService = new authService();
    }
  
    public async login(req: Request, res: Response) {
      const {email, password} = req.body

      res.send(this.AuthService.login({email, password}));
    }
  
    public async register(req: Request, res: Response) {
      const {email, password, nama} = req.body

      res.send(this.AuthService.register({email, password, nama}));
    }
  }