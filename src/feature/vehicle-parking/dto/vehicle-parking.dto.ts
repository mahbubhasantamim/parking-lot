import { z } from "zod"
import { ZodSimpleString } from "../../../utils/zod.util"

export const ManualParkingDto = z.object({
    vehicleId: ZodSimpleString.min(2),
    parkingLot: ZodSimpleString,
    parkingSlot: ZodSimpleString,
})

export type IManualParkingDto = z.infer<typeof ManualParkingDto>
