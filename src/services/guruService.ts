import { PrismaClient } from '@prisma/client'
import { Guru } from '../types';

const prisma = new PrismaClient();

export class guruService {
    constructor() {

    }

    public getAll = async (sekolahId:Number) => {
        const guru = await prisma.guru.findMany({
            where:{
                sekolahId:Number(sekolahId)
            },
            select:{
                id:true,
                uuid:true,
                nama:true,
                NIP:true,
                sekolahId:true
            }
        });

        if(!guru) {
            return {status:false, response:"not found"}
        }

        return {status:true, response:guru}
    }

    public getById = async (uuid:string) => {
        try{
            const guru = await prisma.guru.findUnique({
                where:{
                    uuid:String(uuid)
                },
                select:{
                    uuid:true,
                    nama:true,
                    NIP:true,
                    sekolahId:true
                }
            })
    
            if(!guru) {
                return {status:false, response:uuid}
            }
    
            return {status:true, response:guru}
        }catch(error){
            return {status:false, response:error}
        }
        
    }

    public add = async (newGuru:Guru) => {
        try{
            const guru = await prisma.guru.create({
                data:{
                    nama: newGuru.nama,
                    NIP: newGuru.NIP,
                    sekolahId: Number(newGuru.sekolahId)
                }
            })
            return {status:true, response:guru}
        } catch (error){
            return {status:false, response:error}
        }
    }

    public edit = async (uuid:string, newGuru:Guru) => {
        try{
            const guru = await prisma.guru.update({
                where:{
                    uuid: uuid
                },
                data:{
                    nama: newGuru.nama,
                    NIP: newGuru.NIP,
                    sekolahId: newGuru.sekolahId
                }
            })
            return {status:true, response:guru}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }

    public delete = async (uuid:string) => {
        try{
            const guru = await prisma.guru.delete({
                where:{
                    uuid: uuid
                }
            })
            return {status:true, response:guru}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }
}