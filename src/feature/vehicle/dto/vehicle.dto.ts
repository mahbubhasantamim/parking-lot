import { z } from "zod"
import { ZodNameString, ZodSimpleString } from "../../../utils/zod.util"

export const AddVehicleDto = z.object({
    title: ZodNameString.min(2).max(200),
    vehicleRegNumber: ZodSimpleString,
})
