import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailTemplateService } from './mail-template.service';
import { MailResultPublisher } from './mail-result.publisher';
import { MailPreviewController } from './mail-preview.controller';

@Module({
  // MailController consumes email_queue; MailPreviewController is the internal HTTP preview.
  controllers: [MailController, MailPreviewController],
  providers: [MailService, MailTemplateService, MailResultPublisher],
})
export class MailModule {}
