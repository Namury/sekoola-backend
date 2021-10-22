import { PrismaClient } from '@prisma/client'
import { MataPelajaran } from '../types';

const prisma = new PrismaClient();

export class mataPelajaranService {
    constructor() {

    }

    public getAll = async (tingkatanId:Number) => {
        const mataPelajaran = await prisma.mataPelajaran.findMany({
            where:{
                tingkatanId:Number(tingkatanId)
            },
            select:{
                uuid:true,
                nama:true,
                tingkatanId:true,
                guruId:true
            }
        });

        if(!mataPelajaran) {
            return {status:false, response:"not found"}
        }

        return {status:true, response:mataPelajaran}
    }

    public getById = async (uuid:string) => {
        try{
            const mataPelajaran = await prisma.mataPelajaran.findUnique({
                where:{
                    uuid:String(uuid)
                },
                select:{
                    uuid:true,
                    nama:true,
                    tingkatanId:true,
                    guruId:true
                }
            })
    
            if(!mataPelajaran) {
                return {status:false, response:uuid}
            }
    
            return {status:true, response:mataPelajaran}
        }catch(error){
            return {status:false, response:error}
        }
        
    }

    public add = async (newMataPelajaran:MataPelajaran) => {
        try{
            const mataPelajaran = await prisma.mataPelajaran.create({
                data:{
                    nama: newMataPelajaran.nama,
                    tingkatanId: Number(newMataPelajaran.tingkatanId),
                    guruId: Number(newMataPelajaran.guruId)
                }
            })
            return {status:true, response:mataPelajaran}
        } catch (error){
            return {status:false, response:error}
        }
    }

    public edit = async (uuid:string, newMataPelajaran:MataPelajaran) => {
        try{
            const mataPelajaran = await prisma.mataPelajaran.update({
                where:{
                    uuid: uuid
                },
                data:{
                    nama: newMataPelajaran.nama,
                    tingkatanId: newMataPelajaran.tingkatanId,
                    guruId: newMataPelajaran.guruId
                }
            })
            return {status:true, response:mataPelajaran}
        } catch (error){
            return {status:false, response:String(error)}
        }
    }

    public delete = async (uuid:string) => {
        try{
            const mataPelajaran = await prisma.mataPelajaran.delete({
                where:{
                    uuid: uuid
                }
            })
            return {status:true, response:mataPelajaran}
        } catch (error){
            return {status:false, response:"Something went wrong"}
        }
    }
}