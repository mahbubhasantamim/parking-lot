import { eq, sql } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { IDb, db } from "../../config/db/db"
import { ICreateParkingLot, ParkingLotSchema } from "../../config/db/schema/parking-lot/parking-lot.schema"
import { UniqueId } from "../../utils/common.util"
import { IUpdateParkingLotDto } from "./dto/parking-lot.dto"

export const ParkingLotService = {
    getAllParkingLot: async () => {
        const myDb = db
        const list = await myDb.select().from(ParkingLotSchema)

        return {
            list,
        }
    },
    createParkingLot: async (body: Omit<ICreateParkingLot, "id">, dbOrTx?: IDb) => {
        const myDb = dbOrTx || db
        const uid = UniqueId.createUlid()

        await myDb.insert(ParkingLotSchema).values({
            id: uid,
            ...body, // few props will replace by specific ones below
        })
    },
    updateParkingLot: async (id: string, body: IUpdateParkingLotDto) => {
        // update my db
        const [resultInfo] = await db
            .update(ParkingLotSchema)
            .set({
                lotName: body.lotName,
                city: body.city,
                state: body.state,
                zipCode: body.zipCode,
                address: body.address,
                lastUpdate: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(ParkingLotSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        }
    },

    deleteParkingLot: async (id: string) => {
        const where = eq(ParkingLotSchema.id, id)
        await db.delete(ParkingLotSchema).where(where)
    },
}
