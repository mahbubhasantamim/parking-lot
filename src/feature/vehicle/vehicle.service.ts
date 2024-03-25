import { and, eq } from "drizzle-orm"
import { db } from "../../config/db/db"
import { IAddVehicle, VehicleSchema } from "../../config/db/schema/vehicle/vehicle.schema"
import { UniqueId } from "../../utils/common.util"

export const VehicleService = {
    get: async (userId: string) => {
        const where = eq(VehicleSchema.userId, userId)
        const list = await db.select().from(VehicleSchema).where(where)

        return {
            list,
        }
    },

    add: async (body: Omit<IAddVehicle, "id">, identifier: string) => {
        const uid = UniqueId.createUlid()

        await db.insert(VehicleSchema).values({
            id: uid,
            ...body,
            userId: identifier,
        })
    },

    delete: async (vid: string, userId: string) => {
        const where = and(eq(VehicleSchema.id, vid), eq(VehicleSchema.userId, userId))

        await db.delete(VehicleSchema).where(where)
    },
}
