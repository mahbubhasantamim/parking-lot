import { sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { Constant } from "../../../constant/common.constant"

export const ParkingLotSchema = mysqlTable("parking_lot_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    lotName: varchar("lot_name", { length: 255 }).notNull(),

    // address
    city: varchar("city", { length: 50 }),
    state: varchar("state", { length: 50 }),
    zipCode: varchar("zip_code", { length: 50 }),
    address: varchar("address", { length: 255 }),

    // extra info
    timeZone: varchar("time_zone", { length: 50 }).notNull().default(Constant.TIMEZONE),
    lastUpdate: datetime("last_update")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IParkingLot = typeof ParkingLotSchema.$inferSelect
export type ICreateParkingLot = typeof ParkingLotSchema.$inferInsert
