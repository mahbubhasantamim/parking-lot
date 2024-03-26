import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { ReportsController } from "./reports.controller"

const ReportsRouter = Router()

ReportsRouter.use(AuthMid.isManagerOrSuperAdmin)

/**
 * @description get users all vehicles
 * @url {{BASE_URL}}/v1/reports
 */
ReportsRouter.get("/", ReportsController.getReports)

export default ReportsRouter
