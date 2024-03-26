import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { VehicleParkingService } from "./vehicle-parking.service"

export const VehicleParkingController = {
    parkingDetails: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await VehicleParkingService.parkingDetails(req.params.id)

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", result))
        } catch (error) {
            return next(error)
        }
    },
    manualParking: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VehicleParkingService.manualVehicleParking(req.user.id, req.body)

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", true))
        } catch (error) {
            return next(error)
        }
    },
    unPark: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VehicleParkingService.unPark(req.params.id)
            const result = await VehicleParkingService.parkingDetails(req.params.id)

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", result))
        } catch (error) {
            return next(error)
        }
    },
}
