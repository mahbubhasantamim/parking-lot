import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ReportsService } from "./reports.service"

export const ReportsController = {
    getReports: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ReportsService.getReport()

            return res.status(StatusCode.OK).send(MyResponse("Operation successful", result))
        } catch (error) {
            return next(error)
        }
    },
}
