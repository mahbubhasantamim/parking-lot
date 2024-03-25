import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingSlotDto, UpdateParkingSlotDto } from "./dto/parking-slot.dto"
import { ParkingSlotController } from "./parking-slot.controller"

const ParkingSlotRouter = Router()

/**
 * @description get all parking slot
 * @url {{BASE_URL}}/v1/parking-slot
 */
ParkingSlotRouter.get("/", AuthMid.isLoggedInMid, ParkingSlotController.getParkingSlot)

/**
 * @description create parking slot
 * @url {{BASE_URL}}/v1/parking-slot
 */
ParkingSlotRouter.post(
    "/",
    validateMid({ body: CreateParkingSlotDto }),
    AuthMid.isManagerOrSuperAdmin,
    ParkingSlotController.createParkingSlot
)

/**
 * @description update a parking slot (super admin and manager can update parking slot)
 * @url {{BASE_URL}}/v1/parking-slot/:id
 */
ParkingSlotRouter.put(
    "/:id",
    validateMid({
        params: IdParamDto,
        body: UpdateParkingSlotDto,
    }),
    AuthMid.isManagerOrSuperAdmin,
    ParkingSlotController.updateParkingSlot
)

/**
 * @description delete a parking slot
 * @url {{BASE_URL}}/v1/user/:id
 */
ParkingSlotRouter.delete("/:id", AuthMid.isManagerOrSuperAdmin, ParkingSlotController.deleteParkingSlot)

export default ParkingSlotRouter
