import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingLotSchema } from "../parking-lot/parking-lot.schema"
import { ParkingSlotSchema } from "../parking-slot/parking-slot.schema"
import { UserSchema } from "../user/user.schema"

export const VehicleSchema = mysqlTable("vehicle_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 50 }).references(() => UserSchema.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    vehicleRegNumber: varchar("vehicle_reg_number", { length: 255 }).notNull(),
    onParking: boolean("on_parking").default(false).notNull(),
    parkingLot: varchar("parking_lot", { length: 50 }).references(() => ParkingLotSchema.id, {
        onDelete: "set null",
    }),
    parkingSlot: varchar("parking_slot", { length: 50 }).references(() => ParkingSlotSchema.id, {
        onDelete: "set null",
    }),
})

export type IVehicle = typeof VehicleSchema.$inferSelect
export type IAddVehicle = typeof VehicleSchema.$inferInsert
