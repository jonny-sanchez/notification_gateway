import 'dotenv/config'
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const connectionString = `${process.env.DATABASE_URL_PIOAPP_MAIL}`
        const adapter = new PrismaPg({ connectionString });
        super({ adapter });
    }
}
