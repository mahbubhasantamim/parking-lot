import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import { EnvConfig } from "../env.config"

import * as parkingLot from "./schema/parking-lot/parking-lot.schema"
import * as parkingSlot from "./schema/parking-slot/parking-slot.schema"
import * as user from "./schema/user/user.schema"
import * as vehicleParking from "./schema/vehicle-parking/vehicle-parking.schema"
import * as vehicle from "./schema/vehicle/vehicle.schema"

const schemas = {
    ...user,
    ...parkingLot,
    ...parkingSlot,
    ...vehicle,
    ...vehicleParking,
}

export const dbPool = mysql.createPool({
    uri: EnvConfig.DATABASE_URL,
})

// use only in services
export const db = drizzle(dbPool, {
    schema: schemas,
    logger: false,
    mode: "default",
})

export type IDb = typeof db
