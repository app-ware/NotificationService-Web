import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import type { EmailResult } from '../../config/rabbitmq/contracts/email-job';

/**
 * Where a send's outcome goes. A no-op today: Nursery marks a mail as sent when it queues
 * it. To report real outcomes back (skill 14 §3.7), add an `emailResult` queue to the
 * RabbitMQ contract and make publish() emit PATTERNS.EMAIL_RESULT here - nothing else in
 * this module changes.
 */
@Injectable()
export class MailResultPublisher {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(MailResultPublisher.name);
  }

  publish(result: EmailResult): Promise<void> {
    this.logger.debug({ jobId: result.jobId, success: result.success }, 'Email result (not published yet).');
    return Promise.resolve();
  }
}
