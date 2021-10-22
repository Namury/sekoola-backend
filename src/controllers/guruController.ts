import { Request, Response } from "express";
import { guruService } from "../services";
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class guruController {
    private GuruService: guruService;

    constructor() {
        this.GuruService = new guruService();
    }

    public getAll = async(req: Request, res: Response) => {
        const sekolahId = req.params.sekolahId
        try {
            const {status, response} = await this.GuruService.getAll(Number(sekolahId))
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res, String(response))
            }
        }catch (error) {
            return response_internal_server_error(res, String(error))
        }
    }

    public getById = async(req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid
            const {status, response} = await this.GuruService.getById(String(uuid))
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res, String(response))
            }
        }catch (error) {
            return response_internal_server_error(res, String(error))
        }
    }

    public add = async(req: Request, res: Response) => {
        try {
            const {nama, NIP, sekolahId} = req.body
            const {status, response} = await this.GuruService.add({nama, NIP, sekolahId})
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res, String(response))
            }
        }catch (error) {
            return response_internal_server_error(res)
        }
    }

    public edit = async(req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid
            const {nama, NIP, sekolahId} = req.body
            const {status, response} = await this.GuruService.edit(uuid, {nama, NIP, sekolahId})
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res)
            }
        }catch (error) {
            return response_internal_server_error(res)
        }
    }

    public delete = async(req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid
            const {status, response} = await this.GuruService.delete(uuid)
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res)
            }
        }catch (error) {
            return response_internal_server_error(res)
        }
    }


}