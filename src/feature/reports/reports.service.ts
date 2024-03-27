import { db } from "../../config/db/db"
import { VehicleParkingSchema } from "../../config/db/schema/vehicle-parking/vehicle-parking.schema"

export const ReportsService = {
    getReport: async () => {
        const list = await db.select().from(VehicleParkingSchema)

        let totalParking = 0
        let totalFeeCollect = 0
        let totalParkingMinutes = 0

        list.forEach((entry) => {
            if (entry.unParkingTime) {
                // Calculate parking duration
                const parkingTime = new Date(entry.parkingTime).getTime()
                const unParkingTime = new Date(entry.unParkingTime).getTime()
                const minutes = (unParkingTime - parkingTime) / (1000 * 60) // convert minutes to hours

                // Add parking cost and hours to totals
                totalParking += 1
                totalFeeCollect += entry.parkingCost || 0
                totalParkingMinutes += minutes
            }
        })

        const totalHours = Math.floor(totalParkingMinutes / 60)
        const totalMinutes = Math.floor(totalParkingMinutes % 60)

        const report = {
            totalParking,
            totalParkingMinutes: `${totalHours}H.${totalMinutes}M`,
            totalFeeCollect,
            list,
        }
        return report
    },
}
