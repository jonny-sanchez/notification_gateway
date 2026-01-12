import 'dotenv/config'
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService as MailerNest } from '@nestjs-modules/mailer';
import { SendLogRepository } from 'src/repository/SendLog/send.log.repository';
import { MailSendDto } from './dto/mail-send.dto/mail-send.dto';
import { PrismaClient as PrismaCore } from 'generated/prisma/client';
import { mailerEmiterConfig, optionsTransportMail } from 'constants/Mail/mail.factory.constanst';

@Injectable()
export class MailService implements OnModuleInit {

    constructor(
      private readonly mailer: MailerNest,
      private readonly sendLogRepository:SendLogRepository
    ) { }

    onModuleInit() {
      optionsTransportMail.forEach(el => this.mailer.addTransporter(el, mailerEmiterConfig(el)))
    }

    async emailService(body:MailSendDto, transaction:PrismaCore) {
      //definir variables de entorno a utilizar
      const color_primary:string = process?.env[`MAIL_${body.emisor}_COLOR_PRIMARY`] ?? ""
      const logo:string = `${process?.env[`MAIL_${body.emisor}_LOGO`] ?? ""}`
      const emisor:string =  `${process.env[`MAIL_${body.emisor}_FROM_ADDRESS`] ?? ""}`
      const name_emisor:string = process.env[`MAIL_${body.emisor}_FROM_NAME`] ?? ""
      //forma contexto del template del email 
      const context = {
        ...body?.data_context,
        color_primary,
        logo,
        empresa: (body?.data_context as any)?.empresa ?? "Pinulito",
        year: (body?.data_context as any)?.year ?? new Date().getFullYear()
      }
      //guardar en base de datos log del email
      const resultCreateEmail = await this.sendLogRepository.create({
        asunto: body.asunto,
        emisor,
        receptor: body.email_receptor,
        template: 'base',
        data_context: context,
      }, transaction)
      //enviar email
      await this.mailer.sendMail({
          transporterName: body.emisor,
          from: `"${name_emisor}" <${emisor}>`,
          to: body.email_receptor,
          subject: body.asunto,
          template: 'base', // nombre de la plantilla
          context: context, // datos para la plantilla
      });
      return resultCreateEmail
    }
}
