import { PrismaClient} from '@prisma/client'
import { Auth, Sekolah } from '../types';

import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();

export class authService {

  constructor() {
      
  }

  public login = async (newAuth: Auth) => {
    const sekolah = await prisma.sekolah.findUnique({
        where: {
          email: newAuth.email,
        }
      })

      if(!sekolah){
        return {status:false, response:"not found"}
      }

      const checkPassword = bcrypt.compareSync(newAuth.password, sekolah?.password);

      if(!checkPassword){
        return {status:false, response:"email or password is incorrect"}
      }

    const token = jwt.sign(
      { id: sekolah?.id, nama: sekolah?.nama },
      String(process.env.JWT_SECRET),
      { expiresIn: "12h" }
    );
    const response = {
      status: true,
      response : token,
    }
    return response;
    
  };

  public register = async (newSekolah: Sekolah) => {
  
    try{
      const sekolah = await prisma.sekolah.create({
        data: {
          nama: newSekolah.nama,
          email: newSekolah.email,
          password: bcrypt.hashSync(newSekolah.password, 8)
        }
      })
      return {status:true, response:sekolah}
    } catch (error){
      return {status:false, response:"Something went wrong"}
    }
    
  };
}
