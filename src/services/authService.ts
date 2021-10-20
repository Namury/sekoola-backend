import { PrismaClient} from '@prisma/client'
import { Response } from 'express';
import { Auth, Sekolah } from '../types';

const prisma = new PrismaClient();

export class authService {

  construcotr() {
      
  }

  public index = async (req: Request, res: Response) => {
    const sekolah = await prisma.sekolah.findMany();
    res.json(sekolah);
  };

  public login = async (newAuth: Auth) => {

    return "awe";
  };

  public register = async (newSekolah: Sekolah) => {
    
    return "awe"
  };
}
