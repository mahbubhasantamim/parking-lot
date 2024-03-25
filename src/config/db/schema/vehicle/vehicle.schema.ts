import { mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { UserSchema } from "../user/user.schema"

export const VehicleSchema = mysqlTable("vehicle_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 50 }).references(() => UserSchema.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    vehicleRegNumber: varchar("vehicle_reg_number", { length: 255 }).notNull(),
})

export type IVehicle = typeof VehicleSchema.$inferSelect
export type IAddVehicle = typeof VehicleSchema.$inferInsert
