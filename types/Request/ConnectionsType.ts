import { PrismaService as PrismaCore } from "src/prisma/prisma.service"

export type ConnectionsType = 'PrismaCore'

export type ObjectConnectionType = {
    PrismaCore: PrismaCore
}

export type TransactionClient<T> =
  T extends { $transaction: (fn: (tx: infer U) => any) => any }
    ? U
    : never;
