import { PrismaClient } from '@prisma/client'
import { Siswa } from '../types';

const prisma = new PrismaClient();

export class siswaService {
    constructor() {

    }

    public getAll = async (kelasId:Number) => {
        const siswa = await prisma.siswa.findMany({
            where:{
                kelasId:Number(kelasId)
            },
            select:{
                uuid:true,
                nama:true,
                NISN:true,
                kelasId:true,
                sekolahId:true
            }
        });

        if(!siswa) {
            return {status:false, response:"not found"}
        }

        return {status:true, response:siswa}
    }

    public getById = async (uuid:string) => {
        try{
            const siswa = await prisma.siswa.findUnique({
                where:{
                    uuid:String(uuid)
                },
                select:{
                    uuid:true,
                    nama:true,
                    NISN:true,
                    kelasId:true,
                    sekolahId:true
                }
            })
    
            if(!siswa) {
                return {status:false, response:uuid}
            }
    
            return {status:true, response:siswa}
        }catch(error){
            return {status:false, response:error}
        }
        
    }

    public add = async (newSiswa:Siswa) => {
        try{
            const siswa = await prisma.siswa.create({
                data:{
                    nama: newSiswa.nama,
                    NISN: newSiswa.NISN,
                    sekolahId: Number(newSiswa.sekolahId),
                    kelasId: Number(newSiswa.kelasId)
                }
            })
            return {status:true, response:siswa}
        } catch (error){
            return {status:false, response:error}
        }
    }

    public edit = async (uuid:string, newSiswa:Siswa) => {
        try{
            const siswa = await prisma.siswa.update({
                where:{
                    uuid: uuid
                },
                data:{
                    nama: newSiswa.nama,
                    NISN: newSiswa.NISN,
                    sekolahId: newSiswa.sekolahId,
                    kelasId: newSiswa.kelasId
                }
            })
            return {status:true, response:siswa}
        } catch (error){
            return {status:false, response:String(error)}
        }
    }

    public delete = async (uuid:string) => {
        try{
            const siswa = await prisma.siswa.delete({
                where:{
                    uuid: uuid
                }
            })
            return {status:true, response:siswa}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }
}