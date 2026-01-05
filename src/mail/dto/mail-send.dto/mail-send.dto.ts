import { IsEmail, IsIn, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { optionsTransportMail } from 'constants/Mail/mail.factory.constanst';
import type { MailType } from 'types/Mail/MailType';

export class MailSendDto {
  @IsString({ message: "el campo [emisor] es obligatorio y debe ser un string" })
  @IsIn(optionsTransportMail, {
    message: `el campo [emisor] de ser uno de estos valores '${optionsTransportMail.join(', ')}'`
  })
  emisor:MailType;

  @IsString({ message: "el campo [email_receptor] debe ser un email valido" })
  email_receptor: string;

  @IsString({ message: "el campo [asunto] es obligatorio y debe ser un string" })
  asunto: string;

  @IsObject({ message: "el campo [asunto] debe ser un Json" })
  @IsOptional()
  data_context: object;
}
