import { IUserTypeEnum } from "../../config/db/schema/user/user.schema"

export interface ICurrentUser {
    id: string
    timeZone: string
    isSuperAdmin: boolean
    userType: IUserTypeEnum
}
