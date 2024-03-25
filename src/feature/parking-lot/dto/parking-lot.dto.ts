import { z } from "zod"
import {
    ZodDateString,
    ZodMin1UpdateRefine,
    ZodNameString,
    ZodSimpleNumber,
    ZodSimpleString,
} from "../../../utils/zod.util"

export const CreateParkingLotDto = z.object({
    lotName: ZodNameString.min(2).max(200),
    totalSlot: ZodSimpleNumber,
    city: ZodSimpleString,
    state: ZodSimpleString,
    zipCode: ZodSimpleString,
    address: ZodSimpleString,
})

export type ICreateParkingLotDto = z.infer<typeof CreateParkingLotDto>

export const UpdateParkingLotDto = CreateParkingLotDto.extend({
    lastUpdate: ZodDateString,
})
    .partial()
    .refine(ZodMin1UpdateRefine, {
        message: "update least 1 property",
    })

export type IUpdateParkingLotDto = z.infer<typeof UpdateParkingLotDto>
