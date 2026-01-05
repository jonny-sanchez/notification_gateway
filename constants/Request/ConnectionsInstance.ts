import { PrismaService as PrismaCore } from "src/prisma/prisma.service";
import { ObjectConnectionType } from "types/Request/ConnectionsType";

export const ConnectionsInstance:ObjectConnectionType = {
    PrismaCore: new PrismaCore()
}