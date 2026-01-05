import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConnectionsInstance } from 'constants/Request/ConnectionsInstance';
import { ConnectionsType, TransactionClient } from 'types/Request/ConnectionsType';

@Injectable()
export class RequestService {

    constructor() {}

    async handleSend(
        callback: (t?:TransactionClient<(typeof ConnectionsInstance)[ConnectionsType]>)=>Promise<any> = async() => {},
        messageSuccess:string | null = '',
        statusCode: number = 200,
        isWithRollBack:boolean = false,
        connection:ConnectionsType = 'PrismaCore'
    ) {
        try {
            const result = isWithRollBack
                ? await ConnectionsInstance[connection].$transaction(callback)
                : await callback(undefined as any);
            return { message: messageSuccess, statusCode, data: result };
        } catch (error) {
            throw new InternalServerErrorException(
              error?.message || error?.stack || "Internal server Error"
            )
        }
    }

}
