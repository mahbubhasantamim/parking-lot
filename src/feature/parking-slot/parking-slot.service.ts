import { eq } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { IDb, db } from "../../config/db/db"
import { ICreateParkingSlot, ParkingSlotSchema } from "../../config/db/schema/parking-slot/parking-slot.schema"
import { UniqueId } from "../../utils/common.util"
import { IUpdateParkingSlotDto } from "./dto/parking-slot.dto"

export const ParkingSlotService = {
    getParkingSlot: async () => {
        const myDb = db
        const list = await myDb.select().from(ParkingSlotSchema)

        return {
            list,
        }
    },
    createParkingSlot: async (body: Omit<ICreateParkingSlot, "id">, dbOrTx?: IDb) => {
        const myDb = dbOrTx || db
        const uid = UniqueId.createUlid()

        await myDb.insert(ParkingSlotSchema).values({
            id: uid,
            ...body, // few props will replace by specific ones below
        })
    },
    updateParkingSlot: async (id: string, body: IUpdateParkingSlotDto) => {
        // update my db
        const [resultInfo] = await db
            .update(ParkingSlotSchema)
            .set({
                title: body.title,
                vehicleId: body.vehicleId,
                isMaintenance: body.isMaintenance,
            })
            .where(eq(ParkingSlotSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    deleteParkingSlot: async (id: string) => {
        await db.delete(ParkingSlotSchema).where(eq(ParkingSlotSchema.id, id))
    },
}
