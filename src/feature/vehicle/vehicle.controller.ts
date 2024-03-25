import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { VehicleService } from "./vehicle.service"

export const VehicleController = {
    getVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vehicles = await VehicleService.get(req.user.id)

            return res.status(StatusCode.OK).send(MyResponse("Success", vehicles))
        } catch (error) {
            return next(error)
        }
    },

    addVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            await VehicleService.add(req.body, userId)

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },

    deleteVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as IIdParamDto
            await VehicleService.delete(id, userId)

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
