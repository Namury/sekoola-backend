import { PrismaClient } from '@prisma/client'
import { Tingkatan } from '../types';

const prisma = new PrismaClient();

export class tingkatanService {
    constructor() {

    }

    public getAll = async (sekolahId:Number) => {
        const tingkatan = await prisma.tingkatan.findMany({
            where:{
                sekolahId:Number(sekolahId)
            },
            select:{
                id:true,
                uuid:true,
                nama:true,
                urutan:true,
                sekolahId:true
            }
        });

        if(!tingkatan) {
            return {status:false, response:"not found"}
        }

        return {status:true, response:tingkatan}
    }

    public getById = async (uuid:string) => {
        try{
            const tingkatan = await prisma.tingkatan.findUnique({
                where:{
                    uuid:String(uuid)
                },
                select:{
                    uuid:true,
                    nama:true,
                    urutan:true,
                    sekolahId:true
                }
            })
    
            if(!tingkatan) {
                return {status:false, response:uuid}
            }
    
            return {status:true, response:tingkatan}
        }catch(error){
            return {status:false, response:error}
        }
        
    }

    public add = async (newTingkatan:Tingkatan) => {
        try{
            const tingkatan = await prisma.tingkatan.create({
                data:{
                    nama: newTingkatan.nama,
                    urutan: Number(newTingkatan.urutan),
                    sekolahId: Number(newTingkatan.sekolahId)
                }
            })
            return {status:true, response:tingkatan}
        } catch (error){
            return {status:false, response:error}
        }
    }

    public edit = async (uuid:string, newTingkatan:Tingkatan) => {
        try{
            const tingkatan = await prisma.tingkatan.update({
                where:{
                    uuid: uuid
                },
                data:{
                    nama: newTingkatan.nama,
                    urutan: newTingkatan.urutan,
                    sekolahId: newTingkatan.sekolahId
                }
            })
            return {status:true, response:tingkatan}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }

    public delete = async (uuid:string) => {
        try{
            const tingkatan = await prisma.tingkatan.delete({
                where:{
                    uuid: uuid
                }
            })
            return {status:true, response:tingkatan}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }
}