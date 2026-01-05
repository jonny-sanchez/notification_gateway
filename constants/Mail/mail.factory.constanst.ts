import 'dotenv/config'
import { MailType, TransPortMailConfig } from "types/Mail/MailType";

// export const optionsTransportMail = ['PIOAPP', 'ALISA'] as const;
export const optionsTransportMail = process.env?.MAIL_PROVIDERS?.split(',') ?? [] as const;

export const mailerEmiterConfig = (mailEmit:MailType) : TransPortMailConfig => ({
    host: process?.env[`MAIL_${mailEmit}_HOST`] ?? "",
    port: Number(process?.env[`MAIL_${mailEmit}_PORT`] ?? 0),
    secure: false,
    auth: {
        user: process?.env[`MAIL_${mailEmit}_USERNAME`] ?? "",
        pass: process?.env[`MAIL_${mailEmit}_PASSWORD`] ?? ""
    }
})