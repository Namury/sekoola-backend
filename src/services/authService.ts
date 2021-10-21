import { PrismaClient} from '@prisma/client'
import { Response } from 'express';
import { Auth, Sekolah } from '../types';

import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();

export class authService {

  construcotr() {
      
  }

  // public index

  async FindByEmail(email:string) {
    
    try {
      const result = await prisma.sekolah.findUnique({
        where: {
          email: email
        }
      });
      return result
    } catch (error) {
      return error
    }

  }

  public index = async () => {
    return "Indexd"
  }

  public login = async (newAuth: Auth) => {
    const email = newAuth.email;
    const password = newAuth.password;
    let sekolah;


    //get sekolah
    try{
      sekolah = await prisma.sekolah.findUnique({
        where: {
          email: email,
        }
      })
      
    } catch (error){
      return error
    }

    //compare password
    try{
      if(sekolah != null){
        bcrypt.compareSync(password, sekolah?.password);
      } 
    } catch (error) {
      return error
    }

    const token = jwt.sign(
      { id: sekolah?.id, nama: sekolah?.nama },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" }
    );

    return token;
    
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
      return sekolah
    } catch (error){
      return error
    }
    
  };
}
