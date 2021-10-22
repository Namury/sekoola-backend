import { Request, Response } from "express";
import { siswaService } from "../services";
import { response_handler, response_internal_server_error } from "../utils/responseUtil";

export class siswaController {
    private SiswaService: siswaService;

    constructor() {
        this.SiswaService = new siswaService();
    }

    public getAll = async(req: Request, res: Response) => {
        const kelasId = req.params.kelasId
        try {
            const {status, response} = await this.SiswaService.getAll(Number(kelasId))
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
            const {status, response} = await this.SiswaService.getById(String(uuid))
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
            const {nama, NISN, kelasId, sekolahId} = req.body
            const {status, response} = await this.SiswaService.add({nama, NISN, kelasId, sekolahId})
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
            const {nama, NISN, kelasId, sekolahId} = req.body
            const {status, response} = await this.SiswaService.edit(uuid, {nama, NISN, kelasId, sekolahId})
            if(status){
                return response_handler(res, true, 200, "Success", response)
            } else{
                return response_internal_server_error(res, String(response))
            }
        }catch (error) {
            return response_internal_server_error(res, String(error))
        }
    }

    public delete = async(req: Request, res: Response) => {
        try {
            const uuid = req.params.uuid
            const {status, response} = await this.SiswaService.delete(uuid)
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