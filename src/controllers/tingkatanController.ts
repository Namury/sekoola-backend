import { Request, Response } from "express";
import { tingkatanService } from "../services";
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class tingkatanController {
    private TingkatanService: tingkatanService;

    constructor() {
        this.TingkatanService = new tingkatanService();
    }

    public getAll = async(req: Request, res: Response) => {
        const sekolahId = req.params.sekolahId
        try {
            const {status, response} = await this.TingkatanService.getAll(Number(sekolahId))
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res)
            }
        }catch (error) {
            return response_internal_server_error(res)
        }
    }

    public getById = async(req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid
            const {status, response} = await this.TingkatanService.getById(String(uuid))
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
            const {nama, urutan, sekolahId} = req.body
            const {status, response} = await this.TingkatanService.add({nama, urutan, sekolahId})
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
            const {nama, urutan, sekolahId} = req.body
            const {status, response} = await this.TingkatanService.edit(uuid, {nama, urutan, sekolahId})
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
            const {status, response} = await this.TingkatanService.delete(uuid)
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