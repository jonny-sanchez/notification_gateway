import { optionsTransportMail } from 'constants/Mail/mail.factory.constanst';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export type MailType = typeof optionsTransportMail[number];

export type TransPortMailConfig = SMTPTransport.Options|SMTPTransport.SentMessageInfo;

// export type ObjectMailType = {
//   [K in MailType]: SMTPTransport.Options|SMTPTransport.SentMessageInfo;
// }