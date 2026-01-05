import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailSendDto } from './dto/mail-send.dto/mail-send.dto';
import { RequestService } from 'src/request/request.service';
import { PrismaClient as PrismaCore } from 'generated/prisma/client';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';

@Controller('mail')
export class MailController {

    constructor(
      private readonly mailService: MailService,
      private readonly request:RequestService
    ) {}

    @UseGuards(BasicAuthGuard)
    @Post('send')
    @HttpCode(HttpStatus.CREATED)
    async sendEmail(@Body() dto: MailSendDto) {
      return await this.request.handleSend(async (t) => {
        const result = await this.mailService.emailService(dto, t as PrismaCore);
        return result
      }, "Correo enviado correctamente.", HttpStatus.CREATED, true, 'PrismaCore')
    }

}
