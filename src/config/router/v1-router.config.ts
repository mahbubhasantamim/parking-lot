import express from "express"
import AuthRouter from "../../feature/auth/auth.router"
import HealthCheckRouter from "../../feature/health-check/health-check.router"
import ParkingLotRouter from "../../feature/parking-lot/parking-lot.router"
import ParkingSlotRouter from "../../feature/parking-slot/parking-slot.router"
import ReportsRouter from "../../feature/reports/reports.router"
import UserRouter from "../../feature/user/user.router"
import VehicleParkingRoute from "../../feature/vehicle-parking/vehicle-parking.route"
import VehicleRouter from "../../feature/vehicle/vehicle.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)
v1Router.use(`/auth`, AuthRouter)
v1Router.use(`/user`, UserRouter)
v1Router.use(`/parking-lot`, ParkingLotRouter)
v1Router.use(`/parking-slot`, ParkingSlotRouter)
v1Router.use(`/vehicle`, VehicleRouter)
v1Router.use(`/vehicle-parking`, VehicleParkingRoute)
v1Router.use(`/reports`, ReportsRouter)

export default v1Router
