import { PrismaClient, SendLog } from "generated/prisma/client"
import { SendLogCreateInput } from "generated/prisma/models"

export interface SendLogInterface {

     getAll(): Promise<SendLog[]>

     create(data:SendLogCreateInput, t:PrismaClient) : Promise<SendLog>

}