import { Request, Response } from "express";
import { mataPelajaranService } from "../services";
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class mataPelajaranController {
    private MataPelajaranService: mataPelajaranService;

    constructor() {
        this.MataPelajaranService = new mataPelajaranService();
    }

    public getAll = async(req: Request, res: Response) => {
        const tingkatanId = req.params.tingkatanId
        try {
            const {status, response} = await this.MataPelajaranService.getAll(Number(tingkatanId))
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
            const {status, response} = await this.MataPelajaranService.getById(String(uuid))
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
            const {nama, guruId, tingkatanId} = req.body
            const {status, response} = await this.MataPelajaranService.add({nama, guruId, tingkatanId})
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
            const {nama, guruId, tingkatanId} = req.body
            const {status, response} = await this.MataPelajaranService.edit(uuid, {nama, guruId, tingkatanId})
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
            const {status, response} = await this.MataPelajaranService.delete(uuid)
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