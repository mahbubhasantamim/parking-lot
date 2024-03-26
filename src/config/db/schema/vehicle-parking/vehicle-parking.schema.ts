import { sql } from "drizzle-orm"
import { datetime, int, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingLotSchema } from "../parking-lot/parking-lot.schema"
import { ParkingSlotSchema } from "../parking-slot/parking-slot.schema"
import { UserSchema } from "../user/user.schema"
import { VehicleSchema } from "../vehicle/vehicle.schema"

export const VehicleParkingSchema = mysqlTable("vehicle_parking_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 50 })
        .references(() => UserSchema.id, { onDelete: "cascade" })
        .notNull(),
    vehicleId: varchar("vehicle_id", { length: 50 })
        .references(() => VehicleSchema.id)
        .notNull(),
    parkingLot: varchar("parking_lot", { length: 50 })
        .references(() => ParkingLotSchema.id)
        .notNull(),
    parkingSlot: varchar("parking_slot", { length: 50 })
        .references(() => ParkingSlotSchema.id)
        .notNull(),
    parkingTime: datetime("parking_time")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    unParkingTime: datetime("un_parking_time"),
    parkingCost: int("parking_cost"),
    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IVehicleParking = typeof VehicleParkingSchema.$inferSelect
export type ICreateVehicleParking = typeof VehicleParkingSchema.$inferInsert
