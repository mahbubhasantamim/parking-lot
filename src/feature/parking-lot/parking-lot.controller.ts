import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ParkingLotService } from "./parking-lot.service"

export const ParkingLotController = {
    getParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parkingLots = await ParkingLotService.getAllParkingLot()
            return res.status(StatusCode.OK).send(MyResponse("Parking lots", parkingLots))
        } catch (error) {
            return next(error)
        }
    },
    createParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingLotService.createParkingLot(req.body)

            return res.status(StatusCode.OK).send(MyResponse("Parking lot created", true))
        } catch (error) {
            return next(error)
        }
    },
    updateParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await ParkingLotService.updateParkingLot(id, req.body)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
    deleteParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await ParkingLotService.deleteParkingLot(id)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
