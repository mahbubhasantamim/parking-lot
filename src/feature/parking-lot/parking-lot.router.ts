import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingLotDto, UpdateParkingLotDto } from "./dto/parking-lot.dto"
import { ParkingLotController } from "./parking-lot.controller"

const ParkingLotRouter = Router()

/**
 * @description get all parking lot
 * @url {{BASE_URL}}/v1/parking-lot
 */
ParkingLotRouter.get("/", AuthMid.isLoggedInMid, ParkingLotController.getParkingLot)

/**
 * @description create parking lot
 * @url {{BASE_URL}}/v1/parking-lot
 */
ParkingLotRouter.post(
    "/",
    validateMid({ body: CreateParkingLotDto }),
    AuthMid.isManagerOrSuperAdmin,
    ParkingLotController.createParkingLot
)

/**
 * @description update a parking lot (super admin and manager can update parking lot)
 * @url {{BASE_URL}}/v1/parking-lot/:id
 */
ParkingLotRouter.put(
    "/:id",
    validateMid({
        params: IdParamDto,
        body: UpdateParkingLotDto,
    }),
    AuthMid.isManagerOrSuperAdmin,
    ParkingLotController.updateParkingLot
)

/**
 * @description delete a parking lot
 * @url {{BASE_URL}}/v1/user/:id
 */
ParkingLotRouter.delete("/:id", AuthMid.isManagerOrSuperAdmin, ParkingLotController.deleteParkingLot)

export default ParkingLotRouter
