import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ParkingSlotService } from "./parking-slot.service"

export const ParkingSlotController = {
    getParkingSlot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parkingSlots = await ParkingSlotService.getParkingSlot()
            return res.status(StatusCode.OK).send(MyResponse("Parking slots", parkingSlots))
        } catch (error) {
            return next(error)
        }
    },
    createParkingSlot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingSlotService.createParkingSlot(req.body)

            return res.status(StatusCode.OK).send(MyResponse("Parking slot created", true))
        } catch (error) {
            return next(error)
        }
    },
    updateParkingSlot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await ParkingSlotService.updateParkingSlot(id, req.body)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
    deleteParkingSlot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto

            await ParkingSlotService.deleteParkingSlot(id)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
}
