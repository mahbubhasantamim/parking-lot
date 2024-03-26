import { eq, sql } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db } from "../../config/db/db"
import { ParkingSlotSchema } from "../../config/db/schema/parking-slot/parking-slot.schema"
import {
    ICreateVehicleParking,
    VehicleParkingSchema,
} from "../../config/db/schema/vehicle-parking/vehicle-parking.schema"
import { VehicleSchema } from "../../config/db/schema/vehicle/vehicle.schema"
import { UniqueId } from "../../utils/common.util"

export const VehicleParkingService = {
    manualVehicleParking: async (userId: string, body: Omit<ICreateVehicleParking, "id" | "userId">) => {
        const uid = UniqueId.createUlid()
        const [Vehicle] = await db.select().from(VehicleSchema).where(eq(VehicleSchema.id, body.vehicleId))
        const [ParkingSlot] = await db
            .select()
            .from(ParkingSlotSchema)
            .where(eq(ParkingSlotSchema.id, body.parkingSlot))

        if (Vehicle.onParking) {
            throw new BadRequestError("Vehicle already in the parking")
        } else if (ParkingSlot.vehicleId) {
            throw new BadRequestError("A vehicle already park in this slot")
        } else if (ParkingSlot.isMaintenance) {
            throw new BadRequestError("Parking slot under maintenance")
        } else {
            // update parking slot table
            await db
                .update(ParkingSlotSchema)
                .set({ vehicleId: body.vehicleId })
                .where(eq(ParkingSlotSchema.id, body.parkingSlot))

            // update vehicle table
            await db
                .update(VehicleSchema)
                .set({
                    onParking: true,
                    parkingLot: body.parkingLot,
                    parkingSlot: body.parkingSlot,
                })
                .where(eq(VehicleSchema.id, body.vehicleId))

            // insert data into vehicle parking table
            await db.insert(VehicleParkingSchema).values({
                id: uid,
                userId,
                ...body,
            })
        }
    },
    unPark: async (id: string) => {
        const [resultInfo] = await db
            .update(VehicleParkingSchema)
            .set({
                unParkingTime: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(VehicleParkingSchema.id, id))

        if (resultInfo.affectedRows < 1) {
            throw new BadRequestError("Update not possible")
        } else {
            const [parkingRow] = await db
                .select()
                .from(VehicleParkingSchema)
                .where(eq(VehicleParkingSchema.id, id))

            const parkingStartTime = new Date(parkingRow.parkingTime).getTime()
            const unParkingTime = new Date(parkingRow.unParkingTime || "").getTime()
            const parkingDurationMillis = unParkingTime - parkingStartTime
            const parkingDurationHours = Math.ceil(parkingDurationMillis / (1000 * 60 * 60))

            // update vehicle parking table
            await db
                .update(VehicleParkingSchema)
                .set({ parkingCost: parkingDurationHours * 10 })
                .where(eq(VehicleParkingSchema.id, id))

            // update parking slot table
            await db
                .update(ParkingSlotSchema)
                .set({ vehicleId: null })
                .where(eq(ParkingSlotSchema.id, parkingRow.parkingSlot))

            // update vehicle table
            await db
                .update(VehicleSchema)
                .set({
                    onParking: false,
                    parkingLot: null,
                    parkingSlot: null,
                })
                .where(eq(VehicleSchema.id, parkingRow.vehicleId))
        }
    },

    parkingDetails: async (id: string) => {
        const [parkingRow] = await db.select().from(VehicleParkingSchema).where(eq(VehicleParkingSchema.id, id))

        return parkingRow
    },
}
