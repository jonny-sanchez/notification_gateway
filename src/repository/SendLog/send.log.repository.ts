import { PrismaClient, SendLog } from "generated/prisma/client";
import { SendLogInterface } from "./send.log.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService as PrismaCore } from "src/prisma/prisma.service";
import { SendLogCreateInput } from "generated/prisma/models";

@Injectable()
export class SendLogRepository implements SendLogInterface {

    constructor(private readonly prismaService:PrismaCore) {}

    async getAll(): Promise<SendLog[]> {
        const result = await this.prismaService.sendLog.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return result
    }

    async create(data: SendLogCreateInput, t: PrismaClient = this.prismaService): Promise<SendLog> {
        const result = await t.sendLog.create({ data })
        return result
    }

}