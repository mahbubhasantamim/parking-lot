import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingLotSchema } from "../parking-lot/parking-lot.schema"

export const ParkingSlotSchema = mysqlTable("parking_slot_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    parkingLotId: varchar("lot_id", { length: 50 }).references(() => ParkingLotSchema.id, { onDelete: "cascade" }),
    title: varchar("slot_title", { length: 255 }).notNull(),
    vehicleId: varchar("vehicle_id", { length: 50 }),
    isMaintenance: boolean("is_maintenance").default(false).notNull(),
})

export type IParkingSlot = typeof ParkingSlotSchema.$inferSelect
export type ICreateParkingSlot = typeof ParkingSlotSchema.$inferInsert
