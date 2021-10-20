import { PrismaClient} from '@prisma/client'
import { Response } from 'express';
import { Auth, Sekolah } from '../types';

const prisma = new PrismaClient();

export class authService {

  construcotr() {
      
  }

  async FindByEmail(email:string) {
    
    const result = await prisma.sekolah.findUnique({
      where: {
        email: email
      }
    });

    return result
  }

  public index = async (req: Request, res: Response) => {
    const sekolah = await prisma.sekolah.findMany();
    res.json(sekolah);
  };

  public login = async (newAuth: Auth) => {
    const email = newAuth.email;
    const password = newAuth.password;


    return "awe";
  };

  public register = async (newSekolah: Sekolah) => {
    
    return "awe"
  };
}
