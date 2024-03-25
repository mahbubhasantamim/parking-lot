import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { AddVehicleDto } from "./dto/vehicle.dto"
import { VehicleController } from "./vehicle.controller"

const VehicleRouter = Router()

VehicleRouter.use(AuthMid.isLoggedInMid)

/**
 * @description get users all vehicles
 * @url {{BASE_URL}}/v1/vehicle
 */
VehicleRouter.get("/", VehicleController.getVehicle)

/**
 * @description add vehicles
 * @url {{BASE_URL}}/v1/vehicle
 */
VehicleRouter.post("/", validateMid({ body: AddVehicleDto }), VehicleController.addVehicle)

/**
 * @description delete vehicles
 * @url {{BASE_URL}}/v1/vehicle/:id
 */
VehicleRouter.delete("/:id", VehicleController.deleteVehicle)

export default VehicleRouter
