import { Request, Response} from "express";
import { authService } from '../services';
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class authController {
  private AuthService: authService;
  
    constructor() {
      this.AuthService = new authService();
    }
  
    public login = async(req: Request, res: Response) => {
      const {email, password} = req.body
      if (!(email && password)) {
        return response_internal_server_error(res)
      }
  
      try {
        const {status, response} = await this.AuthService.login({email, password})
        if(status){
          return response_handler(res, true, 200, "Logged in", {"bearer token" : response})
        } else{
          return response_internal_server_error(res,response)
        }
        
        
      } catch (error) {
        return response_internal_server_error(res)
      }

    }
  
    public register = async(req: Request, res: Response) => {
      try {
        const {email, password, nama} = req.body
        const {status, response} = await this.AuthService.register({email, password, nama})
        if (status){
          return response_handler(res, true, 200, "Registered", response)
        } else {
          return response_internal_server_error(res)
        }
      } catch (error) {
        res.status(401).send();
      }
      
    }
  }