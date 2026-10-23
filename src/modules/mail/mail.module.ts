import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailTemplateService } from './mail-template.service';
import { MailResultPublisher } from './mail-result.publisher';

@Module({
  controllers: [MailController],
  providers: [MailService, MailTemplateService, MailResultPublisher],
})
export class MailModule {}
