import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { PATTERNS } from '../../config/rabbitmq/rabbitmq.constants';
import type { EmailJob } from '../../contracts/email-job';
import { runRmqJob } from '../../common/rmq-job.util';
import { MailService } from './mail.service';
import { MailResultPublisher } from './mail-result.publisher';

@Controller()
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly resultPublisher: MailResultPublisher,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MailController.name);
  }

  @EventPattern(PATTERNS.EMAIL_SEND)
  async handleEmailSend(@Payload() job: EmailJob, @Ctx() ctx: RmqContext): Promise<void> {
    await runRmqJob(ctx, this.logger, job?.jobId, async () => {
      const { templateId, ...result } = await this.mailService.send(job);

      // Never log `to`/variables - they carry personal data and credentials.
      const summary = {
        jobId: job.jobId,
        correlationId: job.correlationId,
        templateId,
        providerId: result.providerId,
        meta: job.meta,
      };
      if (result.success) {
        this.logger.info(summary, 'Email sent.');
      } else {
        this.logger.warn({ ...summary, error: result.error }, 'Email rejected by the provider.');
      }

      await this.resultPublisher.publish(result);
    });
  }
}
