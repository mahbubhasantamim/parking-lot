import { z } from "zod"
import { ZodMin1UpdateRefine, ZodNameString, ZodSimpleString } from "../../../utils/zod.util"

export const CreateParkingSlotDto = z.object({
    title: ZodNameString,
    parkingLotId: ZodSimpleString,
})
export type ICreateParkingSlotDto = z.infer<typeof CreateParkingSlotDto>

export const UpdateParkingSlotDto = CreateParkingSlotDto.extend({
    vehicleId: ZodSimpleString.nullish(),
    isMaintenance: z.boolean(),
})
    .partial()
    .refine(ZodMin1UpdateRefine, {
        message: "update least 1 property",
    })

export type IUpdateParkingSlotDto = z.infer<typeof UpdateParkingSlotDto>
