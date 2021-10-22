import { Request, Response } from "express";
import { kelasService } from "../services";
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class kelasController {
    private KelasService: kelasService;

    constructor() {
        this.KelasService = new kelasService();
    }

    public getAll = async(req: Request, res: Response) => {
        const tingkatanId = req.params.tingkatanId
        try {
            const {status, response} = await this.KelasService.getAll(Number(tingkatanId))
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
            const {status, response} = await this.KelasService.getById(String(uuid))
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
            const {nama, urutan, tingkatanId} = req.body
            const {status, response} = await this.KelasService.add({nama, urutan, tingkatanId})
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
            const {nama, urutan, tingkatanId} = req.body
            const {status, response} = await this.KelasService.edit(uuid, {nama, urutan, tingkatanId})
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
            const {status, response} = await this.KelasService.delete(uuid)
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