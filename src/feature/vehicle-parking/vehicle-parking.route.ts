import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { ManualParkingDto } from "./dto/vehicle-parking.dto"
import { VehicleParkingController } from "./vehicle-parking.controller"

const VehicleParkingRoute = Router()

VehicleParkingRoute.use(AuthMid.isLoggedInMid)

/**
 * @description vehicle parking
 * @url {{BASE_URL}}/v1/vehicle-parking
 */
VehicleParkingRoute.post("/", validateMid({ body: ManualParkingDto }), VehicleParkingController.manualParking)

/**
 * @description vehicle un park
 * @url {{BASE_URL}}/v1/vehicle-parking
 */
VehicleParkingRoute.put("/:id", validateMid({ params: IdParamDto }), VehicleParkingController.unPark)

export default VehicleParkingRoute
