import { PrismaClient } from '@prisma/client'
import { Kelas } from '../types';

const prisma = new PrismaClient();

export class kelasService {
    constructor() {

    }

    public getAll = async (tingkatanId:Number) => {
        const kelas = await prisma.kelas.findMany({
            where:{
                tingkatanId:Number(tingkatanId)
            },
            select:{
                id:true,
                uuid:true,
                nama:true,
                urutan:true,
                tingkatanId:true
            }
        });

        if(!kelas) {
            return {status:false, response:"not found"}
        }

        return {status:true, response:kelas}
    }

    public getById = async (uuid:string) => {
        try{
            const kelas = await prisma.kelas.findUnique({
                where:{
                    uuid:String(uuid)
                },
                select:{
                    uuid:true,
                    nama:true,
                    urutan:true,
                    tingkatanId:true
                }
            })
    
            if(!kelas) {
                return {status:false, response:uuid}
            }
    
            return {status:true, response:kelas}
        }catch(error){
            return {status:false, response:error}
        }
        
    }

    public add = async (newKelas:Kelas) => {
        try{
            const kelas = await prisma.kelas.create({
                data:{
                    nama: newKelas.nama,
                    urutan: Number(newKelas.urutan),
                    tingkatanId: Number(newKelas.tingkatanId)
                }
            })
            return {status:true, response:kelas}
        } catch (error){
            return {status:false, response:error}
        }
    }

    public edit = async (uuid:string, newKelas:Kelas) => {
        try{
            const kelas = await prisma.kelas.update({
                where:{
                    uuid: uuid
                },
                data:{
                    nama: newKelas.nama,
                    urutan: newKelas.urutan,
                    tingkatanId: newKelas.tingkatanId
                }
            })
            return {status:true, response:kelas}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }

    public delete = async (uuid:string) => {
        try{
            const kelas = await prisma.kelas.delete({
                where:{
                    uuid: uuid
                }
            })
            return {status:true, response:kelas}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }
}