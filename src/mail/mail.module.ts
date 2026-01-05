import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendLogRepository } from 'src/repository/SendLog/send.log.repository';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_PIOAPP_HOST'),
          port: config.get<number>('MAIL_PIOAPP_PORT'),
          secure: false,
          auth: {
            user: config.get('MAIL_PIOAPP_USERNAME'),
            pass: config.get('MAIL_PIOAPP_PASSWORD')
          },
        },
        defaults: {
          from: `"${config.get('MAIL_PIOAPP_FROM_NAME')}" <${config.get('MAIL_PIOAPP_FROM_ADDRESS')}>`,
        },
        template: {
          dir: path.join(__dirname, 'templates'), // carpeta templates
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        }
      })
    })
  ],
  providers: [MailService, SendLogRepository],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
